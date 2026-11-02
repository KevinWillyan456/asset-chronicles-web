import type { Metadata } from 'next'

import { PageHeader } from '@/components/layout/page-header'
import { SettingsView } from '@/components/settings/settings-view'

export const metadata: Metadata = { title: 'Configurações' }

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        crumbs={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Configurações' }]}
        description="Ajustes de perfil, aparência e alertas. Esta seção é parcialmente funcional no protótipo e serve para demonstrar os estados dos componentes."
        eyebrow="Sistema"
        icon="settings"
        title="Configurações"
      />
      <SettingsView />
    </div>
  )
}
