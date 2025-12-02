import { requireUser } from '@/lib/auth-helpers'
import { getUserAccess } from '@/lib/access'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function SubscriptionsPage() {
  const user = await requireUser()
  const access = await getUserAccess(user.id)

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Subscription</h1>

      {access.isActiveSubscriber ? (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Subscription</h2>
          <div className="space-y-2 mb-4">
            <p>
              <span className="text-gray-400">Tier:</span> {access.currentTier} - {
                access.currentTier === 1 ? 'Engine A Basic' :
                access.currentTier === 2 ? 'Engine A Live' :
                'Engine A Complete'
              }
            </p>
            <p>
              <span className="text-gray-400">Status:</span>{' '}
              <span className="text-green-400">Active</span>
            </p>
            {subscription && (
              <p>
                <span className="text-gray-400">Renews:</span>{' '}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
          <Link
            href="/account"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Manage Subscription
          </Link>
        </div>
      ) : (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 mb-6">
          <p className="text-xl mb-4">No active subscription</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Plans
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Tier 1</h2>
          <p className="text-gray-400 mb-4">Engine A Basic</p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>✓ Engine A Indicator</li>
            <li>✓ Discord Access</li>
            <li>✓ Tier 1 Content</li>
          </ul>
          {access.currentTier !== 1 && (
            <Link
              href="/account"
              className="block text-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition text-sm"
            >
              {access.currentTier > 1 ? 'Downgrade' : 'Upgrade'}
            </Link>
          )}
        </div>

        <div className="border border-blue-600 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-3 text-blue-400">Tier 2</h2>
          <p className="text-gray-400 mb-4">Engine A Live</p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>✓ Everything in Tier 1</li>
            <li>✓ Live Sessions</li>
            <li>✓ Session Archives</li>
          </ul>
          {access.currentTier !== 2 && (
            <Link
              href="/account"
              className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              {access.currentTier > 2 ? 'Downgrade' : 'Upgrade'}
            </Link>
          )}
        </div>

        <div className="border border-purple-600 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-3 text-purple-400">Tier 3</h2>
          <p className="text-gray-400 mb-4">Engine A Complete</p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>✓ All Indicators</li>
            <li>✓ Everything in Tiers 1 & 2</li>
            <li>✓ All Premium Content</li>
          </ul>
          {access.currentTier !== 3 && (
            <Link
              href="/account"
              className="block text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm"
            >
              Upgrade
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

