'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AccountPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePortal = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to open portal')
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
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="space-y-6">
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-400">Name:</span> {session.user.name || 'Not set'}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {session.user.email}
            </p>
          </div>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-4">Billing & Subscription</h2>
          <button
            onClick={handlePortal}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Opening...' : 'Manage Billing & Subscription'}
          </button>
          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}
        </div>

        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="block text-blue-400 hover:underline"
            >
              ← Back to Dashboard
            </Link>
            <Link
              href="/subscriptions"
              className="block text-blue-400 hover:underline"
            >
              View Subscription Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

