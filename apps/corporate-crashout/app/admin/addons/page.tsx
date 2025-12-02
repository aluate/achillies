import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { FulfillAddOnButton } from '@/components/admin/FulfillAddOnButton'

export default async function AdminAddOnsPage() {
  await requireAdmin()

  const purchases = await prisma.addOnPurchase.findMany({
    include: {
      user: {
        include: {
          subscriptions: {
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add-On Session Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Tier</th>
              <th className="text-left p-3">Purchased</th>
              <th className="text-left p-3">Session Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => {
              const subscription = purchase.user.subscriptions[0]
              return (
                <tr key={purchase.id} className="border-b border-gray-800">
                  <td className="p-3">{purchase.user.name || '-'}</td>
                  <td className="p-3">{purchase.user.email}</td>
                  <td className="p-3">
                    {subscription ? `Tier ${subscription.tier}` : 'None'}
                  </td>
                  <td className="p-3">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {purchase.sessionDate
                      ? new Date(purchase.sessionDate).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        purchase.fulfilled
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-yellow-900/50 text-yellow-300'
                      }`}
                    >
                      {purchase.fulfilled ? 'Fulfilled' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-3">
                    <FulfillAddOnButton purchase={purchase} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {purchases.length === 0 && (
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 text-center">
          <p className="text-gray-400">No add-on purchases yet.</p>
        </div>
      )}
    </div>
  )
}

