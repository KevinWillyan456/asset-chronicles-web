import { ButtonLink } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass-strong ornament-edge max-w-lg rounded-2xl p-8 text-center">
        <span className="border-arcane-400/35 bg-arcane-500/12 text-arcane-200 mx-auto flex size-16 items-center justify-center rounded-2xl border">
          <Icon name="search" size={28} />
        </span>
        <p className="text-gilt-300 mt-5 font-mono text-[12px] tracking-[0.2em] uppercase">
          Erro 404
        </p>
        <h1 className="font-display text-lilac-50 mt-2 text-xl font-semibold tracking-wide">
          Registro não encontrado
        </h1>
        <p className="text-lilac-200/70 mx-auto mt-2 max-w-sm text-[13px] leading-relaxed">
          O patrimônio que você tentou acessar não existe no acervo ou o código informado está
          incorreto.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <ButtonLink href="/assets" icon="assets">
            Voltar ao acervo
          </ButtonLink>
          <ButtonLink href="/dashboard" icon="dashboard" variant="ghost">
            Ir para o dashboard
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
