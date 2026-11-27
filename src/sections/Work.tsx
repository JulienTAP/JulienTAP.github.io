import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Work() {
  return (
    <Section id="work">
      <GameOfLifePatternBackground />
      <div className="w-full max-w-5xl">
        <Reveal>
          <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
            Work
          </h2>
        </Reveal>
      </div>
    </Section>
  )
}
