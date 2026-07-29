import React from "react";
import type { Metadata } from "next";

import JsonCompare from "@/app/components/JsonCompare";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Online JSON Compare & JSON Diff Tool",
  description: "Online JSON compare tool to visually compare two JSON objects side-by-side. Features JSON diff, text compare, formatting, and viewing capabilities.",
  keywords: [
    "compare json online", "online json compare", "json compare online",
    "compare two json", "json diff", "json formatter", "json viewer",
    "format json", "text compare", "compare text", "JSON Compare"
  ],
  alternates: { canonical: "https://www.allformatter.com/tools/json-compare" },
  openGraph: {
    title: "Online JSON Compare & JSON Diff Tool",
    description: "Online JSON compare tool to visually compare two JSON objects side-by-side. Features JSON diff, formatting.",
    url: "https://www.allformatter.com/tools/json-compare",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online JSON Compare & JSON Diff Tool",
    description: "Online JSON compare tool to visually compare two JSON objects side-by-side. Features JSON diff, formatting.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔍", title: "Side-by-Side Diff", desc: "View both JSON objects in parallel editors so differences are immediately obvious at a glance." },
  { emoji: "🎯", title: "Precise Change Detection", desc: "Every added, removed, or modified key is highlighted — including deeply nested objects and arrays." },
  { emoji: "🔒", title: "100% Private", desc: "Comparison happens entirely in your browser. Your JSON data is never sent to any server." },
  { emoji: "📋", title: "Copy & Paste Ready", desc: "Paste JSON from any source — API responses, config files, logs — and compare instantly." },
];

const faqs = [
  { q: "What is a JSON diff tool?", a: "A JSON diff tool compares two JSON objects and highlights the differences — added keys, removed keys, and modified values. It's essential when debugging API changes or comparing configuration files." },
  { q: "Can it compare deeply nested JSON?", a: "Yes. The comparison engine recursively traverses nested objects and arrays, showing differences at every level of the structure." },
  { q: "What if my JSON is invalid?", a: "If either input contains invalid JSON, the tool will report a parse error so you can fix it before comparing." },
  { q: "Is there a size limit for JSON comparison?", a: "There is no hard limit — but very large payloads (10MB+) may slow down rendering. For best performance, paste only the relevant parts of your JSON." },
];


const contentBlocks = [
  {
    title: "What is JSON Diffing?",
    body: "Comparing two JSON objects manually can be tedious and error-prone. A JSON Diff tool visually highlights the exact additions, deletions, and modifications between an original JSON document and a modified version. It can also be used as a powerful text compare tool."
  },
  {
    title: "How to Compare Two JSON Objects Online",
    body: "Paste your original JSON into the left editor and the modified JSON into the right editor to compare JSON online. The JSON viewer will automatically align the structures and highlight the differences using a standard diff format."
  }
];

export default function JsonComparePage() {
  const relatedTools = [
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
    },
    {
      "title": "JSON Schema Validator",
      "desc": "Validate JSON against a Schema.",
      "href": "/tools/json-schema-validator",
      "emoji": "✅"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Compare Tool",
        "url": "https://www.allformatter.com/tools/json-compare",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
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
    <ToolLayout contentBlocks={contentBlocks}
      title={<>
        Online JSON Compare &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Diff Tool</span>
      </>}
      description={<>
        Visually compare two JSON objects side-by-side. View differences, format JSON instantly online.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our JSON Compare tool?" featureColor="violet"
      faqs={faqs}
    >
      <JsonCompare />
    </ToolLayout>
  );
}
