import type { Tone } from '@/lib/domain'
import type { AssetStatus } from '@/types'

import { assetStatusMeta } from '@/lib/domain'
import { cn } from '@/lib/utils'

const tones: Record<Tone, string> = {
  accent: 'bg-arcane-500/16 text-arcane-200 border-arcane-400/34',
  info: 'bg-mystic-400/14 text-mystic-300 border-mystic-400/32',
  neutral: 'bg-lilac-300/10 text-lilac-200 border-lilac-300/22',
  success: 'bg-emerald-400/12 text-emerald-200 border-emerald-400/30',
  warning: 'bg-amber-400/12 text-amber-200 border-amber-400/30',
}

const dots: Record<Tone, string> = {
  accent: 'bg-arcane-300 shadow-[0_0_8px_rgba(196,181,253,0.85)]',
  info: 'bg-mystic-300 shadow-[0_0_8px_rgba(165,180,252,0.85)]',
  neutral: 'bg-lilac-300/80',
  success: 'bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.85)]',
  warning: 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.85)]',
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  dot?: boolean
  icon?: React.ReactNode
  tone?: Tone
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: AssetStatus
}

export function Badge({
  children,
  className,
  dot = false,
  icon,
  tone = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide whitespace-nowrap',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className={cn('size-1.5 rounded-full', dots[tone])} />}
      {icon}
      {children}
    </span>
  )
}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  const meta = assetStatusMeta[status]
  return (
    <Badge className={className} dot tone={meta.tone} {...props}>
      {meta.label}
    </Badge>
  )
}
