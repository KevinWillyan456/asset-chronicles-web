'use client'

import { useState } from 'react'

import type { Asset } from '@/types'

import { MovementModal } from '@/components/movements/movement-modal'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Icon } from '@/components/ui/icon'
import { useToast } from '@/components/ui/toast'

import { AssetFormModal } from './asset-form-modal'
import { AssetQrModal } from './asset-qr-modal'

export function AssetDetailActions({ asset }: { asset: Asset }) {
  const toast = useToast()
  const [editOpen, setEditOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <Button icon="edit" onClick={() => setEditOpen(true)} variant="outline">
          Editar
        </Button>
        <Button icon="transfer" onClick={() => setTransferOpen(true)} variant="secondary">
          Transferir
        </Button>
        <Button icon="qr" onClick={() => setQrOpen(true)} variant="gold">
          Gerar QR Code
        </Button>
        <Dropdown
          items={[
            {
              icon: 'download',
              id: 'label',
              label: 'Imprimir etiqueta',
              onSelect: () =>
                toast.info('Impressão simulada', 'Nenhum arquivo real é gerado no protótipo.'),
            },
            {
              icon: 'history',
              id: 'history',
              label: 'Ver histórico completo',
              onSelect: () =>
                toast.info('Histórico', 'Todas as movimentações estão listadas abaixo.'),
            },
            {
              icon: 'trash',
              id: 'retire',
              label: 'Dar baixa no patrimônio',
              onSelect: () =>
                toast.warning(
                  'Ação sensível',
                  'Baixa de patrimônio é apenas ilustrativa neste MVP.',
                ),
              tone: 'danger',
            },
          ]}
          label="Mais ações"
          trigger={
            <span className="border-lilac-300/18 text-lilac-200/70 hover:bg-lilac-300/10 flex size-10 items-center justify-center rounded-xl border transition-colors hover:text-white">
              <Icon name="more" size={17} />
            </span>
          }
        />
      </div>

      <AssetFormModal
        asset={asset}
        mode="edit"
        onClose={() => setEditOpen(false)}
        open={editOpen}
      />
      <MovementModal
        asset={asset}
        lockAsset
        onClose={() => setTransferOpen(false)}
        open={transferOpen}
      />
      <AssetQrModal asset={asset} onClose={() => setQrOpen(false)} open={qrOpen} />
    </>
  )
}
