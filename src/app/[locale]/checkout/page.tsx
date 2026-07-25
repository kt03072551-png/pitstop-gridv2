"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { 
  QrCode, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Warehouse, 
  Sparkles,
  Loader2,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatTHB, cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/translations";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { 
    items, 
    fulfillmentType, 
    pickupBranch, 

    getTotal,
    clearCart,
    setFulfillmentType
  } = useCartStore();
  const { activeVehicle } = useVehicleStore();
  const { user } = useAuthStore();

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [isExpired, setIsExpired] = useState(false);

  // Slip upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Slip, setBase64Slip] = useState<string | null>(null);
  const [ocrState, setOcrState] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "MISMATCH">("IDLE");
  const [ocrAmount, setOcrAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const processFile = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Slip(reader.result as string);
    };
    reader.readAsDataURL(file);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          break; // only process the first image
        }
      }
    }
  };



  const handleSubmitOrder = async () => {
    if (!uploadedFile && ocrState !== "SUCCESS") return;
    setIsSubmitting(true);
    
    try {
      const payload = {
        userId: user?.id,
        fulfillmentType,
        pickupBranchId: pickupBranch,
        paymentSlipUrl: base64Slip || undefined,
        ocrVerifiedAmount: ocrAmount,
        items: items.map(item => ({
          partId: item.part.id,
          oemPartNumber: item.part.oemPartNumber,
          quantity: item.quantity,
          price: item.part.price,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        clearCart();
        router.push(`/orders/${data.order.orderId}`);
      } else {
        console.error("Failed to create order:", data.error, data.details);
        alert(data.error || "Failed to create order");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Network error: Could not connect to the server.");
      setIsSubmitting(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalAmount = getTotal();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Initializing Payment Gateway...
        </div>
      </div>
    );
  }

  return (
    <div onPaste={handlePaste} className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-wider">
                • {t.checkout.step2}
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                {t.checkout.title}
              </h1>
            </div>
          </div>

          <Link
            href="/cart"
            className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] hover:text-[#3F72AF] dark:hover:text-[#3282B8] flex items-center gap-1 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> {t.checkout.backToCart}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Pane (7/12 Span) — Order Summary & Fitment Confirmation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Vehicle Compatibility Confirmation Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#3F72AF]/20 via-[#DBE2EF] to-[#DBE2EF] dark:from-[#3282B8]/30 dark:via-[#0F4C75] dark:to-[#0F4C75] border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#3F72AF] dark:text-[#3282B8] tracking-wider">
                    Fitment Guarantee Active
                  </span>
                  <h3 className="font-bold text-base text-[#112D4E] dark:text-white">
                    {activeVehicle
                      ? `Verified for ${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.trim})`
                      : "Universal Order — Direct Factory Fulfillment"}
                  </h3>
                  <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mt-0.5 font-medium">
                    Order covered by Pitstop Grid 100% Fitment Replacement Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Itemized Summary */}
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-md space-y-4">
              <h3 className="font-mono text-xs font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
                Order Items Audit ({items.length})
              </h3>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.part.id} className="flex items-center justify-between py-2 border-b border-[#DBE2EF]/80 dark:border-[#0F4C75]/80 last:border-0 text-sm font-mono">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center font-bold text-xs shrink-0">
                        {item.quantity}x
                      </span>
                      <div>
                        <span className="text-[#112D4E] dark:text-white font-bold block">{item.part.title}</span>
                        <span className="text-xs text-[#112D4E]/60 dark:text-[#85B5D9]">OEM: {item.part.oemPartNumber}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#3F72AF] dark:text-[#3282B8] shrink-0">{formatTHB(item.part.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Fulfillment Selection */}
              <div className="pt-6 border-t border-[#DBE2EF] dark:border-[#0F4C75] space-y-4">
                <h3 className="font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> Fulfillment Selection
                </h3>
                <div className="space-y-3">
                  {/* EXPRESS DELIVERY */}
                  <label
                    onClick={() => setFulfillmentType("EXPRESS_SHIPPING")}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                      fulfillmentType === "EXPRESS_SHIPPING"
                        ? "bg-[#3F72AF]/10 border-[#3F72AF] dark:border-[#3282B8]"
                        : "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]/50"
                    )}
                  >
                    <div className="pt-0.5 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm text-[#112D4E] dark:text-white">Express Courier Delivery</span>
                        <span className="font-mono font-bold text-xs text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(250)}</span>
                      </div>
                      <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-medium leading-relaxed">
                        Ships today via EMS/Kerry Express. Delivery within 1-2 business days.
                      </p>
                    </div>
                  </label>

                  {/* STORE PICKUP */}
                  <label
                    onClick={() => setFulfillmentType("INSTORE_PICKUP")}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                      fulfillmentType === "INSTORE_PICKUP"
                        ? "bg-[#3F72AF]/10 border-[#3F72AF] dark:border-[#3282B8]"
                        : "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF]/50"
                    )}
                  >
                    <div className="pt-0.5 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm text-[#112D4E] dark:text-white flex items-center gap-1.5">
                          <Warehouse className="w-4 h-4" /> In-Store Warehouse Pickup
                        </span>
                        <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">FREE</span>
                      </div>
                      <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-medium leading-relaxed">
                        Pick up from Bangna or Laksi Hub within 2 hours.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane (5/12 Span) — Dynamic PromptPay QR & Slip Upload Widget */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-xl space-y-6">
              {/* Total Header */}
              <div className="text-center border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-4">
                <span className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold mb-1">
                  Total Payable Amount (Down-to-Satang)
                </span>
                <span className="font-mono font-black text-4xl text-[#3F72AF] dark:text-[#3282B8] tracking-tight block">
                  {formatTHB(totalAmount)}
                </span>
                <span className="block text-[11px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] mt-1 font-semibold">
                  Order Ref: <strong className="text-[#112D4E] dark:text-white">#ORD-20260723-00992</strong>
                </span>
              </div>

              {/* Dynamic PromptPay QR Box */}
              <div className="relative rounded-2xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] p-6 flex flex-col items-center justify-center space-y-3 shadow-inner">
                <div className="flex items-center justify-between w-full font-mono text-xs text-[#112D4E]/70 dark:text-[#85B5D9] border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-2">
                  <span className="flex items-center gap-1.5 text-[#3F72AF] dark:text-[#3282B8] font-bold">
                    <QrCode className="w-4 h-4" /> {t.checkout.paymentMethodTitle}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 font-bold",
                    timeLeft < 300 ? "text-rose-500 animate-pulse" : "text-[#3F72AF] dark:text-[#3282B8]"
                  )}>
                    <Clock className="w-3.5 h-3.5" /> {isExpired ? "EXPIRED" : formatCountdown(timeLeft)}
                  </span>
                </div>

                {/* QR Code Container */}
                <div className="relative p-4 rounded-xl bg-white shadow-xl border border-[#DBE2EF]">
                  <Image
                    src="/qr-placeholder.png"
                    alt="PromptPay QR Code"
                    width={176}
                    height={176}
                    className={cn("w-44 h-44 object-contain transition-all", isExpired && "blur-md opacity-30")}
                  />
                  {isExpired && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#112D4E]/90 dark:bg-[#1B262C]/90 backdrop-blur-xs rounded-xl p-3 text-center">
                      <AlertCircle className="w-8 h-8 text-rose-400 mb-2" />
                      <span className="font-mono text-xs font-bold text-white uppercase block mb-2">QR Code Expired</span>
                      <button
                        onClick={() => { setTimeLeft(15 * 60); setIsExpired(false); }}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-[#3F72AF] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-[11px] font-mono text-[#112D4E]/70 dark:text-[#85B5D9] text-center font-medium">
                  Scan with any Thai mobile banking app (`K PLUS`, `SCB EASY`, `Krungthai NEXT`).
                </p>
              </div>

              {/* Payment Slip Upload Widget with Real-Time Preview Canvas */}
              <div className="space-y-3 pt-2 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase font-bold text-[#112D4E] dark:text-[#BBE1FA] flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> {t.checkout.uploadSlipTitle}
                  </label>
                  <span className="text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] font-medium">JPG, PNG, PDF (Max 10MB)</span>
                </div>

                {!previewUrl ? (
                  <label className="border-2 border-dashed border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#F9F7F7] dark:bg-[#1B262C] transition-all group shadow-inner">
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                    <UploadCloud className="w-10 h-10 text-[#3F72AF] dark:text-[#3282B8] group-hover:scale-110 transition-transform mb-2" />
                    <span className="font-mono text-xs font-bold text-[#112D4E] dark:text-white">
                      {t.checkout.uploadBtn}
                    </span>
                    <span className="text-[11px] text-[#112D4E]/60 dark:text-[#85B5D9] mt-1 font-medium">{t.checkout.uploadSlipDesc}</span>
                  </label>
                ) : (
                  <div className="space-y-3">
                    {/* Real-time preview canvas */}
                    <div className="relative rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#F9F7F7] dark:bg-[#1B262C] p-3 flex items-center gap-4 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Slip preview" className="w-16 h-20 object-cover rounded-lg border border-[#DBE2EF] dark:border-[#0F4C75] shrink-0" />
                      
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#112D4E] dark:text-white truncate max-w-[150px]">
                            {uploadedFile?.name || "pasted_slip.png"}
                          </span>
                          <button onClick={() => { setPreviewUrl(null); setUploadedFile(null); setBase64Slip(null); setOcrState("IDLE"); }} className="text-[11px] text-rose-500 font-mono font-bold underline min-h-[36px] flex items-center">
                            Remove
                          </button>
                        </div>

                        {/* OCR Status Simulation */}
                        {ocrState === "SCANNING" && (
                          <div className="flex items-center gap-2 text-xs font-mono text-[#3F72AF] dark:text-[#3282B8] font-bold">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Scanning Slip QR & Extracting Details...</span>
                          </div>
                        )}

                        {ocrState === "SUCCESS" && (
                          <div className="p-2.5 rounded-xl bg-[#3F72AF]/10 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] font-mono text-xs space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
                              <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> OCR Verified: {formatTHB(ocrAmount || totalAmount)}</span>
                            </div>
                            <div className="text-[10px] text-[#112D4E]/80 dark:text-[#BBE1FA]/80 font-medium">
                              Transfer Timestamp: 23/07/2026 14:15 • Ref #0149823901239
                            </div>
                          </div>
                        )}

                        {ocrState === "MISMATCH" && (
                          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500 text-amber-800 dark:text-amber-200 font-mono text-xs font-bold">
                            <div className="flex items-start"><AlertTriangle className="w-4 h-4 mr-1.5 shrink-0 mt-0.5" /> <span>Warning: Uploaded slip shows {formatTHB(ocrAmount || 0)} vs Order Total {formatTHB(totalAmount)}. Admin review required.</span></div>
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
                    "w-full min-h-[46px] py-4 rounded-xl font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg",
                    previewUrl && ocrState !== "SCANNING"
                      ? "bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA] text-white dark:text-[#1B262C] hover:opacity-95 active:scale-[0.98]"
                      : "bg-[#DBE2EF] dark:bg-[#0F4C75] text-[#112D4E]/40 dark:text-[#BBE1FA]/40 cursor-not-allowed border border-[#DBE2EF] dark:border-[#0F4C75]"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.checkout.confirming}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 stroke-[2.5]" />
                      <span>{t.checkout.confirmBtn} &rarr;</span>
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
