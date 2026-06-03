import { NextRequest, NextResponse } from 'next/server'

// Blockonomics API: generate a new receiving address for each order
// Docs: https://www.blockonomics.co/views/api.html

const BLOCKONOMICS_API = 'https://www.blockonomics.co/api'

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.BLOCKONOMICS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Blockonomics non configuré. Ajoutez BLOCKONOMICS_API_KEY.' }, { status: 500 })
    }

    const body = await req.json().catch(() => ({}))
    const { userId, email } = body

    // 1. Get current BTC price in USD to convert 49 USDT (~49 USD)
    const priceRes = await fetch(`${BLOCKONOMICS_API}/price?currency=USD`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    const priceData = await priceRes.json()
    const btcPrice = priceData.price || 0
    const amountUSD = 49
    const btcAmount = btcPrice > 0 ? (amountUSD / btcPrice).toFixed(8) : '0'

    // 2. Generate a new BTC receiving address for this order
    const addrRes = await fetch(`${BLOCKONOMICS_API}/new_address`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })

    if (!addrRes.ok) {
      const errText = await addrRes.text()
      return NextResponse.json({ error: 'Erreur génération adresse: ' + errText }, { status: 502 })
    }

    const addrData = await addrRes.json()
    const address = addrData.address

    return NextResponse.json({
      address,
      btcAmount,
      btcPrice,
      amountUSD,
      currency: 'BTC',
      userId: userId || null,
      email: email || null,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur' }, { status: 500 })
  }
}
