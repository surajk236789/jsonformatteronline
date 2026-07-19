"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/Button";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const generate = useCallback(() => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    if (!charset) charset = "abcdefghijklmnopqrstuvwxyz"; // fallback
    
    let pass = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += charset[array[i] % charset.length];
    }
    setPassword(pass);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [password]);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-500 rounded-full inline-block" />
            {"Secure Password Generator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Generate strong, random passwords securely."}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="relative border border-panel-border rounded-xl bg-background shadow-inner flex flex-col overflow-hidden">
          <input 
            type="text"
            readOnly
            value={password}
            className="w-full p-6 bg-transparent text-xl md:text-2xl font-mono text-center text-primary outline-none pr-24"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <Button
              onClick={handleCopy}
              title="Copy Password"
              className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              {copySuccess ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {"Copied!"}
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {"Copy"}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6 bg-panel p-6 rounded-xl border border-panel-border shadow-sm">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-primary">{"Password Length"}</label>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">{length}</span>
            </div>
            <input 
              type="range" min="4" max="64" value={length} 
              onChange={(e) => setLength(Number(e.target.value))} 
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-4 h-4 accent-red-500 cursor-pointer" />
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">{"Uppercase (A-Z)"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} className="w-4 h-4 accent-red-500 cursor-pointer" />
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">{"Lowercase (a-z)"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-4 h-4 accent-red-500 cursor-pointer" />
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">{"Numbers (0-9)"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-4 h-4 accent-red-500 cursor-pointer" />
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">{"Symbols (!@#)"}</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            onClick={generate} 
            className="glow-button px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-base font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {"Generate New Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
