import React from "react";
import type { Metadata } from "next";

import Base64EncodeDecode from "@/app/components/Base64EncodeDecode";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode Onlines",
  description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
  keywords: ["Base64 Encode", "Base64 Decode", "Base64 Converter", "Encode to Base64", "Decode Base64 Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/base64-encode-decode" },
  openGraph: {
    title: "Base64 Encode & Decode Onlines",
    description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
    url: "https://www.allformatter.com/tools/base64-encode-decode",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encode & Decode Onlines",
    description: "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔐", title: "Encode & Decode", desc: "Instantly encode any text string to Base64 or decode Base64 back to the original plain text." },
  { emoji: "🔒", title: "100% Private", desc: "All encoding and decoding is done in your browser. Nothing is sent to any server." },
  { emoji: "⚡", title: "Real-time Conversion", desc: "Results update as you type — no need to click a button or submit a form." },
  { emoji: "📋", title: "One-click Copy", desc: "Copy the encoded or decoded output to your clipboard instantly with a single click." },
];

const faqs = [
  { q: "What is Base64 encoding?", a: "Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters. It's commonly used in email attachments, data URIs, and API token transport." },
  { q: "Is Base64 a form of encryption?", a: "No. Base64 is an encoding, not encryption. It's easily reversible and provides no security. Never use Base64 as a security measure — use proper encryption algorithms instead." },
  { q: "Why do APIs use Base64?", a: "Base64 allows binary data (like images, files, or certificates) to be safely embedded in text-based formats like JSON, HTML, XML, or email headers that don't support raw binary." },
  { q: "What does 'padding' mean in Base64?", a: "Base64 output is padded with '=' characters to make its length a multiple of 4. Some implementations strip padding — both forms are valid and widely supported." },
];

export default function Base64EncoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Base64 Encode and Decode Onlines",
        "url": "https://www.allformatter.com/tools/base64-encode-decode",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Encode text to Base64 or decode Base64 strings back to text instantly. Free, browser-based, fully private Base64 encoder and decoder.",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 mb-4">
          🔐 Encoder
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Base64 Encode &amp; Decode
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Encode text to Base64 or decode Base64 strings back to plain text — instantly and privately in your browser.
        </p>
      </div>

      <Base64EncodeDecode />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our Base64 Encoder / Decoder?</h2>
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
