"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import en from "@/content/en.json";
import fr from "@/content/fr.json";

export type Lang = "en" | "fr";
export type Dictionary = typeof en;

const DICTS: Record<Lang, Dictionary> = { en, fr };
const STORAGE_KEY = "toolegba-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Pick up a saved preference after mount (avoids an SSR/client mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "fr") setLangState(stored);
    } catch {
      // localStorage unavailable (private mode, etc.) — fall back to default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures — language still works for this session.
    }
  };

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dict: DICTS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook for components that only need the current dictionary. */
export function useDict() {
  return useLanguage().dict;
}
