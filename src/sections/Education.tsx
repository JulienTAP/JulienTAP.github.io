import { cn } from '@/lib/utils'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { EDUCATION_ROADMAP, type EducationNode } from '@/lib/resume-data'

function RoadmapCard({
  node,
  align,
}: {
  readonly node: EducationNode
  readonly align: 'left' | 'right'
}) {
  return (
    <article
      className={cn(
        'bg-card/60 border-border/60 hover:border-border/90 relative rounded-2xl border p-3 shadow-sm transition-colors sm:p-4 lg:px-5 lg:py-4',
        node.current && 'border-foreground/25 bg-card/80',
        align === 'left' ? 'lg:text-right' : 'lg:text-left',
      )}
    >
      <p className="text-muted-foreground font-mono text-[11px] tracking-wide sm:text-xs">
        {node.period} · {node.location}
      </p>
      <h3 className="text-foreground mt-0.5 text-sm leading-snug font-semibold tracking-tight sm:mt-1.5 sm:text-lg">
        {node.degree}
      </h3>
      <p className="text-foreground/85 mt-0.5 text-xs font-medium sm:text-sm">
        {node.institution}
      </p>
      <p className="text-muted-foreground mt-1 line-clamp-2 text-[11px] leading-snug sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
        {node.detail}
      </p>
    </article>
  )
}

export function Education() {
  return (
    <Section id="education">
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <Reveal>
          <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
            Education
          </h2>
        </Reveal>

        <div className="my-auto flex min-h-0 w-full flex-1 items-center justify-center py-2">
          <div className="relative w-full max-w-5xl">
            <ol className="flex flex-col">
              {EDUCATION_ROADMAP.map((node, index) => {
                const isLeft = index % 2 === 0
                const isFirst = index === 0
                const isLast = index === EDUCATION_ROADMAP.length - 1
                const nextNode = EDUCATION_ROADMAP[index + 1]
                const activeSegmentBelow =
                  node.current && (nextNode?.current ?? false)

                return (
                  <li
                    key={node.id}
                    className={cn(
                      'relative grid grid-cols-[2.25rem_1fr] items-start lg:grid-cols-[1fr_4.5rem_1fr]',
                      !isFirst && 'pt-2.5 sm:pt-4 lg:-mt-12 lg:pt-0',
                    )}
                  >
                    <div className="hidden lg:block">
                      {isLeft && (
                        <Reveal delay={80 + index * 60}>
                          <RoadmapCard node={node} align="left" />
                        </Reveal>
                      )}
                    </div>

                    <div className="relative flex h-full justify-center">
                      {!isFirst && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute top-0 left-3 w-px -translate-x-1/2 lg:left-1/2',
                            'h-6 lg:h-8',
                            node.current ? 'bg-foreground/45' : 'bg-border',
                          )}
                        />
                      )}

                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute top-6 bottom-0 left-3 w-px -translate-x-1/2 lg:top-8 lg:left-1/2',
                            activeSegmentBelow
                              ? 'bg-foreground/45'
                              : 'bg-border',
                          )}
                        />
                      )}

                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute top-6 left-3 h-px w-6 lg:top-8 lg:w-1/2',
                          isLeft ? 'lg:right-1/2 lg:left-auto' : 'lg:left-1/2',
                          node.current ? 'bg-foreground/45' : 'bg-border',
                        )}
                      />

                      <span
                        aria-hidden="true"
                        className={cn(
                          'relative z-10 mt-4 -ml-3 flex items-center justify-center rounded-full lg:mt-6 lg:ml-0',
                          node.current
                            ? 'bg-foreground ring-foreground/15 size-3.5 ring-4'
                            : 'border-muted-foreground/60 bg-background size-3 border-2',
                        )}
                      />
                    </div>

                    <div className="lg:hidden">
                      <Reveal delay={80 + index * 60}>
                        <RoadmapCard node={node} align="right" />
                      </Reveal>
                    </div>

                    <div className="hidden lg:block">
                      {!isLeft && (
                        <Reveal delay={80 + index * 60}>
                          <RoadmapCard node={node} align="right" />
                        </Reveal>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
