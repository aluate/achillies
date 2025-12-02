@echo off
REM Simple version - starts server and opens browser after delay
REM Use this if the main batch file has issues

cd /d "%~dp0"

echo ========================================
echo   Corporate Crashout Trading Platform
echo   Simple Launcher
echo ========================================
echo.

REM Check Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install from https://nodejs.org/
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting server...
echo Browser will open in 15 seconds...
echo.

REM Start server in new window
start "Corporate Crashout Server" cmd /k "cd /d %~dp0 && npm run dev"

REM Wait for server to compile
timeout /t 15 /nobreak >nul

REM Open browser
echo Opening browser...
start "" "http://localhost:3000"

echo.
echo Server is starting in a separate window.
echo Browser should have opened automatically.
echo.
echo To stop the server, close the "Corporate Crashout Server" window.
echo.
pause

