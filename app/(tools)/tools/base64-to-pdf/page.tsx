import React from "react";
import type { Metadata } from "next";

import Base64ToPdf from "@/app/components/Base64ToPdf";

export const metadata: Metadata = {
  title: "Base64 to PDF Converter Online",
  description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
  keywords: ["Base64 to PDF", "Decode Base64", "Base64 Converter", "Convert Base64 String to PDF", "AllFormatter"],
  alternates: { canonical: "https://www.allformatter.com/tools/base64-to-pdf" },
  openGraph: {
    title: "Base64 to PDF Converter Online",
    description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
    url: "https://www.allformatter.com/tools/base64-to-pdf",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 to PDF Converter Online",
    description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "📄", title: "Instant PDF Preview", desc: "Paste your Base64 string and preview the decoded PDF right in your browser — no download required." },
  { emoji: "🔒", title: "Fully Private", desc: "Decoding happens 100% client-side. Your Base64 data is never sent to any server." },
  { emoji: "⬇️", title: "One-Click Download", desc: "Download the decoded PDF file to your device instantly with a single click." },
  { emoji: "⚡", title: "No File Size Limits", desc: "Decode large Base64-encoded PDFs without any artificial restrictions or throttling." },
];

const faqs = [
  { q: "What is Base64 encoding?", a: "Base64 is a way to encode binary data (like PDFs, images, or files) as a text string using only printable ASCII characters. It's widely used in APIs, email attachments, and data URIs." },
  { q: "When would I have a Base64-encoded PDF?", a: "Base64-encoded PDFs often appear in API responses, email attachments encoded as MIME, database blobs, or embedded data URIs in web applications." },
  { q: "Is my PDF data safe?", a: "Absolutely. All decoding is done in your browser using JavaScript. Nothing is uploaded to our servers. Your data stays completely private." },
  { q: "What if the output looks corrupted?", a: "A corrupted output usually means the Base64 string is truncated or has invalid characters. Ensure you paste the complete, clean Base64 string without any extra spaces or line breaks." },
];

export default function Base64ToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Base64 to PDF Converter Online",
        "url": "https://www.allformatter.com/tools/base64-to-pdf",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
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
          Base64 to PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Decode Base64 strings to PDF instantly — preview and download securely in your browser, no uploads needed.
        </p>
      </div>

      <Base64ToPdf />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Base64 to PDF Converter?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
