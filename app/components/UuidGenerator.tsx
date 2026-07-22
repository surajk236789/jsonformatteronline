"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/Button";
import { Copy, RefreshCw, Download, Check } from "lucide-react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [version, setVersion] = useState<"v4">("v4");
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let id = crypto.randomUUID();
      if (!hyphens) {
        id = id.replace(/-/g, "");
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      newUuids.push(id);
    }
    setUuids(newUuids);
  }, [count, hyphens, uppercase]);

  // Initial generation
  useEffect(() => {
    generateUuids();
  }, []); // Only run once on mount, let users manually click generate after that

  const handleCopy = () => {
    const text = uuids.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = uuids.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "uuids.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-purple-500 rounded-full inline-block" />
            {"UUID/GUID Generator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Generate cryptographically secure v4 UUIDs instantly."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateUuids} className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New
          </Button>
        </div>
      </div>

      {/* Toolbar / Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
          {/* Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">How many?</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={500}>500</option>
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

          {/* Options */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hyphens</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Uppercase</span>
            </label>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col relative">
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <Button
            onClick={handleCopy}
            title="Copy all"
            className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            onClick={handleDownload}
            title="Download as .txt"
            className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
        <textarea
          readOnly
          value={uuids.join("\n")}
          className="w-full h-80 md:h-[500px] p-6 pt-16 font-mono text-sm md:text-base leading-relaxed border border-panel-border rounded-xl bg-panel focus:outline-none transition-all duration-200 shadow-inner resize-none text-slate-800 dark:text-slate-200 selection:bg-purple-200 dark:selection:bg-purple-900/50"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
