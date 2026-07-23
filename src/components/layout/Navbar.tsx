"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wrench,
  ShoppingCart,
  Warehouse,
  ShieldCheck,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
  Search,
  Sparkles,
  LogIn,
  LogOut,
  UserCircle,
  Crown,
} from "lucide-react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MyGarageDrawer } from "./MyGarageDrawer";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useTranslation } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { activeVehicle, savedVehicles } = useVehicleStore();
  const { items } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const currentActiveVehicle = mounted ? activeVehicle : null;
  const savedVehiclesCount = mounted ? savedVehicles.length : 0;
  const currentUser = mounted ? user : null;
  const currentIsAuthenticated = mounted ? isAuthenticated : false;

  const isAdmin = currentUser?.role === "ADMIN" || currentUser?.role === "SELLER";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#3F72AF]/20 dark:border-[#3282B8]/30 bg-[#DBE2EF]/85 dark:bg-[#0F4C75]/80 backdrop-blur-md transition-colors duration-200">
        {/* Top Metallic Info Bar */}
        <div className="bg-[#F9F7F7] dark:bg-[#1B262C] border-b border-[#DBE2EF] dark:border-[#0F4C75] px-4 py-1.5 text-xs text-[#112D4E]/80 dark:text-[#BBE1FA]/80 transition-colors duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#3F72AF] dark:text-[#3282B8] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-pulse" />
                {t.navbar.hubsLive}
              </span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                {t.navbar.guarantee}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Only show Seller Portal link for admin/seller users */}
              {currentIsAuthenticated && isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold tracking-wide transition-all",
                    pathname.startsWith("/admin")
                      ? "bg-amber-500/20 border border-amber-500/50 text-amber-300"
                      : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700"
                  )}
                >
                  <LayoutDashboard className="w-3 h-3 text-amber-400" />
                  <span>{t.navbar.sellerPortal}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#3F72AF] to-[#112D4E] dark:from-[#3282B8] dark:to-[#0F4C75] flex items-center justify-center shadow-md shadow-[#3F72AF]/20 dark:shadow-[#3282B8]/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-base sm:text-lg font-black tracking-tighter text-[#112D4E] dark:text-[#BBE1FA] uppercase flex items-center gap-1">
                PITSTOP <span className="text-[#3F72AF] dark:text-[#3282B8]">GRID</span>
              </span>
              <span className="hidden sm:block text-[10px] font-mono tracking-widest text-[#3F72AF] dark:text-[#85B5D9] uppercase -mt-1">
                v2.0 OEM & Fitment Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#112D4E]/90 dark:text-[#BBE1FA]/90">
            <Link
              href="/"
              className={cn(
                "hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors py-1 border-b-2",
                pathname === "/" ? "border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] font-bold" : "border-transparent"
              )}
            >
              {t.navbar.home}
            </Link>
            <Link
              href="/catalog"
              className={cn(
                "hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors py-1 border-b-2",
                pathname.startsWith("/catalog") || pathname.startsWith("/parts")
                  ? "border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] font-bold"
                  : "border-transparent"
              )}
            >
              {t.navbar.partsCatalog}
            </Link>
            <Link
              href="/garage"
              className={cn(
                "hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors py-1 border-b-2 flex items-center gap-1",
                pathname.startsWith("/garage") ? "border-[#3F72AF] dark:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] font-bold" : "border-transparent"
              )}
            >
              <span>{t.navbar.myGarage}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#F9F7F7] dark:bg-[#1B262C] text-[10px] font-mono text-[#3F72AF] dark:text-[#3282B8] border border-[#DBE2EF] dark:border-[#0F4C75]">
                {savedVehiclesCount}
              </span>
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switch Toggle */}
            <LanguageToggle />

            {/* Theme Switch toggle */}
            <ThemeToggle />

            {/* Active Vehicle Button / Garage Drawer Toggle */}
            <button
              onClick={() => setIsGarageOpen(true)}
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 hover:bg-[#F9F7F7] dark:hover:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-left transition-all shadow-sm group"
            >
              <div className="w-7 h-7 rounded bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 flex items-center justify-center shrink-0 border border-[#3F72AF]/20 dark:border-[#3282B8]/20 group-hover:border-[#3F72AF] dark:group-hover:border-[#3282B8] transition-colors">
                <Warehouse className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
              </div>
              <div className="max-w-[150px] truncate">
                <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase tracking-wider">
                  Active Vehicle
                </span>
                <span className="block text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] truncate group-hover:text-[#3F72AF] dark:group-hover:text-[#3282B8] transition-colors">
                  {currentActiveVehicle ? currentActiveVehicle.nickname || `${currentActiveVehicle.year} ${currentActiveVehicle.model}` : "Select Vehicle..."}
                </span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all shadow-sm font-mono font-bold text-xs min-h-[44px]",
                totalCartCount > 0
                  ? "bg-[#3F72AF] dark:bg-[#3282B8] border-[#112D4E]/20 dark:border-[#BBE1FA]/30 text-white dark:text-[#1B262C] shadow-[#3F72AF]/20 hover:opacity-90"
                  : "bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">{t.navbar.cart}</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-emerald-500 text-slate-950 font-mono font-bold text-xs shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Auth: Login Button or User Menu */}
            {currentIsAuthenticated && currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 border border-[#DBE2EF] dark:border-[#0F4C75]">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border",
                    isAdmin
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-500"
                      : "bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border-[#3F72AF]/50 dark:border-[#3282B8]/50 text-[#3F72AF] dark:text-[#3282B8]"
                  )}>
                    {isAdmin ? (
                      <Crown className="w-3.5 h-3.5" />
                    ) : (
                      <UserCircle className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="max-w-[120px]">
                    <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase tracking-wider">
                      {isAdmin ? t.navbar.roleAdmin : t.navbar.roleCustomer}
                    </span>
                    <span className="block text-xs font-semibold text-[#112D4E] dark:text-[#BBE1FA] truncate">
                      {currentUser.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 border border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E]/70 dark:text-[#BBE1FA]/70 hover:text-rose-500 hover:border-rose-500/50 transition-all"
                  title={t.navbar.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all shadow-sm font-mono font-bold text-xs min-h-[44px]",
                  pathname === "/login"
                    ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] border-[#3F72AF]"
                    : "bg-[#F9F7F7]/80 dark:bg-[#1B262C]/80 border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
                )}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.navbar.signIn}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#DBE2EF] dark:border-[#0F4C75] bg-[#F9F7F7] dark:bg-[#1B262C] px-4 py-4 space-y-3 shadow-xl">
            {/* Mobile Auth Status */}
            {currentIsAuthenticated && currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75]">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border",
                    isAdmin
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-500"
                      : "bg-[#3F72AF]/20 dark:bg-[#3282B8]/20 border-[#3F72AF]/50 dark:border-[#3282B8]/50 text-[#3F72AF] dark:text-[#3282B8]"
                  )}>
                    {isAdmin ? (
                      <Crown className="w-4 h-4" />
                    ) : (
                      <UserCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase">{isAdmin ? t.navbar.roleAdmin : t.navbar.roleCustomer}</span>
                    <span className="block text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA]">{currentUser.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-xs font-mono font-semibold text-rose-500 hover:bg-rose-500/10 transition-all"
                >
                  {t.navbar.logout}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider shadow-md shadow-[#3F72AF]/20"
              >
                <LogIn className="w-4 h-4" />
                {t.navbar.signIn}
              </Link>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGarageOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 border border-[#DBE2EF] dark:border-[#0F4C75] text-left"
            >
              <div className="flex items-center gap-2.5">
                <Warehouse className="w-5 h-5 text-[#3F72AF] dark:text-[#3282B8] shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-[#112D4E]/60 dark:text-[#85B5D9] uppercase">Active Vehicle</span>
                  <span className="block text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA]">
                    {currentActiveVehicle ? `${currentActiveVehicle.year} ${currentActiveVehicle.make} ${currentActiveVehicle.model}` : "Select Vehicle..."}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#3F72AF] dark:text-[#3282B8] font-mono font-bold">Change &rarr;</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center p-3 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
              >
                Parts Catalog
              </Link>
              <Link
                href="/garage"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center p-3 rounded-xl bg-[#DBE2EF]/50 dark:bg-[#0F4C75]/50 border border-[#DBE2EF] dark:border-[#0F4C75] text-sm font-semibold text-[#112D4E] dark:text-[#BBE1FA] hover:border-[#3F72AF] dark:hover:border-[#3282B8]"
              >
                My Garage ({savedVehiclesCount})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* My Garage Drawer Modal */}
      <MyGarageDrawer isOpen={isGarageOpen} onClose={() => setIsGarageOpen(false)} />
    </>
  );
};
