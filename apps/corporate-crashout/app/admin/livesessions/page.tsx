import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { LiveSessionForm } from '@/components/admin/LiveSessionForm'
import { DeleteLiveSessionButton } from '@/components/admin/DeleteLiveSessionButton'

export default async function AdminLiveSessionsPage() {
  await requireAdmin()

  const sessions = await prisma.liveSession.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Sessions</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Session</h2>
        <LiveSessionForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Sessions</h2>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{session.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">
                    {new Date(session.date).toLocaleString()}
                  </p>
                  {session.description && (
                    <p className="text-sm text-gray-300 mb-2">{session.description}</p>
                  )}
                  <a
                    href={session.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline"
                  >
                    {session.meetingUrl}
                  </a>
                </div>
                <DeleteLiveSessionButton sessionId={session.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

