import React from "react";
import type { Metadata } from "next";

import HashGenerator from "@/app/components/HashGenerator";

export const metadata: Metadata = {
  title: "Hash Generator Online",
  description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
  keywords: ["Hash Generator", "MD5 Generator", "SHA256 Online", "SHA-1 Hash", "Cryptographic Hash Tool"],
  alternates: { canonical: "https://www.allformatter.com/tools/hash-generator" },
  openGraph: {
    title: "Hash Generator Online",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
    url: "https://www.allformatter.com/tools/hash-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hash Generator Online",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "#️⃣", title: "Multiple Algorithms", desc: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes — choose the right algorithm for your use case." },
  { emoji: "🔒", title: "100% Private", desc: "All hashing is done locally in your browser using the Web Crypto API. Nothing is sent to any server." },
  { emoji: "⚡", title: "Instant Output", desc: "Hash is computed as you type — no form submission, no delays." },
  { emoji: "📋", title: "Copy Ready", desc: "One-click copy puts the hash string directly on your clipboard." },
];

const faqs = [
  { q: "What is a cryptographic hash?", a: "A hash function takes any input and produces a fixed-length string (the hash or digest). The same input always produces the same output, but it's computationally infeasible to reverse — making it ideal for checksums and data verification." },
  { q: "Which hash algorithm should I use?", a: "For security-sensitive uses, SHA-256 or SHA-512 are recommended. MD5 and SHA-1 are considered cryptographically broken for security purposes but are still useful for checksums and data integrity checks." },
  { q: "Can hashes be reversed?", a: "No. Hash functions are one-way by design. You cannot reconstruct the original input from a hash. However, common passwords can be cracked via rainbow tables — always salt your hashes in authentication systems." },
  { q: "What's the difference between MD5 and SHA-256?", a: "MD5 produces a 128-bit (32-character hex) hash and is fast but no longer secure. SHA-256 produces a 256-bit (64-character hex) hash and is considered cryptographically safe for most applications." },
];

export default function HashGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Hash Generator Online",
        "url": "https://www.allformatter.com/tools/hash-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any text instantly. Free, browser-based cryptographic hash generator — no data uploaded.",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-4">
          #️⃣ Generator
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Hash <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text — instantly and privately in your browser.
        </p>
      </div>

      <HashGenerator />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Hash Generator?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-slate-400/40 hover:shadow-lg hover:shadow-slate-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
