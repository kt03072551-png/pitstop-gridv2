"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ZoomIn, 
  RotateCw, 
  Search, 
  Filter, 
  Warehouse, 
  ArrowLeft, 
  Eye, 
  X, 
  Check, 
  AlertTriangle,
  ShieldCheck,
  Clock
} from "lucide-react";
import { formatTHB, cn } from "@/lib/utils";

interface OrderAuditRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  status: "VERIFYING_SLIP" | "APPROVED" | "REJECTED" | "PREPARING_PARTS" | "SHIPPED";
  timestamp: string;
  fulfillment: string;
  warehouseBin: string;
  slipImageUrl: string;
  ocrMatched: boolean;
  ocrExtractedAmount: number;
  ocrBankRef: string;
  itemsSummary: string;
}

const MOCK_ADMIN_ORDERS: OrderAuditRecord[] = [
  {
    id: "ORD-992",
    customerName: "Somchai Kiatikun",
    customerPhone: "081-992-8812",
    amount: 4520,
    status: "VERIFYING_SLIP",
    timestamp: "23/07/2026 14:15",
    fulfillment: "In-Store Pickup (Bangna Hub)",
    warehouseBin: "Bin A12-4",
    slipImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    ocrMatched: true,
    ocrExtractedAmount: 4520,
    ocrBankRef: "0149823901239",
    itemsSummary: "1x Spoon Carbon Hood Vented Flange Kit, 2x Motul 300V Oil",
  },
  {
    id: "ORD-991",
    customerName: "Pichai Veerachai",
    customerPhone: "089-112-3344",
    amount: 84500,
    status: "VERIFYING_SLIP",
    timestamp: "23/07/2026 13:50",
    fulfillment: "Express Courier Shipping",
    warehouseBin: "Bin C08-1",
    slipImageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    ocrMatched: false,
    ocrExtractedAmount: 84000,
    ocrBankRef: "0149823908811",
    itemsSummary: "1x Spoon Sports Dry Carbon Hood (FL5 Track Spec)",
  },
  {
    id: "ORD-990",
    customerName: "Anan Thongprasert",
    customerPhone: "082-441-9900",
    amount: 12400,
    status: "APPROVED",
    timestamp: "23/07/2026 12:30",
    fulfillment: "In-Store Pickup (Laksi Hub)",
    warehouseBin: "Bin B04-2",
    slipImageUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80",
    ocrMatched: true,
    ocrExtractedAmount: 12400,
    ocrBankRef: "0149823901990",
    itemsSummary: "1x Brembo GT 6-Piston Brake Rotor Set",
  },
  {
    id: "ORD-989",
    customerName: "Wichai Pongsatorn",
    customerPhone: "086-778-1212",
    amount: 650,
    status: "PREPARING_PARTS",
    timestamp: "23/07/2026 11:10",
    fulfillment: "Express Courier Shipping",
    warehouseBin: "Bin A01-9",
    slipImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    ocrMatched: true,
    ocrExtractedAmount: 650,
    ocrBankRef: "0149823901455",
    itemsSummary: "1x OEM Honda Oil Filter 15400-RTA-003",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderAuditRecord[]>(MOCK_ADMIN_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderAuditRecord | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "ALL") return true;
    return o.status === filterStatus;
  });

  const handleApproveOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "APPROVED" } : o))
    );
    setSelectedOrder(null);
    setToastMsg(`Order #${orderId} Approved & Released to Warehouse Bin Picking!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "REJECTED" } : o))
    );
    setSelectedOrder(null);
    setToastMsg(`Order #${orderId} Payment Slip Rejected. Customer notified via email.`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-amber-400 font-bold tracking-wider">
                • Slip Audit & Order Verification Engine
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight mt-0.5">
                Orders & Payment Verification
              </h1>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 font-mono text-xs flex items-center gap-2 shadow-xl animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "All Orders", value: "ALL", count: orders.length },
            { label: "Verifying Slip (Action Required)", value: "VERIFYING_SLIP", count: orders.filter(o => o.status === "VERIFYING_SLIP").length },
            { label: "Approved & Picking", value: "APPROVED", count: orders.filter(o => o.status === "APPROVED").length },
            { label: "Preparing Parts", value: "PREPARING_PARTS", count: orders.filter(o => o.status === "PREPARING_PARTS").length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={cn(
                "px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-2",
                filterStatus === tab.value
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850"
              )}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950/60 text-[10px]">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">
                <tr>
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Customer & Items</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">OCR Check</th>
                  <th className="p-4">Fulfillment / Bin</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-850 transition-colors">
                    <td className="p-4 font-bold text-white">{o.id}</td>
                    <td className="p-4">
                      <span className="font-semibold text-white block">{o.customerName}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">{o.itemsSummary}</span>
                    </td>
                    <td className="p-4 font-black text-emerald-400 text-sm">{formatTHB(o.amount)}</td>
                    <td className="p-4">
                      {o.ocrMatched ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Exact Match
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40 text-[10px] font-bold">
                          <AlertTriangle className="w-3 h-3" /> Mismatch (-฿500)
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="block">{o.fulfillment}</span>
                      <span className="text-[11px] text-sky-400 font-bold">{o.warehouseBin}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded font-bold uppercase ${
                        o.status === "VERIFYING_SLIP" ? "bg-amber-950 text-amber-300 border border-amber-500 animate-pulse" :
                        o.status === "APPROVED" ? "bg-emerald-950 text-emerald-300 border border-emerald-500" :
                        o.status === "REJECTED" ? "bg-rose-950 text-rose-300 border border-rose-500" :
                        "bg-sky-950 text-sky-300 border border-sky-500"
                      }`}>
                        {o.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => { setSelectedOrder(o); setZoomLevel(1); setRotation(0); }}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase text-[11px] inline-flex items-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect & Verify Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side-by-Side Slip Verification Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Left Box: High-Res Image Viewer with Zoom & Rotate */}
            <div className="w-full md:w-1/2 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                <span className="font-mono text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4" /> High-Res Slip Inspector
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono text-xs"
                    title="Zoom in"
                  >
                    + Zoom
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-750 text-white font-mono text-xs"
                    title="Zoom out"
                  >
                    - Zoom
                  </button>
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-750 text-white"
                    title="Rotate 90 degrees"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Image Canvas */}
              <div className="flex-1 overflow-auto flex items-center justify-center p-4 my-2">
                <img
                  src={selectedOrder.slipImageUrl}
                  alt="Transfer Slip"
                  style={{ transform: `scale(${zoomLevel}) rotate(${rotation}deg)` }}
                  className="max-h-[360px] object-contain rounded border border-slate-800 transition-transform duration-200 select-none shadow-xl"
                />
              </div>

              <div className="text-center font-mono text-[11px] text-slate-500 pt-2 border-t border-slate-850">
                Extracted Slip Timestamp: {selectedOrder.timestamp} • Ref: {selectedOrder.ocrBankRef}
              </div>
            </div>

            {/* Right Box: Order Audit Checklist & Approval Actions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <h3 className="font-mono font-bold text-lg text-white">Order #{selectedOrder.id} Audit</h3>
                    <span className="text-xs text-slate-400">{selectedOrder.customerName} ({selectedOrder.customerPhone})</span>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Audit Checklist Items */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 uppercase text-[10px] block">Expected Order Amount</span>
                    <span className="font-black text-2xl text-emerald-400 block">{formatTHB(selectedOrder.amount)}</span>
                  </div>

                  <div className={`p-3 rounded-xl border space-y-1 ${
                    selectedOrder.ocrMatched ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" : "bg-rose-950/40 border-rose-500/50 text-rose-300"
                  }`}>
                    <span className="uppercase text-[10px] font-bold block">Automated OCR & QR Audit Result</span>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>Slip Read Amount:</span>
                      <span>{formatTHB(selectedOrder.ocrExtractedAmount)}</span>
                    </div>
                    {!selectedOrder.ocrMatched && (
                      <p className="text-[11px] text-rose-400 font-normal pt-1 border-t border-rose-500/30 mt-1">
                        ⚠️ Mismatch warning: The transfer amount on the slip is ฿500 less than the required invoice amount. Double-check before approval.
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                    <span className="text-slate-400 uppercase text-[10px] block">Fulfillment Coordinates</span>
                    <span className="font-bold text-white block">{selectedOrder.fulfillment}</span>
                    <span className="text-sky-400 font-bold block">Allocated Bin: {selectedOrder.warehouseBin}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                    <span className="text-slate-400 uppercase text-[10px] block">Items Summary</span>
                    <p className="text-xs leading-relaxed text-slate-200">{selectedOrder.itemsSummary}</p>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleApproveOrder(selectedOrder.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Approve Order & Release to {selectedOrder.warehouseBin}</span>
                </button>

                <button
                  onClick={() => handleRejectOrder(selectedOrder.id)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 text-slate-300 font-mono font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Slip & Request Re-Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
