# Push Script Summary & Testing

## Script Location
`tools/push_corporate_crashout.py`

## What You Need to Provide

**Just one thing:**
- Justin's GitHub repository URL (e.g., `https://github.com/justin-username/corporate-crashout.git`)

## How to Run

```bash
python tools/push_corporate_crashout.py <GITHUB_REPO_URL>
```

Example:
```bash
python tools/push_corporate_crashout.py https://github.com/justin-username/corporate-crashout.git
```

## What the Script Does

1. ✅ Verifies source folder exists (`E:\My Drive\apps\corporate-crashout`)
2. ✅ Clones Justin's repo to temporary directory
3. ✅ Checks existing repo structure
4. ✅ Creates `apps/corporate-crashout/` folder
5. ✅ Copies all files from source
6. ✅ Removes `.env` file (if present) to prevent committing secrets
7. ✅ Creates `.env.example` if missing
8. ✅ Verifies critical files exist:
   - `package.json`
   - `prisma/schema.prisma`
   - `control/corporate-crashout/CONTROL.md`
   - `scripts/bootstrap.ts`
   - `scripts/stripe-doctor.ts`
   - `app/api/health/route.ts`
9. ✅ Ensures `.gitignore` excludes `.env`
10. ✅ Stages changes
11. ✅ Commits with descriptive message
12. ✅ Detects branch name (main/master)
13. ✅ Pushes to GitHub
14. ✅ Cleans up temporary files

## Testing Status

✅ **Script compiles** - No syntax errors
✅ **Source folder verified** - Exists and is accessible
✅ **Critical files verified** - All required files present

## Potential Issues & Solutions

### Issue: Authentication Required
**Solution:** The script will prompt for GitHub credentials. Use:
- Username: Your GitHub username
- Password: GitHub Personal Access Token (not your password)

Get a token from: https://github.com/settings/tokens
Required scope: `repo`

### Issue: Branch Name Unknown
**Solution:** Script auto-detects branch name (main or master)

### Issue: No Changes to Commit
**Solution:** Script will exit gracefully with a message if files are already up to date

### Issue: .env File Gets Committed
**Solution:** Script explicitly removes `.env` before committing and ensures `.gitignore` is set

## Verification Checklist (After Push)

On GitHub, verify:
- [ ] `apps/corporate-crashout/` folder exists
- [ ] All subdirectories copied (app/, components/, lib/, prisma/, scripts/, brand/, control/)
- [ ] `package.json` exists and has bootstrap/stripe:doctor scripts
- [ ] `CONTROL.md` exists in `control/corporate-crashout/`
- [ ] `START_HERE.md` exists
- [ ] `README.md` exists
- [ ] No `.env` file visible (should be in .gitignore)
- [ ] Existing repo files preserved (if any)

## Alternative: Use the Otto Prompt

If the script doesn't work, use the Cursor/Otto prompt in `OTTO_PUSH_PROMPT.md`:
1. Copy the prompt
2. Replace `<<JUSTIN_REPO_URL>>` with actual URL
3. Paste into Cursor
4. I'll execute it manually

## Next Steps After Push

Once code is in GitHub, Justin can:
1. Clone the repo
2. Navigate to `apps/corporate-crashout`
3. Follow `START_HERE.md` for setup
4. Deploy using `DEPLOYMENT.md`

