# Local Development Setup - Corporate Crashout

This guide will help you set up Corporate Crashout on a new machine for local development.

## Requirements

Before you begin, ensure you have the following installed:

- **Git** - For cloning the repository
- **Node.js** - Version 20 or higher (but less than 25). Check with `node --version`
- **npm** - Comes with Node.js. Check with `npm --version`
- **PostgreSQL** - We use Supabase (cloud PostgreSQL). No local database required.

## Clone Location Rule

⚠️ **IMPORTANT**: DO NOT clone or run this project from Google Drive, OneDrive, Dropbox, or any other synced folder.

Synced folders cause:
- File locks that break `npm install`
- Corrupted `node_modules` directories
- Prisma generation failures
- Infinite install loops

**Recommended paths:**
- Windows: `C:\dev\corporate-crashout`
- macOS/Linux: `~/dev/corporate-crashout` or `/opt/dev/corporate-crashout`

## Setup Steps

### 1. Clone the Monorepo

```bash
git clone https://github.com/aluate/achillies.git
cd achillies/apps/corporate-crashout
```

### 2. Create Environment File

Copy the example environment file and fill in your values:

```bash
# On Windows (PowerShell)
Copy-Item .env.example .env

# On macOS/Linux
cp .env.example .env
```

Open `.env` in a text editor and fill in:

- **DATABASE_URL**: Supabase Session Pooler connection string
  - **Format**: `postgresql://postgres.<project_ref>:[PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`
  - **Example**: `postgresql://postgres.fgvwqtdvnfgbjgitgkto:[PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres`
  - **Where to find**: Supabase Dashboard > Project Settings > Database > Connection Pooling > Session mode
  - **Important**: 
    - Use the **Session pooler** URL (not Direct connection) to avoid IPv6 issues on IPv4 networks
    - Username must include the `.` and project ref suffix (e.g., `postgres.fgvwqtdvnfgbjgitgkto`, not just `postgres`)
    - Replace `[PASSWORD]` with your actual database password

- **NEXTAUTH_SECRET**: Generate a random secret:
  - Windows PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))`
  - macOS/Linux: `openssl rand -base64 32`
  - Or use: https://generate-secret.vercel.app/32

- **NEXTAUTH_URL**: For local dev, use `http://localhost:3000`

- **Stripe keys** (optional): If you're testing Stripe integration, add your test keys from the Stripe Dashboard

**Note**: Never commit `.env` to Git. It's already in `.gitignore`.

### 3. Install Dependencies and Generate Prisma Client

```bash
npm install
npx prisma@5.19.0 generate
```

This will:
- Install all npm packages
- Generate the Prisma Client using the pinned version (5.19.0)

**Expected behavior**: The install should complete without errors. If `npx prisma generate` tries to install Prisma 7.x or complains about version mismatches, check that `package.json` has `"prisma": "5.19.0"` (exact version, no caret).

### 4. Set Up Database

We use **Supabase** as the canonical database. Push the Prisma schema to your Supabase database:

```bash
npm run db:push
```

This will create all tables and relationships defined in `prisma/schema.prisma`.

**Note**: Make sure your `DATABASE_URL` in `.env` uses the **Session pooler** URL (not Direct connection) to avoid connection issues.

### 5. (Optional) Create Admin User

Run the bootstrap script to create an admin user:

```bash
npm run bootstrap
```

This uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file, or defaults to `admin@corporatecrashout.com` / `Admin123!`.

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build Check

To verify that your local setup matches what Vercel will build:

```bash
npx prisma@5.19.0 generate
npm run build
```

This should complete without errors. The build script automatically runs `npx prisma@5.19.0 generate` before building, ensuring the Prisma Client is up to date.

## Common Gotchas

### "npx prisma generate tries to install Prisma 7"

**Problem**: You're not using the clean setup, or `package.json` has the wrong Prisma version.

**Solution**:
1. Verify `package.json` has `"prisma": "5.19.0"` (exact, no caret) in `devDependencies`
2. Verify `"@prisma/client": "5.19.0"` (exact, no caret) in `dependencies`
3. Delete `node_modules` and `package-lock.json`
4. Run `npm install` again
5. Make sure you're not running from an old `E:\My Drive\...` copy

### "npm install feels stuck forever"

**Problem**: You're likely on a synced drive or have file locks.

**Solution**:
1. Make sure you're not in Google Drive / OneDrive / Dropbox
2. Close any old terminals or processes that might be locking files
3. Move the project to a non-synced location (e.g., `C:\dev\corporate-crashout`)
4. Try again

### "P1012 error from Prisma"

**Problem**: Prisma version mismatch or schema incompatibility.

**Solution**:
1. Ensure you're using Prisma 5.19.0 (check `package.json`)
2. Ensure your `prisma/schema.prisma` is compatible with Prisma 5.x
3. Run `npx prisma@5.19.0 generate` explicitly
4. If issues persist, check that your `DATABASE_URL` is valid

### "P1001: Can't reach database server"

**Problem**: You're likely using the Direct connection URL on an IPv4 network, but Supabase free tier direct connections may be IPv6-only.

**Solution**:
1. Use the **Session pooler** URL instead of Direct connection
2. Get it from: Supabase Dashboard > Project Settings > Database > Connection Pooling > Session mode
3. Format: `postgresql://postgres.<project_ref>:[PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`
4. Update your `DATABASE_URL` in `.env` and try again

### "FATAL: Tenant or user not found"

**Problem**: You're using `postgres` as the username instead of `postgres.<project_ref>`.

**Solution**:
1. Your username must include the project ref suffix
2. Format: `postgres.<project_ref>` (e.g., `postgres.fgvwqtdvnfgbjgitgkto`)
3. Update your `DATABASE_URL` in `.env` to use the correct username

### "Cannot find module '@prisma/client'"

**Problem**: Prisma Client wasn't generated.

**Solution**:
```bash
npx prisma@5.19.0 generate
```

This should create the client in `node_modules/.prisma/client`.

## Next Steps

- Read `DEPLOY_OVERVIEW.md` for deployment information
- Check `DEPLOY_NOTES.md` for recent changes and status
- Review the codebase structure in `README.md`

