import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Skills() {
  return (
    <Section
      id="skills"
      className="relative isolate items-start justify-start px-6 pt-20 pb-12 sm:px-12 sm:pb-10"
    >
      <GameOfLifePatternBackground />

      <div className="w-full max-w-5xl px-2 sm:px-4">
        <Reveal>
          <div className="p-3 sm:p-4">
            <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
              Skills
            </h2>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
