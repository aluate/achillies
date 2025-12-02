'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AddOnPurchase, User } from '@prisma/client'

type PurchaseWithUser = AddOnPurchase & {
  user: User
}

export function FulfillAddOnButton({ purchase }: { purchase: PurchaseWithUser }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [sessionDate, setSessionDate] = useState('')

  const handleFulfill = async () => {
    if (!purchase.fulfilled && !sessionDate) {
      alert('Please enter a session date')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/admin/addons/${purchase.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fulfilled: true,
          sessionDate: sessionDate || purchase.sessionDate || new Date().toISOString(),
        }),
      })

      if (res.ok) {
        router.refresh()
        setSessionDate('')
      }
    } catch (error) {
      console.error('Error fulfilling add-on:', error)
    } finally {
      setLoading(false)
    }
  }

  if (purchase.fulfilled) {
    return <span className="text-sm text-gray-400">Completed</span>
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={sessionDate || (purchase.sessionDate ? new Date(purchase.sessionDate).toISOString().split('T')[0] : '')}
        onChange={(e) => setSessionDate(e.target.value)}
        className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs"
      />
      <button
        onClick={handleFulfill}
        disabled={loading}
        className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Mark Fulfilled'}
      </button>
    </div>
  )
}

