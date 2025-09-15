<!-- markdownlint-disable no-emphasis-as-heading line_length -->
# Getting a Branch Back

## Scenario

The `util/git_branches.sh` script automatically deleted the `feature/instructions` branch after merging it to dev. We needed to restore it and sync all remotes properly.

## Recovery Process

### Step 1: Find the Deleted Branch

Use `git reflog` to find where the branch was before deletion:

```bash
git reflog --all | grep -i instructions
```

Key output showed:

- `d4ee5c8 HEAD@{6}: commit: experiments for instructions` - this was our target commit
- `a1c2bce HEAD@{4}: merge feature/instructions: Merge made by the 'ort' strategy`

**Note**: `git reflog` = "reference log" - tracks where HEAD and branch references have pointed over time. It's your safety net for recovering "lost" commits and branches.

### Step 2: Restore the Branch

Recreate the branch pointing to the last commit before deletion:

```bash
git checkout -b feature/instructions d4ee5c8
```

### Step 3: Sync with Remotes

1. Commit any changes and push the restored branch:

   ```bash
   git add .
   git commit -m "Restored feature/instructions branch - disabled auto-deletion"
   git push -u origin feature/instructions
   ```

2. Sync other branches:

   ```bash
   git checkout dev && git push origin dev
   git checkout main && git push origin main
   ```

### Step 4: Handle Divergent Remotes

When pushing to GitHub, encountered divergent branches error:

- GitHub had: `1a8a1aa GitHub Actions workflow to mirror main to webpage`  
- Local had: Multiple commits from gitea development

Solution:

```bash
git pull --no-rebase github main  # Creates merge commit
git push origin main              # Sync to gitea
git push github main              # Sync to github
```

## Key Git Concepts

### git reflog

- **Meaning**: Reference log - tracks movement of HEAD and branch pointers
- **Use case**: Recovering "lost" branches, commits, or undoing operations
- **Retention**: Typically keeps 90 days of history locally

### Merge Strategies

- **'ort' strategy**: Modern Git merge algorithm (replaced 'recursive')
- **--no-rebase**: Creates merge commit instead of linear history rewrite
- Used when reconciling divergent branch histories

### Remote Sync Strategy

- Keep gitea (origin) and github remotes synchronized
- Pull conflicts resolved with merge commits to preserve both histories
- GitHub Actions workflows don't affect gitea but kept for consistency

## Prevention

Modified `util/git_branches.sh` lines 98-102 to disable automatic branch deletion:

```bash
## 2025-09-03_21-23_EEST disabled deletion
## Delete feature branch 
## git branch -d "$feature_name"
## echo "Feature $1 merged into dev and branch deleted"
```

## Verification Commands

- `git log --oneline -3` - verify branch restoration
- `git remote -v` - check configured remotes  
- `git branch -a` - see all local and remote branches
- `pwd && git branch --show-current` - confirm location and branch

---
*Session completed: 2025-09-03_21-23_EEST*
