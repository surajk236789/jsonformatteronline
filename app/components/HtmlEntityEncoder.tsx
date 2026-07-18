"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    let encodedStr = input.replace(/[\\u00A0-\\u9999<>\\&]/g, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    // Ensure quotes are covered
    encodedStr = encodedStr.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    setOutput(encodedStr);
  };

  const decode = () => {
    // Basic decode using DOM (works on client-side React)
    const txt = document.createElement("textarea");
    txt.innerHTML = input;
    setOutput(txt.value);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🔠
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">HTML Entity Encoder / Decoder</h2>
          <p className="text-sm text-secondary">Encode or decode HTML entities safely.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Input String</label>
          <textarea 
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div>Hello & Welcome</div>"
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

      <div className="mt-6 flex gap-3">
        <Button onClick={encode} variant="primary">
          Encode Entities
        </Button>
        <Button onClick={decode} variant="primary">
          Decode Entities
        </Button>
        <Button onClick={() => { setInput(""); setOutput(""); }} variant="secondary">
          Clear
        </Button>
      </div>
    </div>
  );
}
