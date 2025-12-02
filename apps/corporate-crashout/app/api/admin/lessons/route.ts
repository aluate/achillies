import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { sectionId, title, description, googleDriveUrl, orderIndex } = body

    if (!sectionId || !title || !googleDriveUrl || orderIndex === undefined) {
      return NextResponse.json(
        { error: 'sectionId, title, googleDriveUrl, and orderIndex are required' },
        { status: 400 }
      )
    }

    const lesson = await prisma.lesson.create({
      data: {
        sectionId,
        title,
        description: description || null,
        googleDriveUrl,
        orderIndex: parseInt(orderIndex),
      },
    })

    return NextResponse.json(lesson)
  } catch (error: any) {
    console.error('Error creating lesson:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

