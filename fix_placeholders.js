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
  ['placeholder={"name\\\\nJohn\\\\nDoe"}', 'placeholder={`name\\nJohn\\nDoe`}' ]
]);

fixPlaceholders('CsvToJson.tsx', [
  ['placeholder={"name,age\\\\nJohn,30\\\\nDoe,25"}', 'placeholder={`name,age\\nJohn,30\\nDoe,25`}' ],
  ['placeholder={"[\\\\n  {\\\\n    \\"name\\": \\"John\\",\\\\n    \\"age\\": \\"30\\"\\\\n  }\\\\n]"}', 'placeholder={`[\\n  {\\n    "name": "John",\\n    "age": "30"\\n  }\\n]`}' ]
]);

fixPlaceholders('JsonSchemaValidator.tsx', [
  ['placeholder={"{\\\\n  \\"name\\": \\"John\\"\\\\n}"}', 'placeholder={`{\\n  "name": "John"\\n}`}' ],
  ['placeholder={"{\\\\n  \\"type\\": \\"object\\",\\\\n  \\"properties\\": {\\\\n    \\"name\\": { \\"type\\": \\"string\\" }\\\\n  },\\\\n  \\"required\\": [\\"name\\"]\\\\n}"}', 'placeholder={`{\\n  "type": "object",\\n  "properties": {\\n    "name": { "type": "string" }\\n  },\\n  "required": ["name"]\\n}`}' ]
]);

fixPlaceholders('HtmlToJsx.tsx', [
  ['placeholder={"<div class=\\"container\\">\\\\n  <img src=\\"logo.png\\">\\\\n  <label for=\\"name\\">Name</label>\\\\n  <input type=\\"text\\" id=\\"name\\">\\\\n</div>"}', 'placeholder={`<div class="container">\\n  <img src="logo.png">\\n  <label for="name">Name</label>\\n  <input type="text" id="name">\\n</div>`}' ]
]);

fixPlaceholders('CssMinifier.tsx', [
  ['placeholder={"body {\\\\n  color: red;\\\\n  margin: 0;\\\\n}"}', 'placeholder={`body {\\n  color: red;\\n  margin: 0;\\n}`}' ]
]);
