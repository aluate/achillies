# Setup Checklist - Corporate Crashout

Use this checklist to verify your setup before going live.

## Pre-Flight Checks

### ✅ Environment Variables

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Generated secret (use `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` - Your domain (e.g., `https://corporatecrashouttrading.com`)
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key (test or live)
- [ ] `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - From Stripe Dashboard
- [ ] `STRIPE_PRICE_TIER1` - Price ID for Tier 1
- [ ] `STRIPE_PRICE_TIER2` - Price ID for Tier 2
- [ ] `STRIPE_PRICE_TIER3` - Price ID for Tier 3
- [ ] `STRIPE_PRICE_ADDON_1ON1` - Price ID for add-on
- [ ] `DISCORD_INVITE_URL` - Discord invite link (optional)

### ✅ Database

- [ ] Database created and accessible
- [ ] Migrations run: `npm run db:migrate` (dev) or `npm run db:push` (prod)
- [ ] Admin user created: `npm run bootstrap`
- [ ] Can connect via Prisma Studio: `npm run db:studio`

### ✅ Stripe Configuration

- [ ] Products created in Stripe Dashboard:
  - [ ] Tier 1 - Engine A Basic (subscription)
  - [ ] Tier 2 - Engine A Live (subscription)
  - [ ] Tier 3 - Engine A Complete (subscription)
  - [ ] Add-on - 1-on-1 Review (one-time payment)
- [ ] Price IDs copied to `.env`
- [ ] Stripe Doctor passes: `npm run stripe:doctor`
- [ ] Webhook endpoint configured in Stripe Dashboard
- [ ] Webhook secret copied to `.env`

### ✅ Local Testing

- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] Can access homepage: `http://localhost:3000`
- [ ] Can sign up new user
- [ ] Can log in as admin
- [ ] Admin dashboard accessible: `/admin`
- [ ] Can create sections/lessons in admin
- [ ] Stripe Checkout redirects work (test mode)
- [ ] Webhook receives events (use Stripe CLI or ngrok)
- [ ] Subscription access gating works
- [ ] Health check endpoint works: `/api/health`

### ✅ Production Deployment

- [ ] Vercel project created
- [ ] Repository connected
- [ ] Root directory set to `apps/corporate-crashout` (if monorepo)
- [ ] All environment variables set in Vercel
- [ ] Production database connected
- [ ] Migrations run on production: `npx prisma migrate deploy`
- [ ] Bootstrap run on production: `npm run bootstrap`
- [ ] Domain configured in Vercel
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] Stripe webhook URL updated to production
- [ ] Test subscription flow in production

### ✅ Content Setup

- [ ] Admin can log in
- [ ] At least one Section created
- [ ] At least one Lesson created with Google Drive URL
- [ ] Live session scheduled (if using Tier 2+)
- [ ] Discord invite URL configured (if using)

### ✅ Branding (Before Going Live)

- [ ] Brand brief completed (`brand/BRAND_BRIEF.md`)
- [ ] Color palette defined with hex codes
- [ ] Typography choices finalized
- [ ] Taglines approved
- [ ] Hero copy finalized
- [ ] Visual identity guidelines clear
- [ ] Logo finalized (or placeholder defined)
- [ ] Brand colors applied to Tailwind config
- [ ] Fonts added to the application

### ✅ Final Verification

- [ ] Homepage loads correctly
- [ ] Sign up flow works end-to-end
- [ ] Subscription payment processes
- [ ] User dashboard shows correct tier access
- [ ] Content pages are gated correctly
- [ ] Admin dashboard fully functional
- [ ] Stripe Customer Portal works
- [ ] Upgrade/downgrade flow works
- [ ] Add-on purchase flow works

## Quick Commands

```bash
# Setup
npm install
npm run bootstrap
npm run stripe:doctor

# Development
npm run dev

# Database
npm run db:migrate
npm run db:studio

# Health Check
curl http://localhost:3000/api/health
```

## Troubleshooting

If any check fails:

1. **Database Issues**: Verify `DATABASE_URL` and database is running
2. **Stripe Issues**: Run `npm run stripe:doctor` for detailed errors
3. **Auth Issues**: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set
4. **Build Issues**: Check Node.js version (18+) and dependencies
5. **Webhook Issues**: Verify webhook URL and secret in Stripe Dashboard

For detailed help, see:
- `QUICK_START.md` - Local development
- `DEPLOYMENT.md` - Production deployment
- `README.md` - Full documentation

