# Tasks To Do

## 2025-08-30 Saturday - VSCode Markdown Linter Configuration

### Tasks for Saturday (DO NOT complete before 2025-08-30)

1. **Research VSCode linter MD024 ignore configuration**
   - Find ignore file location
   - Check differences for different VSCode workspaces
   - Check differences for different VSCode users (default user)

2. **Check MD013 ignore status**
   - Verify where MD013 is already being ignored
   - Use appropriate MCP tool to investigate

3. **Get current markdown linter documentation**
   - Use context7-mcp to get up-to-date markdown linter extension docs
   - Verify correct version and configuration options

4. **Document findings**
   - Add results to existing outstanding tasks file
   - Document configuration recommendations

# Tasks Completed

## 2025-06-18 - Claude Code Configuration Updates

### 1. Enabled Project MCP Servers

- **File**: `.claude/settings.local.json`
- **Change**: Set `enableAllProjectMcpServers` to `true`
- **Purpose**: Allow local project Claude Code MCP servers to run

### 2. Removed Custom Init Command

- **File**: `.claude/commands/init.md` (deleted)
- **Reason**: Conflicted with built-in `/init` command
- **Type**: This was a **Project** slash command (stored in `.claude/commands/`)

### 3. Slash Command Types

Based on the file structure and Claude Code documentation:

- **Built-in Commands**: Core Claude Code commands like `/init`, `/help`, `/model`
- **Project Commands**: Custom commands stored in `.claude/commands/` directory (like the deleted init.md)
- **User Commands**: Global commands stored in user's home directory
- **Local Commands**: Commands specific to the current working directory

The deleted `init.md` was a Project-level slash command that was overriding the built-in `/init` functionality.

### Notes

- `.claude/commands/` directory remains for future custom project commands
- Project MCP servers are now enabled for this repository
- Custom init functionality has been removed to prevent conflicts
