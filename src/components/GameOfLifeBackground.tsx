import { useGameOfLife } from '@/hooks/useGameOfLife'

export function GameOfLifeBackground() {
  const { canvasRef } = useGameOfLife({
    cellSize: 12,
    tickIntervalMs: 167,
    colorVar: '--muted-foreground',
    alpha: 0.4,
    soupDensity: 0.2,
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  )
}
