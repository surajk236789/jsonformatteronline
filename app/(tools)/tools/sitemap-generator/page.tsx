import React from "react";
import type { Metadata } from "next";

import SitemapGenerator from "@/app/components/SitemapGenerator";

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

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 mb-4">
          🗺️ Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          XML Sitemap Generator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Generate valid XML sitemaps instantly from a list of URLs. Configure lastmod, changefreq, and priority tags easily.
        </p>
      </div>

      <SitemapGenerator />
    </>
  );
}
