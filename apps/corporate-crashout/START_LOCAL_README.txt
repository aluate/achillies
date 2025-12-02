========================================
  CORPORATE CRASHOUT - QUICK START
========================================

TO START THE SITE LOCALLY:
---------------------------

Double-click on: START_LOCAL.bat

The batch file will:
- Check all prerequisites (Node.js, npm, dependencies)
- Start the development server in the same window
- Open your browser automatically after 5 seconds
- Keep the server running so you can test

NOTE: The browser opens BEFORE the server is fully ready.
If you see an error page, wait 10-20 seconds and refresh.
The server is still starting up in the background.

That's it! The script will:
- Check for Node.js and npm
- Check for .env configuration
- Install dependencies if needed
- Generate Prisma client if needed
- Start the development server
- Open the site in your browser

The site will be at: http://localhost:3000

========================================

IMPORTANT - BEFORE FIRST RUN:
------------------------------

1. Install Node.js (if not already installed):
   - Download from: https://nodejs.org/
   - Get the LTS version
   - Install it and restart your computer

2. Create a .env file:
   - See README.md or QUICK_START.md for required variables
   - At minimum, you need:
     * DATABASE_URL (PostgreSQL connection string)
     * NEXTAUTH_SECRET
     * NEXTAUTH_URL
     * Stripe keys and price IDs

3. Set up your database:
   - Create a PostgreSQL database
   - Update DATABASE_URL in .env
   - Run: npm run bootstrap
     (This creates admin user and initial content)

========================================

TO TEST THE SITE:
-----------------

1. The site opens automatically when you run START_LOCAL.bat
2. If not, go to: http://localhost:3000
3. Test features:
   - Sign up for a new account
   - Log in as admin (see bootstrap output for credentials)
   - Test admin dashboard at /admin
   - Test subscription flows (in Stripe test mode)

========================================

TO STOP THE SERVER:
-------------------

Press Ctrl+C in the window that opened

========================================

IF IT DOESN'T WORK:
-------------------

Common issues:

1. "Node.js is not installed"
   - Install Node.js from https://nodejs.org/
   - RESTART YOUR COMPUTER after installing (important!)
   - Run START_LOCAL.bat again

2. "Node.js is not in your PATH"
   - Restart your computer (this fixes PATH issues)
   - If still broken, reinstall Node.js
   - Make sure you installed the full version (not just npm)

3. "Failed to install dependencies"
   - Check your internet connection
   - Make sure you have enough disk space (500MB+)
   - Temporarily disable antivirus (might block downloads)
   - Try deleting node_modules folder and running again
   - Try running "npm install" manually in Command Prompt

4. ".env file not found"
   - This is just a warning - you can continue
   - Create a .env file later (see START_HERE.md)
   - The site might not work without it, but you can test setup

5. "Prisma client generation had issues"
   - This is OK if you haven't set up database yet
   - Run "npm run bootstrap" after setting up database
   - See START_HERE.md for database setup

6. "Port 3000 already in use"
   - Another program is using port 3000
   - Stop that program (check Task Manager)
   - Or change PORT in .env (advanced)

7. Batch file closes immediately
   - Right-click START_LOCAL.bat → Edit
   - Add "pause" at the end to see errors
   - Or run from Command Prompt to see full error

Check the window that opens - it will show what went wrong.
If you see an error, take a screenshot and send it for help.

========================================

NEED MORE HELP?
---------------

See these files for detailed instructions:
- QUICK_START.md - Complete setup guide
- README.md - Full documentation
- SETUP_CHECKLIST.md - Pre-flight checklist
- DEPLOYMENT.md - Production deployment guide

========================================

