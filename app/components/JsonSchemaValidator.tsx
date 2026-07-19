"use client";
import React, { useState, ChangeEvent, useCallback } from "react";
import { Button } from "./ui/Button";

type ValidationResult = {
  valid: boolean;
  message: string;
};

const SAMPLE_DATA = `{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "active": true
}`;

const SAMPLE_SCHEMA = `{
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "active": { "type": "boolean" }
  }
}`;

export default function JsonSchemaValidator() {
  const [dataInput, setDataInput] = useState<string>("");
  const [schemaInput, setSchemaInput] = useState<string>("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const validate = useCallback(() => {
    if (!dataInput.trim() || !schemaInput.trim()) {
      setResult({ valid: false, message: "Please provide both JSON Data and JSON Schema." });
      return;
    }
    
    try {
      const data = JSON.parse(dataInput);
      const schema = JSON.parse(schemaInput);

      // Basic recursive schema validation
      const checkNode = (d: unknown, s: any, path: string): string[] => {
        const errors: string[] = [];

        if (s.type) {
          const typeMap: Record<string, string> = {
            string: "string",
            number: "number",
            integer: "number",
            boolean: "boolean",
            object: "object",
            array: "object", // typeof [] is 'object'
          };
          if (s.type === "integer" && typeof d === "number" && !Number.isInteger(d)) {
            errors.push(`${path} should be an integer`);
          } else if (s.type === "array" && !Array.isArray(d)) {
            errors.push(`${path} should be an array`);
          } else if (
            s.type !== "array" &&
            typeof d !== typeMap[s.type] &&
            d !== null
          ) {
            errors.push(`${path} should be ${s.type}`);
          }
        }

        if (s.type === "object" && d !== null && typeof d === "object" && !Array.isArray(d)) {
          const obj = d as Record<string, unknown>;
          if (s.required && Array.isArray(s.required)) {
            s.required.forEach((req: string) => {
              if (!(req in obj)) errors.push(`${path} is missing required property: ${req}`);
            });
          }
          if (s.properties) {
            Object.keys(s.properties).forEach((key) => {
              if (key in obj) {
                errors.push(...checkNode(obj[key], s.properties[key], `${path}.${key}`));
              }
            });
          }
        }

        if (s.type === "array" && Array.isArray(d) && s.items) {
          d.forEach((item, index) => {
            errors.push(...checkNode(item, s.items, `${path}[${index}]`));
          });
        }

        return errors;
      };

      const errors = checkNode(data, schema, "root");

      if (errors.length > 0) {
        setResult({ valid: false, message: errors.join("\n") });
      } else {
        setResult({ valid: true, message: "JSON is valid against the schema!" });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setResult({ valid: false, message: "Parse Error: " + errorMessage });
    }
  }, [dataInput, schemaInput]);

  const loadSample = useCallback(() => {
    setDataInput(SAMPLE_DATA);
    setSchemaInput(SAMPLE_SCHEMA);
    setResult(null);
  }, []);

  const handleClear = useCallback(() => {
    setDataInput("");
    setSchemaInput("");
    setResult(null);
  }, []);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
            {"JSON Schema Validator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Validate JSON against a basic JSON Schema entirely in your browser."}
          </p>
        </div>
        <Button
          onClick={loadSample}
          variant="secondary"
        >
          {"Paste Sample Data"}
        </Button>
      </div>

      {/* Dual pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Data Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"JSON Data"}</span>
            <span className="text-[10px] text-slate-400 normal-case">
              {dataInput.length} chars
            </span>
          </label>
          <textarea
            className="w-full h-80 md:h-[420px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder={'{\n  "name": "John"\n}'}
            value={dataInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDataInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Input Schema Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"JSON Schema"}</span>
            <span className="text-[10px] text-slate-400 normal-case">
              {schemaInput.length} chars
            </span>
          </label>
          <textarea
            className="w-full h-80 md:h-[420px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder={'{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" }\n  },\n  "required": ["name"]\n}'}
            value={schemaInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSchemaInput(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Result Panel */}
      {result && (
        <div className={`mt-6 p-4 rounded-xl shadow-inner border ${result.valid ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/30'}`}>
          <div className="flex items-center gap-2 mb-2">
            {result.valid ? (
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <h3 className={`font-bold ${result.valid ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
              {result.valid ? "Validation Successful" : "Validation Failed"}
            </h3>
          </div>
          <pre className={`font-mono text-sm whitespace-pre-wrap mt-2 p-3 rounded-lg ${result.valid ? 'bg-emerald-100/50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100/50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400'}`}>
            {result.message}
          </pre>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-panel-border/50">
        <Button
          onClick={handleClear}
          variant="secondary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {"Clear"}
        </Button>

        <button
          onClick={validate}
          className="glow-button px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {"Validate JSON"}
        </button>
      </div>
    </div>
  );
}
