"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-9 h-9 rounded-xl border border-slate-700/50 bg-slate-800/40 animate-pulse", className)} />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300 shadow-sm overflow-hidden active:scale-95 group",
        isDark
          ? "bg-[#0F4C75]/60 border-[#3282B8]/40 hover:border-[#3282B8] hover:bg-[#0F4C75] text-[#BBE1FA] shadow-[#0F4C75]/30"
          : "bg-[#DBE2EF]/80 border-[#3F72AF]/30 hover:border-[#3F72AF] hover:bg-[#DBE2EF] text-[#112D4E] shadow-[#3F72AF]/10",
        className
      )}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <Sun
          className={cn(
            "absolute w-4 h-4 transition-all duration-500 transform",
            isDark
              ? "rotate-90 scale-0 opacity-0 text-amber-400"
              : "rotate-0 scale-100 opacity-100 text-[#3F72AF]"
          )}
        />
        <Moon
          className={cn(
            "absolute w-4 h-4 transition-all duration-500 transform",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-[#3282B8]"
              : "-rotate-90 scale-0 opacity-0 text-[#112D4E]"
          )}
        />
      </div>
    </button>
  );
}
