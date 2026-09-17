import { useEffect, useRef } from 'react'
import {
  createGameOfLife,
  seedRandomPatterns,
  type GameOfLifeEngine,
  type PatternName,
} from '@/lib/game-of-life'

export type { PatternName }

export interface UseGameOfLifeOptions {
  cellSize?: number
  tickIntervalMs?: number
  colorVar?: string
  alpha?: number
  patternPool?: ReadonlyArray<PatternName>
  patternCount?: number
  patternPadding?: number
}

export interface UseGameOfLifeResult {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

const DEFAULT_CELL_SIZE = 12
const DEFAULT_TICK_INTERVAL_MS = 167
const DEFAULT_COLOR_VAR = '--muted-foreground'
const DEFAULT_ALPHA = 0.22
const DEFAULT_PATTERN_COUNT = 12
const DEFAULT_PATTERN_PADDING = 4
const MAX_DPR = 2

export function useGameOfLife(
  opts: UseGameOfLifeOptions = {},
): UseGameOfLifeResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const {
    cellSize = DEFAULT_CELL_SIZE,
    tickIntervalMs = DEFAULT_TICK_INTERVAL_MS,
    colorVar = DEFAULT_COLOR_VAR,
    alpha = DEFAULT_ALPHA,
    patternPool = [],
    patternCount = DEFAULT_PATTERN_COUNT,
    patternPadding = DEFAULT_PATTERN_PADDING,
  } = opts

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    let rafId: number | null = null
    let engine: GameOfLifeEngine
    let fillColor = ''
    let lastTimestamp = performance.now()
    let accumulator = 0
    let needsFullRedraw = true
    let renderedState = new Uint8Array(0)

    const readFillColor = (): string => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(colorVar)
        .trim()
    }

    const computeDims = (): { cols: number; rows: number } => {
      const w = window.innerWidth
      const h = window.innerHeight
      return {
        cols: Math.max(1, Math.floor(w / cellSize)),
        rows: Math.max(1, Math.floor(h / cellSize)),
      }
    }

    const setupCanvas = (): void => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
    }

    const seedPatterns = (): void => {
      if (patternPool.length === 0) return
      seedRandomPatterns(engine, patternPool, patternCount, patternPadding)
    }

    const init = (): void => {
      const { cols, rows } = computeDims()
      engine = createGameOfLife({ cols, rows, toroidal: true })
      renderedState = new Uint8Array(cols * rows)
      setupCanvas()
      fillColor = readFillColor()
      seedPatterns()
      needsFullRedraw = true
    }

    const render = (): void => {
      ctx.fillStyle = fillColor
      const { cols, rows, current } = engine

      if (needsFullRedraw) {
        ctx.globalAlpha = 1
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.globalAlpha = alpha
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (current[y * cols + x] === 1) {
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            }
          }
        }
        renderedState.set(current)
        needsFullRedraw = false
        ctx.globalAlpha = 1
        return
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const cur = current[i]
          const prev = renderedState[i]
          if (cur === 1 && prev === 0) {
            ctx.globalAlpha = alpha
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          } else if (cur === 0 && prev === 1) {
            ctx.globalAlpha = 1
            ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize)
          }
        }
      }
      renderedState.set(current)
      ctx.globalAlpha = 1
    }

    const loop = (timestamp: number): void => {
      const delta = timestamp - lastTimestamp
      lastTimestamp = timestamp
      accumulator += delta

      while (accumulator >= tickIntervalMs) {
        engine.step()
        accumulator -= tickIntervalMs
      }

      render()
      rafId = requestAnimationFrame(loop)
    }

    const onResize = (): void => {
      const { cols, rows } = computeDims()
      engine.resize(cols, rows)
      renderedState = new Uint8Array(cols * rows)
      setupCanvas()
      seedPatterns()
      needsFullRedraw = true
    }

    let resizeRaf: number | null = null
    const onResizeDebounced = (): void => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(onResize)
    }

    const onThemeChange = (): void => {
      fillColor = readFillColor()
      needsFullRedraw = true
    }

    const resizeObserver = new ResizeObserver(onResizeDebounced)
    resizeObserver.observe(document.documentElement)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onThemeChange)

    init()
    rafId = requestAnimationFrame(loop)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf)
      resizeObserver.disconnect()
      mediaQuery.removeEventListener('change', onThemeChange)
    }
  }, [
    cellSize,
    tickIntervalMs,
    colorVar,
    alpha,
    patternPool,
    patternCount,
    patternPadding,
  ])

  return { canvasRef }
}
