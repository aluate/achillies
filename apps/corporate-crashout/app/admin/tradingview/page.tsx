import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { ToggleTradingViewButton } from '@/components/ToggleTradingViewButton'

export default async function AdminTradingViewPage() {
  await requireAdmin()

  const pendingUsers = await prisma.user.findMany({
    where: {
      tradingViewAccess: 'PENDING',
    },
    include: {
      subscriptions: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users Needing TradingView Access</h1>

      {pendingUsers.length === 0 ? (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 text-center">
          <p className="text-gray-400">No users pending TradingView access.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Subscription Tier</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => {
                const subscription = user.subscriptions[0]
                return (
                  <tr key={user.id} className="border-b border-gray-800">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.name || '-'}</td>
                    <td className="p-3">
                      {subscription ? (
                        <span>Tier {subscription.tier}</span>
                      ) : (
                        <span className="text-gray-500">No subscription</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-900/50 text-yellow-300">
                        PENDING
                      </span>
                    </td>
                    <td className="p-3">
                      <ToggleTradingViewButton userId={user.id} currentAccess="PENDING" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

