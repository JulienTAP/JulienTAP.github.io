import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { GameOfLifePatternBackground } from '@/components/GameOfLifePatternBackground'
import { useResolvedTheme } from '@/hooks/useResolvedTheme'
import { ABSTRACT_SKILLS, TECH_STACK } from '@/lib/skills'

export function Skills() {
  const theme = useResolvedTheme()

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
            <p className="text-muted-foreground mt-2 text-sm sm:mt-3 sm:text-base">
              The tools I master, and the way I think with them.
            </p>
          </div>
        </Reveal>

        <div className="mt-2 flex flex-wrap justify-center gap-2.5 sm:mt-4 sm:gap-4">
          {TECH_STACK.map((tech, i) => (
            <Reveal key={tech.name} delay={100 + i * 60}>
              <div className="bg-background/40 border-border/40 hover:border-border/70 hover:bg-background/60 flex w-24 flex-col items-center gap-1.5 rounded-xl border p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none sm:w-28 sm:gap-2.5 sm:p-5">
                <tech.icon
                  className="size-8 sm:size-10"
                  style={{
                    color: theme === 'dark' ? tech.colorDark : tech.colorLight,
                  }}
                />
                <span className="text-muted-foreground text-xs font-medium">
                  {tech.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={700}>
          <p className="text-muted-foreground mt-5 text-center text-xs font-semibold tracking-widest uppercase sm:mt-5">
            Beyond the stack
          </p>
        </Reveal>

        <div className="mt-2 flex flex-wrap justify-center gap-2.5 sm:mt-3 sm:gap-3">
          {ABSTRACT_SKILLS.map((skill, i) => (
            <Reveal key={skill.label} delay={800 + i * 60}>
              <div className="bg-background/40 border-border/40 hover:border-border/70 hover:bg-background/60 flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transition-none sm:px-4 sm:py-2">
                <skill.icon className="text-foreground size-4" />
                <span className="text-foreground text-sm font-medium">
                  {skill.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
