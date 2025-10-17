#!/bin/bash

# Script to mirror Gitea repository to GitHub
# Based on the gitea_to_github_mirroring.md guide

echo "=== Gitea to GitHub Repository Mirroring ==="
echo

# Check if we're in the correct directory
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository. Please run from the repository root."
    exit 1
fi

# Function to mirror to GitHub
mirror_to_github() {
    echo "Creating temporary mirror clone..."
    
    # Create temporary directory
    TEMP_DIR="/tmp/make-your-game-mirror-$(date +%s)"
    
    # Clone as mirror
    git clone --mirror . "$TEMP_DIR"
    
    # Navigate to temporary mirror
    cd "$TEMP_DIR"
    
    # Add GitHub remote
    echo "Adding GitHub remote..."
    git remote add github https://github.com/MiddSea/make-your-game.git
    
    # Push everything to GitHub
    echo "Pushing to GitHub..."
    git push github --mirror
    
    # Return to original directory
    cd -
    
    # Clean up
    rm -rf "$TEMP_DIR"
    
    echo "✓ Mirror to GitHub complete!"
}

# Function to push current changes to Gitea first
push_to_gitea() {
    echo "Pushing current changes to Gitea..."
    
    # Push all branches
    git push -u origin main
    git push -u origin dev
    
    # Push tags if any
    git push origin --tags
    
    echo "✓ Pushed to Gitea!"
}

# Main execution
case "$1" in
    push)
        push_to_gitea
        ;;
    mirror)
        mirror_to_github
        ;;
    full)
        push_to_gitea
        echo
        mirror_to_github
        ;;
    *)
        echo "Usage: $0 {push|mirror|full}"
        echo
        echo "Commands:"
        echo "  push   - Push current changes to Gitea"
        echo "  mirror - Mirror repository to GitHub"
        echo "  full   - Push to Gitea then mirror to GitHub"
        echo
        echo "Example: $0 full"
        ;;
esac
