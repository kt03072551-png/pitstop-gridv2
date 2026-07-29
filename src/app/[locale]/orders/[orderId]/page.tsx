"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  PackageCheck, 
  Warehouse, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";
import { formatTHB, cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/translations";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrderDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const orderIdParam = params?.orderId as string;
  
  const { data, error, isLoading } = useSWR(orderIdParam ? `/api/orders?orderId=${orderIdParam}` : null, fetcher, { refreshInterval: 3000 });
  const order = data?.order;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 font-mono text-emerald-600 dark:text-emerald-400 text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping" />
          {t.orderReceipt.loading}
        </div>
      </div>
    );
  }

  if (error || !data?.success || !order) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-slate-950 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{t.orderReceipt.notFoundTitle}</h2>
        <p className="text-slate-500 mt-2">{t.orderReceipt.notFoundDesc}</p>
        <Link href="/catalog" className="mt-4 inline-block px-4 py-2 bg-emerald-500 hover:bg-emerald-400 transition-colors text-white rounded-xl font-bold">
          {t.orderReceipt.returnToCatalog}
        </Link>
      </div>
    );
  }

  let currentStepIndex = 1;
  switch (order.status) {
    case "VERIFYING_SLIP": currentStepIndex = 1; break;
    case "APPROVED": currentStepIndex = 2; break;
    case "PREPARING_PARTS": currentStepIndex = 3; break;
    case "SHIPPED": currentStepIndex = 4; break;
  }

  const steps = [
    { label: t.orderReceipt.step1Label, status: currentStepIndex > 0 ? "completed" : "active", desc: t.orderReceipt.step1Desc },
    { label: t.orderReceipt.step2Label, status: currentStepIndex > 1 ? "completed" : currentStepIndex === 1 ? "active" : "pending", desc: currentStepIndex > 1 ? t.orderReceipt.step2DescVerified.replace("{amount}", formatTHB(order.totalAmount)) : t.orderReceipt.step2DescAwaiting },
    { label: t.orderReceipt.step3Label, status: currentStepIndex > 2 ? "completed" : currentStepIndex === 2 ? "active" : "pending", desc: currentStepIndex >= 2 ? t.orderReceipt.step3DescReleased.replace("{branch}", order.pickupBranch || t.orderReceipt.warehouseDispatch) : t.orderReceipt.step3DescPending },
    { label: t.orderReceipt.step4Label, status: currentStepIndex > 3 ? "completed" : currentStepIndex === 3 ? "active" : "pending", desc: order.fulfillmentType?.includes("PICKUP") ? t.orderReceipt.step4DescPickup : t.orderReceipt.step4DescShipping },
    { label: order.fulfillmentType?.includes("PICKUP") ? t.orderReceipt.step5LabelPickup : t.orderReceipt.step5LabelShipped, status: currentStepIndex === 4 ? "completed" : "pending", desc: order.fulfillmentType?.includes("PICKUP") ? t.orderReceipt.step5DescPickup : t.orderReceipt.step5DescShipped },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-slate-950 py-10 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Header Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-white dark:from-emerald-950/80 dark:via-slate-900 dark:to-slate-900 border border-emerald-200 dark:border-emerald-500/80 shadow-lg dark:shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors duration-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
              <PackageCheck className="w-8 h-8 text-white dark:text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> {t.orderReceipt.successBadge}
              </div>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-white uppercase tracking-tight mt-0.5">
                {t.orderReceipt.receiptTitle.replace("{orderId}", orderIdParam)}
              </h1>
              <p className="text-xs text-[#112D4E]/70 dark:text-slate-300 mt-1">
                {t.orderReceipt.receiptDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#F9F7F7] dark:hover:bg-slate-750 text-[#112D4E] dark:text-white font-mono text-xs font-semibold flex items-center gap-2 border border-[#DBE2EF] dark:border-slate-700 transition-colors shrink-0 shadow-sm dark:shadow-none"
          >
            <Printer className="w-4 h-4" />
            <span>{t.orderReceipt.printBtn}</span>
          </button>
        </div>

        {/* Status Stepper Card */}
        <div className="rounded-2xl border border-[#DBE2EF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-xl space-y-6 transition-colors duration-200">
          <h3 className="font-mono text-xs font-bold text-[#112D4E]/60 dark:text-slate-400 uppercase tracking-wider border-b border-[#DBE2EF] dark:border-slate-800 pb-3">
            {t.orderReceipt.statusTitle}
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
                      isDone && "bg-emerald-500 text-white dark:text-slate-950 shadow-emerald-500/30",
                      isActive && "bg-sky-500 text-white dark:text-slate-950 ring-4 ring-sky-500/30 animate-pulse",
                      !isDone && !isActive && "bg-[#F9F7F7] dark:bg-slate-800 text-[#112D4E]/40 dark:text-slate-500 border border-[#DBE2EF] dark:border-slate-700"
                    )}>
                      {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={cn(
                        "hidden sm:block h-0.5 flex-1 rounded",
                        isDone ? "bg-emerald-500" : "bg-[#DBE2EF] dark:bg-slate-800"
                      )} />
                    )}
                  </div>
                  <div>
                    <span className={cn(
                      "font-mono text-xs font-bold block leading-tight",
                      isDone && "text-emerald-600 dark:text-emerald-400",
                      isActive && "text-[#112D4E] dark:text-white",
                      !isDone && !isActive && "text-[#112D4E]/50 dark:text-slate-500"
                    )}>
                      {step.label}
                    </span>
                    <span className="text-[11px] text-[#112D4E]/60 dark:text-slate-400 font-normal mt-0.5 block leading-snug">
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
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-xl space-y-4 flex flex-col justify-between transition-colors duration-200">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Warehouse className="w-4 h-4" /> {t.orderReceipt.warehouseTitle}
              </span>
              <h4 className="font-bold text-lg text-[#112D4E] dark:text-white">{order.pickupBranch || t.orderReceipt.warehouseDispatch}</h4>
              <p 
                className="text-xs text-[#112D4E]/70 dark:text-slate-300 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: t.orderReceipt.warehouseDesc.replace("{branch}", order.pickupBranch || t.orderReceipt.warehouseDispatch) }} 
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#F9F7F7] dark:bg-slate-950 border border-[#DBE2EF] dark:border-slate-800 flex items-center justify-between text-xs font-mono transition-colors duration-200">
              <span className="text-[#112D4E]/70 dark:text-slate-400">{t.orderReceipt.readyTimeLabel}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{t.orderReceipt.readyTimeValue}</span>
            </div>
          </div>

          {/* Right: Payment Slip Verification Audit */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors duration-200">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {t.orderReceipt.auditTitle}
            </span>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#DBE2EF] dark:border-slate-800 text-[#112D4E]/70 dark:text-slate-300">
                <span>{t.orderReceipt.auditMethod}</span>
                <span className="font-bold text-[#112D4E] dark:text-white">{t.orderReceipt.auditMethodValue}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#DBE2EF] dark:border-slate-800 text-[#112D4E]/70 dark:text-slate-300">
                <span>{t.orderReceipt.auditTotal}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatTHB(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#DBE2EF] dark:border-slate-800 text-[#112D4E]/70 dark:text-slate-300">
                <span>{t.orderReceipt.auditRef}</span>
                <span className="font-bold text-[#112D4E] dark:text-slate-200">
                  {order.ocrAuditDetails?.bankReferenceNumber 
                    ? order.ocrAuditDetails.bankReferenceNumber.length > 20 
                      ? `${order.ocrAuditDetails.bankReferenceNumber.substring(0, 8)}...${order.ocrAuditDetails.bankReferenceNumber.substring(order.ocrAuditDetails.bankReferenceNumber.length - 4)}` 
                      : order.ocrAuditDetails.bankReferenceNumber 
                    : "Pending"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-[#112D4E]/70 dark:text-slate-300">
                <span>{t.orderReceipt.auditValidation}</span>
                {order.ocrAuditDetails?.extractedAmount === order.totalAmount ? (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {t.orderReceipt.auditMatch}</span>
                ) : (
                  <span className="font-bold text-amber-500 inline-flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1" /> {t.orderReceipt.auditPending}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#F9F7F7] dark:hover:bg-slate-800 text-[#112D4E] dark:text-slate-200 font-mono font-bold text-xs uppercase tracking-wider border border-[#DBE2EF] dark:border-slate-800 transition-colors flex items-center gap-2 shadow-sm dark:shadow-none"
          >
            <ArrowLeft className="w-4 h-4" /> {t.orderReceipt.continueShopping}
          </Link>
          
          <Link
            href="/my-orders"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
          >
            {t.orderReceipt.returnToOrders}
          </Link>
        </div>
      </div>
    </div>
  );
}
