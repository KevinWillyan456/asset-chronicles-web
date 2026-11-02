import Link from 'next/link'

import type { Movement } from '@/types'

import { ResponsibleChip } from '@/components/assets/asset-meta'
import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { getAssetById, getLocation, getResponsible } from '@/data/mock'
import { movementTypeMeta, type Tone } from '@/lib/domain'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

const toneRing: Record<Tone, string> = {
  accent: 'border-arcane-400/35 bg-arcane-500/14 text-arcane-200',
  info: 'border-mystic-400/35 bg-mystic-400/12 text-mystic-300',
  neutral: 'border-lilac-300/25 bg-lilac-300/10 text-lilac-200',
  success: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-200',
  warning: 'border-amber-400/35 bg-amber-400/12 text-amber-200',
}

interface MovementTimelineProps {
  movements: Movement[]
  showAsset?: boolean
}

export function MovementTimeline({ movements, showAsset = false }: MovementTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-3">
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[19px] w-px bg-[linear-gradient(180deg,rgba(196,181,253,0.3),transparent)]"
      />
      {movements.map((movement) => {
        const meta = movementTypeMeta[movement.type]
        const from = getLocation(movement.fromLocationId)
        const to = getLocation(movement.toLocationId)
        const responsible = getResponsible(movement.responsibleId)
        const asset = getAssetById(movement.assetId)

        return (
          <li className="relative flex gap-3.5" key={movement.id}>
            <span
              className={cn(
                'relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border',
                toneRing[meta.tone],
              )}
            >
              <Icon name={meta.icon} size={17} />
            </span>

            <div className="glass flex-1 rounded-xl p-3.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  {showAsset && asset && (
                    <Link
                      className="text-lilac-50 hover:text-arcane-200 block truncate text-[13.5px] font-medium transition-colors"
                      href={`/assets/${asset.code}`}
                    >
                      {asset.name}
                    </Link>
                  )}
                  <div className="text-lilac-200/80 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon className="text-lilac-200/45" name="pin" size={12} />
                      {from?.name ?? '—'}
                    </span>
                    <Icon className="text-gilt-400/80" name="chevronRight" size={12} />
                    <span className="text-lilac-100 inline-flex items-center gap-1.5 font-medium">
                      <Icon className="text-arcane-300/70" name="pin" size={12} />
                      {to?.name ?? '—'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                  <span className="text-lilac-200/50 text-[11px]">{formatDate(movement.date)}</span>
                </div>
              </div>

              {movement.note && (
                <p className="text-lilac-200/65 mt-2.5 text-[12.5px] leading-relaxed">
                  {movement.note}
                </p>
              )}

              <div className="border-lilac-300/8 mt-3 flex items-center gap-2 border-t pt-2.5">
                <ResponsibleChip responsible={responsible} />
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
