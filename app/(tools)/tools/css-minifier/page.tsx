import React from "react";
import type { Metadata } from "next";

import CssMinifier from "@/app/components/CssMinifier";

export const metadata: Metadata = {
  title: "CSS Minifier Onlines",
  description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
  keywords: ["CSS Minifier", "Compress CSS", "Minify CSS Online", "CSS Optimizer", "Reduce CSS Size"],
  alternates: { canonical: "https://www.allformatter.com/tools/css-minifier" },
  openGraph: {
    title: "CSS Minifier Onlines",
    description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
    url: "https://www.allformatter.com/tools/css-minifier",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Minifier Onlines",
    description: "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "💨", title: "Maximum Compression", desc: "Strips all whitespace, comments, and unnecessary characters to produce the smallest possible CSS output." },
  { emoji: "📊", title: "Size Reduction Stats", desc: "See exactly how many bytes you saved and the percentage reduction after minification." },
  { emoji: "🔒", title: "Fully Private", desc: "All minification runs locally in your browser. Your CSS is never sent to any server." },
  { emoji: "⚡", title: "Instant Results", desc: "Paste your CSS and get minified output immediately — no delays, no page reloads." },
];

const faqs = [
  { q: "Why minify CSS?", a: "Minified CSS has smaller file sizes, which means faster page loads, lower bandwidth usage, and better Core Web Vitals scores — all of which directly impact SEO rankings and user experience." },
  { q: "Will minified CSS still work correctly?", a: "Yes. Minification only removes unnecessary whitespace and comments. It does not change how the CSS rules apply — your styles will behave exactly the same." },
  { q: "Should I minify CSS in development?", a: "No — keep readable CSS during development for easy debugging. Minify only in your production build, typically using your build tool (webpack, Vite, etc.) automatically." },
  { q: "Does it handle CSS variables and custom properties?", a: "Yes. Modern CSS features including variables (--custom-property), calc(), clamp(), grid, and flexbox are fully preserved during minification." },
];

export default function CssMinifierPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "CSS Minifier Onlines",
        "url": "https://www.allformatter.com/tools/css-minifier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Minify and compress CSS code instantly online. Free, browser-based CSS minifier — removes whitespace, comments, and redundancy to reduce file size.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mb-4">
          💨 Optimizer
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          CSS Minifier &amp; Compressor
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Compress and minify your CSS code to reduce file size and improve page load speed — instantly in your browser.
        </p>
      </div>

      <CssMinifier />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our CSS Minifier?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto" aria-label="FAQ">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-primary list-none">
                <span>{faq.q}</span>
                <span className="transition duration-300 group-open:-rotate-180 text-secondary">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-xs text-secondary leading-relaxed mt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
