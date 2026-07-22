"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  QrCode, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Warehouse, 
  FileText, 
  Sparkles,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatTHB, cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    items, 
    fulfillmentType, 
    pickupBranch, 
    getSubtotal, 
    getShippingFee, 
    getTotal, 
    clearCart 
  } = useCartStore();
  const { activeVehicle } = useVehicleStore();

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [isExpired, setIsExpired] = useState(false);

  // Slip upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrState, setOcrState] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "MISMATCH">("IDLE");
  const [ocrAmount, setOcrAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Trigger simulated preliminary OCR & QR extraction check
    setOcrState("SCANNING");
    setTimeout(() => {
      const total = getTotal();
      // 95% chance of exact match in our simulation
      const isMatched = true;
      if (isMatched) {
        setOcrAmount(total);
        setOcrState("SUCCESS");
      } else {
        setOcrAmount(total - 500);
        setOcrState("MISMATCH");
      }
    }, 1800);
  };

  const handleSubmitOrder = () => {
    if (!uploadedFile && ocrState !== "SUCCESS") return;
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/orders/ORD-992");
    }, 1200);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalAmount = getTotal();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Initializing Payment Gateway...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
                • Step 2 of 3: Secure Payment & Verification
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
                PromptPay QR & Slip Upload Gateway
              </h1>
            </div>
          </div>

          <Link
            href="/cart"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Pane (7/12 Span) — Order Summary & Fitment Confirmation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Vehicle Compatibility Confirmation Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/60 flex items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/80 border border-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Fitment Guarantee Active
                  </span>
                  <h3 className="font-bold text-base text-white">
                    {activeVehicle
                      ? `Verified for ${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.trim})`
                      : "Universal Order — Direct Factory Fulfillment"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Order covered by Pitstop Grid 100% Fitment Replacement Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Itemized Summary */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
              <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3">
                Order Items Audit ({items.length})
              </h3>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.part.id} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0 text-sm font-mono">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.quantity}x
                      </span>
                      <div>
                        <span className="text-slate-200 font-semibold block">{item.part.title}</span>
                        <span className="text-xs text-slate-500">OEM: {item.part.oemPartNumber}</span>
                      </div>
                    </div>
                    <span className="font-bold text-white shrink-0">{formatTHB(item.part.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Info Box */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  {fulfillmentType === "EXPRESS_SHIPPING" ? (
                    <>
                      <Truck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-bold text-white block">Express Courier Delivery</span>
                        <span className="text-slate-500 text-[11px]">Shipping to: Sukhumvit Soi 55, Bangkok</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Warehouse className="w-4 h-4 text-sky-400" />
                      <div>
                        <span className="font-bold text-white block">In-Store Warehouse Pickup</span>
                        <span className="text-slate-500 text-[11px]">{pickupBranch}</span>
                      </div>
                    </>
                  )}
                </div>
                <span className="font-bold text-emerald-400">
                  {fulfillmentType === "EXPRESS_SHIPPING" ? formatTHB(getShippingFee()) : "FREE (฿0.00)"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Pane (5/12 Span) — Dynamic PromptPay QR & Slip Upload Widget */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
              {/* Total Header */}
              <div className="text-center border-b border-slate-800 pb-4">
                <span className="block text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                  Total Payable Amount (Down-to-Satang)
                </span>
                <span className="font-mono font-black text-4xl text-emerald-400 tracking-tight block">
                  {formatTHB(totalAmount)}
                </span>
                <span className="block text-[11px] font-mono text-slate-500 mt-1">
                  Order Ref: <strong className="text-slate-300">#ORD-20260723-00992</strong>
                </span>
              </div>

              {/* Dynamic PromptPay QR Box */}
              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center justify-between w-full font-mono text-xs text-slate-400 border-b border-slate-850 pb-2">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <QrCode className="w-4 h-4" /> PromptPay QR
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 font-bold",
                    timeLeft < 300 ? "text-rose-400 animate-pulse" : "text-sky-400"
                  )}>
                    <Clock className="w-3.5 h-3.5" /> {isExpired ? "EXPIRED" : formatCountdown(timeLeft)}
                  </span>
                </div>

                {/* QR Code Container */}
                <div className="relative p-4 rounded-xl bg-white shadow-xl">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021129370016A000000677010111011300668192833415802TH530384054074520.006304ED2A"
                    alt="PromptPay QR Code"
                    className={cn("w-44 h-44 object-contain transition-all", isExpired && "blur-md opacity-30")}
                  />
                  {isExpired && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xs rounded-xl p-3 text-center">
                      <AlertCircle className="w-8 h-8 text-rose-400 mb-2" />
                      <span className="font-mono text-xs font-bold text-white uppercase block mb-2">QR Code Expired</span>
                      <button
                        onClick={() => { setTimeLeft(15 * 60); setIsExpired(false); }}
                        className="px-3 py-1.5 rounded bg-emerald-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Regenerate
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-mono text-slate-400 text-center">
                  Scan with any Thai mobile banking app (`K PLUS`, `SCB EASY`, `Krungthai NEXT`).
                </p>
              </div>

              {/* Payment Slip Upload Widget with Real-Time Preview Canvas */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase font-bold text-white flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-emerald-400" /> Upload Transfer Slip
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">JPG, PNG, PDF (Max 10MB)</span>
                </div>

                {!previewUrl ? (
                  <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all group">
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                    <UploadCloud className="w-10 h-10 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
                    <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-white">
                      Drop Bank Transfer Slip Here
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">or Click to Browse Mobile / Camera</span>
                  </label>
                ) : (
                  <div className="space-y-3">
                    {/* Real-time preview canvas */}
                    <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-center gap-4">
                      <img src={previewUrl} alt="Slip preview" className="w-16 h-20 object-cover rounded-lg border border-slate-700 shrink-0" />
                      
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-white truncate max-w-[150px]">
                            {uploadedFile?.name || "bank_slip.jpg"}
                          </span>
                          <button onClick={() => { setPreviewUrl(null); setUploadedFile(null); setOcrState("IDLE"); }} className="text-[11px] text-rose-400 font-mono underline">
                            Remove
                          </button>
                        </div>

                        {/* OCR Status Simulation */}
                        {ocrState === "SCANNING" && (
                          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Scanning Slip QR & Extracting Transfer Details...</span>
                          </div>
                        )}

                        {ocrState === "SUCCESS" && (
                          <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs space-y-0.5">
                            <div className="flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>OCR Verified: {formatTHB(ocrAmount || totalAmount)} ✅</span>
                            </div>
                            <div className="text-[10px] text-emerald-400/80">
                              Transfer Timestamp: 23/07/2026 14:15 • Ref #0149823901239
                            </div>
                          </div>
                        )}

                        {ocrState === "MISMATCH" && (
                          <div className="p-2 rounded bg-amber-950 border border-amber-500 text-amber-300 font-mono text-xs">
                            ⚠️ Warning: Uploaded slip shows {formatTHB(ocrAmount || 0)} vs Order Total {formatTHB(totalAmount)}. Admin review required.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={!previewUrl || ocrState === "SCANNING" || isSubmitting}
                  className={cn(
                    "w-full py-4 rounded-xl font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg",
                    previewUrl && ocrState !== "SCANNING"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 shadow-emerald-500/25 active:scale-[0.98]"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Payment & Releasing Order...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 stroke-[2.5]" />
                      <span>Submit Order & Verify Payment &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
