import type { Metadata } from 'next'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Corporate Crashout Trading',
  description: 'Subscription-based futures trading platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Navbar session={session} />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

