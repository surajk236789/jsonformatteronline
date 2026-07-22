"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { ArrowRightLeft } from "lucide-react";

export default function TextDiff() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [mode, setMode] = useState<"lines" | "words">("lines");

  const [diffResult, setDiffResult] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (!original && !modified) {
      setDiffResult([]);
      return;
    }

    const computeDiff = async () => {
      const Diff = await import("diff");
      if (!isMounted) return;
      
      if (mode === "lines") {
        setDiffResult(Diff.diffLines(original, modified));
      } else {
        setDiffResult(Diff.diffWords(original, modified));
      }
    };
    
    computeDiff();
    
    return () => {
      isMounted = false;
    };
  }, [original, modified, mode]);

  const loadSample = () => {
    setOriginal(
      "The quick brown fox jumps over the lazy dog.\n\nThis is a sample text document.\nIt has a few lines to demonstrate diffing."
    );
    setModified(
      "The fast brown fox leaps over the lazy dog.\n\nThis is a sample text document.\nIt has several lines to show how diffing works."
    );
  };

  const clearAll = () => {
    setOriginal("");
    setModified("");
  };

  const swapText = () => {
    setOriginal(modified);
    setModified(original);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-pink-500 rounded-full inline-block" />
            {"Text Diff & Compare"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Compare two text blocks side-by-side to find differences instantly."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={clearAll} variant="ghost" className="text-rose-600 dark:text-rose-400">
            Clear
          </Button>
          <Button onClick={loadSample} variant="secondary">
            {"Load Sample"}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMode("lines")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === "lines"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Line Diff
          </button>
          <button
            onClick={() => setMode("words")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === "words"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Word Diff
          </button>
        </div>
        
        <Button onClick={swapText} variant="secondary" className="px-3 py-1.5 h-auto text-xs flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Swap Inputs
        </Button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Original Text"}</span>
            <span className="text-[10px] text-slate-400 normal-case">{original.length} chars</span>
          </label>
          <textarea
            className="w-full h-48 md:h-64 p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder="Paste the original text here..."
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            spellCheck={false}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Modified Text"}</span>
            <span className="text-[10px] text-slate-400 normal-case">{modified.length} chars</span>
          </label>
          <textarea
            className="w-full h-48 md:h-64 p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder="Paste the modified text here..."
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Output / Diff Result */}
      <div className="flex flex-col mt-4">
        <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
          {"Diff Result"}
        </label>
        <div className="relative w-full min-h-64 max-h-[500px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
          {(original || modified) ? (
            <div className="w-full flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap leading-relaxed">
              {diffResult.map((part, index) => {
                let colorClass = "text-slate-700 dark:text-slate-300";
                let bgClass = "bg-transparent";
                
                if (part.added) {
                  colorClass = "text-emerald-700 dark:text-emerald-300";
                  bgClass = "bg-emerald-100 dark:bg-emerald-900/40";
                } else if (part.removed) {
                  colorClass = "text-rose-700 dark:text-rose-300 line-through opacity-80";
                  bgClass = "bg-rose-100 dark:bg-rose-900/30";
                }

                return (
                  <span key={index} className={`${colorClass} ${bgClass} rounded-[2px]`}>
                    {part.value}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
              <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">
                {"Enter text above to see the comparison."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
