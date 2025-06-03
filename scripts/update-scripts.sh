#!/bin/bash
# Update the root package.json to include new build scripts

ROOT_PACKAGE_JSON="/Users/aditya/Documents/Survivors/package.json"

# Check if the root package.json exists
if [ ! -f "$ROOT_PACKAGE_JSON" ]; then
  echo "Root package.json not found at $ROOT_PACKAGE_JSON"
  exit 1
fi

# Create a temporary file
TMP_FILE=$(mktemp)

# Process the package.json file
jq '.scripts["build:robust"] = "cd firepre && npm run build:robust"' "$ROOT_PACKAGE_JSON" > "$TMP_FILE"
mv "$TMP_FILE" "$ROOT_PACKAGE_JSON"

echo "Updated root package.json with new build scripts"
cat "$ROOT_PACKAGE_JSON" | grep build:robust

# Add this script to the update.sh workflow if exists
UPDATE_SCRIPT="/Users/aditya/Documents/Survivors/scripts/update.sh"
if [ -f "$UPDATE_SCRIPT" ]; then
  # Check if script already includes our update
  if ! grep -q "update-scripts.sh" "$UPDATE_SCRIPT"; then
    echo "Adding script update to the workflow in $UPDATE_SCRIPT"
    echo -e "\n# Update build scripts\nscripts/update-scripts.sh" >> "$UPDATE_SCRIPT"
  fi
fi

echo "✅ Done!"
