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
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
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
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        {/* Top Metallic Info Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Bangna & Laksi Warehouse Hubs Live
              </span>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                100% Genuine OEM & Verified Aftermarket Parts Guarantee
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
                  <span>Seller Portal</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-lg font-black tracking-tighter text-white uppercase flex items-center gap-1">
                PITSTOP <span className="text-emerald-400">GRID</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
                v2.0 OEM & Fitment Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link
              href="/"
              className={cn(
                "hover:text-emerald-400 transition-colors py-1 border-b-2",
                pathname === "/" ? "border-emerald-500 text-white" : "border-transparent"
              )}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className={cn(
                "hover:text-emerald-400 transition-colors py-1 border-b-2",
                pathname.startsWith("/catalog") || pathname.startsWith("/parts")
                  ? "border-emerald-500 text-white"
                  : "border-transparent"
              )}
            >
              Parts Catalog
            </Link>
            <Link
              href="/garage"
              className={cn(
                "hover:text-emerald-400 transition-colors py-1 border-b-2 flex items-center gap-1",
                pathname.startsWith("/garage") ? "border-emerald-500 text-white" : "border-transparent"
              )}
            >
              <span>My Garage</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono text-emerald-400 border border-slate-700">
                {savedVehiclesCount}
              </span>
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Active Vehicle Button / Garage Drawer Toggle */}
            <button
              onClick={() => setIsGarageOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-left transition-all shadow-sm group"
            >
              <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                <Warehouse className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="max-w-[170px] truncate">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Active Vehicle
                </span>
                <span className="block text-xs font-semibold text-slate-200 truncate group-hover:text-emerald-300 transition-colors">
                  {currentActiveVehicle ? currentActiveVehicle.nickname || `${currentActiveVehicle.year} ${currentActiveVehicle.model}` : "Select Vehicle..."}
                </span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all shadow-md",
                totalCartCount > 0
                  ? "bg-gradient-to-r from-emerald-950 to-slate-900 border-emerald-500/60 text-white shadow-emerald-950/40 hover:border-emerald-400"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
              )}
            >
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-mono font-semibold text-xs">Cart</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-emerald-500 text-slate-950 font-mono font-bold text-xs shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Auth: Login Button or User Menu */}
            {currentIsAuthenticated && currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border",
                    isAdmin
                      ? "bg-amber-950/80 border-amber-500/50"
                      : "bg-sky-950/80 border-sky-500/50"
                  )}>
                    {isAdmin ? (
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <UserCircle className="w-3.5 h-3.5 text-sky-400" />
                    )}
                  </div>
                  <div className="max-w-[120px]">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {currentUser.role}
                    </span>
                    <span className="block text-xs font-semibold text-slate-200 truncate">
                      {currentUser.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all shadow-md font-mono font-semibold text-xs",
                  pathname === "/login"
                    ? "bg-emerald-500 text-slate-950 border-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                )}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
            {/* Mobile Auth Status */}
            {currentIsAuthenticated && currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border",
                    isAdmin
                      ? "bg-amber-950/80 border-amber-500/50"
                      : "bg-sky-950/80 border-sky-500/50"
                  )}>
                    {isAdmin ? (
                      <Crown className="w-4 h-4 text-amber-400" />
                    ) : (
                      <UserCircle className="w-4 h-4 text-sky-400" />
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">{currentUser.role}</span>
                    <span className="block text-sm font-semibold text-white">{currentUser.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-rose-400 hover:bg-rose-950/50 hover:border-rose-500/50 transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-emerald-500 text-slate-950 font-mono font-bold text-sm uppercase tracking-wider"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Your Account
              </Link>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGarageOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-left"
            >
              <div className="flex items-center gap-2.5">
                <Warehouse className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase">Active Vehicle</span>
                  <span className="block text-sm font-semibold text-white">
                    {currentActiveVehicle ? `${currentActiveVehicle.year} ${currentActiveVehicle.make} ${currentActiveVehicle.model}` : "Select Vehicle..."}
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono">Change &rarr;</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm font-medium text-white"
              >
                Parts Catalog
              </Link>
              <Link
                href="/garage"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm font-medium text-white"
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
