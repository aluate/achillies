import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { SectionForm } from '@/components/admin/SectionForm'
import { DeleteSectionButton } from '@/components/admin/DeleteSectionButton'

export default async function AdminSectionsPage() {
  await requireAdmin()

  const sections = await prisma.section.findMany({
    include: {
      _count: {
        select: { lessons: true },
      },
    },
    orderBy: { orderIndex: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Content Sections</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Section</h2>
        <SectionForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Sections</h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-gray-400">
                    Order: {section.orderIndex} • {section._count.lessons} lessons
                  </p>
                </div>
                <DeleteSectionButton sectionId={section.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

