#!/bin/bash
# Script to check and prepare the project for deployment

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== EmberEye Deployment Preparation =====${NC}"

# Check for required files
echo -e "\n${YELLOW}Checking for required files:${NC}"

REQUIRED_FILES=(
  "backend/requirements.txt"
  "firepre/package.json"
  "firepre/vite.config.js"
  "backend/main.py"
)

all_files_found=true
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓ $file found${NC}"
  else
    echo -e "${RED}✗ $file not found${NC}"
    all_files_found=false
  fi
done

if [ "$all_files_found" = false ]; then
  echo -e "${RED}Error: Some required files are missing. Can't proceed.${NC}"
  exit 1
fi

# Check for environment examples
echo -e "\n${YELLOW}Checking environment files:${NC}"
if [ -f "backend/.env.example" ]; then
  echo -e "${GREEN}✓ Backend .env.example found${NC}"
else
  echo -e "${RED}✗ Backend .env.example not found${NC}"
fi

if [ -f "firepre/.env.example" ]; then
  echo -e "${GREEN}✓ Frontend .env.example found${NC}"
else
  echo -e "${RED}✗ Frontend .env.example not found${NC}"
fi

# Check if all tests pass
echo -e "\n${YELLOW}Running tests:${NC}"
echo "Running frontend tests..."
cd firepre && npm test > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Frontend tests passed${NC}"
else
  echo -e "${RED}✗ Frontend tests failed${NC}"
  echo "Run 'npm run test:frontend' to see the errors"
fi

cd ..
echo "Running backend tests..."
cd backend && python3 -m pytest > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Backend tests passed${NC}"
else
  echo -e "${RED}✗ Backend tests failed${NC}"
  echo "Run 'npm run test:backend' to see the errors"
fi
cd ..

# Check if frontend builds successfully
echo -e "\n${YELLOW}Checking if frontend builds successfully:${NC}"
cd firepre && npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Frontend builds successfully${NC}"
else
  echo -e "${RED}✗ Frontend build failed${NC}"
  echo "Run 'npm run build:frontend' to see the errors"
fi
cd ..

echo -e "\n${YELLOW}Deployment preparation summary:${NC}"
echo -e "1. Run 'npm run validate' for final validation"
echo -e "2. Create production environment files:"
echo -e "   - cp firepre/.env.example firepre/.env.production"
echo -e "   - cp backend/.env.example backend/.env.production"
echo -e "3. Edit the environment files with your production values"
echo -e "4. Choose your deployment target:"
echo -e "   - npm run deploy:vercel  (for Vercel deployment)"
echo -e "   - npm run deploy:netlify (for Netlify deployment)"
echo -e "   - npm run deploy:heroku  (for Heroku deployment)"
echo -e "   - npm run deploy:render  (for Render deployment)"
echo -e "   - npm run deploy:firebase (for Firebase deployment)"

echo -e "\n${GREEN}Deployment preparation completed!${NC}"
