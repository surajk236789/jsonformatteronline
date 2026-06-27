"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Base64ToPdf() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Revoke object URL on change/unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl, input]);

  const handleConvert = () => {
    setError("");
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl("");
    }

    if (!input.trim()) {
      setError(t("base64Empty", { defaultValue: "Please enter a Base64 string." }));
      return;
    }

    try {
      // Strip Data URI headers if pasted (e.g. data:application/pdf;base64,...)
      let cleanInput = input.trim();
      const match = cleanInput.match(/^data:application\/pdf;base64,(.*)$/i);
      if (match) {
        cleanInput = match[1];
      }

      // Remove spaces or line breaks
      cleanInput = cleanInput.replace(/\s/g, "");

      const byteCharacters = atob(cleanInput);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch {
      setError(t("base64Invalid", { defaultValue: "Invalid Base64 payload. Please check that it forms a valid PDF file data." }));
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setInput("");
    setError("");
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl("");
    }
  };

  // Sample of a valid minimum empty 1-page PDF in base64
  const sampleBase64 = "JVBERi0xLjQKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCjIgMCBvYmoKICA8PCAvVHlwZSAvUGFnZXMKICAgICAvS2lkcyBbIDMgMCBSIF0KICAgICAvQ291bnQgMQogID4+CmVuZG9iagozIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2UKICAgICAvUGFyZW50IDIgMCBSCiAgICAgL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQogICAgIC9SZXNvdXJjZXMgPDwgPj4KICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKNCAwIG9iagogIDw8IC9MZW5ndGggOCA+PgpzdHJlYW0KCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAwNzAgMDAwMDAgbC4KMDAwMDAwMDEyMSAwMDAwMCBuIAowMDAwMDAwMjM5IDAwMDAwIG4gCnRyYWlsZXIKICA8PCAvU2l6ZSA1CiAgICAgL1Jvb3QgMSAwIFIKICA+PgpzdGFydHhyZWYKMjg4CiUlRU9G";

  const loadSample = () => {
    setInput(sampleBase64);
    setError("");
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl("");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
            {t("base64PdfTitle", { defaultValue: "Base64 to PDF Converter" })}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t("base64PdfDesc", { defaultValue: "Convert Base64-encoded strings back into readable PDF documents." })}
          </p>
        </div>
        <button
          onClick={loadSample}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          {t("loadSamplePdf", { defaultValue: "Paste Sample Base64" })}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("base64InputLabel", { defaultValue: "Base64 String" })}</span>
            <span className="text-[10px] text-slate-400 normal-case">{input.length} chars</span>
          </label>
          <textarea
            className="w-full h-80 md:h-[400px] p-4 font-mono text-sm border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-inner resize-y"
            placeholder="Paste your Base64 encoded PDF string here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Preview Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t("pdfPreviewLabel", { defaultValue: "PDF Document Preview" })}</span>
          </label>
          <div className="w-full h-80 md:h-[400px] border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-inner flex flex-col justify-center items-center">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-xl"
                title="PDF Preview"
              />
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-slate-600 flex flex-col items-center">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">
                  {t("pdfPreviewPlaceholder", { defaultValue: "Convert a valid string to load the PDF preview." })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-start gap-2.5 animate-pulse">
          <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xs font-mono text-rose-600 dark:text-rose-400 break-all">
            {error}
          </div>
        </div>
      )}

      {/* Operations */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleClear}
          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          {t("clear", { defaultValue: "Clear" })}
        </button>
        <button
          onClick={handleConvert}
          className="glow-button px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/30 dark:text-indigo-400 text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
        >
          {t("convert", { defaultValue: "Convert Base64" })}
        </button>
        {pdfUrl && (
          <button
            onClick={downloadPdf}
            className="glow-button px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t("downloadPdf", { defaultValue: "Download PDF" })}
          </button>
        )}
      </div>
    </div>
  );
}
