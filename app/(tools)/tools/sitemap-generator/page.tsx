import React from "react";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import SitemapGenerator from "@/app/components/SitemapGenerator";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "Free XML Sitemap Generator Online",
  description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
  alternates: { canonical: "https://www.allformatter.com/tools/sitemap-generator" },
  openGraph: {
    title: "Free XML Sitemap Generator Online",
    description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
    url: "https://www.allformatter.com/tools/sitemap-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XML Sitemap Generator Online",
    description: "Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

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
              XML Sitemap <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>
          }
          description={
            <>
              Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.
            </>
          }
        />

      <SitemapGenerator />
      <RelatedTools tools={relatedTools} />

      </>
  );
}
