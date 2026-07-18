"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BatchItem {
  id: string;
  name: string;
  raw: string;
  pdfUrl: string | null;
  error: string | null;
  status: "idle" | "converting" | "done" | "error";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const cleanBase64 = (raw: string): string => {
  let s = raw.trim();
  // Strip data URI prefix (case-insensitive, handle multiline with replace)
  s = s.replace(/^data:[^;]+;base64,/i, "");
  return s.replace(/\s/g, "");
};

const validateBase64 = (s: string): { ok: boolean; hint?: string } => {
  if (!s) return { ok: false, hint: "Input is empty. Paste a Base64-encoded PDF string or drop a file." };
  if (s.length < 20) return { ok: false, hint: "String is too short to be a valid PDF." };
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(s))
    return { ok: false, hint: "String contains invalid Base64 characters. Ensure there are no extra spaces or symbols." };
  if (s.length % 4 !== 0)
    return { ok: false, hint: "Base64 string length must be a multiple of 4. It may be truncated or corrupted." };
  return { ok: true };
};

const base64ToBlob = (b64: string): Blob => {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray.buffer as ArrayBuffer], { type: "application/pdf" });
};

const SAMPLE_B64 =
  "JVBERi0xLjQKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCjIgMCBvYmoKICA8PCAvVHlwZSAvUGFnZXMKICAgICAvS2lkcyBbIDMgMCBSIF0KICAgICAvQ291bnQgMQogID4+CmVuZG9iagozIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2UKICAgICAvUGFyZW50IDIgMCBSCiAgICAgL01lZGlhQm94IFsgMCAwIDU5NSA4NDIgXQogICAgIC9SZXNvdXJjZXMgPDwgPj4KICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKNCAwIG9iagogIDw8IC9MZW5ndGggOCA+PgpzdHJlYW0KCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAwNzAgMDAwMDAgbC4KMDAwMDAwMDEyMSAwMDAwMCBuIAowMDAwMDAwMjM5IDAwMDAwIG4gCnRyYWlsZXIKICA8PCAvU2l6ZSA1CiAgICAgL1Jvb3QgMSAwIFIKICA+PgpzdGFydHhyZWYKMjg4CiUlRU9G";

// ─── DropZone ─────────────────────────────────────────────────────────────────
function DropZone({ onFile }: { onFile: (content: string, name: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => onFile((ev.target?.result as string) ?? "", file.name);
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach(readFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach(readFile);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-5 px-4 text-center transition-all duration-200 select-none ${
        dragging
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.01]"
          : "border-slate-300 dark:border-slate-700 bg-background hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10"
      }`}
      role="button"
      aria-label="Drop a .txt or .json file"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.json"
        multiple
        className="hidden"
        onChange={handleFileInput}
        id="base64-file-input"
      />
      <svg
        className={`w-8 h-8 transition-colors ${dragging ? "text-indigo-500" : "text-secondary"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="text-xs font-semibold text-secondary">
        {dragging ? "Release to load file…" : "Drop .txt file here or click to browse"}
      </p>
      <p className="text-[10px] text-secondary">Supports multiple files for batch conversion</p>
    </div>
  );
}

// ─── PdfPreview ───────────────────────────────────────────────────────────────
function PdfPreview({ pdfUrl }: { pdfUrl: string }) {
  const [zoom, setZoom] = useState(100);
  const [rotate, setRotate] = useState(0);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-auto">Preview Controls</span>
        <Button
          onClick={() => setZoom((z) => Math.max(z - 25, 50))}
          disabled={zoom <= 50}
          title="Zoom out"
          aria-label="Zoom out"
          className="p-1.5 rounded-lg border border-panel-border hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </Button>
        <span className="text-xs font-mono text-secondary min-w-[3rem] text-center">{zoom}%</span>
        <Button
          onClick={() => setZoom((z) => Math.min(z + 25, 200))}
          disabled={zoom >= 200}
          title="Zoom in"
          aria-label="Zoom in"
          className="p-1.5 rounded-lg border border-panel-border hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <Button
          onClick={() => setRotate((r) => (r + 90) % 360)}
          title="Rotate 90° clockwise"
          aria-label="Rotate clockwise"
          className="p-1.5 rounded-lg border border-panel-border hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>
      <div className="relative flex-1 overflow-auto rounded-xl border border-panel-border bg-slate-100 dark:bg-slate-950 shadow-inner min-h-[300px]">
        <div
          className="transition-all duration-300"
          style={{ transform: `scale(${zoom / 100}) rotate(${rotate}deg)`, transformOrigin: "top center", width: "100%", height: "100%" }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full min-h-[300px] rounded-xl"
            title="PDF Preview"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

// ─── BatchItemRow ─────────────────────────────────────────────────────────────
function BatchItemRow({ item, onDownload, onRemove }: { item: BatchItem; onDownload: (item: BatchItem) => void; onRemove: (id: string) => void }) {
  const statusColor: Record<BatchItem["status"], string> = {
    idle: "bg-slate-400",
    converting: "bg-amber-400 animate-pulse",
    done: "bg-emerald-500",
    error: "bg-rose-500",
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-panel border border-panel-border text-sm transition-all hover:shadow-sm">
      <span className={`w-2 h-2 rounded-full shrink-0 ${statusColor[item.status]}`} />
      <span className="flex-1 font-mono text-xs text-primary truncate min-w-0" title={item.name}>{item.name}</span>
      <span className="text-[10px] text-slate-400 shrink-0">{Math.round(item.raw.length / 1024)}KB</span>
      {item.status === "done" && (
        <Button onClick={() => onDownload(item)} className="px-2.5 py-1 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer shrink-0">
          ↓ PDF
        </Button>
      )}
      {item.status === "error" && (
        <span className="text-[10px] text-rose-500 shrink-0 max-w-[120px] truncate" title={item.error ?? ""}>{item.error}</span>
      )}
      <Button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-rose-500 transition cursor-pointer shrink-0" aria-label="Remove item">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Base64ToPdf() {

  const [input, setInput] = useState("");
  const [error, setError] = useState<{ msg: string; hint?: string } | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [converting, setConverting] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  const [batchMode, setBatchMode] = useState(false);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);

  useEffect(() => {
    return () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); };
  }, [pdfUrl]);

  useEffect(() => {
    return () => { batchItems.forEach((it) => { if (it.pdfUrl) URL.revokeObjectURL(it.pdfUrl); }); };
  }, [batchItems]);

  const handleConvert = useCallback(() => {
    setError(null);
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(""); }
    setPreviewReady(false);

    const clean = cleanBase64(input);
    const validation = validateBase64(clean);
    if (!validation.ok) {
      setError({ msg: "Invalid Base64 input", hint: validation.hint });
      return;
    }

    setConverting(true);
    setTimeout(() => {
      try {
        const blob = base64ToBlob(clean);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setPreviewReady(true);
      } catch {
        setError({
          msg: "Conversion failed",
          hint: "The Base64 string could not be decoded into a valid PDF. Verify the string is not truncated or corrupted.",
        });
      } finally {
        setConverting(false);
      }
    }, 50);
  }, [input, pdfUrl]);

  const downloadPdf = (url: string = pdfUrl, filename = "document.pdf") => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    setInput(""); setError(null);
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(""); }
    setPreviewReady(false);
  };

  const loadSample = () => {
    setInput(SAMPLE_B64); setError(null);
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(""); }
    setPreviewReady(false);
  };

  const extractBase64FromContent = (content: string): string => {
    let extracted = content.trim();
    try {
      const parsed = JSON.parse(extracted);
      if (typeof parsed === "string") return parsed;
      if (parsed && typeof parsed.base64 === "string") return parsed.base64;
      if (parsed && typeof parsed.data === "string") return parsed.data;
    } catch { /* treat as plain text */ }
    return extracted;
  };

  const handleDropFileSingle = (content: string) => {
    setInput(extractBase64FromContent(content));
    setError(null);
    if (pdfUrl) { URL.revokeObjectURL(pdfUrl); setPdfUrl(""); }
    setPreviewReady(false);
  };

  const handleBatchFile = (content: string, name: string) => {
    const extracted = content.trim();
    try {
      const parsed = JSON.parse(extracted);
      if (Array.isArray(parsed)) {
        parsed.forEach((entry: unknown, idx: number) => {
          const raw = typeof entry === "string" ? entry : ((entry as Record<string, string>)?.base64 ?? (entry as Record<string, string>)?.data ?? "");
          if (raw) {
            setBatchItems((prev) => [...prev, { id: `${Date.now()}-${idx}`, name: `${name}[${idx}]`, raw, pdfUrl: null, error: null, status: "idle" }]);
          }
        });
        return;
      }
    } catch { /* not json array */ }
    setBatchItems((prev) => [...prev, { id: `${Date.now()}`, name, raw: extractBase64FromContent(content), pdfUrl: null, error: null, status: "idle" }]);
  };

  const convertAllBatch = () => {
    setBatchItems((prev) =>
      prev.map((item) => {
        if (item.status === "done") return item;
        const clean = cleanBase64(item.raw);
        const validation = validateBase64(clean);
        if (!validation.ok) return { ...item, status: "error" as const, error: validation.hint ?? "Invalid Base64" };
        try {
          const blob = base64ToBlob(clean);
          const url = URL.createObjectURL(blob);
          return { ...item, pdfUrl: url, status: "done" as const, error: null };
        } catch {
          return { ...item, status: "error" as const, error: "Could not decode to PDF" };
        }
      })
    );
  };

  const removeBatchItem = (id: string) => {
    setBatchItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.pdfUrl) URL.revokeObjectURL(item.pdfUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearBatch = () => {
    batchItems.forEach((it) => { if (it.pdfUrl) URL.revokeObjectURL(it.pdfUrl); });
    setBatchItems([]);
  };

  const downloadAllBatch = () => {
    batchItems.filter((i) => i.status === "done" && i.pdfUrl).forEach((i) => {
      downloadPdf(i.pdfUrl!, i.name.replace(/\.[^.]+$/, "") + ".pdf");
    });
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* ── Header Section ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block" />
            {"Base64 to PDF Converter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Convert Base64-encoded strings back into readable PDF documents."}
          </p>
        </div>
        {/* Security badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl shrink-0">
          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">100% Client-Side · No Upload</span>
        </div>
      </div>

      {/* Mode Toggle + Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="inline-flex rounded-xl border border-panel-border bg-slate-100 dark:bg-slate-900 p-1 gap-1">
          <Button
            onClick={() => setBatchMode(false)}
            id="mode-single"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${!batchMode ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow" : "text-secondary hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            Single
          </Button>
          <Button
            onClick={() => setBatchMode(true)}
            id="mode-batch"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${batchMode ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow" : "text-secondary hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            Batch
          </Button>
        </div>

        {!batchMode && (
          <Button onClick={loadSample} id="load-sample-btn" variant="secondary">
            📄 Load Sample
          </Button>
        )}
        {batchMode && batchItems.length > 0 && (
          <>
            <Button onClick={clearBatch} id="clear-batch-btn" variant="secondary">
              🗑 Clear All
            </Button>
            <Button onClick={downloadAllBatch} disabled={!batchItems.some((i) => i.status === "done")} id="download-all-btn"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition cursor-pointer">
              ⬇ Download All
            </Button>
          </>
        )}
      </div>

      {/* ── SINGLE MODE ── */}
      {!batchMode && (
        <>
          <div className="mb-4">
            <DropZone onFile={(content) => handleDropFileSingle(content)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center justify-between">
                <span>{"Base64 String"}</span>
                <span className="text-[10px] text-slate-400 normal-case">{input.length.toLocaleString()} chars</span>
              </label>
              <textarea
                id="base64-input-textarea"
                className="w-full h-72 md:h-[380px] p-4 font-mono text-xs sm:text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-inner resize-y text-primary placeholder:text-slate-400"
                placeholder="Paste your Base64 encoded PDF string here, or drop a .txt / .json file above…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>

            {/* Preview Panel */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center justify-between">
                <span>{"PDF Document Preview"}</span>
                {pdfUrl && <span className="text-[10px] normal-case text-emerald-600 dark:text-emerald-400 font-semibold">✓ Ready</span>}
              </label>
              <div className="w-full h-72 md:h-[380px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
                {pdfUrl && previewReady ? (
                  <div className="p-2 flex-1 flex flex-col overflow-hidden">
                    <PdfPreview pdfUrl={pdfUrl} />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center p-8 text-center text-secondary">
                    {converting ? (
                      <>
                        <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-3" />
                        <p className="text-sm font-medium">Converting…</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">{"Convert a valid Base64 string to preview the PDF here."}</p>
                        <p className="text-[11px] mt-1 text-slate-300 dark:text-slate-700">Zoom · Rotate · controls appear after conversion</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">{error.msg}</p>
                {error.hint && <p className="text-xs text-rose-500/80 dark:text-rose-400/70 mt-0.5">💡 {error.hint}</p>}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 mt-5 pt-5 border-t border-panel-border/50">
            <Button onClick={handleClear} id="clear-btn" variant="secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {"Clear"}
            </Button>

            <Button
              onClick={handleConvert}
              disabled={converting}
              id="convert-btn"
              className="px-6 py-2.5 bg-indigo-100/60 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 dark:text-indigo-300 text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {converting ? (
                <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              )}
              {converting ? "Converting…" : "Convert Base64"}
            </Button>

            {pdfUrl && (
              <Button onClick={() => downloadPdf()} id="download-btn" className="glow-button px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition shadow-md cursor-pointer flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {"Download PDF"}
              </Button>
            )}
          </div>
        </>
      )}

      {/* ── BATCH MODE ── */}
      {batchMode && (
        <div className="flex flex-col gap-4">
          <DropZone onFile={handleBatchFile} />

          {batchItems.length > 0 ? (
            <>
              <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
                {batchItems.map((item) => (
                  <BatchItemRow
                    key={item.id}
                    item={item}
                    onDownload={(it) => downloadPdf(it.pdfUrl!, it.name.replace(/\.[^.]+$/, "") + ".pdf")}
                    onRemove={removeBatchItem}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-panel-border/50">
                <span className="text-xs text-secondary">
                  {batchItems.filter((i) => i.status === "done").length} / {batchItems.length} converted
                </span>
                <Button onClick={convertAllBatch} id="batch-convert-btn" variant="primary">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Convert All
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-secondary">
              <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-sm font-medium">Drop multiple .txt or .json files above to start batch conversion</p>
            </div>
          )}
        </div>
      )}

      {/* Trust & Security (consolidated, one place) */}
      <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-700/40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "🔒", title: "Client-Side Only", desc: "Your data never leaves your browser. Zero server uploads." },
            { icon: "⚡", title: "Instant Conversion", desc: "All processing happens locally in milliseconds." },
            { icon: "📄", title: "Standard PDF", desc: "Outputs a valid PDF document ready to open in any viewer." },
          ].map((card) => (
            <div key={card.title} className="flex items-start gap-2.5 p-3 rounded-xl bg-background border border-panel-border">
              <span className="text-lg mt-0.5">{card.icon}</span>
              <div>
                <p className="text-xs font-bold text-primary">{card.title}</p>
                <p className="text-[11px] text-secondary mt-0.5">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
