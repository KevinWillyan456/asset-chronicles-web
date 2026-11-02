'use client'

import type { Asset } from '@/types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Modal } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toast'

import { MockQr } from './mock-qr'

interface AssetQrModalProps {
  asset: Asset
  onClose: () => void
  open: boolean
}

export function AssetQrModal({ asset, onClose, open }: AssetQrModalProps) {
  const toast = useToast()

  return (
    <Modal
      description="Código ilustrativo gerado para este patrimônio."
      footer={
        <>
          <Button onClick={onClose} variant="ghost">
            Fechar
          </Button>
          <Button
            icon="download"
            onClick={() =>
              toast.success(
                'Etiqueta simulada',
                'Em produção, o arquivo seria enviado para impressão.',
              )
            }
            variant="gold"
          >
            Baixar etiqueta
          </Button>
        </>
      }
      icon="qr"
      onClose={onClose}
      open={open}
      size="sm"
      title="Etiqueta de identificação"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="border-arcane-400/30 relative rounded-2xl border bg-[linear-gradient(160deg,rgba(124,58,237,0.22),rgba(15,11,32,0.6))] p-5">
          <span
            aria-hidden="true"
            className="border-gilt-300/25 absolute inset-3 rounded-xl border"
          />
          <MockQr
            className="relative shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)]"
            seed={asset.code}
            size={190}
          />
        </div>

        <div className="text-center">
          <p className="font-display text-lilac-50 text-[15px] font-semibold">{asset.name}</p>
          <p className="text-arcane-200 mt-0.5 font-mono text-[12.5px]">{asset.code}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge icon={<Icon name="shield" size={12} />} tone="accent">
            Etiqueta oficial
          </Badge>
          <Badge tone="neutral">{asset.serial ?? 'Sem nº de série'}</Badge>
        </div>

        <p className="text-lilac-200/55 max-w-xs text-center text-[11.5px] leading-relaxed">
          Este QR Code é apenas ilustrativo. Nenhuma câmera ou leitura real é executada neste
          protótipo.
        </p>
      </div>
    </Modal>
  )
}
