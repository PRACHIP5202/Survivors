#!/bin/bash
# Security audit script for EmberEye project
# Checks both frontend and backend dependencies for vulnerabilities

set -e  # Exit on error

echo "🔒 EmberEye Security Audit"
echo "============================"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# ===== Frontend Audit =====
echo -e "\n🔍 Checking frontend dependencies..."
cd "$(dirname "$0")/../firepre"

echo "Running npm audit..."
npm audit --audit-level high || echo "⚠️ High severity vulnerabilities found in npm packages"

# ===== Backend Audit =====
echo -e "\n🔍 Checking backend dependencies..."
cd "../backend"

# Check if pip-audit is installed, install if missing
if ! command_exists pip-audit; then
  echo "Installing pip-audit..."
  pip install pip-audit
fi

# Run pip-audit on requirements.txt
echo "Running pip-audit..."
pip-audit -r requirements.txt || echo "⚠️ Vulnerabilities found in Python packages"

echo -e "\n✅ Security audit complete"
