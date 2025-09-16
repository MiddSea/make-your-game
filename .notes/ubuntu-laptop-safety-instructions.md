# Ubuntu Laptop Work Preservation Instructions

**URGENT: Read before syncing from gitea → GitHub**

## Current State (2025-09-16)
- GitHub/MiddSea will be updated to mirror gitea/smiddleto
- Your Ubuntu laptop may have uncommitted work
- These instructions preserve your home work

## Before Pulling from GitHub on Ubuntu Laptop

### 1. Check for uncommitted work
```bash
git status
git stash list
```

### 2. Save ALL local work safely
```bash
# Create safety branch for any uncommitted work
git checkout -b ubuntu-laptop-work-$(date '+%F_%H-%M')

# Commit everything (including any .notes/ changes)
git add .
git commit -m "Ubuntu laptop local work backup - $(date '+%F_%H-%M_%Z')"

# Push to GitHub immediately 
git push github ubuntu-laptop-work-$(date '+%F_%H-%M')
```

### 3. Check for unpushed branches
```bash
# List all local branches
git branch -v

# For each branch that shows [ahead N], push it:
git push github branch-name
```

### 4. Then safely pull updates
```bash
git checkout main
git pull github main

git checkout dev  
git pull github dev

# Check for new feature branches
git branch -r
```

## After Sync Complete
- Your work is preserved in `ubuntu-laptop-work-*` branches
- You can merge valuable changes back to feature branches
- Use the git_branches.sh script for clean workflow

## Emergency Recovery
If you accidentally lose work:
```bash
git reflog
git branch recovery-branch <commit-hash>
```

---
**Created:** $(date '+%F_%H-%M_%Z')  
**Location:** grit:lab campus before GitHub mirror update