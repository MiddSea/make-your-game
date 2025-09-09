# VSCode Markdown Linter Configuration

## Overview

VSCode has built-in markdown validation and markdownlint extension. We configure automatic validation with file-specific overrides for special cases like task lists with multiple H1 headers.

## Project Configuration

Created `.vscode/settings.json` with automatic validation enabled:

### Enabled Features

- **Auto-format on save**: Automatically fixes markdown issues
- **Auto-fix on save**: `source.fixAll.markdownlint` runs automatically
- **Built-in validation**: Both VSCode and markdownlint work together

### Configured Rules

- **MD013**: Line length set to 120 characters (flexible for docs)
- **MD033**: Inline HTML allowed (GitHub flavored markdown)
- **MD026**: Trailing punctuation in headers allowed
- **MD034**: Bare URLs allowed (auto-linked in GitHub)
- **MD025**: Single H1 rule enabled (override per file when needed)

### Validation Settings

- `markdown.validate.enabled: true` - Built-in validation active
- `markdown.validate.ignoredLinks` - Ignores local anchor links (`*.md#*`)

## File-Level Overrides

### Basic Disable/Enable

For specific files, add HTML comments:

```markdown
<!-- markdownlint-disable MD025 -->
# Multiple H1 Headers Allowed Here
# Another H1 Header
```

### Multiple Rules

Disable/enable multiple rules at once:

```markdown
<!-- markdownlint-disable MD032 MD036 -->
Content with relaxed spacing and emphasis rules
<!-- markdownlint-enable MD032 MD036 -->
```

### Temporary Rule Configuration

Change rule parameters temporarily:

```markdown
<!-- markdownlint-configure-file {"MD013": {"line_length": 20}} -->
a very short line
<!-- markdownlint-configure-file {"MD013": {"line_length": 35}} -->
123456789012345678901234567890
<!-- markdownlint-disable MD013 -->
Very long line that ignores length completely...
```

### Important Notes

- Comments affect only content **below** them in the same file
- Settings persist until overridden by another comment  
- Problems disappear immediately in VSCode editor
- Cannot reference external config files in HTML comments
- Comments are invisible in rendered markdown

## Rule Reference

Common markdownlint rules you might want to disable:

- `MD001`: Header increment (h1 -> h2 -> h3)
- `MD003`: Header style consistency  
- `MD007`: Unordered list indentation
- `MD010`: Hard tabs
- `MD012`: Multiple consecutive blank lines
- `MD013`: Line length
- `MD024`: Multiple headers with same content
- `MD025`: Multiple h1 headers
- `MD026`: Trailing punctuation in headers
- `MD033`: Inline HTML
- `MD034`: Bare URLs
- `MD040`: Code language specification

## Implementation

1. **Project-wide**: Use `.vscode/settings.json` (committed to repo)
2. **User-wide**: Modify user settings (File → Preferences → Settings)
3. **File-specific**: Use HTML comments in individual files

## Testing
 <!-- markdownlint-disable MD032 MD036 -->
After configuration:
1. Open any markdown file
2. Check if linter warnings are reduced/eliminated
3. Verify in VSCode Problems panel (View → Problems)

---

*Configuration applied: 2025-09-04_12-59_EEST*
