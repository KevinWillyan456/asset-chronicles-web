import type { Location, Responsible } from '@/types'

import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

export function LocationChip({ className, location }: { className?: string; location?: Location }) {
  if (!location) return <span className="text-lilac-200/45 text-[12.5px]">—</span>
  return (
    <span
      className={cn('text-lilac-100/90 inline-flex items-center gap-1.5 text-[12.5px]', className)}
    >
      <Icon className="text-lilac-200/50" name="pin" size={13} />
      {location.name}
    </span>
  )
}

export function ResponsibleChip({
  className,
  responsible,
}: {
  className?: string
  responsible?: Responsible
}) {
  if (!responsible) {
    return (
      <span
        className={cn('text-lilac-200/45 inline-flex items-center gap-2 text-[12.5px]', className)}
      >
        <span className="border-lilac-300/25 flex size-6 items-center justify-center rounded-full border border-dashed">
          <Icon name="user" size={12} />
        </span>
        Sem responsável
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#4f46e5)] text-[10px] font-semibold text-white">
        {responsible.initials}
      </span>
      <span className="text-lilac-100 text-[12.5px]">{responsible.name}</span>
    </span>
  )
}
