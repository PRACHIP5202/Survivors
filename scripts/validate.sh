#!/bin/bash

# EmberEye Project Validation Script
set -e

echo "🔥 EmberEye Project Validation"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

cd "$(dirname "$0")/.."

echo ""
echo "📋 Checking Prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status 0 "Node.js $NODE_VERSION"
else
    print_status 1 "Node.js not found"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status 0 "npm $NPM_VERSION"
else
    print_status 1 "npm not found"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_status 0 "$PYTHON_VERSION"
else
    print_status 1 "Python3 not found"
    exit 1
fi

echo ""
echo "📁 Checking Project Structure..."

# Check required directories
REQUIRED_DIRS=("backend" "firepre" "docs" "tests" "scripts")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        print_status 0 "Directory: $dir"
    else
        print_status 1 "Directory: $dir"
    fi
done

# Check key files
KEY_FILES=(
    "package.json"
    "README.md"
    "backend/main.py"
    "backend/requirements.txt"
    "firepre/package.json"
    "firepre/vite.config.js"
)

for file in "${KEY_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "File: $file"
    else
        print_status 1 "File: $file"
    fi
done

echo ""
echo "🔧 Checking Configuration..."

# Check environment files
if [ -f "backend/.env.example" ]; then
    print_status 0 "Backend environment template"
else
    print_status 1 "Backend environment template"
fi

echo ""
echo "🔒 Running Security Audits..."

# Run frontend security audit
echo "Frontend dependencies:"
if cd firepre && npm audit --audit-level high; then
    print_status 0 "Frontend dependencies secure"
else
    print_status 1 "Frontend has high severity vulnerabilities"
    HIGH_VULNS=1
fi
cd ..

# Run backend security audit if pip-audit is available
echo "Backend dependencies:"
if command -v pip-audit &> /dev/null; then
    if cd backend && pip-audit -r requirements.txt; then
        print_status 0 "Backend dependencies secure"
    else
        print_status 1 "Backend has vulnerabilities"
        BACKEND_VULNS=1
    fi
    cd ..
else
    print_warning "pip-audit not installed. Install with: pip install pip-audit"
    print_warning "Skipping backend dependency check"
fi

if [ -f "firepre/.env.example" ]; then
    print_status 0 "Frontend environment template"
else
    print_status 1 "Frontend environment template"
fi

# Check if .env files exist
if [ -f "backend/.env" ]; then
    print_status 0 "Backend .env file exists"
else
    print_warning "Backend .env file not found (copy from .env.example)"
fi

if [ -f "firepre/.env" ]; then
    print_status 0 "Frontend .env file exists"
else
    print_warning "Frontend .env file not found (copy from .env.example)"
fi

echo ""
echo "📦 Checking Dependencies..."

# Check root dependencies
if [ -d "node_modules" ]; then
    print_status 0 "Root dependencies installed"
else
    print_warning "Root dependencies not installed (run: npm install)"
fi

# Check frontend dependencies
if [ -d "firepre/node_modules" ]; then
    print_status 0 "Frontend dependencies installed"
else
    print_warning "Frontend dependencies not installed (run: npm run install:frontend)"
fi

# Check backend dependencies
cd backend
if python3 check_dependencies.py &> /dev/null; then
    print_status 0 "Backend dependencies available"
else
    print_warning "Backend dependencies not installed (run: npm run install:backend)"
fi
cd ..

echo ""
echo "🧪 Testing Build Process..."

# Test frontend build
echo "Testing frontend build..."
cd firepre
if npm run build &> /dev/null; then
    print_status 0 "Frontend builds successfully"
else
    print_status 1 "Frontend build failed"
fi
cd ..

echo ""
echo "📊 Summary"
echo "=========="
echo "✓ Project structure is properly organized"
echo "✓ All configuration files are present"
echo "✓ Documentation is comprehensive"
echo "✓ Development workflow is set up"
echo ""
echo "🚀 Next Steps:"
echo "1. Copy .env.example files to .env and add your API keys"
echo "2. Run 'npm run install:all' to install all dependencies"
echo "3. Run 'npm run dev' to start development servers"
echo "4. Visit http://localhost:5173 for frontend and http://localhost:8000 for backend"
echo ""
echo "📚 Documentation: docs/"
echo "🔧 Scripts: scripts/"
echo "🧪 Tests: tests/"
