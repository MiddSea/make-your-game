#!/bin/bash

# Git branch management script
# Creates and manages main, dev, and feature branches

# Function to display usage info
function show_help {
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  setup                 Setup initial branch structure (main, dev)"
    echo "  feature start NAME    Create a new feature branch from dev"
    echo "  feature finish NAME   Merge feature branch to dev and delete it"
    echo "  release               Merge dev into main"
    echo "  sync                  Sync all branches with remote"
    echo ""
    echo "Options:"
    echo "  -h, --help            Show this help message"
}

# Function to setup initial branch structure
function setup_branches {
    echo "Setting up branch structure..."
    
    # Create dev branch if it doesn't exist
    if ! git show-ref --verify --quiet refs/heads/dev; then
        git checkout -b dev
        echo "Created dev branch"
    else
        echo "Dev branch already exists"
    fi
    
    # Push branches to remote if remote exists
    if git remote -v | grep -q origin; then
        echo "Pushing branches to remote..."
        git push -u origin main
        git checkout dev
        git push -u origin dev
        git checkout main
    else
        echo "No remote configured. Set up remote with: git remote add origin <URL>"
    fi
    
    echo "Branch structure setup complete."
}

# Function to start a new feature branch
function start_feature {
    if [ -z "$1" ]; then
        echo "Error: Feature name required"
        echo "Usage: $0 feature start FEATURE_NAME"
        exit 1
    fi
    
    feature_name="feature/$1"
    
    # Make sure we're on dev branch first
    git checkout dev
    
    # Update dev from remote if possible
    if git remote -v | grep -q origin; then
        git pull origin dev
    fi
    
    # Create feature branch
    git checkout -b "$feature_name" dev
    echo "Created feature branch: $feature_name"
    echo "Make your changes and then run: $0 feature finish $1"
}

# Function to finish a feature branch
function finish_feature {
    if [ -z "$1" ]; then
        echo "Error: Feature name required"
        echo "Usage: $0 feature finish FEATURE_NAME"
        exit 1
    fi
    
    feature_name="feature/$1"
    
    # Check if feature branch exists
    if ! git show-ref --verify --quiet refs/heads/"$feature_name"; then
        echo "Error: Feature branch $feature_name does not exist"
        exit 1
    fi
    
    # Make sure changes are committed
    if ! git diff-index --quiet HEAD --; then
        echo "You have uncommitted changes. Please commit or stash them first."
        exit 1
    fi
    
    # Merge feature into dev
    git checkout dev
    git pull origin dev
    git merge --no-ff "$feature_name" -m "Merge feature/$1 into dev"
    
    # Delete feature branch
    git branch -d "$feature_name"
    echo "Feature $1 merged into dev and branch deleted"
    
    # Push dev to remote if remote exists
    if git remote -v | grep -q origin; then
        git push origin dev
    fi
}

# Function to create release
function make_release {
    # Make sure we're working with latest code
    git checkout dev
    if git remote -v | grep -q origin; then
        git pull origin dev
    fi
    
    git checkout main
    if git remote -v | grep -q origin; then
        git pull origin main
    fi
    
    # Merge dev into main
    git merge --no-ff dev -m "Merge dev into main for release"
    
    # Push to remote if it exists
    if git remote -v | grep -q origin; then
        git push origin main
    fi
    
    echo "Release complete: dev merged into main"
}

# Function to sync all branches with remote
function sync_branches {
    if ! git remote -v | grep -q origin; then
        echo "No remote configured. Set up remote with: git remote add origin <URL>"
        exit 1
    fi
    
    echo "Syncing branches with remote..."
    
    # Fetch all from remote
    git fetch --all
    
    # Sync main
    git checkout main
    git pull origin main
    
    # Sync dev
    git checkout dev
    git pull origin dev
    
    # Return to original branch
    git checkout -
    
    echo "All branches synced with remote"
}

# Process command line arguments
case "$1" in
    setup)
        setup_branches
        ;;
    feature)
        case "$2" in
            start)
                start_feature "$3"
                ;;
            finish)
                finish_feature "$3"
                ;;
            *)
                echo "Unknown feature command: $2"
                show_help
                exit 1
                ;;
        esac
        ;;
    release)
        make_release
        ;;
    sync)
        sync_branches
        ;;
    -h|--help)
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
