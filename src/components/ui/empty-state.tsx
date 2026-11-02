import { cn } from '@/lib/utils'

import type { IconName } from './icon'

import { Icon } from './icon'

interface EmptyStateProps {
  action?: React.ReactNode
  className?: string
  description?: string
  icon?: IconName
  title: string
}

export function EmptyState({
  action,
  className,
  description,
  icon = 'layers',
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-lilac-300/20 bg-ink-900/30 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <span className="border-arcane-400/30 bg-arcane-500/12 text-arcane-200 relative flex size-14 items-center justify-center rounded-2xl border">
        <span
          aria-hidden="true"
          className="animate-pulse-ring border-arcane-400/30 absolute inset-0 rounded-2xl border"
        />
        <Icon name={icon} size={24} />
      </span>
      <div>
        <p className="font-display text-lilac-50 text-sm font-semibold tracking-wide">{title}</p>
        {description && (
          <p className="text-lilac-200/65 mx-auto mt-1 max-w-sm text-[13px]">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
