'use client'

import { useMemo, useState } from 'react'

import type { Asset, AssetStatus } from '@/types'

import { MovementModal } from '@/components/movements/movement-modal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Field, NativeSelect, TextInput } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { TableSkeleton } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { assets, categories, locations, responsibles } from '@/data/mock'
import { assetStatusMeta, assetStatusOrder } from '@/lib/domain'
import { formatCompactCurrency } from '@/lib/utils'

import { AssetFormModal } from './asset-form-modal'
import { AssetMobileList } from './asset-mobile-list'
import { AssetQrModal } from './asset-qr-modal'
import { AssetTable, type SortKey } from './asset-table'

interface AssetsExplorerProps {
  initialQuery?: string
  initialStatus?: 'all' | AssetStatus
}

export function AssetsExplorer({ initialQuery = '', initialStatus = 'all' }: AssetsExplorerProps) {
  const toast = useToast()

  const [query, setQuery] = useState(initialQuery)
  const [categoryId, setCategoryId] = useState('all')
  const [status, setStatus] = useState<'all' | AssetStatus>(initialStatus)
  const [responsibleId, setResponsibleId] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [editing, setEditing] = useState<Asset | null>(null)
  const [transferring, setTransferring] = useState<Asset | null>(null)
  const [qrAsset, setQrAsset] = useState<Asset | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const result = assets.filter((asset) => {
      if (status !== 'all' && asset.status !== status) return false
      if (categoryId !== 'all' && asset.categoryId !== categoryId) return false
      if (responsibleId !== 'all' && asset.responsibleId !== responsibleId) return false
      if (!normalized) return true
      const location = locations.find((item) => item.id === asset.locationId)?.name ?? ''
      const responsible = responsibles.find((item) => item.id === asset.responsibleId)?.name ?? ''
      return [asset.name, asset.code, asset.description, location, responsible]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })

    return result.sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1
      if (sortKey === 'value') return (a.value - b.value) * direction
      return String(a[sortKey]).localeCompare(String(b[sortKey]), 'pt-BR') * direction
    })
  }, [query, categoryId, status, responsibleId, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const refresh = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    toast.info('Acervo atualizado', 'Os dados continuam sendo mocks locais.')
  }

  const clearFilters = () => {
    setQuery('')
    setCategoryId('all')
    setStatus('all')
    setResponsibleId('all')
  }

  const hasFilters =
    query !== '' || categoryId !== 'all' || status !== 'all' || responsibleId !== 'all'
  const totalValue = filtered.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="flex flex-col gap-5">
      <Card className="overflow-visible">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <TextInput
                aria-label="Buscar patrimônios"
                icon="search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, código, responsável ou local..."
                value={query}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                aria-expanded={showFilters}
                className="sm:hidden"
                icon="filter"
                onClick={() => setShowFilters((value) => !value)}
                variant="secondary"
              >
                Filtros
              </Button>
              <Button
                aria-label="Atualizar lista"
                icon="refresh"
                loading={loading}
                onClick={refresh}
                variant="ghost"
              >
                <span className="hidden sm:inline">Atualizar</span>
              </Button>
            </div>
          </div>

          <div
            className={`${showFilters ? 'flex' : 'hidden'} flex-col gap-3 lg:flex lg:flex-row lg:items-end`}
          >
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
              <Field htmlFor="filter-category" label="Categoria">
                <NativeSelect
                  id="filter-category"
                  onChange={(event) => setCategoryId(event.target.value)}
                  value={categoryId}
                >
                  <option value="all">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field htmlFor="filter-status" label="Status">
                <NativeSelect
                  id="filter-status"
                  onChange={(event) => setStatus(event.target.value as 'all' | AssetStatus)}
                  value={status}
                >
                  <option value="all">Todos os status</option>
                  {assetStatusOrder.map((item) => (
                    <option key={item} value={item}>
                      {assetStatusMeta[item].label}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field htmlFor="filter-responsible" label="Responsável">
                <NativeSelect
                  id="filter-responsible"
                  onChange={(event) => setResponsibleId(event.target.value)}
                  value={responsibleId}
                >
                  <option value="all">Todos os responsáveis</option>
                  {responsibles.map((responsible) => (
                    <option key={responsible.id} value={responsible.id}>
                      {responsible.name}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>
            <Field className="sm:max-w-[200px]" htmlFor="filter-sort" label="Ordenar por">
              <NativeSelect
                id="filter-sort"
                onChange={(event) => setSortKey(event.target.value as SortKey)}
                value={sortKey}
              >
                <option value="name">Nome</option>
                <option value="code">Código</option>
                <option value="value">Valor</option>
                <option value="acquisitionDate">Data de aquisição</option>
              </NativeSelect>
            </Field>
            {hasFilters && (
              <Button
                className="sm:mb-0 lg:mb-0"
                icon="close"
                onClick={clearFilters}
                variant="ghost"
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        <div className="border-lilac-300/10 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-[12px]">
          <span className="text-lilac-200/60">
            {loading
              ? 'Consultando acervo...'
              : `${filtered.length} de ${assets.length} patrimônios`}
            {hasFilters && !loading && <span className="text-arcane-200/80 ml-2">filtrando</span>}
          </span>
          <span className="flex items-center gap-4">
            <span className="text-lilac-200/60">
              Valor filtrado:{' '}
              <span className="text-gilt-300 font-mono">{formatCompactCurrency(totalValue)}</span>
            </span>
          </span>
        </div>
      </Card>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          action={
            <Button icon="refresh" onClick={clearFilters} variant="secondary">
              Limpar filtros
            </Button>
          }
          description="Ajuste os termos da busca ou limpe os filtros para ver o acervo completo."
          icon="search"
          title="Nenhum patrimônio encontrado"
        />
      ) : (
        <>
          <AssetTable
            assets={filtered}
            onEdit={setEditing}
            onQr={setQrAsset}
            onSort={handleSort}
            onTransfer={setTransferring}
            sortDirection={sortDirection}
            sortKey={sortKey}
          />
          <AssetMobileList
            assets={filtered}
            onEdit={setEditing}
            onQr={setQrAsset}
            onTransfer={setTransferring}
          />
        </>
      )}

      {/* Feedback visual de filtros ativos, útil no mobile. */}
      {hasFilters && filtered.length > 0 && (
        <p className="text-lilac-200/45 flex items-center gap-2 text-[11.5px]">
          <Icon name="filter" size={13} />
          Resultados filtrados por busca e atributos selecionados.
        </p>
      )}

      <AssetFormModal
        asset={editing ?? undefined}
        mode="edit"
        onClose={() => setEditing(null)}
        open={Boolean(editing)}
      />

      {transferring && (
        <MovementModal asset={transferring} lockAsset onClose={() => setTransferring(null)} open />
      )}

      {qrAsset && <AssetQrModal asset={qrAsset} onClose={() => setQrAsset(null)} open />}
    </div>
  )
}
