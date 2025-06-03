#!/bin/bash

# Setup script for EmberEye development environment
set -e

echo "🔥 Setting up EmberEye development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | sed 's/v//')
REQUIRED_NODE="18.0.0"
if ! npx semver-compare $NODE_VERSION $REQUIRED_NODE; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install v18 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd firepre
npm install
cd ..

# Setup Python virtual environment (optional but recommended)
echo "🐍 Setting up Python virtual environment..."
if [ ! -d "backend/venv" ]; then
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
else
    echo "Virtual environment already exists"
fi

# Copy environment files
echo "⚙️ Setting up environment files..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from template"
else
    echo "backend/.env already exists"
fi

if [ ! -f "firepre/.env" ]; then
    cp firepre/.env.example firepre/.env
    echo "✅ Created firepre/.env from template"
else
    echo "firepre/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your OpenWeatherMap API key to both .env files"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Visit http://localhost:5173 for the frontend"
echo "4. Visit http://localhost:8000 for the backend API"
echo ""
echo "For more information, see docs/DEVELOPMENT.md"
