"use client";

import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Warehouse, 
  FileText, 
  ArrowRight
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { formatTHB } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/translations";

import useSWR from "swr";

interface MyOrder {
  orderId: string;
  totalAmount: number;
  status: "PENDING_PAYMENT" | "VERIFYING_SLIP" | "APPROVED" | "PREPARING_PARTS" | "SHIPPED" | "READY_FOR_PICKUP" | "COMPLETED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  fulfillmentType: string;
  items: { title: string }[];
  pickupBranch?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MyOrdersPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const { data, error, isLoading } = useSWR(user?.id ? `/api/orders?userId=${user.id}` : null, fetcher, { refreshInterval: 3000 });
  const orders: MyOrder[] = data?.orders || [];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-2 font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Loading...
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFYING_SLIP":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/30"><Clock className="w-3.5 h-3.5" /> Verifying Payment</span>;
      case "APPROVED":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case "PREPARING_PARTS":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30"><Warehouse className="w-3.5 h-3.5" /> Preparing Parts</span>;
      case "SHIPPED":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-500/30"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/20 text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-500/30">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#112D4E] dark:text-[#BBE1FA] uppercase flex items-center gap-3">
            <Package className="w-8 h-8 text-[#3F72AF] dark:text-[#3282B8]" />
            {t.navbar.myOrders || "My Orders"}
          </h1>
          <p className="text-sm font-semibold text-[#112D4E]/70 dark:text-[#85B5D9] mt-2">
            Track your order status, payment verification, and shipping updates. Welcome back, {user?.name.split(" ")[0] || "Customer"}.
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {isLoading && <div className="text-center font-mono text-[#3F72AF] dark:text-[#3282B8]">Loading orders...</div>}
          {orders.length === 0 && !isLoading && (
            <div className="text-center font-mono text-slate-500 py-10 border border-dashed rounded-xl border-slate-300 dark:border-slate-700">
              No orders found.
            </div>
          )}
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white dark:bg-[#0F4C75]/20 border border-[#DBE2EF] dark:border-[#0F4C75] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#DBE2EF] dark:border-[#0F4C75]/50">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-lg font-bold text-[#112D4E] dark:text-[#BBE1FA]">{order.orderId}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-xs font-semibold text-[#112D4E]/60 dark:text-[#85B5D9] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm font-semibold text-[#112D4E]/60 dark:text-[#85B5D9]">Total Amount</div>
                  <div className="text-lg font-bold text-[#3F72AF] dark:text-[#3282B8]">{formatTHB(order.totalAmount)}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-[#112D4E]/60 dark:text-[#85B5D9] mb-1">Items Summary</div>
                    <div className="text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA] flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{order.items.map(i => i.title).join(', ')}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#112D4E]/60 dark:text-[#85B5D9] mb-1">Fulfillment Method</div>
                    <div className="text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA] flex items-center gap-2">
                      {order.fulfillmentType.includes("PICKUP") ? (
                        <Warehouse className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
                      ) : (
                        <Truck className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
                      )}
                      {order.fulfillmentType.replace("_", " ")} {order.pickupBranch ? `(${order.pickupBranch})` : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-end sm:justify-end">
                  <Link
                    href={`/orders/${order.orderId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] hover:bg-[#DBE2EF] dark:hover:bg-[#0F4C75] text-[#3F72AF] dark:text-[#3282B8] font-bold text-sm transition-colors border border-[#DBE2EF] dark:border-[#0F4C75]"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
