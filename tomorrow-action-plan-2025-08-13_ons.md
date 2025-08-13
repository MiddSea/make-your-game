# Make Your Game - [ ] Tomorrow's Action Plan **Date:** 2025-08-12 → 2025-08-13  
**Goal:** Get make-your-game repo fully organized and synced with Gitea

## ✅ Completed Today
- [x] Fixed Gitea authentication with tea CLI
- [x] Created private repo on 01.gritlab.ax: `smiddleto/make-your-game` 
- [x] Documented tea CLI authentication in notes repo

## 📋 Tomorrow's Tasks (In Order)

### 1. Repository Structure Setup

**Seán:**

- [x] ~~Update `.gitignore` to exclude `.notes/` directory~~ instead no entry for `.notes/` directory instead:
- [ ] use `git rm --cached .notes/` on `main`branch to stop tracking it.

- [ ] Check what's currently in `.notes/` and `docs/` directories

**Claude Code:** Track progress, provide guidance

### 2. CLAUDE.md Organization  
**Seán:**
- [ ] Move `CLAUDE.md` → `.claude/CLAUDE.proj.md`
- [ ] Move `CLAUDE.local.md` → `.claude/CLAUDE.local.proj.md`  
- [ ] Merge with existing `.claude/CLAUDE.md` files in VSCode

**Claude Code:** Monitor file organization, suggest merge strategies

### 3. Documentation Cleanup
**Seán:**
- [ ] Review `.notes/` directory content
- [ ] Move `git-workflow-steps.md` to `.notes/`
- [ ] Organize development vs. production documentation

**Claude Code:** Help categorize files, ensure nothing important is lost

### 4. Git Workflow Execution
**Seán:**
```bash
# On dev branch: commit all changes
git add .
git commit -m "Organize documentation and structure - $(date '+%F_%H-%M_%Z')"

# Switch to main branch and clean .notes/ strategy
git checkout main
git rm --cached .notes/  # Remove .notes/ from tracking on main (one-time)

# Merge dev into main (.notes/ stays excluded from main)
git merge dev

# Push both branches
git push origin main
git push origin dev
```

**Claude Code:** Verify each step, catch any issues

### 5. Final Setup
**Seán:**
- [ ] Create `.claude/commands/lint-md` script
- [ ] Test that `.notes/` stays in dev branch only
- [ ] Verify main branch is clean for production

**Claude Code:** Help with script creation, validate structure

## 🎯 Success Criteria
- [x] Gitea repo exists and is accessible  
- [ ] Both `main` and `dev` branches pushed to origin
- [ ] `.notes/` directory excluded from main branch
- [ ] CLAUDE.md files properly organized
- [ ] Documentation structure is clear and maintainable

## 🔄 Working Method
- [ ] **You:** Handle all terminal commands and file edits
- [ ] **Me:** Track tasks, provide guidance, spot issues
- [ ] **Together:** Ensure systematic progress toward clean, organized repo

Ready to tackle this tomorrow! 🚀