import { ArrowDown, MapPin } from 'lucide-react'
import { Section } from '@/components/Section'
import { RotatingTitle } from '@/components/RotatingTitle'
import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const TITLES = [
  'Full-stack developer',
  'Systems engineer',
  'DevOps practitioner',
  'Creative coder',
]

export function About() {
  const scrollToNext = (): void => {
    const el = document.getElementById('skills')
    if (el !== null) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section
      id="about"
      className="relative items-start justify-start px-6 pt-24 pb-12 sm:px-12 sm:pt-28"
    >
      <div className="bg-background/30 pointer-events-none absolute inset-0 -z-[5]" />

      <div className="w-full max-w-5xl px-2 sm:px-4">
        <Reveal>
          <div className="bg-background/40 border-border/40 w-fit rounded-2xl border p-6 backdrop-blur-md">
            <Badge variant="secondary" className="gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              #OpenToWork
            </Badge>

            <h1 className="text-foreground mt-3 text-5xl font-bold tracking-tight text-shadow-sm sm:text-7xl">
              Julien TAP
            </h1>

            <RotatingTitle titles={TITLES} intervalMs={3000} />

            <div className="text-muted-foreground mt-6 flex items-center gap-2 text-sm">
              <MapPin className="size-4" />
              <span>Location placeholder</span>
            </div>

            <p className="text-muted-foreground mt-3 max-w-md text-sm">
              Versatile computer science developer turning complex problems into
              clean solutions.
            </p>
          </div>
        </Reveal>

        <div className="absolute right-6 bottom-12 sm:right-12">
          <Reveal delay={400}>
            <div className="bg-background/40 border-border/40 w-full max-w-sm rounded-2xl border p-6 backdrop-blur-md">
              <p className="text-muted-foreground text-sm">
                That mess behind you? That&apos;s what unstructured problems
                look like.
              </p>
              <p className="text-foreground mt-2 text-sm font-medium">
                I can help clean that up.
              </p>
              <Button size="lg" className="mt-4 w-full" onClick={scrollToNext}>
                Let&apos;s clean that together
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
