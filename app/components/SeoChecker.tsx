"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";

interface SeoResult {
  score: { value: number; color: "green" | "yellow" | "red"; msg: string };
  title: { text: string; length: number; status: "good" | "warning" | "error"; msg: string };
  description: { text: string; length: number; status: "good" | "warning" | "error"; msg: string };
  h1: { count: number; texts: string[]; status: "good" | "warning" | "error"; msg: string };
  headings: Record<string, number>;
  images: { total: number; missingAlt: number; status: "good" | "warning" | "error"; msg: string };
  openGraph: { present: boolean; title: boolean; desc: boolean; image: boolean; status: "good" | "warning" | "error"; msg: string };
  wordCount: { count: number; status: "good" | "warning" | "error"; msg: string };
  keywords: { present: boolean; text: string; count: number; status: "good" | "warning"; msg: string };
  links: { total: number; internal: number; external: number; missingHref: number; status: "good" | "warning" | "error"; msg: string };
  robots: { present: boolean; status: "good" | "error"; msg: string };
  sitemap: { present: boolean; status: "good" | "warning"; msg: string };
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "good") return <span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full">✅</span>;
  if (status === "warning") return <span className="text-amber-500 bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full">⚠️</span>;
  return <span className="text-rose-500 bg-rose-100 dark:bg-rose-900/30 p-1.5 rounded-full">❌</span>;
};

export default function SeoChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SeoResult | null>(null);

  const analyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    let parsedBaseUrl: URL | null = null;
    try {
      parsedBaseUrl = new URL(targetUrl);
    } catch {
      setError("Invalid URL format.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const robotsUrl = new URL("/robots.txt", parsedBaseUrl.origin).href;
      const sitemapUrl = new URL("/sitemap.xml", parsedBaseUrl.origin).href;

      const [mainRes, robotsRes, sitemapRes] = await Promise.all([
        fetch(`/api/fetch-html?url=${encodeURIComponent(targetUrl)}`),
        fetch(`/api/fetch-html?url=${encodeURIComponent(robotsUrl)}`).catch(() => ({ ok: false })),
        fetch(`/api/fetch-html?url=${encodeURIComponent(sitemapUrl)}`).catch(() => ({ ok: false }))
      ]);

      if (!mainRes.ok) {
        const errData = await mainRes.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to fetch URL (${mainRes.status})`);
      }
      
      const htmlText = await mainRes.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");

      let totalScore = 0;

      // 1. Title (20 pts)
      const titleEl = doc.querySelector("title");
      const titleText = titleEl ? titleEl.textContent?.trim() || "" : "";
      const titleLen = titleText.length;
      let titleStatus: "good" | "warning" | "error" = "error";
      let titleMsg = "Missing title tag.";
      if (titleLen > 0) {
        if (titleLen >= 30 && titleLen <= 60) {
          titleStatus = "good";
          titleMsg = "Optimal length (30-60 characters).";
          totalScore += 20;
        } else {
          titleStatus = "warning";
          titleMsg = `Suboptimal length (${titleLen} chars). Keep between 30-60.`;
          totalScore += 10;
        }
      }

      // 2. Description (20 pts)
      const descEl = doc.querySelector("meta[name='description']");
      const descText = descEl ? descEl.getAttribute("content")?.trim() || "" : "";
      const descLen = descText.length;
      let descStatus: "good" | "warning" | "error" = "error";
      let descMsg = "Missing meta description.";
      if (descLen > 0) {
        if (descLen >= 50 && descLen <= 160) {
          descStatus = "good";
          descMsg = "Optimal length (50-160 characters).";
          totalScore += 20;
        } else {
          descStatus = "warning";
          descMsg = `Suboptimal length (${descLen} chars). Keep between 50-160.`;
          totalScore += 10;
        }
      }

      // 3. H1 Tags (15 pts)
      const h1Els = Array.from(doc.querySelectorAll("h1"));
      const h1Texts = h1Els.map(el => el.textContent?.trim() || "");
      let h1Status: "good" | "warning" | "error" = "error";
      let h1Msg = "Missing H1 tag.";
      if (h1Els.length === 1) {
        h1Status = "good";
        h1Msg = "Exactly one H1 tag found.";
        totalScore += 10;
      } else if (h1Els.length > 1) {
        h1Status = "warning";
        h1Msg = `${h1Els.length} H1 tags found. It is best practice to use only one.`;
        totalScore += 5;
      }

      // Headings distribution
      const headings: Record<string, number> = { H1: h1Els.length, H2: 0, H3: 0, H4: 0, H5: 0, H6: 0 };
      ["h2", "h3", "h4", "h5", "h6"].forEach(tag => {
        headings[tag.toUpperCase()] = doc.querySelectorAll(tag).length;
      });

      // 4. Images (15 pts)
      const imgEls = Array.from(doc.querySelectorAll("img"));
      const missingAlt = imgEls.filter(img => !img.hasAttribute("alt") || img.getAttribute("alt")?.trim() === "").length;
      let imgStatus: "good" | "warning" | "error" = "good";
      let imgMsg = imgEls.length === 0 ? "No images found." : "All images have alt attributes.";
      
      if (imgEls.length === 0) {
        totalScore += 10; 
      } else if (missingAlt === 0) {
        totalScore += 10;
      } else {
        imgStatus = missingAlt === imgEls.length ? "error" : "warning";
        imgMsg = `${missingAlt} out of ${imgEls.length} images are missing alt attributes.`;
        totalScore += 5;
      }

      // 5. OpenGraph (10 pts)
      const ogTitle = !!doc.querySelector("meta[property='og:title']");
      const ogDesc = !!doc.querySelector("meta[property='og:description']");
      const ogImage = !!doc.querySelector("meta[property='og:image']");
      const ogPresent = ogTitle || ogDesc || ogImage;
      let ogStatus: "good" | "warning" | "error" = "error";
      let ogMsg = "OpenGraph tags are missing.";
      if (ogTitle && ogDesc && ogImage) {
        ogStatus = "good";
        ogMsg = "Essential OpenGraph tags are present.";
        totalScore += 10;
      } else if (ogPresent) {
        ogStatus = "warning";
        ogMsg = "Some OpenGraph tags are missing.";
        totalScore += 5;
      }

      // 6. Word Count (10 pts)
      const bodyText = doc.body.innerText || "";
      const words = bodyText.replace(/\s+/g, " ").trim().split(" ");
      const wordCount = bodyText.trim() === "" ? 0 : words.length;
      let wcStatus: "good" | "warning" | "error" = "warning";
      let wcMsg = "Low word count. Consider adding more content.";
      if (wordCount > 300) {
        wcStatus = "good";
        wcMsg = "Good amount of content on the page.";
        totalScore += 10;
      } else if (wordCount > 50) {
        totalScore += 5;
      } else if (wordCount === 0) {
        wcStatus = "error";
        wcMsg = "No readable text found on page.";
      }

      // 7. Keywords (Informational - 0 pts towards score because Google ignores them)
      const keywordsEl = doc.querySelector("meta[name='keywords']");
      const keywordsText = keywordsEl ? keywordsEl.getAttribute("content")?.trim() || "" : "";
      const keywordsCount = keywordsText ? keywordsText.split(",").length : 0;
      let kwStatus: "good" | "warning" = "good";
      let kwMsg = "No meta keywords found. This is perfectly fine (Google ignores them).";
      if (keywordsCount > 0) {
        kwStatus = "warning";
        kwMsg = `Found ${keywordsCount} keywords. Note: Google has ignored this tag for 15+ years. Avoid keyword stuffing.`;
      }

      // 8. Links (10 pts)
      const anchorEls = Array.from(doc.querySelectorAll("a"));
      let internalLinks = 0;
      let externalLinks = 0;
      let missingHref = 0;

      anchorEls.forEach(a => {
        const href = a.getAttribute("href");
        if (!href || href.trim() === "") {
          missingHref++;
        } else if (href.startsWith("http")) {
          if (parsedBaseUrl && href.startsWith(parsedBaseUrl.origin)) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } else {
          internalLinks++; // relative links
        }
      });

      if (anchorEls.length === 0) {
        totalScore += 10; // No penalty for no links
      } else if (missingHref === 0) {
        totalScore += 10;
      } else if (missingHref < anchorEls.length) {
        totalScore += 5;
      }

      let linkStatus: "good" | "warning" | "error" = "good";
      let linkMsg = `Found ${anchorEls.length} links (${internalLinks} internal, ${externalLinks} external).`;
      if (missingHref > 0) {
        linkStatus = missingHref === anchorEls.length ? "error" : "warning";
        linkMsg = `Found ${anchorEls.length} links, but ${missingHref} are missing a valid href attribute.`;
      }

      // 9. Robots.txt (5 pts)
      const hasRobots = (robotsRes as { ok: boolean }).ok;
      let robotsStatus: "good" | "error" = "error";
      let robotsMsg = "No robots.txt file found at the domain root.";
      if (hasRobots) {
        robotsStatus = "good";
        robotsMsg = "robots.txt file is present.";
        totalScore += 5;
      }

      // 10. Sitemap.xml (5 pts)
      const hasSitemap = (sitemapRes as { ok: boolean }).ok;
      let sitemapStatus: "good" | "warning" = "warning";
      let sitemapMsg = "No sitemap.xml file found at the domain root.";
      if (hasSitemap) {
        sitemapStatus = "good";
        sitemapMsg = "sitemap.xml file is present.";
        totalScore += 5;
      }

      // Calculate Score Color
      let scoreColor: "green" | "yellow" | "red" = "red";
      let scoreMsg = "Needs Significant Improvement";
      if (totalScore >= 80) {
        scoreColor = "green";
        scoreMsg = "Excellent SEO Health";
      } else if (totalScore >= 50) {
        scoreColor = "yellow";
        scoreMsg = "Average SEO Health - Room to Improve";
      }

      // Artificial delay to make the tool feel like it's doing heavy calculation (Labor Illusion)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResult({
        score: { value: totalScore, color: scoreColor, msg: scoreMsg },
        title: { text: titleText, length: titleLen, status: titleStatus, msg: titleMsg },
        description: { text: descText, length: descLen, status: descStatus, msg: descMsg },
        h1: { count: h1Els.length, texts: h1Texts, status: h1Status, msg: h1Msg },
        headings,
        images: { total: imgEls.length, missingAlt, status: imgStatus, msg: imgMsg },
        openGraph: { present: ogPresent, title: ogTitle, desc: ogDesc, image: ogImage, status: ogStatus, msg: ogMsg },
        wordCount: { count: wordCount, status: wcStatus, msg: wcMsg },
        keywords: { present: keywordsCount > 0, text: keywordsText, count: keywordsCount, status: kwStatus, msg: kwMsg },
        links: { total: anchorEls.length, internal: internalLinks, external: externalLinks, missingHref, status: linkStatus, msg: linkMsg },
        robots: { present: hasRobots, status: robotsStatus, msg: robotsMsg },
        sitemap: { present: hasSitemap, status: sitemapStatus, msg: sitemapMsg },
      });

    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Search Bar */}
      <div className="bg-panel border border-panel-border rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
        <form onSubmit={analyzeUrl} className="flex flex-col md:flex-row gap-4">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-background border border-panel-border rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-primary placeholder:text-secondary"
          />
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
          >
            {loading ? "Analyzing..." : "Analyze SEO"}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && result.score && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-8">
          
          {/* Overall Score */}
          <div className="bg-panel border border-panel-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 justify-center shadow-lg shadow-slate-100/50 dark:shadow-none">
            <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-[8px] ${
              result.score.color === "green" ? "border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10" : 
              result.score.color === "yellow" ? "border-amber-400 text-amber-500 bg-amber-50 dark:bg-amber-900/10" : 
              "border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-900/10"
            }`}>
              <span className="text-4xl font-black">{result.score.value}</span>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-primary mb-2">Overall SEO Score</h2>
              <p className={`text-lg font-bold ${
                result.score.color === "green" ? "text-emerald-500" : 
                result.score.color === "yellow" ? "text-amber-500" : "text-rose-500"
              }`}>
                {result.score.msg}
              </p>
              <p className="text-sm text-secondary mt-2 max-w-sm">
                This score is calculated based on on-page SEO factors including meta tags, heading structure, images, and content depth.
              </p>
            </div>
          </div>

          {/* Grid Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">📝</span> Page Title
                </h3>
                <StatusIcon status={result.title.status} />
              </div>
              {result.title.length > 0 ? (
                <div className="bg-background rounded-lg p-3 text-sm text-primary mb-3 font-medium break-words border border-slate-100 dark:border-slate-800">
                  {result.title.text}
                </div>
              ) : (
                <div className="text-sm text-secondary italic mb-3">No title tag found.</div>
              )}
              <p className="text-xs font-semibold text-secondary mb-1">
                Length: <span className={result.title.status === "good" ? "text-emerald-500" : "text-amber-500"}>{result.title.length} characters</span>
              </p>
              <p className="text-xs text-secondary">{result.title.msg}</p>
            </div>

            {/* Meta Description */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">🏷️</span> Meta Description
                </h3>
                <StatusIcon status={result.description.status} />
              </div>
              {result.description.length > 0 ? (
                <div className="bg-background rounded-lg p-3 text-sm text-primary mb-3 font-medium break-words border border-slate-100 dark:border-slate-800 line-clamp-3">
                  {result.description.text}
                </div>
              ) : (
                <div className="text-sm text-secondary italic mb-3">No meta description found.</div>
              )}
              <p className="text-xs font-semibold text-secondary mb-1">
                Length: <span className={result.description.status === "good" ? "text-emerald-500" : "text-amber-500"}>{result.description.length} characters</span>
              </p>
              <p className="text-xs text-secondary">{result.description.msg}</p>
            </div>

            {/* Keywords */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">🔑</span> Meta Keywords
                </h3>
                <StatusIcon status={result.keywords.status} />
              </div>
              {result.keywords.present ? (
                <div className="bg-background rounded-lg p-3 text-sm text-primary mb-3 font-medium break-words border border-slate-100 dark:border-slate-800 line-clamp-2">
                  {result.keywords.text}
                </div>
              ) : (
                <div className="text-sm text-secondary italic mb-3">No meta keywords tag found.</div>
              )}
              <p className="text-xs text-secondary">{result.keywords.msg}</p>
            </div>

            {/* Headings */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">H1</span> Headings
                </h3>
                <StatusIcon status={result.h1.status} />
              </div>
              <p className="text-sm text-secondary mb-4">{result.h1.msg}</p>
              
              {result.h1.texts.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">H1 Tags Used:</p>
                  <div className="space-y-2">
                    {result.h1.texts.map((text, i) => (
                      <div key={i} className="bg-background rounded-lg p-2 text-xs text-primary font-medium border border-slate-100 dark:border-slate-800 truncate">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {Object.entries(result.headings).map(([tag, count]) => (
                  <div key={tag} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-md">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{tag}</span>
                    <span className="text-xs font-medium text-primary">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Images & Media */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">🖼️</span> Images
                </h3>
                <StatusIcon status={result.images.status} />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-background border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-primary">{result.images.total}</div>
                  <div className="text-xs text-secondary font-medium uppercase tracking-wider">Total Images</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${result.images.missingAlt > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                    {result.images.missingAlt}
                  </div>
                  <div className="text-xs text-secondary font-medium uppercase tracking-wider">Missing Alt</div>
                </div>
              </div>
              <p className="text-xs text-secondary">{result.images.msg}</p>
            </div>

            {/* Links Analysis */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">🔗</span> Link Analysis
                </h3>
                <StatusIcon status={result.links.status} />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-background border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
                <div className="text-center">
                  <div className="text-xl font-black text-primary">{result.links.internal}</div>
                  <div className="text-xs text-secondary font-medium uppercase tracking-wider">Internal</div>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-center">
                  <div className="text-xl font-black text-primary">{result.links.external}</div>
                  <div className="text-xs text-secondary font-medium uppercase tracking-wider">External</div>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-center">
                  <div className={`text-xl font-black ${result.links.missingHref > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                    {result.links.missingHref}
                  </div>
                  <div className="text-xs text-secondary font-medium uppercase tracking-wider">Missing Href</div>
                </div>
              </div>
              <p className="text-xs text-secondary">{result.links.msg}</p>
            </div>

            {/* OpenGraph */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">🌍</span> Social Tags (OG)
                </h3>
                <StatusIcon status={result.openGraph.status} />
              </div>
              <p className="text-sm text-secondary mb-4">{result.openGraph.msg}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-background border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-primary font-medium">og:title</span>
                  {result.openGraph.title ? <span className="text-emerald-500">✅</span> : <span className="text-rose-500">❌</span>}
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-primary font-medium">og:description</span>
                  {result.openGraph.desc ? <span className="text-emerald-500">✅</span> : <span className="text-rose-500">❌</span>}
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-background border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-primary font-medium">og:image</span>
                  {result.openGraph.image ? <span className="text-emerald-500">✅</span> : <span className="text-rose-500">❌</span>}
                </div>
              </div>
            </div>

            {/* Content Analysis */}
            <div className="bg-panel border border-panel-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="text-2xl">📄</span> Content Size
                </h3>
                <StatusIcon status={result.wordCount.status} />
              </div>
              
              <div className="flex items-center justify-center p-6 bg-background border border-slate-100 dark:border-slate-800 rounded-xl mb-3">
                <div className="text-center">
                  <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{result.wordCount.count}</div>
                  <div className="text-xs text-secondary font-bold uppercase tracking-wider">Words Found</div>
                </div>
              </div>
              <p className="text-xs text-secondary text-center">{result.wordCount.msg}</p>
            </div>

            {/* Robots & Sitemap */}
            {result.robots && result.sitemap && (
              <div className="bg-panel border border-panel-border rounded-2xl p-6 md:col-span-2">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">🤖</span> Crawlability & Indexing
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col p-4 bg-background border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary">robots.txt</span>
                      <StatusIcon status={result.robots.status} />
                    </div>
                    <p className="text-xs text-secondary">{result.robots.msg}</p>
                  </div>

                  <div className="flex flex-col p-4 bg-background border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary">sitemap.xml</span>
                      <StatusIcon status={result.sitemap.status} />
                    </div>
                    <p className="text-xs text-secondary">{result.sitemap.msg}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
