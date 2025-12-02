@echo off
echo ========================================
echo   Corporate Crashout Trading Platform
echo   Starting Local Development Server
echo ========================================
echo.

cd /d "%~dp0"
echo Working directory: %CD%
echo.

echo Step 1: Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo Please install from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js: %%i
echo.
pause

echo Step 2: Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] npm not found!
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo [OK] npm: %%i
echo.
pause

echo Step 3: Checking dependencies...
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] Installation failed!
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies found
)
echo.
pause

echo Step 4: Starting development server...
echo.
echo The server will start in a NEW WINDOW.
echo This window will wait 20 seconds, then open your browser.
echo.
echo ========================================
echo.

pause

start "Corporate Crashout Server" cmd /k "cd /d %~dp0 && npm run dev"

echo Server window opened!
echo Waiting 20 seconds for server to compile...
echo.

for /L %%i in (20,-1,1) do (
    echo Browser will open in %%i seconds...
    timeout /t 1 /nobreak >nul
)

echo.
echo Opening browser...
start "" "http://localhost:3000"

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Server is running in "Corporate Crashout Server" window.
echo Browser should be open now.
echo.
echo If page doesn't load, refresh after a few seconds.
echo.
pause
