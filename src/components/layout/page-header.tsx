import type { IconName } from '@/components/ui/icon'

import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  actions?: React.ReactNode
  className?: string
  crumbs?: Crumb[]
  description?: string
  eyebrow?: string
  icon?: IconName
  title: string
}

export function PageHeader({
  actions,
  className,
  crumbs,
  description,
  eyebrow,
  icon,
  title,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {icon && (
            <span className="border-arcane-400/35 text-arcane-100 mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border bg-[linear-gradient(150deg,rgba(124,58,237,0.32),rgba(15,11,32,0.5))] shadow-[0_0_28px_-10px_rgba(139,92,246,0.9)]">
              <Icon name={icon} size={22} />
            </span>
          )}
          <div>
            {eyebrow && (
              <p className="text-gilt-300 mb-1 flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.18em] uppercase">
                <span className="bg-gilt-400/60 h-px w-4" />
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-lilac-50 text-xl font-semibold tracking-wide sm:text-[26px]">
              {title}
            </h1>
            {description && (
              <p className="text-lilac-200/70 mt-1.5 max-w-2xl text-[13.5px] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  )
}
