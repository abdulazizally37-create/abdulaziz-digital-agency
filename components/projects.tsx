"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal, SectionHeading } from "@/components/reveal"

const images = [
  "/projects/ecommerce-campaign.png",
  "/projects/email-series.png",
  "/projects/social-growth.png",
]

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={t.projects.label} heading={t.projects.heading} subheading={t.projects.subheading} />

        <div className="grid gap-6 md:grid-cols-3">
          {t.projects.items.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={images[i] || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" aria-hidden />
                  <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-snug">{project.title}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-all hover:border-accent/50 hover:bg-muted"
            >
              {t.projects.cta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
