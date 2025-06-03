#!/bin/bash
# Deployment script for EmberEye

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print a section header
print_section() {
  echo -e "\n${GREEN}==== $1 ====${NC}"
}

# Function to print a step
print_step() {
  echo -e "${YELLOW}→ $1${NC}"
}

# Function to print an error
print_error() {
  echo -e "${RED}ERROR: $1${NC}"
}

# Check if required commands are available
check_requirements() {
  print_section "Checking requirements"
  
  commands=("node" "npm" "python3" "git")
  
  for cmd in "${commands[@]}"; do
    if ! command -v $cmd &> /dev/null; then
      print_error "$cmd is required but not installed."
      exit 1
    else
      print_step "$cmd is installed ✓"
    fi
  done
}

# Build frontend
build_frontend() {
  print_section "Building frontend"
  cd firepre || exit 1
  
  print_step "Installing dependencies..."
  npm install || { print_error "Failed to install frontend dependencies"; exit 1; }
  
  print_step "Building frontend..."
  npm run build || { print_error "Failed to build frontend"; exit 1; }
  
  print_step "Frontend build complete ✓"
  cd ..
}

# Build backend
build_backend() {
  print_section "Building backend"
  cd backend || exit 1
  
  print_step "Installing dependencies..."
  pip3 install -r requirements.txt || { print_error "Failed to install backend dependencies"; exit 1; }
  
  print_step "Checking configuration..."
  if [ ! -f .env ]; then
    print_error ".env file is missing. Please create it from .env.example"
    exit 1
  fi
  
  print_step "Backend setup complete ✓"
  cd ..
}

# Run tests
run_tests() {
  print_section "Running tests"
  
  print_step "Running frontend tests..."
  cd firepre || exit 1
  npm run test || { print_error "Frontend tests failed"; exit 1; }
  cd ..
  
  print_step "Running backend tests..."
  cd backend || exit 1
  python3 -m pytest || { print_error "Backend tests failed"; exit 1; }
  cd ..
  
  print_step "All tests passed ✓"
}

# Deploy
deploy() {
  print_section "Deployment"
  
  if [ "$1" == "vercel" ]; then
    print_step "Deploying frontend to Vercel..."
    cd firepre || exit 1
    npx vercel --prod || { print_error "Vercel deployment failed"; exit 1; }
    cd ..
    
  elif [ "$1" == "netlify" ]; then
    print_step "Deploying frontend to Netlify..."
    cd firepre || exit 1
    npx netlify deploy --prod || { print_error "Netlify deployment failed"; exit 1; }
    cd ..
    
  elif [ "$1" == "heroku" ]; then
    print_step "Deploying backend to Heroku..."
    cd backend || exit 1
    git push heroku main || { print_error "Heroku deployment failed"; exit 1; }
    cd ..
    
  elif [ "$1" == "render" ]; then
    print_step "Deploying backend to Render..."
    echo "For Render deployment, connect your GitHub repository to Render.com"
    echo "See docs/DEPLOYMENT.md for detailed instructions"
    
  elif [ "$1" == "firebase" ]; then
    print_step "Deploying frontend to Firebase..."
    cd firepre || exit 1
    npx firebase deploy || { print_error "Firebase deployment failed"; exit 1; }
    cd ..
    
  else
    print_error "Unknown deployment target. Use vercel, netlify, heroku, render, or firebase"
    exit 1
  fi
  
  print_step "Deployment complete ✓"
}

# Main function
main() {
  if [ $# -eq 0 ]; then
    print_error "Please specify a deployment target: vercel, netlify, heroku, render, or firebase"
    exit 1
  fi
  
  check_requirements
  build_frontend
  build_backend
  run_tests
  deploy "$1"
  
  print_section "Deployment Success"
  echo -e "EmberEye has been deployed successfully using $1!"
}

# Execute main function with all arguments
main "$@"
