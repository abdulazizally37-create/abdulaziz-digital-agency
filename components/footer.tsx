"use client"

import { Heart, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
                AH
              </span>
              <span className="font-display text-lg font-bold">Abdulaziz Haroun</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:abdulazizally37@gmail.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-accent/40 hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/255757435763"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-accent/40 hover:text-accent"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>{"Copyright © 2026 Abdulaziz Haroun. "}{t.footer.rights}</p>
          <p className="inline-flex items-center gap-1.5">
            {t.footer.madeWith}
            <Heart className="h-4 w-4 fill-accent text-accent" />
          </p>
        </div>
      </div>
    </footer>
  )
}
