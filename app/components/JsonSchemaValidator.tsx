"use client";
import React, { useState } from "react";

export default function JsonSchemaValidator() {
  const [dataInput, setDataInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const [result, setResult] = useState<{valid: boolean, message: string} | null>(null);

  const validate = () => {
    try {
      const data = JSON.parse(dataInput);
      const schema = JSON.parse(schemaInput);
      
      // Basic recursive schema validation
      const checkNode = (d: any, s: any, path: string): string[] => {
        const errors: string[] = [];
        
        if (s.type) {
          const typeMap: any = {
            string: "string",
            number: "number",
            boolean: "boolean",
            object: "object",
            array: "object" // typeof [] is 'object'
          };
          if (s.type === 'array' && !Array.isArray(d)) {
            errors.push(\`\${path} should be an array\`);
          } else if (s.type !== 'array' && typeof d !== typeMap[s.type] && d !== null) {
            errors.push(\`\${path} should be \${s.type}\`);
          }
        }
        
        if (s.type === 'object' && d !== null && !Array.isArray(d)) {
          if (s.required && Array.isArray(s.required)) {
            s.required.forEach((req: string) => {
              if (!(req in d)) errors.push(\`\${path} is missing required property: \${req}\`);
            });
          }
          if (s.properties) {
            Object.keys(s.properties).forEach(key => {
              if (key in d) {
                errors.push(...checkNode(d[key], s.properties[key], \`\${path}.\${key}\`));
              }
            });
          }
        }
        
        if (s.type === 'array' && Array.isArray(d) && s.items) {
          d.forEach((item, index) => {
            errors.push(...checkNode(item, s.items, \`\${path}[\${index}]\`));
          });
        }
        
        return errors;
      };

      const errors = checkNode(data, schema, 'root');
      
      if (errors.length > 0) {
        setResult({ valid: false, message: errors.join("\\n") });
      } else {
        setResult({ valid: true, message: "JSON is valid against the schema!" });
      }
    } catch (err: any) {
      setResult({ valid: false, message: "Parse Error: " + err.message });
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          ✅
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">JSON Schema Validator</h2>
          <p className="text-sm text-secondary">Validate JSON against a basic JSON Schema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">JSON Data</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            placeholder={`{\\n  "name": "John"\\n}`}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">JSON Schema</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder={`{\\n  "type": "object",\\n  "properties": {\\n    "name": { "type": "string" }\\n  },\\n  "required": ["name"]\\n}`}
          />
        </div>
      </div>
      
      {result && (
        <div className={\`mt-4 p-4 rounded-xl text-sm whitespace-pre-wrap \${result.valid ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}\`}>
          <div className="font-bold mb-1">{result.valid ? '✅ Success' : '❌ Validation Errors'}</div>
          {result.message}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button onClick={validate} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
          Validate JSON
        </button>
        <button onClick={() => { setDataInput(""); setSchemaInput(""); setResult(null); }} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary font-semibold rounded-xl transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
