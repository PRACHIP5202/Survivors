// Environment variables checker for production deployment
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

console.log(`${colors.blue}Checking environment variables for production...${colors.reset}\n`);

// Frontend required variables
const frontendRequiredVars = [
  'VITE_API_BASE_URL',
  'VITE_WEATHER_API_KEY',
];

// Backend required variables
const backendRequiredVars = [
  'WEATHER_API_KEY',
  'CORS_ORIGINS',
  'DEBUG',
];

// Check frontend .env.production
const frontendEnvPath = path.join(__dirname, '../firepre/.env.production');
let frontendEnvExists = false;
let frontendMissingVars = [];

try {
  const frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
  frontendEnvExists = true;
  console.log(`${colors.green}✓ Frontend .env.production exists${colors.reset}`);
  
  // Check for required variables
  frontendRequiredVars.forEach(variable => {
    if (!frontendEnv.includes(`${variable}=`)) {
      frontendMissingVars.push(variable);
    }
  });
} catch (err) {
  console.log(`${colors.red}✗ Frontend .env.production not found${colors.reset}`);
  console.log(`${colors.yellow}  Create it by copying .env.example:${colors.reset}`);
  console.log(`  cp firepre/.env.example firepre/.env.production`);
}

// Check backend .env
const backendEnvPath = path.join(__dirname, '../backend/.env');
let backendEnvExists = false;
let backendMissingVars = [];

try {
  const backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
  backendEnvExists = true;
  console.log(`${colors.green}✓ Backend .env exists${colors.reset}`);
  
  // Check for required variables
  backendRequiredVars.forEach(variable => {
    if (!backendEnv.includes(`${variable}=`)) {
      backendMissingVars.push(variable);
    }
  });
  
  // Check DEBUG setting
  if (backendEnv.includes('DEBUG=True')) {
    console.log(`${colors.yellow}⚠ Warning: DEBUG is set to True in backend .env${colors.reset}`);
    console.log(`  Set DEBUG=False for production environments`);
  }
} catch (err) {
  console.log(`${colors.red}✗ Backend .env not found${colors.reset}`);
  console.log(`${colors.yellow}  Create it by copying .env.example:${colors.reset}`);
  console.log(`  cp backend/.env.example backend/.env`);
}

// Report missing variables
if (frontendEnvExists && frontendMissingVars.length > 0) {
  console.log(`\n${colors.red}✗ Missing required frontend variables:${colors.reset}`);
  frontendMissingVars.forEach(variable => {
    console.log(`  - ${variable}`);
  });
}

if (backendEnvExists && backendMissingVars.length > 0) {
  console.log(`\n${colors.red}✗ Missing required backend variables:${colors.reset}`);
  backendMissingVars.forEach(variable => {
    console.log(`  - ${variable}`);
  });
}

// Success message if everything is good
if (frontendEnvExists && backendEnvExists && 
    frontendMissingVars.length === 0 && 
    backendMissingVars.length === 0) {
  console.log(`\n${colors.green}✓ All required environment variables are configured${colors.reset}`);
  console.log(`  You're ready for production deployment!`);
} else {
  console.log(`\n${colors.yellow}⚠ Please fix the issues above before deploying to production${colors.reset}`);
  process.exit(1);
}
