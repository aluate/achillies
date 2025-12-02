import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { fulfilled, sessionDate } = body

    await prisma.addOnPurchase.update({
      where: { id: params.id },
      data: {
        fulfilled: fulfilled ?? true,
        sessionDate: sessionDate ? new Date(sessionDate) : undefined,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating add-on purchase:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

