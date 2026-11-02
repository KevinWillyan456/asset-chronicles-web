'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { MovementType } from '@/types'

import { ResponsibleChip } from '@/components/assets/asset-meta'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Field, NativeSelect } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { getAssetById, getLocation, getResponsible, movements } from '@/data/mock'
import { movementTypeMeta, movementTypeOrder } from '@/lib/domain'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

import { MovementTimeline } from './movement-timeline'

type ViewMode = 'table' | 'timeline'

export function MovementsView() {
  const [type, setType] = useState<'all' | MovementType>('all')
  const [view, setView] = useState<ViewMode>('timeline')

  const filtered = useMemo(() => {
    const list = type === 'all' ? movements : movements.filter((movement) => movement.type === type)
    return [...list].sort((a, b) => b.date.localeCompare(a.date))
  }, [type])

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
          <Field
            className="sm:max-w-xs sm:flex-1"
            htmlFor="movement-filter"
            label="Tipo de movimentação"
          >
            <NativeSelect
              id="movement-filter"
              onChange={(event) => setType(event.target.value as 'all' | MovementType)}
              value={type}
            >
              <option value="all">Todos os tipos</option>
              {movementTypeOrder.map((item) => (
                <option key={item} value={item}>
                  {movementTypeMeta[item].label}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <div className="flex items-center gap-2">
            <span className="text-lilac-200/50 text-[11.5px]">{filtered.length} registros</span>
            <div className="border-lilac-300/12 bg-ink-900/50 flex gap-1 rounded-xl border p-1">
              {(
                [
                  { icon: 'history', id: 'timeline', label: 'Linha do tempo' },
                  { icon: 'layers', id: 'table', label: 'Tabela' },
                ] as const
              ).map((option) => (
                <button
                  aria-pressed={view === option.id}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors',
                    view === option.id
                      ? 'bg-arcane-500/25 text-lilac-50 shadow-[inset_0_0_0_1px_rgba(196,181,253,0.25)]'
                      : 'text-lilac-200/65 hover:bg-lilac-300/8 hover:text-lilac-100',
                  )}
                  key={option.id}
                  onClick={() => setView(option.id)}
                  type="button"
                >
                  <Icon name={option.icon} size={14} />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          action={
            <Button icon="refresh" onClick={() => setType('all')} variant="secondary">
              Ver todas
            </Button>
          }
          description="Selecione outro tipo de movimentação ou registre uma nova transferência."
          icon="movements"
          title="Nenhuma movimentação neste filtro"
        />
      ) : view === 'timeline' ? (
        <MovementTimeline movements={filtered} showAsset />
      ) : (
        <TableWrap>
          <Table>
            <THead>
              <TR className="hover:bg-transparent">
                <TH>Patrimônio</TH>
                <TH>Tipo</TH>
                <TH>Origem</TH>
                <TH>Destino</TH>
                <TH>Responsável</TH>
                <TH className="text-right">Data</TH>
              </TR>
            </THead>
            <TBody>
              {filtered.map((movement) => {
                const meta = movementTypeMeta[movement.type]
                const asset = getAssetById(movement.assetId)
                const from = getLocation(movement.fromLocationId)
                const to = getLocation(movement.toLocationId)
                const responsible = getResponsible(movement.responsibleId)
                return (
                  <TR key={movement.id}>
                    <TD>
                      {asset ? (
                        <Link
                          className="hover:text-arcane-200 transition-colors"
                          href={`/assets/${asset.code}`}
                        >
                          <span className="text-lilac-50 block text-[13px] font-medium">
                            {asset.name}
                          </span>
                          <span className="text-lilac-200/50 font-mono text-[11px]">
                            {asset.code}
                          </span>
                        </Link>
                      ) : (
                        '—'
                      )}
                    </TD>
                    <TD>
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </TD>
                    <TD className="text-lilac-100/85 text-[12.5px]">{from?.name ?? '—'}</TD>
                    <TD className="text-lilac-50 text-[12.5px] font-medium">{to?.name ?? '—'}</TD>
                    <TD>
                      <ResponsibleChip responsible={responsible} />
                    </TD>
                    <TD className="text-lilac-200/70 text-right text-[12.5px] whitespace-nowrap">
                      {formatDate(movement.date)}
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </Table>
        </TableWrap>
      )}
    </div>
  )
}
