import { ButtonLink } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export function QrCta() {
  return (
    <div className="glass-strong ornament-edge relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.4),transparent_65%)] blur-xl"
      />
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="relative flex size-24 shrink-0 items-center justify-center self-center sm:self-auto">
          <span
            aria-hidden="true"
            className="animate-pulse-ring border-arcane-400/40 absolute inset-0 rounded-2xl border"
          />
          <span className="border-arcane-400/35 flex size-24 items-center justify-center rounded-2xl border bg-[linear-gradient(160deg,rgba(124,58,237,0.35),rgba(15,11,32,0.5))]">
            <Icon className="text-arcane-100" name="qr" size={40} />
          </span>
        </div>

        <div className="flex-1">
          <p className="text-gilt-300 flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase">
            <Icon name="sparkle" size={13} />
            Identificação arcana
          </p>
          <h2 className="font-display text-lilac-50 mt-1.5 text-lg font-semibold tracking-wide">
            Ler QR Code
          </h2>
          <p className="text-lilac-200/70 mt-1 max-w-md text-[13px] leading-relaxed">
            Aponte o leitor para a etiqueta do patrimônio e consulte instantaneamente responsável,
            localização e histórico de movimentações.
          </p>
        </div>

        <ButtonLink
          className="sm:w-auto"
          fullWidth
          href="/qr-reader"
          icon="scan"
          iconRight="chevronRight"
          size="lg"
        >
          Abrir leitor
        </ButtonLink>
      </div>
    </div>
  )
}
