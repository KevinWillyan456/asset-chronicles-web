'use client'

import { useRouter } from 'next/navigation'

import type { Asset } from '@/types'

import { StatusBadge } from '@/components/ui/badge'
import { Dropdown } from '@/components/ui/dropdown'
import { Icon } from '@/components/ui/icon'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { getCategory, getLocation, getResponsible } from '@/data/mock'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

import { ResponsibleChip } from './asset-meta'
import { AssetVisual } from './asset-visual'

export type SortKey = 'acquisitionDate' | 'code' | 'name' | 'value'

interface AssetTableProps {
  assets: Asset[]
  onEdit: (asset: Asset) => void
  onQr: (asset: Asset) => void
  onSort: (key: SortKey) => void
  onTransfer: (asset: Asset) => void
  sortDirection: 'asc' | 'desc'
  sortKey: SortKey
}

export function AssetTable({
  assets,
  onEdit,
  onQr,
  onSort,
  onTransfer,
  sortDirection,
  sortKey,
}: AssetTableProps) {
  const router = useRouter()

  const columns: Array<{ className?: string; key: SortKey; label: string }> = [
    { key: 'name', label: 'Patrimônio' },
    { key: 'code', label: 'Código' },
  ]

  return (
    <TableWrap className="hidden lg:block">
      <Table>
        <THead>
          <TR className="hover:bg-transparent">
            {columns.map((column) => (
              <TH key={column.key}>
                <button
                  className="hover:text-lilac-100 inline-flex items-center gap-1.5 transition-colors"
                  onClick={() => onSort(column.key)}
                  type="button"
                >
                  {column.label}
                  <Icon
                    className={cn(
                      'transition-transform',
                      sortKey === column.key
                        ? sortDirection === 'asc'
                          ? 'text-arcane-300 -rotate-90'
                          : 'text-arcane-300 rotate-90'
                        : 'opacity-30',
                    )}
                    name={sortKey === column.key ? 'chevronRight' : 'chevronDown'}
                    size={11}
                  />
                </button>
              </TH>
            ))}
            <TH>Categoria</TH>
            <TH>Responsável</TH>
            <TH>Localização</TH>
            <TH className="text-right">Valor</TH>
            <TH>Status</TH>
            <TH className="text-right">Ações</TH>
          </TR>
        </THead>
        <TBody>
          {assets.map((asset) => {
            const category = getCategory(asset.categoryId)
            const responsible = getResponsible(asset.responsibleId)
            const location = getLocation(asset.locationId)
            return (
              <TR interactive key={asset.id} onClick={() => router.push(`/assets/${asset.code}`)}>
                <TD>
                  <div className="flex items-center gap-3">
                    <AssetVisual category={category} />
                    <div className="min-w-0">
                      <p className="text-lilac-50 truncate text-[13.5px] font-medium">
                        {asset.name}
                      </p>
                      <p className="text-lilac-200/50 mt-0.5 text-[11.5px]">
                        Adquirido em {formatDate(asset.acquisitionDate)}
                      </p>
                    </div>
                  </div>
                </TD>
                <TD>
                  <span className="text-arcane-200 font-mono text-[12.5px] tracking-tight">
                    {asset.code}
                  </span>
                </TD>
                <TD className="text-lilac-100/85 text-[12.5px]">{category?.name}</TD>
                <TD>
                  <ResponsibleChip responsible={responsible} />
                </TD>
                <TD>
                  <span className="text-lilac-100/85 inline-flex items-center gap-1.5 text-[12.5px]">
                    <Icon className="text-lilac-200/45" name="pin" size={13} />
                    {location?.name ?? '—'}
                  </span>
                </TD>
                <TD className="text-gilt-200 text-right font-mono text-[12.5px]">
                  {formatCurrency(asset.value)}
                </TD>
                <TD>
                  <StatusBadge status={asset.status} />
                </TD>
                <TD>
                  <div className="flex justify-end" onClick={(event) => event.stopPropagation()}>
                    <Dropdown
                      items={[
                        {
                          icon: 'eye',
                          id: 'view',
                          label: 'Ver detalhes',
                          onSelect: () => router.push(`/assets/${asset.code}`),
                        },
                        {
                          icon: 'edit',
                          id: 'edit',
                          label: 'Editar',
                          onSelect: () => onEdit(asset),
                        },
                        {
                          icon: 'transfer',
                          id: 'transfer',
                          label: 'Transferir',
                          onSelect: () => onTransfer(asset),
                        },
                        {
                          icon: 'qr',
                          id: 'qr',
                          label: 'Gerar QR Code',
                          onSelect: () => onQr(asset),
                        },
                      ]}
                      label={`Ações de ${asset.name}`}
                      trigger={
                        <span className="text-lilac-200/60 hover:border-lilac-300/20 hover:bg-lilac-300/8 rounded-lg border border-transparent p-2 transition-colors hover:text-white">
                          <Icon name="more" size={16} />
                        </span>
                      }
                    />
                  </div>
                </TD>
              </TR>
            )
          })}
        </TBody>
      </Table>
    </TableWrap>
  )
}
