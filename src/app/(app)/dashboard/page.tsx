import type { Metadata } from 'next'

import Link from 'next/link'

import { NewAssetButton } from '@/components/assets/new-asset-button'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { CategoryBreakdown } from '@/components/dashboard/category-breakdown'
import { QrCta } from '@/components/dashboard/qr-cta'
import { RecentAssets } from '@/components/dashboard/recent-assets'
import { StatCard } from '@/components/dashboard/stat-card'
import { PageHeader } from '@/components/layout/page-header'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { activity, assets, getTotalValue } from '@/data/mock'
import { formatCompactCurrency } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  const active = assets.filter((asset) => asset.status === 'active').length
  const maintenance = assets.filter((asset) => asset.status === 'maintenance').length
  const transferred = assets.filter((asset) => asset.status === 'transferred').length

  const recent = [...assets]
    .sort((a, b) => b.acquisitionDate.localeCompare(a.acquisitionDate))
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        actions={
          <>
            <ButtonLink href="/movements" icon="history" variant="secondary">
              Movimentações
            </ButtonLink>
            <NewAssetButton />
          </>
        }
        description="Acompanhe o inventário de patrimônios, as movimentações recentes e o estado geral dos bens sob sua guarda."
        eyebrow="Visão geral do acervo"
        title="Dashboard"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="no acervo"
          icon="assets"
          label="Total de patrimônios"
          tone="accent"
          trend={{ direction: 'up', label: '+2 este mês' }}
          value={String(assets.length)}
        />
        <StatCard
          hint="em operação"
          icon="shield"
          label="Patrimônios ativos"
          tone="success"
          trend={{ direction: 'up', label: '+1 esta semana' }}
          value={String(active)}
        />
        <StatCard
          hint="fora de operação"
          icon="gear"
          label="Em manutenção"
          tone="warning"
          trend={{ direction: 'flat', label: 'estável' }}
          value={String(maintenance)}
        />
        <StatCard
          hint="em movimentação"
          icon="transfer"
          label="Transferidos"
          tone="info"
          trend={{ direction: 'down', label: '−1 esta semana' }}
          value={String(transferred)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2" edge>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon className="text-gilt-400" name="sparkle" size={16} />
                Patrimônios recentes
              </CardTitle>
              <CardDescription>Últimos bens incorporados ou atualizados no acervo.</CardDescription>
            </div>
            <ButtonLink href="/assets" iconRight="chevronRight" size="sm" variant="ghost">
              Ver todos
            </ButtonLink>
          </CardHeader>
          <div className="pb-2">
            <RecentAssets assets={recent} />
          </div>
          <div className="border-lilac-300/10 text-lilac-200/55 flex items-center justify-between border-t px-5 py-3 text-[11.5px]">
            <span>
              Valor total do acervo:{' '}
              <span className="text-gilt-300 font-mono">
                {formatCompactCurrency(getTotalValue())}
              </span>
            </span>
            <Link
              className="text-arcane-200/80 hover:text-arcane-200 transition-colors"
              href="/assets"
            >
              Gerenciar inventário
            </Link>
          </div>
        </Card>

        <Card edge>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon className="text-mystic-300" name="history" size={16} />
                Atividade recente
              </CardTitle>
              <CardDescription>Registro dos últimos eventos do sistema.</CardDescription>
            </div>
          </CardHeader>
          <ActivityFeed entries={activity} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <QrCta />
        </div>
        <Card edge>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon className="text-arcane-300" name="layers" size={16} />
                Distribuição por categoria
              </CardTitle>
              <CardDescription>Como o acervo está dividido hoje.</CardDescription>
            </div>
          </CardHeader>
          <CategoryBreakdown assets={assets} />
        </Card>
      </div>
    </div>
  )
}
