import { useEffect, useRef } from 'react'
import {
  createGameOfLife,
  PATTERNS,
  type PatternName,
} from '@/lib/game-of-life'
import { observeThemeColor, readFillColor } from '@/lib/theme-observer'

export type { PatternName }

export interface UseGameOfLifePatternOptions {
  pattern?: PatternName
  cellSize?: number
  tickIntervalMs?: number
  colorVar?: string
  alpha?: number
  padding?: number
  active?: boolean
}

export interface UseGameOfLifePatternResult {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

const DEFAULT_CELL_SIZE = 12
const DEFAULT_TICK_INTERVAL_MS = 333
const DEFAULT_COLOR_VAR = '--muted-foreground'
const DEFAULT_ALPHA = 0.35
const DEFAULT_PADDING = 4
const MAX_DPR = 2

export function useGameOfLifePattern(
  opts: UseGameOfLifePatternOptions = {},
): UseGameOfLifePatternResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const {
    pattern = 'pulsar',
    cellSize = DEFAULT_CELL_SIZE,
    tickIntervalMs = DEFAULT_TICK_INTERVAL_MS,
    colorVar = DEFAULT_COLOR_VAR,
    alpha = DEFAULT_ALPHA,
    padding = DEFAULT_PADDING,
    active = true,
  } = opts

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    const model = PATTERNS[pattern]
    const cols = model.width + padding * 2
    const rows = model.height + padding * 2
    const engine = createGameOfLife({ cols, rows, toroidal: false })
    engine.stampPattern(padding, padding, model.cells)

    let fillColor = readFillColor(colorVar)
    let rafId: number | null = null
    let running = false
    let lastTimestamp = 0
    let accumulator = 0

    const setupCanvas = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const w = cols * cellSize
      const h = rows * cellSize
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
    }

    const draw = (): void => {
      const { current } = engine
      ctx.globalAlpha = 1
      ctx.clearRect(0, 0, cols * cellSize, rows * cellSize)
      ctx.globalAlpha = alpha
      ctx.fillStyle = fillColor
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (current[y * cols + x] === 1) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (timestamp: number): void => {
      const delta = timestamp - lastTimestamp
      lastTimestamp = timestamp
      accumulator += delta

      let stepped = false
      while (accumulator >= tickIntervalMs) {
        engine.step()
        accumulator -= tickIntervalMs
        stepped = true
      }

      if (stepped) draw()
      rafId = requestAnimationFrame(loop)
    }

    const start = (): void => {
      if (running) return
      running = true
      lastTimestamp = performance.now()
      accumulator = 0
      rafId = requestAnimationFrame(loop)
    }

    const stop = (): void => {
      running = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const visibilityObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) start()
        else stop()
      }
    })
    visibilityObserver.observe(canvas)

    const unobserveTheme = observeThemeColor(() => {
      fillColor = readFillColor(colorVar)
      draw()
    })

    const onResize = (): void => {
      setupCanvas()
      draw()
    }
    window.addEventListener('resize', onResize)

    setupCanvas()
    draw()

    return () => {
      stop()
      visibilityObserver.disconnect()
      unobserveTheme()
      window.removeEventListener('resize', onResize)
    }
  }, [pattern, cellSize, tickIntervalMs, colorVar, alpha, padding, active])

  return { canvasRef }
}
