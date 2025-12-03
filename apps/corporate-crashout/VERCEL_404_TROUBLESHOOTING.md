# Fixing Vercel 404 NOT_FOUND Error

## If Root Directory is Already Set

If you've already set the root directory to `apps/corporate-crashout` but still get a 404, here are the most common causes:

### 1. **Check Build Logs (MOST IMPORTANT)**

The build might be failing silently. Check:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `achillies`
3. Go to **Deployments** tab
4. Click on the **latest deployment**
5. Look at the **Build Logs**

**What to look for:**
- ❌ **Red errors** = Build failed
- ✅ **Green "Build completed"** = Build succeeded, but runtime issue

**Common build errors:**
- Missing environment variables (see #2 below)
- TypeScript errors
- Missing dependencies
- Prisma client not generated

---

### 2. **Missing Required Environment Variables**

Even if the build succeeds, missing env vars can cause runtime 404s. Check:

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Minimum required for initial deploy:**
```env
NEXTAUTH_SECRET=<any-random-32-char-string>
NEXTAUTH_URL=https://achillies.vercel.app
```

**If you want database/Stripe working:**
```env
DATABASE_URL=<your-postgres-url>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
# ... etc
```

**After adding env vars:**
- Click **Save**
- Go to **Deployments** → **Redeploy** (Vercel won't auto-redeploy)

---

### 3. **Verify Build Command**

Check your project settings:

1. Vercel Dashboard → Your Project → **Settings** → **General**
2. Verify:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npm run build` (or `cd apps/corporate-crashout && npm run build` if root dir isn't working)
   - **Output Directory**: `.next` (should auto-detect)
   - **Install Command**: `npm install`

---

### 4. **Check Package.json Build Script**

Verify `package.json` has:
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

If it's missing, the build will fail.

---

### 5. **Root Directory Path Format**

Verify the root directory is set exactly as:
```
apps/corporate-crashout
```

**NOT:**
- ❌ `/apps/corporate-crashout` (no leading slash)
- ❌ `apps/corporate-crashout/` (no trailing slash)
- ❌ `apps\corporate-crashout` (Windows backslashes)

---

### 6. **Prisma Client Not Generated**

If Prisma is used, the build needs to generate the client:

**Option A: Add to build command**
- Change build command to: `prisma generate && next build`

**Option B: Add postinstall script to package.json**
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "next build"
  }
}
```

---

### 7. **TypeScript Configuration Issues**

If you see TypeScript errors in build logs:

- Verify `tsconfig.json` exists in `apps/corporate-crashout/`
- Check for any `// @ts-ignore` or type errors that might be blocking

---

### 8. **Check GitHub Repository Structure**

Verify the code is actually in GitHub:

1. Go to: https://github.com/aluate/achillies
2. Navigate to: `apps/corporate-crashout/`
3. Verify these files exist:
   - ✅ `package.json`
   - ✅ `next.config.js`
   - ✅ `app/layout.tsx`
   - ✅ `app/page.tsx`
   - ✅ `tsconfig.json`

If files are missing, push them again.

---

## Step-by-Step Debugging

1. **Check Build Status**
   - Go to Vercel → Deployments
   - Look for ❌ (failed) or ✅ (success)
   - If failed, read the error in logs

2. **If Build Failed:**
   - Copy the error message
   - Check environment variables are set
   - Verify all files are in GitHub
   - Try building locally: `npm run build` (in `apps/corporate-crashout`)

3. **If Build Succeeded But 404:**
   - Check environment variables are set
   - Verify `NEXTAUTH_URL` matches your Vercel URL
   - Check browser console (F12) for JavaScript errors
   - Try redeploying

4. **Nuclear Option - Fresh Deploy:**
   - Delete the Vercel project
   - Re-import from GitHub
   - Set root directory: `apps/corporate-crashout`
   - Add minimum env vars
   - Deploy

---

## Quick Test Commands

**Test locally first:**
```bash
cd apps/corporate-crashout
npm install
npm run build
npm run start
```

If this works locally but not on Vercel, it's a configuration issue.

---

## Still Not Working?

Share:
1. Screenshot of Vercel build logs
2. Screenshot of Environment Variables page
3. Screenshot of General Settings (build command, root directory)

