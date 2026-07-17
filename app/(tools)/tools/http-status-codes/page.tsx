import React from "react";
import type { Metadata } from "next";

import HttpStatusCodes from "@/app/components/HttpStatusCodes";

export const metadata: Metadata = {
  title: "Online HTTP Status Codes References",
  description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
  keywords: ["HTTP Status Codes", "HTTP Response Codes", "404 Meaning", "500 Error Code", "HTTP Reference"],
  alternates: { canonical: "https://www.allformatter.com/tools/http-status-codes" },
  openGraph: {
    title: "Online HTTP Status Codes References",
    description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
    url: "https://www.allformatter.com/tools/http-status-codes",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online HTTP Status Codes References",
    description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🌐", title: "Complete Reference", desc: "All HTTP/1.1 and HTTP/2 status codes from 100 Continue to 599, organized by category." },
  { emoji: "🔍", title: "Instant Search", desc: "Search by code number or keyword — find the status code you need in milliseconds." },
  { emoji: "📖", title: "Plain English Descriptions", desc: "Every status code includes a clear description of what it means and when it's used in real APIs." },
  { emoji: "🎯", title: "Category Grouping", desc: "Browse by category: 2xx Success, 3xx Redirection, 4xx Client Errors, 5xx Server Errors." },
];

const faqs = [
  { q: "What are HTTP status codes?", a: "HTTP status codes are 3-digit numbers that servers return in response to a client's request. They indicate whether the request was successful, redirected, or resulted in an error." },
  { q: "What's the difference between 401 and 403?", a: "401 Unauthorized means the user is not authenticated — they need to log in. 403 Forbidden means the user is authenticated but doesn't have permission to access the resource." },
  { q: "What causes a 500 Internal Server Error?", a: "A 500 error means something went wrong on the server side. It's a generic error that can be caused by unhandled exceptions, misconfigurations, database failures, or bugs in the server code." },
  { q: "Is 301 or 302 better for permanent redirects?", a: "Use 301 for permanent redirects — browsers and search engines will update their cached URL. Use 302 for temporary redirects where the original URL should remain indexed by search engines." },
];

export default function HttpStatusCodesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "HTTP Status Codes References",
        "url": "https://www.allformatter.com/tools/http-status-codes",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
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
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 mb-4">
          🌐 Reference
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          HTTP Status Codes Reference
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Complete reference for all HTTP status codes — search by number or keyword and get plain-English explanations instantly.
        </p>
      </div>

      <HttpStatusCodes />

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our HTTP Status Code Reference?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
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
