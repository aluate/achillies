import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-300 mb-8">
          Your payment was cancelled. No charges were made.
        </p>
      </div>

      <div className="space-x-4">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Return Home
        </Link>
        <Link
          href="/auth/signup"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}

