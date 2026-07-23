"use client";

import * as React from "react";
import { useTranslation } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLanguage } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-16 min-h-[44px] rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/40 dark:bg-[#0F4C75]/40 animate-pulse", className)} />
    );
  }

  const isEn = lang === "en";

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language between English and Thai"
      className={cn(
        "relative flex items-center justify-between min-h-[44px] px-2.5 py-1.5 rounded-xl border transition-all duration-300 shadow-sm overflow-hidden active:scale-95 group gap-1.5 font-mono text-xs font-bold select-none",
        "bg-[#DBE2EF]/80 dark:bg-[#0F4C75]/60 border-[#3F72AF]/30 dark:border-[#3282B8]/40 hover:border-[#3F72AF] dark:hover:border-[#3282B8] text-[#112D4E] dark:text-[#BBE1FA] shadow-sm",
        className
      )}
      title={isEn ? "Switch to Thai (เปลี่ยนเป็นภาษาไทย)" : "Switch to English (EN)"}
    >
      <Globe className="w-3.5 h-3.5 text-[#3F72AF] dark:text-[#3282B8] shrink-0 transition-transform group-hover:rotate-12" />
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "px-1.5 py-0.5 rounded transition-all",
            isEn
              ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] font-black shadow-xs scale-105"
              : "text-[#112D4E]/60 dark:text-[#85B5D9]/60 hover:text-[#112D4E] dark:hover:text-[#BBE1FA]"
          )}
        >
          EN
        </span>
        <span className="text-[#112D4E]/30 dark:text-[#85B5D9]/30">/</span>
        <span
          className={cn(
            "px-1.5 py-0.5 rounded transition-all",
            !isEn
              ? "bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] font-black shadow-xs scale-105"
              : "text-[#112D4E]/60 dark:text-[#85B5D9]/60 hover:text-[#112D4E] dark:hover:text-[#BBE1FA]"
          )}
        >
          TH
        </span>
      </div>
    </button>
  );
}
