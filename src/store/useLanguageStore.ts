import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "th";

interface LanguageState {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLanguage: (lang) => set({ lang }),
      toggleLanguage: () =>
        set((state) => ({ lang: state.lang === "en" ? "th" : "en" })),
    }),
    {
      name: "pitstop-language-storage",
    }
  )
);
