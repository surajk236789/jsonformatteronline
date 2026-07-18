import React from "react";
import type { Metadata } from "next";

import JsonToCsv from "@/app/components/JsonToCsv";

export const metadata: Metadata = {
  title: "JSON to CSV Converter Online",
  description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
  keywords: ["JSON to CSV", "Convert JSON to CSV", "JSON CSV Converter", "Export JSON as CSV", "JSON Table"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-to-csv" },
  openGraph: {
    title: "JSON to CSV Converter Online",
    description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
    url: "https://www.allformatter.com/tools/json-to-csv",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter Online",
    description: "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📊", title: "JSON Arrays to Rows", desc: "Converts JSON arrays of objects to clean CSV rows with auto-detected column headers from your JSON keys." },
  { emoji: "⬇️", title: "Download as .csv", desc: "One-click download exports your converted data as a proper .csv file ready for Excel, Google Sheets, or any data tool." },
  { emoji: "🔒", title: "Fully Private", desc: "All conversion happens in your browser. Your data never leaves your device." },
  { emoji: "⚡", title: "Works Instantly", desc: "No login, no upload, no waiting. Paste JSON and get CSV output right away." },
];

const faqs = [
  { q: "What JSON structure works best for CSV conversion?", a: "A JSON array of flat objects works best — each object becomes a row and each key becomes a column. For example: [{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]." },
  { q: "Does it support nested JSON objects?", a: "Nested objects are flattened or serialized as strings in the CSV output. For complex nested data, consider flattening your JSON first using a transformation step." },
  { q: "Can I open the output in Excel?", a: "Yes. Download the .csv file and open it directly in Microsoft Excel, Google Sheets, or any spreadsheet application that supports CSV." },
  { q: "Is there a size limit?", a: "There's no hard limit — but very large JSON datasets may slow down browser rendering. For best performance, process in batches if needed." },
];

export default function JsonToCsvPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON to CSV Converter Online",
        "url": "https://www.allformatter.com/tools/json-to-csv",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert JSON arrays to CSV format instantly online. Free, browser-based JSON to CSV converter — no data uploaded, no registration required.",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 mb-4">
          📊 Converter
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          JSON to CSV Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert JSON arrays to CSV rows instantly — download as a file, open in Excel or Google Sheets, all in your browser.
        </p>
      </div>

      <JsonToCsv />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our JSON to CSV Converter?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
