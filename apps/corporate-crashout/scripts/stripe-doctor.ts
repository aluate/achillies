import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
  console.log('🔍 Stripe Doctor - Checking Stripe configuration...\n')

  // Check for Stripe secret key
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.error('❌ STRIPE_SECRET_KEY environment variable is not set')
    process.exit(1)
  }

  // Initialize Stripe
  const stripe = new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia',
  })

  // Check publishable key
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY
  if (!publishableKey) {
    console.error('⚠️  STRIPE_PUBLISHABLE_KEY not set (required for frontend)')
  } else {
    console.log('✅ STRIPE_PUBLISHABLE_KEY is set')
  }

  // Check webhook secret
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('⚠️  STRIPE_WEBHOOK_SECRET not set (required for webhooks)')
  } else {
    console.log('✅ STRIPE_WEBHOOK_SECRET is set')
  }

  // Check price IDs
  const priceIds = {
    tier1: process.env.STRIPE_PRICE_TIER1,
    tier2: process.env.STRIPE_PRICE_TIER2,
    tier3: process.env.STRIPE_PRICE_TIER3,
    addon: process.env.STRIPE_PRICE_ADDON_1ON1,
  }

  console.log('\n💰 Checking Price IDs...\n')

  const results: Array<{
    name: string
    priceId: string | undefined
    valid: boolean
    price?: Stripe.Price
    error?: string
  }> = []

  // Check Tier 1
  if (!priceIds.tier1) {
    results.push({
      name: 'Tier 1 (Engine A Basic)',
      priceId: undefined,
      valid: false,
      error: 'STRIPE_PRICE_TIER1 not set',
    })
  } else {
    try {
      const price = await stripe.prices.retrieve(priceIds.tier1)
      results.push({
        name: 'Tier 1 (Engine A Basic)',
        priceId: priceIds.tier1,
        valid: true,
        price,
      })
    } catch (error: any) {
      results.push({
        name: 'Tier 1 (Engine A Basic)',
        priceId: priceIds.tier1,
        valid: false,
        error: error.message,
      })
    }
  }

  // Check Tier 2
  if (!priceIds.tier2) {
    results.push({
      name: 'Tier 2 (Engine A Live)',
      priceId: undefined,
      valid: false,
      error: 'STRIPE_PRICE_TIER2 not set',
    })
  } else {
    try {
      const price = await stripe.prices.retrieve(priceIds.tier2)
      results.push({
        name: 'Tier 2 (Engine A Live)',
        priceId: priceIds.tier2,
        valid: true,
        price,
      })
    } catch (error: any) {
      results.push({
        name: 'Tier 2 (Engine A Live)',
        priceId: priceIds.tier2,
        valid: false,
        error: error.message,
      })
    }
  }

  // Check Tier 3
  if (!priceIds.tier3) {
    results.push({
      name: 'Tier 3 (Engine A Complete)',
      priceId: undefined,
      valid: false,
      error: 'STRIPE_PRICE_TIER3 not set',
    })
  } else {
    try {
      const price = await stripe.prices.retrieve(priceIds.tier3)
      results.push({
        name: 'Tier 3 (Engine A Complete)',
        priceId: priceIds.tier3,
        valid: true,
        price,
      })
    } catch (error: any) {
      results.push({
        name: 'Tier 3 (Engine A Complete)',
        priceId: priceIds.tier3,
        valid: false,
        error: error.message,
      })
    }
  }

  // Check Add-on
  if (!priceIds.addon) {
    results.push({
      name: 'Add-on (1-on-1 Review)',
      priceId: undefined,
      valid: false,
      error: 'STRIPE_PRICE_ADDON_1ON1 not set',
    })
  } else {
    try {
      const price = await stripe.prices.retrieve(priceIds.addon)
      results.push({
        name: 'Add-on (1-on-1 Review)',
        priceId: priceIds.addon,
        valid: true,
        price,
      })
    } catch (error: any) {
      results.push({
        name: 'Add-on (1-on-1 Review)',
        priceId: priceIds.addon,
        valid: false,
        error: error.message,
      })
    }
  }

  // Print results
  let allValid = true
  for (const result of results) {
    if (result.valid && result.price) {
      const product = await stripe.products.retrieve(result.price.product as string)
      const amount = result.price.unit_amount
        ? `$${(result.price.unit_amount / 100).toFixed(2)}`
        : 'N/A'
      const interval = result.price.recurring
        ? `/${result.price.recurring.interval}`
        : 'one-time'
      console.log(`✅ ${result.name}`)
      console.log(`   Price ID: ${result.priceId}`)
      console.log(`   Product: ${product.name} (${product.id})`)
      console.log(`   Amount: ${amount} ${interval}`)
      console.log(`   Active: ${result.price.active ? 'Yes' : 'No'}\n`)
    } else {
      console.error(`❌ ${result.name}`)
      if (result.priceId) {
        console.error(`   Price ID: ${result.priceId}`)
      }
      console.error(`   Error: ${result.error}\n`)
      allValid = false
    }
  }

  if (allValid) {
    console.log('✨ All Stripe prices are configured correctly!')
    process.exit(0)
  } else {
    console.error('❌ Some Stripe prices are invalid or missing')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('❌ Stripe Doctor failed:', error)
  process.exit(1)
})

