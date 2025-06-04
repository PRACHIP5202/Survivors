#!/bin/bash

# EmberEye Deployment Preparation Script
# This script prepares the project for Vercel deployment

set -e

echo "🔥 EmberEye Deployment Preparation"
echo "=================================="

# Change to project root directory
cd "$(dirname "$0")/.."

echo "📋 Running pre-deployment checks..."

# 1. Security audit
echo "🔐 Running security audit..."
npm run audit
if [ $? -ne 0 ]; then
    echo "❌ Security audit failed. Please fix vulnerabilities before deploying."
    exit 1
fi

# 2. Test frontend build
echo "🏗️  Testing frontend build..."
cd firepre
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed. Please fix build errors."
    exit 1
fi
cd ..

# 3. Check if git is clean
echo "📝 Checking git status..."
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "   Consider committing them before deployment."
    git status --short
    echo ""
fi

# 4. Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch."
    echo "   Current branch: $CURRENT_BRANCH"
    echo "   Consider switching to main for deployment."
    echo ""
fi

# 5. Check remote repository
REMOTE_URL=$(git config --get remote.origin.url)
echo "🔗 Repository URL: $REMOTE_URL"

echo ""
echo "✅ Pre-deployment checks completed!"
echo ""
echo "🚀 Next Steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your repository: $REMOTE_URL"
echo "3. Set Root Directory to: 'firepre'"
echo "4. Framework Preset: 'Other'"
echo "5. Build Command: 'npm run build'"
echo "6. Output Directory: 'dist'"
echo "7. Click Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
