"use client";
import React, { useState, ChangeEvent, useCallback } from "react";
import { Button } from "./ui/Button";

const SAMPLE_CSS = `/* Basic styling */
body {
  font-family: 'Inter', sans-serif;
  color: #333333;
  margin: 0;
  padding: 0;
}

/* Header styles */
.header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}`;

export default function CssMinifier() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const minify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    let minified = input;
    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove newlines and tabs
    minified = minified.replace(/\n/g, "").replace(/\t/g, "");
    // Remove multiple spaces
    minified = minified.replace(/\s+/g, " ");
    // Remove spaces around brackets, colons, commas, semicolons
    minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    // Remove trailing semicolons before closing brackets
    minified = minified.replace(/;\}/g, "}");

    setOutput(minified.trim());
  }, [input]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_CSS);
    setOutput("");
  }, []);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [output]);

  const downloadCSS = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/css;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.css";
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-pink-500 rounded-full inline-block" />
            {"CSS Minifier"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Minify CSS code and reduce file size instantly."}
          </p>
        </div>
        <Button
          onClick={loadSample}
          variant="secondary"
        >
          {"Paste Sample CSS"}
        </Button>
      </div>

      {/* Dual pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Input CSS"}</span>
            <span className="text-[10px] text-slate-400 normal-case">
              {input.length} chars
            </span>
          </label>
          <textarea
            className="w-full h-80 md:h-[420px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder={'body {\n  color: red;\n  margin: 0;\n}'}
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Minified CSS"}</span>
            {output && (
              <span className="text-[10px] text-slate-400 normal-case">
                {output.length} chars
              </span>
            )}
          </label>
          <div className="relative w-full h-80 md:h-[420px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {output ? (
              <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-pink-600 dark:text-pink-400 select-all">
                <code>{output}</code>
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                <p className="text-sm font-medium">
                  {"Minified CSS will appear here."}
                </p>
              </div>
            )}

            {/* Action buttons overlay */}
            {output && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {/* Copy */}
                <Button
                  onClick={handleCopy}
                  title="Copy CSS"
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

                {/* Download */}
                <Button
                  onClick={downloadCSS}
                  title="Download CSS"
                  className="p-2 bg-pink-600/90 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  {downloadSuccess ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Saved!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      .css
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-panel-border/50">
        <Button
          onClick={handleClear}
          variant="secondary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {"Clear"}
        </Button>

        <Button
          onClick={minify}
          className="glow-button px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
          {"Minify CSS"}
        </Button>
      </div>
    </div>
  );
}
