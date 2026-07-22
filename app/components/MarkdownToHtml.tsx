"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/Button";
import { Copy, Download, Code, LayoutTemplate } from "lucide-react";
import DOMPurify from "dompurify";

const SAMPLE_MD = `# Hello Markdown!
## This is a subtitle

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

### Features
- **Bold text**
- *Italic text*
- [Links](https://example.com)

\`\`\`javascript
// Code blocks
function sayHello() {
  console.log("Hello, world!");
}
\`\`\`

> Blockquotes are also supported.

| Table Header | Another Header |
|--------------|----------------|
| Row 1 Col 1  | Row 1 Col 2    |
`;

export default function MarkdownToHtml() {
  const [input, setInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const convert = useCallback(async () => {
    if (!input.trim()) {
      setHtmlOutput("");
      return;
    }
    // Parse markdown
    const { marked } = await import("marked");
    const rawHtml = marked.parse(input) as string;
    // Purify HTML to prevent XSS
    const cleanHtml = DOMPurify.sanitize(rawHtml);
    setHtmlOutput(cleanHtml);
  }, [input]);

  useEffect(() => {
    const timer = setTimeout(() => {
      convert();
    }, 300);
    return () => clearTimeout(timer);
  }, [input, convert]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_MD);
  }, []);

  const handleCopy = useCallback(() => {
    if (!htmlOutput) return;
    navigator.clipboard.writeText(htmlOutput).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [htmlOutput]);

  const handleDownload = useCallback(() => {
    if (!htmlOutput) return;
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  }, [htmlOutput]);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block" />
            {"Markdown → HTML Converter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Convert Markdown text to clean, sanitized HTML instantly."}
          </p>
        </div>
        <Button onClick={loadSample} variant="secondary">
          {"Load Sample"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Markdown Input"}</span>
            <span className="text-[10px] text-slate-400 normal-case">{input.length} chars</span>
          </label>
          <textarea
            className="w-full h-80 md:h-[500px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder="Type your markdown here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
              <span>{"HTML Output"}</span>
            </label>
            
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setViewMode("code")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "code" 
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <Code className="w-3.5 h-3.5" /> Code
              </button>
              <button
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === "preview" 
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <LayoutTemplate className="w-3.5 h-3.5" /> Preview
              </button>
            </div>
          </div>

          <div className="relative w-full h-80 md:h-[500px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {htmlOutput ? (
              viewMode === "code" ? (
                <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-blue-600 dark:text-blue-400 select-all whitespace-pre-wrap">
                  <code>{htmlOutput}</code>
                </pre>
              ) : (
                <div 
                  className="w-full flex-1 p-6 overflow-auto prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-950"
                  dangerouslySetInnerHTML={{ __html: htmlOutput }}
                />
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm font-medium">
                  {"Generated HTML will appear here."}
                </p>
              </div>
            )}

            {/* Action buttons overlay (only in code mode) */}
            {(htmlOutput && viewMode === "code") && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <Button
                  onClick={handleCopy}
                  title="Copy HTML"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copySuccess ? "Copied!" : "Copy"}
                </Button>
                <Button
                  onClick={handleDownload}
                  title="Download HTML"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
