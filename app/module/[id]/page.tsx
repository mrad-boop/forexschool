'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { modulesData } from '@/lib/modules-data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InlineQuiz from '@/components/modules/InlineQuiz'
import ProgressSection from '@/components/modules/ProgressSection'
import RiskCalculator from '@/components/modules/RiskCalculator'
import VideoEmbed from '@/components/modules/VideoEmbed'
import ConceptCard from '@/components/modules/ConceptCard'

// Rich pages exist for these — Next.js routes to them automatically
// This page handles remaining modules generically

const richPages = ['forex-1', 'forex-2', 'crypto-1']

function RenderContent({ text }: { text: string }) {
  return (
    <div style={{ lineHeight: 1.8, color: '#334155' }}>
      {text.split('\n').map((line, i) => {
        if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', margin: '1.75rem 0 0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #E8F4FD' }}>{line.replace('## ', '')}</h2>
        if (line.startsWith('- **')) {
          const parts = line.substring(2).split('**')
          return <li key={i} style={{ marginLeft: 24, marginBottom: 8, listStyleType: 'disc' }}><strong>{parts[1]}</strong>{parts[2] || ''}</li>
        }
        if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 24, marginBottom: 6, listStyleType: 'disc', color: '#475569' }}>{line.substring(2)}</li>
        if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
        const parts = line.split(/\*\*(.*?)\*\*/)
        if (parts.length > 1) return <p key={i} style={{ marginBottom: 10 }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>
        return <p key={i} style={{ marginBottom: 10 }}>{line}</p>
      })}
    </div>
  )
}

const quizByModule: Record<string, { q: string; options: string[]; correct: number; explanation: string }[]> = {
  'forex-3': [
    { q: 'Quelle est la règle de risque standard par trade ?', options: ['5-10%', '1-2%', '10-15%', '0.1%'], correct: 1, explanation: 'Risquer plus de 2% par trade expose votre capital à une série de pertes catastrophique. Avec 1%, même 20 trades perdants consécutifs vous laissent avec 82% de votre capital.' },
    { q: 'Un ratio Risque/Récompense de 1:3 signifie ?', options: ['Je risque 3 pour gagner 1', 'Je risque 1 pour gagner 3', 'Je risque 3% du capital', 'Je passe 3 trades par jour'], correct: 1, explanation: 'Avec un R/R de 1:3, même si vous ne gagnez que 35% de vos trades, vous êtes profitable à long terme.' },
    { q: 'Sans stop loss, un trader risque...', options: ['De gagner moins', 'De liquider son compte sur un seul trade', 'D\'avoir moins d\'opportunités', 'De payer plus de commissions'], correct: 1, explanation: 'Un trade sans stop loss peut théoriquement aller à zéro. Le stop loss EST l\'assurance du trader.' },
  ],
  'forex-4': [
    { q: 'Que signifie SMC en trading ?', options: ['Simple Moving Chart', 'Smart Money Concepts', 'Standard Market Cycle', 'Structured Market Control'], correct: 1, explanation: 'Smart Money Concepts : approche qui cherche à identifier les mouvements des grandes institutions (banques, hedge funds) pour trader dans leur sens.' },
    { q: 'Qu\'est-ce qu\'une zone de liquidité (liquidity pool) ?', options: ['Un compte bancaire de trading', 'Une zone où se concentrent les stop loss des traders retail', 'Un type d\'ETF', 'Une plateforme d\'échange'], correct: 1, explanation: 'Les zones de liquidité sont des niveaux où beaucoup de stop loss sont placés. Les institutionnels "chassent" ces liquidités avant de reprendre la tendance.' },
    { q: 'Le Price Action Trading se base sur ?', options: ['Uniquement des indicateurs', 'Les prix purs sans indicateurs', 'Des robots automatiques', 'L\'actualité économique'], correct: 1, explanation: 'Le Price Action consiste à analyser uniquement le mouvement des prix (graphiques nus). La conviction : tout est déjà dans le prix.' },
  ],
  'portfolio-1': [
    { q: 'Qui a développé la Théorie Moderne du Portefeuille (MPT) ?', options: ['Benjamin Graham', 'Harry Markowitz', 'Warren Buffett', 'John Bogle'], correct: 1, explanation: 'Harry Markowitz a publié sa théorie en 1952. Il a démontré mathématiquement que la diversification réduit le risque sans nécessairement réduire le rendement — il a reçu le Nobel en 1990.' },
    { q: 'La corrélation entre deux actifs est de -1. Cela signifie ?', options: ['Ils évoluent toujours dans le même sens', 'Ils évoluent toujours en sens opposé', 'Ils sont indépendants', 'L\'un est plus volatile que l\'autre'], correct: 1, explanation: 'Une corrélation de -1 = parfaitement inversé. C\'est l\'idéal pour la diversification : quand l\'un baisse, l\'autre monte. Ex : Or et dollar en période de crise.' },
  ],
}

const videoByModule: Record<string, { id: string; title: string; duration: string }> = {
  'forex-3': { id: 'NVkBMVlXl8U', title: 'Money Management et Gestion du Risque en Trading', duration: '20 min' },
  'forex-4': { id: 'YhIu6S2JXRY', title: 'Smart Money Concepts (SMC) — Introduction complète', duration: '28 min' },
  'forex-5': { id: 'D9IEOSzocXo', title: 'Psychologie du Trading — Maîtriser ses émotions', duration: '16 min' },
  'crypto-2': { id: 'RqubKSF3eo8', title: 'Analyse On-Chain Bitcoin avec Glassnode', duration: '24 min' },
  'actions-1': { id: 'p7HKvqRI_Bo', title: 'Introduction à la Bourse pour débutants', duration: '18 min' },
  'portfolio-1': { id: 'DHt8IKDkAoM', title: 'Construire un portefeuille d\'investissement solide', duration: '22 min' },
  'portfolio-2': { id: 'Qpgi6PvpBGg', title: 'Analyse Fondamentale : Lire les états financiers', duration: '25 min' },
  'analyst-1': { id: '8rNiM-XNFjE', title: 'Modélisation Financière Excel — From Scratch', duration: '35 min' },
}

export default function GenericModulePage() {
  const params = useParams()
  const [userStatus, setUserStatus] = useState<'free' | 'premium' | null>(null)
  const supabase = createClient()

  const module = modulesData.find(m => m.id === params.id)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }: { data: { user: any } }) => {
      if (user) {
        const { data } = await supabase.from('users').select('status').eq('id', user.id).single()
        setUserStatus(data?.status || 'free')
      } else {
        setUserStatus(null)
      }
    })
  }, [])

  if (!module) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: '#64748B' }}>Module introuvable.</p>
      <Link href="/dashboard" className="btn-primary">Retour</Link>
    </div>
  )

  const isLocked = module.type === 'premium' && userStatus !== 'premium'
  const showFull = module.type === 'free' || userStatus === 'premium'
  const quiz = quizByModule[module.id] || []
  const video = videoByModule[module.id]
  const m = module as any

  const categoryColors: Record<string, string> = {
    'Forex & Crypto': '#0070BA', 'Marché des Actions': '#7C3AED',
    'Gestion de Portefeuille': '#059669', 'Analyste Financier': '#DC2626', 'Annexes': '#D97706',
  }
  const color = categoryColors[module.category] || '#0070BA'

  const sections = [
    { id: 'intro', title: 'Introduction & Aperçu', duration: '15 min' },
    { id: 'content', title: 'Contenu principal', duration: `${Math.floor(module.duration_hours * 0.6 * 60)} min` },
    { id: 'practical', title: 'Exercices pratiques', duration: `${Math.floor(module.duration_hours * 0.2 * 60)} min` },
    { id: 'quiz', title: 'Quiz de validation', duration: '15 min' },
  ]

  return (
    <>
      <Navbar />
      <main style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`, padding: '2.5rem 1.5rem', color: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-block', marginBottom: 14 }}>← Modules</Link>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[module.type === 'free' ? '✓ Gratuit' : '⭐ Premium', `📚 Niveau ${module.level}`, `⏱ ${module.duration_hours}h`, module.category].map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.18)', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 12, lineHeight: 1.2 }}>{module.title}</h1>
            <p style={{ opacity: 0.88, fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 620 }}>{module.description}</p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {!isLocked && <ProgressSection sections={sections} moduleId={module.id} />}

          {/* Preview always shown */}
          {video && !isLocked && (
            <VideoEmbed videoId={video.id} title={video.title} duration={video.duration} description={`Vidéo d'introduction au module ${module.title}`} />
          )}

          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
            <RenderContent text={m.preview || module.content} />
          </div>

          {showFull && m.preview && (
            <>
              {module.id === 'forex-3' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <RiskCalculator />
                </div>
              )}
              <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
                <RenderContent text={module.content} />
              </div>
            </>
          )}

          {isLocked && (
            <div style={{ background: `linear-gradient(135deg, ${color}EE, ${color})`, borderRadius: 20, padding: '2.5rem 2rem', textAlign: 'center', color: 'white', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 48, marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.375rem', marginBottom: 10 }}>Continuez avec l'accès Premium</h3>
              <p style={{ opacity: 0.88, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 480, margin: '0 auto 1.25rem' }}>
                Ce module contient encore <strong>{module.duration_hours}h de contenu</strong>, des exercices pratiques, des outils interactifs et le quiz de certification.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '1.25rem 0' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900 }}>49 USDT</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: 9999, textDecoration: 'line-through', opacity: 0.7, fontSize: '0.875rem' }}>499 USDT</span>
              </div>
              <Link href="/payment" style={{ background: 'white', color, padding: '0.875rem 2rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', display: 'inline-block', fontSize: '1rem' }}>
                🚀 Débloquer maintenant
              </Link>
              <p style={{ marginTop: '1rem', fontSize: '0.8125rem', opacity: 0.7 }}>✓ Paiement unique · ✓ Accès à vie · ✓ 12 modules + certificats</p>
            </div>
          )}

          {showFull && quiz.length > 0 && (
            <InlineQuiz
              title={`📝 Quiz de validation — ${module.title}`}
              questions={quiz}
            />
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
