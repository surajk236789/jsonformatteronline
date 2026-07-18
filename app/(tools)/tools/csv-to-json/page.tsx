import React from "react";
import type { Metadata } from "next";

import CsvToJson from "@/app/components/CsvToJson";

export const metadata: Metadata = {
  title: "CSV to JSON Converter Online",
  description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
  keywords: ["CSV to JSON", "Convert CSV to JSON", "CSV JSON Converter", "Import CSV as JSON", "Parse CSV Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/csv-to-json" },
  openGraph: {
    title: "CSV to JSON Converter Online",
    description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
    url: "https://www.allformatter.com/tools/csv-to-json",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to JSON Converter Online",
    description: "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📥", title: "Auto Header Detection", desc: "Automatically uses the first row of your CSV as JSON keys — no manual mapping needed." },
  { emoji: "🎯", title: "Clean JSON Output", desc: "Produces properly typed JSON — numbers stay numbers, booleans stay booleans, not everything is a string." },
  { emoji: "🔒", title: "Fully Private", desc: "All parsing happens in your browser. Your CSV data never leaves your device." },
  { emoji: "⚡", title: "Paste or Upload", desc: "Paste CSV text directly or work with raw data — instant conversion with no configuration required." },
];

const faqs = [
  { q: "What format should my CSV be in?", a: "Standard CSV with comma-separated values and a header row works best. The first row is used as JSON keys and each subsequent row becomes a JSON object in the output array." },
  { q: "Are quoted fields with commas handled correctly?", a: 'Yes. Fields wrapped in double quotes (e.g., "Smith, John") are parsed correctly, preserving the comma as part of the value rather than treating it as a delimiter.' },
  { q: "What happens with empty cells?", a: "Empty cells are converted to empty string values in the JSON output. You can handle null mapping manually after conversion if needed." },
  { q: "Can I use tab-separated values (TSV)?", a: "Some configurations support TSV. If your data is tab-separated, try replacing tabs with commas before pasting, or use the raw paste mode if available." },
];

export default function CsvToJsonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "CSV to JSON Converter Online",
        "url": "https://www.allformatter.com/tools/csv-to-json",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert CSV files and text to JSON format instantly. Free, browser-based CSV to JSON converter — auto-detects headers, no uploads required.",
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
          📥 Converter
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          CSV to JSON Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Import CSV data as structured JSON instantly — auto-detects headers, fully private, no uploads.
        </p>
      </div>

      <CsvToJson />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our CSV to JSON Converter?</h2>
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
