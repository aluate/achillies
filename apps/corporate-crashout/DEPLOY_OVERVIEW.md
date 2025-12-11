# Deployment Overview - Corporate Crashout

## App Information

- **Name**: Corporate Crashout
- **Location in repo**: `apps/corporate-crashout`
- **Monorepo**: `aluate/achillies`

## Stack

- **Framework**: Next.js 14 (App Router)
- **Database ORM**: Prisma 5.19.0
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **Payments**: Stripe (optional, can be disabled)

## Deployment

### Provider

- **Platform**: Vercel
- **Project**: `achillies`
- **Production URL**: https://achillies-rosy.vercel.app (or check Vercel dashboard for actual URL)

### Build Configuration

Vercel automatically detects Next.js and uses the following:

- **Root Directory**: `apps/corporate-crashout`
- **Build Command**: `npm run build` (which runs `npx prisma@5.19.0 generate && next build`)
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Commands

- **Development**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build` (runs `npx prisma@5.19.0 generate && next build`)
- **Start**: `npm start` (runs `next start` - used for production server)

## Environment Variables

### Required

- **DATABASE_URL**: Supabase Session Pooler connection string
  - **Format**: `postgresql://postgres.<project_ref>:[PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`
  - **Example**: `postgresql://postgres.fgvwqtdvnfgbjgitgkto:[PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres`
  - **Where to find**: Supabase Dashboard > Project Settings > Database > Connection Pooling > Session mode
  - **Important**: 
    - Use **Session pooler** (not Direct connection) to avoid IPv6 issues on IPv4 networks
    - Username must include `.` and project ref (e.g., `postgres.fgvwqtdvnfgbjgitgkto`)
    - "FATAL: Tenant or user not found" means you're using `postgres` instead of `postgres.<project_ref>`

- **NEXTAUTH_SECRET**: Secret for JWT signing
  - Generate with: `openssl rand -base64 32`
  - Must be unique per environment

- **NEXTAUTH_URL**: Base URL of the application
  - Production: `https://achillies-rosy.vercel.app` (or your actual domain)
  - Must match the domain where the app is deployed

### Optional (Stripe Integration)

Stripe can be disabled by setting `STRIPE_ENABLED=false` or omitting `STRIPE_SECRET_KEY`.

- **STRIPE_SECRET_KEY**: Stripe secret key
  - Test: `sk_test_...`
  - Production: `sk_live_...`

- **STRIPE_PUBLISHABLE_KEY**: Stripe publishable key
  - Test: `pk_test_...`
  - Production: `pk_live_...`

- **STRIPE_WEBHOOK_SECRET**: Webhook signing secret from Stripe Dashboard
  - Format: `whsec_...`
  - Get this after configuring the webhook endpoint in Stripe

- **STRIPE_PRICE_TIER1**: Price ID for Tier 1 subscription
- **STRIPE_PRICE_TIER2**: Price ID for Tier 2 subscription
- **STRIPE_PRICE_TIER3**: Price ID for Tier 3 subscription
- **STRIPE_PRICE_ADDON_1ON1**: Price ID for 1-on-1 review add-on

### Optional (Other)

- **DISCORD_INVITE_URL**: Discord server invite link
- **ADMIN_EMAIL**: Email for admin user (used by bootstrap script)
- **ADMIN_PASSWORD**: Password for admin user (used by bootstrap script)

## Prisma Version Policy

**Critical**: `prisma` and `@prisma/client` must be kept on the same version line (currently **5.19.0**).

- Both packages are pinned to exact versions (no caret `^` or tilde `~`)
- All Prisma scripts use `npx prisma@5.19.0 ...` to ensure the correct version
- Upgrades should be coordinated and tested, not left to `npx` auto-installation
- The schema (`prisma/schema.prisma`) is written for Prisma 5.x compatibility

**Why this matters**: Auto-installing Prisma 7.x via `npx prisma generate` breaks the Prisma 5.x schema and causes P1012 errors.

## Database Setup

We use **Supabase** as the canonical database.

### Supabase Connection Types

**Session Pooler (Recommended)**:
- Use for: Local development, production (IPv4 networks)
- URL format: `postgresql://postgres.<project_ref>:[PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`
- Why: Works reliably on IPv4 networks, avoids P1001 connection errors
- Where: Supabase Dashboard > Project Settings > Database > Connection Pooling > Session mode

**Direct Connection**:
- Use for: Production (if your network supports IPv6)
- URL format: `postgresql://postgres.[project_ref]:[PASSWORD]@db.[project_ref].supabase.co:5432/postgres`
- Why: Lower latency, but may be IPv6-only on free tier
- Where: Supabase Dashboard > Project Settings > Database > Connection string

**When to use which**:
- **Always use Session pooler** for local development on IPv4 networks
- **Use Session pooler** for production if you experience P1001 errors
- **Use Direct connection** only if you're certain your network supports IPv6

### Setup Steps

1. Create a Supabase project (if you don't have one)
2. Get your Session pooler connection string from the Supabase Dashboard
3. Add `DATABASE_URL` to Vercel environment variables (use Session pooler URL)
4. Push the schema:
   ```bash
   npm run db:push  # For development/testing
   # OR
   npm run db:migrate  # For production with migration history
   ```

### Troubleshooting

- **P1001 (Can't reach database server)**: You're likely using Direct connection on an IPv4 network. Switch to Session pooler URL.
- **FATAL: Tenant or user not found**: You're using `postgres` as username. Use `postgres.<project_ref>` instead.

## Deployment Checklist

- [ ] All environment variables configured in Vercel
- [ ] Database created and accessible
- [ ] Database schema pushed/migrated
- [ ] Stripe products and prices created (if using Stripe)
- [ ] Stripe webhook endpoint configured (if using Stripe)
- [ ] Admin user created (run `npm run bootstrap` or create manually)
- [ ] Production build succeeds: `npm run build`
- [ ] Test subscription flow end-to-end (if using Stripe)
- [ ] Test admin dashboard functionality

## Troubleshooting

See `DEPLOY_NOTES.md` for recent changes and known issues.

For local setup, see `LOCAL_DEV_SETUP.md`.

