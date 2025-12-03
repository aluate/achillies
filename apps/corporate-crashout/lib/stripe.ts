import Stripe from 'stripe'

// Initialize Stripe client lazily to allow app to build without Stripe keys
let stripeInstance: Stripe | null = null

function getStripeClient(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set. Stripe features will not work.')
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2024-11-20.acacia',
      typescript: true,
    })
  }
  return stripeInstance
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripeClient()[prop as keyof Stripe]
  },
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

