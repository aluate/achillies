import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { userId, access } = body

    if (!userId || !access || !['PENDING', 'GRANTED'].includes(access)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: userId },
      data: { tradingViewAccess: access },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating TradingView access:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

