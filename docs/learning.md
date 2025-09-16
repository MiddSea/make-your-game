# Learning Journal

This document tracks the concepts learned, challenges faced, and solutions discovered during the
development of this browser game.

## Project Setup (May 24, 2025)

### Git Repository Setup

#### Concepts Learned

- Git branching strategies (main/dev workflow)
- Repository mirroring between Gitea and GitHub
- Project structure planning

#### Process

1. Created local repository in `~/gitea/smiddleto/make-your-game`
2. Initialized git with main branch
3. Created initial project structure
4. Set up documentation framework

#### Commands Used

```bash
git init
git add .
git commit -m "Initial commit: Project setup and documentation structure"
```

#### Completed Steps

- ✓ Created initial project structure with directories for docs, src, and tests
- ✓ Set up basic HTML, CSS, and JavaScript files
- ✓ Made initial commit on main branch
- ✓ Created dev branch
- ✓ Added Gitea remote (origin)
- ✓ Added git_branches.sh script for branch management

### Next Steps

1. Set up GitHub mirroring
2. Push to Gitea remote
3. Review project brief (need to get the content from grit:lab)
4. Begin game design based on requirements

---

## JavaScript Concepts

### [Date] - Concept Name

#### What I Learned

-

#### How It Works

-

#### Example Code

```javascript
// Code example
```

#### Challenges Faced

-

#### Solution

-

---

## DOM Manipulation
<!-- -->
### [Date] - Concept Name

#### What I Learned

-

#### Example

```javascript
// Code example
```

---

## Game Development Concepts

### MVC Architecture

#### Model

- Handles game state and logic
- Independent of presentation

#### View

- Handles rendering and display
- Updates based on model changes

#### Controller

- Handles user input
- Mediates between Model and View

### Game Loop

#### Key Components

1. Input processing
2. Game state update
3. Rendering
4. Timing control

---

## Debugging Experiences

### [Date] - Bug Description

#### Symptoms

-

#### Root Cause

-

#### Debugging Process

1.
2.
3.

#### Solution

-

#### Lessons Learned

-

---

## Tools and Technologies

### Git Commands Reference

#### Branching

```bash
git checkout -b feature/name    # Create new feature branch
git checkout dev                # Switch to dev branch
git merge --no-ff feature/name  # Merge with commit
```

#### Mirroring

```bash
git clone --mirror . /tmp/mirror
cd /tmp/mirror
git remote add github https://github.com/MiddSea/make-your-game.git
git push github --mirror
```

### VS Code Extensions Used

-
-
-

### Browser DevTools Tips

-
-
-

---

## Resources and References

### Documentation

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Git Documentation](https://git-scm.com/doc)

### Tutorials

-

### Helpful Articles

-

---

## Reflections

### What Went Well

-

### Areas for Improvement

-

### Key Takeaways

-

---

*This journal will be continuously updated throughout the project development.*
