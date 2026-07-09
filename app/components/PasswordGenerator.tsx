"use client";
import React, { useState, useEffect } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const generate = () => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~\`|}{[]:;?><,./-=";
    
    if (!charset) charset = "abcdefghijklmnopqrstuvwxyz"; // fallback
    
    let pass = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += charset[array[i] % charset.length];
    }
    setPassword(pass);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🔑
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">Secure Password Generator</h2>
          <p className="text-sm text-secondary">Generate strong, random passwords securely.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <input 
            type="text"
            readOnly
            value={password}
            className="w-full p-4 pr-24 bg-background border border-panel-border rounded-xl text-xl md:text-2xl font-mono text-center text-primary outline-none"
          />
          <button 
            onClick={() => navigator.clipboard.writeText(password)}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg transition-colors text-sm"
          >
            Copy
          </button>
        </div>

        <div className="space-y-6 bg-background p-6 rounded-xl border border-panel-border">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-primary">Password Length</label>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{length}</span>
            </div>
            <input 
              type="range" min="4" max="64" value={length} 
              onChange={(e) => setLength(Number(e.target.value))} 
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-primary">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-primary">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-primary">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <span className="text-sm text-primary">Symbols (!@#)</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generate} 
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/30 text-lg"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}
