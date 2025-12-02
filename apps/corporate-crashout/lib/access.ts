import { prisma } from './db'
import { SubscriptionStatus } from '@prisma/client'

export interface UserAccess {
  hasTier1: boolean
  hasTier2: boolean
  hasTier3: boolean
  isActiveSubscriber: boolean
  currentTier: 0 | 1 | 2 | 3
  subscriptionStatus: SubscriptionStatus | null
}

export async function getUserAccess(userId: string): Promise<UserAccess> {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: {
        in: [SubscriptionStatus.ACTIVE],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
    return {
      hasTier1: false,
      hasTier2: false,
      hasTier3: false,
      isActiveSubscriber: false,
      currentTier: 0,
      subscriptionStatus: subscription?.status || null,
    }
  }

  const tier = subscription.tier as 1 | 2 | 3

  return {
    hasTier1: tier >= 1,
    hasTier2: tier >= 2,
    hasTier3: tier >= 3,
    isActiveSubscriber: true,
    currentTier: tier,
    subscriptionStatus: subscription.status,
  }
}

export function requireMinTier(access: UserAccess, minTier: 1 | 2 | 3): boolean {
  return access.currentTier >= minTier && access.isActiveSubscriber
}

