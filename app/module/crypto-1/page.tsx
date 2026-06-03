'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CryptoMarketCycle from '@/components/modules/CryptoMarketCycle'
import ConceptCard from '@/components/modules/ConceptCard'
import InlineQuiz from '@/components/modules/InlineQuiz'
import ProgressSection from '@/components/modules/ProgressSection'
import VideoEmbed from '@/components/modules/VideoEmbed'
import PremiumGate from '@/components/modules/PremiumGate'
import { usePremium } from '@/components/modules/usePremium'
import { useModuleVideo } from '@/components/modules/useModuleVideo'

const sections = [
  { id: 'satoshi', title: "La révolution Bitcoin", duration: '20 min' },
  { id: 'blockchain', title: 'La Blockchain', duration: '25 min' },
  { id: 'bitcoin', title: 'Bitcoin — l\'or numérique', duration: '20 min' },
  { id: 'cycle', title: 'Les cycles de marché', duration: '20 min' },
]

const cryptoConcepts = [
  { term: 'Blockchain', icon: '⛓️', definition: 'Registre distribué immuable partagé entre des milliers de nœuds.', example: 'Bitcoin : +800 000 blocs depuis 2009.' },
  { term: 'Halving', icon: '✂️', definition: 'Événement Bitcoin tous les ~4 ans divisant par 2 la récompense des mineurs.', example: 'Halving 2024 : 6.25 → 3.125 BTC/bloc.' },
  { term: 'Smart Contract', icon: '📝', definition: 'Programme autonome qui s\'exécute automatiquement. Pas d\'intermédiaire.', example: 'Uniswap : 100% automatisé.' },
  { term: 'DeFi', icon: '🏦', definition: 'Finance Décentralisée sur blockchain, sans banque.', example: 'Aave : empruntez en donnant du BTC en garantie.' },
  { term: 'Stablecoin', icon: '⚓', definition: 'Crypto arrimée à un actif stable (USD, EUR).', example: 'USDT, USDC : 1 token = ~1 dollar.' },
  { term: 'Wallet', icon: '👛', definition: 'Portefeuille stockant vos clés privées. HOT (en ligne) ou COLD (hors ligne).', example: 'Ledger = hardware wallet sécurisé.' },
]

export default function Crypto1Page() {
  const status = usePremium()
  const isPremium = status === 'premium'
  const adminVideo = useModuleVideo('crypto-1')

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>

        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1a1a2e 100%)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: 14 }}>← Modules</Link>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[isPremium ? '⭐ Premium actif' : '👁 Aperçu gratuit', '📚 Niveau 1', '⏱ 5h de contenu', '7 sections'].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.12)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12 }}>Introduction aux Cryptomonnaies</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Bitcoin, Ethereum, DeFi, NFT, Web3 — comprenez la révolution financière du XXIe siècle.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {isPremium && <ProgressSection sections={sections} moduleId="crypto-1" />}

          {/* FREE PREVIEW */}
          <section id="satoshi">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E8F4FD', color: '#0070BA', padding: '0.25rem 0.875rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1rem' }}>
              👁 Aperçu gratuit
            </div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.75rem' }}>La Révolution Satoshi</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.0625rem' }}>
              En 2009, <strong>Satoshi Nakamoto</strong> publiait le whitepaper Bitcoin : une monnaie numérique sans banque, sans gouvernement, sans intermédiaire. Quinze ans plus tard, le marché crypto dépasse les <strong>2 500 milliards de dollars</strong>.
            </p>
            <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E293B' }}>
              <p style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution."
              </p>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginTop: 12, marginBottom: 0 }}>— Satoshi Nakamoto, Bitcoin Whitepaper, 2008</p>
            </div>
          </section>

          {!isPremium ? (
            <PremiumGate hours={5} />
          ) : (
            <>
              <VideoEmbed videoUrl={adminVideo?.url} title={adminVideo?.title || "Bitcoin et la blockchain expliqués simplement"} searchQuery="bitcoin blockchain expliqué simplement français débutant" description="Vidéo explicative du module." />

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="bitcoin">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Bitcoin — L'Or Numérique</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Offre max', value: '21M', sub: 'BTC', icon: '🔒', color: '#F59E0B' },
                    { label: 'Prochain halving', value: '2028', sub: '1.5625 BTC', icon: '✂️', color: '#0070BA' },
                    { label: 'En circulation', value: '~19.7M', sub: 'BTC minés', icon: '⛏️', color: '#22C55E' },
                    { label: 'Nœuds', value: '50K+', sub: 'mondiaux', icon: '🌍', color: '#7C3AED' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: '0.8125rem', color: '#0F172A', fontWeight: 600 }}>{s.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="cycle">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Les Cycles de Marché Crypto</h2>
                <CryptoMarketCycle />
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="blockchain">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Concepts Clés</h2>
                <ConceptCard concepts={cryptoConcepts} />
                <InlineQuiz
                  title="✏️ Quiz Final — Cryptomonnaies"
                  questions={[
                    { q: 'Que signifie "Not your keys, not your coins" ?', options: ['Changez de mot de passe', 'Sans vos clés privées, vous ne contrôlez pas vos cryptos', 'Utilisez un exchange', 'Restez en dollars'], correct: 1, explanation: 'Si vos cryptos sont sur un exchange, vous ne possédez qu\'une créance. Seules les clés privées = vraie propriété.' },
                    { q: 'Combien de Bitcoin existeront au maximum ?', options: ['10 millions', '21 millions', '100 millions', 'Illimité'], correct: 1, explanation: 'Satoshi a codé une limite absolue de 21 millions de BTC.' },
                  ]}
                />
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
