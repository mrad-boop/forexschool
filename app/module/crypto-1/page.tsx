'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CryptoMarketCycle from '@/components/modules/CryptoMarketCycle'
import ConceptCard from '@/components/modules/ConceptCard'
import InlineQuiz from '@/components/modules/InlineQuiz'
import ProgressSection from '@/components/modules/ProgressSection'
import VideoEmbed from '@/components/modules/VideoEmbed'

const sections = [
  { id: 'satoshi', title: "La révolution Bitcoin", duration: '20 min' },
  { id: 'blockchain', title: 'Comment fonctionne la Blockchain ?', duration: '25 min' },
  { id: 'bitcoin', title: 'Bitcoin — l\'or numérique', duration: '20 min' },
  { id: 'ethereum', title: 'Ethereum et Smart Contracts', duration: '25 min' },
  { id: 'ecosystem', title: "L'écosystème crypto en 2024", duration: '30 min' },
  { id: 'cycle', title: 'Les cycles de marché', duration: '20 min' },
  { id: 'security', title: 'Sécuriser ses cryptos', duration: '20 min' },
]

const cryptoConcepts = [
  { term: 'Blockchain', icon: '⛓️', definition: 'Registre distribué immuable partagé entre des milliers de nœuds. Chaque bloc est lié cryptographiquement au précédent.', example: 'Bitcoin : +800 000 blocs depuis 2009, jamais modifiés.' },
  { term: 'Halving', icon: '✂️', definition: 'Événement Bitcoin tous les ~4 ans divisant par 2 la récompense des mineurs. Réduit l\'offre de nouveaux BTC.', example: 'Halving 2024 : récompense passée de 6.25 à 3.125 BTC/bloc.' },
  { term: 'Smart Contract', icon: '📝', definition: 'Programme autonome sur blockchain qui s\'exécute automatiquement selon des conditions prédéfinies. Pas d\'intermédiaire.', example: 'Uniswap : 100% automatisé, aucun employé, milliards $ d\'échanges.' },
  { term: 'DeFi', icon: '🏦', definition: 'Finance Décentralisée. Protocoles financiers (prêt, emprunt, échange) sur blockchain, sans banque ni intermédiaire.', example: 'Aave : empruntez des USDT en donnant du BTC en garantie.' },
  { term: 'Stablecoin', icon: '⚓', definition: 'Cryptomonnaie dont la valeur est arrimée à un actif stable (USD, EUR, or). Pont entre crypto et monde réel.', example: 'USDT (Tether), USDC : 1 token = ~1 dollar.' },
  { term: 'Wallet', icon: '👛', definition: 'Portefeuille crypto. Stocke vos clés privées qui prouvent la propriété de vos actifs. HOT (en ligne) ou COLD (hors ligne).', example: 'Ledger Nano = hardware wallet, stockage offline ultra-sécurisé.' },
]

export default function Crypto1Page() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>

        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1a1a2e 100%)', padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: 14 }}>← Modules</Link>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {['✓ Gratuit', '📚 Niveau 1', '⏱ 5h de contenu', '7 sections'].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.12)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12 }}>Introduction aux Cryptomonnaies</h1>
            <p style={{ opacity: 0.85, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>
              Bitcoin, Ethereum, DeFi, NFT, Web3 — comprenez la révolution financière du XXIe siècle et ses opportunités d'investissement.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          <ProgressSection sections={sections} moduleId="crypto-1" />

          <section id="satoshi">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>1. La Révolution Satoshi</h2>
            <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', border: '1px solid #1E293B' }}>
              <p style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution."
              </p>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginTop: 12, marginBottom: 0 }}>— Satoshi Nakamoto, Bitcoin Whitepaper, 31 octobre 2008</p>
            </div>
            <VideoEmbed videoId="bBC-nXj3Ng4" title="Bitcoin expliqué en 3 minutes" duration="3 min" description="La vidéo de référence pour comprendre Bitcoin simplement." />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="blockchain">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>2. Comment fonctionne la Blockchain ?</h2>

            {/* Animated blockchain visual */}
            <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: 0, alignItems: 'center', minWidth: 600 }}>
                {['Bloc #820001', 'Bloc #820002', 'Bloc #820003', 'Bloc #820004'].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 10, padding: '1rem', minWidth: 130, position: 'relative' }}>
                      <div style={{ color: '#0070BA', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', marginBottom: 6 }}>{b}</div>
                      <div style={{ color: '#475569', fontSize: '0.7rem', fontFamily: 'monospace', marginBottom: 4 }}>Hash: 0x{Math.random().toString(16).substr(2, 8)}...</div>
                      <div style={{ color: '#475569', fontSize: '0.7rem', fontFamily: 'monospace', marginBottom: 4 }}>Prev: 0x{Math.random().toString(16).substr(2, 8)}...</div>
                      <div style={{ color: '#22C55E', fontSize: '0.7rem', fontFamily: 'monospace' }}>Tx: {Math.floor(Math.random() * 2000 + 1000)}</div>
                    </div>
                    {i < 3 && <div style={{ width: 40, height: 2, background: '#0070BA', position: 'relative' }}>
                      <div style={{ position: 'absolute', right: -4, top: -4, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid #0070BA' }} />
                    </div>}
                  </div>
                ))}
              </div>
              <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '1rem', marginBottom: 0 }}>
                ⛓️ Chaque bloc contient le hash du bloc précédent — toute modification serait immédiatement détectée par le réseau.
              </p>
            </div>

            <InlineQuiz
              title="✏️ Comprendre la Blockchain"
              questions={[
                { q: 'Pourquoi est-il pratiquement impossible de modifier des données passées sur la blockchain ?', options: ['C\'est protégé par un mot de passe', 'Chaque bloc est lié au précédent par cryptographie et validé par des milliers de nœuds', 'La blockchain est centralisée par Satoshi', 'Les données s\'auto-détruisent si modifiées'], correct: 1, explanation: 'Chaque bloc contient le hash du bloc précédent. Modifier un bloc nécessite de recalculer TOUS les blocs suivants sur TOUS les nœuds du réseau — une tâche impossible en pratique.' },
              ]}
            />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="bitcoin">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>3. Bitcoin — L'Or Numérique</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Offre maximale', value: '21 000 000', sub: 'BTC — jamais plus', icon: '🔒', color: '#F59E0B' },
                { label: 'Prochain halving', value: '2028', sub: '~récompense 1.5625 BTC', icon: '✂️', color: '#0070BA' },
                { label: 'En circulation', value: '~19.7M', sub: 'BTC minés', icon: '⛏️', color: '#22C55E' },
                { label: 'Nœuds actifs', value: '50 000+', sub: 'dans le monde entier', icon: '🌍', color: '#7C3AED' },
              ].map(s => (
                <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '1.25rem', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#0F172A', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Halving timeline */}
            <div style={{ background: '#0F172A', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#94A3B8', fontWeight: 700, marginBottom: '1rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>📅 Historique des Halvings & Impact sur le prix</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { year: '2012', reward: '25 BTC', price: '$12 → $1 100', pct: '+9 000%', width: 20 },
                  { year: '2016', reward: '12.5 BTC', price: '$650 → $19 800', pct: '+3 000%', width: 50 },
                  { year: '2020', reward: '6.25 BTC', price: '$8 700 → $69 000', pct: '+693%', width: 75 },
                  { year: '2024', reward: '3.125 BTC', price: 'En cours...', pct: '?', width: 30 },
                ].map(h => (
                  <div key={h.year} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ color: '#94A3B8', fontSize: '0.8125rem', fontWeight: 700, width: 40, flexShrink: 0 }}>{h.year}</div>
                    <div style={{ flex: 1, height: 28, background: '#1E293B', borderRadius: 6, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${h.width}%`, background: 'linear-gradient(90deg, #F59E0B, #FBBF24)', borderRadius: 6, transition: 'width 1s', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                        <span style={{ color: '#7C2D12', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{h.pct}</span>
                      </div>
                    </div>
                    <div style={{ color: '#64748B', fontSize: '0.75rem', width: 160, flexShrink: 0 }}>{h.price}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '1rem', marginBottom: 0 }}>* Performances passées ne garantissent pas les résultats futurs.</p>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="cycle">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>4. Les Cycles de Marché Crypto</h2>
            <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Le marché crypto suit des cycles de 4 ans corrélés au halving Bitcoin. Comprendre dans quelle phase on se trouve est essentiel pour investir intelligemment.
            </p>
            <CryptoMarketCycle />
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '2rem 0' }} />

          <section id="security">
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '1rem' }}>5. Concepts Clés à Retenir</h2>
            <ConceptCard concepts={cryptoConcepts} />

            <InlineQuiz
              title="✏️ Quiz Final — Cryptomonnaies"
              questions={[
                { q: 'Que signifie "Not your keys, not your coins" ?', options: ['Il faut changer de mot de passe régulièrement', 'Si vous ne contrôlez pas vos clés privées, vous ne contrôlez pas vraiment vos cryptos', 'Il faut toujours utiliser un exchange centralisé', 'Les cryptos doivent rester en dollars'], correct: 1, explanation: 'Si vos cryptos sont sur un exchange (Binance, FTX...), vous ne possédez qu\'une créance. L\'exchange peut faire faillite (FTX 2022). Seules les clés privées = vraie propriété.' },
                { q: 'Combien de Bitcoin existeront au maximum ?', options: ['10 millions', '21 millions', '100 millions', 'Illimité'], correct: 1, explanation: 'Satoshi a codé une limite absolue de 21 millions de BTC. ~1.3 millions restent à miner (sur ~120 ans). Cette rareté est algorithmique et immuable.' },
                { q: 'Ethereum se distingue de Bitcoin car il permet...', options: ['Des transactions plus rapides uniquement', 'Des smart contracts et applications décentralisées (DApps)', 'Plus d\'anonymat', 'Une meilleure réserve de valeur'], correct: 1, explanation: 'Ethereum est une plateforme programmable. Les smart contracts permettent DeFi, NFTs, DAOs — des innovations impossibles sur Bitcoin.' },
              ]}
            />
          </section>

          <div style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'white' }}>
            <div>
              <p style={{ opacity: 0.75, fontSize: '0.875rem', marginBottom: 4 }}>Module suivant (Premium)</p>
              <h3 style={{ fontWeight: 800, fontSize: '1.125rem', margin: 0 }}>Analyse On-Chain & Sentiment</h3>
            </div>
            <Link href="/payment" style={{ background: '#F59E0B', color: '#7C2D12', padding: '0.75rem 1.5rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none' }}>
              Débloquer — 49 USDT 🔓
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
