# EDITOR and VISUAL Environment Variables in Claude Code

## Current Status
- **$EDITOR**: Not set (empty)
- **$VISUAL**: Not set (empty)
- **Default behavior**: Claude Code uses system default (likely `open` command on macOS)

## Environment Variable Priority
Standard Unix convention:
1. **$VISUAL** - Used for full-screen editors (vi, emacs, nano)
2. **$EDITOR** - Used for line editors, fallback if VISUAL not set
3. **System default** - If neither is set

## Where to Set These Variables

### 1. Shell Configuration Files
**~/.zshrc** (current shell):
```bash
export EDITOR='code'        # VS Code
export VISUAL='code'        # VS Code
# Or for vim users:
# export EDITOR='vim'
# export VISUAL='vim'
```

**Note**: Found commented examples in ~/.zshrc:
```bash
#   export EDITOR='vim'
#   export EDITOR='nvim'
```

### 2. Project-Specific (Claude Code)
No built-in way to set editor specifically for Claude Code. It follows standard Unix convention.

### 3. Global vs Local Settings
- **Global**: Set in shell config (~/.zshrc, ~/.bash_profile)
- **Session**: `export EDITOR=vim` (temporary)
- **Command-specific**: `EDITOR=nano claude /memory` (one-time override)

## Common Editor Values
```bash
# GUI Editors
export EDITOR='code'        # VS Code
export EDITOR='subl'        # Sublime Text
export EDITOR='mate'        # TextMate

# Terminal Editors
export EDITOR='vim'         # Vim
export EDITOR='nvim'        # Neovim
export EDITOR='nano'        # Nano
export EDITOR='emacs'       # Emacs

# macOS Specific
export EDITOR='open -t'     # TextEdit (plain text mode)
export EDITOR='open -a TextEdit'  # TextEdit app
```

## How Claude Code Uses These Variables
1. Claude Code checks `$VISUAL` first
2. Falls back to `$EDITOR` if VISUAL not set
3. Uses system default if neither set (macOS: `open` command)
4. For `/memory` command: Opens ~/CLAUDE.md with chosen editor

## TextEdit Default on macOS
- **System**: macOS uses Launch Services for file associations
- **Claude Code**: Uses standard Unix editor precedence
- **Default**: `open` command opens files with associated app
- **TextEdit**: Becomes default for .md files if no other app claimed

## Recommendations
For Claude Code usage:
```bash
# Add to ~/.zshrc for VS Code
export EDITOR='code --wait'
export VISUAL='code --wait'

# Or for terminal-based
export EDITOR='vim'
export VISUAL='vim'

# Then reload shell
source ~/.zshrc
```

The `--wait` flag makes VS Code wait for file to be closed before returning control.