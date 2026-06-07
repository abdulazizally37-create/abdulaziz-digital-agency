"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Reveal, SectionHeading } from "@/components/reveal"

export function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="scroll-mt-20 bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={t.skills.label} heading={t.skills.heading} subheading={t.skills.subheading} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.items.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm font-semibold text-accent">{skill.level}%</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
