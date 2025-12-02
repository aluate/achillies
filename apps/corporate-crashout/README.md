# Corporate Crashout Trading Platform

Subscription-based web application for NQ Futures Trading brand.

## 🚀 START HERE

**New to this project?** Start with:
- **`START_HERE.md`** — Complete step-by-step guide (assumes nothing is installed)
- **`START_HERE.txt`** — Quick overview (plain text version)

These guides will walk you through:
- Installing everything you need
- Setting up the database
- Running the site locally
- Testing all features
- Using the brand brief

**Ready to deploy?** See `DEPLOYMENT.md`

---

## Overview

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Auth**: NextAuth with Credentials provider
- **Database**: PostgreSQL (via Prisma ORM)
- **Payments**: Stripe (Checkout, Billing, Customer Portal, Webhooks)
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or managed)
- Stripe account with API keys
- Git

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Fill in all required variables in `.env`:
   - Database connection string
   - NextAuth secret (generate with `openssl rand -base64 32`)
   - Stripe API keys
   - Stripe price IDs for each tier
   - Discord invite URL

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   # Or use migrations: npx prisma migrate dev
   ```

5. Create an admin user (manual):
   - Use Prisma Studio: `npx prisma studio`
   - Or use the signup API and manually change role to 'admin' in the database

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
apps/corporate-crashout/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   └── ...                # User-facing pages
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe client
│   └── access.ts         # Access control logic
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma
└── control/              # Control documentation
    └── corporate-crashout/
        └── CONTROL.md    # Master specification
```

## Stripe Setup

1. Create products and prices in Stripe Dashboard:
   - Tier 1 subscription (Engine A Basic)
   - Tier 2 subscription (Engine A Live)
   - Tier 3 subscription (Engine A Complete)
   - Add-on: 1-on-1 Trading Review (one-time payment)

2. Copy price IDs to `.env`:
   ```
   STRIPE_PRICE_TIER1=price_...
   STRIPE_PRICE_TIER2=price_...
   STRIPE_PRICE_TIER3=price_...
   STRIPE_PRICE_ADDON_1ON1=price_...
   ```

3. Set up webhooks in Stripe Dashboard:
   - Endpoint: `https://your-domain.com/api/stripe/webhooks`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
     - `payment_intent.succeeded`

4. Copy webhook signing secret to `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Database Schema

The app uses Prisma with the following models:
- `User` - User accounts and authentication
- `Subscription` - Stripe subscription records
- `Section` - Content sections
- `Lesson` - Individual lessons with Google Drive links
- `LiveSession` - Scheduled live trading sessions
- `AddOnPurchase` - 1-on-1 session bookings

See `prisma/schema.prisma` for full schema definition.

## Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import project in Vercel:
   - Connect your repository
   - Set root directory to `apps/corporate-crashout`
   - Vercel will auto-detect Next.js

3. Configure environment variables in Vercel:
   - Add all variables from `.env.example`
   - Use production Stripe keys
   - Set `NEXTAUTH_URL` to your Vercel domain

4. Set up PostgreSQL:
   - Use Vercel Postgres or external provider
   - Add `DATABASE_URL` to Vercel env vars

5. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

6. Update Stripe webhook URL:
   - Point to: `https://your-domain.vercel.app/api/stripe/webhooks`

## Admin Features

Access admin dashboard at `/admin` (requires admin role).

Admin can:
- Manage users and TradingView access
- Create/edit/delete content sections and lessons
- Schedule live trading sessions
- View and fulfill add-on session bookings

## User Features

- Sign up and subscribe to tiers
- Access tier-gated content
- Manage subscription via Stripe Customer Portal
- Book 1-on-1 trading review sessions
- Join Discord community (active subscribers only)
- View live sessions (Tier 2+)

## Content Management

Content is stored as Google Drive URLs in the database. Admin uploads files to Google Drive and adds the sharing link in the admin dashboard.

## Utility Scripts

### Bootstrap Application
```bash
npm run bootstrap
```
Initializes the application:
- Verifies database connection
- Creates/updates admin user
- Seeds default content structure (if none exists)

You can set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` to customize admin credentials.

### Stripe Doctor
```bash
npm run stripe:doctor
```
Verifies Stripe configuration:
- Checks all price IDs are valid
- Displays product information
- Reports any configuration errors

Run this before deploying to catch Stripe configuration issues early.

### Health Check
The application includes a health check endpoint at `/api/health` that verifies:
- Database connectivity
- Application status

Useful for monitoring and deployment verification.

## Support

For issues or questions, refer to:
- `QUICK_START.md` - Quick setup guide
- `DEPLOYMENT.md` - Production deployment
- `control/corporate-crashout/CONTROL.md` - Complete specification

