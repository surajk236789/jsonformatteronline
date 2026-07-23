import React from "react";
import type { Metadata } from "next";

import SitemapGenerator from "@/app/components/SitemapGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "XML Sitemap Generator Online",
  description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
  keywords: ["XML Sitemap Generator", "Create Sitemap Online", "SEO URL Builder", "Sitemap Creator"],
  alternates: { canonical: "https://www.allformatter.com/tools/sitemap-generator" },
  openGraph: {
    title: "XML Sitemap Generator Online",
    description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
    url: "https://www.allformatter.com/tools/sitemap-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XML Sitemap Generator Online",
    description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "Why do I need an XML sitemap?", a: "An XML sitemap helps search engines like Google and Bing discover and index your website's pages faster." },
  { q: "How do I submit my sitemap to Google?", a: "You can submit your sitemap URL through the Google Search Console under the 'Sitemaps' section." },
  { q: "Can I use this for any website?", a: "Yes, our generator creates standard XML sitemaps that comply with all major search engine protocols." }
];


const contentBlocks = [
  {
    title: "What is an XML Sitemap?",
    body: "An XML sitemap is a file that lists all the essential URLs on a website along with metadata about each URL (like when it was last updated). This acts as a roadmap, helping search engine crawlers discover and index your content efficiently."
  },
  {
    title: "How to Generate a Sitemap",
    body: "Add your website URLs to the list, optionally configuring the priority and change frequency for each one. The tool compiles this data into a perfectly formatted XML document ready to be submitted to Google Search Console."
  }
];

export default function Page() {
  const relatedTools = [
    {
        "title": "JSON Schema Validator",
        "desc": "Validate JSON against a Schema.",
        "href": "/tools/json-schema-validator",
        "emoji": "✅"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "CSV to JSON",
        "desc": "Convert CSV to JSON arrays.",
        "href": "/tools/csv-to-json",
        "emoji": "📊"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
    "name": "XML Sitemap Generator",
    "url": "https://www.allformatter.com/tools/sitemap-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
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
              XML Sitemap <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>}
      description={<>
              Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      >
      <SitemapGenerator />
    </ToolLayout>
  );
}
