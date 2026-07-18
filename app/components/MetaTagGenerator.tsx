"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

// Helper to escape HTML to prevent breaking tags
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("My Awesome Website");
  const [description, setDescription] = useState("This is the best website ever. It has everything you need to succeed.");
  const [keywords, setKeywords] = useState("website, awesome, tool");
  const [author, setAuthor] = useState("John Doe");
  const [imageUrl, setImageUrl] = useState("https://example.com/image.jpg");
  const [siteName, setSiteName] = useState("AwesomeSite");
  const [siteUrl, setSiteUrl] = useState("https://example.com/");
  const [copySuccess, setCopySuccess] = useState(false);

  const generateKeywords = () => {
    const text = `${title} ${description}`.toLowerCase();
    const words = text.replace(/[^a-z0-9\s]/g, "").split(/\s+/);
    const stopWords = new Set(["this", "is", "the", "a", "an", "and", "or", "but", "it", "has", "to", "for", "with", "on", "in", "of", "you", "my", "your"]);
    const uniqueKeywords = Array.from(new Set(words.filter(w => w.length > 2 && !stopWords.has(w))));
    setKeywords(uniqueKeywords.slice(0, 10).join(", "));
  };

  const applyTemplate = (type: "blog" | "product" | "portfolio") => {
    if (type === "blog") {
      setTitle("Top 10 Web Development Tips - TechBlog");
      setDescription("Learn the top 10 web development tips to improve your coding speed and build better applications today.");
      setKeywords("web development, coding tips, programming, javascript, tech blog");
      setAuthor("Jane Smith");
      setSiteName("TechBlog");
    } else if (type === "product") {
      setTitle("SuperFast SSD 2TB - Buy Now | TechStore");
      setDescription("Upgrade your PC with the SuperFast SSD 2TB. Experience blazing fast read and write speeds. Order now for free shipping!");
      setKeywords("ssd, 2tb ssd, storage, techstore, computer parts, fast ssd");
      setAuthor("TechStore");
      setSiteName("TechStore");
    } else if (type === "portfolio") {
      setTitle("Alex Doe | Creative Designer & Developer");
      setDescription("Welcome to the portfolio of Alex Doe. Check out my latest projects in web design, branding, and full-stack development.");
      setKeywords("portfolio, designer, developer, web design, branding, ui ux");
      setAuthor("Alex Doe");
      setSiteName("Alex Doe Portfolio");
    }
  };

  const generateMetaTags = () => {
    return `<!-- Primary Meta Tags -->
<title>${escapeHtml(title)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="title" content="${escapeHtml(title)}" />
<meta name="description" content="${escapeHtml(description)}" />
${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ""}
${author ? `<meta name="author" content="${escapeHtml(author)}" />` : ""}
${siteUrl ? `<link rel="canonical" href="${escapeHtml(siteUrl)}" />` : ""}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
${siteUrl ? `<meta property="og:url" content="${escapeHtml(siteUrl)}" />` : ""}
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
${imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : ""}
${siteName ? `<meta property="og:site_name" content="${escapeHtml(siteName)}" />` : ""}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
${siteUrl ? `<meta property="twitter:url" content="${escapeHtml(siteUrl)}" />` : ""}
<meta property="twitter:title" content="${escapeHtml(title)}" />
<meta property="twitter:description" content="${escapeHtml(description)}" />
${imageUrl ? `<meta property="twitter:image" content="${escapeHtml(imageUrl)}" />` : ""}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([generateMetaTags()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-4 md:p-6">
      
      {/* Templates */}
      <div className="mb-6 flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-secondary uppercase tracking-wider mr-2">Templates:</span>
        <Button variant="outline" size="sm" onClick={() => applyTemplate("blog")} aria-label="Apply Blog Template">Blog Post</Button>
        <Button variant="outline" size="sm" onClick={() => applyTemplate("product")} aria-label="Apply Product Page Template">Product Page</Button>
        <Button variant="outline" size="sm" onClick={() => applyTemplate("portfolio")} aria-label="Apply Portfolio Template">Portfolio</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
            Meta Tag Editor
          </h2>
          
          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider flex justify-between">
              <span>Site Title</span>
              <span className={title.length > 60 ? "text-rose-500" : ""}>{title.length}/60 chars</span>
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              placeholder="Your website title..."
              aria-label="Site Title Input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider flex justify-between">
              <span>Site Description</span>
              <span className={description.length > 160 ? "text-rose-500" : ""}>{description.length}/160 chars</span>
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary resize-none"
              placeholder="Your website description..."
              aria-label="Site Description Input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider flex justify-between items-center">
                <span>Keywords</span>
                <button onClick={generateKeywords} className="text-[10px] text-indigo-500 hover:underline" aria-label="Auto-generate Keywords">Auto-generate</button>
              </label>
              <input 
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
                placeholder="seo, tools, fast"
                aria-label="Keywords Input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Author</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
                placeholder="Jane Doe"
                aria-label="Author Input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Site URL</label>
              <input 
                type="text"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
                placeholder="https://example.com/"
                aria-label="Site URL Input"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Site Name</label>
              <input 
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
                placeholder="Brand Name"
                aria-label="Site Name Input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Image URL (For Socials)</label>
            <input 
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              placeholder="https://..."
              aria-label="Image URL Input"
            />
          </div>

        </div>

        {/* Output & Preview */}
        <div className="flex flex-col gap-6">
          <div>
             <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <span className="w-2 h-6 bg-teal-500 rounded-full inline-block"></span>
              Live Preview
            </h2>
            
            {/* Google Snippet Preview */}
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl mb-4 font-sans shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center">🌐</div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-800 dark:text-slate-200 leading-tight truncate w-48">{siteName || "Example"}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{siteUrl || "https://example.com/"}</span>
                </div>
              </div>
              <div className="text-blue-800 dark:text-blue-400 text-lg sm:text-xl font-medium truncate mb-1 cursor-pointer hover:underline">
                {title || "Your Title Here"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {description || "Your description will appear here..."}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Generated Meta Tags</label>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="secondary" size="sm" aria-label="Download HTML">
                  Download .html
                </Button>
                <Button onClick={handleCopy} variant="primary" size="sm" aria-label="Copy Code">
                  {copySuccess ? "Copied!" : "Copy Code"}
                </Button>
              </div>
            </div>
            <textarea 
              readOnly
              value={generateMetaTags()}
              className="w-full flex-1 min-h-[250px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 focus:outline-none"
              aria-label="Generated Meta Tags output"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
