# Pushing Corporate Crashout to Justin's GitHub Repo

This guide explains how to push the Corporate Crashout application to Justin's GitHub repository.

## What You Need to Provide

**From Justin, you need:**
1. **GitHub Repository URL** (e.g., `https://github.com/justin-username/corporate-crashout`)
2. **GitHub Access** - One of:
   - GitHub Personal Access Token (PAT) with repo permissions
   - OR GitHub username + password (if not using 2FA)
   - OR SSH key set up for GitHub

**Local information:**
- **Source folder path**: `E:\My Drive\apps\corporate-crashout`

## What Otto/Me Can Handle

✅ **Otto can automate:**
- Cloning Justin's repo
- Copying the app folder into it
- Creating commits
- Pushing to GitHub
- Verifying the push worked

✅ **I can:**
- Create the automation script/prompt
- Handle file organization
- Preserve existing repo contents
- Update documentation

## Quick Answer: What You Need to Do

**Option 1: If you have GitHub token configured**

Just give me:
- Justin's repo URL
- Tell me to run the push command

I'll handle the rest!

**Option 2: Manual (if automation doesn't work)**

1. Get Justin's repo URL
2. Clone it locally
3. Copy the `corporate-crashout` folder into it
4. Commit and push

---

## Step-by-Step: Automated Push (Recommended)

### Step 1: Get Information from Justin

Ask Justin for:
- **GitHub repo URL** (the full HTTPS URL)
- **Does the repo already have content?** (so we know if we need to preserve anything)

### Step 2: Configure GitHub Access (if needed)

**If using Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Generate new token with `repo` permissions
3. Add to your `.env` file:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   ```

**OR use Git Credential Manager:**
- Git will prompt for credentials when needed
- Use GitHub username + Personal Access Token as password

### Step 3: Run the Push Command

Use the Otto command (see below) or give me Justin's repo URL and I'll run it for you.

---

## Otto Command to Push

Once you have Justin's repo URL, run this (or I'll run it for you):

```bash
python tools/infra.py push-to-github \
  --source "E:/My Drive/apps/corporate-crashout" \
  --repo-url "https://github.com/justin-username/corporate-crashout" \
  --target-path "apps/corporate-crashout"
```

**Or use the Cursor prompt below** if the command doesn't exist yet.

---

## Cursor/Otto Prompt (Copy-Paste Ready)

Paste this prompt into Cursor, replacing the placeholders:

```text
You are helping to push the Corporate Crashout application to Justin's GitHub repository.

SOURCE LOCATION:
E:\My Drive\apps\corporate-crashout

DESTINATION REPO:
<<JUSTIN_REPO_URL>>  (replace with actual URL, e.g., https://github.com/justin-username/corporate-crashout)

TARGET PATH IN REPO:
apps/corporate-crashout/

REQUIREMENTS:
1. Clone the destination repo to a temporary location
2. Create the apps/corporate-crashout/ folder structure if it doesn't exist
3. Copy ALL contents from the source folder to apps/corporate-crashout/ in the cloned repo
4. Preserve any existing files in the repo (do NOT delete anything else)
5. If apps/corporate-crashout/ already exists in the repo, remove ONLY that folder before copying
6. Stage all changes
7. Commit with message: "Add Corporate Crashout Next.js app - complete subscription platform with Stripe, Auth, Prisma, and admin dashboard"
8. Push to main branch
9. Verify the push succeeded
10. Clean up temporary clone directory

IMPORTANT:
- Do NOT commit .env files (only .env.example should be included)
- Do NOT overwrite existing README or other files in repo root
- Ensure package.json scripts are preserved
- Include all subdirectories: app/, components/, lib/, prisma/, scripts/, brand/, control/
- Include all documentation files: README.md, START_HERE.md, DEPLOYMENT.md, etc.

After pushing, verify:
- apps/corporate-crashout/ exists in the repo
- All subdirectories are present
- package.json has bootstrap and stripe:doctor scripts
- CONTROL.md exists in control/corporate-crashout/
- Health endpoint exists at app/api/health/route.ts
```

---

## Manual Alternative (If Needed)

If automation doesn't work, here's the manual process:

### 1. Clone Justin's Repo

```bash
cd "E:\My Drive"
git clone <<JUSTIN_REPO_URL>> justin-corporate-crashout
cd justin-corporate-crashout
```

### 2. Create Folder Structure

```bash
mkdir -p apps\corporate-crashout
```

### 3. Copy All Files

```bash
xcopy "..\apps\corporate-crashout\*" "apps\corporate-crashout\" /E /I /H /Y
```

### 4. Remove .env if it exists

```bash
del apps\corporate-crashout\.env 2>nul
```

### 5. Commit and Push

```bash
git add .
git commit -m "Add Corporate Crashout Next.js app - complete subscription platform"
git push origin main
```

---

## After Pushing - Verification Checklist

Check on GitHub that:
- [ ] `apps/corporate-crashout/` folder exists
- [ ] All subdirectories are present (app/, components/, lib/, prisma/, scripts/, brand/, control/)
- [ ] `package.json` exists and has bootstrap/stripe:doctor scripts
- [ ] `CONTROL.md` exists in `control/corporate-crashout/`
- [ ] `START_HERE.md` exists
- [ ] `README.md` exists
- [ ] No `.env` file was committed (check `.gitignore` includes it)
- [ ] Existing repo files are still there (if any)

---

## Troubleshooting

### "Authentication failed"
- Check GitHub token is set in `.env` as `GITHUB_TOKEN`
- OR use Git Credential Manager
- OR set up SSH keys

### "Repository not found"
- Verify the repo URL is correct
- Verify you have access to the repo
- Check if it's a private repo (may need token with repo scope)

### "File conflicts"
- The prompt should handle this, but if conflicts occur:
- Check what files conflict
- Decide if we should preserve Justin's version or ours
- Manually resolve conflicts

---

## Next Steps After Push

Once code is in GitHub:

1. **Justin can clone and run locally:**
   ```bash
   git clone <<REPO_URL>>
   cd corporate-crashout/apps/corporate-crashout
   npm install
   npm run bootstrap
   npm run dev
   ```

2. **Deploy to production:**
   - See `DEPLOYMENT.md` for Vercel deployment
   - Configure environment variables in Vercel
   - Set up Stripe and database

---

**Ready to push?** Give me Justin's repo URL and I'll handle it!

