# Make Your Game - Action Plan **Date:** 2025-08-24

**Goal:** Set up website mirroring for make-your-game repo to MiddSea.github.io

## ✅ Completed Today

- [x] Created mirror_to_website.sh script for automated website deployment
- [x] Added 'website' remote pointing to MiddSea.github.io.git
- [x] Moved script to .notes/ directory structure

## 📋 Current Tasks

### 1. Git Remote Configuration

**Seán:**

```bash
git remote add website git@github.com:MiddSea/MiddSea.github.io.git
git remote -v
```

**Claude Code:** ✅ Script created and documented

### 2. Website Mirroring Setup

**Seán:**

```bash
mv mirror_to_website.sh .notes/
chmod +x .notes/mirror_to_website.sh
./.notes/mirror_to_website.sh
```

**Files/Directories to Mirror:**

- `docs/` → Website docs
- `tests/` → Test documentation  
- `assets/images/` → Images for web
- `assets/sounds/` → Audio assets
- Root files: `*.md`, `*.html`, `*.css`, `*.js`, etc.

### 3. Documentation Tasks

**Claude Code:**

- [ ] Document git mv vs mv differences
- [ ] Document zsh history expansion patterns
- [ ] Create mirror_to_website.sh documentation

**Target Repos:**

- **Origin (gitea):** `https://01.gritlab.ax/git/smiddleto/make-your-game.git`
- **Github:** `https://github.com/MiddSea/make-your-game.git`  
- **Website:** `git@github.com:MiddSea/MiddSea.github.io.git`

## 🎯 Success Criteria

- [ ] Website remote configured correctly
- [ ] Mirror script working for both dev and main branches
- [ ] MiddSea.github.io automatically updated from make-your-game commits
- [ ] Documentation complete for git operations and zsh patterns

## 🔄 Working Method

- **Seán:** Run all commands manually on command line
- **Claude Code:** Create documentation, provide command guidance
- **Together:** Ensure systematic mirroring setup

Ready to deploy to the web! 🚀
