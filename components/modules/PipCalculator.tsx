'use client'
import { useState } from 'react'

export default function PipCalculator() {
  const [pair, setPair] = useState('EUR/USD')
  const [lots, setLots] = useState('1')
  const [pips, setPips] = useState('50')
  const [accountCurrency] = useState('USD')

  const pipValues: Record<string, number> = {
    'EUR/USD': 10, 'GBP/USD': 10, 'AUD/USD': 10, 'NZD/USD': 10,
    'USD/JPY': 9.09, 'USD/CHF': 10.86, 'USD/CAD': 7.69,
    'EUR/GBP': 12.5, 'EUR/JPY': 9.09,
  }

  const pipVal = pipValues[pair] || 10
  const lotSize = parseFloat(lots) || 0
  const pipCount = parseFloat(pips) || 0
  const profit = (pipVal * lotSize * pipCount).toFixed(2)
  const loss = (-pipVal * lotSize * pipCount).toFixed(2)

  return (
    <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 16, padding: '1.5rem', border: '1px solid #334155' }}>
      <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        🧮 Calculateur de Pips Interactif
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paire de devises</label>
          <select value={pair} onChange={e => setPair(e.target.value)}
            style={{ width: '100%', padding: '0.625rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.9375rem' }}>
            {Object.keys(pipValues).map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Taille (lots)</label>
          <input type="number" value={lots} onChange={e => setLots(e.target.value)} min="0.01" step="0.01"
            style={{ width: '100%', padding: '0.625rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.9375rem', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre de pips</label>
          <input type="number" value={pips} onChange={e => setPips(e.target.value)} min="1"
            style={{ width: '100%', padding: '0.625rem', background: '#0F172A', border: '1px solid #334155', borderRadius: 8, color: 'white', fontSize: '0.9375rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
          <div style={{ color: '#86EFAC', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Profit potentiel</div>
          <div style={{ color: '#22C55E', fontSize: '1.75rem', fontWeight: 900 }}>+${profit}</div>
          <div style={{ color: '#4ADE80', fontSize: '0.75rem', marginTop: 4 }}>{pips} pips × {lotSize} lot{lotSize > 1 ? 's' : ''}</div>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
          <div style={{ color: '#FCA5A5', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Perte potentielle</div>
          <div style={{ color: '#EF4444', fontSize: '1.75rem', fontWeight: 900 }}>${loss}</div>
          <div style={{ color: '#F87171', fontSize: '0.75rem', marginTop: 4 }}>Valeur pip: ${pipVal}/lot</div>
        </div>
      </div>

      <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
        ℹ️ Valeurs indicatives pour un compte en USD. Varient selon le taux de change actuel.
      </p>
    </div>
  )
}
