const fs = require('fs');
const path = require('path');

function walk(dir, fn) {
  fs.readdirSync(dir).forEach(f => {
    let d = path.join(dir, f);
    if (fs.statSync(d).isDirectory()) walk(d, fn);
    else fn(d);
  });
}

walk('./app', file => {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/import (\w+) from ['"](\.\.?\/)+(components\/[^'"]+)['"]/g, 'import $1 from "@/app/$3"');
  // Also handle dynamic imports
  newContent = newContent.replace(/import\(['"](\.\.?\/)+(components\/[^'"]+)['"]\)/g, 'import("@/app/$2")');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated', file);
  }
});
