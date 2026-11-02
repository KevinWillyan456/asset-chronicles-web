import type { Metadata } from 'next'

import type { AssetStatus } from '@/types'

import { AssetsExplorer } from '@/components/assets/assets-explorer'
import { NewAssetButton } from '@/components/assets/new-asset-button'
import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { assets } from '@/data/mock'

export const metadata: Metadata = { title: 'Patrimônios' }

const validStatuses: AssetStatus[] = ['active', 'maintenance', 'transferred', 'retired']

interface PageProps {
  searchParams: Promise<{ q?: string | string[]; status?: string | string[] }>
}

export default async function AssetsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status
  const initialQuery = rawQuery ?? ''
  const initialStatus = validStatuses.includes(rawStatus as AssetStatus)
    ? (rawStatus as AssetStatus)
    : 'all'

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        actions={
          <>
            <Badge className="hidden sm:inline-flex" tone="accent">
              {assets.length} registros
            </Badge>
            <NewAssetButton />
          </>
        }
        crumbs={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Patrimônios' }]}
        description="Consulte, filtre e mantenha o registro de todos os bens do acervo, com responsável, localização e status atualizados."
        eyebrow="Inventário"
        icon="assets"
        title="Patrimônios"
      />

      <AssetsExplorer
        initialQuery={initialQuery}
        initialStatus={initialStatus}
        key={`${initialQuery}-${initialStatus}`}
      />
    </div>
  )
}
