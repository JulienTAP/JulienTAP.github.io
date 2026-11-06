import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'

export function Contact() {
  return (
    <Section
      id="contact"
      className="relative isolate items-start justify-start px-6 pt-20 pb-14 sm:px-12 sm:pb-16"
    >
      <GameOfLifePatternBackground />
      <div className="w-full max-w-5xl px-2 sm:px-4">
        <Reveal>
          <h2 className="text-foreground font-display p-3 text-4xl font-bold tracking-tight text-shadow-sm sm:p-4 sm:text-7xl lg:text-8xl">
            Contact
          </h2>
        </Reveal>
      </div>
      <Footer />
    </Section>
  )
}
