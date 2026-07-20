import React from "react";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import UnixTimestampConverter from "@/app/components/UnixTimestampConverter";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "Free Unix Timestamp Converter Online",
  description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
  alternates: { canonical: "https://www.allformatter.com/tools/unix-timestamp-converter" },
  openGraph: {
    title: "Free Unix Timestamp Converter Online",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
    url: "https://www.allformatter.com/tools/unix-timestamp-converter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Unix Timestamp Converter Online",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ToolHeader 
          title={
            <>
              Unix Timestamp <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
            </>
          }
          description={
            <>
              Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.
            </>
          }
        />

      <UnixTimestampConverter />
      <RelatedTools tools={relatedTools} />

      </>
  );
}
