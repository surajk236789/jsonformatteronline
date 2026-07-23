import React from "react";
import type { Metadata } from "next";

import UnixTimestampConverter from "@/app/components/UnixTimestampConverter";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter Online",
  description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
  keywords: ["Unix Timestamp Converter", "Epoch Converter", "Epoch to Date", "Timestamp to Date"],
  alternates: { canonical: "https://www.allformatter.com/tools/unix-timestamp-converter" },
  openGraph: {
    title: "Unix Timestamp Converter Online",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
    url: "https://www.allformatter.com/tools/unix-timestamp-converter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Timestamp Converter Online",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "What is a Unix timestamp?", a: "It is the number of seconds that have elapsed since January 1, 1970 (Midnight UTC), not counting leap seconds." },
  { q: "Can I convert a timestamp in milliseconds?", a: "Yes, the tool automatically handles both standard (seconds) and precise (milliseconds) Unix timestamps." },
  { q: "Does this tool account for my local timezone?", a: "Yes, it converts the UTC epoch time into your local browser's timezone automatically." }
];

export default function Page() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
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
    "name": "Unix Timestamp Converter",
    "url": "https://www.allformatter.com/tools/unix-timestamp-converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
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
    <ToolLayout faqs={faqs}
      title={<>
              Unix Timestamp <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
            </>}
      description={<>
              Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      >
      <UnixTimestampConverter />
    </ToolLayout>
  );
}
