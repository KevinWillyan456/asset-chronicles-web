'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { AssetFormModal } from './asset-form-modal'

interface NewAssetButtonProps {
  className?: string
  fullWidth?: boolean
  icon?: React.ComponentProps<typeof Button>['icon']
  label?: string
  size?: 'lg' | 'md' | 'sm'
  variant?: 'gold' | 'outline' | 'primary' | 'secondary'
}

export function NewAssetButton({
  className,
  fullWidth = false,
  icon = 'plus',
  label = 'Novo patrimônio',
  size = 'md',
  variant = 'primary',
}: NewAssetButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        fullWidth={fullWidth}
        icon={icon}
        onClick={() => setOpen(true)}
        size={size}
        variant={variant}
      >
        {label}
      </Button>
      <AssetFormModal mode="create" onClose={() => setOpen(false)} open={open} />
    </>
  )
}
