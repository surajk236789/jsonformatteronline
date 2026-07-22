"use client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/Button";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("L");
  const [includeMargin, setIncludeMargin] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (!svgRef.current) return;
    
    // Get SVG data
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set canvas dimensions based on a larger scale for high quality download
    const scale = 5;
    const size = 256; 
    canvas.width = size * scale;
    canvas.height = size * scale;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Export to PNG
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block" />
            {"QR Code Generator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Generate custom, high-quality QR codes instantly."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              {"Content (URL or Text)"}
            </label>
            <textarea
              className="w-full h-32 p-4 font-sans text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
              placeholder="https://example.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                {"Foreground Color"}
              </label>
              <div className="flex items-center gap-2 border border-panel-border rounded-xl bg-panel p-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
                />
                <span className="text-sm font-mono text-secondary">{fgColor.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
                {"Background Color"}
              </label>
              <div className="flex items-center gap-2 border border-panel-border rounded-xl bg-panel p-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
                />
                <span className="text-sm font-mono text-secondary">{bgColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              {"Error Correction Level"}
            </label>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-full sm:w-fit">
              {(["L", "M", "Q", "H"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    level === l
                      ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {l === "L" ? "Low (7%)" : l === "M" ? "Medium (15%)" : l === "Q" ? "Quartile (25%)" : "High (30%)"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-secondary">
              <input
                type="checkbox"
                checked={includeMargin}
                onChange={(e) => setIncludeMargin(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              Include White Margin
            </label>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[400px]">
          {text.trim() ? (
            <div className="flex flex-col items-center gap-8">
              <div 
                className="p-4 rounded-xl shadow-lg bg-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeSVG
                  value={text}
                  size={256}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={level}
                  includeMargin={includeMargin}
                  ref={svgRef}
                />
              </div>
              <Button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 w-full sm:w-auto px-8">
                <Download className="w-4 h-4 mr-2" />
                Download High-Res PNG
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-secondary">
              <div className="w-64 h-64 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Enter some text to generate a QR code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
