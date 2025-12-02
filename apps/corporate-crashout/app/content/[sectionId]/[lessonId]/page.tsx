import { requireActiveSubscription } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function LessonPage({
  params,
}: {
  params: { sectionId: string; lessonId: string }
}) {
  await requireActiveSubscription()

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { section: true },
  })

  if (!lesson || lesson.sectionId !== params.sectionId) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="mb-4 text-sm text-gray-400">
        <a href="/dashboard" className="hover:text-white">Dashboard</a>
        {' / '}
        <a href="/content" className="hover:text-white">Content</a>
        {' / '}
        <span>{lesson.section.title}</span>
        {' / '}
        <span className="text-white">{lesson.title}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

      {lesson.description && (
        <p className="text-gray-300 mb-6">{lesson.description}</p>
      )}

      <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
        <h2 className="text-xl font-semibold mb-4">Content</h2>
        <div className="space-y-4">
          {lesson.googleDriveUrl ? (
            <div>
              <p className="text-gray-300 mb-4">
                This lesson contains content hosted on Google Drive. Click the link below to access:
              </p>
              <a
                href={lesson.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Open Content on Google Drive
              </a>
            </div>
          ) : (
            <p className="text-gray-400">Content link not available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

