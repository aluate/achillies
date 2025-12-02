import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { getTierFromPriceId } from '@/lib/stripe'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Disable body parsing for webhook signature verification
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentIntentSucceeded(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) {
    console.error('No userId in checkout session metadata')
    return
  }

  // If this was an add-on purchase, handle it separately
  if (session.metadata?.isAddOn === 'true') {
    // Add-on purchase is handled by payment_intent.succeeded
    return
  }

  // Handle subscription checkout
  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    await handleSubscriptionUpdated(subscription)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  })

  if (!user) {
    console.error(`User not found for customer ${customerId}`)
    return
  }

  const priceId = subscription.items.data[0]?.price.id
  if (!priceId) {
    console.error('No price ID in subscription')
    return
  }

  const tier = getTierFromPriceId(priceId)
  if (!tier) {
    console.error(`Could not determine tier from price ID: ${priceId}`)
    return
  }

  let status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'INCOMPLETE' = 'ACTIVE'
  if (subscription.status === 'active' || subscription.status === 'trialing') {
    status = 'ACTIVE'
  } else if (subscription.status === 'canceled' || subscription.status === 'canceled_at_period_end') {
    status = 'CANCELED'
  } else if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
    status = 'PAST_DUE'
  } else {
    status = 'INCOMPLETE'
  }

  // Update or create subscription
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      tier,
      status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
    create: {
      userId: user.id,
      tier,
      stripeSubscriptionId: subscription.id,
      status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'CANCELED' },
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  if (subscriptionId) {
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscriptionId },
      data: { status: 'PAST_DUE' },
    })
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Check if this is an add-on purchase
  const metadata = paymentIntent.metadata
  if (metadata?.isAddOn !== 'true') {
    return
  }

  const customerId = paymentIntent.customer as string
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  })

  if (!user) {
    console.error(`User not found for customer ${customerId}`)
    return
  }

  // Verify user has active subscription
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: 'ACTIVE',
    },
  })

  if (!activeSubscription) {
    console.error(`User ${user.id} does not have active subscription for add-on`)
    return
  }

  // Create AddOnPurchase record
  await prisma.addOnPurchase.create({
    data: {
      userId: user.id,
      stripePaymentIntentId: paymentIntent.id,
      fulfilled: false,
    },
  })
}

