export function cn(...classes: Array<false | null | string | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  maximumFractionDigits: 2,
  style: 'currency',
})

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.', ',')}M`
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1).replace('.', ',')}k`
  return formatCurrency(value)
}

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatDate(iso: string): string {
  const date = parseIsoDate(iso)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatLongDate(iso: string): string {
  const date = parseIsoDate(iso)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Parses an ISO `yyyy-mm-dd` date string without timezone surprises. */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

const RELATIVE_UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
]

/** Formats an ISO date-time relative to now, e.g. "há 2 dias". */
export function relativeTime(isoDateTime: string): string {
  const diffSeconds = (new Date(isoDateTime).getTime() - Date.now()) / 1000
  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })

  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return formatter.format(Math.round(diffSeconds / secondsInUnit), unit)
    }
  }

  return 'agora mesmo'
}
