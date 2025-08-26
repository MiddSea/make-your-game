#!/bin/bash

# Mirror specific directories and files from make-your-game to MiddSea.github.io
# Created: 2025-01-14_19-05_GMT

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
WEBSITE_REPO_DIR="../../../github/MiddSea/MiddSea.github.io"
CURRENT_BRANCH=$(git branch --show-current)

echo -e "${YELLOW}Starting mirror to website repository...${NC}"
echo -e "${YELLOW}Current branch: $CURRENT_BRANCH${NC}"

# Check if we're on main or dev branch
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "dev" ]]; then
    echo -e "${RED}Warning: Not on main or dev branch. Current branch: $CURRENT_BRANCH${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create website repo directory if it doesn't exist
if [ ! -d "$WEBSITE_REPO_DIR" ]; then
    echo -e "${YELLOW}Cloning MiddSea.github.io repository...${NC}"
    mkdir -p "$(dirname "$WEBSITE_REPO_DIR")"
    git clone git@github.com:MiddSea/MiddSea.github.io.git "$WEBSITE_REPO_DIR"
fi

# Change to website repo directory
cd "$WEBSITE_REPO_DIR"

# Ensure we're on the correct branch (create if doesn't exist)
if git show-ref --verify --quiet refs/heads/$CURRENT_BRANCH; then
    echo -e "${GREEN}Switching to existing branch: $CURRENT_BRANCH${NC}"
    git checkout $CURRENT_BRANCH
else
    echo -e "${YELLOW}Creating new branch: $CURRENT_BRANCH${NC}"
    git checkout -b $CURRENT_BRANCH
fi

# Pull latest changes
echo -e "${YELLOW}Pulling latest changes...${NC}"
git pull origin $CURRENT_BRANCH 2>/dev/null || echo "Branch doesn't exist on remote yet"

# Go back to source directory
cd - > /dev/null

# Function to copy directory with rsync
copy_directory() {
    local src="$1"
    local dest="$2"
    
    if [ -d "$src" ]; then
        echo -e "${GREEN}Copying $src/ to website repo...${NC}"
        mkdir -p "$WEBSITE_REPO_DIR/$dest"
        rsync -av --delete "$src/" "$WEBSITE_REPO_DIR/$dest/"
    else
        echo -e "${RED}Warning: $src directory not found${NC}"
    fi
}

# Function to copy individual files
copy_files() {
    local pattern="$1"
    local dest_dir="$2"
    
    mkdir -p "$WEBSITE_REPO_DIR/$dest_dir"
    for file in $pattern; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}Copying $file to website repo...${NC}"
            cp "$file" "$WEBSITE_REPO_DIR/$dest_dir/"
        fi
    done
}

# Copy directories
copy_directory "docs" "docs"
copy_directory "tests" "tests"
copy_directory "assets/images" "assets/images"
copy_directory "assets/sounds" "assets/sounds"

# Copy root files (common web files)
echo -e "${GREEN}Copying root files...${NC}"
copy_files "*.md" "."
copy_files "*.html" "."
copy_files "*.css" "."
copy_files "*.js" "."
copy_files "*.json" "."
copy_files "*.yml" "."
copy_files "*.yaml" "."
copy_files "*.txt" "."
copy_files "LICENSE*" "."
copy_files "CHANGELOG*" "."

# Change to website repo and commit changes
cd "$WEBSITE_REPO_DIR"

# Add all changes
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
else
    # Get commit message from source repo
    cd - > /dev/null
    LAST_COMMIT_MSG=$(git log -1 --pretty=format:"%s")
    LAST_COMMIT_HASH=$(git log -1 --pretty=format:"%h")
    
    cd "$WEBSITE_REPO_DIR"
    
    # Commit with reference to source repo
    COMMIT_MSG="Mirror from make-your-game ($CURRENT_BRANCH): $LAST_COMMIT_MSG [$LAST_COMMIT_HASH]"
    
    echo -e "${GREEN}Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    
    echo -e "${GREEN}Pushing to website repository...${NC}"
    git push origin $CURRENT_BRANCH
    
    echo -e "${GREEN}✅ Successfully mirrored to MiddSea.github.io ($CURRENT_BRANCH)${NC}"
fi

# Return to original directory
cd - > /dev/null

echo -e "${GREEN}Mirror process completed!${NC}"