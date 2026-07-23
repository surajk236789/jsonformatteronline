import React from "react";
import type { Metadata } from "next";

import RobotsTxtGenerator from "@/app/components/RobotsTxtGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Robots.txt Generator Online",
  description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
  keywords: ["Robots.txt Generator", "Create robots.txt", "SEO Crawl Directives", "Generate robots.txt online"],
  alternates: { canonical: "https://www.allformatter.com/tools/robots-txt-generator" },
  openGraph: {
    title: "Robots.txt Generator Online",
    description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
    url: "https://www.allformatter.com/tools/robots-txt-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robots.txt Generator Online",
    description: "Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "What does a robots.txt file do?", a: "It tells search engine crawlers which pages or files they can or cannot request from your site." },
  { q: "Where should I put my robots.txt file?", a: "It must be placed in the top-level directory (root) of your website (e.g., yoursite.com/robots.txt)." },
  { q: "Can robots.txt hide my page from Google?", a: "It prevents crawling, but if other sites link to your page, it may still be indexed. Use a noindex meta tag to completely hide a page." }
];


const contentBlocks = [
  {
    title: "What is a Robots.txt File?",
    body: "The robots.txt file is a simple text file placed in the root directory of your website. It uses the Robots Exclusion Protocol to tell search engine crawlers which pages or files they are allowed or forbidden from requesting."
  },
  {
    title: "How to Generate Robots.txt",
    body: "Use the interface to define rules for specific user agents (like Googlebot or Bingbot). You can allow or disallow specific directories and define the location of your sitemap. The tool generates the precise syntax required."
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
              Robots.txt <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>}
      description={<>
              Easily create a valid robots.txt file for your website to control search engine crawlers like Googlebot and Bingbot.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      >
      <RobotsTxtGenerator />
    </ToolLayout>
  );
}
