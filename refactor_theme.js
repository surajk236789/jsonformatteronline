const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app', 'components');
const pageFile = path.join(__dirname, 'app', 'page.tsx');

const replacements = [
  { search: /bg-white dark:bg-slate-900/g, replace: 'bg-panel' },
  { search: /bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50/g, replace: 'bg-background text-primary' },
  { search: /bg-slate-50 dark:bg-slate-950/g, replace: 'bg-background' },
  { search: /text-slate-900 dark:text-slate-50/g, replace: 'text-primary' },
  { search: /text-slate-900 dark:text-slate-100/g, replace: 'text-primary' },
  { search: /text-slate-800 dark:text-slate-100/g, replace: 'text-primary' },
  { search: /text-slate-800 dark:text-slate-200/g, replace: 'text-primary' },
  { search: /text-slate-700 dark:text-slate-200/g, replace: 'text-primary' },
  { search: /text-slate-700 dark:text-slate-300/g, replace: 'text-primary' },
  { search: /text-slate-600 dark:text-slate-300/g, replace: 'text-secondary' },
  { search: /text-slate-500 dark:text-slate-400/g, replace: 'text-secondary' },
  { search: /text-slate-400 dark:text-slate-500/g, replace: 'text-secondary' },
  { search: /text-slate-400 dark:text-slate-600/g, replace: 'text-secondary' },
  { search: /border-slate-200\/60 dark:border-slate-800\/60/g, replace: 'border-panel-border' },
  { search: /border-slate-200\/50 dark:border-slate-800\/40/g, replace: 'border-panel-border' },
  { search: /border-slate-200\/50 dark:border-slate-800\/60/g, replace: 'border-panel-border' },
  { search: /border-slate-200 dark:border-slate-800/g, replace: 'border-panel-border' },
  { search: /border-slate-200 dark:border-slate-700/g, replace: 'border-panel-border' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

// Process components
const files = fs.readdirSync(componentsDir);
files.forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(componentsDir, file));
  }
});

// Process page.tsx
processFile(pageFile);

console.log("Refactoring complete.");
