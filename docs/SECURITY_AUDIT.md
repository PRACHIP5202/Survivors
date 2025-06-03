# Security Audit Process

This document outlines the security audit process for the EmberEye project to ensure that dependencies are regularly checked for vulnerabilities.

## Overview

The EmberEye project includes both JavaScript (npm) and Python dependencies, all of which need to be regularly audited for security vulnerabilities. We've implemented an automated process to simplify this.

## Audit Commands

Run any of these commands from the project root:

```bash
# Audit both frontend and backend
npm run audit

# Audit only frontend dependencies
npm run audit:frontend

# Audit only backend dependencies
npm run audit:backend
```

## Frontend Security Audit

The frontend audit uses npm's built-in auditing tool:

```bash
npm audit --audit-level high
```

This checks all npm dependencies against the Node.js Security Working Group's vulnerability database and reports issues with high severity or above.

## Backend Security Audit

The backend audit uses pip-audit, which checks Python dependencies against the Python Vulnerability Database:

```bash
pip-audit -r requirements.txt
```

## CI/CD Integration

Security audits are integrated into our CI/CD pipeline:

1. The GitHub Actions workflow runs `npm run audit` on every push and pull request
2. The `validate.sh` script includes security checks
3. The audit results are reported in the CI output

## Setup Requirements

To run security audits locally, you need:

1. For frontend: npm (included with Node.js)
2. For backend: pip-audit (`pip install pip-audit`)

## Addressing Vulnerabilities

When vulnerabilities are found:

1. **High Severity**: Address immediately by updating the affected package
2. **Medium Severity**: Schedule for the next release cycle
3. **Low Severity**: Document and monitor

## Automated Audits

The `security-audit.sh` script automatically:

1. Checks if required tools are installed
2. Runs npm audit for frontend dependencies
3. Runs pip-audit for backend dependencies
4. Reports any issues found

## Regular Audit Schedule

We recommend running security audits:

- Before each release
- Monthly for production applications
- Any time dependencies are updated
