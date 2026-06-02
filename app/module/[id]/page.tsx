'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { modulesData } from '@/lib/modules-data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    supabase.auth.getUser().then(async ({ data: { user } }) => {
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

  const quizQuestions = [
    { q: 'Quelle est la définition correcte d\'un "pip" en Forex ?', options: ['La plus petite variation de prix', 'Un type de graphique', 'Une devise asiatique', 'Un indicateur technique'], correct: 0 },
    { q: 'Quel est l\'indice boursier américain le plus large ?', options: ['Dow Jones', 'NASDAQ 100', 'S&P 500', 'Russell 2000'], correct: 2 },
    { q: 'Quelle est la règle de gestion du risque standard en trading ?', options: ['Ne jamais utiliser de stop loss', 'Risquer 10% par trade', 'Risquer max 1-2% du capital par trade', 'Doubler après chaque perte'], correct: 2 },
  ]

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
              <span style={{ background: '#E8F4FD', color: '#0070BA', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 600 }}>
                {module.category}
              </span>
              <span className={module.type === 'free' ? 'badge-free' : 'badge-premium'}>
                {module.type === 'free' ? '✓ Gratuit' : '⭐ Premium'}
              </span>
              <span style={{ background: '#F1F5F9', color: '#64748B', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem' }}>
                ⏱ {module.duration_hours}h
              </span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0F172A', marginBottom: 12 }}>
              {module.title}
            </h1>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7 }}>{module.description}</p>
          </div>

          {isLocked ? (
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2rem', textAlign: 'center', border: '2px dashed #E2E8F0' }}>
              <div style={{ fontSize: 64, marginBottom: '1rem' }}>🔒</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: 8 }}>
                Contenu Premium
              </h2>
              <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.7 }}>
                Ce module fait partie de l'accès premium. Débloquez l'intégralité du contenu pour <strong>49 USDT</strong>.
              </p>
              <Link href="/payment" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
                Débloquer pour 49 USDT
              </Link>
            </div>
          ) : (
            <>
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

              {!showQuiz && quizScore === null && (
                <div style={{ background: 'linear-gradient(135deg, #003087, #0070BA)', borderRadius: 20, padding: '2rem', textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>📝</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>Quiz de validation</h3>
                  <p style={{ opacity: 0.85, marginBottom: '1.5rem' }}>Testez vos connaissances et obtenez votre certificat</p>
                  <button onClick={() => setShowQuiz(true)} style={{ background: 'white', color: '#0070BA', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9375rem' }}>
                    Commencer le quiz
                  </button>
                </div>
              )}

              {showQuiz && quizScore === null && (
                <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', color: '#0F172A' }}>📝 Quiz – {module.title}</h3>
                  {quizQuestions.map((q, qi) => (
                    <div key={qi} style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontWeight: 600, color: '#1E293B', marginBottom: 12 }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {q.options.map((opt, oi) => (
                          <button key={oi} onClick={() => {
                            const newAns = [...answers]
                            newAns[qi] = oi
                            setAnswers(newAns)
                          }}
                            style={{
                              padding: '0.75rem 1rem', border: '2px solid', borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontWeight: 500, transition: 'all 0.15s',
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
                  <button onClick={handleQuizSubmit} disabled={answers.length < quizQuestions.length}
                    className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', opacity: answers.length < quizQuestions.length ? 0.5 : 1 }}>
                    Valider mes réponses
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
                    {quizScore >= 60 ? 'Vous avez validé ce module ! Votre certificat est disponible.' : 'Score insuffisant. Relisez le module et réessayez.'}
                  </p>
                  {quizScore >= 60 && (
                    <Link href="/certificate" style={{ background: 'white', color: '#059669', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
                      Télécharger mon certificat →
                    </Link>
                  )}
                  {quizScore < 60 && (
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
