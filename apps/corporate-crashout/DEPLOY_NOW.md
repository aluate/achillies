# Deploy Corporate Crashout to Vercel - Quick Guide

## ✅ Repository Status
- **GitHub Repo**: https://github.com/elikjwilliams/CorporateCrashoutTrading
- **Code**: Already pushed and ready
- **Root Directory**: `apps/corporate-crashout`

## 🚀 Deploy via Vercel Dashboard (Easiest)

### Step 1: Import Project
1. Go to: https://vercel.com/new
2. Sign in with GitHub
3. Click **"Import Git Repository"**
4. Search for: `elikjwilliams/CorporateCrashoutTrading`
5. Click **"Import"**

### Step 2: Configure Project
**CRITICAL Settings:**
- **Root Directory**: Click "Edit" → Change to: `apps/corporate-crashout`
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: Leave default (Vercel auto-detects)
- **Output Directory**: Leave default (.next)

### Step 3: Environment Variables
Click **"Environment Variables"** and add:

**Required for basic deployment:**
```
NEXTAUTH_SECRET=<generate-random-32-chars>
NEXTAUTH_URL=https://your-app.vercel.app
```

**For full functionality (add after database is set up):**
```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
STRIPE_PRICE_ADDON_1ON1=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
DISCORD_INVITE_URL=https://discord.gg/...
```

**Generate NEXTAUTH_SECRET:**
- On Windows PowerShell: `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})))`
- Or use: https://generate-secret.vercel.app/32

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Site will be live at: `https://corporate-crashout.vercel.app` (or custom name)

## ✅ After Deployment

### Set Up Database
1. In Vercel project → **Storage** tab
2. Create **Postgres** database
3. Copy connection string → Update `DATABASE_URL` env var
4. Run migrations (see below)

### Run Database Migrations
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Link to project
vercel link

# Set DATABASE_URL (if not in Vercel env vars)
export DATABASE_URL="postgresql://..."

# Run migrations
cd apps/corporate-crashout
npx prisma migrate deploy
```

Or via Vercel dashboard:
1. Go to project → Settings → Environment Variables
2. Ensure DATABASE_URL is set
3. Go to Deployments → Latest deployment → View Function Logs
4. Can run migrations via Vercel CLI or manually

### Create Admin User
1. Sign up via the app at your Vercel URL
2. Connect to database (Prisma Studio or SQL client)
3. Update user role to admin:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## 🔧 Alternative: Deploy via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
cd "E:\My Drive"
vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No (or Yes if already created)
# - Project name: corporate-crashout
# - Directory: apps/corporate-crashout
# - Override settings? No

# Set environment variables
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
# ... add all other env vars

# Deploy to production
vercel --prod
```

## 📋 Post-Deployment Checklist

- [ ] Homepage loads
- [ ] Can access `/auth/signup`
- [ ] Database migrations run
- [ ] Admin user created
- [ ] Stripe webhook configured (if using Stripe)
- [ ] Environment variables set
- [ ] Custom domain added (optional)

## 🆘 Troubleshooting

### Build Fails
- Check root directory is `apps/corporate-crashout`
- Verify `package.json` exists in that folder
- Check build logs in Vercel dashboard

### Database Connection Fails
- Verify `DATABASE_URL` is correct
- Check database allows Vercel IPs (if external DB)
- For Vercel Postgres, should work automatically

### Auth Not Working
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches actual domain
- Check environment variables are set for Production environment

## 🌐 Custom Domain Setup

1. In Vercel project → **Settings** → **Domains**
2. Add domain: `corporatecrashouttrading.com`
3. Follow DNS instructions
4. Update `NEXTAUTH_URL` to use custom domain
5. Update Stripe webhook URL if using custom domain

---

**Quick Start:** Just go to https://vercel.com/new and import the GitHub repo!

