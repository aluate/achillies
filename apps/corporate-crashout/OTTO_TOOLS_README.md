# Otto Tools - Utility Scripts for Corporate Crashout

This document describes the utility scripts that Otto (and you) can use to manage the Corporate Crashout application.

## 🛠️ Available Tools

### 1. Bootstrap Application (`npm run bootstrap`)

**What it does:**
- Verifies database connection
- Checks required environment variables
- Ensures admin user exists (creates if missing)
- Seeds default content structure (sections/lessons) if database is empty

**Usage:**
```bash
npm run bootstrap
```

**Environment Variables:**
- `ADMIN_EMAIL` - Admin email (default: `admin@corporatecrashout.com`)
- `ADMIN_PASSWORD` - Admin password (default: `Admin123!`)
- `DATABASE_URL` - Required

**When to use:**
- First time setup (local or production)
- After database reset
- To create/update admin user
- To seed initial content structure

**Otto Command:**
```
bootstrap_corporate_crashout
```

---

### 2. Stripe Doctor (`npm run stripe:doctor`)

**What it does:**
- Verifies Stripe API connection
- Checks all price IDs from environment variables
- Validates each price exists in Stripe
- Displays product information (name, amount, interval)
- Reports configuration errors

**Usage:**
```bash
npm run stripe:doctor
```

**Checks:**
- ✅ `STRIPE_SECRET_KEY` is set
- ✅ `STRIPE_PUBLISHABLE_KEY` is set (warning if missing)
- ✅ `STRIPE_WEBHOOK_SECRET` is set (warning if missing)
- ✅ `STRIPE_PRICE_TIER1` exists and is valid
- ✅ `STRIPE_PRICE_TIER2` exists and is valid
- ✅ `STRIPE_PRICE_TIER3` exists and is valid
- ✅ `STRIPE_PRICE_ADDON_1ON1` exists and is valid

**Output:**
```
✅ Tier 1 (Engine A Basic)
   Price ID: price_xxx
   Product: Engine A Basic (prod_xxx)
   Amount: $29.00 /month
   Active: Yes
```

**Exit Codes:**
- `0` - All checks passed
- `1` - One or more checks failed

**When to use:**
- Before deployment
- After creating new Stripe products
- When troubleshooting payment issues
- In CI/CD pipeline

**Otto Command:**
```
stripe_doctor_corporate_crashout
```

---

### 3. Health Check API (`/api/health`)

**What it does:**
- Provides application health status
- Checks database connectivity
- Returns user count
- Timestamp for monitoring

**Usage:**
```bash
curl http://localhost:3000/api/health
```

**Response (Success):**
```json
{
  "ok": true,
  "timestamp": "2025-01-01T12:00:00.000Z",
  "database": "connected",
  "userCount": 5
}
```

**Response (Error):**
```json
{
  "ok": false,
  "timestamp": "2025-01-01T12:00:00.000Z",
  "error": "Database connection failed"
}
```

**HTTP Status:**
- `200` - Application healthy
- `500` - Application unhealthy

**When to use:**
- Monitoring and uptime checks
- Pre-deployment verification
- Troubleshooting connection issues
- Load balancer health checks

**Otto Command:**
```
health_check_corporate_crashout
```

---

## 🚀 Deployment Workflow

Recommended workflow for deploying Corporate Crashout:

1. **Pre-deployment checks:**
   ```bash
   npm run stripe:doctor
   curl http://localhost:3000/api/health
   ```

2. **Deploy to production:**
   - Push to Git (triggers Vercel deploy)
   - Or deploy via Vercel CLI

3. **Post-deployment:**
   ```bash
   # Run migrations
   npx prisma migrate deploy
   
   # Bootstrap (if needed)
   npm run bootstrap
   
   # Verify health
   curl https://corporatecrashouttrading.com/api/health
   ```

---

## 📋 Integration with Otto

These tools can be integrated into Otto as automated commands:

1. **Bootstrap Tool**
   - Checks for required env vars
   - Runs migrations if needed
   - Creates admin user
   - Seeds content

2. **Stripe Doctor Tool**
   - Validates Stripe configuration
   - Can be run before every deploy
   - Fails deployment if Stripe is misconfigured

3. **Health Check Tool**
   - Monitors application uptime
   - Alerts on failures
   - Can be used for automated testing

---

## 🔧 Scripts Location

All scripts are in the `scripts/` directory:
- `scripts/bootstrap.ts` - Bootstrap script
- `scripts/stripe-doctor.ts` - Stripe verification

API routes are in `app/api/`:
- `app/api/health/route.ts` - Health check endpoint

---

## 📝 Notes

- All scripts use TypeScript and run with `tsx`
- Scripts read from `.env` file automatically
- Exit codes can be used for CI/CD integration
- Scripts output colored console messages (✅ ❌ ⚠️)

---

## 🆘 Troubleshooting

**Bootstrap fails:**
- Check `DATABASE_URL` is correct
- Verify database is running
- Check admin credentials in env

**Stripe Doctor fails:**
- Verify Stripe keys are correct
- Check you're using test keys for test mode
- Verify price IDs exist in Stripe Dashboard

**Health check fails:**
- Check database connection
- Verify Prisma client is generated
- Check application logs

