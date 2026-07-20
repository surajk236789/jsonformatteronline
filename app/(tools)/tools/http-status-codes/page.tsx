import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
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
  const relatedTools = [
    {
        "title": "YAML to JSON",
        "desc": "Convert YAML to JSON format.",
        "href": "/tools/yaml-to-json",
        "emoji": "📝"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    }
];

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
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          HTTP Status Codes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Reference</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Complete reference for all HTTP status codes — search by number or keyword and get plain-English explanations instantly.
        </p>
      </div>

      <HttpStatusCodes />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our HTTP Status Code Reference?" color="sky" />

      <FaqSection faqs={faqs} />
      </>
  );
}
