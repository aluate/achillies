import { requireUser } from '@/lib/auth-helpers'
import { getUserAccess } from '@/lib/access'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await requireUser()
  const access = await getUserAccess(user.id)

  const userRecord = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      subscriptions: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  const sections = await prisma.section.findMany({
    include: {
      lessons: {
        orderBy: { orderIndex: 'asc' },
      },
    },
    orderBy: { orderIndex: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          {access.isActiveSubscriber ? (
            <>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Tier:</span> {access.currentTier}
              </p>
              <p className="text-green-400">✓ Active</p>
            </>
          ) : (
            <p className="text-red-400">No active subscription</p>
          )}
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-4">TradingView Access</h2>
          <p className={userRecord?.tradingViewAccess === 'GRANTED' ? 'text-green-400' : 'text-yellow-400'}>
            {userRecord?.tradingViewAccess === 'GRANTED' ? '✓ Granted' : '⏳ Pending'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {access.isActiveSubscriber && (
          <>
            <Link
              href="/content"
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">View Lessons</h3>
              <p className="text-gray-400 text-sm">Access your learning content</p>
            </Link>

            <Link
              href="/discord"
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">Join Discord</h3>
              <p className="text-gray-400 text-sm">Connect with the community</p>
            </Link>

            {access.hasTier2 && (
              <Link
                href="/livesessions"
                className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
              >
                <h3 className="text-lg font-semibold mb-2">Live Sessions</h3>
                <p className="text-gray-400 text-sm">Join live trading sessions</p>
              </Link>
            )}

            <Link
              href="/indicators"
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">Indicators</h3>
              <p className="text-gray-400 text-sm">TradingView indicators</p>
            </Link>

            <Link
              href="/account"
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">Manage Billing</h3>
              <p className="text-gray-400 text-sm">Update subscription & billing</p>
            </Link>

            <Link
              href="/addons"
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">Book 1-on-1 Review</h3>
              <p className="text-gray-400 text-sm">Schedule private session</p>
            </Link>
          </>
        )}
      </div>

      {!access.isActiveSubscriber && (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 text-center">
          <p className="text-xl mb-4">No active subscription</p>
          <Link
            href="/subscriptions"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Subscribe Now
          </Link>
        </div>
      )}

      {sections.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Content</h2>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {section.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/content/${section.id}/${lesson.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {lesson.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

