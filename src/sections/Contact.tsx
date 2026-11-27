import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_CHANNELS, CONTACT_EMAIL } from '@/lib/contact'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  useEffect(() => {
    if (!sent) return
    const timeout = setTimeout(() => setSent(false), 5000)
    return () => clearTimeout(timeout)
  }, [sent])

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
    <Section id="contact" className="px-0 pb-0 sm:px-0 md:px-0 md:pb-0 lg:px-0">
      <div className="flex min-h-0 w-full flex-1 flex-col px-5 sm:px-10 md:px-12 lg:px-16">
        <Reveal>
          <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
            Contact
          </h2>
          <p className="text-muted-foreground mt-1.5 text-sm sm:mt-3 sm:text-base">
            Have a project, an opportunity, or a question? Let&apos;s talk.
          </p>
        </Reveal>

        <div className="my-auto flex min-h-0 w-full flex-1 items-center justify-center py-2 sm:py-4">
          <div className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-3 sm:gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
            <Reveal delay={100} className="flex flex-col">
              <div className="bg-card/60 border-border/60 flex h-full w-full flex-1 flex-col justify-between gap-3 rounded-2xl border p-3 shadow-sm sm:gap-5 sm:p-6 lg:p-8">
                <div>
                  <p className="text-muted-foreground mb-2.5 hidden text-xs font-semibold tracking-widest uppercase lg:block">
                    Direct
                  </p>
                  <div className="bg-background/60 border-border/60 hover:border-border flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors sm:px-4 sm:py-3 lg:py-3.5">
                    <a
                      href={emailChannel?.href}
                      className="group flex min-w-0 flex-1 items-center gap-3"
                    >
                      <span className="bg-muted/80 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9">
                        <Mail className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-muted-foreground hidden text-[11px] font-medium sm:block">
                          Email
                        </span>
                        <span className="text-foreground group-hover:text-primary block truncate text-sm font-medium transition-colors">
                          {CONTACT_EMAIL}
                        </span>
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2.5 hidden text-xs font-semibold tracking-widest uppercase lg:block">
                    Elsewhere
                  </p>
                  <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2.5">
                    {socials.map(
                      ({ id, label, href, icon: Icon, external }) => (
                        <a
                          key={id}
                          href={href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="group bg-background/60 border-border/60 hover:border-border hover:bg-muted/50 flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 transition-colors sm:py-2.5 lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3"
                        >
                          <Icon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                          <span className="text-foreground truncate text-xs font-medium sm:text-sm lg:flex-1">
                            {label}
                          </span>
                          <ArrowUpRight className="text-muted-foreground hidden size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none lg:block" />
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            <Separator className="lg:hidden" />
            <Separator
              orientation="vertical"
              className="hidden self-stretch lg:block"
            />

            <Reveal delay={180} className="flex flex-col">
              <form
                onSubmit={handleSubmit}
                className="bg-card/60 border-border/60 flex h-full w-full flex-1 flex-col gap-2.5 rounded-2xl border p-3.5 shadow-sm sm:gap-5 sm:p-6 lg:p-8"
              >
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-muted-foreground mb-1 block text-xs font-medium sm:mb-2 sm:text-sm"
                    >
                      Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="bg-background/60 h-9 sm:h-10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-muted-foreground mb-1 block text-xs font-medium sm:mb-2 sm:text-sm"
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
                      className="bg-background/60 h-9 sm:h-10"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="contact-message"
                    className="text-muted-foreground mb-1 block text-xs font-medium sm:mb-2 sm:text-sm"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="What can I help you with?"
                    className="bg-background/60 field-sizing-fixed min-h-20 flex-1 resize-none sm:min-h-32"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-1">
                  {sent && (
                    <span className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs sm:justify-start sm:text-sm">
                      <Check className="size-4 text-emerald-500" />
                      Draft opened in your email app
                    </span>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="h-9 w-full gap-2 sm:ml-auto sm:h-10 sm:w-auto sm:px-8"
                  >
                    Send message
                    <Send className="size-4" />
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </Section>
  )
}
