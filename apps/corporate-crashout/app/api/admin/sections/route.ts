import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { title, orderIndex } = body

    if (!title || orderIndex === undefined) {
      return NextResponse.json({ error: 'Title and orderIndex are required' }, { status: 400 })
    }

    const section = await prisma.section.create({
      data: {
        title,
        orderIndex: parseInt(orderIndex),
      },
    })

    return NextResponse.json(section)
  } catch (error: any) {
    console.error('Error creating section:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()

    const url = new URL(request.url)
    const sectionId = url.searchParams.get('id')

    if (!sectionId) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 })
    }

    await prisma.section.delete({
      where: { id: sectionId },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting section:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

