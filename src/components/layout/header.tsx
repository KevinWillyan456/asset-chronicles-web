'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Dropdown } from '@/components/ui/dropdown'
import { TextInput } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { useToast } from '@/components/ui/toast'

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const router = useRouter()
  const toast = useToast()
  const [query, setQuery] = useState('')

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      toast.warning('Digite um termo para buscar', 'Ex.: ArcaneBook, PAT-00124 ou Financeiro.')
      return
    }
    router.push(`/assets?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="glass sticky top-0 z-40 flex h-16 items-center gap-3 border-x-0 border-t-0 px-4 lg:px-8">
      <button
        aria-label="Abrir menu"
        className="border-lilac-300/15 text-lilac-200/80 hover:bg-lilac-300/10 rounded-xl border p-2.5 transition-colors hover:text-white lg:hidden"
        onClick={onOpenMenu}
        type="button"
      >
        <Icon name="menu" size={19} />
      </button>

      <div className="hidden min-w-0 flex-1 md:block">
        <form className="max-w-md" onSubmit={submitSearch}>
          <TextInput
            aria-label="Busca global"
            icon="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar patrimônio, código ou responsável..."
            value={query}
          />
        </form>
      </div>

      <div className="flex-1 md:hidden" />

      <div className="flex items-center gap-2">
        <span className="mr-1 hidden items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/8 px-2.5 py-1 text-[11px] text-emerald-200 xl:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
          Sistema online
        </span>

        <Dropdown
          items={[
            {
              description: 'Aberta há 3 dias · Laboratório Central',
              icon: 'gear',
              id: 'n1',
              label: 'Impressora MysticPrint em manutenção',
              onSelect: () => router.push('/assets/PAT-00129'),
            },
            {
              description: 'Transferência para Sala de Reuniões',
              icon: 'transfer',
              id: 'n2',
              label: 'Projetor Astra aguardando confirmação',
              onSelect: () => router.push('/movements'),
            },
            {
              description: 'Revise os itens em estoque técnico',
              icon: 'alert',
              id: 'n3',
              label: '3 patrimônios sem responsável',
              onSelect: () => router.push('/assets?status=active'),
            },
          ]}
          label="Notificações"
          trigger={
            <span className="border-lilac-300/15 text-lilac-200/80 hover:bg-lilac-300/10 relative rounded-xl border p-2.5 transition-colors hover:text-white">
              <Icon name="bell" size={18} />
              <span className="bg-gilt-400 absolute top-1.5 right-1.5 size-2 rounded-full shadow-[0_0_8px_rgba(228,196,118,0.9)]" />
            </span>
          }
        />

        <Dropdown
          items={[
            {
              description: 'Aria Corvina · Administradora',
              icon: 'user',
              id: 'profile',
              label: 'Meu perfil',
              onSelect: () => toast.info('Perfil', 'Tela de perfil não faz parte deste protótipo.'),
            },
            {
              icon: 'settings',
              id: 'settings',
              label: 'Configurações',
              onSelect: () => router.push('/settings'),
            },
            {
              icon: 'logout',
              id: 'logout',
              label: 'Encerrar sessão',
              onSelect: () =>
                toast.warning('Sessão simulada', 'Nenhuma autenticação real é usada no MVP.'),
              tone: 'danger',
            },
          ]}
          label="Menu do usuário"
          trigger={
            <span className="border-lilac-300/15 hover:bg-lilac-300/10 flex items-center gap-2 rounded-xl border py-1.5 pr-3 pl-1.5 transition-colors">
              <span className="flex size-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#4f46e5)] text-[11px] font-semibold text-white">
                AC
              </span>
              <span className="text-lilac-100 hidden text-[12.5px] sm:block">Aria Corvina</span>
              <Icon className="text-lilac-200/60 hidden sm:block" name="chevronDown" size={14} />
            </span>
          }
        />

        <Badge className="hidden xl:inline-flex" tone="accent">
          MVP
        </Badge>
      </div>
    </header>
  )
}
