import React from "react";
import type { Metadata } from "next";

import TimezoneConverter from "@/app/components/TimezoneConverter";

export const metadata: Metadata = {
  title: "Free Timezone Converter Online",
  description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
  alternates: { canonical: "https://www.allformatter.com/tools/timezone-converter" },
  openGraph: {
    title: "Free Timezone Converter Online",
    description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
    url: "https://www.allformatter.com/tools/timezone-converter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Timezone Converter Online",
    description: "Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 mb-4">
          🌍 Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Timezone Converter
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Visually compare and convert time across multiple timezones instantly. Perfect for scheduling international meetings.
        </p>
      </div>

      <TimezoneConverter />
    </>
  );
}
