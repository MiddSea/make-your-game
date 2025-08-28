# Git mv vs mv - Command Differences

**Created:** 2025-08-24  
**Context:** Understanding file operations in git repositories

## Core Differences

### `git mv` - Git-aware move

- **Purpose:** Move/rename files while updating git index automatically
- **Stages:** Operation is immediately staged for commit
- **Tracking:** Preserves file history and git understands it as a move
- **Atomicity:** Single operation that combines move + staging

### `mv` - System-level move  

- **Purpose:** Move/rename files at filesystem level only
- **Staging:** Requires manual `git rm` + `git add` to update index
- **Tracking:** Git sees as delete + add (may lose history continuity)
- **Steps:** Multi-step process requiring manual git operations

## Command Examples

### Using `git mv`

```bash
git mv docs/PROJECT_SETUP.md docs/project_setup.md
# File moved AND staged automatically
git status  # Shows: renamed: docs/PROJECT_SETUP.md -> docs/project_setup.md
```

### Using `mv` (requires additional steps)

```bash
mv docs/PROJECT_SETUP.md docs/project_setup.md
# Only filesystem move completed
git status  # Shows: deleted: docs/PROJECT_SETUP.md, untracked: docs/project_setup.md

# Manual staging required:
git rm docs/PROJECT_SETUP.md
git add docs/project_setup.md
# OR: git add -A  (adds all changes)
```

## When to Use Each

### Use `git mv` when

- Moving tracked files within a git repository
- Renaming files while preserving git history
- Want single-command operation
- Need clean commit history

### Use `mv` when

- Moving files outside git repositories
- Complex operations requiring shell features
- Batch operations with shell patterns
- Moving between different repositories

## History Preservation

### `git mv` advantages

```bash
git mv old_file.md new_file.md
git log --follow new_file.md  # Shows complete history including pre-rename
```

### `mv` potential issues

```bash
mv old_file.md new_file.md
git add -A
git log --follow new_file.md  # May not show pre-rename history
```

## Performance Comparison

- **`git mv`:** Faster for single files, handles staging automatically
- **`mv`:** Better for complex shell operations, pattern matching

## Best Practices

1. **In git repos:** Use `git mv` for tracked files
2. **Shell scripting:** Use `mv` with explicit `git add`/`git rm`
3. **Batch operations:** Consider `mv` with shell patterns + `git add -A`
4. **History preservation:** Always use `git mv` for important tracked files

## Common Patterns

### Lowercase filename conversion

```bash
# Git way:
git mv FILE.md file.md

# Shell way:  
mv FILE.md file.md
git add -A
```

### Directory moves

```bash
# Git way:
git mv src/old_dir src/new_dir

# Shell way:
mv src/old_dir src/new_dir  
git add -A
```
