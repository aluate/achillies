import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="mb-8">
        <div className="inline-block p-4 bg-green-900/50 rounded-full mb-4">
          <svg
            className="w-16 h-16 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-300 mb-8">
          Thank you for your purchase. Your subscription is now active and you can access all your content.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

