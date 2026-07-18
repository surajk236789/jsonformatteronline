"use client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/Button";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    setError("");
    try {
      if (!input.trim()) {
        setOutput("");
        return;
      }
      
      const lines = input.split(/\r?\n/).filter(line => line.trim() !== "");
      if (lines.length < 1) throw new Error("CSV is empty");

      // Basic split by comma (doesn't handle commas inside quotes perfectly, but good for basic use cases)
      const headers = lines[0].split(",").map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          let val = currentline[j] ? currentline[j].trim() : "";
          // Remove quotes if present
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1).replace(/""/g, '"');
          }
          obj[headers[j]] = val;
        }
        result.push(obj);
      }
      
      setOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError(err.message || "Invalid CSV format");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setInput(text);
        // Automatically convert on upload
      }
    };
    reader.readAsText(file);
    // Reset file input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadJSON = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          📥
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">CSV to JSON Converter</h2>
          <p className="text-sm text-secondary">Convert CSV files to JSON array format instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Input CSV</label>
            <div>
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="hidden" 
                ref={fileInputRef} 
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                + Import CSV File
              </Button>
            </div>
          </div>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`name,age\nJohn,30\nDoe,25`}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Output JSON</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
            placeholder={`[\n  {\n    "name": "John",\n    "age": "30"\n  }\n]`}
          />
        </div>
      </div>
      
      {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

      <div className="mt-6 flex gap-3 flex-wrap">
        <Button onClick={convert} variant="primary">
          Convert to JSON
        </Button>
        <Button onClick={() => { setInput(""); setOutput(""); setError(""); }} variant="secondary">
          Clear
        </Button>
        <Button 
          onClick={downloadJSON} 
          disabled={!output}
          
        >
          Download JSON
        </Button>
      </div>
    </div>
  );
}
