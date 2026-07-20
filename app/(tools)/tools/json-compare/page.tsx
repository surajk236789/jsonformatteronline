import React from "react";
import type { Metadata } from "next";

import JsonCompare from "@/app/components/JsonCompare";

export const metadata: Metadata = {
  title: "JSON Compare Tool Online",
  description: "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
  keywords: ["JSON Compare", "JSON Diff", "Compare JSON Online", "JSON Visualizer", "Diff Editor"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-compare" },
  openGraph: {
    title: "JSON Compare Tool Online",
    description: "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
    url: "https://www.allformatter.com/tools/json-compare",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Compare Tool Online",
    description: "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔍", title: "Side-by-Side Diff", desc: "View both JSON objects in parallel editors so differences are immediately obvious at a glance." },
  { emoji: "🎯", title: "Precise Change Detection", desc: "Every added, removed, or modified key is highlighted — including deeply nested objects and arrays." },
  { emoji: "🔒", title: "100% Private", desc: "Comparison happens entirely in your browser. Your JSON data is never sent to any server." },
  { emoji: "📋", title: "Copy & Paste Ready", desc: "Paste JSON from any source — API responses, config files, logs — and compare instantly." },
];

const faqs = [
  { q: "What is a JSON diff tool?", a: "A JSON diff tool compares two JSON objects and highlights the differences — added keys, removed keys, and modified values. It's essential when debugging API changes or comparing configuration files." },
  { q: "Can it compare deeply nested JSON?", a: "Yes. The comparison engine recursively traverses nested objects and arrays, showing differences at every level of the structure." },
  { q: "What if my JSON is invalid?", a: "If either input contains invalid JSON, the tool will report a parse error so you can fix it before comparing." },
  { q: "Is there a size limit for JSON comparison?", a: "There is no hard limit — but very large payloads (10MB+) may slow down rendering. For best performance, paste only the relevant parts of your JSON." },
];

export default function JsonComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Compare Tool Online",
        "url": "https://www.allformatter.com/tools/json-compare",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
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
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          JSON Compare &amp; Diff <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Tool</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Visually compare two JSON objects side-by-side. Every difference is highlighted — instantly, privately, in your browser.
        </p>
      </div>

      <JsonCompare />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our JSON Compare tool?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
