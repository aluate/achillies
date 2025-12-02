import { requireAdmin } from '@/lib/auth-helpers'
import Link from 'next/link'

export default async function AdminPage() {
  await requireAdmin()

  const links = [
    { href: '/admin/users', title: 'User Management', description: 'View and manage users, subscriptions, and TradingView access' },
    { href: '/admin/tradingview', title: 'TradingView Access', description: 'Grant TradingView access to pending users' },
    { href: '/admin/sections', title: 'Content Sections', description: 'Manage course sections' },
    { href: '/admin/lessons', title: 'Lessons', description: 'Manage lessons and Google Drive links' },
    { href: '/admin/livesessions', title: 'Live Sessions', description: 'Schedule and manage live trading sessions' },
    { href: '/admin/addons', title: 'Add-On Sessions', description: 'View and manage 1-on-1 session bookings' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-blue-600 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{link.title}</h2>
            <p className="text-gray-400 text-sm">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

