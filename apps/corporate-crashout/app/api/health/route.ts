import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check database connectivity
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      database: 'connected',
      userCount,
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}

