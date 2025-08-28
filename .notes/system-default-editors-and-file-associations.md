# System Default Editors and File Associations

## macOS System

### How macOS `open` Command Works

The `open` command uses **Launch Services** to determine which application opens a file:

1. **Launch Services Database**: Located at `~/Library/Preferences/com.apple.launchservices.secure.plist`
2. **Content Type Mapping**: Files are categorized by UTI (Uniform Type Identifier)
3. **Application Priority**: Based on user preferences, bundle identifiers, and system defaults

### Setting macOS Defaults

```bash
# Set default app for file type
defaults write com.apple.LaunchServices/com.apple.launchservices.secure.plist LSHandlers -array-add '{LSHandlerContentType="public.plain-text";LSHandlerRoleAll="com.microsoft.VSCode";}'

# Reset Launch Services database
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -kill -r -domain local -domain system -domain user

# Use duti tool (if installed via Homebrew)
# brew install duti
# duti -s com.microsoft.VSCode .md all
```

`duti` - set default document and URL handlers

### macOS `edit` Command

**Does not exist natively**. The `open` command serves this purpose:

- `open -t file.txt` - Opens in TextEdit (plain text mode)
- `open -e file.txt` - Opens in TextEdit (rich text mode)
- `open -a "Visual Studio Code" file.txt` - Opens in specific app

### Current System State

- **macOS Version**: 15.3.2 (24D81) - Sequoia
- **TextEdit Location**: `/System/Library/CoreServices/Applications/TextEdit.app`
- **Default for .md**: Not specifically set, falls back to system default

## Ubuntu Linux System

### How Ubuntu Handles File Associations

1. **MIME Types**: Uses `/usr/share/applications/` and `~/.local/share/applications/`
2. **XDG Desktop Entries**: `.desktop` files define applications
3. **Default Applications**: Managed by `xdg-mime` and desktop environment

### Ubuntu Commands

```bash
# Equivalent to macOS 'open'
xdg-open file.txt

# Set default application
xdg-mime default code.desktop text/plain
xdg-mime default code.desktop text/markdown

# Query current defaults
xdg-mime query default text/plain
xdg-mime query filetype file.md

# List available applications for type
gio mime text/plain
```

### Ubuntu `edit` Command

**Exists as a symlink or wrapper**:

- Usually points to `/usr/bin/sensible-editor`
- Falls back chain: `$VISUAL` → `$EDITOR` → `/usr/bin/editor` → `nano`

## Claude Code Editor Settings

### Current Behavior

- **No Claude Code specific editor settings**
- **Follows Unix convention**: `$VISUAL` → `$EDITOR` → system default
- **System default**: Uses `open` (macOS) or `xdg-open` (Linux)

### Setting Editor for Claude Code Only

Since Claude Code has no built-in editor configuration, use wrapper scripts:

#### Method 1: Shell Function

```bash
# Add to ~/.zshrc
claude() {
    if [[ "$1" == "/memory" ]]; then
        EDITOR='code --wait' command claude "$@"
    else
        command claude "$@"
    fi
}
```

#### Method 2: Custom Script

```bash
# Create ~/bin/claude-with-editor
#!/bin/bash
export EDITOR='code --wait'
export VISUAL='code --wait'
exec /path/to/claude "$@"

# Make executable and add to PATH
chmod +x ~/bin/claude-with-editor
```

#### Method 3: Environment File

```bash
# Create ~/.claude-env
export EDITOR='code --wait'
export VISUAL='code --wait'

# Source before running Claude
source ~/.claude-env && claude /memory
```

## Recommended Settings

### For VS Code Users

```bash
# ~/.zshrc
export EDITOR='code --wait'
export VISUAL='code --wait'
```

### For Vim Users

```bash
# ~/.zshrc
export EDITOR='vim'
export VISUAL='vim'
```

### For TextEdit Users (macOS)

```bash
# ~/.zshrc
export EDITOR='open -t'  # Plain text mode
# or
export EDITOR='open -a TextEdit'  # Full TextEdit app
```

## System File Association Commands

### macOS

```bash
# Check current default for .md files
defaults read com.apple.LaunchServices/com.apple.launchservices.secure | grep -A10 -B10 markdown

# Set VS Code as default for .md
defaults write com.apple.LaunchServices/com.apple.launchservices.secure LSHandlers -array-add '{LSHandlerContentType="net.daringfireball.markdown";LSHandlerRoleAll="com.microsoft.VSCode";}'
```

### Ubuntu

```bash
# Check current default
xdg-mime query default text/markdown

# Set VS Code as default
xdg-mime default code.desktop text/markdown
```

## Summary

- **macOS**: Uses Launch Services, no native `edit` command, `open` handles everything
- **Ubuntu**: Uses XDG/MIME types, has `edit` command via sensible-editor
- **Claude Code**: No built-in editor config, follows Unix `$VISUAL`/`$EDITOR` convention
- **Workaround**: Use shell functions or wrapper scripts for Claude Code specific editor settings
