import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { LessonForm } from '@/components/admin/LessonForm'
import { DeleteLessonButton } from '@/components/admin/DeleteLessonButton'

export default async function AdminLessonsPage() {
  await requireAdmin()

  const sections = await prisma.section.findMany({
    orderBy: { orderIndex: 'asc' },
  })

  const lessons = await prisma.lesson.findMany({
    include: {
      section: true,
    },
    orderBy: [
      { section: { orderIndex: 'asc' } },
      { orderIndex: 'asc' },
    ],
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Lesson</h2>
        <LessonForm sections={sections} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">
                    Section: {lesson.section.title} • Order: {lesson.orderIndex}
                  </p>
                  {lesson.description && (
                    <p className="text-sm text-gray-300 mb-2">{lesson.description}</p>
                  )}
                  <a
                    href={lesson.googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline"
                  >
                    {lesson.googleDriveUrl}
                  </a>
                </div>
                <DeleteLessonButton lessonId={lesson.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

