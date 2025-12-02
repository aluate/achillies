# Corporate Crashout Trading Platform - Local Development Server
# PowerShell version - Run this if you prefer PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Corporate Crashout Trading Platform" -ForegroundColor Cyan
Write-Host "  Starting Local Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory: $scriptPath" -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "[1/6] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Download the LTS version and install it." -ForegroundColor Yellow
    Write-Host "After installing, restart this script." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check npm
Write-Host "[2/6] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "ERROR: npm is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "npm should come with Node.js." -ForegroundColor Yellow
    Write-Host "Please reinstall Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check .env file
Write-Host "[3/6] Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "WARNING: .env file not found!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You need to create a .env file with your configuration." -ForegroundColor Yellow
    Write-Host "See README.md or QUICK_START.md for required variables." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Required variables:" -ForegroundColor Yellow
    Write-Host "  - DATABASE_URL" -ForegroundColor Yellow
    Write-Host "  - NEXTAUTH_SECRET" -ForegroundColor Yellow
    Write-Host "  - NEXTAUTH_URL" -ForegroundColor Yellow
    Write-Host "  - Stripe keys and price IDs" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "The site may not work without proper .env configuration." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host ""
        Write-Host "Exiting. Please create .env file and try again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
} else {
    Write-Host "   .env file found" -ForegroundColor Green
    Write-Host ""
}

# Check dependencies
Write-Host "[4/6] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "Dependencies not found. Installing now..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes..." -ForegroundColor Yellow
    Write-Host ""
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please check:" -ForegroundColor Yellow
        Write-Host "  1. Internet connection" -ForegroundColor Yellow
        Write-Host "  2. Node.js version (should be 18+)" -ForegroundColor Yellow
        Write-Host "  3. Disk space" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "   Dependencies already installed" -ForegroundColor Green
    Write-Host ""
}

# Check Prisma client
Write-Host "[5/6] Checking Prisma setup..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules\.prisma")) {
    Write-Host ""
    Write-Host "Generating Prisma client..." -ForegroundColor Yellow
    npm run db:generate 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "WARNING: Failed to generate Prisma client!" -ForegroundColor Yellow
        Write-Host "Database features may not work." -ForegroundColor Yellow
        Write-Host ""
        $continue = Read-Host "Continue anyway? (y/n)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            Read-Host "Press Enter to exit"
            exit 1
        }
        Write-Host ""
    } else {
        Write-Host "   Prisma client generated" -ForegroundColor Green
        Write-Host ""
    }
} else {
    Write-Host "   Prisma client ready" -ForegroundColor Green
    Write-Host ""
}

# Check database (optional)
Write-Host "[6/6] Checking database setup..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   Checking if database migrations are needed..." -ForegroundColor Gray
    npm run db:migrate -- --help 2>&1 | Out-Null
    # Just inform user, don't block
    Write-Host "   Database check complete (run 'npm run bootstrap' if needed)" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "   Skipping database check (no .env file)" -ForegroundColor Gray
    Write-Host ""
}

# Start dev server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting development server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The site will open in your browser at:" -ForegroundColor Green
Write-Host "  http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Keep this window open while testing." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Wait a moment then open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

# Start the dev server
npm run dev

# If we get here, server stopped
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Development server stopped" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"

