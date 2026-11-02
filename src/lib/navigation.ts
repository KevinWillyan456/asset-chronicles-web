import type { IconName } from '@/components/ui/icon'

export interface NavItem {
  badge?: string
  description: string
  href: string
  icon: IconName
  label: string
}

export const navItems: NavItem[] = [
  {
    description: 'Visão geral do acervo',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    description: 'Inventário completo',
    href: '/assets',
    icon: 'assets',
    label: 'Patrimônios',
  },
  {
    description: 'Identificação rápida',
    href: '/qr-reader',
    icon: 'qr',
    label: 'Leitor QR',
  },
  {
    description: 'Histórico de fluxos',
    href: '/movements',
    icon: 'movements',
    label: 'Movimentações',
  },
  {
    description: 'Preferências do sistema',
    href: '/settings',
    icon: 'settings',
    label: 'Configurações',
  },
]

export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname.startsWith(`${href}/`)
}
