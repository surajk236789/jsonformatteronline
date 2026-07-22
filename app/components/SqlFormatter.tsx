"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Check, AlertCircle, Database, ArrowDownToLine, Settings2 } from "lucide-react";
import { Button } from "./ui/Button";

// Import sql-formatter dynamically to reduce initial bundle size
const loadSqlFormatter = () => import("sql-formatter");

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<string>("sql");
  const [tabWidth, setTabWidth] = useState<number>(2);

  const SAMPLE_SQL = `SELECT p.product_name, c.category_name, SUM(o.quantity) as total_sold FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN order_items o ON p.id = o.product_id WHERE p.active = true GROUP BY p.product_name, c.category_name ORDER BY total_sold DESC;`;

  const loadSample = () => {
    setInput(SAMPLE_SQL);
    setError(null);
  };

  const formatSql = async (val: string, dialect: string, spaces: number) => {
    if (!val.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const { format } = await loadSqlFormatter();
      const formatted = format(val, {
        language: dialect as any,
        tabWidth: spaces,
        keywordCase: "upper",
      });
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to format SQL");
      // Fallback: show the original text so user doesn't lose it in output
      setOutput(val);
    }
  };

  // Debounced formatting
  useEffect(() => {
    const timer = setTimeout(() => {
      formatSql(input, language, tabWidth);
    }, 400);
    return () => clearTimeout(timer);
  }, [input, language, tabWidth]);

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
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const languages = [
    { value: "sql", label: "Standard SQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "mariadb", label: "MariaDB" },
    { value: "sqlite", label: "SQLite" },
    { value: "tsql", label: "T-SQL (SQL Server)" },
    { value: "plsql", label: "PL/SQL (Oracle)" },
  ];

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header matching other tools */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block" />
            {"SQL Formatter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Beautify database queries for multiple SQL dialects."}
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
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
            <span className="text-sm text-slate-500 font-medium">Indent:</span>
            <select
              value={tabWidth}
              onChange={(e) => setTabWidth(Number(e.target.value))}
              className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="ghost" onClick={clearAll} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/50">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleCopy} disabled={!output} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
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
              Raw SQL
            </h2>
          </div>
          <div className="flex-1 relative">
             <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500/50"
              placeholder="SELECT * FROM users WHERE active = true..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right pane: Output */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Formatted SQL
            </h2>
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" onClick={handleDownload} disabled={!output} title="Download .sql">
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
