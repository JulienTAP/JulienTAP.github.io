import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GameOfLifeBackground } from '@/components/GameOfLifeBackground'
import { Button } from '@/components/ui/button'

interface IntroProps {
  readonly onFinish: () => void
}

const CARD_FADE_MS = 300
const WIPE_DELAY_MS = 250
const WIPE_MS = 700
const FALLBACK_MS = WIPE_DELAY_MS + WIPE_MS + 250

export function Intro({ onFinish }: IntroProps) {
  const [leaving, setLeaving] = useState(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (!leaving) return
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const fallback = setTimeout(onFinish, reduced ? CARD_FADE_MS : FALLBACK_MS)
    return () => clearTimeout(fallback)
  }, [leaving, onFinish])

  const finish = (): void => {
    if (finishedRef.current) return
    finishedRef.current = true
    onFinish()
  }

  const handleTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>,
  ): void => {
    if (e.target === e.currentTarget && e.propertyName === 'clip-path') {
      finish()
    }
  }

  const begin = (): void => {
    setLeaving(true)
  }

  return (
    <div
      aria-label="Introduction"
      onTransitionEnd={handleTransitionEnd}
      className={cn(
        'bg-background intro-wipe fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4',
        leaving && 'intro-wipe-leaving',
      )}
    >
      <GameOfLifeBackground />
      <div className="bg-background/30 pointer-events-none absolute inset-0" />

      <div
        className={cn(
          'bg-background/40 border-border/40 animate-in fade-in-0 zoom-in-95 fill-mode-both w-full max-w-md rounded-2xl border p-6 backdrop-blur-md duration-700 sm:p-8',
          'transition-all duration-300 motion-reduce:transition-none',
          leaving && 'translate-y-6 scale-95 opacity-0',
        )}
      >
        <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
          Inspired by Conway&apos;s Game of Life
        </p>

        <h1 className="text-foreground font-display mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Simple rules. Wild complexity.
        </h1>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          This background is a live simulation of the Game of Life, by John
          Horton Conway. Cells live and die by a few simple rules, and
          complexity emerges on its own.
        </p>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          That mess behind this card? That&apos;s what unstructured problems
          look like.
        </p>

        <p className="text-foreground mt-2 text-sm font-medium">
          I can help clean that up.
        </p>

        <Button size="lg" className="mt-6 w-full" onClick={begin}>
          Let&apos;s clean that
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
