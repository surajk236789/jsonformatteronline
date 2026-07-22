"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";

// Utility functions for color conversion
function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
}

export default function ColorPicker() {
  const [hex, setHex] = useState("#6366F1"); // Default Indigo-500
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Sync colors when HEX changes
  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    // basic validation
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex) || /^#[0-9A-Fa-f]{3}$/.test(newHex)) {
      const newRgb = hexToRgb(newHex);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const handleHslChange = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="w-2.5 h-6 bg-pink-500 rounded-full inline-block"></span>
          Color Picker & Converter
        </h2>
        <p className="text-xs text-secondary mt-1">
          Pick a color or enter a value. Instantly convert between HEX, RGB, and HSL formats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Preview & Native Picker */}
        <div className="flex flex-col items-center justify-center p-8 border border-panel-border rounded-xl bg-panel shadow-inner relative overflow-hidden group">
          <div 
            className="w-full h-48 md:h-64 rounded-xl shadow-md transition-colors duration-200 flex items-center justify-center relative cursor-pointer"
            style={{ backgroundColor: hex }}
            onClick={() => document.getElementById('native-color-picker')?.click()}
          >
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg font-mono font-bold text-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Click to pick color
            </div>
          </div>
          
          <input
            id="native-color-picker"
            type="color"
            value={hex.substring(0, 7)} // Ensure 7 chars for native input
            onChange={(e) => handleHexChange(e.target.value)}
            className="absolute opacity-0 w-0 h-0"
          />
        </div>

        {/* Inputs & Values */}
        <div className="flex flex-col gap-6">
          {/* HEX Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 p-3 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-pink-500 uppercase"
              />
              <Button 
                variant="secondary" 
                onClick={() => copyToClipboard(hex, 'HEX')}
                className="w-24 flex items-center justify-center"
              >
                {copiedFormat === 'HEX' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* RGB Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">RGB</label>
            <div className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <input
                  type="number" min="0" max="255" value={rgb.r}
                  onChange={(e) => handleRgbChange(Number(e.target.value), rgb.g, rgb.b)}
                  className="w-1/3 p-3 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="number" min="0" max="255" value={rgb.g}
                  onChange={(e) => handleRgbChange(rgb.r, Number(e.target.value), rgb.b)}
                  className="w-1/3 p-3 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="number" min="0" max="255" value={rgb.b}
                  onChange={(e) => handleRgbChange(rgb.r, rgb.g, Number(e.target.value))}
                  className="w-1/3 p-3 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <Button 
                variant="secondary" 
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
                className="w-24 flex items-center justify-center"
              >
                {copiedFormat === 'RGB' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* HSL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">HSL</label>
            <div className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <input
                  type="number" min="0" max="360" value={hsl.h}
                  onChange={(e) => handleHslChange(Number(e.target.value), hsl.s, hsl.l)}
                  className="w-1/3 p-3 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                  title="Hue (0-360)"
                />
                <div className="w-1/3 relative">
                  <input
                    type="number" min="0" max="100" value={hsl.s}
                    onChange={(e) => handleHslChange(hsl.h, Number(e.target.value), hsl.l)}
                    className="w-full p-3 pr-6 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                    title="Saturation (0-100%)"
                  />
                  <span className="absolute right-3 top-3 text-secondary text-sm">%</span>
                </div>
                <div className="w-1/3 relative">
                  <input
                    type="number" min="0" max="100" value={hsl.l}
                    onChange={(e) => handleHslChange(hsl.h, hsl.s, Number(e.target.value))}
                    className="w-full p-3 pr-6 font-mono text-sm border border-panel-border rounded-xl bg-panel text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                    title="Lightness (0-100%)"
                  />
                  <span className="absolute right-3 top-3 text-secondary text-sm">%</span>
                </div>
              </div>
              <Button 
                variant="secondary" 
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                className="w-24 flex items-center justify-center"
              >
                {copiedFormat === 'HSL' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
