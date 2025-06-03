#!/bin/bash
# CI-specific security audit script that ensures all tools are installed
# Use this in CI environments where pip-audit might not be available

set -e  # Exit on error

echo "🔒 EmberEye CI Security Audit"
echo "============================="

# Install required tools
echo "Installing security audit tools..."
pip install pip-audit

# Run the regular security audit script
./scripts/security-audit.sh
