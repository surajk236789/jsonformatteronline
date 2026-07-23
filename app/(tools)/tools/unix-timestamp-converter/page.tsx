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


const contentBlocks = [
  {
    title: "What is a Unix Timestamp?",
    body: "A Unix timestamp is a way to track time as a running total of seconds. Specifically, it represents the number of seconds that have elapsed since the Unix Epoch (January 1, 1970, 00:00:00 UTC), providing a standardized way to store dates in databases."
  },
  {
    title: "How to Convert Timestamps",
    body: "Enter a Unix timestamp (in seconds or milliseconds) into the input field to convert it into a human-readable date. Conversely, you can select a date and time to generate the corresponding Unix timestamp."
  }
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
    <ToolLayout contentBlocks={contentBlocks} faqs={faqs}
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
