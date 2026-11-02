import { cn } from '@/lib/utils'

const GRID = 25

export function MockQr({
  className,
  seed,
  size = 200,
}: {
  className?: string
  seed: string
  size?: number
}) {
  const random = createRandom(hash(seed))
  const cells: Array<{ x: number; y: number }> = []

  for (let row = 0; row < GRID; row += 1) {
    for (let col = 0; col < GRID; col += 1) {
      const finder = isFinder(row, col)
      if (finder === 'outer') continue
      if (finder === null && random() > 0.52) continue
      cells.push({ x: col, y: row })
    }
  }

  return (
    <svg
      aria-label={`QR Code ilustrativo de ${seed}`}
      className={cn('rounded-lg', className)}
      height={size}
      role="img"
      viewBox={`0 0 ${GRID} ${GRID}`}
      width={size}
    >
      <rect fill="#f6f1ff" height={GRID} rx="1.6" width={GRID} />
      {cells.map((cell) => (
        <rect
          fill="#241a45"
          height={0.7}
          key={`${cell.x}-${cell.y}`}
          rx={0.18}
          width={0.7}
          x={cell.x + 0.15}
          y={cell.y + 0.15}
        />
      ))}
    </svg>
  )
}

/** Small deterministic PRNG so a given code always renders the same pattern. */
function createRandom(seed: number) {
  let state = seed || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 1000) / 1000
  }
}

function hash(seed: string): number {
  let value = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    value ^= seed.charCodeAt(i)
    value = Math.imul(value, 16777619)
  }
  return value >>> 0
}

function isFinder(row: number, col: number): 'inner' | 'outer' | null {
  const inBox = (top: number, left: number) =>
    row >= top && row < top + 7 && col >= left && col < left + 7

  const boxes: Array<[number, number]> = [
    [0, 0],
    [0, GRID - 7],
    [GRID - 7, 0],
  ]

  for (const [top, left] of boxes) {
    if (!inBox(top, left)) continue
    const r = row - top
    const c = col - left
    const onBorder = r === 0 || r === 6 || c === 0 || c === 6
    const inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4
    return onBorder || inCore ? 'outer' : 'inner'
  }
  return null
}
