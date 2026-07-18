import React from "react";
import type { Metadata } from "next";

import UrlEncodeDecode from "@/app/components/UrlEncodeDecode";

export const metadata: Metadata = {
  title: "URL Encode & Decode Online",
  description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
  keywords: ["URL Encode", "URL Decode", "Percent Encode", "URI Encode Online", "URL Encoder Decoder"],
  alternates: { canonical: "https://www.allformatter.com/tools/url-encode-decode" },
  openGraph: {
    title: "URL Encode & Decode Online",
    description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
    url: "https://www.allformatter.com/tools/url-encode-decode",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encode & Decode Online",
    description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔗", title: "Encode & Decode URLs", desc: "Convert special characters to percent-encoded format or decode them back to human-readable text instantly." },
  { emoji: "🎯", title: "Query String Safe", desc: "Properly encodes characters like spaces, &, =, and # that would break URL query parameters." },
  { emoji: "🔒", title: "Fully Private", desc: "All encoding and decoding happens locally in your browser — no data is sent anywhere." },
  { emoji: "⚡", title: "Instant Results", desc: "No button clicks or form submissions — output updates in real time as you type." },
];

const faqs = [
  { q: "What is URL encoding?", a: "URL encoding (also called percent-encoding) converts characters that are not allowed in URLs into a '%XX' format where XX is the hexadecimal ASCII code. For example, a space becomes %20." },
  { q: "When do I need to URL encode a string?", a: "Whenever you include special characters in a query parameter, form field, or API path. Characters like spaces, &, =, ?, #, and non-ASCII text must be encoded to form valid URLs." },
  { q: "What's the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes an entire URL, leaving characters like / and ? intact. encodeURIComponent encodes a single component (like a query value), encoding those characters too. This tool uses full component encoding." },
  { q: "Should I encode the entire URL or just the parameters?", a: "Only encode the individual parameter values, not the full URL. Encoding the entire URL would corrupt the slashes and protocol, making it invalid." },
];

export default function UrlEncoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "URL Encode and Decode Online",
        "url": "https://www.allformatter.com/tools/url-encode-decode",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 mb-4">
          🔗 Encoder
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          URL Encode &amp; Decode
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Percent-encode URLs and query parameters or decode them back to readable text — instantly and privately.
        </p>
      </div>

      <UrlEncodeDecode />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our URL Encoder / Decoder?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
