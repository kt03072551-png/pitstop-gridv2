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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="font-mono text-emerald-400 text-sm animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Initializing Secure Login...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Emerald Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Top Logo & Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="font-mono text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
                PITSTOP{" "}
                <span className="text-emerald-400">GRID</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                v2.0 OEM & Fitment Engine
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div
          className={cn(
            "relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300",
            successFlash
              ? "border-emerald-500 shadow-emerald-500/20"
              : error
                ? "border-rose-500/60 shadow-rose-500/10"
                : "border-slate-800 shadow-slate-950/50"
          )}
        >
          {/* Top Accent Bar */}
          <div
            className={cn(
              "h-1 w-full transition-colors duration-300",
              successFlash
                ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400"
                : "bg-gradient-to-r from-emerald-500/60 via-sky-500/40 to-emerald-500/60"
            )}
          />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-semibold shadow-md mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SECURE AUTHENTICATION GATEWAY</span>
              </div>
              <h1 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
                Sign In to Your Account
              </h1>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">
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
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
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
                        "w-full bg-slate-950 border rounded-lg pl-11 pr-4 py-3 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none transition-colors",
                        error
                          ? "border-rose-500/50 focus:border-rose-400"
                          : "border-slate-800 focus:border-emerald-500"
                      )}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
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
                        "w-full bg-slate-950 border rounded-lg pl-11 pr-12 py-3 text-sm font-medium text-white placeholder:text-slate-600 focus:outline-none transition-colors",
                        error
                          ? "border-rose-500/50 focus:border-rose-400"
                          : "border-slate-800 focus:border-emerald-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
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
                    "w-full py-3.5 rounded-xl font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg",
                    isLoading || !email || !password
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 hover:from-emerald-400 hover:to-emerald-300 shadow-emerald-500/20 active:scale-[0.98]"
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
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
              Quick Demo Access
            </span>
          </div>
          <p className="text-xs text-slate-400 -mt-2">
            One-click login with pre-configured demo accounts for testing
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Admin Quick Login */}
            <button
              onClick={() =>
                handleQuickLogin("admin@pitstopgrid.co.th", "admin1234")
              }
              disabled={isLoading}
              className="group relative p-4 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-500/60 transition-all text-left space-y-2.5 hover:bg-slate-950/90"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/50 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                  Admin
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white truncate">
                  admin@pitstopgrid.co.th
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Warehouse Controller
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400/70 group-hover:text-amber-400 transition-colors">
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
              className="group relative p-4 rounded-xl bg-slate-950 border border-sky-500/30 hover:border-sky-500/60 transition-all text-left space-y-2.5 hover:bg-slate-950/90"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/50 flex items-center justify-center">
                  <UserCircle className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30">
                  Customer
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white truncate">
                  somchai@gmail.com
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Somchai Kiatikun
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-sky-400/70 group-hover:text-sky-400 transition-colors">
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
            className="text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
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
