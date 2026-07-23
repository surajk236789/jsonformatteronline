import React from "react";
import type { Metadata } from "next";

import TimezoneConverter from "@/app/components/TimezoneConverter";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Timezone Converter Online",
  description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
  alternates: { canonical: "https://www.allformatter.com/tools/timezone-converter" },
  openGraph: {
    title: "Timezone Converter Online",
    description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
    url: "https://www.allformatter.com/tools/timezone-converter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timezone Converter Online",
    description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
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
        "title": "CSS Minifier",
        "desc": "Minify CSS code and reduce size.",
        "href": "/tools/css-minifier",
        "emoji": "🎨"
    },
    {
        "title": "Base64 Encode/Decode",
        "desc": "Encode text to Base64 or decode it.",
        "href": "/tools/base64-encode-decode",
        "emoji": "🔐"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Timezone Converter",
    "url": "https://www.allformatter.com/tools/timezone-converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <ToolLayout
      title={<>
              Timezone <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Converter</span>
            </>}
      description={<>
              Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      >
      <TimezoneConverter />
    </ToolLayout>
  );
}
