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
import { useTranslation } from "@/lib/i18n/translations";

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  const stats = [
    { title: t.adminDashboard.statDailyRevenue, value: formatTHB(148500), change: "+18.4% vs yesterday", icon: DollarSign, color: "text-emerald-400 bg-emerald-950/80 border-emerald-500/50" },
    { title: t.adminDashboard.statPendingAudits, value: "3 Orders", change: "Requires Manual/OCR Review", icon: FileText, color: "text-amber-400 bg-amber-950/80 border-amber-500/50" },
    { title: t.adminDashboard.statWarehousePicked, value: "14 Picked", change: "2-Hour Express Bin Ready", icon: Warehouse, color: "text-sky-400 bg-sky-950/80 border-sky-500/50" },
    { title: t.adminDashboard.statLowStock, value: "2 SKUs", change: "Re-order threshold reached", icon: AlertTriangle, color: "text-rose-400 bg-rose-950/80 border-rose-500/50" },
  ];

  const recentOrders = [
    { id: "ORD-992", customer: "Somchai K.", amount: 4520, status: "VERIFYING_SLIP", time: "2 mins ago", branch: "Bangna Hub (Bin A12-4)" },
    { id: "ORD-991", customer: "Pichai V.", amount: 84500, status: "APPROVED", time: "18 mins ago", branch: "Express Courier" },
    { id: "ORD-990", customer: "Anan T.", amount: 12400, status: "PREPARING_PARTS", time: "1 hr ago", branch: "Laksi Hub (Bin B04-2)" },
    { id: "ORD-989", customer: "Wichai P.", amount: 650, status: "SHIPPED", time: "3 hrs ago", branch: "Express Courier" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase text-[#3F72AF] dark:text-[#3282B8] font-bold tracking-wider">
                {t.adminDashboard.portalBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight mt-0.5">
                {t.adminDashboard.commandCenter}
              </h1>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/admin/parts/new"
              className="min-h-[44px] px-6 py-3 rounded-xl bg-white dark:bg-[#0F4C75] border border-[#3F72AF] dark:border-[#3282B8] hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C] text-[#3F72AF] dark:text-[#3282B8] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Package className="w-4 h-4 stroke-[2.5]" />
              <span>{t.adminDashboard.addNewPartBtn}</span>
            </Link>
            <Link
              href="/admin/orders"
              className="min-h-[44px] px-6 py-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>{t.adminDashboard.verifySlipsBtn} ({recentOrders.filter(o => o.status === "VERIFYING_SLIP").length})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 border border-[#DBE2EF] dark:border-[#0F4C75] shadow-md flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#112D4E]/80 dark:text-[#85B5D9] uppercase font-bold">{stat.title}</span>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="font-mono font-black text-2xl text-[#112D4E] dark:text-white block tracking-tight">{stat.value}</span>
                  <span className="text-xs font-mono font-semibold text-[#112D4E]/60 dark:text-[#85B5D9] mt-1 block">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Orders & Slip Audit Queue Table */}
        <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase text-[#3F72AF] dark:text-[#3282B8]">{t.adminDashboard.liveQueueBadge}</span>
              <h3 className="font-mono font-bold text-lg text-[#112D4E] dark:text-[#BBE1FA] uppercase">{t.adminDashboard.recentOrdersTitle}</h3>
            </div>
            <Link
              href="/admin/orders"
              className="min-h-[36px] flex items-center text-xs font-mono text-[#3F72AF] dark:text-[#3282B8] hover:underline gap-1 font-bold"
            >
              {t.adminDashboard.viewFullTable}
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F9F7F7] dark:bg-[#1B262C] text-[#112D4E]/80 dark:text-[#85B5D9] border-b border-[#DBE2EF] dark:border-[#0F4C75] uppercase font-bold">
                <tr>
                  <th className="p-3">{t.adminDashboard.colOrderId}</th>
                  <th className="p-3">{t.adminDashboard.colCustomer}</th>
                  <th className="p-3">{t.adminDashboard.colAmount}</th>
                  <th className="p-3">{t.adminDashboard.colFulfillment}</th>
                  <th className="p-3">{t.adminDashboard.colStatus}</th>
                  <th className="p-3">{t.adminDashboard.colTime}</th>
                  <th className="p-3 text-right">{t.adminDashboard.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DBE2EF]/80 dark:divide-[#0F4C75]/80 text-[#112D4E] dark:text-slate-200 font-medium">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#DBE2EF]/40 dark:hover:bg-[#0F4C75]/40 transition-colors">
                    <td className="p-3 font-bold text-[#112D4E] dark:text-white">{o.id}</td>
                    <td className="p-3 text-[#112D4E]/90 dark:text-slate-300">{o.customer}</td>
                    <td className="p-3 font-bold text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(o.amount)}</td>
                    <td className="p-3 text-[#112D4E]/90 dark:text-slate-300">{o.branch}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-lg font-bold uppercase ${
                        o.status === "VERIFYING_SLIP" ? "bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/50 animate-pulse" :
                        o.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/50" :
                        "bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/50"
                      }`}>
                        {o.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3 text-[#112D4E]/70 dark:text-slate-400">{o.time}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/orders?focus=${o.id}`}
                        className="min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:opacity-90 text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold border border-[#DBE2EF] dark:border-[#0F4C75] inline-flex items-center justify-center gap-1.5 text-[11px] shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" /> {t.adminDashboard.inspectSlipBtn}
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
