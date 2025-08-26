# Make Your Game - Local CLAUDE.md

**Project:** make-your-game  
**Location:** `~/gitea/smiddleto/make-your-game/.claude/CLAUDE.local.md`  
**Purpose:** Local development overrides (gitignored, not shared)

----

## Local Development Settings

### Personal Preferences
- **Editor:** VSCode with specific extensions
- **Browser:** Chrome with DevTools open
- **Terminal:** iTerm2 with tmux sessions

### Local Commands & Aliases
```bash
# Quick development server
alias gameserver='python3 -m http.server 8000'

# Open game in browser
alias opengame='open http://localhost:8000'

# Development session start
alias devgame='git checkout dev && code . && gameserver'
```

### Local Testing Environment
- **Browser:** Chrome with extensions disabled for clean testing
- **Network:** Test with throttled connection
- **Mobile:** Test on iPhone simulator

### Personal Development Notes
- Use browser DevTools for debugging
- Keep console open during development
- Test on multiple screen sizes

### Local Git Configuration
```bash
# Personal git shortcuts for this project
alias gdev='git checkout dev'
alias gmain='git checkout main'
alias gcommit='git add . && git commit -m "$(date +%F_%H-%M_%Z)"'
```

### IDE Specific Settings
- **VSCode Extensions:** Live Server, JavaScript snippets
- **Settings:** Auto-format on save, show whitespace
- **Debugging:** Launch configuration for browser debugging

----

## Local File Overrides

### Asset Paths
- Local assets stored in different location for testing
- Custom test images/sounds not in git

### Configuration Overrides  
- Local API endpoints for testing
- Debug flags enabled
- Verbose logging enabled

----

*This file is gitignored and contains personal development preferences*
*Project team settings are in `.claude/CLAUDE.md`*
