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
      <div className="min-h-screen bg-slate-950 py-20 px-4 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
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
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center shadow-md">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
                • Step 1 of 3: Cart Review
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
                Shopping Cart & Fitment Audit
              </h1>
            </div>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Fitment Re-Validation Alert Banner */}
        {hasIncompatibleItems && (
          <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-500 text-rose-200 flex items-center justify-between gap-4 shadow-xl animate-pulse">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <h3 className="font-mono font-bold text-sm uppercase">Compatibility Warning Detected</h3>
                <p className="text-xs opacity-90 mt-0.5">
                  One or more items in your cart (`[ ⚠️ Incompatible ]`) do not match your currently active garage vehicle (`{activeVehicle ? `${activeVehicle.year} ${activeVehicle.model}` : "None"}`). Double-check part specs before proceeding.
                </p>
              </div>
            </div>
            <Link
              href="/garage"
              className="px-3 py-1.5 rounded bg-slate-900 text-white font-mono text-xs font-bold border border-slate-700 shrink-0"
            >
              Change Vehicle Profile
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl p-8 bg-slate-900/30 space-y-4">
            <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-mono text-xl font-bold text-white uppercase">Your Shopping Cart is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Select your vehicle make, model, and year to cross-reference guaranteed bolt-on parts in our catalog.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider"
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
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                  >
                    {/* Image & Title */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-20 h-20 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <img
                          src={item.part.images[0]?.imageUrl}
                          alt={item.part.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase font-bold text-emerald-400">
                            {item.part.brand}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="font-mono text-[10px] text-slate-400">
                            OEM: {item.part.oemPartNumber}
                          </span>
                        </div>
                        <Link
                          href={`/parts/${item.part.oemPartNumber}`}
                          className="font-bold text-sm text-white hover:text-emerald-300 transition-colors line-clamp-2"
                        >
                          {item.part.title}
                        </Link>
                        <div className="pt-1">
                          <FitmentBadge status={liveFitStatus} size="sm" />
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      <div className="text-right">
                        <span className="block font-mono font-bold text-lg text-white">
                          {formatTHB(item.part.price * item.quantity)}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {formatTHB(item.part.price)} each
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.part.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-mono font-bold text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.part.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.part.id)}
                          className="p-1.5 rounded text-slate-500 hover:text-rose-400 transition-colors"
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
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
                <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Fulfillment & Audit Summary
                </h3>

                {/* Fulfillment Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase text-slate-400 font-semibold">
                    Delivery / Pickup Method:
                  </label>
                  <div className="space-y-2">
                    <label
                      onClick={() => setFulfillmentType("EXPRESS_SHIPPING")}
                      className={cn(
                        "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-semibold",
                        fulfillmentType === "EXPRESS_SHIPPING"
                          ? "bg-slate-950 border-emerald-500 text-white"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400" /> Express Courier Shipping
                      </span>
                      <span className="font-mono text-emerald-400">+฿250.00</span>
                    </label>

                    <label
                      onClick={() => setFulfillmentType("INSTORE_PICKUP")}
                      className={cn(
                        "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs font-semibold",
                        fulfillmentType === "INSTORE_PICKUP"
                          ? "bg-slate-950 border-emerald-500 text-white"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-sky-400" /> In-Store Pickup (Ready 2Hrs)
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">FREE (฿0.00)</span>
                    </label>
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3 font-mono text-xs pt-3 border-t border-slate-800">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{formatTHB(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping Fee:</span>
                    <span className="font-semibold">{formatTHB(getShippingFee())}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Included 7% VAT:</span>
                    <span>{formatTHB(getSubtotal() * 0.07)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="text-2xl text-emerald-400">{formatTHB(getTotal())}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <span>Proceed to Payment & Slip Upload</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
