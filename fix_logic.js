const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'app', 'components');

const fixPlaceholders = (filename, replacements) => {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;
  
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.replace(from, to);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed ${filename}`);
  }
};

fixPlaceholders('JsonToCsv.tsx', [
  ['if (str.includes(",") || str.includes("\\\\n") || str.includes(\'"\')) {', 'if (str.includes(",") || str.includes("\\n") || str.includes(\'"\')) {'],
  ['setOutput(csvRows.join("\\\\n"));', 'setOutput(csvRows.join("\\n"));']
]);

fixPlaceholders('CsvToJson.tsx', [
  ['const lines = input.split(/\\\\r?\\\\n/).filter(line => line.trim() !== "");', 'const lines = input.split(/\\r?\\n/).filter(line => line.trim() !== "");']
]);
