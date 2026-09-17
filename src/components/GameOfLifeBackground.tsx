import { useGameOfLife, type PatternName } from '@/hooks/useGameOfLife'

const PATTERN_POOL: ReadonlyArray<PatternName> = [
  'pulsar',
  'glider',
  'blinker',
  'toad',
  'beacon',
  'gosperGliderGun',
]

export function GameOfLifeBackground() {
  const { canvasRef } = useGameOfLife({
    cellSize: 12,
    tickIntervalMs: 167,
    colorVar: '--muted-foreground',
    alpha: 0.4,
    patternPool: PATTERN_POOL,
    patternCount: 40,
    patternPadding: 4,
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
