import { requireTier } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export default async function LiveSessionsPage() {
  await requireTier(2)

  const sessions = await prisma.liveSession.findMany({
    orderBy: {
      date: 'asc',
    },
  })

  const upcoming = sessions.filter((s) => new Date(s.date) > new Date())
  const past = sessions.filter((s) => new Date(s.date) <= new Date()).reverse()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Live Trading Sessions</h1>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcoming.map((session) => (
              <div key={session.id} className="border border-blue-600 rounded-lg p-6 bg-gray-900/50">
                <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                <p className="text-gray-400 mb-2">
                  {new Date(session.date).toLocaleString()}
                </p>
                {session.description && (
                  <p className="text-gray-300 mb-4">{session.description}</p>
                )}
                <a
                  href={session.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Join Session
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Session Archives</h2>
          <div className="space-y-4">
            {past.map((session) => (
              <div key={session.id} className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
                <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                <p className="text-gray-400 mb-2">
                  {new Date(session.date).toLocaleString()}
                </p>
                {session.description && (
                  <p className="text-gray-300">{session.description}</p>
                )}
                {session.meetingUrl && (
                  <a
                    href={session.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-400 hover:underline"
                  >
                    View Recording
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 text-center">
          <p className="text-gray-400">No sessions scheduled yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

