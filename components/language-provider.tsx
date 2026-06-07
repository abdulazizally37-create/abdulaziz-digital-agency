"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Dictionary, type Language } from "@/lib/translations"

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  // restore preference on mount (client-only, not used for data persistence)
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-lang")
    if (saved === "en" || saved === "sw") {
      setLangState(saved)
    }
  }, [])

  const setLang = (next: Language) => {
    setLangState(next)
    window.localStorage.setItem("portfolio-lang", next)
    document.documentElement.lang = next
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
