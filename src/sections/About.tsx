import { ArrowDown, MapPin } from 'lucide-react'
import { Section } from '@/components/Section'
import { RotatingTitle } from '@/components/RotatingTitle'
import { Reveal } from '@/components/Reveal'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'
import { usePortfolioReady } from '@/context/portfolio-ready'

const TITLES = [
  'Full-stack developer',
  'Systems engineer',
  'DevOps practitioner',
  'Creative coder',
]

export function About() {
  const ready = usePortfolioReady()

  const scrollToNext = (): void => {
    const el = document.getElementById('skills')
    if (el !== null) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section
      id="about"
      className="relative isolate items-start justify-start px-6 pt-24 pb-12 sm:px-12 sm:pt-28"
    >
      <GameOfLifePatternBackground />
      <div className="bg-background/30 pointer-events-none absolute inset-0 -z-[5]" />

      <div className="w-full max-w-5xl px-2 sm:px-4">
        <Reveal>
          <div className="w-fit p-6">
            <h1 className="text-foreground text-5xl font-bold tracking-tight text-shadow-sm sm:text-7xl">
              Julien TAP
            </h1>

            {ready && <RotatingTitle titles={TITLES} intervalMs={3000} />}

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
            <button
              type="button"
              onClick={scrollToNext}
              className="bg-background/40 border-border/40 text-muted-foreground group hover:border-border/70 hover:text-foreground flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm backdrop-blur-md transition-colors"
            >
              Scroll to explore
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
            </button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
