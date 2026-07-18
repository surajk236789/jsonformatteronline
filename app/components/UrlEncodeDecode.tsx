"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

export default function UrlEncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    setError("");
    try {
      setOutput(encodeURIComponent(input));
    } catch (err: any) {
      setError(err.message || "Failed to encode URL");
    }
  };

  const decode = () => {
    setError("");
    try {
      setOutput(decodeURIComponent(input));
    } catch (err: any) {
      setError("Invalid URL encoding");
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🔗
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">URL Encode & Decode</h2>
          <p className="text-sm text-secondary">Encode or decode URL components easily.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Input String</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/?q=hello world"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Output Result</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
          />
        </div>
      </div>
      
      {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

      <div className="mt-6 flex gap-3">
        <Button onClick={encode} variant="primary">
          Encode URL
        </Button>
        <Button onClick={decode} variant="primary">
          Decode URL
        </Button>
        <Button onClick={() => { setInput(""); setOutput(""); setError(""); }} variant="secondary">
          Clear
        </Button>
      </div>
    </div>
  );
}
