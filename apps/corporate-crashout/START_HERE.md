# 🚀 START HERE — Corporate Crashout Trading Platform

**Welcome!** This guide will walk you through setting up and testing your Corporate Crashout Trading platform locally on your computer.

**Time needed:** About 30 minutes (mostly waiting for downloads)

**Assumptions:** We're starting from scratch — you don't need anything pre-installed.

---

## 📋 What You'll Need

- ✅ A Windows computer (Windows 10 or 11)
- ✅ Internet connection
- ✅ A web browser (Chrome, Edge, or Firefox)
- ✅ About 500MB of free disk space

**That's it!** Everything else we'll install together.

---

## 🎯 Quick Overview

Here's what we're going to do:

1. **Install Node.js** (the programming language this app uses)
2. **Get the project folder** (the code for your website)
3. **Install dependencies** (download all the tools needed)
4. **Set up environment variables** (connect to database, Stripe, etc.)
5. **Create database** (where your data is stored)
6. **Bootstrap the app** (set up admin user and initial content)
7. **Start the server** (launch your website locally)
8. **Test everything** (make sure it all works!)

---

## 📝 Step-by-Step Instructions

### Step 1: Install Node.js ⚙️

**What this is:** Node.js is the programming language your website runs on. Think of it like installing a game engine before you can play a game.

#### 1.1 Download Node.js

1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see a big green button that says "LTS" — click it
4. This downloads the installer (file will be named something like `node-v20.x.x-x64.msi`)

#### 1.2 Install Node.js

1. Find the downloaded file (usually in your Downloads folder)
2. Double-click it to run the installer
3. Click **"Next"** through all the screens (default settings are fine)
4. Accept the license agreement
5. Click **"Install"**
6. Wait for it to finish (takes 2-3 minutes)
7. Click **"Finish"**

#### 1.3 Restart Your Computer ⚠️

**This is important!** Node.js needs your computer to restart so it can be added to your system PATH.

1. Close all your programs
2. Restart your computer
3. Wait for it to boot back up

#### 1.4 Verify Node.js is Installed

1. Press `Windows Key + R`
2. Type: `cmd` and press Enter
3. A black window (Command Prompt) will open
4. Type: `node -v` and press Enter
5. You should see something like: `v20.11.0` (version numbers may vary)

**✅ If you see a version number:** Great! Move to Step 2.

**❌ If you see an error:** 
- Try restarting your computer again
- Or reinstall Node.js (repeat Step 1.2)
- Still having issues? Screenshot the error and send it to me

---

### Step 2: Get the Project Folder 📁

**What this is:** This is all the code and files that make up your website.

#### Option A: If You Received a ZIP File

1. Find the ZIP file (might be named `corporate-crashout.zip` or similar)
2. Right-click the ZIP file → **"Extract All..."**
3. Choose where to extract (Desktop is fine)
4. Click **"Extract"**
5. You should now see a folder called `corporate-crashout`

#### Option B: If You Have the Folder Already

1. Find the `corporate-crashout` folder
2. Make note of where it is (write down the full path if helpful)

**For example:** `C:\Users\YourName\Desktop\corporate-crashout`

---

### Step 3: Open Command Prompt in the Project Folder 💻

1. Open File Explorer
2. Navigate to your `corporate-crashout` folder
3. Click in the address bar at the top (shows the folder path)
4. Type: `cmd` and press Enter
5. A Command Prompt window will open — this is where you'll run commands

**Alternative method:**
- Right-click on the `corporate-crashout` folder
- Select **"Open in Terminal"** or **"Open PowerShell window here"**

---

### Step 4: Install Dependencies 📦

**What this is:** Your website needs various tools and libraries to run. This downloads them all.

1. In the Command Prompt window that's open in your project folder
2. Type: `npm install`
3. Press Enter
4. Wait for it to finish (this takes 2-5 minutes, you'll see lots of text scrolling)
5. When it's done, you'll see your cursor again (prompt returns)

**✅ You'll know it worked when:** You see a bunch of text, then the prompt comes back (no errors)

**❌ If you see errors:**
- Make sure you're in the `corporate-crashout` folder
- Make sure Node.js is installed (go back to Step 1)
- Check your internet connection
- Screenshot the error and send it to me

---

### Step 5: Create Your Environment File 🔐

**What this is:** This file stores your secret keys, database connection, and other settings. It's like a configuration file.

1. In File Explorer, go to your `corporate-crashout` folder
2. Look for a file named `.env.example`
3. If it exists:
   - Copy it
   - Paste it in the same folder
   - Rename the copy to `.env` (just remove `.example`)
4. If `.env.example` doesn't exist:
   - Right-click in the folder → **New** → **Text Document**
   - Name it `.env` (exactly — just those 4 characters)
   - Open it with Notepad

#### 5.1 Fill in Basic Settings

Open your `.env` file in Notepad and add these lines:

```env
# Basic Settings (fill these in now)
NEXTAUTH_SECRET=localdevsecret123
NEXTAUTH_URL=http://localhost:3000

# Database (I'll help you with this - see below)
DATABASE_URL=postgresql://username:password@host:port/database

# Stripe Test Keys (I'll send these to you separately)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (I'll send these to you separately)
STRIPE_PRICE_TIER1=price_...
STRIPE_PRICE_TIER2=price_...
STRIPE_PRICE_TIER3=price_...
STRIPE_PRICE_ADDON_1ON1=price_...

# Optional
DISCORD_INVITE_URL=https://discord.gg/...
```

**Save the file** (Ctrl+S)

**Note:** You'll need to fill in:
- **DATABASE_URL** — I'll help you set up a free database (see Step 6)
- **Stripe keys** — I'll send you test mode keys
- **Price IDs** — I'll send you these after Stripe products are created

---

### Step 6: Set Up Your Database 🗄️

**What this is:** Your website needs a place to store user accounts, subscriptions, and content. We'll use a free cloud database.

**Option A: Supabase (Easiest - Recommended)**

1. Go to: **https://supabase.com/**
2. Click **"Start your project"** (or Sign Up)
3. Create a free account (use Google/GitHub to sign up quickly)
4. Click **"New Project"**
5. Fill in:
   - **Name:** `corporate-crashout` (or whatever you want)
   - **Database Password:** Create a strong password (write it down!)
   - **Region:** Choose closest to you
6. Click **"Create new project"**
7. Wait 2-3 minutes for it to set up
8. Once ready, click on your project
9. Go to **Settings** → **Database**
10. Find **"Connection string"** → **"URI"**
11. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@...`)
12. Paste it into your `.env` file as `DATABASE_URL`
13. Replace `[YOUR-PASSWORD]` with the actual password you created

**Option B: Neon (Alternative)**

1. Go to: **https://neon.tech/**
2. Sign up for free
3. Create a new project
4. Copy the connection string
5. Paste into your `.env` file

**Option C: I'll Set It Up For You**

Just message me and I can set up the database and give you the connection string.

---

### Step 7: Get Stripe Test Keys 🔑

**What this is:** Stripe handles payments. We'll use test mode first (no real money).

I'll send you:
- **STRIPE_SECRET_KEY** (starts with `sk_test_...`)
- **STRIPE_PUBLISHABLE_KEY** (starts with `pk_test_...`)
- **STRIPE_PRICE_TIER1, TIER2, TIER3** (start with `price_...`)
- **STRIPE_PRICE_ADDON_1ON1** (starts with `price_...`)

Once you have these:
1. Open your `.env` file
2. Replace the `...` placeholders with the actual values I send
3. Save the file

**For now, you can skip this step** and we'll test payments later.

---

### Step 8: Bootstrap the Application 🚀

**What this is:** This sets up your database structure, creates an admin user, and adds initial content.

1. In your Command Prompt (still in the `corporate-crashout` folder)
2. Type: `npm run bootstrap`
3. Press Enter
4. Wait for it to finish (takes 30 seconds - 2 minutes)

**✅ You'll see:**
```
🚀 Bootstrapping Corporate Crashout...
✅ Database connection successful
✅ Database schema ready
✅ Admin user ready (ID: ...)
✅ Created default sections: Getting Started, Trading Basics
✨ Bootstrap complete!
```

**⚠️ IMPORTANT:** Write down the admin credentials it shows:
- Email: `admin@corporatecrashout.com` (or what you set)
- Password: `Admin123!` (or what you set)

**❌ If you see errors:**
- Make sure your `DATABASE_URL` in `.env` is correct
- Make sure the database is accessible (check Supabase/Neon dashboard)
- Screenshot the error and send it to me

---

### Step 9: Start the Development Server 🌐

**What this is:** This launches your website on your computer. It will be available at `http://localhost:3000`

#### Option A: Use the Batch File (Easiest)

1. Double-click `START_LOCAL.bat` in File Explorer
2. The batch file will:
   - Check all prerequisites
   - Start the server
   - Wait for it to be ready
   - Open your browser automatically

**If the batch file doesn't work**, try `START_LOCAL_SIMPLE.bat` instead.

#### Option B: Manual Start (Alternative)

1. In your Command Prompt (still in the `corporate-crashout` folder)
2. Type: `npm run dev`
3. Press Enter
4. Wait 10-30 seconds
5. You should see:
   ```
   ✓ Ready in 3.2s
   ○ Local: http://localhost:3000
   ```
6. Open your browser and go to: `http://localhost:3000`

**✅ Success!** Your website is now running!

**⚠️ Keep this window open!** The server needs to keep running. Closing this window stops the website.

---

### Step 10: View Your Website 👀

1. Open your web browser (Chrome, Edge, or Firefox)
2. Go to: **http://localhost:3000**
3. You should see the Corporate Crashout Trading homepage!

**🎉 Congratulations!** Your website is running locally!

---

## 🧪 Testing Your Site

Now let's test the key features:

### Test 1: View the Homepage

1. Go to: `http://localhost:3000`
2. You should see the homepage with tier cards
3. Click around - links should work

### Test 2: Log In as Admin

1. Go to: `http://localhost:3000/auth/login`
2. Use the admin credentials from Step 8:
   - Email: `admin@corporatecrashout.com`
   - Password: `Admin123!` (or what you set)
3. Click **"Sign In"**
4. You should be redirected to the dashboard

### Test 3: Access Admin Dashboard

1. After logging in, go to: `http://localhost:3000/admin`
2. You should see the admin dashboard
3. Try clicking through:
   - **Users** - See user management
   - **TradingView** - Manage TradingView access
   - **Sections** - Manage content sections
   - **Lessons** - Manage lessons
   - **Live Sessions** - Schedule sessions
   - **Add-Ons** - View bookings

### Test 4: Create Content (Optional)

1. In the admin dashboard, go to **Sections**
2. Click to add a new section
3. Fill in a title and order number
4. Save it
5. Go to **Lessons** and add a lesson to that section
6. Check the dashboard as a user to see the content appear

---

## 🎨 Using Your Brand Brief

**What this is:** Your brand brief defines your colors, fonts, taglines, and visual identity. Before going live, you should complete it.

### Where to Find It

1. Open File Explorer
2. Go to your `corporate-crashout` folder
3. Open the `brand` folder
4. Open `BRAND_BRIEF.md`

### How to Fill It Out

**Option A: Use AI Assistant (Easiest)**

1. Open `brand/BRAND_PROMPT_GENERATOR.md`
2. Copy the main prompt
3. Paste it into ChatGPT, Claude, or another AI assistant
4. Review the suggestions
5. Copy sections you like into `BRAND_BRIEF.md`
6. Customize as needed

**Option B: Fill It Out Yourself**

1. Open `BRAND_BRIEF.md` in Notepad or Word
2. Fill out each section:
   - **Color Palette** - Choose colors that represent your brand (get hex codes)
   - **Typography** - Pick fonts (Google Fonts recommended)
   - **Taglines** - Write marketing taglines
   - **Hero Copy** - Write your homepage headline
   - And more...

### Why This Matters

- Ensures consistent branding across the site
- Helps developers/designers know what colors/fonts to use
- Makes your site look professional and cohesive

**Complete this before going live!** See `brand/README.md` for more details.

---

## 📚 Other Helpful Documents

Here are other files in your project that might be useful:

### For Setup
- **`QUICK_START.md`** - Quick reference guide
- **`README.md`** - Full technical documentation
- **`SETUP_CHECKLIST.md`** - Pre-flight checklist before going live

### For Running the Site
- **`START_LOCAL.bat`** - Double-click to start (after Node.js is installed)
- **`START_LOCAL_README.txt`** - Instructions for the batch file

### For Branding
- **`brand/BRAND_BRIEF.md`** - Your brand guidelines (fill this out!)
- **`brand/BRAND_PROMPT_GENERATOR.md`** - AI prompts to help create brand brief
- **`brand/README.md`** - Brand folder overview

### For Deployment
- **`DEPLOYMENT.md`** - How to deploy to production (for later)
- **`BUILD_SUMMARY.md`** - Technical summary of what was built

### For Developers
- **`control/corporate-crashout/CONTROL.md`** - Complete specification
- **`OTTO_TOOLS_README.md`** - Utility scripts documentation

---

## 🆘 Troubleshooting

### Problem: "Node.js is not installed" or "Node.js is not in your PATH"

**Solution:**
- Go back to Step 1
- Make sure you downloaded from nodejs.org
- **Make sure you RESTARTED your computer after installing** (this is critical!)
- If still not working after restart, reinstall Node.js
- Verify by opening Command Prompt and typing: `node -v`

### Problem: "npm install" fails

**Possible causes:**
- Internet connection issue
- Antivirus blocking downloads
- Node.js not installed correctly

**Try:**
- Check your internet connection
- Disable antivirus temporarily
- Reinstall Node.js
- Screenshot the error and send it to me

### Problem: Can't connect to database

**Solution:**
- Check your `DATABASE_URL` in `.env` file
- Make sure your Supabase/Neon project is running
- Verify the password in the connection string
- Test the connection string in your database provider's dashboard

### Problem: Website won't start or batch file crashes

**Solution:**
- Make sure you ran `npm install` first
- Make sure you're in the `corporate-crashout` folder
- Check that port 3000 isn't being used by another program (check Task Manager)
- Look at the error message in Command Prompt for clues
- If batch file closes immediately, try running commands manually:
  1. Open Command Prompt in the folder
  2. Run: `npm run dev`
  3. This will show you the actual error

### Problem: Batch file closes immediately without showing errors

**Solution:**
- Don't double-click the batch file
- Instead, open Command Prompt first
- Navigate to the folder: `cd "path\to\corporate-crashout"`
- Run: `START_LOCAL.bat`
- This keeps the window open so you can see errors

### Problem: Can't log in

**Solution:**
- Make sure you ran `npm run bootstrap` first
- Check that you're using the correct admin credentials
- Try running bootstrap again to reset the admin user

### Problem: Something else isn't working

**Solution:**
- Take a screenshot of the error
- Note what step you were on
- Send it to me and I'll help fix it!

---

## ✅ Next Steps

Once you have the site running locally:

1. **Complete your brand brief** (`brand/BRAND_BRIEF.md`)
   - Use the AI prompt generator to help
   - Fill out all sections
   - Get your colors, fonts, and taglines finalized

2. **Test all features:**
   - Create test user accounts
   - Test subscription signup (when Stripe is configured)
   - Add content through admin dashboard
   - Test content gating by tier

3. **Customize content:**
   - Update homepage copy
   - Add your actual lessons/content
   - Set up Discord invite link
   - Add real Google Drive URLs for content

4. **Prepare for production:**
   - Review `DEPLOYMENT.md`
   - Set up production database
   - Configure Stripe for live payments
   - Test everything one more time

---

## 🎉 You're Done!

If you've made it this far and your site is running at `http://localhost:3000`, congratulations! 

You now have:
- ✅ Your website running locally
- ✅ Admin access to manage everything
- ✅ All the tools you need to test and customize

**Remember:**
- Keep the Command Prompt window open while testing (that's your server)
- Press `Ctrl+C` in Command Prompt to stop the server when you're done
- Run `npm run dev` again when you want to start it back up

**Need help?** Just message me with:
- What step you're on
- What error you're seeing (screenshot if possible)
- And I'll help you fix it fast!

---

**Last Updated:** January 2025  
**Status:** Ready for local testing

