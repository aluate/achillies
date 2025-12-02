import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './auth'
import { prisma } from './db'
import { getUserAccess, requireMinTier } from './access'

export async function requireUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/login')
  }

  return session.user
}

export async function requireAdmin() {
  const user = await requireUser()
  
  if (user.role !== 'admin') {
    redirect('/dashboard')
  }

  return user
}

export async function requireTier(minTier: 1 | 2 | 3) {
  const user = await requireUser()
  const access = await getUserAccess(user.id)
  
  if (!requireMinTier(access, minTier)) {
    redirect(`/subscriptions?error=upgrade_required&tier=${minTier}`)
  }

  return { user, access }
}

export async function requireActiveSubscription() {
  const user = await requireUser()
  const access = await getUserAccess(user.id)
  
  if (!access.isActiveSubscriber) {
    redirect('/subscriptions?error=subscription_required')
  }

  return { user, access }
}

