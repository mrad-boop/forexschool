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
  { term: 'Lot', icon: '📦', definition: 'Unité de mesure d\'une transaction Forex.', example: '1 lot standard = 100 000 unités. Mini-lot = 10 000. Micro-lot = 1 000.' },
  { term: 'Marge', icon: '🏦', definition: 'Capital minimum bloqué pour maintenir une position ouverte avec levier.', example: 'Levier 1:50, position 50 000€ → marge requise : 1 000€' },
  { term: 'Swap', icon: '🔄', definition: 'Frais de rollover pour maintenir une position ouverte overnight. Peut être positif ou négatif.', example: 'Position EUR/USD longue overnight : -0.50 pips de swap' },
]

export default function Forex1Page() {
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
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>✓ Gratuit</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>📚 Niveau 1</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>⏱ 4h de contenu</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>7 sections</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12, lineHeight: 1.2 }}>Introduction au Forex</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Découvrez le plus grand marché financier au monde — 6,6 trillions de dollars échangés chaque jour. Comprenez son fonctionnement, ses acteurs et ses mécanismes fondamentaux.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* Progress tracker */}
          <ProgressSection sections={sections} moduleId="forex-1" />

          {/* Section 1 */}
          <section id="intro">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>
              1. Qu'est-ce que le Forex ?
            </h2>
            <p style={{ color: '#64748B', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Le marché des changes (Forex ou Foreign Exchange) est le marché mondial décentralisé sur lequel les devises sont achetées et vendues 24h/24. Avec <strong>6,6 trillions de dollars</strong> échangés quotidiennement, il est plus grand que tous les marchés boursiers combinés.
            </p>

            {/* Video */}
            <VideoEmbed
              videoId="tQMqcM6uPz4"
              title="Introduction au Forex — Comment fonctionne le marché des changes ?"
              duration="12 min"
              description="Une introduction visuelle complète au marché Forex pour les débutants absolus."
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Volume quotidien', value: '$6,6 T', icon: '💰', color: '#0070BA' },
                { label: 'Marchés ouverts', value: '24h/5j', icon: '🕐', color: '#7C3AED' },
                { label: 'Participants', value: '~10M', icon: '👥', color: '#059669' },
                { label: 'Paires disponibles', value: '70+', icon: '🔁', color: '#DC2626' },
              ].map(s => (
                <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          {/* Section 2 */}
          <section id="participants">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>2. Les participants du marché</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'Banques centrales', icon: '🏛️', desc: 'BCE, Fed, BdJ. Interventions pour stabiliser leur devise. Impact colossal sur les marchés.', share: '5%' },
                { title: 'Banques commerciales', icon: '🏦', desc: 'Représentent la majorité des volumes. Trading propriétaire et exécution des ordres clients.', share: '42%' },
                { title: 'Hedge Funds', icon: '📈', desc: 'Spéculation pure, stratégies algorithmiques, carry trades. Positions géantes.', share: '28%' },
                { title: 'Entreprises', icon: '🏭', desc: 'Couverture (hedging) de leur exposition aux devises étrangères dans leurs opérations internationales.', share: '15%' },
                { title: 'Traders particuliers', icon: '💻', desc: 'Vous ! Accès facilité par les plateformes en ligne depuis les années 2000.', share: '10%' },
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

          {/* Section 3 */}
          <section id="pairs">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>3. Les paires de devises</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              En Forex, on trade toujours des <strong>paires</strong> : on achète une devise en vendant simultanément une autre. La devise de gauche s'appelle la "devise de base", celle de droite la "devise cotée".
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    {['Paire', 'Surnom', 'Volume quotidien', 'Spread moyen', 'Caractéristique'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: '0.8125rem', borderBottom: '2px solid #E2E8F0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['EUR/USD', 'La Fibra', '~28%', '0.8-1.2 pips', 'La + tradée au monde'],
                    ['USD/JPY', 'Le Ninja', '~14%', '0.6-0.9 pips', 'Sensible aux taux japonais'],
                    ['GBP/USD', 'Le Câble', '~13%', '0.8-1.4 pips', 'Volatile, très technique'],
                    ['AUD/USD', 'L\'Aussie', '~7%', '0.8-1.2 pips', 'Corrélé aux matières premières'],
                    ['USD/CAD', 'Le Loonie', '~6%', '0.9-1.4 pips', 'Corrélé au pétrole'],
                    ['USD/CHF', 'Le Swissie', '~5%', '0.9-1.3 pips', 'Valeur refuge en crise'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: j === 0 ? '#0070BA' : '#374151', fontWeight: j === 0 ? 700 : 400, fontFamily: j === 0 ? 'monospace' : 'inherit' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          {/* Section 4 — Sessions Clock */}
          <section id="sessions">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>4. Les Sessions de Trading Mondiales</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Le Forex est ouvert 24h/24 du dimanche soir au vendredi soir. Il se divise en 4 grandes sessions, chacune avec ses caractéristiques propres de liquidité et de volatilité.
            </p>
            <ForexSessionsClock />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          {/* Section 5 — Concepts + Flashcards */}
          <section id="concepts">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>5. Concepts Fondamentaux</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1rem' }}>
              Avant de trader, vous devez maîtriser ces 6 notions clés. Cliquez sur chaque carte pour révéler la définition.
            </p>
            <ConceptCard concepts={conceptsData} />

            <InlineQuiz
              title="✏️ Quiz rapide — Concepts de base"
              questions={[
                { q: 'EUR/USD passe de 1.0850 à 1.0875. Combien de pips a-t-il parcouru ?', options: ['2.5 pips', '25 pips', '250 pips', '0.25 pips'], correct: 1, explanation: '1.0875 - 1.0850 = 0.0025 = 25 pips (1 pip = 0.0001).' },
                { q: 'Avec un levier de 1:100 et un capital de 500€, quelle position pouvez-vous contrôler ?', options: ['500€', '5 000€', '50 000€', '500 000€'], correct: 2, explanation: '500€ × 100 = 50 000€. Le levier multiplie votre pouvoir d\'achat.' },
                { q: 'Le spread sur EUR/USD est de 1.2 pips. Si vous ouvrez une position, vous êtes immédiatement en...', options: ['Profit de 1.2 pips', 'Neutre', 'Perte de 1.2 pips', 'Cela dépend de la direction'], correct: 2, explanation: 'Le spread est le coût immédiat de la transaction. Vous achetez à l\'Ask et vendez au Bid — toujours légèrement défavorable au départ.' },
              ]}
            />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          {/* Section 6 — Pip Calculator */}
          <section id="orders">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>6. Calculateur de Pips Interactif</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Avant d'ouvrir un trade, calculez toujours la valeur monétaire de vos pips. Cela détermine votre risque réel.
            </p>
            <PipCalculator />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          {/* Section 7 — Candlestick Chart */}
          <section id="broker">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>7. Lire un Graphique Forex</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Les chandeliers japonais (candlesticks) encodent 4 informations par période : Ouverture, Haut, Bas, Clôture. Survolez les chandeliers pour voir leurs valeurs.
            </p>
            <InteractiveCandlestick />

            <InlineQuiz
              title="✏️ Quiz final — Module 1"
              questions={[
                { q: 'Quel est le volume quotidien moyen du marché Forex en 2024 ?', options: ['1 trillion $', '3 trillions $', '6,6 trillions $', '20 trillions $'], correct: 2, explanation: 'Le Forex est le plus grand marché financier au monde avec ~6,6 trillions $ échangés quotidiennement.' },
                { q: 'Quelle session offre la meilleure liquidité pour trader EUR/USD ?', options: ['Sydney', 'Tokyo', 'Chevauchement Londres/New York', 'New York seul'], correct: 2, explanation: 'Le chevauchement Londres/New York (13h-17h CET) cumule les deux sessions les plus volumineuses — spreads les plus bas et meilleures opportunités.' },
                { q: 'Un chandelier rouge/baissier signifie que...', options: ['Le prix a baissé pendant la session', 'La clôture est inférieure à l\'ouverture', 'Le marché va continuer à baisser', 'Le volume était faible'], correct: 1, explanation: 'Un chandelier est baissier (rouge) lorsque la clôture est INFÉRIEURE à l\'ouverture. Il ne prédit pas la direction future.' },
              ]}
            />
          </section>

          {/* Next module CTA */}
          <div style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #003087, #0070BA)', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'white' }}>
            <div>
              <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Module suivant</p>
              <h3 style={{ fontWeight: 800, fontSize: '1.125rem', margin: 0 }}>Analyse Technique – Les Bases →</h3>
            </div>
            <Link href="/module/forex-2" style={{ background: 'white', color: '#0070BA', padding: '0.75rem 1.5rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Continuer →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
