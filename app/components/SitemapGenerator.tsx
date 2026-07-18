"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export default function SitemapGenerator() {
  const [urlsInput, setUrlsInput] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/contact");
  const [defaultLastmod, setDefaultLastmod] = useState(new Date().toISOString().split("T")[0]);
  const [defaultChangefreq, setDefaultChangefreq] = useState("monthly");
  const [defaultPriority, setDefaultPriority] = useState("0.8");
  
  const [copySuccess, setCopySuccess] = useState(false);

  const generateSitemap = () => {
    const urls = urlsInput.split("\n").map(u => u.trim()).filter(u => u.length > 0);
    
    if (urls.length === 0) return "";
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    urls.forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      if (defaultLastmod) xml += `    <lastmod>${defaultLastmod}</lastmod>\n`;
      if (defaultChangefreq !== "none") xml += `    <changefreq>${defaultChangefreq}</changefreq>\n`;
      if (defaultPriority !== "none") xml += `    <priority>${defaultPriority}</priority>\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
    return xml;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSitemap());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([generateSitemap()], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
            Sitemap Configuration
          </h2>
          
          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">
              List of URLs (One per line)
            </label>
            <textarea 
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
              rows={8}
              className="w-full p-3 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary font-mono resize-y"
              placeholder="https://example.com/&#10;https://example.com/about"
            />
            <p className="text-xs text-secondary mt-1 text-right">{urlsInput.split("\n").filter(u => u.trim()).length} URLs detected</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Modified (lastmod)</label>
              <input 
                type="date"
                value={defaultLastmod}
                onChange={(e) => setDefaultLastmod(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Freq (changefreq)</label>
              <select 
                value={defaultChangefreq}
                onChange={(e) => setDefaultChangefreq(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              >
                <option value="none">Omit Tag</option>
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Priority</label>
              <select 
                value={defaultPriority}
                onChange={(e) => setDefaultPriority(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              >
                <option value="none">Omit Tag</option>
                <option value="0.0">0.0</option>
                <option value="0.1">0.1</option>
                <option value="0.2">0.2</option>
                <option value="0.3">0.3</option>
                <option value="0.4">0.4</option>
                <option value="0.5">0.5</option>
                <option value="0.6">0.6</option>
                <option value="0.7">0.7</option>
                <option value="0.8">0.8</option>
                <option value="0.9">0.9</option>
                <option value="1.0">1.0</option>
              </select>
            </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
             <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-1">How it works</h3>
             <p className="text-xs text-indigo-600 dark:text-indigo-400">Paste your URLs in the box above. The generator will create a valid XML sitemap using the global attributes configured. You can copy the code or download it directly as an XML file.</p>
          </div>

        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Generated XML</label>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="secondary" size="sm">
                Download .xml
              </Button>
              <Button onClick={handleCopy} variant="primary" size="sm">
                {copySuccess ? "Copied!" : "Copy Code"}
              </Button>
            </div>
          </div>
          <textarea 
            readOnly
            value={generateSitemap()}
            className="w-full flex-1 min-h-[400px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 focus:outline-none whitespace-pre"
          />
        </div>

      </div>
    </div>
  );
}
