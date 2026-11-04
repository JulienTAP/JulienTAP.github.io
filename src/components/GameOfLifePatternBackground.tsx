import { cn } from '@/lib/utils'
import { usePortfolioReady } from '@/context/portfolio-ready'
import {
  useGameOfLifePattern,
  type PatternName,
} from '@/hooks/useGameOfLifePattern'

interface GameOfLifePatternBackgroundProps {
  readonly pattern?: PatternName
  readonly className?: string
}

export function GameOfLifePatternBackground({
  pattern = 'pulsar',
  className,
}: GameOfLifePatternBackgroundProps) {
  const ready = usePortfolioReady()
  const { canvasRef } = useGameOfLifePattern({ pattern, active: ready })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-20 right-8 -z-10',
        className,
      )}
    />
  )
}
