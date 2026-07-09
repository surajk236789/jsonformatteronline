"use client";

import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------
// Pure JSON → XML conversion (no external dependencies)
// ---------------------------------------------------------------------------

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeTagName(name: string): string {
  // XML tag names must start with a letter or underscore
  let tag = name.replace(/[^a-zA-Z0-9_\-.:]/g, "_");
  if (/^[^a-zA-Z_]/.test(tag)) tag = "_" + tag;
  return tag || "_item";
}

function jsonValueToXml(value: unknown, tagName: string, indent: string): string {
  const tag = sanitizeTagName(tagName);
  const nextIndent = indent + "  ";

  if (value === null) {
    return `${indent}<${tag} nil="true"/>`;
  }

  if (typeof value === "boolean" || typeof value === "number") {
    return `${indent}<${tag}>${value}</${tag}>`;
  }

  if (typeof value === "string") {
    return `${indent}<${tag}>${escapeXml(value)}</${tag}>`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return `${indent}<${tag}/>`;
    }
    const items = value
      .map((item) => jsonValueToXml(item, "item", nextIndent))
      .join("\n");
    return `${indent}<${tag}>\n${items}\n${indent}</${tag}>`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) {
      return `${indent}<${tag}/>`;
    }
    const children = entries
      .map(([k, v]) => jsonValueToXml(v, k, nextIndent))
      .join("\n");
    return `${indent}<${tag}>\n${children}\n${indent}</${tag}>`;
  }

  return `${indent}<${tag}>${escapeXml(String(value))}</${tag}>`;
}

function convertJsonToXml(jsonString: string): string {
  const parsed = JSON.parse(jsonString);
  const xmlDecl = `<?xml version="1.0" encoding="UTF-8"?>`;

  if (Array.isArray(parsed)) {
    const items = parsed
      .map((item) => jsonValueToXml(item, "item", "  "))
      .join("\n");
    return `${xmlDecl}\n<root>\n${items}\n</root>`;
  }

  if (typeof parsed === "object" && parsed !== null) {
    const entries = Object.entries(parsed as Record<string, unknown>);
    const children = entries
      .map(([k, v]) => jsonValueToXml(v, k, "  "))
      .join("\n");
    return `${xmlDecl}\n<root>\n${children}\n</root>`;
  }

  // Primitive at root level
  return `${xmlDecl}\n<root>${escapeXml(String(parsed))}</root>`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const SAMPLE_JSON = `{
  "person": {
    "name": "Ada Lovelace",
    "age": 36,
    "active": true,
    "email": "ada@example.com",
    "languages": ["Python", "JavaScript", "TypeScript"],
    "address": {
      "city": "London",
      "country": "UK"
    }
  }
}`;

export default function JsonToXml() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError(t("jsonEmpty", { defaultValue: "JSON input is empty" }));
      setOutput("");
      return;
    }
    try {
      const xml = convertJsonToXml(input);
      setOutput(xml);
      setError("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || t("jsonInvalid", { defaultValue: "Invalid JSON input" }));
      setOutput("");
    }
  }, [input, t]);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.xml";
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    setError("");
    setOutput("");
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
            {t("jsonToXmlTitle", { defaultValue: "JSON → XML Converter" })}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {t("jsonToXmlDesc", {
              defaultValue:
                "Convert JSON data into well-formed XML instantly. All conversion happens in your browser.",
            })}
          </p>
        </div>
        <button
          onClick={loadSample}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          {t("loadSample", { defaultValue: "Paste Sample JSON" })}
        </button>
      </div>

      {/* Dual pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("inputLabel", { defaultValue: "Raw JSON Input" })}</span>
            <span className="text-[10px] text-slate-400 normal-case">
              {input.length} chars
            </span>
          </label>
          <textarea
            id="json-to-xml-input"
            className="w-full h-80 md:h-[420px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder={'Paste your JSON here (e.g. {"key": "value"})'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("xmlOutput", { defaultValue: "XML Output" })}</span>
            {output && (
              <span className="text-[10px] text-slate-400 normal-case">
                {output.length} chars
              </span>
            )}
          </label>
          <div className="relative w-full h-80 md:h-[420px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {output ? (
              <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-orange-600 dark:text-orange-400 select-all">
                <code>{output}</code>
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg
                  className="w-12 h-12 mb-3 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <p className="text-sm font-medium">
                  {t("xmlOutputPlaceholder", {
                    defaultValue: "Converted XML will appear here.",
                  })}
                </p>
              </div>
            )}

            {/* Action buttons overlay */}
            {output && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {/* Copy */}
                <button
                  id="json-to-xml-copy-btn"
                  onClick={handleCopy}
                  title="Copy XML"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {t("copy", { defaultValue: "Copy" })}
                    </>
                  )}
                </button>

                {/* Download */}
                <button
                  id="json-to-xml-download-btn"
                  onClick={handleDownload}
                  title="Download XML"
                  className="p-2 bg-orange-600/90 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
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
                      .xml
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
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

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-panel-border/50">
        <button
          id="json-to-xml-clear-btn"
          onClick={handleClear}
          className="px-5 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-secondary text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {t("clear", { defaultValue: "Clear" })}
        </button>

        <button
          id="json-to-xml-convert-btn"
          onClick={handleConvert}
          className="glow-button px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {t("convertToXml", { defaultValue: "Convert to XML" })}
        </button>
      </div>
    </div>
  );
}
