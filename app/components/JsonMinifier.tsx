"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Check, AlertCircle, FileJson, ArrowDownToLine } from "lucide-react";
import { Button } from "./ui/Button";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);

  const SAMPLE_JSON = `{
  "user": {
    "id": 10293,
    "name": "Jane Doe",
    "roles": [
      "admin",
      "editor"
    ]
  }
}`;

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setError(null);
  };

  // Debounced minification
  useEffect(() => {
    const timer = setTimeout(() => {
      minifyJson(input);
    }, 400);
    return () => clearTimeout(timer);
  }, [input]);

  const minifyJson = (val: string) => {
    if (!val.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }

    try {
      // Parse to ensure it's valid JSON
      const parsed = JSON.parse(val);
      // Stringify with no whitespace
      const minifiedStr = JSON.stringify(parsed);

      setOutput(minifiedStr);
      setError(null);

      setStats({
        original: new Blob([val]).size,
        minified: new Blob([minifiedStr]).size,
      });
    } catch (e: any) {
      setError(e.message || "Invalid JSON input");
      setStats(null);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavingsPercentage = () => {
    if (!stats || stats.original === 0) return 0;
    const saved = stats.original - stats.minified;
    return Math.max(0, ((saved / stats.original) * 100)).toFixed(1);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header matching other tools */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block" />
            {"JSON Minifier"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Compress JSON data to reduce payload sizes."}
          </p>
        </div>
        <Button onClick={loadSample} variant="secondary">
          {"Load Sample"}
        </Button>
      </div>

      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {stats && (
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-lg mr-2">
              <div className="text-xs">
                <span className="text-slate-500">Original:</span> <span className="font-semibold text-slate-700 dark:text-slate-300">{formatBytes(stats.original)}</span>
              </div>
              <div className="w-px h-3 bg-emerald-200 dark:bg-emerald-800"></div>
              <div className="text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{getSavingsPercentage()}%</span>
              </div>
            </div>
          )}

          <Button variant="ghost" onClick={clearAll} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleCopy} disabled={!output} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Output"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm flex items-center gap-3 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}

      {/* Editor area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* Left pane: Input */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Input JSON
            </h2>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500/50"
              placeholder="Paste your unformatted JSON here..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right pane: Output */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Minified JSON
            </h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={handleDownload} disabled={!output} title="Download .json">
                <ArrowDownToLine className="w-4 h-4 text-slate-500" />
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={output}
              readOnly
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none"
              placeholder="Minified output will appear here..."
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
