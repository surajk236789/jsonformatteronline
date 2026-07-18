"use client";

import React, { useState } from "react";
// @ts-expect-error: js-beautify has no typescript declaration file
import beautify from "js-beautify";

export default function HtmlBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const sampleHtml = `<div class="container" id="main-panel">
<h1>Hello World</h1>
<p>Welcome to <strong>AllFormatter</strong>. We hope you love formatting code here!</p>
<ul><li>JSON Beautifier</li><li>HTML Beautifier</li><li>Base64 to PDF</li></ul>
<!-- Inline Advertisement Placement -->
<div class="google-ad-scene"><p>Ad Space</p></div>
</div>`;

  const loadSample = () => {
    setInput(sampleHtml);
    setError("");
    setOutput("");
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      setError("HTML input is empty");
      setOutput("");
      return;
    }
    try {
      const pretty = beautify.html(input, {
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 2,
        preserve_newlines: true,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: "normal",
        brace_style: "collapse",
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: false,
        end_with_newline: false,
        wrap_line_length: 0,
        indent_inner_html: false,
        comma_first: false,
        e4x: false,
        indent_empty_lines: false
      });
      setOutput(pretty);
      setError("");
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e);
      setError(errMsg || "Error beautifying HTML");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block"></span>
            {"HTML Beautifier & Formatter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Format, clean, and beautify your HTML markup instantly."}
          </p>
        </div>
        <button
          onClick={loadSample}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          {"Paste Sample HTML"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Raw HTML Input"}</span>
            <span className="text-[10px] text-slate-400 normal-case">{input.length} chars</span>
          </label>
          <textarea
            className="w-full h-80 md:h-[400px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-inner"
            placeholder="Paste your unformatted HTML code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Beautified HTML Output"}</span>
            {output && (
              <span className="text-[10px] text-slate-400 normal-case">
                {output.length} chars
              </span>
            )}
          </label>
          <div className="relative w-full h-80 md:h-[400px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {output ? (
              <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-blue-600 dark:text-blue-400 select-all">
                <code>{output}</code>
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm font-medium">
                  {"Beautified HTML will render here."}
                </p>
              </div>
            )}
            
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {"Copy"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-start gap-2.5">
          <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xs font-mono text-rose-600 dark:text-rose-400 break-all">
            {error}
          </div>
        </div>
      )}

      {/* Button Operations */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-panel-border/50">
        <button
          onClick={handleClear}
          className="px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {"Clear"}
        </button>
        <button
          onClick={handleBeautify}
          className="glow-button px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          {"Beautify HTML"}
        </button>
      </div>
    </div>
  );
}
