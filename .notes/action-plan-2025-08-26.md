# Make Your Game - Action Plan **Date:** 2025-08-26_20-29_EEST

**Goal:** Clear up CLAUDE.md memory files and ensure Claude Code understands everything coherently

## 📋 Current Tasks (In Order)

### 1. CLAUDE.md File Organization

**Priority:** HIGH - Essential for Claude Code to understand project properly

**Files to organize:**

- **User-wide:** `~/.claude/CLAUDE.md` (existing, 3,269 bytes)
- **Local project:** `./.claude/CLAUDE.local.md` (to be created, gitignored)
- **Project-wide:** `./.claude/CLAUDE.md` (to be created/organized, checked in)

**Seán & Claude Code:**

- [ ] Check if `./.claude/` directory exists
- [ ] Read and analyze existing `~/.claude/CLAUDE.md` content
- [ ] Create `./.claude/CLAUDE.local.md` (gitignored)
- [ ] Create `./.claude/CLAUDE.md` (project-specific, checked in)
- [ ] Ensure all three files are consistent and coherent
- [ ] Verify Claude Code can access all files properly

### 2. Documentation Strategy

**Problem Identified:**

- `/memory` command prioritizes non-existent project files over existing user-wide file
- CLAUDE.md files need to be in `.claude/` directory to avoid cluttering repo for others

**Solution:**

- Organize files in logical hierarchy
- Ensure coherent content across all three levels
- Document the relationship between files

### 3. Session Documentation

**Ongoing:**

- [ ] Continue recording in `.notes/command-session-2025-08-26_19-12_EEST.md`
- [ ] Document all commands and results
- [ ] Track progress on CLAUDE.md organization

## 🎯 Success Criteria

- [ ] Three CLAUDE.md files exist in proper locations
- [ ] All files are consistent and coherent  
- [ ] Claude Code understands project context properly
- [ ] Files are organized to not clutter repo for others
- [ ] Documentation clearly explains the hierarchy

## 🔄 Working Method

- [ ] **Claude Code:** Execute commands, read files, organize content
- [ ] **Seán:** Review organization, approve changes
- [ ] **Together:** Ensure systematic progress toward clear CLAUDE.md structure

## 📝 Notes

- User prefers `~/.claude/CLAUDE.md` to be checked first when no project files exist
- `.claude/` directory keeps files organized without cluttering main repo
- All three files need to work together coherently

---
[ *Action plan created: 2025-08-26_20-29_EEST* ]
