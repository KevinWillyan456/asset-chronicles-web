import type { Metadata } from 'next'

import { Cinzel, JetBrains_Mono, Outfit } from 'next/font/google'

import './globals.css'

const display = Cinzel({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const sans = Outfit({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  description:
    'Sistema de gestão patrimonial com identidade arcana: controle de ativos, movimentações e leitura de QR Code.',
  title: {
    default: 'Asset Chronicles',
    template: '%s · Asset Chronicles',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      lang="pt-BR"
    >
      <body className="min-h-full">
        <div aria-hidden="true" className="arcane-backdrop" />
        {children}
      </body>
    </html>
  )
}
