import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import JsonToXml from "@/app/components/JsonToXml";

export const metadata: Metadata = {
  title: "JSON to XML Converter Online",
  description: "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  keywords: ["JSON to XML", "Convert JSON to XML", "JSON XML Converter", "JSON to XML Online", "Free JSON Converter"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-to-xml" },
  openGraph: {
    title: "JSON to XML Converter Online",
    description: "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
    url: "https://www.allformatter.com/tools/json-to-xml",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to XML Converter Online",
    description: "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔄", title: "Full Structure Conversion", desc: "Converts nested JSON objects, arrays, and all primitive types to well-formed XML with proper tag hierarchy." },
  { emoji: "⚡", title: "Instant Output", desc: "Get your converted XML immediately — no server round-trips, no waiting, no rate limits." },
  { emoji: "🔒", title: "Secure & Private", desc: "All conversion happens in your browser. Your data is never uploaded to any external server." },
  { emoji: "📋", title: "Copy-Ready XML", desc: "One-click copy to clipboard for easy integration into your codebase, SOAP APIs, or config files." },
];

const faqs = [
  { q: "Why convert JSON to XML?", a: "XML is widely used in enterprise systems, SOAP APIs, config files, and legacy integrations. Converting from JSON lets you work with both modern APIs and older systems that require XML input." },
  { q: "How are JSON arrays handled in XML?", a: "JSON arrays are converted to repeated XML elements with the same tag name. For example, a JSON array named 'item' becomes multiple <item> tags in the XML output." },
  { q: "Does it produce valid XML?", a: "Yes. The converter generates well-formed XML with a proper declaration and correctly nested tags. Always validate the output if your target system requires a specific schema." },
  { q: "Can I convert XML back to JSON?", a: "This tool converts JSON to XML. For the reverse, use a dedicated XML to JSON converter — conversion in both directions is possible but requires a separate parsing step." },
];

export default function JsonToXmlPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "URL Encode/Decode",
        "desc": "Encode or decode URL components.",
        "href": "/tools/url-encode-decode",
        "emoji": "🔗"
    },
    {
        "title": "CSV to JSON",
        "desc": "Convert CSV to JSON arrays.",
        "href": "/tools/csv-to-json",
        "emoji": "📊"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON to XML Converter Online",
        "url": "https://www.allformatter.com/tools/json-to-xml",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
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
          JSON to XML <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert any JSON data to well-formed XML instantly — free, private, and with full support for nested structures.
        </p>
      </div>

      <JsonToXml />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our JSON to XML Converter?" color="orange" />

      <FaqSection faqs={faqs} />
      </>
  );
}
