<!-- markdownlint-disable no-multiple-blanks -->
 Make Your Game - Project CLAUDE.md

**Project:** make-your-game  
**Location:** `~/gitea/smiddleto/make-your-game/.claude/CLAUDE.md`  
**Purpose:** Project-specific instructions for Claude Code (checked into git)

----

## Project Overview

- **Type:** JavaScript browser game
- **Framework:** Vanilla JavaScript, HTML5, CSS
- **Structure:** Simple single-page game with assets
- **Goal:** Create an engaging browser-based game

----

## Project Structure

```shell
make-your-game/
├── .claude/           # Claude Code configuration (this file)
├── .notes/           # Development notes (dev branch only)
├── assets/           # Game assets
│   ├── images/       # Image files
│   └── sounds/       # Audio files  
├── docs/             # Documentation
├── tests/           # Test files
├── game.js          # Main game logic
├── index.html       # Game HTML
├── style.css        # Game styling
└── README.md        # Project documentation
```

----

## Development Workflow

### Branch Strategy

- **main:** Clean production code, no .notes/ directory
- **dev:** Development with full .notes/ documentation
- **`feature/<feature-name>`** This is the new features with descriptive names.

### Testing Commands

- Manual testing: Open `index.html` in browser
- Check browser console for JavaScript errors
- Test game functionality manually

### Build Process

- No build step required (vanilla JavaScript)
- Files are served directly from filesystem
- Assets loaded dynamically as needed

----

## Game Development Guidelines

### Code Style

- Use modern JavaScript (ES6+)
- Modular functions for game logic
- Clear variable and function naming
- Comments for complex game mechanics

### File Organization

- Game logic in `game.js`
- Styling in `style.css`
- Assets in appropriate subdirectories
- Keep HTML minimal and semantic

### Performance Considerations

- Optimize asset loading
- Use requestAnimationFrame for smooth animation
- Minimize DOM manipulation
- Consider mobile performance

----

## Documentation Strategy

- **Development notes:** Keep in `.notes/` (dev branch only)
- **User documentation:** Update `README.md`
- **Code comments:** Document complex game logic
- **Session logs:** Track development sessions in `.notes/`

----

## Project-Specific Commands

### Development

```bash
# Start development session
git checkout dev

# Open in browser for testing
open index.html
# or
python3 -m http.server 8000  # For testing with HTTP

# Check for JavaScript errors
# (Use browser developer tools)
```

### Git Workflow

```bash
# Development workflow
git checkout dev
git add .
git commit -m "Development changes - $(date '+%F_%H-%M_%Z')"

# Production deployment  
git checkout main
git merge dev  # .notes/ excluded from main
git push origin main
```

----

*This file is checked into git and shared across the project team*  
*For local overrides, use `.claude/CLAUDE.local.md` (gitignored)*

link for current log file

% ls -l current-log.lnk.md
lrwxr-xr-x  1 sean.middleton  staff  29 Oct 10 03:11 current-log.lnk.md -> .notes/log/current-log.lnk.md
% ls -l .notes/log/current-log.lnk.md 
lrwxr-xr-x  1 sean.middleton  staff  28 Oct 10 03:09 .notes/log/current-log.lnk.md -> 2025-10-10_02-16_EEST-log.md
% code  current-log.lnk.md
% 

% ls -l current-log.lnk.md
lrwxr-xr-x  1 sean.middleton  staff  29 Oct 10 03:11 current-log.lnk.md -> .notes/log/current-log.lnk.md
% ls -l .notes/log/current-log.lnk.md 
lrwxr-xr-x  1 sean.middleton  staff  28 Oct 10 03:09 .notes/log/current-log.lnk.md -> 2025-10-10_02-16_EEST-log.md
% code  current-log.lnk.md
% 
