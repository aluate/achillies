import { requireActiveSubscription } from '@/lib/auth-helpers'
import { getUserAccess } from '@/lib/access'

export default async function IndicatorsPage() {
  const { user, access } = await requireActiveSubscription()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">TradingView Indicators</h1>

      <div className="space-y-6">
        {access.hasTier1 && (
          <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
            <h2 className="text-xl font-semibold mb-3 text-blue-400">Engine A Indicator</h2>
            <p className="text-gray-300 mb-4">
              Access the Engine A TradingView indicator. Setup instructions and links available after TradingView access is granted.
            </p>
            <p className="text-sm text-gray-400">
              Status: {user.role === 'admin' ? 'Admin Access' : 'See your account page for TradingView access status'}
            </p>
          </div>
        )}

        {access.hasTier3 && (
          <>
            <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
              <h2 className="text-xl font-semibold mb-3 text-purple-400">Volume Aggro Indicator</h2>
              <p className="text-gray-300">
                Advanced volume analysis indicator (Tier 3 exclusive).
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
              <h2 className="text-xl font-semibold mb-3 text-purple-400">Liquidity Indicator</h2>
              <p className="text-gray-300">
                Liquidity analysis tool (Tier 3 exclusive).
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
              <h2 className="text-xl font-semibold mb-3 text-purple-400">Structure Indicator</h2>
              <p className="text-gray-300">
                Market structure analysis indicator (Tier 3 exclusive).
              </p>
            </div>
          </>
        )}

        {!access.hasTier1 && (
          <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 text-center">
            <p className="text-xl mb-4">Upgrade to access TradingView indicators</p>
            <a
              href="/subscriptions"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Plans
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

