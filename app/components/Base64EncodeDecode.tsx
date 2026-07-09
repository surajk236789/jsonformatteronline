"use client";
import React, { useState } from "react";

export default function Base64EncodeDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    setError("");
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch (err: any) {
      setError(err.message || "Failed to encode string");
    }
  };

  const decode = () => {
    setError("");
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch (err: any) {
      setError("Invalid Base64 string");
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🔐
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">Base64 Encode & Decode</h2>
          <p className="text-sm text-secondary">Encode to or decode from Base64 string formats.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Input</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text to encode, or Base64 to decode..."
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Output</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
          />
        </div>
      </div>
      
      {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

      <div className="mt-6 flex gap-3">
        <button onClick={encode} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
          Encode to Base64
        </button>
        <button onClick={decode} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
          Decode from Base64
        </button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary font-semibold rounded-xl transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
