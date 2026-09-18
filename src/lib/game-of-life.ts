export type Cell = 0 | 1

export interface GameOfLifeOptions {
  cols: number
  rows: number
  toroidal?: boolean
}

export interface GameOfLifeEngine {
  step(): void
  resize(cols: number, rows: number): void
  reseed(density: number): void
  stampPattern(
    x: number,
    y: number,
    cells: ReadonlyArray<readonly [number, number]>,
  ): void
  clear(): void
  readonly current: Uint8Array
  readonly previous: Uint8Array
  readonly cols: number
  readonly rows: number
  generation: number
  population: number
}

export interface PatternModel {
  readonly cells: ReadonlyArray<readonly [number, number]>
  readonly width: number
  readonly height: number
}

const pattern = (
  cells: ReadonlyArray<readonly [number, number]>,
): PatternModel => {
  let maxX = 0
  let maxY = 0
  for (const [x, y] of cells) {
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  return { cells, width: maxX + 1, height: maxY + 1 }
}

export function createGameOfLife(opts: GameOfLifeOptions): GameOfLifeEngine {
  let cols = opts.cols
  let rows = opts.rows
  const toroidal = opts.toroidal ?? true
  let current = new Uint8Array(cols * rows)
  let previous = new Uint8Array(cols * rows)
  let generation = 0
  let population = 0

  const idx = (x: number, y: number): number => y * cols + x

  const countNeighbors = (x: number, y: number): number => {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        let nx = x + dx
        let ny = y + dy
        if (toroidal) {
          nx = (nx + cols) % cols
          ny = (ny + rows) % rows
        } else if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) {
          continue
        }
        count += current[idx(nx, ny)]
      }
    }
    return count
  }

  const recomputePopulation = (): number => {
    let pop = 0
    for (let i = 0; i < current.length; i++) {
      if (current[i] === 1) pop++
    }
    return pop
  }

  const step = (): void => {
    const buf = previous
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = countNeighbors(x, y)
        const alive = current[idx(x, y)] === 1
        let next: Cell = 0
        if (alive && (neighbors === 2 || neighbors === 3)) {
          next = 1
        } else if (!alive && neighbors === 3) {
          next = 1
        }
        buf[idx(x, y)] = next
      }
    }
    const tmp = current
    current = buf
    previous = tmp
    generation++
    population = recomputePopulation()
  }

  const resize = (newCols: number, newRows: number): void => {
    cols = newCols
    rows = newRows
    current = new Uint8Array(cols * rows)
    previous = new Uint8Array(cols * rows)
    generation = 0
    population = 0
  }

  const reseed = (density: number): void => {
    current.fill(0)
    for (let i = 0; i < current.length; i++) {
      if (Math.random() < density) {
        current[i] = 1
      }
    }
    previous.fill(0)
    generation = 0
    population = recomputePopulation()
  }

  const stampPattern = (
    x: number,
    y: number,
    cells: ReadonlyArray<readonly [number, number]>,
  ): void => {
    for (const [px, py] of cells) {
      const sx = x + px
      const sy = y + py
      if (sx >= 0 && sx < cols && sy >= 0 && sy < rows) {
        current[idx(sx, sy)] = 1
      }
    }
    population = recomputePopulation()
  }

  const clear = (): void => {
    current.fill(0)
    previous.fill(0)
    generation = 0
    population = 0
  }

  return {
    step,
    resize,
    reseed,
    stampPattern,
    clear,
    get current() {
      return current
    },
    get previous() {
      return previous
    },
    get cols() {
      return cols
    },
    get rows() {
      return rows
    },
    get generation() {
      return generation
    },
    set generation(value: number) {
      generation = value
    },
    get population() {
      return population
    },
    set population(value: number) {
      population = value
    },
  }
}

export const PATTERNS = {
  glider: pattern([
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ]),
  blinker: pattern([
    [0, 0],
    [1, 0],
    [2, 0],
  ]),
  toad: pattern([
    [1, 0],
    [2, 0],
    [3, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]),
  beacon: pattern([
    [0, 0],
    [1, 0],
    [0, 1],
    [3, 2],
    [2, 3],
    [3, 3],
  ]),
  pulsar: pattern([
    [2, 0],
    [3, 0],
    [4, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [0, 2],
    [5, 2],
    [7, 2],
    [12, 2],
    [0, 3],
    [5, 3],
    [7, 3],
    [12, 3],
    [0, 4],
    [5, 4],
    [7, 4],
    [12, 4],
    [2, 5],
    [3, 5],
    [4, 5],
    [8, 5],
    [9, 5],
    [10, 5],
    [2, 7],
    [3, 7],
    [4, 7],
    [8, 7],
    [9, 7],
    [10, 7],
    [0, 8],
    [5, 8],
    [7, 8],
    [12, 8],
    [0, 9],
    [5, 9],
    [7, 9],
    [12, 9],
    [0, 10],
    [5, 10],
    [7, 10],
    [12, 10],
    [2, 12],
    [3, 12],
    [4, 12],
    [8, 12],
    [9, 12],
    [10, 12],
  ]),
  gosperGliderGun: pattern([
    [24, 0],
    [22, 1],
    [24, 1],
    [12, 2],
    [13, 2],
    [20, 2],
    [21, 2],
    [34, 2],
    [35, 2],
    [11, 3],
    [15, 3],
    [20, 3],
    [21, 3],
    [34, 3],
    [35, 3],
    [0, 4],
    [1, 4],
    [10, 4],
    [16, 4],
    [20, 4],
    [21, 4],
    [0, 5],
    [1, 5],
    [10, 5],
    [14, 5],
    [16, 5],
    [17, 5],
    [22, 5],
    [24, 5],
    [10, 6],
    [16, 6],
    [24, 6],
    [11, 7],
    [15, 7],
    [12, 8],
    [13, 8],
  ]),
} as const satisfies Record<string, PatternModel>

export type PatternName = keyof typeof PATTERNS

export const PATTERN_NAMES = Object.keys(PATTERNS) as PatternName[]

export interface SeedResult {
  readonly placements: ReadonlyArray<{
    readonly name: PatternName
    readonly x: number
    readonly y: number
  }>
}

export function seedRandomPatterns(
  engine: GameOfLifeEngine,
  pool: ReadonlyArray<PatternName>,
  count: number,
  padding = 4,
): SeedResult {
  const placements: Array<{
    name: PatternName
    x: number
    y: number
  }> = []
  const occupied: Array<{ x: number; y: number; w: number; h: number }> = []
  const cols = engine.cols
  const rows = engine.rows
  let attempts = 0
  const maxAttempts = count * 30

  while (placements.length < count && attempts < maxAttempts) {
    attempts++
    const name = pool[Math.floor(Math.random() * pool.length)]
    const model = PATTERNS[name]
    const w = model.width + padding * 2
    const h = model.height + padding * 2
    if (w > cols || h > rows) continue
    const x = Math.floor(Math.random() * (cols - w)) + padding
    const y = Math.floor(Math.random() * (rows - h)) + padding
    const overlaps = occupied.some(
      (o) => x < o.x + o.w && x + w > o.x && y < o.y + o.h && y + h > o.y,
    )
    if (overlaps) continue
    engine.stampPattern(x, y, model.cells)
    occupied.push({ x, y, w, h })
    placements.push({ name, x, y })
  }

  return { placements }
}
