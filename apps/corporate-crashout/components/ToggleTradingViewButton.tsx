'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ToggleTradingViewButton({
  userId,
  currentAccess,
}: {
  userId: string
  currentAccess: 'PENDING' | 'GRANTED'
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/tradingview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          access: currentAccess === 'PENDING' ? 'GRANTED' : 'PENDING',
        }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error toggling TradingView access:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1 rounded text-xs transition disabled:opacity-50 ${
        currentAccess === 'PENDING'
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      }`}
    >
      {loading
        ? '...'
        : currentAccess === 'PENDING'
        ? 'Grant Access'
        : 'Revoke Access'}
    </button>
  )
}

