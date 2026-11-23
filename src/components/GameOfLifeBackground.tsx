import { useGameOfLife, type StepMode } from '@/hooks/useGameOfLife'

interface GameOfLifeBackgroundProps {
  readonly stepMode?: StepMode
}

export function GameOfLifeBackground({
  stepMode = 'conway',
}: GameOfLifeBackgroundProps) {
  const { canvasRef } = useGameOfLife({
    cellSize: 12,
    tickIntervalMs: 100,
    colorVar: '--muted-foreground',
    alpha: 0.35,
    soupDensity: 0.2,
    stepMode,
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}
