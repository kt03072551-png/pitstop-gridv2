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
import { useTranslation } from "@/lib/i18n/translations";

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
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-wider">
                {t.adminOrders.portalBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight mt-0.5">
                {t.adminOrders.pageTitle}
              </h1>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 text-xs font-mono font-bold text-[#112D4E] dark:text-[#BBE1FA] hover:bg-[#3F72AF] hover:text-white dark:hover:bg-[#3282B8] dark:hover:text-[#1B262C] flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> {t.adminOrders.backToDashboard}
          </Link>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="p-4 rounded-xl bg-[#DBE2EF] dark:bg-[#0F4C75] border-2 border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8] shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: t.adminOrders.tabAll, value: "ALL", count: orders.length },
            { label: t.adminOrders.tabVerifying, value: "VERIFYING_SLIP", count: orders.filter(o => o.status === "VERIFYING_SLIP").length },
            { label: t.adminOrders.tabApproved, value: "APPROVED", count: orders.filter(o => o.status === "APPROVED").length },
            { label: t.adminOrders.tabPreparing, value: "PREPARING_PARTS", count: orders.filter(o => o.status === "PREPARING_PARTS").length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={cn(
                "min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border flex items-center gap-2 shadow-sm",
                filterStatus === tab.value
                  ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-[#3F72AF] dark:border-[#3282B8] shadow-md"
                  : "bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/80 dark:text-[#85B5D9] hover:border-[#3F72AF]"
              )}
            >
              <span>{tab.label}</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E] dark:text-white text-[10px] font-black border border-[#DBE2EF] dark:border-[#0F4C75]">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E]/80 dark:text-[#85B5D9] border-b border-[#DBE2EF] dark:border-[#0F4C75] uppercase font-bold">
                <tr>
                  <th className="p-4">{t.adminOrders.colOrderRef}</th>
                  <th className="p-4">{t.adminOrders.colCustomerItems}</th>
                  <th className="p-4">{t.adminOrders.colAmountPaid}</th>
                  <th className="p-4">{t.adminOrders.colOcrCheck}</th>
                  <th className="p-4">{t.adminOrders.colFulfillment}</th>
                  <th className="p-4">{t.adminOrders.colStatus}</th>
                  <th className="p-4 text-right">{t.adminOrders.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DBE2EF]/80 dark:divide-[#0F4C75]/80 text-[#112D4E] dark:text-slate-200 font-medium">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#DBE2EF]/40 dark:hover:bg-[#0F4C75]/40 transition-colors">
                    <td className="p-4 font-bold text-[#112D4E] dark:text-white">{o.id}</td>
                    <td className="p-4">
                      <span className="font-bold text-[#112D4E] dark:text-white block">{o.customerName}</span>
                      <span className="text-[11px] text-[#112D4E]/70 dark:text-slate-400 line-clamp-1 max-w-xs mt-0.5">{o.itemsSummary}</span>
                    </td>
                    <td className="p-4 font-black text-[#3F72AF] dark:text-[#3282B8] text-sm">{formatTHB(o.amount)}</td>
                    <td className="p-4">
                      {o.ocrMatched ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/40 text-[10px] font-bold">
                          <Check className="w-3 h-3" /> {t.adminOrders.exactMatch}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/40 text-[10px] font-bold">
                          <AlertTriangle className="w-3 h-3" /> {t.adminOrders.mismatch}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#112D4E]/90 dark:text-slate-300">
                      <span className="block font-semibold">{o.fulfillment}</span>
                      <span className="text-[11px] text-[#3F72AF] dark:text-[#3282B8] font-bold">{o.warehouseBin}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg font-bold uppercase ${
                        o.status === "VERIFYING_SLIP" ? "bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500 animate-pulse" :
                        o.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500" :
                        o.status === "REJECTED" ? "bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500" :
                        "bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500"
                      }`}>
                        {o.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => { setSelectedOrder(o); setZoomLevel(1); setRotation(0); }}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold uppercase text-[11px] inline-flex items-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" /> {t.adminOrders.inspectBtn}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Left Box: High-Res Image Viewer with Zoom & Rotate */}
            <div className="w-full md:w-1/2 bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#DBE2EF] dark:border-[#0F4C75]">
              <div className="flex items-center justify-between pb-3 border-b border-[#DBE2EF] dark:border-[#0F4C75]">
                <span className="font-mono text-xs uppercase font-bold text-[#3F72AF] dark:text-[#3282B8] flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4" /> {t.adminOrders.modalInspectorTitle}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                    className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-white font-mono text-xs font-bold border border-[#DBE2EF] dark:border-[#0F4C75]"
                    title="Zoom in"
                  >
                    {t.adminOrders.zoomInBtn}
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-white font-mono text-xs font-bold border border-[#DBE2EF] dark:border-[#0F4C75]"
                    title="Zoom out"
                  >
                    {t.adminOrders.zoomOutBtn}
                  </button>
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-white border border-[#DBE2EF] dark:border-[#0F4C75]"
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
                  className="max-h-[360px] object-contain rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] transition-transform duration-200 select-none shadow-xl"
                />
              </div>

              <div className="text-center font-mono text-[11px] text-[#112D4E]/70 dark:text-[#85B5D9] pt-2 border-t border-[#DBE2EF] dark:border-[#0F4C75] font-semibold">
                Extracted Slip Timestamp: {selectedOrder.timestamp} • Ref: {selectedOrder.ocrBankRef}
              </div>
            </div>

            {/* Right Box: Order Audit Checklist & Approval Actions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-3 mb-4">
                  <div>
                    <h3 className="font-mono font-bold text-lg text-[#112D4E] dark:text-[#BBE1FA]">{t.adminOrders.modalAuditTitle} #{selectedOrder.id}</h3>
                    <span className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] font-medium">{selectedOrder.customerName} ({selectedOrder.customerPhone})</span>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 text-[#112D4E] dark:text-white hover:opacity-80">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Audit Checklist Items */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] space-y-1.5">
                    <span className="text-[#112D4E]/70 dark:text-[#85B5D9] uppercase text-[10px] block font-bold">{t.adminOrders.expectedAmountLabel}</span>
                    <span className="font-black text-2xl text-[#3F72AF] dark:text-[#3282B8] block">{formatTHB(selectedOrder.amount)}</span>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1 ${
                    selectedOrder.ocrMatched ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 border-rose-500/50 text-rose-700 dark:text-rose-300"
                  }`}>
                    <span className="uppercase text-[10px] font-bold block">{t.adminOrders.ocrAuditLabel}</span>
                    <div className="flex items-center justify-between font-bold text-sm">
                      <span>{t.adminOrders.slipReadAmountLabel}</span>
                      <span>{formatTHB(selectedOrder.ocrExtractedAmount)}</span>
                    </div>
                    {!selectedOrder.ocrMatched && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium pt-1 border-t border-rose-500/30 mt-1">
                        {t.adminOrders.mismatchWarning}
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] space-y-1 text-[#112D4E] dark:text-slate-300 font-medium">
                    <span className="text-[#112D4E]/70 dark:text-[#85B5D9] uppercase text-[10px] block font-bold">{t.adminOrders.fulfillmentLabel}</span>
                    <span className="font-bold text-[#112D4E] dark:text-white block">{selectedOrder.fulfillment}</span>
                    <span className="text-[#3F72AF] dark:text-[#3282B8] font-bold block">{t.adminOrders.allocatedBinLabel} {selectedOrder.warehouseBin}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] space-y-1 text-[#112D4E] dark:text-slate-300 font-medium">
                    <span className="text-[#112D4E]/70 dark:text-[#85B5D9] uppercase text-[10px] block font-bold">{t.adminOrders.itemsSummaryLabel}</span>
                    <p className="text-xs leading-relaxed text-[#112D4E] dark:text-slate-200">{selectedOrder.itemsSummary}</p>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              <div className="space-y-3 pt-4 border-t border-[#DBE2EF] dark:border-[#0F4C75]">
                <button
                  onClick={() => handleApproveOrder(selectedOrder.id)}
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.adminOrders.approveReleaseBtn} {selectedOrder.warehouseBin}</span>
                </button>

                <button
                  onClick={() => handleRejectOrder(selectedOrder.id)}
                  className="w-full min-h-[46px] py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/50 text-rose-600 dark:text-rose-300 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{t.adminOrders.rejectSlipBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
