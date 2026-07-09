"use client";
import React, { useState } from "react";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        throw new Error("JSON must be an array of objects.");
      }
      if (data.length === 0) {
        setOutput("");
        return;
      }

      const headers = Array.from(new Set(data.flatMap(Object.keys)));
      const csvRows = [];
      csvRows.push(headers.join(","));

      for (const row of data) {
        const values = headers.map((header) => {
          const val = row[header];
          if (val === null || val === undefined) return "";
          const str = String(val);
          if (str.includes(",") || str.includes("\n") || str.includes('"')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        });
        csvRows.push(values.join(","));
      }

      setOutput(csvRows.join("\n"));
    } catch (err: any) {
      setError(err.message || "Invalid JSON array");
    }
  };

  const downloadCSV = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          📊
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            JSON to CSV Converter
          </h2>
          <p className="text-sm text-secondary">
            Convert JSON arrays to CSV format instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Input JSON Array
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'[{"name": "John"}, {"name": "Doe"}]'}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Output CSV
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
            placeholder={`name\nJohn\nDoe`}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={convert}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
        >
          Convert to CSV
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary font-semibold rounded-xl transition-colors"
        >
          Clear
        </button>
        <button
          onClick={downloadCSV}
          disabled={!output}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
