"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  PackageCheck, 
  Truck, 
  Warehouse, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles,
  QrCode,
  MapPin
} from "lucide-react";
import { formatTHB, cn } from "@/lib/utils";

export default function OrderDetailPage() {
  const params = useParams();
  const orderIdParam = (params?.orderId as string) || "ORD-992";

  const steps = [
    { label: "Payment Submitted", status: "completed", desc: "Slip uploaded & scanned by OCR" },
    { label: "Slip Verification", status: "completed", desc: "Amount ฿4,520.00 verified" },
    { label: "Order Approved", status: "active", desc: "Released to Warehouse Bin A12-4" },
    { label: "Preparing Parts", status: "pending", desc: "Picker #4 boxing items" },
    { label: "Ready for Pickup", status: "pending", desc: "Available at Bangna Hub within 120 mins" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Header Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/80 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
              <PackageCheck className="w-8 h-8 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Order Confirmed & OCR Verified
              </div>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight mt-0.5">
                Receipt #{orderIdParam}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                A digital tax invoice and warehouse collection pass have been sent to your email.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-mono text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print Tax Invoice</span>
          </button>
        </div>

        {/* Status Stepper Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-6">
          <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3">
            Real-Time Order Fulfillment Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => {
              const isDone = step.status === "completed";
              const isActive = step.status === "active";
              return (
                <div key={step.label} className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all shadow-md",
                      isDone && "bg-emerald-500 text-slate-950 shadow-emerald-500/30",
                      isActive && "bg-sky-500 text-slate-950 ring-4 ring-sky-500/30 animate-pulse",
                      !isDone && !isActive && "bg-slate-800 text-slate-500 border border-slate-700"
                    )}>
                      {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={cn(
                        "hidden sm:block h-0.5 flex-1 rounded",
                        isDone ? "bg-emerald-500" : "bg-slate-800"
                      )} />
                    )}
                  </div>
                  <div>
                    <span className={cn(
                      "font-mono text-xs font-bold block leading-tight",
                      isDone && "text-emerald-400",
                      isActive && "text-white",
                      !isDone && !isActive && "text-slate-500"
                    )}>
                      {step.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal mt-0.5 block leading-snug">
                      {step.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Warehouse Hub Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Fulfillment Coordinates */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Warehouse className="w-4 h-4" /> Warehouse Collection Coordinates
              </span>
              <h4 className="font-bold text-lg text-white">Bangna Logistics Hub (Main Bin)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Km. 8 Bangna-Trad Road, Bangkok. Your items have been allocated from <strong className="text-emerald-400 font-mono">Bin A12-4</strong> and are currently entering express picking boxes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Estimated Ready Time:</span>
              <span className="font-bold text-emerald-400">Within 120 Minutes (Today 16:15)</span>
            </div>
          </div>

          {/* Right: Payment Slip Verification Audit */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Payment Slip OCR Audit Record
            </span>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Method:</span>
                <span className="font-bold text-white">PromptPay Bank Transfer</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Total Paid:</span>
                <span className="font-bold text-emerald-400">{formatTHB(4520)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Transaction Ref:</span>
                <span className="font-bold text-slate-200">#0149823901239</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-300">
                <span>OCR Validation:</span>
                <span className="font-bold text-emerald-400 inline-flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 100% Exact Match Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono font-bold text-xs uppercase tracking-wider border border-slate-800 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Catalog Shopping
          </Link>
          
          <Link
            href="/garage"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
          >
            Return to My Garage
          </Link>
        </div>
      </div>
    </div>
  );
}
