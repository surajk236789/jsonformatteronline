import React from "react";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import RobotsTxtGenerator from "@/app/components/RobotsTxtGenerator";
import ToolHeader from "@/app/components/ToolHeader";

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

      <ToolHeader 
          title={
            <>
              Robots.txt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>
          }
          description={
            <>
              Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.
            </>
          }
        />

      <RobotsTxtGenerator />
      <RelatedTools tools={relatedTools} />

      </>
  );
}
