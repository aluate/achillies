# Testing the Push Script

## Quick Test (Dry Run)

Before actually pushing, you can test the script logic:

```bash
# Test script syntax
python -m py_compile tools/push_corporate_crashout.py

# Verify source folder exists
python -c "from pathlib import Path; print(Path(r'E:\My Drive\apps\corporate-crashout').exists())"
```

## What the Script Does

1. ✅ Verifies source folder exists
2. ✅ Clones Justin's repo to temp location
3. ✅ Creates apps/corporate-crashout/ folder
4. ✅ Copies all files from source
5. ✅ Removes .env file if present
6. ✅ Verifies critical files exist
7. ✅ Stages changes
8. ✅ Commits with descriptive message
9. ✅ Pushes to GitHub
10. ✅ Cleans up temp files

## Potential Issues to Watch For

1. **Authentication** - May prompt for GitHub credentials
2. **Branch name** - Tries "main" first, falls back to "master"
3. **Empty repo** - Handles both empty and existing repos
4. **.env file** - Automatically excludes from commit

## Manual Verification After Push

After the script runs, verify on GitHub:
- [ ] apps/corporate-crashout/ folder exists
- [ ] All subdirectories present
- [ ] No .env file visible
- [ ] package.json has correct scripts
- [ ] Documentation files are there

