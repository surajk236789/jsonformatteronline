const fs = require('fs');
const path = require('path');

const tools = [
  {
    name: 'JsonToCsv',
    route: 'json-to-csv',
    title: 'JSON to CSV Converter',
    desc: 'Convert JSON arrays to CSV format instantly.',
    emoji: '📊'
  },
  {
    name: 'CsvToJson',
    route: 'csv-to-json',
    title: 'CSV to JSON Converter',
    desc: 'Convert CSV files to JSON array format instantly.',
    emoji: '📥'
  },
  {
    name: 'JsonSchemaValidator',
    route: 'json-schema-validator',
    title: 'JSON Schema Validator',
    desc: 'Validate JSON against a JSON Schema.',
    emoji: '✅'
  },
  {
    name: 'CssMinifier',
    route: 'css-minifier',
    title: 'CSS Minifier',
    desc: 'Minify CSS code and reduce file size.',
    emoji: '💨'
  },
  {
    name: 'CssGradientGenerator',
    route: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    desc: 'Generate CSS linear and radial gradients.',
    emoji: '🌈'
  },
  {
    name: 'HtmlToJsx',
    route: 'html-to-jsx',
    title: 'HTML to JSX Converter',
    desc: 'Convert standard HTML to React JSX syntax.',
    emoji: '⚛️'
  },
  {
    name: 'HtmlEntityEncoder',
    route: 'html-entity-encoder',
    title: 'HTML Entity Encoder / Decoder',
    desc: 'Encode or decode HTML entities safely.',
    emoji: '🔠'
  },
  {
    name: 'Base64EncodeDecode',
    route: 'base64-encode-decode',
    title: 'Base64 Encode & Decode',
    desc: 'Encode to or decode from Base64 string formats.',
    emoji: '🔐'
  },
  {
    name: 'UrlEncodeDecode',
    route: 'url-encode-decode',
    title: 'URL Encode & Decode',
    desc: 'Encode or decode URL components easily.',
    emoji: '🔗'
  },
  {
    name: 'HashGenerator',
    route: 'hash-generator',
    title: 'Hash Generator',
    desc: 'Generate MD5, SHA-1, SHA-256 hashes online.',
    emoji: '#️⃣'
  },
  {
    name: 'CronParser',
    route: 'cron-parser',
    title: 'Cron Expression Parser',
    desc: 'Parse and explain crontab expressions.',
    emoji: '⏰'
  },
  {
    name: 'PasswordGenerator',
    route: 'password-generator',
    title: 'Secure Password Generator',
    desc: 'Generate strong, random passwords securely.',
    emoji: '🔑'
  },
  {
    name: 'GitCommandGenerator',
    route: 'git-command-generator',
    title: 'Git Command Generator',
    desc: 'Generate common git commands easily.',
    emoji: '🐙'
  },
  {
    name: 'HttpStatusCodes',
    route: 'http-status-codes',
    title: 'HTTP Status Codes',
    desc: 'Lookup reference for HTTP status codes.',
    emoji: '🌐'
  }
];

const componentsDir = path.join(__dirname, 'app', 'components');
const toolsDir = path.join(__dirname, 'app', 'tools');

if (!fs.existsSync(toolsDir)) {
  fs.mkdirSync(toolsDir, { recursive: true });
}

tools.forEach(tool => {
  const compPath = path.join(componentsDir, `${tool.name}.tsx`);
  const compContent = `"use client";\nimport React, { useState } from "react";\n\nexport default function ${tool.name}() {\n  return (\n    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 p-6">\n      <div className="flex items-center gap-3 mb-6">\n        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">\n          ${tool.emoji}\n        </div>\n        <div>\n          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">${tool.title}</h2>\n          <p className="text-sm text-slate-500 dark:text-slate-400">${tool.desc}</p>\n        </div>\n      </div>\n      <div className="text-center py-12 text-slate-500">\n        This tool is under construction. Functionality will be added soon.\n      </div>\n    </div>\n  );\n}\n`;

  if (!fs.existsSync(compPath)) {
    fs.writeFileSync(compPath, compContent);
    console.log(`Created component: ${tool.name}.tsx`);
  }

  const routeDir = path.join(toolsDir, tool.route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const pagePath = path.join(routeDir, 'page.tsx');
  const pageContent = `import React from "react";\nimport type { Metadata } from "next";\nimport MainLayout from "../../components/MainLayout";\nimport ${tool.name} from "../../components/${tool.name}";\n\nexport const metadata: Metadata = {\n  title: "${tool.title} | Developer Tools",\n  description: "${tool.desc}",\n  alternates: { canonical: "https://www.allformatter.com/tools/${tool.route}" },\n};\n\nexport default function ${tool.name}Page() {\n  return (\n    <MainLayout>\n      <${tool.name} />\n    </MainLayout>\n  );\n}\n`;

  if (!fs.existsSync(pagePath)) {
    fs.writeFileSync(pagePath, pageContent);
    console.log(`Created page: tools/${tool.route}/page.tsx`);
  }
});
