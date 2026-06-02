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

const sections = [
  { id: 'intro', title: "Principes de l'analyse technique", duration: '15 min' },
  { id: 'candles', title: 'Chandeliers japonais en détail', duration: '30 min' },
  { id: 'sr', title: 'Supports et Résistances', duration: '25 min' },
  { id: 'trends', title: 'Les tendances de marché', duration: '20 min' },
  { id: 'indicators', title: 'Indicateurs techniques clés', duration: '35 min' },
  { id: 'patterns', title: 'Figures chartistes', duration: '30 min' },
  { id: 'timeframes', title: 'Analyse multi-timeframes', duration: '25 min' },
]

const indicatorConcepts = [
  { term: 'SMA', icon: '📉', definition: 'Simple Moving Average. Moyenne arithmétique des prix sur N périodes. Réagit lentement aux changements.', example: 'SMA20 = somme des 20 dernières clôtures ÷ 20' },
  { term: 'EMA', icon: '📈', definition: 'Exponential Moving Average. Donne plus de poids aux prix récents. Plus réactive que la SMA.', example: 'EMA9 réagit 2× plus vite que SMA20 aux nouvelles données' },
  { term: 'RSI', icon: '🌡️', definition: 'Relative Strength Index. Oscillateur 0-100. >70 = suracheté, <30 = survendu.', example: 'RSI = 75 → marché suracheté, possible correction imminente' },
  { term: 'MACD', icon: '📊', definition: 'Moving Average Convergence Divergence. Mesure la relation entre deux EMA (12 et 26).', example: 'Croisement MACD/Signal à la hausse → signal d\'achat' },
  { term: 'Bollinger', icon: '🎯', definition: 'Bandes à ±2 écarts-types autour d\'une SMA20. Mesure la volatilité du marché.', example: 'Bandes resserrées (squeeze) → explosion de volatilité imminente' },
  { term: 'Golden Cross', icon: '✨', definition: 'MA50 croise MA200 à la HAUSSE. Signal haussier majeur de long terme utilisé par les institutionnels.', example: 'Golden Cross Bitcoin en 2020 → +400% dans les 12 mois suivants' },
]

export default function Forex2Page() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>

        <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>← Modules</Link>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {['✓ Gratuit', '📚 Niveau 1', '⏱ 6h de contenu', '7 sections'].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12 }}>Analyse Technique – Les Bases</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Apprenez à lire les graphiques comme un professionnel. Chandeliers japonais, supports, résistances, indicateurs — les outils fondamentaux de tout trader.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          <ProgressSection sections={sections} moduleId="forex-2" />

          <section id="intro">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>1. L'Analyse Technique en pratique</h2>
            <VideoEmbed videoId="jm5Q7u6hbXE" title="Analyse technique complète pour les débutants" duration="18 min" description="Les fondamentaux de l'AT expliqués avec des exemples réels sur les marchés." />
            <div style={{ background: '#E8F4FD', border: '1px solid #BAE6FD', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 8 }}>💡 Les 3 postulats de l'analyse technique</p>
              {['Le marché intègre toute l\'information — les prix reflètent déjà tout ce qui est connu.', 'Les prix évoluent en tendances — ils ne bougent pas aléatoirement.', 'L\'histoire se répète — les patterns se reproduisent car la psychologie humaine est constante.'].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                  <span style={{ color: '#0070BA', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#0369A1', fontSize: '0.9375rem' }}>{p}</span>
                </div>
              ))}
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="candles">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>2. Les Chandeliers Japonais</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>Chaque chandelier encode 4 prix : Ouverture (O), Haut (H), Bas (L), Clôture (C). Survolez les chandeliers ci-dessous pour voir leurs valeurs OHLC.</p>
            <InteractiveCandlestick />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { name: 'Doji', icon: '➕', color: '#F59E0B', desc: 'Corps minimal, mèches longues. Indécision parfaite entre acheteurs et vendeurs. Retournement potentiel.' },
                { name: 'Marteau', icon: '🔨', color: '#22C55E', desc: 'Corps en haut, longue mèche inférieure. Signal HAUSSIER après une baisse. Les acheteurs ont repris le contrôle.' },
                { name: 'Étoile filante', icon: '⭐', color: '#EF4444', desc: 'Corps en bas, longue mèche supérieure. Signal BAISSIER après une hausse. Rejet au niveau de résistance.' },
                { name: 'Engulfing', icon: '🕯️', color: '#0070BA', desc: 'Grand chandelier qui avale le précédent. Pattern de retournement très fiable, bullish ou bearish selon contexte.' },
              ].map(p => (
                <div key={p.name} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: `2px solid ${p.color}30` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <span style={{ fontWeight: 700, color: p.color }}>{p.name}</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>

            <InlineQuiz
              title="✏️ Reconnaître les chandeliers"
              questions={[
                { q: 'Un chandelier avec un corps minimal et des mèches très longues des deux côtés s\'appelle ?', options: ['Marteau', 'Doji', 'Marubozu', 'Engulfing'], correct: 1, explanation: 'Le Doji a un corps quasi-nul (ouverture ≈ clôture) avec des mèches longues. Il symbolise une indécision totale du marché.' },
                { q: 'Un chandelier "Bullish Engulfing" est un signal...', options: ['Baissier (vente)', 'Neutre', 'Haussier (achat)', 'De continuation'], correct: 2, explanation: 'Le Bullish Engulfing (haussier) avale le chandelier baissier précédent — les acheteurs ont pris le contrôle et inversé la tendance.' },
              ]}
            />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="sr">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>3. Supports et Résistances</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Les supports et résistances sont les niveaux où le prix a historiquement réagi. Activez/désactivez les niveaux et observez les rebonds.
            </p>
            <SupportResistanceDemo />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: 8 }}>✅ Support</div>
                <p style={{ color: '#166534', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>Zone où la demande est suffisamment forte pour stopper une baisse. Le prix "rebondit" à la hausse depuis ce niveau.</p>
              </div>
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: 8 }}>🚧 Résistance</div>
                <p style={{ color: '#991B1B', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>Zone où l'offre est suffisamment forte pour stopper une hausse. Le prix est "rejeté" à la baisse depuis ce niveau.</p>
              </div>
            </div>

            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, color: '#9A3412', marginBottom: 8 }}>⚡ La règle du Pivot — Essentielle !</p>
              <p style={{ color: '#9A3412', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                Quand un support est <strong>cassé</strong>, il devient résistance. Quand une résistance est <strong>franchie</strong>, elle devient support. Ce phénomène se produit sur tous les marchés et tous les timeframes — c'est l'une des observations les plus fiables de l'analyse technique.
              </p>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="indicators">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>4. Les Indicateurs Techniques</h2>
            <ConceptCard concepts={indicatorConcepts} />

            <VideoEmbed videoId="eynxyoKgpng" title="RSI, MACD et Bollinger : comment les utiliser correctement" duration="22 min" description="Explication visuelle des 3 indicateurs les plus utilisés par les traders professionnels." />

            <InlineQuiz
              title="✏️ Quiz — Indicateurs techniques"
              questions={[
                { q: 'Un RSI à 75 signifie que le marché est...', options: ['Survendu — achetez !', 'Neutre', 'Suracheté — méfiez-vous', 'En tendance baissière'], correct: 2, explanation: 'RSI > 70 = zone de surachat. Le marché a peut-être monté trop vite et une correction est possible. Ce n\'est pas un signal de vente automatique, mais un avertissement.' },
                { q: 'Un "Golden Cross" se produit quand...', options: ['Le RSI passe 50', 'La MA50 croise la MA200 à la hausse', 'Le prix touche la bande supérieure de Bollinger', 'Le MACD passe à zéro'], correct: 1, explanation: 'Le Golden Cross (MA50 croise MA200 à la hausse) est un signal haussier de long terme très suivi par les institutionnels.' },
                { q: 'Des bandes de Bollinger très resserrées (squeeze) indiquent...', options: ['Un marché sans tendance', 'Une faible volatilité qui précède une explosion', 'Un signal de vente', 'Une tendance forte'], correct: 1, explanation: 'Le "Bollinger Squeeze" signale une compression de volatilité. Une forte expansion de prix est imminente — dans un sens ou dans l\'autre.' },
              ]}
            />
          </section>

          <div style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #1E293B, #334155)', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'white' }}>
            <div>
              <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Module suivant (Premium)</p>
              <h3 style={{ fontWeight: 800, fontSize: '1.125rem', margin: 0 }}>Gestion du Risque & Money Management</h3>
            </div>
            <Link href="/payment" style={{ background: '#F59E0B', color: '#7C2D12', padding: '0.75rem 1.5rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Débloquer — 49 USDT 🔓
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
