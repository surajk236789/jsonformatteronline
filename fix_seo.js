const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'app', '(tools)', 'tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '[slug]' && dirent.name !== 'cron-parser')
  .map(dirent => dirent.name);

dirs.forEach(dir => {
  const pagePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  const hasFaqs = content.includes('const faqs =');
  
  if (!hasFaqs && content.includes('"@type": "FAQPage"')) {
    content = content.replace(/,\s*\{\s*"@type":\s*"FAQPage"[\s\S]*?\}\s*\]/, '\n    ]');
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`Fixed ${dir} (removed FAQPage)`);
  }
});
