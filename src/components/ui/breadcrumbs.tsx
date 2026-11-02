import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Icon } from './icon'

export interface Crumb {
  href?: string
  label: string
}

export function Breadcrumbs({ className, items }: { className?: string; items: Crumb[] }) {
  return (
    <nav
      aria-label="Trilha de navegação"
      className={cn('flex items-center gap-2 text-[12px]', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {index > 0 && <Icon className="text-lilac-200/35" name="chevronRight" size={13} />}
            {item.href && !isLast ? (
              <Link
                className="text-lilac-200/65 hover:text-arcane-200 transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                className={isLast ? 'text-lilac-100 font-medium' : 'text-lilac-200/65'}
              >
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
