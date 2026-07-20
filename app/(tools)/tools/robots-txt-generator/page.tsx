import React from "react";
import RelatedTools from "@/app/components/RelatedTools";
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
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/tools/json-beautifier",
        "emoji": "🗂️"
    },
    {
        "title": "JSON Compare",
        "desc": "Compare two JSON objects side-by-side.",
        "href": "/tools/json-compare",
        "emoji": "⚖️"
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

      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          Robots.txt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.
        </p>
      </div>

      <RobotsTxtGenerator />
      <RelatedTools tools={relatedTools} />

      </>
  );
}
