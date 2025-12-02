'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

export default function Navbar({ session }: { session: Session | null }) {
  const { data: sessionData } = useSession()

  const activeSession = session || sessionData

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-400">
            Corporate Crashout
          </Link>

          <div className="flex items-center gap-4">
            {activeSession ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>
                {activeSession.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/account"
                  className="text-gray-300 hover:text-white transition"
                >
                  Account
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

