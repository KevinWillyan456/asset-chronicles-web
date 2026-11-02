import Link from 'next/link'

import type { Asset } from '@/types'

import { ResponsibleChip } from '@/components/assets/asset-meta'
import { AssetVisual } from '@/components/assets/asset-visual'
import { StatusBadge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { getCategory, getLocation, getResponsible } from '@/data/mock'

export function RecentAssets({ assets }: { assets: Asset[] }) {
  return (
    <ul className="divide-lilac-300/8 divide-y">
      {assets.map((asset) => {
        const category = getCategory(asset.categoryId)
        const responsible = getResponsible(asset.responsibleId)
        const location = getLocation(asset.locationId)
        return (
          <li key={asset.id}>
            <Link
              className="group hover:bg-arcane-500/8 flex items-center gap-3 px-4 py-3.5 transition-colors sm:px-5"
              href={`/assets/${asset.code}`}
            >
              <AssetVisual category={category} />
              <div className="min-w-0 flex-1">
                <p className="text-lilac-50 truncate text-[13.5px] font-medium group-hover:text-white">
                  {asset.name}
                </p>
                <div className="text-lilac-200/55 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px]">
                  <span className="text-arcane-200/80 font-mono tracking-tight">{asset.code}</span>
                  <span className="hidden sm:inline">{category?.name}</span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="pin" size={11} />
                    {location?.name}
                  </span>
                </div>
              </div>
              <div className="hidden w-40 shrink-0 md:block">
                <ResponsibleChip responsible={responsible} />
              </div>
              <StatusBadge status={asset.status} />
              <Icon
                className="text-lilac-200/30 group-hover:text-arcane-200 transition-transform group-hover:translate-x-0.5"
                name="chevronRight"
                size={16}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
