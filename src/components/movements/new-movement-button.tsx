'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { MovementModal } from './movement-modal'

export function NewMovementButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button fullWidth={fullWidth} icon="transfer" onClick={() => setOpen(true)}>
        Nova movimentação
      </Button>
      <MovementModal onClose={() => setOpen(false)} open={open} />
    </>
  )
}
