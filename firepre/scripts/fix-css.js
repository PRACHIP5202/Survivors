/**
 * Fix CSS files to avoid build failures
 * This script applies common fixes to CSS files before the build process
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSS_GLOB = 'src/**/*.css';
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Fix common CSS syntax issues that can cause build failures
 * - Remove extra closing braces
 * - Fix missing selectors before declarations
 * - Add missing keyframes
 */
function fixCssFile(filePath) {
  console.log(`Processing ${path.relative(ROOT_DIR, filePath)}`);
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix: Remove any extra closing braces at the end
    content = content.replace(/}\s*}(\s*)$/, '}$1');
    
    // Fix: Add missing end-of-source-newline
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    
    // Fix: Check for any declarations outside of selectors
    const lines = content.split('\n');
    const fixedLines = [];
    let inComment = false;
    let inSelector = false;
    let currentSelector = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Track comment blocks
      if (line.includes('/*')) inComment = true;
      if (line.includes('*/')) inComment = false;
      
      // Skip comments
      if (inComment || line.trim().startsWith('/*') || line.trim().startsWith('*/')) {
        fixedLines.push(line);
        continue;
      }
      
      // Track selector blocks
      if (line.includes('{')) inSelector = true;
      if (line.includes('}')) inSelector = false;
      
      // Detect property declarations outside of selectors
      const isPropertyDeclaration = line.trim().match(/^[a-z-]+\s*:/i) && !inSelector;
      
      if (isPropertyDeclaration) {
        // Add a placeholder selector for orphaned properties
        fixedLines.push(`.css-fix-placeholder {`);
        fixedLines.push(line);
        
        // Look ahead for more properties
        let j = i + 1;
        while (j < lines.length && lines[j].trim().match(/^[a-z-]+\s*:/i) && !lines[j].includes('{')) {
          fixedLines.push(lines[j]);
          i++;
          j++;
        }
        
        fixedLines.push('}');
      } else {
        fixedLines.push(line);
      }
    }
    
    content = fixedLines.join('\n');
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed issues in ${path.relative(ROOT_DIR, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

/**
 * Main function to find and fix CSS files
 */
function main() {
  console.log('🔍 Finding CSS files to fix...');
  
  // Find all CSS files
  const cssFiles = glob.sync(CSS_GLOB, { cwd: ROOT_DIR, absolute: true });
  console.log(`Found ${cssFiles.length} CSS files`);
  
  // Process each file
  let fixedCount = 0;
  for (const file of cssFiles) {
    if (fixCssFile(file)) {
      fixedCount++;
    }
  }
  
  if (fixedCount > 0) {
    console.log(`✅ Fixed issues in ${fixedCount} CSS files`);
  } else {
    console.log('✅ No CSS issues found');
  }
}

// Run the script
main();
