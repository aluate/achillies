# CONTROL — Corporate Crashout Trading App

## Project Name

Corporate Crashout Trading — Subscription Futures Trading Platform  
Domain: `corporatecrashouttrading.com`

## Goal

Build a **subscription-based web application** for Justin's NQ Futures trading brand **Corporate Crashout Trading** that:

- Sells membership tiers via **Stripe subscriptions**
- Gates content and access based on subscription tier
- Supports add-on **1-on-1 trading review sessions**
- Provides an **admin dashboard** to manage users, content, and sessions
- Tracks **manual TradingView access** (no TradingView API)

Deployable on **Vercel** (primary target). Replit acceptable for dev / demos.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router) + React
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Auth**: NextAuth with Credentials provider (email + password)
- **Database**: PostgreSQL (via Prisma ORM)
- **Payments**: Stripe
  - Stripe Checkout
  - Stripe Billing
  - Stripe Customer Portal
  - Webhooks for subscription lifecycle
- **Server**: Next.js Route Handlers + Server Actions
- **Hosting**: Vercel (assume Vercel Postgres or other managed Postgres)

---

## Core Business Concepts

### Subscription Tiers

**Tier 1 — Engine A Basic**

- Engine A TradingView indicator page
- Private Discord access
- Tier 1 lessons/content

**Tier 2 — Engine A Live**

- Everything in Tier 1
- 2-hour live trading sessions (twice per week)
- Tier 2 learning content
- Live session archives

**Tier 3 — Engine A Complete**

- All indicators (Engine A, Volume Aggro, Liquidity, Structure, etc.)
- Everything in Tier 1 & 2
- All premium content (all indicator setup pages, documents, videos)

**Add-On — 1-on-1 Trading Review**

- Bookable session, only for active subscribers
- Paid via Stripe
- Admin marks fulfilled after session
- Gives access to scheduling and Zoom link

> **TradingView is entirely manual.** No integration. Admin just uses the dashboard to know who needs access.

---

## Roles & Access Rules

### Roles

- `user`
- `admin`

### TradingView Access

- Field: `tradingViewAccess` enum: `pending` | `granted`
- Default for new subscribers: `pending`
- Only admin can toggle this
- Admin dashboard must have:
  - Filter: "Show users needing TradingView access"
  - Toggle to mark `pending` → `granted`

### Subscription / Access Rules

- If **subscription is active**:
  - User can log in
  - Tier-based pages unlocked
  - Discord invite button visible
- If **subscription is canceled / past_due / incomplete**:
  - Access to gated pages revoked immediately
  - Discord invite button hidden
- **Upgrade**:
  - Higher-tier pages unlocked immediately
- **Downgrade**:
  - Higher-tier pages hidden immediately
- **Add-on purchase**:
  - Active subscriber only
  - Unlock special scheduling page + Zoom link after booking

---

## Data Model (Prisma Schema)

Implement Prisma models equivalent to:

```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  passwordHash      String
  name              String?
  role              String   @default("user") // "user" | "admin"
  stripeCustomerId  String? 
  tradingViewAccess TradingViewAccess @default(PENDING)
  createdAt         DateTime @default(now())

  subscriptions     Subscription[]
  addOnPurchases    AddOnPurchase[]
}

enum TradingViewAccess {
  PENDING
  GRANTED
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String
  user                 User     @relation(fields: [userId], references: [id])
  tier                 Int      // 1, 2, 3
  stripeSubscriptionId String   @unique
  status               SubscriptionStatus
  currentPeriodEnd     DateTime
  createdAt            DateTime @default(now())
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  INCOMPLETE
}

model Section {
  id         String  @id @default(cuid())
  title      String
  orderIndex Int
  lessons    Lesson[]
}

model Lesson {
  id            String  @id @default(cuid())
  sectionId     String
  section       Section @relation(fields: [sectionId], references: [id])
  title         String
  description   String?
  googleDriveUrl String
  orderIndex    Int
}

model LiveSession {
  id          String   @id @default(cuid())
  date        DateTime
  title       String
  description String?
  meetingUrl  String
}

model AddOnPurchase {
  id                    String   @id @default(cuid())
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
  stripePaymentIntentId String   @unique
  sessionDate           DateTime?
  fulfilled             Boolean  @default(false)
  createdAt             DateTime @default(now())
}
```

Adjust field names/types as needed, but keep the **semantics** identical.

---

## Pages / Routes

App Router routes (URL → purpose):

* `/` — Marketing homepage (explain Corporate Crashout, tiers, CTA to subscribe)
* `/auth/signup` — Create account + choose tier + Stripe Checkout start
* `/auth/login` — Login with email/password
* `/dashboard` — User home, "Your Progress" + quick links based on tier
* `/content/[sectionId]/[lessonId]` — Lesson viewer page (pulls Google Drive URL)
* `/subscriptions` — View/change subscription tier (links to Stripe customer portal)
* `/account` — Profile, TradingView status, billing portal link, cancel/upgrade buttons
* `/discord` — Shows Discord invite / join button (only if active subscriber)
* `/indicators` — Indicator/Tools overview (tier-gated)
* `/livesessions` — Upcoming live sessions + archives (tier 2+)
* `/addons` — Add-on options + 1-on-1 booking flow
* `/success` — Stripe success return page
* `/cancel` — Stripe cancel return page

**Admin**

* `/admin` — Admin home (protected)
* `/admin/users` — User list, subscription info, TradingView status toggle
* `/admin/tradingview` — Filter view: "users needing TradingView access"
* `/admin/sections` — CRUD for content sections
* `/admin/lessons` — CRUD for lessons (title, description, Google Drive URL)
* `/admin/livesessions` — CRUD for LiveSession (date/time, link)
* `/admin/addons` — View add-on purchases, mark fulfilled

All admin pages must be **role-protected** (`admin`).

All content pages must be **subscription-protected** according to tier rules above.

---

## Stripe Integration

Use:

* **Stripe Products & Prices** for:
  * Tier 1, Tier 2, Tier 3 subscriptions
  * Add-on 1-on-1 session
* **Stripe Checkout** for:
  * New subscription purchase
  * Add-on purchase
* **Stripe Billing + Customer Portal** for:
  * Updating card / payment method
  * Changing subscription tier
  * Viewing billing history

**Webhooks** must update the database on:

* `checkout.session.completed`
* `customer.subscription.created`
* `customer.subscription.updated`
* `customer.subscription.deleted`
* `invoice.payment_failed`
* Add-on payment events (via Payment Intent)

On webhook events:

* Ensure `User` has `stripeCustomerId`
* Create or update `Subscription` with correct `tier`, `status`, and `currentPeriodEnd`
* Revoke or grant access immediately based on status

---

## Admin Content Management

**Sections & Lessons**

* Admin can:
  * Create Sections (title, orderIndex)
  * Create Lessons:
    * Section
    * Title
    * Description
    * Google Drive URL
    * orderIndex
  * Edit or delete entries

**Live Sessions**

* Admin can:
  * Add/edit/remove sessions (date, title, description, meetingUrl)
  * These show on `/livesessions` based on tier access (Tier 2+)

**Add-on Sessions**

* Admin can:
  * View list of AddOnPurchase rows
  * See user info, email, tier
  * Mark `fulfilled = true` after session
  * Record `sessionDate` if needed

---

## UI / UX Requirements

* TailwindCSS, simple but **premium / pro trading** feel.
* Dashboard for users must show:
  * Current tier
  * TradingView Access status (Pending / Granted)
  * Quick buttons:
    * "Join Discord"
    * "View Lessons"
    * "Live Sessions"
    * "Manage Billing"
    * "Book 1-on-1 Review"
* Clear "Upgrade" and "Downgrade" flows using Stripe Portal.
* For unauthorized/tier-mismatch pages:
  * Show friendly gated message ("Upgrade to Engine A Live to view live sessions", etc.)

---

## Environment & Config

Prepare `.env.example` including:

* `DATABASE_URL=`
* `NEXTAUTH_SECRET=`
* `NEXTAUTH_URL=`
* `STRIPE_SECRET_KEY=`
* `STRIPE_PUBLISHABLE_KEY=`
* `STRIPE_WEBHOOK_SECRET=`
* `STRIPE_PRICE_TIER1=`
* `STRIPE_PRICE_TIER2=`
* `STRIPE_PRICE_TIER3=`
* `STRIPE_PRICE_ADDON_1ON1=`
* `DISCORD_INVITE_URL=` (optional, can also be in DB/settings)

---

## Non-Goals (for v1)

* No TradingView API integration
* No in-app Discord chat
* No complex progress tracking (just basic "you have access to these sections")
* No multi-currency logic (assume USD)
* No coupon logic in v1 (Stripe can handle manually)

---

## Open Questions / Needs From Justin

These don't block scaffolding but are needed before production:

* **Brand Brief** (see `brand/BRAND_BRIEF.md`):
  * Complete brand brief with colors, fonts, taglines
  * Use `brand/BRAND_PROMPT_GENERATOR.md` with AI if needed
  * Logo/brandmark (if available)
* Final **copy** for:
  * Homepage
  * Tier descriptions
  * Legal pages (Terms, Risk Disclaimer, Refund Policy)
* Brand details:
  * Color tokens (defined in brand brief)
  * Typography choices (defined in brand brief)
* Actual:
  * Discord invite URL
  * Google Drive folder structure (how he wants to organize Sections/Lessons)
  * Stripe product & price IDs
* Preferred scheduling tool for 1-on-1s (built-in simple date/time vs Calendly/other link)

