import React from "react";
import type { Metadata } from "next";

import MetaTagGenerator from "@/app/components/MetaTagGenerator";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator Online",
  description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
  alternates: { canonical: "https://www.allformatter.com/tools/meta-tag-generator" },
  openGraph: {
    title: "Free Meta Tag Generator Online",
    description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
    url: "https://www.allformatter.com/tools/meta-tag-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator Online",
    description: "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
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
    "name": "Meta Tag Generator",
    "url": "https://www.allformatter.com/tools/meta-tag-generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.",
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
          🏷️ Tool
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight">
          Meta Tag Generator
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.
        </p>
      </div>

      <MetaTagGenerator />
    </>
  );
}
