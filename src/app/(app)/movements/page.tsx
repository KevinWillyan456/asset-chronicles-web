import type { Metadata } from 'next'

import { StatCard } from '@/components/dashboard/stat-card'
import { PageHeader } from '@/components/layout/page-header'
import { MovementsView } from '@/components/movements/movements-view'
import { NewMovementButton } from '@/components/movements/new-movement-button'
import { movements } from '@/data/mock'

export const metadata: Metadata = { title: 'Movimentações' }

export default function MovementsPage() {
  const transfers = movements.filter((movement) => movement.type === 'transfer').length
  const maintenance = movements.filter((movement) => movement.type === 'maintenance').length
  const assignments = movements.filter((movement) => movement.type === 'assignment').length

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        actions={<NewMovementButton />}
        crumbs={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Movimentações' }]}
        description="Acompanhe transferências, atribuições, manutenções e devoluções em uma linha do tempo contínua do patrimônio."
        eyebrow="Fluxo do acervo"
        icon="movements"
        title="Movimentações"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          hint="no histórico"
          icon="movements"
          label="Movimentações"
          tone="accent"
          value={String(movements.length)}
        />
        <StatCard
          hint="entre locais"
          icon="transfer"
          label="Transferências"
          tone="info"
          value={String(transfers)}
        />
        <StatCard
          hint="a responsáveis"
          icon="user"
          label="Atribuições"
          tone="success"
          value={String(assignments)}
        />
        <StatCard
          hint="em equipamentos"
          icon="gear"
          label="Manutenções"
          tone="warning"
          value={String(maintenance)}
        />
      </div>

      <MovementsView />
    </div>
  )
}
