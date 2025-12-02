# Quick Start Guide - Corporate Crashout

This folder contains everything needed to run the Corporate Crashout Trading platform. It's completely self-contained - you can share just this folder with Justin without exposing other projects.

## 🚀 Getting Started (Local Development)

### 🎨 **Before You Start: Complete Your Brand Brief**

**Important**: Before going live, fill out your brand guidelines:
- Open `brand/BRAND_BRIEF.md`
- Use `brand/BRAND_PROMPT_GENERATOR.md` with your AI assistant to help fill it out
- Define colors, fonts, taglines, and visual identity
- This ensures consistent branding across the site

See `brand/README.md` for details.

---

### ⚡ EASIEST WAY - Just Double-Click!

**Windows users:** Just double-click `START_LOCAL.bat` in File Explorer!

The batch file will:
- Check all prerequisites
- Install dependencies if needed
- Set up Prisma client
- Start the development server
- Open your browser automatically

See `START_LOCAL_README.txt` for details.

---

### Manual Setup (Alternative)

#### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in this directory (copy from `.env.example` in README):

```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/corporate_crashout"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (test mode for development)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_TIER1="price_..."
STRIPE_PRICE_TIER2="price_..."
STRIPE_PRICE_TIER3="price_..."
STRIPE_PRICE_ADDON_1ON1="price_..."

# Optional
DISCORD_INVITE_URL="https://discord.gg/..."
ADMIN_EMAIL="admin@corporatecrashout.com"
ADMIN_PASSWORD="Admin123!"
```

### 3. Set Up Database

**Option A: Local PostgreSQL**
```bash
# Create database
createdb corporate_crashout

# Run migrations
npm run db:migrate
```

**Option B: Supabase/Neon/Vercel Postgres**
- Create database in your provider
- Copy connection string to `DATABASE_URL`

### 4. Bootstrap the Application

This script will:
- Verify database connection
- Ensure admin user exists
- Create default content structure

```bash
npm run bootstrap
```

Default admin credentials:
- Email: `admin@corporatecrashout.com` (or `ADMIN_EMAIL` from .env)
- Password: `Admin123!` (or `ADMIN_PASSWORD` from .env)

**⚠️ Change the admin password after first login!**

### 5. Set Up Stripe (Test Mode)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Create products and prices for:
   - Tier 1 (Engine A Basic) - Subscription
   - Tier 2 (Engine A Live) - Subscription
   - Tier 3 (Engine A Complete) - Subscription
   - Add-on (1-on-1 Review) - One-time payment
3. Copy price IDs to `.env`

Verify your Stripe setup:
```bash
npm run stripe:doctor
```

### 6. Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🔧 Utility Scripts

### Bootstrap Application
```bash
npm run bootstrap
```
Creates admin user and default content structure.

### Check Stripe Configuration
```bash
npm run stripe:doctor
```
Verifies all Stripe price IDs are valid and configured correctly.

### Database Management
```bash
npm run db:studio          # Open Prisma Studio (GUI)
npm run db:migrate         # Run migrations
npm run db:push            # Push schema changes
npm run db:generate        # Generate Prisma client
```

## 📋 Health Check

Check if the application is running:
```bash
curl http://localhost:3000/api/health
```

Should return:
```json
{
  "ok": true,
  "timestamp": "2025-01-01T12:00:00.000Z",
  "database": "connected",
  "userCount": 1
}
```

## 🚢 Deployment to Production

See `DEPLOYMENT.md` for full production deployment instructions.

Quick checklist:
- [ ] Create Vercel project
- [ ] Set up production database (Vercel Postgres recommended)
- [ ] Configure all environment variables in Vercel
- [ ] Create Stripe products in **live mode**
- [ ] Set up Stripe webhook pointing to production URL
- [ ] Run `npm run bootstrap` against production database
- [ ] Test subscription flow end-to-end

## 📁 Folder Structure

```
corporate-crashout/
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/             # Utilities (auth, db, stripe, etc.)
├── prisma/          # Database schema
├── scripts/         # Utility scripts (bootstrap, stripe-doctor)
├── control/         # Control documentation
├── README.md        # Full documentation
├── DEPLOYMENT.md    # Deployment guide
└── QUICK_START.md   # This file
```

## 🆘 Troubleshooting

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure database allows connections from your IP

### Stripe Errors
- Run `npm run stripe:doctor` to verify configuration
- Check you're using test keys for development
- Verify webhook URL in Stripe Dashboard

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set (generate with `openssl rand -base64 32`)
- Check `NEXTAUTH_URL` matches your actual URL
- Clear browser cookies

### Can't Access Admin
- Run `npm run bootstrap` to create admin user
- Check user role in database: `role = 'admin'`
- Verify you're logging in with correct email/password

## 📞 Support

For questions or issues, refer to:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Production deployment
- `control/corporate-crashout/CONTROL.md` - Complete specification

