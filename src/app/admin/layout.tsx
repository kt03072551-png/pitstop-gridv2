"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Still hydrating — show loading
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="font-mono text-amber-400 text-sm animate-pulse flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Verifying Admin Credentials...
        </div>
      </div>
    );
  }

  // Not logged in at all
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-500/60 via-rose-500/40 to-amber-500/60" />
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-black text-white uppercase tracking-tight">
                Authentication Required
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                You must sign in to access the Seller & Warehouse Operations Portal.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in but NOT an admin or seller — access denied
  if (user.role !== "ADMIN" && user.role !== "SELLER") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-rose-500/40 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-black text-white uppercase tracking-tight">
                Access Denied
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                This area is restricted to Admin and Seller accounts only.
                Customer accounts can browse the catalog, manage their garage, and place orders from the storefront.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-all"
              >
                ← Back to Store
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider hover:from-emerald-400 hover:to-emerald-300 transition-all shadow-lg shadow-emerald-500/20"
              >
                Browse Parts Catalog →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin/Seller — render the admin pages
  return <>{children}</>;
}
