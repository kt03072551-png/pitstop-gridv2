"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Loader2,
  AlertCircle,
  Wrench,
  UserCircle,
  Crown,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated, user } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [successFlash, setSuccessFlash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (mounted && isAuthenticated && user) {
      if (user.role === "ADMIN" || user.role === "SELLER") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [mounted, isAuthenticated, user, router]);

  // Trigger shake animation on error
  useEffect(() => {
    if (error) {
      setShakeError(true);
      const timer = setTimeout(() => setShakeError(false), 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const success = await login(email.trim(), password);

    if (success) {
      setSuccessFlash(true);
      // Give a brief moment for the success animation
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (
          currentUser?.role === "ADMIN" ||
          currentUser?.role === "SELLER"
        ) {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 800);
    }
  };

  const handleQuickLogin = async (
    demoEmail: string,
    demoPassword: string
  ) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    clearError();

    const success = await login(demoEmail, demoPassword);

    if (success) {
      setSuccessFlash(true);
      setTimeout(() => {
        const currentUser = useAuthStore.getState().user;
        if (
          currentUser?.role === "ADMIN" ||
          currentUser?.role === "SELLER"
        ) {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 800);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center">
        <div className="font-mono text-[#3F72AF] dark:text-[#3282B8] text-sm animate-pulse flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#3F72AF] dark:bg-[#3282B8] animate-ping" />
          Initializing Secure Login...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] flex items-center justify-center px-4 py-16 relative overflow-hidden transition-colors duration-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3F72AF12_1px,transparent_1px),linear-gradient(to_bottom,#3F72AF12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3F72AF]/10 dark:bg-[#3282B8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Top Logo & Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#112D4E] to-[#3F72AF] dark:from-[#3282B8] dark:to-[#BBE1FA] flex items-center justify-center shadow-lg shadow-[#3F72AF]/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 text-white dark:text-[#1B262C] stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="font-mono text-xl font-black tracking-tighter text-[#112D4E] dark:text-white uppercase flex items-center gap-1">
                PITSTOP{" "}
                <span className="text-[#3F72AF] dark:text-[#3282B8]">GRID</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-[#112D4E]/70 dark:text-[#85B5D9] uppercase -mt-0.5 font-bold">
                v2.0 OEM & Fitment Engine
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div
          className={cn(
            "relative bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/80 backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300",
            successFlash
              ? "border-[#3F72AF] shadow-[#3F72AF]/20 ring-2 ring-[#3F72AF]"
              : error
                ? "border-rose-500/60 shadow-rose-500/10"
                : "border-[#DBE2EF] dark:border-[#0F4C75] shadow-xl"
          )}
        >
          {/* Top Accent Bar */}
          <div
            className={cn(
              "h-1.5 w-full transition-colors duration-300",
              successFlash
                ? "bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA]"
                : "bg-gradient-to-r from-[#3F72AF] via-[#DBE2EF] to-[#3F72AF] dark:from-[#3282B8] dark:via-[#0F4C75] dark:to-[#3282B8]"
            )}
          />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] text-[#3F72AF] dark:text-[#3282B8] font-mono text-[11px] font-bold shadow-sm mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>SECURE AUTHENTICATION GATEWAY</span>
              </div>
              <h1 className="text-2xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
                Sign In to Your Account
              </h1>
              <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] mt-1.5 font-medium">
                Access fitment verification, order tracking & warehouse
                operations
              </p>
            </div>

            {/* Success State */}
            {successFlash && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="font-mono font-bold text-emerald-300 text-sm uppercase tracking-wider">
                  Authentication Verified
                </p>
                <p className="text-xs text-emerald-400/80 mt-1">
                  Redirecting to your dashboard...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !successFlash && (
              <div
                className={cn(
                  "mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-start gap-3",
                  shakeError && "animate-[shake_0.5s_ease-in-out]"
                )}
              >
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono font-bold text-rose-300 text-xs uppercase tracking-wider">
                    Authentication Failed
                  </p>
                  <p className="text-xs text-rose-400/90 mt-0.5">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Login Form */}
            {!successFlash && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-[#112D4E]/80 dark:text-[#85B5D9] mb-1.5 tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#112D4E]/50 dark:text-[#85B5D9]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) clearError();
                      }}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className={cn(
                        "w-full min-h-[46px] bg-[#F9F7F7] dark:bg-[#1B262C] border rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-[#112D4E] dark:text-white placeholder:text-[#112D4E]/40 dark:placeholder:text-[#85B5D9]/50 focus:outline-none transition-colors",
                        error
                          ? "border-rose-500 focus:border-rose-600"
                          : "border-[#DBE2EF] dark:border-[#0F4C75] focus:border-[#3F72AF]"
                      )}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[11px] font-mono uppercase font-bold text-[#112D4E]/80 dark:text-[#85B5D9] mb-1.5 tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#112D4E]/50 dark:text-[#85B5D9]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) clearError();
                      }}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className={cn(
                        "w-full min-h-[46px] bg-[#F9F7F7] dark:bg-[#1B262C] border rounded-xl pl-11 pr-12 py-3 text-sm font-semibold text-[#112D4E] dark:text-white placeholder:text-[#112D4E]/40 dark:placeholder:text-[#85B5D9]/50 focus:outline-none transition-colors",
                        error
                          ? "border-rose-500 focus:border-rose-600"
                          : "border-[#DBE2EF] dark:border-[#0F4C75] focus:border-[#3F72AF]"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#112D4E]/60 dark:text-[#85B5D9] hover:text-[#3F72AF] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className={cn(
                    "w-full min-h-[48px] py-4 rounded-xl font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg",
                    isLoading || !email || !password
                      ? "bg-[#DBE2EF] dark:bg-[#0F4C75] text-[#112D4E]/40 dark:text-[#BBE1FA]/40 cursor-not-allowed border border-[#DBE2EF] dark:border-[#0F4C75]"
                      : "bg-gradient-to-r from-[#112D4E] via-[#3F72AF] to-[#112D4E] dark:from-[#BBE1FA] dark:via-[#3282B8] dark:to-[#BBE1FA] text-white dark:text-[#1B262C] hover:opacity-95 shadow-md active:scale-[0.98]"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In Securely</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Demo Login Section */}
        <div className="bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 backdrop-blur-sm rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] p-5 space-y-4 shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#112D4E] dark:text-[#BBE1FA]">
              Quick Demo Access
            </span>
          </div>
          <p className="text-xs text-[#112D4E]/70 dark:text-[#85B5D9] -mt-2 font-medium">
            One-click login with pre-configured demo accounts for testing
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Admin Quick Login */}
            <button
              onClick={() =>
                handleQuickLogin("admin@pitstopgrid.co.th", "admin1234")
              }
              disabled={isLoading}
              className="group relative p-4 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8] transition-all text-left space-y-2.5 shadow-sm min-h-[76px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3F72AF]/10 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#112D4E] dark:text-white bg-[#3F72AF]/10 px-2 py-0.5 rounded border border-[#3F72AF]/30">
                  Admin
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#112D4E] dark:text-white truncate">
                  admin@pitstopgrid.co.th
                </p>
                <p className="text-[10px] text-[#112D4E]/60 dark:text-[#85B5D9] font-mono mt-0.5">
                  Warehouse Controller
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#3F72AF] dark:text-[#3282B8]">
                <Zap className="w-3 h-3" />
                <span>Quick Login</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Customer Quick Login */}
            <button
              onClick={() =>
                handleQuickLogin("somchai@gmail.com", "customer1234")
              }
              disabled={isLoading}
              className="group relative p-4 rounded-xl bg-[#F9F7F7] dark:bg-[#1B262C] border border-[#DBE2EF] dark:border-[#0F4C75] hover:border-[#3F72AF] dark:hover:border-[#3282B8] transition-all text-left space-y-2.5 shadow-sm min-h-[76px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3F72AF]/10 dark:bg-[#3282B8]/20 border border-[#3F72AF] dark:border-[#3282B8] flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-[#3F72AF] dark:text-[#3282B8]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#112D4E] dark:text-white bg-[#3F72AF]/10 px-2 py-0.5 rounded border border-[#3F72AF]/30">
                  Customer
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#112D4E] dark:text-white truncate">
                  somchai@gmail.com
                </p>
                <p className="text-[10px] text-[#112D4E]/60 dark:text-[#85B5D9] font-mono mt-0.5">
                  Somchai Kiatikun
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#3F72AF] dark:text-[#3282B8]">
                <Zap className="w-3 h-3" />
                <span>Quick Login</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-mono font-semibold text-[#112D4E]/70 dark:text-[#85B5D9] hover:text-[#3F72AF] dark:hover:text-[#3282B8] transition-colors min-h-[44px] inline-flex items-center justify-center"
          >
            ← Back to Pitstop Grid Homepage
          </Link>
        </div>
      </div>

      {/* Shake Keyframe (injected via style tag) */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}
