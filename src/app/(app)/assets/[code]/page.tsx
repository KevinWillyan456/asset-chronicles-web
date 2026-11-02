import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { AssetDetailActions } from '@/components/assets/asset-detail-actions'
import { AssetVisual } from '@/components/assets/asset-visual'
import { MockQr } from '@/components/assets/mock-qr'
import { MovementTimeline } from '@/components/movements/movement-timeline'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Icon } from '@/components/ui/icon'
import {
  getAssetByCode,
  getCategory,
  getLocation,
  getMovementsForAsset,
  getResponsible,
} from '@/data/mock'
import { assetStatusMeta } from '@/lib/domain'
import { formatCurrency, formatLongDate, parseIsoDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function AssetDetailPage({ params }: PageProps) {
  const { code } = await params
  const asset = getAssetByCode(decodeURIComponent(code))
  if (!asset) notFound()

  const category = getCategory(asset.categoryId)
  const responsible = getResponsible(asset.responsibleId)
  const location = getLocation(asset.locationId)
  const movements = getMovementsForAsset(asset.id)
  const statusMeta = assetStatusMeta[asset.status]

  const infoItems = [
    { icon: 'layers' as const, label: 'Categoria', value: category?.name ?? '—' },
    {
      icon: 'chip' as const,
      label: 'Número de série',
      mono: true,
      value: asset.serial ?? 'Não informado',
    },
    {
      icon: 'calendar' as const,
      label: 'Data de aquisição',
      value: formatLongDate(asset.acquisitionDate),
    },
    {
      gold: true,
      icon: 'wallet' as const,
      label: 'Valor de aquisição',
      value: formatCurrency(asset.value),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/assets', label: 'Patrimônios' },
          { label: asset.code },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Card className="overflow-hidden" edge variant="strong">
          <div className="relative p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -left-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),transparent_65%)] blur-2xl"
            />
            <div className="relative flex flex-col gap-5">
              <div className="flex flex-wrap items-start gap-4">
                <AssetVisual category={category} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={asset.status} />
                    <Badge tone="neutral">{category?.name}</Badge>
                    <span className="text-lilac-200/55 font-mono text-[11.5px]">{asset.code}</span>
                  </div>
                  <h1 className="font-display text-lilac-50 mt-2 text-xl font-semibold tracking-wide sm:text-2xl">
                    {asset.name}
                  </h1>
                  <p className="text-lilac-200/60 mt-1 text-[12.5px]">{statusMeta.description}</p>
                </div>
              </div>

              <div className="border-lilac-300/12 bg-ink-900/40 rounded-xl border p-4">
                <p className="text-lilac-200/45 text-[10.5px] font-medium tracking-[0.16em] uppercase">
                  Descrição
                </p>
                <p className="text-lilac-100/90 mt-1.5 text-[13.5px] leading-relaxed">
                  {asset.description}
                </p>
              </div>

              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {infoItems.map((item) => (
                  <div
                    className="border-lilac-300/10 bg-ink-900/30 flex items-center gap-3 rounded-xl border px-3.5 py-3"
                    key={item.label}
                  >
                    <span className="border-arcane-400/25 bg-arcane-500/10 text-arcane-200 flex size-8 shrink-0 items-center justify-center rounded-lg border">
                      <Icon name={item.icon} size={15} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-lilac-200/45 text-[10.5px] tracking-wide uppercase">
                        {item.label}
                      </dt>
                      <dd
                        className={
                          item.mono
                            ? 'text-lilac-100 truncate font-mono text-[12.5px]'
                            : item.gold
                              ? 'text-gilt-200 truncate font-mono text-[13px]'
                              : 'text-lilac-100 truncate text-[13px]'
                        }
                      >
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <AssetDetailActions asset={asset} />
            </div>
          </div>
        </Card>

        <Card className="flex flex-col" edge variant="strong">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon className="text-arcane-300" name="qr" size={16} />
                Etiqueta digital
              </CardTitle>
              <CardDescription>Placeholder visual do QR Code do patrimônio.</CardDescription>
            </div>
          </CardHeader>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 pb-6">
            <div className="border-arcane-400/30 relative rounded-2xl border bg-[linear-gradient(160deg,rgba(124,58,237,0.22),rgba(15,11,32,0.6))] p-4">
              <span
                aria-hidden="true"
                className="border-gilt-300/25 absolute inset-2.5 rounded-xl border"
              />
              <MockQr className="relative" seed={asset.code} size={168} />
            </div>
            <div className="text-center">
              <p className="text-arcane-200 font-mono text-[13px] tracking-wide">{asset.code}</p>
              <p className="text-lilac-200/50 mt-1 text-[11.5px]">
                Leitura simulada — nenhuma câmera é utilizada.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card edge>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="text-emerald-300" name="user" size={16} />
              Responsável atual
            </CardTitle>
          </CardHeader>
          <div className="px-5 pb-5">
            {responsible ? (
              <div className="flex items-center gap-3.5">
                <span className="flex size-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#4f46e5)] text-[15px] font-semibold text-white">
                  {responsible.initials}
                </span>
                <div>
                  <p className="text-lilac-50 text-[14px] font-medium">{responsible.name}</p>
                  <p className="text-lilac-200/60 text-[12px]">{responsible.role}</p>
                  <p className="text-arcane-200/80 mt-0.5 text-[11.5px]">{responsible.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-lilac-200/60 text-[13px]">
                Este patrimônio está em estoque técnico, sem responsável atribuído.
              </p>
            )}
          </div>
        </Card>

        <Card edge>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="text-mystic-300" name="pin" size={16} />
              Localização
            </CardTitle>
          </CardHeader>
          <div className="px-5 pb-5">
            <p className="text-lilac-50 text-[14px] font-medium">{location?.name ?? '—'}</p>
            <p className="text-lilac-200/60 mt-0.5 text-[12.5px]">
              {location?.building} · {location?.floor}
            </p>
            <div className="border-lilac-300/10 bg-ink-900/40 text-lilac-200/60 mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[11.5px]">
              <Icon className="text-arcane-300" name="history" size={14} />
              Última movimentação em {movements[0] ? formatLongDate(movements[0].date) : '—'}
            </div>
          </div>
        </Card>

        <Card edge>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="text-gilt-400" name="sparkle" size={16} />
              Indicadores
            </CardTitle>
          </CardHeader>
          <ul className="flex flex-col gap-2.5 px-5 pb-5">
            <li className="flex items-center justify-between text-[12.5px]">
              <span className="text-lilac-200/60">Movimentações registradas</span>
              <span className="text-lilac-100 font-mono">{movements.length}</span>
            </li>
            <li className="flex items-center justify-between text-[12.5px]">
              <span className="text-lilac-200/60">Tempo no acervo</span>
              <span className="text-lilac-100">{monthsSince(asset.acquisitionDate)}</span>
            </li>
            <li className="flex items-center justify-between text-[12.5px]">
              <span className="text-lilac-200/60">Valor atual</span>
              <span className="text-gilt-200 font-mono">{formatCurrency(asset.value)}</span>
            </li>
            <li className="flex items-center justify-between text-[12.5px]">
              <span className="text-lilac-200/60">Estado</span>
              <StatusBadge status={asset.status} />
            </li>
          </ul>
        </Card>
      </div>

      <Card edge>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon className="text-mystic-300" name="history" size={16} />
              Histórico de movimentações
            </CardTitle>
            <CardDescription>
              Registro cronológico de transferências, atribuições e manutenções.
            </CardDescription>
          </div>
          <Badge tone="neutral">{movements.length} eventos</Badge>
        </CardHeader>
        <div className="px-5 pb-5">
          {movements.length > 0 ? (
            <MovementTimeline movements={movements} />
          ) : (
            <EmptyState
              description="Este patrimônio ainda não teve transferências ou atribuições registradas."
              icon="history"
              title="Nenhuma movimentação registrada"
            />
          )}
        </div>
      </Card>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const asset = getAssetByCode(decodeURIComponent(code))
  return { title: asset ? `${asset.name} · ${asset.code}` : 'Patrimônio' }
}

function monthsSince(iso: string): string {
  const start = parseIsoDate(iso)
  const now = new Date()
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  if (months < 1) return 'menos de 1 mês'
  if (months < 12) return `${months} ${months === 1 ? 'mês' : 'meses'}`
  const years = Math.floor(months / 12)
  const remaining = months % 12
  return remaining === 0 ? `${years} ${years === 1 ? 'ano' : 'anos'}` : `${years}a ${remaining}m`
}
