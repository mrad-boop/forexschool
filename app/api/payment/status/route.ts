import { NextRequest, NextResponse } from 'next/server'

const BLOCKONOMICS_API = 'https://www.blockonomics.co/api'

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.BLOCKONOMICS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Blockonomics non configuré' }, { status: 500 })
    }

    const address = req.nextUrl.searchParams.get('address')
    if (!address) {
      return NextResponse.json({ error: 'Adresse manquante' }, { status: 400 })
    }

    // Query balance of the address — detects incoming payment
    const res = await fetch(`${BLOCKONOMICS_API}/balance`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ addr: address })
    })

    if (!res.ok) {
      return NextResponse.json({ status: 'pending', confirmed: 0, unconfirmed: 0 })
    }

    const data = await res.json()
    const response = data.response?.[0] || {}
    const confirmed = response.confirmed || 0      // satoshis confirmed
    const unconfirmed = response.unconfirmed || 0  // satoshis in mempool

    let status: 'pending' | 'detected' | 'confirmed' = 'pending'
    if (confirmed > 0) status = 'confirmed'
    else if (unconfirmed > 0) status = 'detected'

    return NextResponse.json({
      status,
      confirmed,
      unconfirmed,
      confirmedBTC: (confirmed / 1e8).toFixed(8),
      unconfirmedBTC: (unconfirmed / 1e8).toFixed(8),
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, status: 'pending' }, { status: 200 })
  }
}
