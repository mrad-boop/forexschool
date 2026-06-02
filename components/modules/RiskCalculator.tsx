'use client'
import { useState } from 'react'

export default function RiskCalculator() {
  const [capital, setCapital] = useState('10000')
  const [riskPct, setRiskPct] = useState('1')
  const [slPips, setSlPips] = useState('30')
  const [pair, setPair] = useState('EUR/USD')

  const pipValues: Record<string, number> = {
    'EUR/USD': 10, 'GBP/USD': 10, 'AUD/USD': 10,
    'USD/JPY': 9.09, 'USD/CHF': 10.86, 'USD/CAD': 7.69,
  }

  const cap = parseFloat(capital) || 0
  const risk = parseFloat(riskPct) || 1
  const sl = parseFloat(slPips) || 1
  const pipVal = pipValues[pair] || 10

  const riskAmount = (cap * risk / 100)
  const lotSize = riskAmount / (sl * pipVal)
  const rrTargets = [1, 2, 3].map(r => ({
    ratio: r,
    tpPips: sl * r,
    profit: (riskAmount * r).toFixed(2)
  }))

  return (
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 16, padding: '1.5rem', border: '1px solid #334155' }}>
      <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        🛡️ Calculateur de Risque & Position
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Capital ($)', value: capital, set: setCapital, type: 'number' },
          { label: 'Risque (%)', value: riskPct, set: setRiskPct, type: 'number', max: '5' },
          { label: 'Stop Loss (pips)', value: slPips, set: setSlPips, type: 'number' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase' }}>{f.label}</label>
            <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)}
              style={{ width: '100%', padding: '0.625rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.9375rem', boxSizing: 'border-box' }} />
          </div>
        ))}
        <div>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase' }}>Paire</label>
          <select value={pair} onChange={e => setPair(e.target.value)}
            style={{ width: '100%', padding: '0.625rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.9375rem' }}>
            {Object.keys(pipValues).map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Result */}
      <div style={{ background: 'rgba(0,112,186,0.15)', border: '1px solid rgba(0,112,186,0.4)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#7DD3FC', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>MONTANT RISQUÉ</div>
            <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 900 }}>${riskAmount.toFixed(2)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#7DD3FC', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>TAILLE DE POSITION</div>
            <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 900 }}>{lotSize.toFixed(2)} lots</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#7DD3FC', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>STOP LOSS</div>
            <div style={{ color: '#EF4444', fontSize: '1.5rem', fontWeight: 900 }}>{slPips} pips</div>
          </div>
        </div>
      </div>

      {/* RR Targets */}
      <div>
        <p style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Objectifs selon le ratio Risque/Récompense</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {rrTargets.map(t => (
            <div key={t.ratio} style={{
              flex: 1, background: t.ratio === 2 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${t.ratio === 2 ? 'rgba(34,197,94,0.4)' : '#334155'}`,
              borderRadius: 10, padding: '0.75rem', textAlign: 'center'
            }}>
              <div style={{ color: '#94A3B8', fontSize: '0.7rem', fontWeight: 700 }}>1:{t.ratio}</div>
              <div style={{ color: '#22C55E', fontSize: '1rem', fontWeight: 800 }}>+${t.profit}</div>
              <div style={{ color: '#475569', fontSize: '0.7rem' }}>TP: {t.tpPips} pips</div>
              {t.ratio === 2 && <div style={{ color: '#4ADE80', fontSize: '0.65rem', marginTop: 4 }}>✓ Recommandé</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
