import type { IconName } from '@/components/ui/icon'
import type { AssetStatus, MovementType } from '@/types'

export type Tone = 'accent' | 'info' | 'neutral' | 'success' | 'warning'

export const assetStatusMeta: Record<
  AssetStatus,
  { description: string; label: string; tone: Tone }
> = {
  active: {
    description: 'Ativo em operação e vinculado a um responsável.',
    label: 'Em uso',
    tone: 'success',
  },
  maintenance: {
    description: 'Temporariamente fora de operação para reparos.',
    label: 'Em manutenção',
    tone: 'warning',
  },
  retired: {
    description: 'Retirado do acervo ativo e mantido em registro.',
    label: 'Baixado',
    tone: 'neutral',
  },
  transferred: {
    description: 'Em processo de movimentação entre locais.',
    label: 'Transferido',
    tone: 'info',
  },
}

export const assetStatusOrder: AssetStatus[] = ['active', 'maintenance', 'transferred', 'retired']

export const movementTypeMeta: Record<MovementType, { icon: IconName; label: string; tone: Tone }> =
  {
    assignment: { icon: 'user', label: 'Atribuição', tone: 'success' },
    maintenance: { icon: 'gear', label: 'Manutenção', tone: 'warning' },
    registration: { icon: 'sparkle', label: 'Cadastro', tone: 'accent' },
    return: { icon: 'refresh', label: 'Devolução', tone: 'neutral' },
    transfer: { icon: 'transfer', label: 'Transferência', tone: 'info' },
  }

export const movementTypeOrder: MovementType[] = [
  'transfer',
  'assignment',
  'registration',
  'maintenance',
  'return',
]

export const categoryIconMap: Record<string, IconName> = {
  bolt: 'bolt',
  car: 'car',
  chair: 'armchair',
  chip: 'chip',
  gear: 'gear',
  spark: 'sparkle',
}

export function categoryIcon(icon: string): IconName {
  return categoryIconMap[icon] ?? 'layers'
}
