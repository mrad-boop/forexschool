'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveCandlestick from '@/components/modules/InteractiveCandlestick'
import SupportResistanceDemo from '@/components/modules/SupportResistanceDemo'
import ConceptCard from '@/components/modules/ConceptCard'
import InlineQuiz from '@/components/modules/InlineQuiz'
import ProgressSection from '@/components/modules/ProgressSection'
import VideoEmbed from '@/components/modules/VideoEmbed'
import PremiumGate from '@/components/modules/PremiumGate'
import { usePremium } from '@/components/modules/usePremium'
import { useModuleVideo } from '@/components/modules/useModuleVideo'

const sections = [
  { id: 'intro', title: "Principes de l'analyse technique", duration: '15 min' },
  { id: 'candles', title: 'Chandeliers japonais en détail', duration: '30 min' },
  { id: 'sr', title: 'Supports et Résistances', duration: '25 min' },
  { id: 'indicators', title: 'Indicateurs techniques clés', duration: '35 min' },
]

const indicatorConcepts = [
  { term: 'SMA', icon: '📉', definition: 'Simple Moving Average. Moyenne arithmétique des prix sur N périodes.', example: 'SMA20 = somme des 20 dernières clôtures ÷ 20' },
  { term: 'EMA', icon: '📈', definition: 'Exponential Moving Average. Donne plus de poids aux prix récents.', example: 'EMA9 réagit 2× plus vite que SMA20' },
  { term: 'RSI', icon: '🌡️', definition: 'Relative Strength Index. Oscillateur 0-100. >70 = suracheté, <30 = survendu.', example: 'RSI = 75 → marché suracheté' },
  { term: 'MACD', icon: '📊', definition: 'Mesure la relation entre deux EMA (12 et 26).', example: 'Croisement MACD/Signal → signal d\'achat' },
  { term: 'Bollinger', icon: '🎯', definition: 'Bandes à ±2 écarts-types autour d\'une SMA20.', example: 'Bandes resserrées → explosion de volatilité' },
  { term: 'Golden Cross', icon: '✨', definition: 'MA50 croise MA200 à la HAUSSE. Signal haussier majeur.', example: 'Golden Cross BTC 2020 → +400%' },
]

export default function Forex2Page() {
  const status = usePremium()
  const isPremium = status === 'premium'
  const adminVideo = useModuleVideo('forex-2')

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>

        <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: 14 }}>← Modules</Link>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[isPremium ? '⭐ Premium actif' : '👁 Aperçu gratuit', '📚 Niveau 1', '⏱ 6h de contenu', '7 sections'].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12 }}>Analyse Technique – Les Bases</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Apprenez à lire les graphiques comme un professionnel : chandeliers, supports, résistances, indicateurs.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {isPremium && <ProgressSection sections={sections} moduleId="forex-2" />}

          {/* FREE PREVIEW */}
          <section id="intro">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E8F4FD', color: '#0070BA', padding: '0.25rem 0.875rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1rem' }}>
              👁 Aperçu gratuit
            </div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.75rem' }}>L'Analyse Technique en pratique</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.0625rem' }}>
              L'analyse technique est l'étude des mouvements de prix passés pour anticiper les futurs. Elle repose sur une conviction : <strong>le prix intègre toute l'information</strong> disponible.
            </p>
            <div style={{ background: '#E8F4FD', border: '1px solid #BAE6FD', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 8 }}>💡 Les 3 postulats de l'analyse technique</p>
              {['Le marché intègre toute l\'information.', 'Les prix évoluent en tendances.', 'L\'histoire se répète (psychologie constante).'].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                  <span style={{ color: '#0070BA', fontWeight: 700 }}>{i + 1}.</span>
                  <span style={{ color: '#0369A1', fontSize: '0.9375rem' }}>{p}</span>
                </div>
              ))}
            </div>
          </section>

          {!isPremium ? (
            <PremiumGate hours={6} />
          ) : (
            <>
              <VideoEmbed title="Analyse technique complète pour débutants" searchQuery="analyse technique trading débutant français chandeliers" description="Recherche YouTube : analyse technique pour débutants." />

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="candles">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Les Chandeliers Japonais</h2>
                <InteractiveCandlestick />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
                  {[
                    { name: 'Doji', icon: '➕', color: '#F59E0B', desc: 'Indécision. Retournement potentiel.' },
                    { name: 'Marteau', icon: '🔨', color: '#22C55E', desc: 'Signal haussier après une baisse.' },
                    { name: 'Étoile filante', icon: '⭐', color: '#EF4444', desc: 'Signal baissier après une hausse.' },
                    { name: 'Engulfing', icon: '🕯️', color: '#0070BA', desc: 'Retournement très fiable.' },
                  ].map(p => (
                    <div key={p.name} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: `2px solid ${p.color}30` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 24 }}>{p.icon}</span>
                        <span style={{ fontWeight: 700, color: p.color }}>{p.name}</span>
                      </div>
                      <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="sr">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Supports et Résistances</h2>
                <SupportResistanceDemo />
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="indicators">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Les Indicateurs Techniques</h2>
                <ConceptCard concepts={indicatorConcepts} />
                <VideoEmbed title="RSI, MACD et Bandes de Bollinger expliqués" searchQuery="RSI MACD bollinger trading explication français" description="Recherche YouTube : les indicateurs techniques." />
                <InlineQuiz
                  title="✏️ Quiz — Indicateurs"
                  questions={[
                    { q: 'Un RSI à 75 signifie que le marché est...', options: ['Survendu', 'Neutre', 'Suracheté', 'Baissier'], correct: 2, explanation: 'RSI > 70 = surachat. Une correction est possible.' },
                    { q: 'Un "Golden Cross" se produit quand...', options: ['Le RSI passe 50', 'La MA50 croise la MA200 à la hausse', 'Le prix touche Bollinger', 'Le MACD passe à zéro'], correct: 1, explanation: 'Le Golden Cross est un signal haussier de long terme.' },
                  ]}
                />
                <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #1E293B, #334155)', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'white' }}>
                  <div>
                    <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Module suivant</p>
                    <h3 style={{ fontWeight: 800, fontSize: '1.125rem', margin: 0 }}>Gestion du Risque →</h3>
                  </div>
                  <Link href="/module/forex-3" style={{ background: 'white', color: '#1E293B', padding: '0.75rem 1.5rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none' }}>
                    Continuer →
                  </Link>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
