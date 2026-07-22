"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Check, AlertCircle, FileCode2, ArrowDownToLine, Settings2 } from "lucide-react";
import { Button } from "./ui/Button";

// Import xml-formatter dynamically
const loadXmlFormatter = () => import("xml-formatter").then(m => m.default);

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [collapseContent, setCollapseContent] = useState<boolean>(true);

  const SAMPLE_XML = `<Envelope><Body><GetPriceResponse><Price>45.99</Price><Currency>USD</Currency><Stock>InStock</Stock></GetPriceResponse></Body></Envelope>`;

  const loadSample = () => {
    setInput(SAMPLE_XML);
    setError(null);
  };

  const formatXml = async (val: string, spaces: number, collapse: boolean) => {
    if (!val.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const formatter = await loadXmlFormatter();
      const formatted = formatter(val, {
        indentation: ' '.repeat(spaces),
        collapseContent: collapse,
        lineSeparator: '\n',
      });
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid XML input");
      setOutput(val); // fallback to raw
    }
  };

  // Debounced formatting
  useEffect(() => {
    const timer = setTimeout(() => {
      formatXml(input, indent, collapseContent);
    }, 400);
    return () => clearTimeout(timer);
  }, [input, indent, collapseContent]);

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
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header matching other tools */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
            {"XML Formatter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Beautify and validate XML documents."}
          </p>
        </div>
        <Button onClick={loadSample} variant="secondary">
          {"Load Sample"}
        </Button>
      </div>

      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
            <Settings2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500 font-medium">Indent:</span>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={collapseContent}
              onChange={(e) => setCollapseContent(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Collapse Short Elements</span>
          </label>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="ghost" onClick={clearAll} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleCopy} disabled={!output} className="bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20">
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
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Raw XML
            </h2>
          </div>
          <div className="flex-1 relative">
             <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500/50"
              placeholder="<root><item>Hello</item></root>..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right pane: Output */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Formatted XML
            </h2>
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" onClick={handleDownload} disabled={!output} title="Download .xml">
                 <ArrowDownToLine className="w-4 h-4 text-slate-500" />
               </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={output}
              readOnly
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none"
              placeholder="Formatted output will appear here..."
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
