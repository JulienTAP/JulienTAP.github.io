import { MapPin } from 'lucide-react'
import { Section } from '@/components/Section'
import { RotatingTitle } from '@/components/RotatingTitle'
import { Reveal } from '@/components/Reveal'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'
import { usePortfolioReady } from '@/context/portfolio-ready'

const TITLES = [
  'Software engineer',
  'AI & robotics engineer',
  'IoT & systems engineer',
  '3D & VR developer',
]

export function About() {
  const ready = usePortfolioReady()

  return (
    <Section id="about" className="pb-8 md:pb-14 lg:pb-16">
      <GameOfLifePatternBackground
        cellSize={26}
        padding={2}
        alpha={0.45}
        className="top-[53%] right-8 -translate-y-1/2 sm:hidden md:block lg:right-16 xl:right-24"
      />
      <div className="bg-background/20 pointer-events-none absolute inset-0 -z-[5]" />

      <div className="flex h-full w-full max-w-5xl flex-col">
        <Reveal className="flex h-full w-full flex-col">
          <h1 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
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
              <span>Île-de-France, France</span>
            </div>

            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed sm:max-w-2xl sm:text-lg">
              Versatile computer science developer turning complex problems into
              clean solutions.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
