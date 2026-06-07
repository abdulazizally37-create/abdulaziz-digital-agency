"use client"

import { PenLine, Share2, Target, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal, SectionHeading } from "@/components/reveal"

const icons = [PenLine, Share2, Target, TrendingUp]

export function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={t.services.label} heading={t.services.heading} subheading={t.services.subheading} />

        <div className="grid gap-5 sm:grid-cols-2">
          {t.services.items.map((service, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={service.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
