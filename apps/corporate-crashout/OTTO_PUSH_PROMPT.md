# Otto Push Prompt - Ready to Paste

Copy and paste this entire prompt into Cursor, replacing `<<JUSTIN_REPO_URL>>` with the actual GitHub repository URL.

---

```text
You are helping to push the Corporate Crashout application to Justin's GitHub repository.

SOURCE LOCATION (local folder):
E:\My Drive\apps\corporate-crashout

DESTINATION REPO (GitHub):
<<JUSTIN_REPO_URL>>
(Replace with actual URL, e.g., https://github.com/justin-username/corporate-crashout.git)

TARGET PATH IN REPO:
apps/corporate-crashout/

TASKS:

1. Clone the destination GitHub repository to a temporary directory
   - Use HTTPS URL with authentication if needed
   - Clone to a temp folder (e.g., temp_justin_repo)

2. Verify the clone succeeded and examine existing repo structure
   - Check what files/folders already exist
   - Note any existing README or configuration files to preserve

3. Create folder structure in cloned repo:
   - Create apps/ directory if it doesn't exist
   - Create apps/corporate-crashout/ directory
   - If apps/corporate-crashout/ already exists, remove ONLY that folder first

4. Copy ALL contents from source to destination:
   Source: E:\My Drive\apps\corporate-crashout
   Destination: temp_justin_repo/apps/corporate-crashout/
   
   Include ALL files and folders:
   - app/ (entire Next.js app structure)
   - components/
   - lib/
   - prisma/
   - scripts/
   - brand/
   - control/
   - All .md files (README.md, START_HERE.md, DEPLOYMENT.md, etc.)
   - package.json, tsconfig.json, next.config.js
   - tailwind.config.ts, postcss.config.js
   - All batch files (START_LOCAL.bat, etc.)
   - .gitignore
   - Any other files

5. IMPORTANT - File handling:
   - DO NOT copy any .env file (only .env.example should be included if it exists)
   - DO NOT overwrite existing README.md in repo root (if it exists)
   - DO NOT delete files outside of apps/corporate-crashout/
   - Preserve .gitignore rules
   - Ensure node_modules/ is in .gitignore

6. Verify critical files are present:
   - apps/corporate-crashout/package.json exists
   - apps/corporate-crashout/prisma/schema.prisma exists
   - apps/corporate-crashout/control/corporate-crashout/CONTROL.md exists
   - apps/corporate-crashout/scripts/bootstrap.ts exists
   - apps/corporate-crashout/scripts/stripe-doctor.ts exists
   - apps/corporate-crashout/app/api/health/route.ts exists
   - apps/corporate-crashout/START_HERE.md exists

7. Stage all changes:
   - git add apps/
   - git add .gitignore (if updated)
   - Verify .env is NOT staged

8. Commit changes:
   - Message: "Add Corporate Crashout Next.js app - complete subscription platform with Stripe, Auth, Prisma, admin dashboard, and utility scripts"
   - Use: git commit -m "..."

9. Push to main branch:
   - git push origin main
   - Handle authentication if needed (may prompt for credentials)

10. Verify push succeeded:
    - Check git status shows clean working directory
    - Verify remote shows the commit
    - Optionally verify on GitHub web interface

11. Clean up:
    - Remove temporary clone directory

12. Final verification checklist:
    Print a summary showing:
    - ✅ Repo now contains apps/corporate-crashout/
    - ✅ All subdirectories copied (app/, components/, lib/, prisma/, scripts/, brand/, control/)
    - ✅ package.json includes bootstrap and stripe:doctor scripts
    - ✅ CONTROL.md present in control/corporate-crashout/
    - ✅ Health endpoint exists at app/api/health/route.ts
    - ✅ Documentation files included (START_HERE.md, DEPLOYMENT.md, etc.)
    - ✅ No .env files committed
    - ✅ Existing repo files preserved

If any step fails, stop and report the error with details.
```

---

## Optional: Update Root README

Add this after the main prompt if you want Otto to also update the repo's root README:

```text
After successfully pushing, update the root README.md file (if it exists) by adding a section:

"## Corporate Crashout Trading Platform

A subscription-based futures trading education platform built with Next.js 14.

**Location:** `apps/corporate-crashout/`

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL
- NextAuth
- Stripe (Checkout, Billing, Portal, Webhooks)
- TailwindCSS

**Quick Start:**
```bash
cd apps/corporate-crashout
npm install
npm run bootstrap
npm run dev
```

See `apps/corporate-crashout/START_HERE.md` for complete setup instructions.
See `apps/corporate-crashout/DEPLOYMENT.md` for production deployment.

**Documentation:**
- Full docs: `apps/corporate-crashout/README.md`
- Setup guide: `apps/corporate-crashout/START_HERE.md`
- Deployment: `apps/corporate-crashout/DEPLOYMENT.md`
- Control doc: `apps/corporate-crashout/control/corporate-crashout/CONTROL.md`
""

If README.md doesn't exist, create it with this content plus a brief project description.
```

---

## How to Use

1. **Get Justin's repo URL** (e.g., `https://github.com/justin-username/corporate-crashout`)

2. **Replace `<<JUSTIN_REPO_URL>>`** in the prompt above with the actual URL

3. **Paste the prompt into Cursor** (this conversation with me)

4. **I'll execute it** - Otto will handle all the Git operations

5. **Verify on GitHub** - Check that files are there

That's it! No manual Git commands needed.

---

## What You Need to Provide

**Just this:**
- Justin's GitHub repository URL

**That's it!** Otto and I handle:
- Cloning
- Copying files
- Committing
- Pushing
- Verification

