import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ForexSchool – Formation en Trading & Finance',
  description: 'Maîtrisez le Forex, les cryptomonnaies, les marchés d\'actions et la gestion de portefeuille avec nos formations expertes. Accès complet pour 49 USDT.',
  keywords: 'forex trading, cryptomonnaies, bourse, formation financière, analyse technique, gestion portefeuille',
  authors: [{ name: 'ForexSchool' }],
  openGraph: {
    title: 'ForexSchool – Formation Trading & Finance',
    description: 'Débloquez votre accès complet à 150+ heures de formation pour seulement 49 USDT.',
    type: 'website',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ForexSchool',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0070BA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
