"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "./ui/Button";
import * as yaml from "js-yaml";

const SAMPLE_JSON = `{
  "person": {
    "name": "Ada Lovelace",
    "age": 36,
    "active": true,
    "email": "ada@example.com",
    "languages": [
      "Python",
      "JavaScript",
      "TypeScript"
    ],
    "address": {
      "city": "London",
      "country": "UK"
    }
  }
}`;

export default function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const convert = useCallback(() => {
    setError("");
    try {
      if (!input.trim()) {
        setError("JSON input is empty");
        setOutput("");
        return;
      }
      const data = JSON.parse(input);
      setOutput(yaml.dump(data, { indent: 2 }));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON");
      }
      setOutput("");
    }
  }, [input]);

  // Auto convert when input changes
  useEffect(() => {
    if (input) {
      const timer = setTimeout(() => {
        convert();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setOutput("");
      setError("");
    }
  }, [input, convert]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    setError("");
    setOutput("");
  }, []);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  }, [output]);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header matching other tools */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
            {"JSON → YAML Converter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Convert JSON data into clean YAML instantly. All conversion happens in your browser."}
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
            <span>{"Raw JSON Input"}</span>
            <span className="text-[10px] text-slate-400 normal-case">{input.length} chars</span>
          </label>
          <textarea
            className="w-full h-80 md:h-[400px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            placeholder='Paste your JSON data here (e.g. {"key": "value"})'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"YAML Output"}</span>
            {output && (
              <span className="text-[10px] text-slate-400 normal-case">
                {output.length} chars
              </span>
            )}
          </label>
          <div className="relative w-full h-80 md:h-[400px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {output ? (
              <pre className="w-full flex-1 p-4 font-mono text-sm overflow-auto text-orange-600 dark:text-orange-400 select-all">
                <code>{output}</code>
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">
                  {"Converted YAML will render here."}
                </p>
              </div>
            )}

            {/* Action buttons overlay */}
            {output && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {/* Copy */}
                <Button
                  onClick={handleCopy}
                  title="Copy YAML"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  {copySuccess ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy
                    </>
                  )}
                </Button>

                {/* Download */}
                <Button
                  onClick={handleDownload}
                  title="Download YAML"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  {downloadSuccess ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-mono flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="break-all">{error}</span>
        </div>
      )}
    </div>
  );
}
