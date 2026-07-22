"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";
import { FitmentStatus } from "@/types";
import { cn } from "@/lib/utils";

interface FitmentBadgeProps {
  status: FitmentStatus;
  size?: "sm" | "md" | "lg";
  showNotes?: boolean;
  className?: string;
}

export const FitmentBadge: React.FC<FitmentBadgeProps> = ({
  status,
  size = "md",
  showNotes = false,
  className,
}) => {
  if (status === "FITS") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200 border shadow-sm",
          size === "sm" && "px-2 py-0.5 text-xs border-emerald-500/40 bg-emerald-950/60 text-emerald-300",
          size === "md" && "px-3 py-1 text-xs border-emerald-500/50 bg-emerald-950/80 text-emerald-300 shadow-emerald-950/40",
          size === "lg" && "px-4 py-2 text-sm border-emerald-500/60 bg-emerald-950 text-emerald-200 shadow-emerald-900/30",
          className
        )}
      >
        <CheckCircle2 className={cn("text-emerald-400 shrink-0", size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
        <span>✅ Fits Your Vehicle</span>
        {showNotes && <span className="text-emerald-400/80 font-normal ml-1">| Direct Bolt-On OEM Spec</span>}
      </div>
    );
  }

  if (status === "INCOMPATIBLE") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200 border shadow-sm",
          size === "sm" && "px-2 py-0.5 text-xs border-rose-500/40 bg-rose-950/60 text-rose-300",
          size === "md" && "px-3 py-1 text-xs border-rose-500/50 bg-rose-950/80 text-rose-300",
          size === "lg" && "px-4 py-2 text-sm border-rose-500/60 bg-rose-950 text-rose-200",
          className
        )}
      >
        <AlertTriangle className={cn("text-rose-400 shrink-0 animate-pulse", size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
        <span>⚠️ Incompatible</span>
        {showNotes && <span className="text-rose-400/80 font-normal ml-1">| Check compatibility list</span>}
      </div>
    );
  }

  if (status === "UNIVERSAL") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200 border shadow-sm",
          size === "sm" && "px-2 py-0.5 text-xs border-sky-500/40 bg-sky-950/60 text-sky-300",
          size === "md" && "px-3 py-1 text-xs border-sky-500/50 bg-sky-950/80 text-sky-300",
          size === "lg" && "px-4 py-2 text-sm border-sky-500/60 bg-sky-950 text-sky-200",
          className
        )}
      >
        <Info className={cn("text-sky-400 shrink-0", size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
        <span>ℹ️ Universal Fit</span>
        {showNotes && <span className="text-sky-400/80 font-normal ml-1">| Fits all Cars & Motorbikes</span>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200 border shadow-sm",
        size === "sm" && "px-2 py-0.5 text-xs border-slate-700 bg-slate-900/60 text-slate-400",
        size === "md" && "px-3 py-1 text-xs border-slate-700 bg-slate-900/80 text-slate-400",
        size === "lg" && "px-4 py-2 text-sm border-slate-700 bg-slate-900 text-slate-300",
        className
      )}
    >
      <HelpCircle className={cn("text-slate-500 shrink-0", size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4")} />
      <span>🔍 Select Vehicle to Check Fitment</span>
    </div>
  );
};
