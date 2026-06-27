"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-expect-error: js-beautify has no typescript declaration file
import beautify from "js-beautify";

export default function HtmlBeautifier() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const sampleHtml = `<div class="container" id="main-panel">
<h1>Hello World</h1>
<p>Welcome to <strong>DevTools Hub</strong>. We hope you love formatting code here!</p>
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
      setError(t("htmlEmpty", { defaultValue: "HTML input is empty" }));
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
      setError(errMsg || t("htmlInvalid", { defaultValue: "Error beautifying HTML" }));
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-500 rounded-full inline-block"></span>
            {t("htmlBeautifierTitle", { defaultValue: "HTML Beautifier & Formatter" })}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t("htmlBeautifierDesc", { defaultValue: "Format, clean, and beautify your HTML markup instantly." })}
          </p>
        </div>
        <button
          onClick={loadSample}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          {t("loadSampleHtml", { defaultValue: "Paste Sample HTML" })}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("htmlInputLabel", { defaultValue: "Raw HTML Input" })}</span>
            <span className="text-[10px] text-slate-400 normal-case">{input.length} chars</span>
          </label>
          <textarea
            className="w-full h-80 md:h-[400px] p-4 font-mono text-sm border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-inner"
            placeholder="Paste your unformatted HTML code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("htmlOutputLabel", { defaultValue: "Beautified HTML Output" })}</span>
            {output && (
              <span className="text-[10px] text-slate-400 normal-case">
                {output.length} chars
              </span>
            )}
          </label>
          <div className="relative w-full h-80 md:h-[400px] border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-inner flex flex-col">
            {output ? (
              <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-blue-600 dark:text-blue-400 select-all">
                <code>{output}</code>
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm font-medium">
                  {t("htmlOutputPlaceholder", { defaultValue: "Beautified HTML will render here." })}
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
                    {t("copied", { defaultValue: "Copied!" })}
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {t("copy", { defaultValue: "Copy" })}
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
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleClear}
          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          {t("clear", { defaultValue: "Clear" })}
        </button>
        <button
          onClick={handleBeautify}
          className="glow-button px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md cursor-pointer"
        >
          {t("beautifyHtml", { defaultValue: "Beautify HTML" })}
        </button>
      </div>
    </div>
  );
}
