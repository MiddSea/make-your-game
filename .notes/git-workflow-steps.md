# Git Workflow Steps for make-your-game Repository

## Current Situation

- Local branches: `dev` (active) and `main`
- Remote `origin` points to non-existent Gitea repo: `https://01.gritlab.ax/git/smiddleto/make-your-game.git`
- Remote `github` points to: `https://github.com/MiddSea/make-your-game.git`
- Authentication to 01.gritlab.ax works (tested with net-cat repo)
- Need to merge dev→main, create Gitea repo, organize documentation

## Step-by-Step Workflow

### 1. Clean up .gitignore

```bash
# Add .claude/settings.local.json to .gitignore (DONE)
git add .gitignore
git status  # verify changes
```

### 2. Organize Documentation Files

```bash
# Check what's in .claude/ directory
ls -la .claude/

# Move CLAUDE.md files from project directory 'projd' to .claude/ directory
mv CLAUDE.md .claude/CLAUDE.projd.md
mv CLAUDE.local.md .claude/CLAUDE.local.projd.md

# Open CLAUDE project files in VSCode to merge them
code .claude/CLAUDE.projd.md .claude/CLAUDE.md

# Open CLAUDE.local files and merge them
code .claude/CLAUDE.local.projd.md .claude/CLAUDE.local.md 

```

### 3. Review .notes/ directory content

```bash
# Check existing documentation
ls -la .notes/
```

~~`# review all files in /docs and move that directory contents including the README.`~~
~~`md to .notes`~~
~~`mv docs/* .notes/`~~

- [ ] check and update the files
- [ ] update README to reflect contents of .notes directory

~~# Review if any files need to be moved to docs/ or integrated~~

### 4. Commit all current changes on dev

```bash
git add .
git status  # verify all files are staged
git commit -m "Organize documentation and update gitignore - $(date '+%F_%H-%M_%Z')"
```

### 5. Clean .notes/ Strategy (Production Branch)

```bash
# Switch to main branch
git checkout main

# Remove .notes/ from tracking on main branch (one-time setup)
git rm --cached .notes/

# Merge dev into main (.notes/ stays excluded from main)
git merge dev
git log --oneline -5  # verify merge
```

### 6. Configure tea CLI (if needed)

```bash
tea login list  # check current config
# If needed: tea login add --name gritlab --url https://01.gritlab.ax --user smiddleto
```

### 7. Create private repository on Gitea

```bash
# done
#tea repos create make-your-game \
#  --description "Game development project with MDA framework" \
#  --private
```

### 8. Push all branches to Gitea

```bash
git push origin main
git push origin dev
git push origin --tags  # if any tags exist
git branch -vv  # verify remote tracking
```

### 9. Create markdown linting command

```bash
# Create .claude/commands/ directory if not exists
mkdir -p .claude/commands

# Create lint-md command
cat > .claude/commands/lint-md << 'EOF'
#!/bin/bash
# Lint markdown files in the project
find . -name "*.md" -not -path "./.notes/*" -not -path "./node_modules/*" | xargs markdownlint
EOF

chmod +x .claude/commands/lint-md
```

### 10. Document the workflow in notes repo

```bash
# Document this setup in your notes repo
cd /Users/sean.middleton/github/MiddSea/notes
# Create git-workflow-make-your-game.md with this process
```

## Files to Review/Organize

- `.notes/` directory contents
- `docs/` directory
- `.claude/CLAUDE.proj.md` and `.claude/CLAUDE.local.proj.md` (after moving)
- Consider creating `.claude/CLAUDE.md` for the project

## Key Points

- All repos on 01.gritlab.ax are private by default
- main branch should be the primary branch
- Keep development history in dev branch
- Document the authentication setup for future reference
