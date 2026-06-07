"use client"

import { useState, type FormEvent } from "react"
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal, SectionHeading } from "@/components/reveal"

const EMAIL = "abdulazizally37@gmail.com"
const WHATSAPP = "+255757435763"

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Compose a mailto so the message reaches Abdulaziz directly.
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    }, 600)
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={t.contact.label} heading={t.contact.heading} subheading={t.contact.subheading} />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8"
            >
              <div className="grid gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {sent ? (
                  <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
                    <CheckCircle2 className="h-5 w-5" />
                    {t.contact.success}
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover disabled:opacity-70"
                  >
                    {sending ? t.contact.sending : t.contact.send}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
              <h3 className="font-display text-lg font-semibold">{t.contact.directTitle}</h3>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4 transition-all hover:border-accent/40 hover:bg-muted"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.contact.emailItem}</div>
                    <div className="truncate text-sm font-medium">{EMAIL}</div>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4 transition-all hover:border-accent/40 hover:bg-muted"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.contact.whatsappItem}</div>
                    <div className="truncate text-sm font-medium">{WHATSAPP}</div>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
