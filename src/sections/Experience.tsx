import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { EXPERIENCES, type ExperienceItem } from '@/lib/resume-data'

function MediaPlaceholder({ caption }: { readonly caption: string }) {
  return (
    <div className="border-border/50 bg-muted/25 relative flex min-h-28 flex-col justify-between overflow-hidden rounded-xl border p-3 sm:min-h-52 sm:p-4 lg:min-h-full">
      <svg
        aria-hidden="true"
        className="stroke-border/60 pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" strokeWidth="1" />
      </svg>
      <div
        aria-hidden="true"
        className="border-border/40 pointer-events-none relative size-5 border-t border-l"
      />
      <p className="text-muted-foreground/80 bg-background/70 relative z-10 w-fit rounded px-2 py-1 font-mono text-xs backdrop-blur-xs">
        {caption}
      </p>
    </div>
  )
}

function ExperienceCard({
  item,
  isActive,
  onSelect,
}: {
  readonly item: ExperienceItem
  readonly isActive: boolean
  readonly onSelect: () => void
}) {
  return (
    <article
      onClick={!isActive ? onSelect : undefined}
      className={cn(
        'bg-card/60 border-border/60 grid w-[80vw] max-w-4xl shrink-0 grid-cols-1 gap-3 rounded-2xl border p-3.5 shadow-sm transition-all duration-500 sm:w-[76vw] sm:gap-6 sm:p-6 lg:w-[68vw] lg:grid-cols-12 lg:p-7',
        isActive
          ? 'border-border opacity-100'
          : 'hover:border-border/80 cursor-pointer opacity-45 hover:opacity-75',
      )}
    >
      <div className="lg:col-span-5">
        <MediaPlaceholder caption={item.imageCaption} />
      </div>

      <div className="flex flex-col justify-between lg:col-span-7 lg:py-1">
        <div>
          <p className="text-muted-foreground font-mono text-xs tracking-wide">
            {item.period} · {item.location}
          </p>
          <h3 className="text-foreground mt-2 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {item.role}
          </h3>
          <p className="text-foreground/85 mt-1 text-sm font-medium sm:text-base">
            {item.organization} — {item.department}
          </p>

          <div className="border-border/40 my-2.5 border-t sm:my-4" />

          <p className="text-foreground/90 text-sm leading-relaxed sm:text-base">
            {item.summary}
          </p>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-xs leading-relaxed sm:mt-3 sm:line-clamp-none sm:text-sm">
            {item.details}
          </p>
        </div>

        <p className="border-border/40 text-muted-foreground mt-3 border-t pt-2.5 font-mono text-xs sm:mt-5 sm:pt-3">
          {item.stack}
        </p>
      </div>
    </article>
  )
}

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const dragState = useRef<{
    active: boolean
    startX: number
    startIndex: number
    deltaX: number
    moved: boolean
  }>({ active: false, startX: 0, startIndex: 0, deltaX: 0, moved: false })

  const scrollToIndex = (index: number): void => {
    const clamped = Math.max(0, Math.min(EXPERIENCES.length - 1, index))
    const track = trackRef.current
    const card = cardRefs.current[clamped]
    setActiveIndex(clamped)
    if (track === null || card === null || card === undefined) return
    const targetLeft =
      card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2
    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const track = trackRef.current
    if (track === null) return

    let rafId: number | null = null
    const handleScroll = (): void => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (dragState.current.active) return
        const viewportCenter = track.scrollLeft + track.clientWidth / 2
        let bestIdx = 0
        let bestDist = Infinity
        cardRefs.current.forEach((el, idx) => {
          if (el === null) return
          const dist = Math.abs(
            el.offsetLeft + el.offsetWidth / 2 - viewportCenter,
          )
          if (dist < bestDist) {
            bestDist = dist
            bestIdx = idx
          }
        })
        setActiveIndex(bestIdx)
      })
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      track.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    dragState.current = {
      active: true,
      startX: e.clientX,
      startIndex: activeIndex,
      deltaX: 0,
      moved: false,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!dragState.current.active) return
    const deltaX = e.clientX - dragState.current.startX
    dragState.current.deltaX = deltaX
    if (Math.abs(deltaX) > 8) {
      dragState.current.moved = true
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!dragState.current.active) return
    const { deltaX, startIndex, moved } = dragState.current
    dragState.current.active = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    if (!moved) return
    if (deltaX < -50) {
      scrollToIndex(startIndex + 1)
    } else if (deltaX > 50) {
      scrollToIndex(startIndex - 1)
    }
  }

  const arrowDrag = useRef<{ startX: number; triggered: boolean } | null>(null)

  const handleRightArrowPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
  ): void => {
    arrowDrag.current = { startX: e.clientX, triggered: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleRightArrowPointerMove = (
    e: React.PointerEvent<HTMLButtonElement>,
  ): void => {
    if (arrowDrag.current === null || arrowDrag.current.triggered) return
    const dx = e.clientX - arrowDrag.current.startX
    if (Math.abs(dx) > 24) {
      arrowDrag.current.triggered = true
      scrollToIndex(activeIndex + 1)
    }
  }

  const handleRightArrowClick = (): void => {
    if (arrowDrag.current?.triggered) {
      arrowDrag.current = null
      return
    }
    arrowDrag.current = null
    scrollToIndex(activeIndex + 1)
  }

  const canGoNewer = activeIndex > 0
  const canGoOlder = activeIndex < EXPERIENCES.length - 1

  return (
    <Section id="experience" className="px-0 sm:px-0 md:px-0 lg:px-0">
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <div className="w-full max-w-5xl px-5 sm:px-10 md:px-12 lg:px-16">
          <Reveal>
            <h2 className="text-foreground font-display text-4xl font-bold tracking-tight text-shadow-sm sm:text-7xl lg:text-8xl">
              Experience
            </h2>
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="my-auto flex min-h-0 w-full flex-1 flex-col justify-center py-2 sm:py-5"
        >
          <div className="relative w-full">
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="no-scrollbar flex w-full cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[calc(50%-min(40vw,28rem))] select-none active:cursor-grabbing sm:gap-6 sm:px-[calc(50%-min(38vw,28rem))] lg:gap-8 lg:px-[calc(50%-min(34vw,28rem))]"
            >
              {EXPERIENCES.map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  className="snap-center"
                >
                  <ExperienceCard
                    item={item}
                    isActive={idx === activeIndex}
                    onSelect={() => {
                      if (!dragState.current.moved) scrollToIndex(idx)
                    }}
                  />
                </div>
              ))}
            </div>

            {canGoNewer && (
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="More recent experience"
                className="bg-background/85 border-border/70 text-foreground hover:bg-accent absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all sm:flex lg:left-6 lg:size-12"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}

            {canGoOlder && (
              <button
                type="button"
                onPointerDown={handleRightArrowPointerDown}
                onPointerMove={handleRightArrowPointerMove}
                onClick={handleRightArrowClick}
                aria-label="Step back in time to previous experience"
                className="bg-background/85 border-border/70 text-foreground hover:bg-accent absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 touch-none items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all sm:right-6 lg:right-10 lg:size-12"
              >
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 px-5 sm:mt-6 sm:justify-center sm:px-10 md:px-12 lg:px-16">
            <div className="flex items-center gap-3 sm:gap-5">
              {EXPERIENCES.map((item, idx) => {
                const active = idx === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    className={cn(
                      'group flex items-center gap-2 font-mono text-xs transition-colors sm:text-sm',
                      active
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'h-px transition-all',
                        active
                          ? 'bg-foreground w-6 sm:w-8'
                          : 'bg-border group-hover:bg-muted-foreground w-3 sm:w-4',
                      )}
                    />
                    <span>{item.year}</span>
                    <span className="hidden opacity-75 md:inline">
                      · {item.organization}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                disabled={!canGoNewer}
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="More recent experience"
                className="border-border/60 text-foreground flex size-9 items-center justify-center rounded-full border disabled:opacity-30"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                disabled={!canGoOlder}
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Older experience"
                className="border-border/60 text-foreground flex size-9 items-center justify-center rounded-full border disabled:opacity-30"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
