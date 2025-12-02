'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddOnsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasPurchased, setHasPurchased] = useState(false)

  useEffect(() => {
    if (session) {
      checkPurchase()
    }
  }, [session])

  const checkPurchase = async () => {
    try {
      const res = await fetch('/api/addons/check')
      const data = await res.json()
      setHasPurchased(data.hasPurchased || false)
    } catch (err) {
      console.error('Error checking purchase:', err)
    }
  }

  const handlePurchase = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isAddOn: true,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please sign in to access add-ons.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">1-on-1 Trading Review</h1>

      <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 mb-6">
        <h2 className="text-xl font-semibold mb-4">Private Trading Session</h2>
        <p className="text-gray-300 mb-4">
          Book a private 1-on-1 trading review session with our expert team. Get personalized feedback on your trades,
          strategies, and performance.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6 ml-4">
          <li>Personalized trading review</li>
          <li>Strategy optimization</li>
          <li>Performance analysis</li>
          <li>Direct Q&A with experts</li>
        </ul>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200">
            {error}
          </div>
        )}

        {hasPurchased ? (
          <div className="p-4 bg-green-900/50 border border-green-700 rounded">
            <p className="text-green-200 mb-2">✓ Purchase confirmed!</p>
            <p className="text-sm text-gray-300">
              Your session will be scheduled after admin approval. Check back soon for your session details.
            </p>
          </div>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Purchase 1-on-1 Session'}
          </button>
        )}
      </div>

      <Link
        href="/dashboard"
        className="text-blue-400 hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  )
}

