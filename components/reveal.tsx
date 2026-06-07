"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  label,
  heading,
  subheading,
}: {
  label: string
  heading: string
  subheading?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <Reveal>
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      </Reveal>
      {subheading && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{subheading}</p>
        </Reveal>
      )}
    </div>
  )
}
