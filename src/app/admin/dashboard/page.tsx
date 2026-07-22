"use client";

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  Package, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Warehouse, 
  DollarSign,
  Users,
  Eye
} from "lucide-react";
import { formatTHB } from "@/lib/utils";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Daily Gross Revenue", value: formatTHB(148500), change: "+18.4% vs yesterday", icon: DollarSign, color: "text-emerald-400 bg-emerald-950/80 border-emerald-500/50" },
    { title: "Pending Slip Audits", value: "3 Orders", change: "Requires Manual/OCR Review", icon: FileText, color: "text-amber-400 bg-amber-950/80 border-amber-500/50" },
    { title: "Warehouse Hub Fulfillment", value: "14 Picked", change: "2-Hour Express Bin Ready", icon: Warehouse, color: "text-sky-400 bg-sky-950/80 border-sky-500/50" },
    { title: "Low Stock Bin Alerts", value: "2 SKUs", change: "Re-order threshold reached", icon: AlertTriangle, color: "text-rose-400 bg-rose-950/80 border-rose-500/50" },
  ];

  const recentOrders = [
    { id: "ORD-992", customer: "Somchai K.", amount: 4520, status: "VERIFYING_SLIP", time: "2 mins ago", branch: "Bangna Hub (Bin A12-4)" },
    { id: "ORD-991", customer: "Pichai V.", amount: 84500, status: "APPROVED", time: "18 mins ago", branch: "Express Courier" },
    { id: "ORD-990", customer: "Anan T.", amount: 12400, status: "PREPARING_PARTS", time: "1 hr ago", branch: "Laksi Hub (Bin B04-2)" },
    { id: "ORD-989", customer: "Wichai P.", amount: 650, status: "SHIPPED", time: "3 hrs ago", branch: "Express Courier" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-amber-400 font-bold tracking-wider">
                • Seller & Warehouse Operations Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight mt-0.5">
                Executive Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Verify Payment Slips ({recentOrders.filter(o => o.status === "VERIFYING_SLIP").length})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 uppercase font-semibold">{stat.title}</span>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="font-mono font-black text-2xl text-white block tracking-tight">{stat.value}</span>
                  <span className="text-xs font-mono text-slate-400 mt-1 block">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Orders & Slip Audit Queue Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase text-amber-400">Live Queue</span>
              <h3 className="font-mono font-bold text-lg text-white uppercase">Recent Orders & Slip Verification Feed</h3>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
            >
              View Full Audit Table &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Fulfillment / Bin</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Time</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="p-3 font-bold text-white">{o.id}</td>
                    <td className="p-3 text-slate-300">{o.customer}</td>
                    <td className="p-3 font-bold text-emerald-400">{formatTHB(o.amount)}</td>
                    <td className="p-3 text-slate-300">{o.branch}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded font-bold uppercase ${
                        o.status === "VERIFYING_SLIP" ? "bg-amber-950 text-amber-300 border border-amber-500/50 animate-pulse" :
                        o.status === "APPROVED" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50" :
                        "bg-sky-950 text-sky-300 border border-sky-500/50"
                      }`}>
                        {o.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{o.time}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/orders?focus=${o.id}`}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 inline-flex items-center gap-1 text-[11px]"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect Slip
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
