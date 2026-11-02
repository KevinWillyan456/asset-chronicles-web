'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { Asset } from '@/types'

import { StatusBadge } from '@/components/ui/badge'
import { Dropdown } from '@/components/ui/dropdown'
import { Icon } from '@/components/ui/icon'
import { getCategory, getLocation, getResponsible } from '@/data/mock'
import { formatCurrency, formatDate } from '@/lib/utils'

import { ResponsibleChip } from './asset-meta'
import { AssetVisual } from './asset-visual'

interface AssetMobileListProps {
  assets: Asset[]
  onEdit: (asset: Asset) => void
  onQr: (asset: Asset) => void
  onTransfer: (asset: Asset) => void
}

export function AssetMobileList({ assets, onEdit, onQr, onTransfer }: AssetMobileListProps) {
  const router = useRouter()

  return (
    <ul className="flex flex-col gap-3 lg:hidden">
      {assets.map((asset) => {
        const category = getCategory(asset.categoryId)
        const responsible = getResponsible(asset.responsibleId)
        const location = getLocation(asset.locationId)
        return (
          <li className="glass relative rounded-2xl p-4" key={asset.id}>
            <div className="flex items-start gap-3">
              <AssetVisual category={category} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link className="min-w-0" href={`/assets/${asset.code}`}>
                    <p className="text-lilac-50 truncate text-[14px] font-medium">{asset.name}</p>
                    <p className="text-arcane-200 mt-0.5 font-mono text-[11.5px]">{asset.code}</p>
                  </Link>
                  <Dropdown
                    items={[
                      {
                        icon: 'eye',
                        id: 'view',
                        label: 'Ver detalhes',
                        onSelect: () => router.push(`/assets/${asset.code}`),
                      },
                      { icon: 'edit', id: 'edit', label: 'Editar', onSelect: () => onEdit(asset) },
                      {
                        icon: 'transfer',
                        id: 'transfer',
                        label: 'Transferir',
                        onSelect: () => onTransfer(asset),
                      },
                      { icon: 'qr', id: 'qr', label: 'Gerar QR Code', onSelect: () => onQr(asset) },
                    ]}
                    label={`Ações de ${asset.name}`}
                    trigger={
                      <span className="border-lilac-300/15 text-lilac-200/70 rounded-lg border p-1.5">
                        <Icon name="more" size={16} />
                      </span>
                    }
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={asset.status} />
                  <span className="border-lilac-300/18 bg-ink-800/60 text-lilac-200/80 rounded-full border px-2.5 py-0.5 text-[11px]">
                    {category?.name}
                  </span>
                </div>
              </div>
            </div>

            <dl className="border-lilac-300/10 mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 border-t pt-3.5 text-[12px]">
              <div>
                <dt className="text-lilac-200/45 text-[10.5px] tracking-wide uppercase">
                  Responsável
                </dt>
                <dd className="mt-0.5">
                  <ResponsibleChip responsible={responsible} />
                </dd>
              </div>
              <div>
                <dt className="text-lilac-200/45 text-[10.5px] tracking-wide uppercase">
                  Localização
                </dt>
                <dd className="text-lilac-100/90 mt-1 inline-flex items-center gap-1.5">
                  <Icon className="text-lilac-200/45" name="pin" size={12} />
                  {location?.name ?? '—'}
                </dd>
              </div>
              <div>
                <dt className="text-lilac-200/45 text-[10.5px] tracking-wide uppercase">
                  Aquisição
                </dt>
                <dd className="text-lilac-100/85 mt-0.5">{formatDate(asset.acquisitionDate)}</dd>
              </div>
              <div>
                <dt className="text-lilac-200/45 text-[10.5px] tracking-wide uppercase">Valor</dt>
                <dd className="text-gilt-200 mt-0.5 font-mono">{formatCurrency(asset.value)}</dd>
              </div>
            </dl>

            <Link
              className="border-arcane-400/30 bg-arcane-500/10 text-arcane-100 hover:bg-arcane-500/18 mt-3.5 flex items-center justify-center gap-1.5 rounded-xl border py-2 text-[12.5px] font-medium transition-colors"
              href={`/assets/${asset.code}`}
            >
              Abrir ficha
              <Icon name="chevronRight" size={14} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
