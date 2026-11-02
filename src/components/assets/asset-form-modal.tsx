'use client'

import { useState } from 'react'

import type { Asset, AssetStatus } from '@/types'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, NativeSelect, Textarea, TextInput } from '@/components/ui/field'
import { Modal } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toast'
import { categories, locations, responsibles } from '@/data/mock'
import { assetStatusMeta, assetStatusOrder } from '@/lib/domain'

interface AssetFormModalProps {
  asset?: Asset
  mode?: 'create' | 'edit'
  onClose: () => void
  onSaved?: (asset: Asset) => void
  open: boolean
}

interface FormState {
  acquisitionDate: string
  categoryId: string
  code: string
  description: string
  locationId: string
  name: string
  responsibleId: string
  status: AssetStatus
  value: string
}

/** Only mounted while open, so the form always starts from the latest props. */
export function AssetFormModal(props: AssetFormModalProps) {
  if (!props.open) return null
  return <AssetFormDialog {...props} />
}

function AssetFormDialog({ asset, mode = 'create', onClose, onSaved }: AssetFormModalProps) {
  const toast = useToast()
  const [form, setForm] = useState<FormState>(() => buildInitialForm(asset))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [saving, setSaving] = useState(false)
  const [savedAsset, setSavedAsset] = useState<Asset | null>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Informe o nome do patrimônio.'
    if (!form.code.trim()) next.code = 'Informe o código patrimonial.'
    else if (!/^PAT-\d{5}$/i.test(form.code.trim())) next.code = 'Use o padrão PAT-00000.'
    if (!form.value.trim()) next.value = 'Informe o valor de aquisição.'
    else if (Number.isNaN(Number(form.value.replace(',', '.')))) next.value = 'Valor inválido.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) {
      toast.warning('Revise o formulário', 'Alguns campos precisam de atenção.')
      return
    }
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    const result: Asset = {
      acquisitionDate: form.acquisitionDate,
      categoryId: form.categoryId,
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || 'Sem descrição registrada.',
      id: asset?.id ?? `asset-${Date.now()}`,
      locationId: form.locationId,
      name: form.name.trim(),
      responsibleId: form.responsibleId || null,
      serial: asset?.serial,
      status: form.status,
      value: Number(form.value.replace(',', '.')),
    }
    setSaving(false)
    setSavedAsset(result)
    onSaved?.(result)
    toast.success(
      mode === 'create' ? 'Patrimônio cadastrado' : 'Patrimônio atualizado',
      `${result.name} · ${result.code} (simulação local, sem persistência).`,
    )
  }

  return (
    <Modal
      description="Preencha as informações básicas do bem. Os dados são apenas demonstrativos."
      footer={
        <>
          <Button disabled={saving} onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button form="asset-form" icon="check" loading={saving} type="submit">
            {mode === 'create' ? 'Cadastrar patrimônio' : 'Salvar alterações'}
          </Button>
        </>
      }
      icon={mode === 'create' ? 'plus' : 'edit'}
      onClose={onClose}
      open
      size="lg"
      title={mode === 'create' ? 'Novo patrimônio' : `Editar ${asset?.name ?? 'patrimônio'}`}
    >
      {savedAsset && (
        <Alert className="mb-4" dismissible title="Registro simulado com sucesso" tone="success">
          <strong>{savedAsset.name}</strong> ({savedAsset.code}) foi processado localmente. Nenhum
          dado foi enviado a um servidor.
        </Alert>
      )}

      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        id="asset-form"
        onSubmit={handleSubmit}
      >
        <Field
          className="sm:col-span-2"
          error={errors.name}
          htmlFor="asset-name"
          label="Nome do patrimônio"
          required
        >
          <TextInput
            aria-invalid={Boolean(errors.name)}
            id="asset-name"
            onChange={(event) => update('name', event.target.value)}
            placeholder="Ex.: Notebook ArcaneBook"
            value={form.name}
          />
        </Field>

        <Field
          error={errors.code}
          hint="Padrão PAT-00000"
          htmlFor="asset-code"
          label="Código patrimonial"
          required
        >
          <TextInput
            aria-invalid={Boolean(errors.code)}
            className="font-mono"
            id="asset-code"
            onChange={(event) => update('code', event.target.value.toUpperCase())}
            placeholder="PAT-00139"
            value={form.code}
          />
        </Field>

        <Field htmlFor="asset-category" label="Categoria">
          <NativeSelect
            id="asset-category"
            onChange={(event) => update('categoryId', event.target.value)}
            value={form.categoryId}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field htmlFor="asset-responsible" label="Responsável">
          <NativeSelect
            id="asset-responsible"
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

        <Field htmlFor="asset-location" label="Localização">
          <NativeSelect
            id="asset-location"
            onChange={(event) => update('locationId', event.target.value)}
            value={form.locationId}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} — {location.building}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field htmlFor="asset-status" label="Status">
          <NativeSelect
            id="asset-status"
            onChange={(event) => update('status', event.target.value as AssetStatus)}
            value={form.status}
          >
            {assetStatusOrder.map((status) => (
              <option key={status} value={status}>
                {assetStatusMeta[status].label}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field htmlFor="asset-date" label="Data de aquisição">
          <TextInput
            id="asset-date"
            onChange={(event) => update('acquisitionDate', event.target.value)}
            type="date"
            value={form.acquisitionDate}
          />
        </Field>

        <Field error={errors.value} htmlFor="asset-value" label="Valor (R$)" required>
          <TextInput
            aria-invalid={Boolean(errors.value)}
            className="font-mono"
            id="asset-value"
            inputMode="decimal"
            onChange={(event) => update('value', event.target.value)}
            placeholder="0,00"
            value={form.value}
          />
        </Field>

        <Field className="sm:col-span-2" htmlFor="asset-description" label="Descrição">
          <Textarea
            id="asset-description"
            onChange={(event) => update('description', event.target.value)}
            placeholder="Detalhes, acessórios inclusos, observações de uso..."
            value={form.description}
          />
        </Field>
      </form>
    </Modal>
  )
}

function buildInitialForm(asset?: Asset): FormState {
  if (asset) {
    return {
      acquisitionDate: asset.acquisitionDate,
      categoryId: asset.categoryId,
      code: asset.code,
      description: asset.description,
      locationId: asset.locationId,
      name: asset.name,
      responsibleId: asset.responsibleId ?? '',
      status: asset.status,
      value: String(asset.value),
    }
  }
  return {
    acquisitionDate: '2026-10-03',
    categoryId: categories[0]?.id ?? '',
    code: '',
    description: '',
    locationId: locations[0]?.id ?? '',
    name: '',
    responsibleId: '',
    status: 'active',
    value: '',
  }
}
