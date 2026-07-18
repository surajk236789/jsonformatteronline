import React from "react";
import type { Metadata } from "next";

import RobotsTxtGenerator from "@/app/components/RobotsTxtGenerator";

export const metadata: Metadata = {
  title: "Free Robots.txt Generator Online",
  description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
  alternates: { canonical: "https://www.allformatter.com/tools/robots-txt-generator" },
  openGraph: {
    title: "Free Robots.txt Generator Online",
    description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
    url: "https://www.allformatter.com/tools/robots-txt-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator Online",
    description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
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
    "name": "Robots.txt Generator",
    "url": "https://www.allformatter.com/tools/robots-txt-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
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
          🤖 Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Robots.txt Generator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.
        </p>
      </div>

      <RobotsTxtGenerator />
    </>
  );
}
