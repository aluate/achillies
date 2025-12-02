import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { date, title, description, meetingUrl } = body

    if (!date || !title || !meetingUrl) {
      return NextResponse.json(
        { error: 'date, title, and meetingUrl are required' },
        { status: 400 }
      )
    }

    const session = await prisma.liveSession.create({
      data: {
        date: new Date(date),
        title,
        description: description || null,
        meetingUrl,
      },
    })

    return NextResponse.json(session)
  } catch (error: any) {
    console.error('Error creating live session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

