import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { SKILL_DOMAINS, SPOKEN_LANGUAGES } from '@/lib/resume-data'

const LEVEL_STEPS = [0, 1, 2, 3] as const

export function Skills() {
  const [activeId, setActiveId] = useState<string>(SKILL_DOMAINS[0].id)
  const activeDomain =
    SKILL_DOMAINS.find((domain) => domain.id === activeId) ?? SKILL_DOMAINS[0]

  return (
    <Section id="skills">
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <Reveal>
          <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
            Skills
          </h2>
        </Reveal>

        <div className="my-auto flex min-h-0 w-full flex-1 items-center justify-center py-2 sm:py-3">
          <Reveal delay={100} className="w-full max-w-5xl">
            <div
              role="tablist"
              aria-label="Skill domains"
              className="no-scrollbar border-border/40 mb-3 flex gap-4 overflow-x-auto border-b pb-2 lg:hidden"
            >
              {SKILL_DOMAINS.map((domain) => {
                const active = domain.id === activeDomain.id
                return (
                  <button
                    key={domain.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveId(domain.id)}
                    className={cn(
                      '-mb-2 flex shrink-0 items-center gap-1.5 border-b-2 pb-2 text-sm font-medium transition-colors',
                      active
                        ? 'border-foreground text-foreground'
                        : 'text-muted-foreground hover:text-foreground border-transparent',
                    )}
                  >
                    <span className="font-mono text-xs opacity-70">
                      {domain.index}
                    </span>
                    <span>{domain.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-8">
              <div
                role="tablist"
                aria-label="Skill domains"
                className="border-border/40 divide-border/40 hidden divide-y border-y lg:col-span-5 lg:flex lg:flex-col lg:justify-between"
              >
                {SKILL_DOMAINS.map((domain) => {
                  const active = domain.id === activeDomain.id
                  const preview = domain.skills.map((s) => s.name).join(' · ')
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveId(domain.id)}
                      onMouseEnter={() => setActiveId(domain.id)}
                      className={cn(
                        'group relative flex flex-1 items-center gap-4 px-4 py-3 text-left transition-colors',
                        active
                          ? 'bg-card/60 text-foreground'
                          : 'text-muted-foreground hover:bg-card/30 hover:text-foreground',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'bg-foreground absolute inset-y-2 left-0 w-0.5 transition-opacity',
                          active ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="font-mono text-xs tabular-nums opacity-70">
                        {domain.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold tracking-tight sm:text-base">
                          {domain.title}
                        </span>
                        <span className="text-muted-foreground mt-0.5 block truncate font-mono text-xs">
                          {preview}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                role="tabpanel"
                aria-label={activeDomain.title}
                className="flex flex-col lg:col-span-7"
              >
                <div className="bg-card/60 border-border/60 flex h-[23.5rem] w-full flex-col justify-start gap-3 rounded-2xl border p-3.5 shadow-sm sm:h-[24.5rem] sm:gap-5 sm:p-6 lg:h-[24rem] lg:p-6">
                  <div>
                    <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                      {activeDomain.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {activeDomain.summary}
                    </p>
                  </div>

                  <div className="bg-border/50 border-border/50 grid grid-cols-2 gap-px overflow-hidden rounded-xl border">
                    {activeDomain.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-background/80 px-2.5 py-2 last:odd:col-span-2 sm:px-3.5 sm:py-2.5"
                      >
                        <p className="text-foreground text-xs font-semibold tracking-tight sm:text-sm">
                          {skill.name}
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug sm:text-xs sm:leading-relaxed">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border/40 mt-3 border-t pt-3 sm:mt-5 sm:pt-4">
              <p className="text-muted-foreground mb-2 font-mono text-xs tracking-widest uppercase">
                Languages
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4 sm:gap-4">
                {SPOKEN_LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-foreground truncate text-sm font-medium">
                        {lang.name}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs">
                        {lang.levelLabel}
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="flex shrink-0 items-center gap-1"
                    >
                      {LEVEL_STEPS.map((step) => (
                        <span
                          key={step}
                          className={cn(
                            'size-1.5 rounded-[1px]',
                            step < lang.level
                              ? 'bg-foreground'
                              : 'border-border border',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
