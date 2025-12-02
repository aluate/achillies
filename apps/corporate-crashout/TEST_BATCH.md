# Testing the START_LOCAL.bat File

This document explains how the batch file works and how to test it.

## How the Batch File Works

The `START_LOCAL.bat` file follows this pattern:

1. **Error Detection**: Uses `if errorlevel 1` to check if commands failed
2. **Error Loop**: When an error is detected:
   - Shows a clear error message
   - Explains what went wrong
   - Provides next steps
   - Uses `pause` to keep window open so user can read the error
   - Exits with `exit /b 1` to prevent continuing with errors

3. **Progressive Checks**: Checks prerequisites in order:
   - Node.js installation
   - npm installation
   - .env file existence
   - Dependencies installation
   - Prisma client generation
   - Database setup (informational only)

4. **User-Friendly**: 
   - Numbered steps ([1/6], [2/6], etc.)
   - Clear messages
   - Waits for user input on critical errors
   - Opens browser automatically

## Testing the Error Loop

To verify the error handling works correctly, you can test different scenarios:

### Test 1: Missing Node.js
1. Temporarily rename or remove Node.js from PATH
2. Run `START_LOCAL.bat`
3. **Expected**: Error message, pause, window stays open

### Test 2: Missing .env File
1. Ensure `.env` file doesn't exist
2. Run `START_LOCAL.bat`
3. **Expected**: Warning message, asks if you want to continue

### Test 3: Missing Dependencies
1. Delete `node_modules` folder
2. Run `START_LOCAL.bat`
3. **Expected**: Automatically installs dependencies, or shows error if install fails

### Test 4: Successful Run
1. Ensure Node.js, npm, and .env are configured
2. Run `START_LOCAL.bat`
3. **Expected**: All checks pass, server starts, browser opens

## Key Error Handling Features

- ✅ **Window stays open on error** - User can read error messages
- ✅ **Clear error messages** - Explains what's wrong and how to fix it
- ✅ **Non-blocking warnings** - Some checks warn but allow continuation
- ✅ **Graceful exit** - Uses `exit /b 1` to return error code
- ✅ **Pause before exit** - User must press a key to close

## Comparison with SMB Site

The Corporate Crashout batch file is similar to SMB's `START_LOCAL.bat`:
- Same error handling pattern
- Same structure and flow
- Enhanced with database/Prisma checks for this project
- More detailed error messages for database-related issues

## Running the Tests

1. **Quick Test** (everything configured):
   ```cmd
   cd apps\corporate-crashout
   START_LOCAL.bat
   ```

2. **Test Error Handling**:
   - Remove Node.js from PATH → should show error and pause
   - Delete .env → should warn and ask to continue
   - Delete node_modules → should auto-install

3. **Full Test** (first time setup):
   - On a clean machine/VM
   - Install Node.js
   - Copy Corporate Crashout folder
   - Run START_LOCAL.bat
   - Should guide through setup step by step

## Expected Behavior

**On Success:**
- All checks pass
- Server starts on port 3000
- Browser opens automatically
- Window shows server logs
- Press Ctrl+C to stop

**On Error:**
- Error message displayed
- Window pauses with "Press any key to continue..."
- User can read error and fix issue
- Window closes after user presses key

This ensures Justin sees what went wrong and can fix it before the window closes.

