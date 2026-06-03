'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveCandlestick from '@/components/modules/InteractiveCandlestick'
import PipCalculator from '@/components/modules/PipCalculator'
import ForexSessionsClock from '@/components/modules/ForexSessionsClock'
import ConceptCard from '@/components/modules/ConceptCard'
import InlineQuiz from '@/components/modules/InlineQuiz'
import ProgressSection from '@/components/modules/ProgressSection'
import VideoEmbed from '@/components/modules/VideoEmbed'
import PremiumGate from '@/components/modules/PremiumGate'
import { usePremium } from '@/components/modules/usePremium'

const sections = [
  { id: 'intro', title: "Qu'est-ce que le Forex ?", duration: '20 min' },
  { id: 'participants', title: 'Les participants du marché', duration: '15 min' },
  { id: 'pairs', title: 'Les paires de devises', duration: '25 min' },
  { id: 'sessions', title: 'Sessions de trading mondiales', duration: '20 min' },
  { id: 'concepts', title: 'Concepts fondamentaux', duration: '30 min' },
  { id: 'orders', title: 'Les types d\'ordres', duration: '20 min' },
  { id: 'broker', title: 'Choisir son broker', duration: '15 min' },
]

const conceptsData = [
  { term: 'Pip', icon: '📏', definition: 'Plus petite variation de prix standard. 1 pip = 0.0001 pour EUR/USD, 0.01 pour USD/JPY.', example: 'EUR/USD passe de 1.0850 à 1.0855 → +5 pips' },
  { term: 'Spread', icon: '↔️', definition: 'Différence entre le prix d\'achat (ask) et de vente (bid). Coût principal du courtier.', example: 'Bid: 1.0850 / Ask: 1.0852 → Spread = 2 pips' },
  { term: 'Levier', icon: '⚖️', definition: 'Multiplie votre pouvoir d\'achat. Amplifie gains ET pertes dans la même proportion.', example: 'Levier 1:100 : 1000€ contrôle 100 000€' },
  { term: 'Lot', icon: '📦', definition: 'Unité de mesure d\'une transaction Forex.', example: '1 lot standard = 100 000 unités. Mini-lot = 10 000.' },
  { term: 'Marge', icon: '🏦', definition: 'Capital minimum bloqué pour maintenir une position ouverte avec levier.', example: 'Levier 1:50, position 50 000€ → marge requise : 1 000€' },
  { term: 'Swap', icon: '🔄', definition: 'Frais de rollover pour maintenir une position overnight. Positif ou négatif.', example: 'Position EUR/USD longue overnight : -0.50 pips de swap' },
]

export default function Forex1Page() {
  const status = usePremium()
  const isPremium = status === 'premium'

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #003087 0%, #0070BA 60%, #0096D6 100%)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>← Modules</Link>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Forex & Crypto</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>
                {isPremium ? '⭐ Premium actif' : '👁 Aperçu gratuit'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>📚 Niveau 1</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>⏱ 4h de contenu</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>7 sections</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12, lineHeight: 1.2 }}>Introduction au Forex</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Découvrez le plus grand marché financier au monde — 6,6 trillions de dollars échangés chaque jour.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {isPremium && <ProgressSection sections={sections} moduleId="forex-1" />}

          {/* ============ FREE PREVIEW (always visible) ============ */}
          <section id="intro">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E8F4FD', color: '#0070BA', padding: '0.25rem 0.875rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1rem' }}>
              👁 Aperçu gratuit
            </div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.75rem' }}>
              Qu'est-ce que le Forex ?
            </h2>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.8, fontSize: '1.0625rem' }}>
              Le marché des changes (Forex ou Foreign Exchange) est le marché mondial décentralisé sur lequel les devises sont achetées et vendues 24h/24. Avec <strong>6,6 trillions de dollars</strong> échangés quotidiennement, il est plus grand que tous les marchés boursiers combinés.
            </p>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: 1.8 }}>
              Contrairement aux bourses traditionnelles, le Forex n'a pas de lieu physique central. Il opère via un réseau électronique mondial de banques, institutions financières et traders, actif du dimanche soir au vendredi soir.
            </p>

            {/* Stats teaser */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Volume quotidien', value: '$6,6 T', icon: '💰', color: '#0070BA' },
                { label: 'Marchés ouverts', value: '24h/5j', icon: '🕐', color: '#7C3AED' },
                { label: 'Participants', value: '~10M', icon: '👥', color: '#059669' },
                { label: 'Paires', value: '70+', icon: '🔁', color: '#DC2626' },
              ].map(s => (
                <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ GATE for non-premium ============ */}
          {!isPremium ? (
            <PremiumGate hours={4} />
          ) : (
            <>
              {/* FULL CONTENT — premium only */}
              <VideoEmbed videoId="tQMqcM6uPz4" title="Introduction au Forex — Comment fonctionne le marché des changes ?" duration="12 min" description="Une introduction visuelle complète au marché Forex." />

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="participants">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Les participants du marché</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { title: 'Banques centrales', icon: '🏛️', desc: 'BCE, Fed, BdJ. Interventions pour stabiliser leur devise. Impact colossal.', share: '5%' },
                    { title: 'Banques commerciales', icon: '🏦', desc: 'Majorité des volumes. Trading propriétaire et ordres clients.', share: '42%' },
                    { title: 'Hedge Funds', icon: '📈', desc: 'Spéculation, algos, carry trades. Positions géantes.', share: '28%' },
                    { title: 'Entreprises', icon: '🏭', desc: 'Couverture de leur exposition aux devises étrangères.', share: '15%' },
                    { title: 'Particuliers', icon: '💻', desc: 'Vous ! Accès via les plateformes en ligne.', share: '10%' },
                  ].map(p => (
                    <div key={p.title} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <span style={{ fontSize: 28 }}>{p.icon}</span>
                        <span style={{ background: '#E8F4FD', color: '#0070BA', padding: '0.125rem 0.5rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700 }}>{p.share}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>{p.title}</div>
                      <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="sessions">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Les Sessions de Trading Mondiales</h2>
                <ForexSessionsClock />
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="concepts">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Concepts Fondamentaux</h2>
                <ConceptCard concepts={conceptsData} />
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="orders">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Calculateur de Pips</h2>
                <PipCalculator />
              </section>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

              <section id="broker">
                <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>Lire un Graphique Forex</h2>
                <InteractiveCandlestick />

                <InlineQuiz
                  title="✏️ Quiz final — Module 1"
                  questions={[
                    { q: 'Quel est le volume quotidien moyen du marché Forex ?', options: ['1 trillion $', '3 trillions $', '6,6 trillions $', '20 trillions $'], correct: 2, explanation: 'Le Forex est le plus grand marché financier au monde avec ~6,6 trillions $ échangés quotidiennement.' },
                    { q: 'Quelle session offre la meilleure liquidité pour EUR/USD ?', options: ['Sydney', 'Tokyo', 'Chevauchement Londres/New York', 'New York seul'], correct: 2, explanation: 'Le chevauchement Londres/New York (13h-17h CET) cumule les deux sessions les plus volumineuses.' },
                    { q: 'Un chandelier rouge/baissier signifie que...', options: ['Le prix a baissé', 'La clôture est inférieure à l\'ouverture', 'Le marché va baisser', 'Le volume était faible'], correct: 1, explanation: 'Un chandelier est baissier quand la clôture est INFÉRIEURE à l\'ouverture.' },
                  ]}
                />

                <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #003087, #0070BA)', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'white' }}>
                  <div>
                    <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Module suivant</p>
                    <h3 style={{ fontWeight: 800, fontSize: '1.125rem', margin: 0 }}>Analyse Technique – Les Bases →</h3>
                  </div>
                  <Link href="/module/forex-2" style={{ background: 'white', color: '#0070BA', padding: '0.75rem 1.5rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
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
