# Zsh History Expansion - Advanced Command Building

**Created:** 2025-08-24  
**Context:** Building complex commands with zsh history expansion  
**See also:** `/Users/sean.middleton/github/MiddSea/notes/shell/zsh-history-expansion.md`

## Your Specific Use Case

### Problem

```bash
mv docs/PROJECT_SETUP.md !#:$            # Expands to: docs/project_setup.md
mv docs/PROJECT_SETUP.md !#:$:l.tmp      # Expands to: docs/project_setup.md.tmp

# Then continuing:
mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv !#:$  # mv mv (wrong!)
```

### Solution - Second-to-Last Argument

```bash
mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv !#:-2 !#:$:r
```

**Result:** `mv docs/project_setup.md.tmp docs/project_setup.md`

## History Expansion Patterns

### Current Command Line (`!#`)

- `!#:0` = Command name
- `!#:1` = First argument  
- `!#:2` = Second argument
- `!#:$` = Last argument
- `!#:-2` = **Second-to-last argument**
- `!#:*` = All arguments

### Previous Command (`!-1` or `!!`)

- `!-1:1` = First argument from previous command
- `!-1:2` = Second argument from previous command
- `!-1:-2` = Second-to-last argument from previous command
- `!!:$` = Last argument from previous command

### Argument Ranges

- `!#:1-3` = Arguments 1 through 3
- `!#:2-$` = Arguments 2 through last
- `!#:^` = All arguments except last (equivalent to `!#:1-$-1`)

## Modifiers for Your Pattern

### Case Conversion

- `:l` = Lowercase
- `:u` = Uppercase  
- `:c` = Capitalize first letter

### File Extension Operations

- `:r` = Remove extension
- `:e` = Extract extension only
- `:h` = Head (directory path)
- `:t` = Tail (filename only)

## Your Working Examples

### Pattern 1: Basic Rename

```bash
mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv !#:2 !#:$:r
# Expands to:
mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv docs/project_setup.md.tmp docs/project_setup.md
```

### Pattern 2: Using Second-to-Last

```bash
mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv !#:-2 !#:$:r  
# Same result, clearer intent
```

### Pattern 3: Complex File Operations

```bash
cp file.txt file.backup.txt; mv !#:-2 !#:$:r:h/renamed_!#:$:r:t
# Backup, then move to new name in same directory
```

## Advanced Patterns for File Operations

### Batch Renaming with History

```bash
mv FILE1.MD file1.md.tmp; mv !#:2 !#:$:r; mv FILE2.MD file2.md.tmp; mv !#:2 !#:$:r
```

### Directory + File Operations

```bash
mkdir -p backup; cp important.txt !#:1/!#:2; rm !#:2
# Creates backup dir, copies file there, removes original
```

### Extension Changes

```bash
mv document.txt document.md; vim !#:$; mv !#:$ !#:$:r.txt
# txt→md, edit, md→txt
```

## Tips for Command Construction

### 1. Test Expansions

```bash
# Use print to test before executing:
print mv docs/PROJECT_SETUP.md docs/project_setup.md.tmp; mv !#:-2 !#:$:r
```

### 2. Build Incrementally

```bash
mv file.txt file.tmp          # Step 1
mv !#:2 !#:$:r               # Step 2 (test expansion)
mv file.txt file.tmp; mv !#:2 !#:$:r  # Combined
```

### 3. Use Variables for Complex Operations

```bash
original=docs/PROJECT_SETUP.md
temp=${original:l}.tmp
mv $original $temp; mv $temp ${temp:r}
```

## Common Gotchas

### 1. Argument Position Changes

```bash
# After expansion, argument positions shift:
mv a b c; echo !#:2  # 'b', not 'c'
```

### 2. Nested Modifiers

```bash
# Correct: !#:$:r:l (remove extension, then lowercase)  
# Wrong:   !#:r:$:l (tries to get last of removed extension)
```

### 3. Quoting Issues

```bash
# May need quotes for complex expansions:
mv "!#:-2" "!#:$:r"
```

## Reference Quick Card

| Pattern | Meaning | Example |
|---------|---------|---------|
| `!#:2` | 2nd arg current line | `mv a b c; echo !#:2` → `b` |
| `!#:-2` | 2nd-to-last arg | `mv a b c d; echo !#:-2` → `c` |
| `!#:$:r` | Last arg, no extension | `mv file.txt; echo !#:$:r` → `file` |
| `!-1:$` | Last arg previous cmd | `ls file; mv !-1:$ new` |
| `!#:*:l` | All args lowercase | `MV FILE.TXT; echo !#:*:l` |
