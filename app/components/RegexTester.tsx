"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Copy, Trash2, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSample = () => {
    setPattern("([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})");
    setText("Contact us at support@example.com or sales-2026@company.org.");
    setFlags("g");
    setError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPattern("");
    setText("");
    setError(null);
  };

  const results = useMemo(() => {
    if (!pattern) return null;

    try {
      setError(null);
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;

      if (flags.includes('g')) {
        let count = 0;
        // Limit to prevent infinite loops from poor regexes or huge inputs
        while ((match = regex.exec(text)) !== null && count < 1000) {
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          matches.push(match);
          count++;
        }
      } else {
        match = regex.exec(text);
        if (match) matches.push(match);
      }

      return matches;
    } catch (err: any) {
      setError(err.message || "Invalid Regular Expression");
      return null;
    }
  }, [pattern, flags, text]);

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  // Build the highlighted text
  const highlightedText = useMemo(() => {
    if (!pattern || !results || results.length === 0 || error) {
      return text;
    }

    try {
      if (flags.includes('g')) {
        // Simple replace for 'g' flag
        let parts = [];
        let lastIndex = 0;
        
        for (const match of results) {
          parts.push(text.substring(lastIndex, match.index));
          parts.push(
            <mark key={match.index} className="bg-indigo-200 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 rounded-sm px-0.5">
              {match[0]}
            </mark>
          );
          lastIndex = match.index + match[0].length;
        }
        parts.push(text.substring(lastIndex));
        return parts;
      } else {
        const match = results[0];
        return (
          <>
            {text.substring(0, match.index)}
            <mark className="bg-indigo-200 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 rounded-sm px-0.5">
              {match[0]}
            </mark>
            {text.substring(match.index + match[0].length)}
          </>
        );
      }
    } catch (e) {
      return text;
    }
  }, [pattern, flags, text, results, error]);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header matching other tools */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block" />
            {"Regex Tester"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Test regular expressions and debug capture groups instantly."}
          </p>
        </div>
        <Button onClick={loadSample} variant="secondary">
          {"Load Sample"}
        </Button>
      </div>

      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="regex pattern"
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:bg-slate-950 min-w-[200px] flex-1 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <span>/</span>
          </div>
          <div className="flex gap-1.5">
            {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors border ${flags.includes(flag) ? 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-800'}`}
                title={`Flag: ${flag}`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
           <Button variant="ghost" onClick={clearAll} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        {/* Left pane: Test String */}
        <div className="flex flex-col group relative rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Test String
            </h2>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy text">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
             <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-transparent caret-slate-900 dark:caret-white focus:outline-none z-10"
              placeholder="Enter text to test your regex against..."
              spellCheck="false"
            />
            <div className="absolute inset-0 w-full h-full p-4 overflow-auto font-mono text-sm text-slate-800 dark:text-slate-300 whitespace-pre-wrap break-words z-0 pointer-events-none" aria-hidden="true">
              {highlightedText}
            </div>
          </div>
        </div>

        {/* Right pane: Match Results */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Match Results
            </h2>
            {results && !error && (
              <span className="text-xs font-medium px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full">
                {results.length} match{results.length !== 1 ? 'es' : ''}
              </span>
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {(!pattern || text.length === 0) ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-sm text-center max-w-[250px]">
                  Enter a regular expression and test string to see matches
                </p>
              </div>
            ) : results && results.length > 0 ? (
              <div className="space-y-4">
                {results.map((match, i) => (
                  <div key={i} className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Match {i + 1}</span>
                      <span className="text-xs text-slate-400 font-mono">Index: {match.index}</span>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-sm text-indigo-600 dark:text-indigo-400 break-all">{match[0]}</div>
                      {match.length > 1 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Capture Groups</p>
                          <div className="space-y-1.5">
                            {match.slice(1).map((group, j) => (
                              <div key={j} className="flex items-start gap-2 text-sm font-mono">
                                <span className="text-slate-400 select-none">[{j + 1}]</span>
                                <span className={group ? 'text-slate-700 dark:text-slate-300 break-all' : 'text-slate-400 italic'}>
                                  {group === undefined ? 'undefined' : group}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : !error ? (
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                <p className="text-sm">No matches found</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
