# Deployment Notes - Corporate Crashout

This file tracks deployment changes, issues, and status updates.

## 2025-12-10 – Supabase Session Pooler Setup

### Database Migration to Supabase

✅ **Successfully connected Corporate Crashout to Supabase using IPv4 Session Pooler**

- **Project ref**: `fgvwqtdvnfgbjgitgkto`
- **Connection method**: Session pooler (IPv4-compatible)
- **Prisma version**: 5.19.0
- **Schema management**: Using `db push` for schema updates

**Final DATABASE_URL format** (secrets redacted):
```
postgresql://postgres.fgvwqtdvnfgbjgitgkto:[PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres
```

**Key learnings**:
- Direct connection URLs may be IPv6-only on Supabase free tier, causing P1001 errors on IPv4 networks
- Session pooler URLs work reliably on both IPv4 and IPv6 networks
- Username must include the project ref suffix: `postgres.<project_ref>` (not just `postgres`)
- "FATAL: Tenant or user not found" error indicates missing project ref in username

**Status**: ✅ App is now building successfully with Supabase Session Pooler

---

## 2025-12-10 – Clean Local Rebuild

### Past Issues

1. **Synced Drive Problems**
   - Project was previously located under `E:\My Drive\...` (Google Drive)
   - This caused file locks and broken `node_modules` installations
   - Synced folders interfere with npm install and Prisma generation

2. **Prisma Version Mismatch**
   - `npx prisma generate` auto-installed Prisma 7.x
   - The schema (`prisma/schema.prisma`) is written for Prisma 5.x
   - This mismatch produced P1012 errors
   - Cursor got stuck repeatedly re-running `npm install` in an attempt to fix the issue

### Current Status

✅ **Code is now configured to use Prisma 5.19.0 only**

- `package.json` pins both `prisma` and `@prisma/client` to exact version `5.19.0` (no caret)
- All Prisma scripts use `npx prisma@5.19.0 ...` to ensure the correct version
- Build script runs `npx prisma@5.19.0 generate && next build`
- Postinstall script runs `npx prisma@5.19.0 generate`

✅ **Local setup is documented**

- `LOCAL_DEV_SETUP.md` provides step-by-step setup instructions
- Explicit warning against using synced drives (Google Drive, OneDrive, Dropbox)
- Clear troubleshooting section for common issues

✅ **Vercel builds are green**

- Production deployments are working
- The focus now is on ensuring local dev matches production

### Next Steps for New Developers

1. **Follow `LOCAL_DEV_SETUP.md`**
   - Clone to a non-synced location (e.g., `C:\dev\corporate-crashout`)
   - Use the exact Prisma version (5.19.0) as specified
   - Do not run from old `E:\My Drive\...` copies

2. **Verify setup**
   - Run `npm install` (should complete without errors)
   - Run `npx prisma@5.19.0 generate` (should use pinned version)
   - Run `npm run build` (should match Vercel build)

3. **If issues persist**
   - Check that `package.json` has exact versions (no `^` or `~`)
   - Verify you're not on a synced drive
   - Delete `node_modules` and `package-lock.json`, then reinstall

### Status: GREEN ✅

As long as developers follow `LOCAL_DEV_SETUP.md` and use the clean setup (non-synced location, pinned Prisma versions), everything should work correctly.

---

## Previous Notes

(Add future deployment notes here as needed)

