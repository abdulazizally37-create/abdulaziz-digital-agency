"use client"

import { Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/reveal"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-accent-foreground">
                    AH
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold">{t.hero.name}</div>
                    <div className="text-sm text-muted-foreground">{t.hero.title.split("·")[0].trim()}</div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {t.about.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-accent/20 bg-accent/5"
                aria-hidden
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {t.about.label}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t.about.heading}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
