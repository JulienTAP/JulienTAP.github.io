import { useEffect, useRef, useState } from 'react'
import { GameOfLifeBackground } from '@/components/GameOfLifeBackground'
import type { StepMode } from '@/hooks/useGameOfLife'

interface IntroProps {
  readonly onFinish: () => void
}

const STABILIZE_AT_MS = 1000
const ERODE_AT_MS = 1300
const EXTINGUISH_AT_MS = 1500
const FINISH_AT_MS = 1650

export function Intro({ onFinish }: IntroProps) {
  const [stepMode, setStepMode] = useState<StepMode>('conway')
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduced) {
      onFinishRef.current()
      return
    }

    const t1 = setTimeout(() => setStepMode('stabilize'), STABILIZE_AT_MS)
    const t2 = setTimeout(() => setStepMode('erode'), ERODE_AT_MS)
    const t3 = setTimeout(() => setStepMode('extinguish'), EXTINGUISH_AT_MS)
    const t4 = setTimeout(() => onFinishRef.current(), FINISH_AT_MS)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div
      aria-label="Introduction"
      className="bg-background fixed inset-0 z-50 overflow-hidden"
    >
      <GameOfLifeBackground stepMode={stepMode} />
    </div>
  )
}
