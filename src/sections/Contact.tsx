import { Section } from '@/components/Section'
import { Footer } from '@/components/Footer'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Contact() {
  return (
    <Section id="contact" className="relative isolate">
      <GameOfLifePatternBackground />
      <h2 className="text-foreground text-3xl font-bold tracking-tight">
        Contact
      </h2>
      <p className="text-muted-foreground mt-2">Coming soon</p>
      <Footer />
    </Section>
  )
}
