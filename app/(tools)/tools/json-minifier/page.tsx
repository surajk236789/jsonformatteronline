import React from "react";
import type { Metadata } from "next";

import JsonMinifier from "@/app/components/JsonMinifier";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free JSON Minifier Online — Compress JSON Instantly",
  description: "Minify and compress JSON data online. Remove whitespace, comments, and formatting to reduce file size. Fast, free, and 100% browser-based.",
  keywords: ["JSON Minifier", "Compress JSON", "Minify JSON Online", "JSON Compressor", "Remove JSON whitespace"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-minifier" },
  openGraph: {
    title: "Free JSON Minifier Online — Compress JSON Instantly",
    description: "Minify and compress JSON data online. Remove whitespace, comments, and formatting to reduce file size. Fast, free, and 100% browser-based.",
    url: "https://www.allformatter.com/tools/json-minifier",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Minifier Online — Compress JSON Instantly",
    description: "Minify and compress JSON data online. Remove whitespace, comments, and formatting to reduce file size. Fast, free, and 100% browser-based.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Compression", desc: "Instantly minify your JSON data as you type. See file size savings immediately." },
  { emoji: "🔒", title: "Secure & Private", desc: "All minification happens directly in your browser. No data is sent to a server." },
  { emoji: "📉", title: "Reduce File Size", desc: "Strip out unnecessary whitespace and line breaks to minimize payload sizes for APIs." },
  { emoji: "📥", title: "Easy Download", desc: "Download the minified JSON directly to your device with a single click." },
];

const faqs = [
  { q: "What does minifying JSON do?", a: "Minifying JSON removes all unnecessary characters (like spaces, tabs, and newlines) without changing the data. This reduces the file size, making it faster to transmit over networks." },
  { q: "Is it safe to minify JSON?", a: "Yes. Minification does not alter the actual data or keys in the JSON object. It is still perfectly valid JSON that can be parsed by any standard JSON parser." },
  { q: "Can I reverse the minification?", a: "Yes, you can easily reverse minification by using our JSON Beautifier tool, which will format and indent the JSON back to a human-readable state." },
];

export default function JsonMinifierPage() {
  const relatedTools = [
    {
      "title": "JSON Beautifier",
      "desc": "Format, clean, and beautify your JSON data.",
      "href": "/",
      "emoji": "🗂️"
    },
    {
      "title": "JSON to CSV",
      "desc": "Export JSON data to CSV format.",
      "href": "/tools/json-to-csv",
      "emoji": "📊"
    },
    {
      "title": "JSON to XML",
      "desc": "Convert JSON structure into XML.",
      "href": "/tools/json-to-xml",
      "emoji": "🔄"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Minifier",
        "url": "https://www.allformatter.com/tools/json-minifier",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Minify and compress JSON data online. Remove whitespace, comments, and formatting to reduce file size. Fast, free, and 100% browser-based.",
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
    <ToolLayout
      title={<>
        JSON <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Minifier</span>
      </>}
      description={<>
        Compress and minify JSON data instantly online. Reduce payload sizes for APIs with 100% privacy.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our JSON Minifier?" featureColor="emerald"
      faqs={faqs}
    >
      <JsonMinifier />
    </ToolLayout>
  );
}
