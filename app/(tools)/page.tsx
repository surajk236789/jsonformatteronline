import React from "react";
import ToolHeader from "@/app/components/ToolHeader";
import type { Metadata } from "next";

import JsonBeautifier from "@/app/components/JsonBeautifier";

export const metadata: Metadata = {
  title: "JSON Formatter & Beautifier Online — Free JSON Parser & Validator | AllFormatter",
  description: "Free JSON Formatter and Beautifier on AllFormatter. Instantly format, validate, minify, and pretty-print JSON data in your browser. Secure and private — no data leaves your device.",
  keywords: [
    "JSON Formatter",
    "JSON Beautifier",
    "JSON Parser",
    "Format JSON Online",
    "JSON Validator",
    "JSON Compare",
    "JSON Minifier",
    "Online JSON Tool",
    "AllFormatter",
    "pretty print JSON",
    "JSON pretty printer",
  ],
  alternates: {
    canonical: "https://www.allformatter.com/",
  },
};

const features = [
  {
    emoji: "⚡",
    title: "Instant Formatting",
    desc: "Paste your JSON and get a beautifully indented, readable result in milliseconds — no waiting, no loading.",
  },
  {
    emoji: "🔒",
    title: "100% Private & Secure",
    desc: "All processing happens entirely in your browser. Your data never reaches our servers — ever.",
  },
  {
    emoji: "✅",
    title: "Real-time Validation",
    desc: "Syntax errors are caught instantly with exact line and position information to help you fix issues fast.",
  },
  {
    emoji: "📦",
    title: "Minify & Compress",
    desc: "Compress JSON to a single line to reduce payload size for APIs, storage, and network transfers.",
  },
];

const faqs = [
  {
    q: "What is a JSON Formatter?",
    a: "A JSON Formatter (also called a JSON Beautifier or Pretty Printer) takes raw or minified JSON and structures it with proper indentation, line breaks, and spacing — making it human-readable and easy to debug.",
  },
  {
    q: "Is my data safe to use here?",
    a: "Absolutely. This tool runs entirely client-side in your browser using JavaScript. No data is sent to any server, logged, or stored. You can even use it offline after the page loads.",
  },
  {
    q: "What's the difference between formatting and minifying JSON?",
    a: "Formatting adds indentation and line breaks to make JSON readable. Minifying removes all whitespace to produce the smallest possible output — ideal for APIs and data transfer.",
  },
  {
    q: "Can it detect JSON errors?",
    a: "Yes. The formatter validates your JSON against the official specification and reports exact syntax errors — like missing commas, unquoted keys, or trailing commas — with a clear message.",
  },
];

export default function JsonBeautifierPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AllFormatter",
    "url": "https://www.allformatter.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.allformatter.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page H1 */}
      {/* Page H1 */}
      <ToolHeader 
        title={
          <>JSON Formatter & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Beautifier</span></>
        }
        description="AllFormatter's free JSON Formatter instantly formats, validates, and minifies JSON — fast, and fully private. Your data never leaves your browser."
      />

      {/* Tool */}
      <JsonBeautifier />

      {/* Feature highlights */}
      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">
          Why developers choose this tool
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl flex-shrink-0">
                {f.emoji}
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl mx-auto" aria-label="Frequently Asked Questions">
        <h2 className="text-xl font-bold text-primary text-center mb-8">
          Frequently Asked Questions
        </h2>
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

      {/* Static SEO paragraph */}
      <section className="mt-16 max-w-3xl mx-auto rounded-2xl border border-panel-border bg-panel p-8" aria-label="About AllFormatter JSON Tools">
        <h2 className="text-lg font-bold text-primary mb-3">About AllFormatter&apos;s JSON Formatter</h2>
        <p className="text-sm text-secondary leading-relaxed">
          <strong className="text-primary">AllFormatter</strong> is a free online toolkit for developers at <strong className="text-primary">allformatter.com</strong>. Our JSON Formatter and Beautifier is the fastest way to pretty-print, validate, and minify JSON data directly in your browser. Whether you need a <strong className="text-primary">JSON parser</strong>, a <strong className="text-primary">JSON validator</strong>, or a quick <strong className="text-primary">JSON minifier</strong>, AllFormatter handles it all — with no server uploads and no data retention. Beyond JSON, AllFormatter provides tools for YAML conversion, JWT decoding, HTML beautification, CSS minification, Base64 encoding, hash generation, and more.
        </p>
      </section>
    </>
  );
}
