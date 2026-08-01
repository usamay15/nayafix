const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace transify.me (URLs)
  content = content.replace(/transify\.me/gi, 'nayafix.me');
  
  // Replace Transify (Brand Name)
  content = content.replace(/Transify\.me/g, 'NayaFix');
  content = content.replace(/Transify/g, 'NayaFix');
  
  // Replace transify (variables, localstorage keys)
  content = content.replace(/transify/g, 'nayafix');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git', 'favicon_io'].includes(file)) walk(fullPath);
    } else {
      if (/\.(tsx|ts|js|mjs|md|json|css|txt)$/.test(file)) replaceInFile(fullPath);
    }
  }
}

walk('d:\\Roman Urdu To Urdu\\frontend');
walk('d:\\Roman Urdu To Urdu\\backend');
