import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { CONTACT_CHANNELS, CONTACT_EMAIL } from '@/lib/contact'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name')).trim()
    const email = String(data.get('email')).trim()
    const message = String(data.get('message')).trim()
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    form.reset()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')
  const socials = CONTACT_CHANNELS.filter((c) => c.id !== 'email')

  return (
    <Section
      id="contact"
      className="relative isolate items-start justify-start px-6 pt-20 pb-24 sm:px-12 sm:pb-32"
    >
      <div className="flex h-full w-full max-w-5xl flex-col px-2 sm:px-4">
        <Reveal>
          <div className="p-3 sm:p-4">
            <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
              Contact
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:mt-3 sm:text-base">
              Have a project, a question, or a mess to clean up? Let&apos;s
              talk.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-1 flex-col gap-6 sm:mt-4 lg:flex-row lg:gap-8">
          <Reveal
            delay={100}
            className="flex flex-col gap-2 lg:w-72 lg:shrink-0"
          >
            <div className="group bg-background/40 border-border/40 flex items-center gap-2.5 rounded-xl border px-3 py-2 backdrop-blur-md transition-colors">
              <a
                href={emailChannel?.href}
                className="text-muted-foreground hover:text-foreground flex min-w-0 flex-1 items-center gap-2.5 transition-colors"
              >
                <Mail className="size-4 shrink-0" />
                <span className="text-foreground truncate text-sm font-medium">
                  {CONTACT_EMAIL}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
            {socials.map(({ id, label, href, icon: Icon, external }) => (
              <a
                key={id}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group bg-background/40 border-border/40 hover:border-border/70 hover:bg-background/60 flex items-center gap-2.5 rounded-xl border px-3 py-2 backdrop-blur-md transition-colors"
              >
                <Icon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                <span className="text-foreground flex-1 text-sm font-medium">
                  {label}
                </span>
                <ArrowUpRight className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </a>
            ))}
          </Reveal>

          <Separator className="lg:hidden" />
          <Separator
            orientation="vertical"
            className="hidden self-stretch lg:block"
          />

          <Reveal delay={200} className="flex flex-1 flex-col">
            <form
              onSubmit={handleSubmit}
              className="bg-background/40 border-border/40 flex w-full flex-1 flex-col gap-3 rounded-2xl border p-4 backdrop-blur-md sm:gap-4 sm:p-6"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-muted-foreground mb-1.5 block text-xs font-medium"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-muted-foreground mb-1.5 block text-xs font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-muted-foreground mb-1.5 block text-xs font-medium"
                >
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="What can I help you with?"
                  className="min-h-16 sm:min-h-24 lg:min-h-44"
                />
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" className="gap-2">
                  Send message
                  <Send className="size-4" />
                </Button>
                {sent && (
                  <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <Check className="size-4" />
                    Draft opened in your email app
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
      <Footer />
    </Section>
  )
}
