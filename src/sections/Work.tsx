import { Section } from '@/components/Section'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Work() {
  return (
    <Section id="work" className="relative isolate">
      <GameOfLifePatternBackground />
      <h2 className="text-foreground font-display text-3xl font-bold tracking-tight">
        Work
      </h2>
      <p className="text-muted-foreground mt-2">Coming soon</p>
    </Section>
  )
}
