'use client'
import { useState } from 'react'

interface Question {
  q: string
  options: string[]
  correct: number
  explanation: string
}

interface InlineQuizProps {
  questions: Question[]
  title?: string
}

export default function InlineQuiz({ questions, title = '✏️ Vérifiez votre compréhension' }: InlineQuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})

  const answer = (qi: number, oi: number) => {
    if (revealed[qi]) return
    setAnswers(prev => ({ ...prev, [qi]: oi }))
    setRevealed(prev => ({ ...prev, [qi]: true }))
  }

  const correct = Object.entries(revealed).filter(([qi]) => answers[Number(qi)] === questions[Number(qi)].correct).length
  const total = Object.keys(revealed).length

  return (
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 16, padding: '1.5rem', border: '1px solid #334155', margin: '1.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h4 style={{ color: 'white', fontWeight: 700, margin: 0, fontSize: '1rem' }}>{title}</h4>
        {total > 0 && (
          <span style={{ background: correct === total ? 'rgba(34,197,94,0.2)' : 'rgba(0,112,186,0.2)', color: correct === total ? '#4ADE80' : '#7DD3FC', padding: '0.25rem 0.75rem', borderRadius: 9999, fontSize: '0.8125rem', fontWeight: 700 }}>
            {correct}/{total}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {questions.map((q, qi) => {
          const isRevealed = revealed[qi]
          const chosen = answers[qi]
          const isCorrect = chosen === q.correct

          return (
            <div key={qi} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '1rem', border: '1px solid #1E293B' }}>
              <p style={{ color: '#E2E8F0', fontWeight: 600, marginBottom: 12, fontSize: '0.9375rem' }}>
                {qi + 1}. {q.q}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {q.options.map((opt, oi) => {
                  let bg = 'rgba(255,255,255,0.03)'
                  let border = '#334155'
                  let color = '#94A3B8'

                  if (isRevealed) {
                    if (oi === q.correct) { bg = 'rgba(34,197,94,0.15)'; border = '#22C55E'; color = '#4ADE80' }
                    else if (oi === chosen && !isCorrect) { bg = 'rgba(239,68,68,0.15)'; border = '#EF4444'; color = '#FCA5A5' }
                  } else if (!isRevealed) {
                    bg = 'rgba(255,255,255,0.03)'; border = '#334155'; color = '#94A3B8'
                  }

                  return (
                    <button key={oi} onClick={() => answer(qi, oi)}
                      disabled={isRevealed}
                      style={{
                        padding: '0.625rem 1rem', border: `1.5px solid ${border}`, borderRadius: 8,
                        background: bg, color, textAlign: 'left', cursor: isRevealed ? 'default' : 'pointer',
                        fontSize: '0.875rem', transition: 'all 0.15s', fontWeight: oi === q.correct && isRevealed ? 700 : 400,
                        display: 'flex', alignItems: 'center', gap: 8
                      }}>
                      {isRevealed && oi === q.correct && <span>✓</span>}
                      {isRevealed && oi === chosen && !isCorrect && <span>✗</span>}
                      {opt}
                    </button>
                  )
                })}
              </div>

              {isRevealed && (
                <div style={{ marginTop: '0.75rem', background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 8, padding: '0.75rem', fontSize: '0.875rem', color: isCorrect ? '#86EFAC' : '#FCA5A5' }}>
                  {isCorrect ? '✅' : '💡'} {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
