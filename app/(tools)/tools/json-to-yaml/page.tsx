import React from "react";
import type { Metadata } from "next";

import JsonToYaml from "@/app/components/JsonToYaml";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "JSON to YAML Converter Online",
  description: "Convert JSON to YAML online for free. Browser-based JSON to YAML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  keywords: ["JSON to YAML", "Convert JSON to YAML", "JSON YAML Converter", "JSON to YAML Online", "Free YAML Converter"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-to-yaml" },
  openGraph: {
    title: "JSON to YAML Converter Online",
    description: "Convert JSON to YAML online for free. Browser-based JSON to YAML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
    url: "https://www.allformatter.com/tools/json-to-yaml",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to YAML Converter Online",
    description: "Convert JSON to YAML online for free. Fast, secure, browser-based JSON to YAML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔄", title: "Instant Conversion", desc: "Instantly converts JSON data into readable, indented YAML format." },
  { emoji: "⚡", title: "Real-time Output", desc: "Get your converted YAML immediately as you type — no server round-trips." },
  { emoji: "🔒", title: "Secure & Private", desc: "All conversion happens in your browser. Your data is never uploaded to any external server." },
  { emoji: "📋", title: "Copy & Download", desc: "One-click copy to clipboard or download as a .yaml file for easy integration." },
];

const faqs = [
  { q: "Why convert JSON to YAML?", a: "YAML is designed to be human-readable and is widely used for configuration files (like Docker, Kubernetes, and GitHub Actions) due to its clean syntax that doesn't require brackets or quotes for everything." },
  { q: "Can I convert YAML back to JSON?", a: "Yes. We also have a YAML to JSON converter on the site for the reverse operation." },
  { q: "Does it produce valid YAML?", a: "Yes. The converter generates well-formed, strict YAML using industry-standard libraries." },
];

export default function JsonToYamlPage() {
  const relatedTools = [
    {
      "title": "YAML to JSON",
      "desc": "Convert YAML back to JSON format.",
      "href": "/tools/yaml-to-json",
      "emoji": "🔄"
    },
    {
      "title": "JSON Beautifier",
      "desc": "Format, clean, and beautify your JSON data.",
      "href": "/",
      "emoji": "🗂️"
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
        "name": "JSON to YAML Converter Online",
        "url": "https://www.allformatter.com/tools/json-to-yaml",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert JSON to YAML online for free. Fast, secure, browser-based JSON to YAML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
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
        JSON to YAML <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Converter</span>
      </>}
      description={<>
        Convert any JSON data to clean YAML instantly — free, private, and 100% browser-based.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our JSON to YAML Converter?" featureColor="orange"
      faqs={faqs}
    >
      <JsonToYaml />
    </ToolLayout>
  );
}
