import React from "react";
import type { Metadata } from "next";

import UnixTimestampConverter from "@/app/components/UnixTimestampConverter";

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

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 mb-4">
          ⏱️ Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Unix Timestamp Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Convert Unix epoch timestamps to human-readable dates and vice versa. Live ticking epoch clock and timezone support.
        </p>
      </div>

      <UnixTimestampConverter />
    </>
  );
}
