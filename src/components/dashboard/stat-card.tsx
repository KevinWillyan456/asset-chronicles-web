import type { IconName } from '@/components/ui/icon'
import type { Tone } from '@/lib/domain'

import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

const tones: Record<Tone, { glow: string; icon: string }> = {
  accent: {
    glow: 'from-arcane-500/22',
    icon: 'text-arcane-200 border-arcane-400/35 bg-arcane-500/14',
  },
  info: {
    glow: 'from-mystic-400/20',
    icon: 'text-mystic-300 border-mystic-400/35 bg-mystic-400/12',
  },
  neutral: {
    glow: 'from-lilac-300/16',
    icon: 'text-lilac-200 border-lilac-300/25 bg-lilac-300/10',
  },
  success: {
    glow: 'from-emerald-400/20',
    icon: 'text-emerald-200 border-emerald-300/30 bg-emerald-400/12',
  },
  warning: {
    glow: 'from-amber-400/20',
    icon: 'text-amber-200 border-amber-300/30 bg-amber-400/12',
  },
}

interface StatCardProps {
  hint?: string
  icon: IconName
  label: string
  tone?: Tone
  trend?: { direction: 'down' | 'flat' | 'up'; label: string }
  value: string
}

export function StatCard({ hint, icon, label, tone = 'accent', trend, value }: StatCardProps) {
  const style = tones[tone]
  return (
    <div className="glass ornament-edge group relative overflow-hidden rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-gradient-to-b to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100',
          style.glow,
          'opacity-60',
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-lilac-200/65 text-[11.5px] font-medium tracking-wide uppercase">
            {label}
          </p>
          <p className="font-display text-lilac-50 mt-2 text-2xl font-semibold">{value}</p>
        </div>
        <span
          className={cn('flex size-9 items-center justify-center rounded-xl border', style.icon)}
        >
          <Icon name={icon} size={18} />
        </span>
      </div>
      <div className="relative mt-3 flex items-center gap-2 text-[11.5px]">
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium',
              trend.direction === 'up' && 'bg-emerald-400/12 text-emerald-200',
              trend.direction === 'down' && 'bg-rose-400/12 text-rose-200',
              trend.direction === 'flat' && 'bg-lilac-300/10 text-lilac-200',
            )}
          >
            <Icon
              className={cn(
                trend.direction === 'up' && '-rotate-90',
                trend.direction === 'down' && 'rotate-90',
              )}
              name="chevronRight"
              size={12}
            />
            {trend.label}
          </span>
        )}
        {hint && <span className="text-lilac-200/50">{hint}</span>}
      </div>
    </div>
  )
}
