import { Section } from '@/components/Section'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Experience() {
  return (
    <Section id="experience" className="relative isolate">
      <GameOfLifePatternBackground />
      <h2 className="text-foreground text-3xl font-bold tracking-tight">
        Experience
      </h2>
      <p className="text-muted-foreground mt-2">Coming soon</p>
    </Section>
  )
}
