"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/Button";
import { Copy, RefreshCw, Check } from "lucide-react";
import { loremIpsum } from "lorem-ipsum";

export default function LoremIpsumGenerator() {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState<number>(3);
  const [unit, setUnit] = useState<"paragraphs" | "words" | "sentences">("paragraphs");
  const [format, setFormat] = useState<"plain" | "html">("plain");
  const [copied, setCopied] = useState(false);

  const generateLorem = useCallback(() => {
    const text = loremIpsum({
      count,
      format,
      units: unit,
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
    });
    setOutput(text);
  }, [count, unit, format]);

  useEffect(() => {
    generateLorem();
  }, [generateLorem]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-teal-500 rounded-full inline-block" />
            {"Lorem Ipsum Generator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Generate dummy text for your designs and mockups instantly."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateLorem} className="bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Toolbar / Options */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Length:</span>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 text-center"
          />
        </div>

        {/* Units */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          {(["paragraphs", "sentences", "words"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                unit === u
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {u.charAt(0).toUpperCase() + u.slice(1)}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

        {/* Format */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          {(["plain", "html"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                format === f
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {f === "plain" ? "Plain Text" : "HTML Tags"}
            </button>
          ))}
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
        </div>
        <textarea
          readOnly
          value={output}
          className="w-full h-80 md:h-[400px] p-6 pt-16 font-sans text-base leading-relaxed border border-panel-border rounded-xl bg-panel focus:outline-none transition-all duration-200 shadow-inner resize-none text-slate-700 dark:text-slate-300 selection:bg-teal-200 dark:selection:bg-teal-900/50"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
