import type { Metadata } from 'next'

import { PageHeader } from '@/components/layout/page-header'
import { QrScanner } from '@/components/qr/qr-scanner'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = { title: 'Leitor QR' }

export default function QrReaderPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        actions={
          <Badge className="hidden sm:inline-flex" dot tone="accent">
            Câmera simulada
          </Badge>
        }
        crumbs={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Leitor QR' }]}
        description="Simule a leitura das etiquetas de patrimônio para localizar um bem e abrir sua ficha completa em segundos."
        eyebrow="Identificação"
        icon="qr"
        title="Leitor QR"
      />
      <QrScanner />
    </div>
  )
}
