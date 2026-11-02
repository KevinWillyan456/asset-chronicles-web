'use client'

import { useState } from 'react'

import type { Asset, MovementType } from '@/types'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, NativeSelect, Textarea, TextInput } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Modal } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toast'
import { assets, getAssetById, getLocation, locations, responsibles } from '@/data/mock'
import { movementTypeMeta, movementTypeOrder } from '@/lib/domain'

interface FormState {
  assetId: string
  date: string
  fromLocationId: string
  note: string
  responsibleId: string
  toLocationId: string
  type: MovementType
}

interface MovementModalProps {
  asset?: Asset
  lockAsset?: boolean
  onClose: () => void
  onSaved?: () => void
  open: boolean
}

/** Only mounted while open, so the form always starts from the latest props. */
export function MovementModal(props: MovementModalProps) {
  if (!props.open) return null
  return <MovementDialog {...props} />
}

function buildInitialForm(asset?: Asset): FormState {
  const initialAsset = asset ?? assets[0]
  return {
    assetId: initialAsset?.id ?? '',
    date: '2026-10-03',
    fromLocationId: initialAsset?.locationId ?? '',
    note: '',
    responsibleId: initialAsset?.responsibleId ?? '',
    toLocationId: '',
    type: 'transfer',
  }
}

function MovementDialog({ asset, lockAsset = false, onClose, onSaved }: MovementModalProps) {
  const toast = useToast()
  const [form, setForm] = useState<FormState>(() => buildInitialForm(asset))
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const selectedAsset = getAssetById(form.assetId)
  const fromLocation = getLocation(form.fromLocationId)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value }
      if (key === 'assetId') {
        const changed = getAssetById(value as string)
        next.fromLocationId = changed?.locationId ?? ''
        next.responsibleId = changed?.responsibleId ?? ''
      }
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 850))
    setLoading(false)
    setSaved(true)
    onSaved?.()
    toast.success('Movimentação registrada', 'Simulação local — nenhum dado foi persistido.')
  }

  const showAssetSummary = selectedAsset && lockAsset

  return (
    <Modal
      description="Registre a transferência de um patrimônio entre locais ou responsáveis."
      footer={
        <>
          <Button disabled={loading} onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button form="movement-form" icon="check" loading={loading} type="submit">
            Registrar movimentação
          </Button>
        </>
      }
      icon="transfer"
      onClose={onClose}
      open
      title="Nova movimentação"
    >
      {saved && (
        <Alert
          className="mb-4"
          dismissible
          title="Movimentação simulada com sucesso"
          tone="success"
        >
          O fluxo foi demonstrado na interface. Nenhuma alteração real foi gravada.
        </Alert>
      )}

      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        id="movement-form"
        onSubmit={handleSubmit}
      >
        <Field className="sm:col-span-2" htmlFor="mov-asset" label="Patrimônio" required>
          <NativeSelect
            disabled={lockAsset}
            id="mov-asset"
            onChange={(event) => update('assetId', event.target.value)}
            value={form.assetId}
          >
            {assets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.code}
              </option>
            ))}
          </NativeSelect>
        </Field>

        {showAssetSummary && (
          <div className="sm:col-span-2">
            <div className="border-lilac-300/12 bg-ink-900/50 flex items-center gap-3 rounded-xl border px-3.5 py-3">
              <Icon className="text-lilac-200/50" name="pin" size={16} />
              <div className="text-[12.5px]">
                <p className="text-lilac-200/55">Local atual</p>
                <p className="text-lilac-100 font-medium">
                  {fromLocation?.name} · {fromLocation?.building}
                </p>
              </div>
            </div>
          </div>
        )}

        <Field htmlFor="mov-type" label="Tipo de movimentação">
          <NativeSelect
            id="mov-type"
            onChange={(event) => update('type', event.target.value as MovementType)}
            value={form.type}
          >
            {movementTypeOrder.map((type) => (
              <option key={type} value={type}>
                {movementTypeMeta[type].label}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field htmlFor="mov-date" label="Data">
          <TextInput
            id="mov-date"
            onChange={(event) => update('date', event.target.value)}
            type="date"
            value={form.date}
          />
        </Field>

        <Field htmlFor="mov-from" label="Local de origem">
          <NativeSelect
            id="mov-from"
            onChange={(event) => update('fromLocationId', event.target.value)}
            value={form.fromLocationId}
          >
            <option value="">—</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field htmlFor="mov-to" label="Novo local" required>
          <NativeSelect
            id="mov-to"
            onChange={(event) => update('toLocationId', event.target.value)}
            value={form.toLocationId}
          >
            <option value="">Selecione o destino</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field className="sm:col-span-2" htmlFor="mov-responsible" label="Responsável">
          <NativeSelect
            id="mov-responsible"
            onChange={(event) => update('responsibleId', event.target.value)}
            value={form.responsibleId}
          >
            <option value="">Sem responsável</option>
            {responsibles.map((responsible) => (
              <option key={responsible.id} value={responsible.id}>
                {responsible.name} — {responsible.department}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field
          className="sm:col-span-2"
          hint="Descreva o motivo da movimentação para o histórico."
          htmlFor="mov-note"
          label="Observação"
        >
          <Textarea
            id="mov-note"
            onChange={(event) => update('note', event.target.value)}
            placeholder="Ex.: transferido para atender demanda do setor financeiro."
            value={form.note}
          />
        </Field>
      </form>
    </Modal>
  )
}
