import { MapPin } from 'lucide-react'
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

  return (
    <Section
      id="about"
      className="relative isolate items-start justify-start px-6 pt-20 pb-14 sm:px-12 sm:pt-24 sm:pb-16"
    >
      <GameOfLifePatternBackground />
      <div className="bg-background/30 pointer-events-none absolute inset-0 -z-[5]" />

      <div className="flex h-full w-full max-w-5xl flex-col px-2 sm:px-4">
        <Reveal className="h-full w-full">
          <div className="flex h-full w-full flex-col p-8 sm:p-10 lg:p-14">
            <h1 className="text-foreground font-display text-5xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
              Julien TAP
            </h1>

            {ready && (
              <RotatingTitle
                titles={TITLES}
                intervalMs={3000}
                className="mt-3 sm:mt-4"
              />
            )}

            <div className="mt-auto pt-10 sm:pt-12">
              <div className="text-muted-foreground flex items-center gap-2 text-base">
                <MapPin className="size-4" />
                <span>Location placeholder</span>
              </div>

              <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed sm:max-w-2xl sm:text-lg">
                Versatile computer science developer turning complex problems
                into clean solutions.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
