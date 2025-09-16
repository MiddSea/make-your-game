<!-- markdownlint-disable first-line-heading line-length -->
# Oh-My-Zsh Git Aliases: Understanding Local vs Remote Branches

## The Problem We Solved

When using oh-my-zsh git aliases like `gswd` (git switch develop) and `gswm` (git switch main), the `gswd` command was failing in some repositories with the error:

```bash
fatal: invalid reference: develop
```

## Root Cause Analysis

### The Investigation Process

We discovered this by investigating the oh-my-zsh git plugin structure:

1. **Located the plugin file:**

   ```bash
   find ~/.oh-my-zsh -name "*.zsh" -exec grep -l "git_develop_branch\|git_main_branch" {} \;
   ```

   Result: `/Users/sean.middleton/.oh-my-zsh/plugins/git/git.plugin.zsh`

2. **Examined the functions:**
   Found at lines 20-32 in the plugin file:

### The git_develop_branch Function

```bash
function git_develop_branch() {
  command git rev-parse --git-dir &>/dev/null || return
  local branch
  for branch in dev devel develop development; do
    if command git show-ref -q --verify refs/heads/$branch; then
      echo $branch
      return 0
    fi
  done

  echo develop
  return 1
}
```

### The git_main_branch Function

```bash
function git_main_branch() {
  command git rev-parse --git-dir &>/dev/null || return
  local ref
  for ref in refs/{heads,remotes/{origin,upstream}}/{main,trunk,mainline,default,stable,master}; do
    if command git show-ref -q --verify $ref; then
      echo ${ref:t}
      return 0
    fi
  done

  # If no main branch was found, fall back to master but return error
  echo master
  return 1
}
```

### Key Discovery: refs/heads vs refs/remotes

The critical insight: **The `git_develop_branch()` function only checks `refs/heads/$branch` (local branches), not remote branches.**

## Understanding Git References

### What We Found in Our Repositories

**Gitea Repository** (working case):

```bash
git show-ref
bddafc7431aec9d9c9b5d6ea069b318941c2edb7 refs/heads/dev      ✅ LOCAL BRANCH
bd1db9f9e4ce78afd38d11904b95426845c43dae refs/heads/main     ✅ LOCAL BRANCH
bddafc7431aec9d9c9b5d6ea069b318941c2edb7 refs/remotes/github/dev
bd1db9f9e4ce78afd38d11904b95426845c43dae refs/remotes/github/main
bddafc7431aec9d9c9b5d6ea069b318941c2edb7 refs/remotes/origin/dev
bd1db9f9e4ce78afd38d11904b95426845c43dae refs/remotes/origin/main
```

**GitHub Repository** (failing case before fix):

```bash
git show-ref
2092d05ceae2802df220e26ed09400ebae91f997 refs/heads/main      ✅ LOCAL BRANCH
bddafc7431aec9d9c9b5d6ea069b318941c2edb7 refs/remotes/origin/HEAD
bddafc7431aec9d9c9b5d6ea069b318941c2edb7 refs/remotes/origin/dev  ❌ REMOTE ONLY
bd1db9f9e4ce78afd38d11904b95426845c43dae refs/remotes/origin/main
```

## The Solution: Understanding Local Branch Creation

### How Local Branches Are Created

**Remote references** (`refs/remotes/origin/dev`) exist immediately after cloning/fetching - they just point to commits on the remote server.

**Local branches** (`refs/heads/dev`) are only created when you check them out for the first time:

```bash
# Any of these commands will create a local branch:
git checkout dev                    # Creates local branch tracking remote
git switch dev                      # Same thing, newer syntax  
git checkout -b dev origin/dev      # Explicit creation with tracking
```

### Demonstration of the Fix

**Before fix - GitHub repository:**

```bash
git branch
* main                             # Only main exists locally

gswd
fatal: invalid reference: develop   # Fails because no local dev branch
```

**After running `git switch dev`:**

```bash
git branch
* dev                              # Now both exist locally
  main

gswd  
Switched to branch 'dev'           # Works! ✅
```

## The Aliases That Use These Functions

Located in `/Users/sean.middleton/.oh-my-zsh/plugins/git/git.plugin.zsh`:

```bash
alias gswd='git switch $(git_develop_branch)'    # Line ~350
alias gswm='git switch $(git_main_branch)'       # Line ~351
```

Other aliases that use these functions:

- `gcd='git checkout $(git_develop_branch)'`
- `gcm='git checkout $(git_main_branch)'`
- `grbd='git rebase $(git_develop_branch)'`
- `grbm='git rebase $(git_main_branch)'`

## Branch Priority Order

The functions search in this order:

**For develop branch:**

1. `dev` ✅ (found in our case)
2. `devel`
3. `develop`
4. `development`

**For main branch:**

1. `main` ✅ (found in our case)
2. `trunk`
3. `mainline`
4. `default`
5. `stable`
6. `master`

## Best Practices for Repository Setup

To ensure oh-my-zsh git aliases work correctly:

1. **After cloning any repository**, check out all branches you plan to use:

   ```bash
   git switch dev      # Creates local dev branch if remote exists
   git switch main     # Creates local main branch if remote exists
   ```

2. **Check your setup** with:

   ```bash
   git branch -a       # Shows all branches (local and remote)
   git_develop_branch  # Test the function directly
   git_main_branch     # Test the function directly
   ```

3. **Verify aliases work:**

   ```bash
   gswd               # Should switch to develop branch
   gswm               # Should switch to main branch
   ```

## Files and References

- **Main plugin file:** `/Users/sean.middleton/.oh-my-zsh/plugins/git/git.plugin.zsh`
- **Function locations:** Lines 20-32 (`git_develop_branch`), Lines 35+ (`git_main_branch`)
- **Alias definitions:** Various lines throughout the plugin file
- **Git references:** Use `git show-ref` to see all refs in a repository

## Key Learning Points

1. **Local vs Remote:** Oh-my-zsh functions only check local branches (`refs/heads/`)
2. **On-demand creation:** Local branches are created only when first checked out
3. **Branch naming:** Functions have built-in priority orders for branch names
4. **Repository differences:** Same codebase can have different local branch setups
5. **Simple fix:** `git switch <branch>` creates missing local branches

This investigation taught us about zsh functions, oh-my-zsh plugins, git references, and the difference between local and remote branch storage in git repositories.
