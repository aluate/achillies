# Deployment Guide - Corporate Crashout Trading Platform

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations ready
- [ ] Stripe products and prices created
- [ ] Stripe webhook endpoint configured
- [ ] Admin user created
- [ ] Test subscription flow end-to-end
- [ ] Test admin dashboard functionality

## Vercel Deployment

### Step 1: Prepare Repository

1. Ensure all code is committed and pushed to your Git repository
2. Verify `.env.example` is in the repo (never commit `.env`)

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Set the **Root Directory** to: `apps/corporate-crashout`
5. Framework Preset: Next.js (auto-detected)

### Step 3: Configure Environment Variables

In Vercel project settings, add all environment variables:

**Required Variables:**
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-domain.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
STRIPE_PRICE_ADDON_1ON1=price_...
DISCORD_INVITE_URL=https://discord.gg/...
```

**Important Notes:**
- Use **production** Stripe keys (`sk_live_` and `pk_live_`)
- Generate a new `NEXTAUTH_SECRET` for production
- Set `NEXTAUTH_URL` to your actual Vercel domain
- Get webhook secret from Stripe Dashboard after setting up webhook

### Step 4: Set Up Database

**Option A: Vercel Postgres (Recommended)**
1. In Vercel project, go to Storage tab
2. Create new Postgres database
3. Vercel will auto-add `POSTGRES_URL` env var
4. Update `DATABASE_URL` to use `POSTGRES_URL` (Vercel provides this)

**Option B: External PostgreSQL**
1. Use provider like Supabase, Neon, or Railway
2. Get connection string
3. Add to `DATABASE_URL` env var

### Step 5: Run Database Migrations

After first deployment, run migrations:

```bash
# Connect to your deployment
vercel link

# Run migrations
npx prisma migrate deploy
```

Or use Vercel's built-in Postgres migrations feature if available.

### Step 6: Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe/webhooks`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
5. Copy the **Signing secret** (`whsec_...`)
6. Add to Vercel env var: `STRIPE_WEBHOOK_SECRET`

### Step 7: Create Admin User

1. Sign up normally via the app
2. Connect to database (via Prisma Studio or SQL client)
3. Update user role:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

Or use Prisma Studio:
```bash
npx prisma studio
```

### Step 8: Deploy

1. Push to your main branch (Vercel auto-deploys)
2. Or manually deploy from Vercel dashboard
3. Wait for build to complete
4. Visit your deployed site

## Post-Deployment Verification

- [ ] Homepage loads
- [ ] Can sign up new account
- [ ] Stripe checkout redirects correctly
- [ ] Webhook receives events (check Stripe Dashboard logs)
- [ ] Subscription access works after payment
- [ ] Admin dashboard accessible with admin account
- [ ] Can create sections/lessons
- [ ] User can access content based on tier
- [ ] Stripe Customer Portal works

## Troubleshooting

### Webhook Not Working
- Verify webhook URL is correct in Stripe
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe's secret
- View webhook logs in Stripe Dashboard
- Check Vercel function logs for errors

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- For Vercel Postgres, ensure database is in same region as app

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches actual domain
- Clear browser cookies if session issues

### Build Errors
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

## Custom Domain Setup

1. In Vercel project settings → Domains
2. Add your custom domain: `corporatecrashouttrading.com`
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to use custom domain
5. Update Stripe webhook URL to use custom domain

## Monitoring

- Vercel Analytics: Built-in performance monitoring
- Stripe Dashboard: Payment and subscription monitoring
- Database: Monitor connection pool and query performance

## Backup Strategy

- Database: Regular backups (automatic with Vercel Postgres)
- Content: Google Drive links are separate, no backup needed
- Stripe: All subscription data is in Stripe (primary source of truth)

## Environment-Specific Configs

For staging/production separation:
- Create separate Vercel projects
- Use different Stripe accounts or test mode
- Use separate databases
- Use environment-specific `NEXTAUTH_URL`

