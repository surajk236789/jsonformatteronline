import React from "react";
import type { Metadata } from "next";

import JsonSchemaValidator from "@/app/components/JsonSchemaValidator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "JSON Schema Validator Online",
  description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
  keywords: ["JSON Schema Validator", "Validate JSON Schema", "JSON Validation Online", "JSON Draft-07", "Schema Checker"],
  alternates: { canonical: "https://www.allformatter.com/tools/json-schema-validator" },
  openGraph: {
    title: "JSON Schema Validator Online",
    description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
    url: "https://www.allformatter.com/tools/json-schema-validator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Schema Validator Online",
    description: "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "✅", title: "Schema Validation", desc: "Validate any JSON document against a JSON Schema and get clear, actionable error messages for every violation." },
  { emoji: "🎯", title: "Detailed Errors", desc: "See exactly which property failed, what the expected type was, and where the error occurred in your data." },
  { emoji: "🔒", title: "Fully Private", desc: "All validation runs in your browser. Your JSON data and schema are never sent to any server." },
  { emoji: "⚡", title: "Instant Feedback", desc: "Results appear immediately — paste your JSON and schema and see validation results right away." },
];

const faqs = [
  { q: "What is JSON Schema?", a: "JSON Schema is a vocabulary for annotating and validating JSON documents. It lets you define the structure, types, required fields, and constraints your JSON data must conform to." },
  { q: "Which JSON Schema draft is supported?", a: "This tool supports JSON Schema Draft-07 and many common keywords including type, required, properties, enum, minLength, maxLength, minimum, maximum, and more." },
  { q: "What does a validation error mean?", a: "A validation error means your JSON data doesn't match one of the rules in your schema — for example, a required field is missing, a value is the wrong type, or a number is out of range." },
  { q: "Can I validate nested objects?", a: "Yes. JSON Schema supports deeply nested object and array validation through the properties, items, and $ref keywords, and this tool handles nested schemas correctly." },
];

export default function JsonSchemaValidatorPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    },
    {
        "title": "URL Encode/Decode",
        "desc": "Encode or decode URL components.",
        "href": "/tools/url-encode-decode",
        "emoji": "🔗"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JSON Schema Validator Online",
        "url": "https://www.allformatter.com/tools/json-schema-validator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Validate JSON data against a JSON Schema instantly. Free, browser-based JSON Schema validator supporting Draft-07 and common schema keywords.",
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
              JSON Schema <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Validator</span>
            </>}
      description={<>
              Validate your JSON data against a JSON Schema — get clear error messages for every violation, instantly and privately.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our JSON Schema Validator?" featureColor="emerald"
      faqs={faqs}
    >
      <JsonSchemaValidator />
    </ToolLayout>
  );
}
