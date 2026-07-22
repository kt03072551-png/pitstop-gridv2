"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Truck, 
  Warehouse, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useVehicleStore } from "@/store/useVehicleStore";
import { FitmentBadge } from "@/components/ui/FitmentBadge";
import { formatTHB, cn } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    fulfillmentType, 
    setFulfillmentType, 
    getSubtotal, 
    getShippingFee, 
    getTotal 
  } = useCartStore();

  const { activeVehicle, checkFitment } = useVehicleStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Loading Cart...
        </div>
      </div>
    );
  }

  const hasIncompatibleItems = items.some((item) => {
    const status = checkFitment(item.part);
    return status === "INCOMPATIBLE";
  });

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-wider">
                • Step 1 of 3: Cart Review
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                Shopping Cart & Fitment Audit
              </h1>
            </div>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-mono text-[#112D4E]/70 dark:text-[#85B5D9] hover:text-[#3F72AF] dark:hover:text-[#3282B8] flex items-center gap-1 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Fitment Re-Validation Alert Banner */}
        {hasIncompatibleItems && (
          <div className="p-4 rounded-2xl bg-rose-500/20 dark:bg-rose-950/90 border border-rose-500 text-rose-800 dark:text-rose-200 flex items-center justify-between gap-4 shadow-md animate-pulse">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <h3 className="font-mono font-bold text-sm uppercase">Compatibility Warning Detected</h3>
                <p className="text-xs opacity-90 mt-0.5 font-medium">
                  One or more items in your cart (`[ ⚠️ Incompatible ]`) do not match your currently active garage vehicle (`{activeVehicle ? `${activeVehicle.year} ${activeVehicle.model}` : "None"}`). Double-check part specs before proceeding.
                </p>
              </div>
            </div>
            <Link
              href="/garage"
              className="px-4 py-2 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] font-mono text-xs font-bold border border-[#DBE2EF] dark:border-[#0F4C75] shrink-0 min-h-[40px] flex items-center"
            >
              Change Vehicle Profile
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#DBE2EF] dark:border-[#0F4C75] rounded-2xl p-8 bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 space-y-4 shadow-sm">
            <ShoppingCart className="w-12 h-12 text-[#3F72AF] dark:text-[#3282B8] mx-auto" />
            <h3 className="font-mono text-xl font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase">Your Shopping Cart is Empty</h3>
            <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] max-w-md mx-auto font-medium">
              Select your vehicle make, model, and year to cross-reference guaranteed bolt-on parts in our catalog.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Explore Parts Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (7/12) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 uppercase tracking-wider px-2">
                <span>Items Ordered ({items.length})</span>
                <span>Active Fitment Re-Check</span>
              </div>

              {items.map((item) => {
                const liveFitStatus = checkFitment(item.part);
                return (
                  <div
                    key={item.part.id}
                    className="p-5 rounded-2xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                  >
                    {/* Image & Title */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-20 h-20 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] overflow-hidden shrink-0 shadow-inner">
                        <img
                          src={item.part.images[0]?.imageUrl}
                          alt={item.part.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#3F72AF] dark:text-[#3282B8]">
                            {item.part.brand}
                          </span>
                          <span className="text-[#112D4E]/40 dark:text-[#BBE1FA]/40">•</span>
                          <span className="font-mono text-[10px] text-[#112D4E]/70 dark:text-[#85B5D9] font-semibold">
                            OEM: {item.part.oemPartNumber}
                          </span>
                        </div>
                        <Link
                          href={`/parts/${item.part.oemPartNumber}`}
                          className="font-bold text-sm text-[#112D4E] dark:text-[#BBE1FA] hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors line-clamp-2"
                        >
                          {item.part.title}
                        </Link>
                        <div className="pt-1">
                          <FitmentBadge status={liveFitStatus} size="sm" />
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#DBE2EF] dark:border-[#0F4C75]">
                      <div className="text-right">
                        <span className="block font-mono font-bold text-lg text-[#112D4E] dark:text-white">
                          {formatTHB(item.part.price * item.quantity)}
                        </span>
                        <span className="text-[11px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] font-medium">
                          {formatTHB(item.part.price)} each
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-xl p-1 shadow-inner">
                          <button
                            onClick={() => updateQuantity(item.part.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-[#DBE2EF] dark:bg-[#0F4C75] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold flex items-center justify-center text-xs transition-all"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-mono font-bold text-xs text-[#112D4E] dark:text-[#BBE1FA]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.part.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-[#DBE2EF] dark:bg-[#0F4C75] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold flex items-center justify-center text-xs transition-all"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.part.id)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-500 transition-colors hover:bg-rose-500/10"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Audit & Fulfillment Summary (5/12) */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-xl space-y-6">
                <h3 className="font-mono text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-wider flex items-center gap-2 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3">
                  <Sparkles className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> Fulfillment & Audit Summary
                </h3>

                {/* Fulfillment Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">
                    Delivery / Pickup Method:
                  </label>
                  <div className="space-y-2">
                    <label
                      onClick={() => setFulfillmentType("EXPRESS_SHIPPING")}
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-bold shadow-sm",
                        fulfillmentType === "EXPRESS_SHIPPING"
                          ? "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#3F72AF] ring-2 ring-[#3F72AF]/40 text-[#112D4E] dark:text-[#BBE1FA]"
                          : "bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/70 dark:text-[#85B5D9] hover:border-[#3F72AF]"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> Express Courier Shipping
                      </span>
                      <span className="font-mono text-[#3F72AF] dark:text-[#3282B8] font-bold">+฿250.00</span>
                    </label>

                    <label
                      onClick={() => setFulfillmentType("INSTORE_PICKUP")}
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-bold shadow-sm",
                        fulfillmentType === "INSTORE_PICKUP"
                          ? "bg-[#F9F7F7] dark:bg-[#1B262C] border-[#3F72AF] ring-2 ring-[#3F72AF]/40 text-[#112D4E] dark:text-[#BBE1FA]"
                          : "bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/70 dark:text-[#85B5D9] hover:border-[#3F72AF]"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" /> In-Store Pickup (Ready 2Hrs)
                      </span>
                      <span className="font-mono text-[#3F72AF] dark:text-[#3282B8] font-bold">FREE (฿0.00)</span>
                    </label>
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3 font-mono text-xs pt-3 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                  <div className="flex justify-between text-[#112D4E] dark:text-[#BBE1FA] font-medium">
                    <span>Subtotal:</span>
                    <span className="font-bold">{formatTHB(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-[#112D4E] dark:text-[#BBE1FA] font-medium">
                    <span>Shipping Fee:</span>
                    <span className="font-bold">{formatTHB(getShippingFee())}</span>
                  </div>
                  <div className="flex justify-between text-[#112D4E]/60 dark:text-[#85B5D9] text-[11px] font-medium">
                    <span>Included 7% VAT:</span>
                    <span>{formatTHB(getSubtotal() * 0.07)}</span>
                  </div>
                  <div className="pt-3 border-t border-[#DBE2EF] dark:border-[#0F4C75] flex justify-between items-center text-sm font-bold text-[#112D4E] dark:text-white">
                    <span>Total Amount:</span>
                    <span className="text-2xl text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(getTotal())}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full min-h-[46px] py-4 rounded-xl bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA] text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  <span>Proceed to Payment & Slip Upload</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#112D4E]/60 dark:text-[#85B5D9] font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8]" />
                  <span>Secure SSL PromptPay Gateway & OCR Slip Check</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
