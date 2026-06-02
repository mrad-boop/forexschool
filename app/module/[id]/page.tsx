'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { modulesData } from '@/lib/modules-data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Quiz questions per module (free & premium)
const quizByModule: Record<string, { q: string; options: string[]; correct: number }[]> = {
  'forex-1': [
    { q: 'Qu\'est-ce qu\'un "pip" en Forex ?', options: ['La plus petite variation de prix', 'Un type de graphique', 'Un indicateur technique', 'Une devise asiatique'], correct: 0 },
    { q: 'Quel est le volume journalier estimé du marché Forex ?', options: ['1 trillion $', '3 trillions $', '6,6 trillions $', '10 trillions $'], correct: 2 },
    { q: 'Quelle paire est appelée "le câble" ?', options: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF'], correct: 1 },
  ],
  'forex-2': [
    { q: 'Que représente un chandelier "Doji" ?', options: ['Une forte hausse', 'Une forte baisse', 'Une hésitation du marché', 'Un signal d\'achat certain'], correct: 2 },
    { q: 'Que signifie RSI dans l\'analyse technique ?', options: ['Relative Strength Index', 'Real Stock Indicator', 'Range Spread Index', 'Resistance Support Index'], correct: 0 },
    { q: 'Les bandes de Bollinger mesurent quoi ?', options: ['Le volume', 'La tendance', 'La volatilité', 'Le momentum'], correct: 2 },
  ],
  'forex-3': [
    { q: 'Quelle est la règle de risque standard par trade ?', options: ['5-10%', '1-2%', '10-15%', '0.1%'], correct: 1 },
    { q: 'Qu\'est-ce qu\'un Stop Loss ?', options: ['Un ordre de vente automatique à perte maximale définie', 'Un indicateur de tendance', 'Un type de compte', 'Une stratégie de trading'], correct: 0 },
    { q: 'Un ratio Risque/Récompense de 1:3 signifie ?', options: ['Je risque 3 pour gagner 1', 'Je risque 1 pour gagner 3', 'Je risque 3% du capital', 'Je passe 3 trades par jour'], correct: 1 },
  ],
  'forex-4': [
    { q: 'Que signifie SMC en trading ?', options: ['Simple Moving Chart', 'Smart Money Concepts', 'Standard Market Cycle', 'Structured Market Control'], correct: 1 },
    { q: 'Le Price Action trading utilise ?', options: ['Uniquement des indicateurs', 'Les prix purs sans indicateurs', 'Des robots automatiques', 'Uniquement les volumes'], correct: 1 },
    { q: 'Qui a popularisé les concepts ICT ?', options: ['George Soros', 'Warren Buffett', 'Michael Huddleston', 'Paul Tudor Jones'], correct: 2 },
  ],
  'forex-5': [
    { q: 'Que signifie FOMO en trading ?', options: ['Fear Of Missing Out', 'Follow On Market Order', 'Fixed Order Market Option', 'Fast Order Management Operation'], correct: 0 },
    { q: 'Le "Revenge Trading" c\'est ?', options: ['Copier les trades d\'un autre', 'Trader par vengeance après une perte', 'Une stratégie avancée', 'Un type d\'arbitrage'], correct: 1 },
    { q: 'Un journal de trading sert à ?', options: ['Calculer les impôts', 'Analyser et améliorer ses performances', 'Automatiser les trades', 'Partager ses résultats'], correct: 1 },
  ],
  'crypto-1': [
    { q: 'Qui a créé Bitcoin ?', options: ['Vitalik Buterin', 'Elon Musk', 'Satoshi Nakamoto', 'Charles Hoskinson'], correct: 2 },
    { q: 'Qu\'est-ce qu\'une blockchain ?', options: ['Un type de cryptomonnaie', 'Un registre distribué et immuable', 'Une plateforme d\'échange', 'Un portefeuille numérique'], correct: 1 },
    { q: 'Les Smart Contracts sont associés à quelle blockchain ?', options: ['Bitcoin', 'Litecoin', 'Ethereum', 'Ripple'], correct: 2 },
  ],
  'crypto-2': [
    { q: 'Qu\'est-ce que le NVT Ratio mesure ?', options: ['Le volume vs la capitalisation', 'Le prix vs le volume de transaction', 'Le nombre de wallets actifs', 'La difficulté de minage'], correct: 1 },
    { q: 'Glassnode est un outil de ?', options: ['Trading automatique', 'Analyse on-chain', 'Création de tokens', 'Paiements crypto'], correct: 1 },
    { q: 'Le MVRV Z-Score permet de détecter ?', options: ['Les arnaques', 'Les sommets et creux de marché', 'Les meilleurs exchanges', 'La vitesse des transactions'], correct: 1 },
  ],
  'actions-1': [
    { q: 'Que représente le S&P 500 ?', options: ['Les 500 plus grandes entreprises américaines', 'Les 500 plus grandes entreprises mondiales', 'Les 500 actions tech', 'Les 500 actions à dividendes'], correct: 0 },
    { q: 'Sur quelle bourse est coté Apple ?', options: ['NYSE', 'LSE', 'NASDAQ', 'Euronext'], correct: 2 },
    { q: 'Le CAC 40 regroupe combien d\'entreprises françaises ?', options: ['20', '30', '40', '50'], correct: 2 },
  ],
  'portfolio-1': [
    { q: 'La théorie MPT a été créée par ?', options: ['Benjamin Graham', 'Harry Markowitz', 'Warren Buffett', 'John Bogle'], correct: 1 },
    { q: 'La diversification sert à ?', options: ['Maximiser les gains', 'Réduire le risque global', 'Augmenter la volatilité', 'Éviter les impôts'], correct: 1 },
    { q: 'Le rééquilibrage du portefeuille se fait idéalement ?', options: ['Chaque jour', 'Chaque semaine', 'Trimestriellement ou annuellement', 'Jamais'], correct: 2 },
  ],
  'portfolio-2': [
    { q: 'Que signifie le ratio P/E ?', options: ['Profit / Equity', 'Price / Earnings', 'Portfolio / Equity', 'Price / Exchange'], correct: 1 },
    { q: 'Le DCF est une méthode de ?', options: ['Gestion du risque', 'Valorisation par actualisation des flux', 'Analyse technique', 'Sélection de courtier'], correct: 1 },
    { q: 'L\'EV/EBITDA est un ratio de ?', options: ['Liquidité', 'Valorisation d\'entreprise', 'Rentabilité nette', 'Croissance'], correct: 1 },
  ],
  'analyst-1': [
    { q: 'Un modèle financier commence par ?', options: ['La valorisation DCF', 'Les hypothèses et drivers', 'Le bilan projeté', 'L\'analyse de sensibilité'], correct: 1 },
    { q: 'Le LBO est utilisé principalement par ?', options: ['Les particuliers', 'Le Private Equity', 'Les banques centrales', 'Les start-ups'], correct: 1 },
    { q: 'L\'analyse de sensibilité dans un modèle permet de ?', options: ['Trouver des erreurs comptables', 'Tester différents scénarios de performance', 'Calculer les impôts', 'Comparer deux entreprises'], correct: 1 },
  ],
  'annexes-1': [
    { q: 'Que signifie "Alpha" en finance ?', options: ['Le risque du marché', 'Le rendement excédentaire vs le benchmark', 'Un type d\'obligation', 'Une stratégie de couverture'], correct: 1 },
    { q: 'Un "Bull Market" désigne ?', options: ['Un marché baissier', 'Un marché en forte volatilité', 'Un marché haussier (>20%)', 'Un marché stable'], correct: 2 },
    { q: 'La capitalisation boursière se calcule comment ?', options: ['Chiffre d\'affaires × marge', 'Nombre d\'actions × prix de l\'action', 'Actifs totaux − dettes', 'Bénéfice net × P/E'], correct: 1 },
  ],
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [userStatus, setUserStatus] = useState<'free' | 'premium' | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
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
      <Link href="/dashboard" className="btn-primary">Retour au tableau de bord</Link>
    </div>
  )

  const isLocked = module.type === 'premium' && userStatus !== 'premium'
  const quizQuestions = quizByModule[module.id] || []

  const handleQuizSubmit = () => {
    const score = answers.reduce((acc, ans, i) => acc + (ans === quizQuestions[i].correct ? 1 : 0), 0)
    setQuizScore(Math.round((score / quizQuestions.length) * 100))
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFC' }}>
        {/* Breadcrumb */}
        <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '0.75rem 1.5rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 8, fontSize: '0.875rem', color: '#64748B', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Accueil</Link>
            <span>›</span>
            <Link href="/dashboard" style={{ color: '#64748B', textDecoration: 'none' }}>Modules</Link>
            <span>›</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{module.title}</span>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          {/* Module header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: '#E8F4FD', color: '#0070BA', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>{module.category}</span>
              <span className={module.type === 'free' ? 'badge-free' : 'badge-premium'}>
                {module.type === 'free' ? '✓ Gratuit' : '⭐ Premium'}
              </span>
              <span style={{ background: '#F1F5F9', color: '#64748B', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>⏱ {module.duration_hours}h</span>
              <span style={{ background: '#F1F5F9', color: '#64748B', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>📚 Niveau {module.level}</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0F172A', marginBottom: 12 }}>{module.title}</h1>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7 }}>{module.description}</p>
          </div>

          {/* LOCKED */}
          {isLocked ? (
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2rem', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
              <div style={{ fontSize: 64, marginBottom: '1rem' }}>🔒</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>Contenu Premium</h2>
              <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.7 }}>
                Ce module fait partie de l'accès premium. Débloquez l'intégralité du contenu pour <strong>49 USDT</strong>.
              </p>
              <Link href="/payment" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                Débloquer pour 49 USDT
              </Link>
            </div>
          ) : (
            <>
              {/* CONTENT */}
              <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '2rem', lineHeight: 1.8, color: '#334155' }}>
                {module.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: '1.5rem 0 0.75rem' }}>{line.replace('# ', '')}</h1>
                  if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', margin: '1.25rem 0 0.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid #E8F4FD' }}>{line.replace('## ', '')}</h2>
                  if (line.startsWith('- **')) return <li key={i} style={{ marginLeft: 20, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: line.replace('- **', '<strong>').replace('**', '</strong>').substring(2) }}></li>
                  if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 20, marginBottom: 4 }}>{line.substring(2)}</li>
                  if (line.trim() === '') return <br key={i} />
                  return <p key={i} style={{ marginBottom: 8 }}>{line}</p>
                })}
              </div>

              {/* QUIZ — disponible pour tous les modules débloqués */}
              {!showQuiz && quizScore === null && quizQuestions.length > 0 && (
                <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', borderRadius: 20, padding: '2rem', textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>📝</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>Quiz de validation</h3>
                  <p style={{ opacity: 0.85, marginBottom: '1.5rem' }}>
                    {quizQuestions.length} questions · Testez vos connaissances et obtenez votre certificat
                  </p>
                  <button onClick={() => setShowQuiz(true)} style={{ background: 'white', color: '#0070BA', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9375rem' }}>
                    Commencer le quiz
                  </button>
                </div>
              )}

              {showQuiz && quizScore === null && (
                <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', color: '#0F172A' }}>📝 Quiz – {module.title}</h3>
                  {quizQuestions.map((q, qi) => (
                    <div key={qi} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: qi < quizQuestions.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <p style={{ fontWeight: 600, color: '#1E293B', marginBottom: 12 }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {q.options.map((opt, oi) => (
                          <button key={oi} onClick={() => {
                            const newAns = [...answers]
                            newAns[qi] = oi
                            setAnswers(newAns)
                          }}
                            style={{
                              padding: '0.75rem 1rem', border: '2px solid', borderRadius: 10,
                              cursor: 'pointer', textAlign: 'left', fontWeight: 500, transition: 'all 0.15s',
                              background: answers[qi] === oi ? '#E8F4FD' : 'white',
                              borderColor: answers[qi] === oi ? '#0070BA' : '#E2E8F0',
                              color: answers[qi] === oi ? '#0070BA' : '#475569'
                            }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleQuizSubmit}
                    disabled={answers.filter(a => a !== undefined).length < quizQuestions.length}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', opacity: answers.filter(a => a !== undefined).length < quizQuestions.length ? 0.5 : 1 }}>
                    Valider mes réponses ({answers.filter(a => a !== undefined).length}/{quizQuestions.length})
                  </button>
                </div>
              )}

              {quizScore !== null && (
                <div style={{ background: quizScore >= 60 ? 'linear-gradient(135deg, #059669, #10B981)' : 'linear-gradient(135deg, #DC2626, #EF4444)', borderRadius: 20, padding: '2.5rem', textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: 64, marginBottom: '1rem' }}>{quizScore >= 60 ? '🎓' : '📚'}</div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: 8 }}>
                    {quizScore >= 60 ? 'Félicitations !' : 'Continuez vos efforts !'}
                  </h3>
                  <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 8 }}>{quizScore}%</div>
                  <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                    {quizScore >= 60 ? 'Module validé ! Votre certificat est disponible.' : 'Score insuffisant (60% requis). Relisez le module et réessayez.'}
                  </p>
                  {quizScore >= 60 ? (
                    <Link href="/certificate" style={{ background: 'white', color: '#059669', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                      Télécharger mon certificat →
                    </Link>
                  ) : (
                    <button onClick={() => { setShowQuiz(true); setAnswers([]); setQuizScore(null) }}
                      style={{ background: 'white', color: '#DC2626', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      Réessayer le quiz
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
