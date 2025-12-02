import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

// Helper to get price ID for tier
export function getPriceIdForTier(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return process.env.STRIPE_PRICE_TIER1 || ''
    case 2:
      return process.env.STRIPE_PRICE_TIER2 || ''
    case 3:
      return process.env.STRIPE_PRICE_TIER3 || ''
    default:
      throw new Error(`Invalid tier: ${tier}`)
  }
}

// Helper to get tier from price ID
export function getTierFromPriceId(priceId: string): 1 | 2 | 3 | null {
  if (priceId === process.env.STRIPE_PRICE_TIER1) return 1
  if (priceId === process.env.STRIPE_PRICE_TIER2) return 2
  if (priceId === process.env.STRIPE_PRICE_TIER3) return 3
  return null
}

export function getAddOnPriceId(): string {
  return process.env.STRIPE_PRICE_ADDON_1ON1 || ''
}

