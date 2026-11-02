'use client'

import { useState } from 'react'

import type { Tone } from '@/lib/domain'

import { Alert } from '@/components/ui/alert'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Field, NativeSelect, Textarea, TextInput } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Skeleton, TableSkeleton } from '@/components/ui/loading'
import { Modal } from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { Tabs } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/toast'
import { Tooltip } from '@/components/ui/tooltip'
import {
  assetStatusMeta,
  assetStatusOrder,
  movementTypeMeta,
  movementTypeOrder,
} from '@/lib/domain'
import { cn } from '@/lib/utils'

const tones: Tone[] = ['accent', 'success', 'info', 'warning', 'neutral']

export function SettingsView() {
  return (
    <Tabs
      items={[
        { content: <SettingsProfile />, id: 'profile', label: 'Perfil' },
        { content: <SettingsAppearance />, id: 'appearance', label: 'Aparência' },
        { content: <SettingsNotifications />, id: 'notifications', label: 'Notificações' },
        {
          badge: 'demo',
          content: <DesignSystemShowcase />,
          id: 'design',
          label: 'Design system',
        },
      ]}
    />
  )
}

function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  return (
    <Card edge>
      <CardHeader>
        <div>
          <CardTitle>Design system · estados dos componentes</CardTitle>
          <CardDescription>
            Referência visual dos componentes reutilizáveis e seus estados interativos.
          </CardDescription>
        </div>
        <Badge tone="accent">v0.9</Badge>
      </CardHeader>

      <ShowcaseSection
        description="Variantes, tamanhos e estados normal, hover, ativo e desabilitado."
        title="Botões"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="gold">Dourado</Button>
          <Button variant="danger">Perigo</Button>
          <Button disabled>Desabilitado</Button>
          <Button loading>Carregando</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <Button icon="plus" size="sm">
            Pequeno
          </Button>
          <Button icon="plus" size="md">
            Médio
          </Button>
          <Button icon="plus" size="lg">
            Grande
          </Button>
          <Button aria-label="Ícone" size="icon" variant="secondary">
            <Icon name="settings" size={17} />
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badges e status">
        <div className="flex flex-wrap items-center gap-2">
          {tones.map((tone) => (
            <Badge dot key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {assetStatusOrder.map((status) => (
            <Tooltip key={status} label={assetStatusMeta[status].description}>
              <StatusBadge status={status} />
            </Tooltip>
          ))}
          {movementTypeOrder.map((type) => (
            <Badge key={type} tone={movementTypeMeta[type].tone}>
              {movementTypeMeta[type].label}
            </Badge>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        description="Estados normal, foco, erro e desabilitado."
        title="Campos de formulário"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field hint="Campo em estado normal" label="Texto">
            <TextInput placeholder="Digite algo..." />
          </Field>
          <Field hint="Busca com ícone à esquerda" label="Com ícone">
            <TextInput icon="search" placeholder="Buscar..." />
          </Field>
          <Field error="Este campo é obrigatório." label="Erro">
            <TextInput aria-invalid defaultValue="PAT-124" />
          </Field>
          <Field hint="Não editável" label="Desabilitado">
            <TextInput defaultValue="Somente leitura" disabled />
          </Field>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alertas">
        <div className="flex flex-col gap-2.5">
          <Alert title="Patrimônio cadastrado" tone="success">
            Notebook ArcaneBook foi adicionado ao acervo com sucesso.
          </Alert>
          <Alert title="Sincronização concluída" tone="info">
            Os dados exibidos são fictícios e permanecem apenas no navegador.
          </Alert>
          <Alert dismissible title="Item em manutenção" tone="warning">
            Impressora MysticPrint está fora de operação há três dias.
          </Alert>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados vazios e carregamento">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EmptyState
            action={
              <Button size="sm" variant="secondary">
                Limpar filtros
              </Button>
            }
            description="Ajuste os filtros para encontrar o patrimônio desejado."
            icon="search"
            title="Nenhum resultado"
          />
          <div className="flex flex-col gap-3">
            <TableSkeleton rows={2} />
            <div className="border-lilac-300/10 bg-ink-900/30 flex items-center gap-3 rounded-xl border p-3.5">
              <Skeleton className="size-9 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-2.5 w-1/4" />
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection description="Modais, dropdowns e notificações." title="Interações">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button icon="layers" onClick={() => setModalOpen(true)} variant="secondary">
            Abrir modal
          </Button>
          <Button
            icon="sparkle"
            onClick={() => toast.info('Notificação', 'Exemplo de aviso do sistema.')}
            variant="ghost"
          >
            Disparar notificação
          </Button>
          <Button
            icon="alert"
            onClick={() => toast.warning('Atenção', 'Exemplo de aviso de risco.')}
            variant="outline"
          >
            Aviso de risco
          </Button>
        </div>
        <div className="mt-3.5">
          <Breadcrumbs
            items={[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/assets', label: 'Patrimônios' },
              { label: 'Detalhes' },
            ]}
          />
        </div>
      </ShowcaseSection>

      <Modal
        description="Demonstração de sobreposição, foco e fechamento por ESC."
        footer={
          <>
            <Button onClick={() => setModalOpen(false)} variant="ghost">
              Cancelar
            </Button>
            <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
          </>
        }
        icon="sparkle"
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        size="sm"
        title="Exemplo de modal"
      >
        <p className="text-lilac-200/75 text-[13px] leading-relaxed">
          Modais são usados para cadastro, edição, transferências e geração de etiquetas. O conteúdo
          permanece legível com fundo escuro e foco visível.
        </p>
      </Modal>
    </Card>
  )
}

function SettingsAppearance() {
  const toast = useToast()
  const [theme, setTheme] = useState('arcane')

  const themes = [
    {
      hint: 'Tema padrão do sistema',
      id: 'arcane',
      label: 'Arcane Violet',
      swatch: 'from-[#7c3aed] to-[#4f46e5]',
    },
    {
      hint: 'Azuis profundos',
      id: 'mystic',
      label: 'Mystic Depth',
      swatch: 'from-[#4f46e5] to-[#0f0b20]',
    },
    {
      hint: 'Detalhes dourados',
      id: 'gilt',
      label: 'Gilded Lilac',
      swatch: 'from-[#d1a94a] to-[#7c3aed]',
    },
  ]

  return (
    <Card edge>
      <CardHeader>
        <div>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Escolha a atmosfera visual do painel. Apenas a opção padrão está ativa.
          </CardDescription>
        </div>
      </CardHeader>
      <div className="grid grid-cols-1 gap-3 px-5 pb-5 sm:grid-cols-3">
        {themes.map((item) => {
          const selected = theme === item.id
          return (
            <button
              className={cn(
                'rounded-xl border p-3.5 text-left transition-all duration-200',
                selected
                  ? 'border-arcane-400/60 bg-arcane-500/12 shadow-[0_0_22px_-10px_rgba(139,92,246,0.9)]'
                  : 'border-lilac-300/15 bg-ink-900/40 hover:border-lilac-300/30',
              )}
              key={item.id}
              onClick={() => {
                setTheme(item.id)
                if (item.id !== 'arcane') {
                  toast.info('Tema em breve', 'Este protótipo usa apenas o tema Arcane Violet.')
                }
              }}
              type="button"
            >
              <span className={cn('mb-2.5 block h-10 rounded-lg bg-gradient-to-br', item.swatch)} />
              <span className="text-lilac-50 block text-[13px] font-medium">{item.label}</span>
              <span className="text-lilac-200/55 block text-[11px]">{item.hint}</span>
              {selected && (
                <span className="text-arcane-200 mt-2 inline-flex items-center gap-1 text-[11px]">
                  <Icon name="check" size={12} /> Selecionado
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className="border-lilac-300/10 border-t px-5 py-4">
        <Tooltip label="Densidade compacta deixa as tabelas mais curtas">
          <span className="text-lilac-200/60 text-[12px] underline decoration-dotted">
            O que é densidade de interface?
          </span>
        </Tooltip>
      </div>
    </Card>
  )
}

function SettingsNotifications() {
  const toast = useToast()
  const [options, setOptions] = useState({
    lowStock: true,
    maintenance: true,
    transfers: true,
    weekly: false,
  })

  return (
    <Card edge>
      <CardHeader>
        <div>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Defina quais eventos geram avisos no painel.</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-5 px-5 pb-5">
        <Switch
          checked={options.maintenance}
          description="Avisar quando um patrimônio entrar em manutenção."
          label="Manutenções"
          onChange={(value) => setOptions((current) => ({ ...current, maintenance: value }))}
        />
        <Switch
          checked={options.transfers}
          description="Notificar sobre transferências entre locais."
          label="Transferências"
          onChange={(value) => setOptions((current) => ({ ...current, transfers: value }))}
        />
        <Switch
          checked={options.lowStock}
          description="Alertar quando um bem ficar sem responsável atribuído."
          label="Itens sem responsável"
          onChange={(value) => setOptions((current) => ({ ...current, lowStock: value }))}
        />
        <Switch
          checked={options.weekly}
          description="Enviar um balanço do acervo toda segunda-feira."
          label="Resumo semanal"
          onChange={(value) => setOptions((current) => ({ ...current, weekly: value }))}
        />
        <Switch
          checked
          description="Indisponível nesta versão do protótipo."
          disabled
          label="Integrações externas"
          onChange={() => undefined}
        />
      </div>
      <div className="border-lilac-300/10 flex justify-end border-t px-5 py-4">
        <Button
          icon="check"
          onClick={() =>
            toast.success('Notificações atualizadas', 'Preferências simuladas localmente.')
          }
        >
          Salvar notificações
        </Button>
      </div>
    </Card>
  )
}

function SettingsProfile() {
  const toast = useToast()
  const [saving, setSaving] = useState(false)

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSaving(false)
    toast.success('Preferências salvas', 'Simulação local — nada foi persistido.')
  }

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={save}>
      <Card edge>
        <CardHeader>
          <div>
            <CardTitle>Dados do perfil</CardTitle>
            <CardDescription>Informações exibidas nos registros e movimentações.</CardDescription>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-2">
          <Field htmlFor="set-name" label="Nome completo">
            <TextInput defaultValue="Aria Corvina" id="set-name" />
          </Field>
          <Field htmlFor="set-email" label="E-mail corporativo">
            <TextInput defaultValue="aria.corvina@arcanum.co" id="set-email" type="email" />
          </Field>
          <Field htmlFor="set-role" label="Cargo">
            <TextInput defaultValue="Administradora do acervo" id="set-role" />
          </Field>
          <Field htmlFor="set-unit" label="Unidade">
            <NativeSelect defaultValue="torre" id="set-unit">
              <option value="torre">Torre Alvorada</option>
              <option value="anexo">Anexo Exímio</option>
              <option value="externo">Bloco Externo</option>
            </NativeSelect>
          </Field>
          <Field className="sm:col-span-2" htmlFor="set-notes" label="Observações internas">
            <Textarea
              defaultValue="Responsável pela conferência trimestral do inventário."
              id="set-notes"
            />
          </Field>
        </div>
        <div className="border-lilac-300/10 flex justify-end border-t px-5 py-4">
          <Button icon="check" loading={saving} type="submit">
            Salvar preferências
          </Button>
        </div>
      </Card>
    </form>
  )
}

function ShowcaseSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description?: string
  title: string
}) {
  return (
    <div className="border-lilac-300/10 border-t px-5 py-5 first:border-t-0">
      <p className="font-display text-lilac-50 text-[13px] font-semibold tracking-wide">{title}</p>
      {description && <p className="text-lilac-200/55 mt-0.5 text-[11.5px]">{description}</p>}
      <div className="mt-3.5">{children}</div>
    </div>
  )
}
