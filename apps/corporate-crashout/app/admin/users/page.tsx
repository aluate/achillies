import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { ToggleTradingViewButton } from '@/components/ToggleTradingViewButton'

export default async function AdminUsersPage() {
  await requireAdmin()

  const users = await prisma.user.findMany({
    include: {
      subscriptions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Subscription Tier</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">TradingView</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const subscription = user.subscriptions[0]
              return (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.name || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.role === 'admin' ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-800 text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    {subscription ? (
                      <span>Tier {subscription.tier} ({subscription.status})</span>
                    ) : (
                      <span className="text-gray-500">No subscription</span>
                    )}
                  </td>
                  <td className="p-3">
                    {subscription?.status === 'ACTIVE' ? (
                      <span className="text-green-400">Active</span>
                    ) : (
                      <span className="text-gray-500">
                        {subscription?.status || 'None'}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      user.tradingViewAccess === 'GRANTED'
                        ? 'bg-green-900/50 text-green-300'
                        : 'bg-yellow-900/50 text-yellow-300'
                    }`}>
                      {user.tradingViewAccess}
                    </span>
                  </td>
                  <td className="p-3">
                    <ToggleTradingViewButton userId={user.id} currentAccess={user.tradingViewAccess} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

