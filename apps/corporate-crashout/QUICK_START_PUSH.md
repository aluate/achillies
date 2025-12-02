# Quick Start: Push to Justin's GitHub

## What You Need
Just **Justin's GitHub repository URL**

Example: `https://github.com/justin-username/corporate-crashout.git`

## Run This Command

```bash
python tools/push_corporate_crashout.py https://github.com/justin-username/corporate-crashout.git
```

Replace the URL with Justin's actual repo URL.

## What Happens

The script will:
1. Clone Justin's repo
2. Copy the Corporate Crashout app into `apps/corporate-crashout/`
3. Commit and push everything
4. Verify it worked

**That's it!** No manual steps needed.

## If You Need GitHub Authentication

The script may prompt for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (NOT your password)

**Get a token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select `repo` scope
4. Copy the token
5. Use it as the password when prompted

## Alternative: Use Otto Prompt

If the script doesn't work, see `OTTO_PUSH_PROMPT.md` for a Cursor prompt that I can execute manually.

## After Push

Verify on GitHub that:
- ✅ `apps/corporate-crashout/` folder exists
- ✅ All files are there
- ✅ No `.env` file (it's excluded)

Then Justin can clone and use `START_HERE.md` to set it up!

