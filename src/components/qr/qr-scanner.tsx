'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { Asset } from '@/types'

import { AssetVisual } from '@/components/assets/asset-visual'
import { Alert } from '@/components/ui/alert'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { getAssetByCode, getCategory, getLocation, getResponsible } from '@/data/mock'
import { cn } from '@/lib/utils'

type ScanState = 'error' | 'found' | 'idle' | 'scanning'

const scanTargets = ['PAT-00124', 'PAT-00133', 'PAT-00127', 'PAT-00130']

export function QrScanner() {
  const toast = useToast()
  const [state, setState] = useState<ScanState>('idle')
  const [result, setResult] = useState<Asset | null>(null)
  const [history, setHistory] = useState<Asset[]>([])
  const [attempt, setAttempt] = useState(0)

  const runScan = async (mode: 'error' | 'success') => {
    setState('scanning')
    setResult(null)
    await new Promise((resolve) => setTimeout(resolve, mode === 'error' ? 1300 : 1900))

    if (mode === 'error') {
      setState('error')
      toast.warning('Leitura inconclusiva', 'O código não pôde ser interpretado. Tente novamente.')
      return
    }

    const code = scanTargets[attempt % scanTargets.length]
    const asset = getAssetByCode(code) ?? null
    setAttempt((value) => value + 1)
    setResult(asset)
    setState('found')
    if (asset) {
      setHistory((current) =>
        [asset, ...current.filter((item) => item.id !== asset.id)].slice(0, 4),
      )
      toast.success('Patrimônio identificado', `${asset.name} · ${asset.code}`)
    }
  }

  const reset = () => {
    setState('idle')
    setResult(null)
  }

  const category = result ? getCategory(result.categoryId) : undefined
  const responsible = result ? getResponsible(result.responsibleId) : undefined
  const location = result ? getLocation(result.locationId) : undefined

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
      <div className="glass-strong ornament-edge relative overflow-hidden rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="border-arcane-400/35 bg-arcane-500/12 text-arcane-200 flex size-9 items-center justify-center rounded-xl border">
              <Icon name="scan" size={18} />
            </span>
            <div>
              <p className="font-display text-lilac-50 text-[14px] font-semibold tracking-wide">
                Leitor de QR Code
              </p>
              <p className="text-lilac-200/55 text-[11.5px]">
                {state === 'scanning'
                  ? 'Escaneando etiqueta...'
                  : 'Câmera simulada · sem acesso real'}
              </p>
            </div>
          </div>
          <Badge
            dot
            tone={state === 'scanning' ? 'accent' : state === 'found' ? 'success' : 'neutral'}
          >
            {state === 'scanning'
              ? 'Lendo'
              : state === 'found'
                ? 'Identificado'
                : state === 'error'
                  ? 'Falha'
                  : 'Aguardando'}
          </Badge>
        </div>

        {/* Área do scanner */}
        <div className="border-arcane-400/25 relative mt-5 aspect-square w-full overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.22),rgba(5,3,12,0.95))] sm:aspect-[16/10]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(196,181,253,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.5) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative flex h-full w-full max-w-md items-center justify-center">
              {/* Moldura de escaneamento */}
              {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
                <span
                  className={cn(
                    'border-gilt-300/80 absolute size-10 transition-colors duration-300',
                    corner === 'tl' && 'top-0 left-0 rounded-tl-2xl border-t-2 border-l-2',
                    corner === 'tr' && 'top-0 right-0 rounded-tr-2xl border-t-2 border-r-2',
                    corner === 'bl' && 'bottom-0 left-0 rounded-bl-2xl border-b-2 border-l-2',
                    corner === 'br' && 'right-0 bottom-0 rounded-br-2xl border-r-2 border-b-2',
                    state === 'scanning' && 'border-arcane-200',
                    state === 'found' && 'border-emerald-300',
                    state === 'error' && 'border-rose-400',
                  )}
                  key={corner}
                />
              ))}

              {state === 'scanning' && (
                <span
                  aria-hidden="true"
                  className="animate-scan absolute inset-x-3 h-24 bg-[linear-gradient(180deg,transparent,rgba(139,92,246,0.35),rgba(240,220,164,0.65))]"
                />
              )}

              <div className="relative flex flex-col items-center gap-3 text-center">
                {state === 'scanning' ? (
                  <>
                    <Spinner size={40} />
                    <p className="font-display text-lilac-100 text-[13px] tracking-wide">
                      Interpretando código...
                    </p>
                    <p className="text-lilac-200/55 max-w-[15rem] text-[11.5px]">
                      Cruzando o código com o acervo de patrimônios.
                    </p>
                  </>
                ) : state === 'found' && result ? (
                  <>
                    <span className="flex size-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-400/12 text-emerald-200">
                      <Icon name="check" size={30} />
                    </span>
                    <p className="font-display text-lilac-50 text-[14px] font-semibold">
                      Patrimônio encontrado
                    </p>
                    <p className="text-arcane-200 font-mono text-[12px]">{result.code}</p>
                  </>
                ) : state === 'error' ? (
                  <>
                    <span className="flex size-16 items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-400/12 text-rose-200">
                      <Icon name="alert" size={28} />
                    </span>
                    <p className="font-display text-lilac-50 text-[14px] font-semibold">
                      Leitura falhou
                    </p>
                    <p className="text-lilac-200/60 max-w-[16rem] text-[11.5px]">
                      Não foi possível interpretar o código. Ajuste o enquadramento e tente
                      novamente.
                    </p>
                  </>
                ) : (
                  <>
                    <span className="border-arcane-400/35 bg-arcane-500/10 text-arcane-100 relative flex size-20 items-center justify-center rounded-2xl border">
                      <span className="animate-pulse-ring border-arcane-400/40 absolute inset-0 rounded-2xl border" />
                      <Icon name="qr" size={38} />
                    </span>
                    <p className="font-display text-lilac-100 max-w-[18rem] text-[14px] tracking-wide">
                      Aponte o leitor para o QR Code do patrimônio
                    </p>
                    <p className="text-lilac-200/55 max-w-[16rem] text-[11.5px]">
                      Centralize a etiqueta dentro da moldura para iniciar a identificação.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {state === 'scanning' && (
            <div className="bg-ink-950/60 absolute inset-x-0 bottom-0 h-1">
              <div className="animate-shimmer h-full w-full bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.8),transparent)] bg-[length:200%_100%]" />
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <Button
            disabled={state === 'scanning'}
            fullWidth
            icon="scan"
            loading={state === 'scanning'}
            onClick={() => runScan('success')}
            size="lg"
          >
            {state === 'found' || state === 'error' ? 'Ler novamente' : 'Simular leitura'}
          </Button>
          {(state === 'found' || state === 'error') && (
            <Button icon="refresh" onClick={reset} size="lg" variant="ghost">
              Reiniciar
            </Button>
          )}
        </div>

        <button
          className="text-lilac-200/45 mt-3 text-[11.5px] underline decoration-dotted transition-colors hover:text-rose-200 disabled:opacity-40"
          disabled={state === 'scanning'}
          onClick={() => runScan('error')}
          type="button"
        >
          Simular falha de leitura
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {state === 'found' && result ? (
          <div className="glass-strong ornament-edge animate-rise rounded-2xl p-5">
            <p className="flex items-center gap-2 text-[10.5px] font-medium tracking-[0.16em] text-emerald-300 uppercase">
              <Icon name="check" size={13} />
              Patrimônio encontrado
            </p>
            <div className="mt-3 flex items-start gap-3">
              <AssetVisual category={category} size="lg" />
              <div className="min-w-0">
                <p className="text-lilac-50 text-[15px] font-medium">{result.name}</p>
                <p className="text-arcane-200 mt-0.5 font-mono text-[12px]">{result.code}</p>
                <div className="mt-2">
                  <StatusBadge status={result.status} />
                </div>
              </div>
            </div>

            <dl className="border-lilac-300/10 mt-4 flex flex-col gap-2.5 border-t pt-4 text-[12.5px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-lilac-200/55">Responsável</dt>
                <dd className="text-lilac-100 text-right font-medium">
                  {responsible?.name ?? 'Sem responsável'}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-lilac-200/55">Localização</dt>
                <dd className="text-lilac-100 text-right font-medium">{location?.name ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-lilac-200/55">Categoria</dt>
                <dd className="text-lilac-100 text-right">{category?.name ?? '—'}</dd>
              </div>
            </dl>

            <ButtonLink
              className="mt-4"
              fullWidth
              href={`/assets/${result.code}`}
              iconRight="chevronRight"
            >
              Ver patrimônio
            </ButtonLink>
          </div>
        ) : state === 'error' ? (
          <Alert dismissible title="Falha de leitura" tone="warning">
            Não foi possível identificar um patrimônio. Verifique se a etiqueta está legível e bem
            posicionada dentro da moldura.
          </Alert>
        ) : (
          <div className="glass rounded-2xl p-5">
            <p className="font-display text-lilac-50 text-[14px] font-semibold tracking-wide">
              Como funciona
            </p>
            <ul className="text-lilac-200/70 mt-3 flex flex-col gap-3 text-[12.5px]">
              {[
                'Posicione a etiqueta do patrimônio dentro da moldura luminosa.',
                'A leitura cruza o código com o acervo e retorna os dados do bem.',
                'Você é direcionado para a ficha completa do patrimônio.',
              ].map((step, index) => (
                <li className="flex gap-3" key={step}>
                  <span className="border-arcane-400/30 bg-arcane-500/12 text-arcane-200 flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-lilac-50 text-[14px] font-semibold tracking-wide">
              Leituras recentes
            </p>
            <Badge tone="neutral">{history.length}</Badge>
          </div>
          {history.length === 0 ? (
            <p className="text-lilac-200/50 mt-3 text-[12.5px]">
              Nenhuma leitura nesta sessão. Simule uma leitura para ver o histórico.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {history.map((item) => {
                const itemCategory = getCategory(item.categoryId)
                return (
                  <li key={item.id}>
                    <Link
                      className="border-lilac-300/10 bg-ink-900/40 hover:border-arcane-400/30 hover:bg-arcane-500/8 flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors"
                      href={`/assets/${item.code}`}
                    >
                      <AssetVisual category={itemCategory} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="text-lilac-100 block truncate text-[12.5px]">
                          {item.name}
                        </span>
                        <span className="text-lilac-200/50 block font-mono text-[10.5px]">
                          {item.code}
                        </span>
                      </span>
                      <Icon className="text-lilac-200/35" name="chevronRight" size={14} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
