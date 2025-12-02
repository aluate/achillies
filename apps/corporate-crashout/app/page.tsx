import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Corporate Crashout Trading
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Master NQ Futures Trading with Professional Tools & Live Sessions
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Get Started
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">Engine A Basic</h2>
          <p className="text-gray-400 mb-4">Tier 1</p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li>✓ Engine A TradingView Indicator</li>
            <li>✓ Private Discord Community</li>
            <li>✓ Tier 1 Learning Content</li>
          </ul>
          <Link
            href="/auth/signup?tier=1"
            className="block text-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Subscribe
          </Link>
        </div>

        <div className="border border-blue-600 rounded-lg p-6 bg-gray-900/50 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
            Popular
          </div>
          <h2 className="text-2xl font-bold mb-3 text-blue-400">Engine A Live</h2>
          <p className="text-gray-400 mb-4">Tier 2</p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li>✓ Everything in Tier 1</li>
            <li>✓ 2-Hour Live Trading Sessions (2x/week)</li>
            <li>✓ Tier 2 Learning Content</li>
            <li>✓ Live Session Archives</li>
          </ul>
          <Link
            href="/auth/signup?tier=2"
            className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Subscribe
          </Link>
        </div>

        <div className="border border-purple-600 rounded-lg p-6 bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-3 text-purple-400">Engine A Complete</h2>
          <p className="text-gray-400 mb-4">Tier 3</p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li>✓ ALL TradingView Indicators</li>
            <li>✓ Everything in Tier 1 & 2</li>
            <li>✓ All Premium Content</li>
            <li>✓ Complete Indicator Setup Pages</li>
          </ul>
          <Link
            href="/auth/signup?tier=3"
            className="block text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  )
}

