"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { ShieldAlert, Loader2, LogIn } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "@/lib/i18n/translations";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Still hydrating — show loading
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <Loader2 className="w-4 h-4 animate-spin" />
          {t.adminLayout.verifying}
        </div>
      </div>
    );
  }

  // Not logged in at all
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center px-4 transition-colors duration-200">
        <div className="max-w-md w-full bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80 backdrop-blur-xl rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#3F72AF] to-amber-500" />
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500 flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                {t.adminLayout.authRequiredTitle}
              </h1>
              <p className="text-sm text-[#112D4E]/70 dark:text-[#85B5D9] mt-2 font-medium">
                {t.adminLayout.authRequiredDesc}
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-[46px] gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA] text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-md active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              {t.adminLayout.signInBtn}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in but NOT an admin or seller — access denied
  if (user.role !== "ADMIN" && user.role !== "SELLER") {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center px-4 transition-colors duration-200">
        <div className="max-w-md w-full bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80 backdrop-blur-xl rounded-2xl border border-rose-500/60 shadow-2xl overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500 flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                {t.adminLayout.accessDeniedTitle}
              </h1>
              <p className="text-sm text-[#112D4E]/70 dark:text-[#85B5D9] mt-2 font-medium">
                {t.adminLayout.accessDeniedDesc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] font-mono font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-all shadow-sm"
              >
                {t.adminLayout.backToStore}
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 text-white dark:text-[#1B262C] font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                {t.adminLayout.browseCatalog}
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
