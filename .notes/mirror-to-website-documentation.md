<!-- markdownlint-disable line-length -->
# Website Mirroring Documentation

**Script:** `.notes/mirror_to_website.sh`  
**Created:** 2025-08-24  
**Purpose:** Mirror specific directories from make-your-game to MiddSea.github.io

## Overview

Automatically syncs selected content from make-your-game repo to the GitHub Pages website at MiddSea.github.io. Maintains branch parity (dev/main) and preserves commit history references.

## Usage

```bash
# From make-your-game root directory
./.notes/mirror_to_website.sh
```

## What Gets Mirrored

### Directories (with rsync --delete)

- `docs/` → Website documentation
- `tests/` → Test documentation  
- `assets/images/` → Image assets for web
- `assets/sounds/` → Audio assets for web

### Root Files (by pattern)

- `*.md` → Markdown documentation
- `*.html` → Web pages
- `*.css` → Stylesheets
- `*.js` → JavaScript files
- `*.json` → Configuration files
- `*.yml`, `*.yaml` → YAML configs
- `*.txt` → Text files
- `LICENSE*` → License files
- `CHANGELOG*` → Change logs

## Repository Setup Required

### 1. Git Remotes

```bash
git remote add website git@github.com:MiddSea/MiddSea.github.io.git
```

### 2. Directory Structure

```bash
~/github/MiddSea/MiddSea.github.io  # Target website repo
~/gitea/smiddleto/make-your-game    # Source repo
```

## Script Behavior

### Branch Management

- Detects current branch (dev/main preferred)
- Creates matching branch in website repo if needed
- Warns if not on dev/main branch

### Sync Process

1. Clone website repo if missing
2. Switch to/create matching branch
3. Pull latest changes from website remote
4. Copy directories with rsync (deletes removed files)
5. Copy individual files by pattern
6. Commit with reference to source repo
7. Push to website remote

### Commit Messages

Format: `Mirror from make-your-game (branch): [original message] [hash]`

Example: `Mirror from make-your-game (dev): Add game assets [a1b2c3d]`

## Error Handling

- Exits on any command failure (`set -e`)
- Checks directory existence before operations
- Warns about missing source directories
- Handles new branch creation gracefully

## Dependencies

- `rsync` - For efficient directory syncing
- `git` - Repository operations
- SSH access to github.com (for push operations)

## Troubleshooting

### Permission Issues

```bash
chmod +x .notes/mirror_to_website.sh
```

### SSH Key Problems

Ensure GitHub SSH key is configured:

```bash
ssh -T git@github.com
```

### Missing Target Repo

Script will clone automatically, or manual:

```bash
git clone git@github.com:MiddSea/MiddSea.github.io.git ~/github/MiddSea/MiddSea.github.io
```
