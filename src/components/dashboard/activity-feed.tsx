import Link from 'next/link'

import type { ActivityEntry } from '@/types'

import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { relativeTime } from '@/lib/utils'

const toneStyles: Record<ActivityEntry['tone'], { dot: string; icon: string; ring: string }> = {
  neutral: {
    dot: 'bg-mystic-300',
    icon: 'text-mystic-300',
    ring: 'border-mystic-400/30 bg-mystic-400/10',
  },
  positive: {
    dot: 'bg-emerald-300',
    icon: 'text-emerald-200',
    ring: 'border-emerald-400/30 bg-emerald-400/10',
  },
  warning: {
    dot: 'bg-amber-300',
    icon: 'text-amber-200',
    ring: 'border-amber-400/30 bg-amber-400/10',
  },
}

const icons: Record<ActivityEntry['tone'], React.ComponentProps<typeof Icon>['name']> = {
  neutral: 'transfer',
  positive: 'sparkle',
  warning: 'gear',
}

export function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  return (
    <ol className="relative px-5 pb-5">
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-6 left-[30px] w-px bg-[linear-gradient(180deg,rgba(196,181,253,0.35),transparent)]"
      />
      {entries.map((entry) => {
        const style = toneStyles[entry.tone]
        return (
          <li className="relative flex gap-3 py-3" key={entry.id}>
            <span
              className={cn(
                'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border',
                style.ring,
              )}
            >
              <Icon className={style.icon} name={icons[entry.tone]} size={12} />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-lilac-100 text-[13px] leading-relaxed">{entry.message}</p>
              <div className="text-lilac-200/45 mt-1 flex items-center gap-2 text-[11px]">
                <span>{relativeTime(entry.timestamp)}</span>
                <span className="bg-lilac-200/25 size-1 rounded-full" />
                <Link
                  className="text-arcane-200/80 hover:text-arcane-200 inline-flex items-center gap-1 transition-colors"
                  href={`/assets`}
                >
                  ver acervo
                  <Icon name="chevronRight" size={11} />
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
