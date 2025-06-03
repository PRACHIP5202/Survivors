#!/bin/bash
# Pre-build script to fix CSS issues before building the project
# This script should be run as part of the build process

echo "🔍 Running CSS syntax check and auto-fix..."

# Navigate to the frontend directory
cd "$(dirname "$0")/.."

# Install stylelint if not already installed
if ! [ -x "$(command -v npx stylelint)" ]; then
  echo "Installing stylelint..."
  npm install --no-save stylelint stylelint-config-standard
fi

# Create more permissive stylelint config for production builds
cat > .stylelintrc.prod.json << 'EOL'
{
  "extends": "stylelint-config-standard",
  "rules": {
    "no-duplicate-selectors": null,
    "no-empty-source": true,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": null,
    "selector-type-no-unknown": true,
    "no-descending-specificity": null,
    "keyframes-name-pattern": null,
    "media-feature-name-value-no-unknown": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "at-rule-no-unknown": null
  }
}
EOL

# Run Node.js fix-css script if it exists
if [ -f "scripts/fix-css.js" ]; then
  echo "Running CSS fix script..."
  node scripts/fix-css.js
fi

# Run stylelint with auto-fix using the production config
echo "Running stylelint with auto-fix..."
npx stylelint "src/**/*.css" --fix --config .stylelintrc.prod.json

# Check if there are any unfixable errors
RESULT=$(npx stylelint "src/**/*.css" --config .stylelintrc.prod.json --formatter=json)
ERROR_COUNT=$(echo "$RESULT" | grep -o '"severity":"error"' | wc -l)

if [ "$ERROR_COUNT" -gt 0 ]; then
  echo "⚠️ Warning: $ERROR_COUNT CSS errors remain after auto-fix."
  echo "   The build will continue, but the CSS may not be optimized correctly."
else
  echo "✅ CSS syntax check passed with no errors!"
fi

# Clean up temporary config file
rm .stylelintrc.prod.json

echo "CSS pre-build checks complete."
exit 0
