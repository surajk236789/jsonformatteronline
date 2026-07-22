"use client";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "./ui/Button";
import { Copy, Download, Upload, Image as ImageIcon, Check } from "lucide-react";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setFileName(file.name);
    setFileSize(formatSize(file.size));
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Read as base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Re-use logic
      const dt = new DataTransfer();
      dt.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dt.files;
        // manually trigger change logic
        const changeEvent = { target: { files: dt.files } } as any;
        handleFileChange(changeEvent);
      }
    }
  };

  const handleCopy = useCallback(() => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [base64]);

  const handleDownload = useCallback(() => {
    if (!base64) return;
    const blob = new Blob([base64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image-base64.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [base64]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-pink-500 rounded-full inline-block" />
            {"Image to Base64 Converter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Convert images to Base64 strings for inline CSS or HTML instantly."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={triggerFileInput} className="bg-pink-600 hover:bg-pink-700 text-white shadow-md shadow-pink-500/20">
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Upload / Preview */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
            {"Image Preview"}
          </label>
          
          <div 
            className={`relative w-full h-80 md:h-[400px] border-2 border-dashed rounded-xl overflow-hidden shadow-inner flex flex-col items-center justify-center transition-all duration-300 ${
              previewUrl ? 'border-panel-border bg-background' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer'
            }`}
            onClick={!previewUrl ? triggerFileInput : undefined}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain p-2" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 text-white text-xs p-2 flex justify-between items-center backdrop-blur-sm">
                  <span className="truncate max-w-[200px]">{fileName}</span>
                  <span className="font-mono">{fileSize}</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-secondary p-6 text-center">
                <ImageIcon className="w-12 h-12 mb-4 text-slate-400 dark:text-slate-500" />
                <p className="text-sm font-semibold mb-1">Click to upload or drag & drop</p>
                <p className="text-xs">PNG, JPG, GIF, SVG or WEBP</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Base64 Output"}</span>
            {base64 && <span className="text-[10px] text-slate-400 normal-case">{base64.length.toLocaleString()} chars</span>}
          </label>
          
          <div className="relative w-full h-80 md:h-[400px] border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
            {base64 ? (
              <textarea
                readOnly
                value={base64}
                className="w-full h-full p-4 font-mono text-sm leading-relaxed bg-transparent focus:outline-none resize-none text-slate-700 dark:text-slate-300 selection:bg-pink-200 dark:selection:bg-pink-900/50 break-all"
                spellCheck={false}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-secondary">
                <svg className="w-12 h-12 mb-3 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm font-medium">
                  {"Converted Base64 string will appear here."}
                </p>
              </div>
            )}

            {/* Action buttons overlay */}
            {base64 && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <Button
                  onClick={handleCopy}
                  title="Copy Base64"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  onClick={handleDownload}
                  title="Download as .txt"
                  className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
