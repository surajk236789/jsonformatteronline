import React from "react";
import RelatedTools from "@/app/components/RelatedTools";
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
  const relatedTools = [
    {
        "title": "Hash Generator",
        "desc": "Generate MD5, SHA-1, SHA-256 hashes.",
        "href": "/tools/hash-generator",
        "emoji": "#️⃣"
    },
    {
        "title": "JWT Decoder",
        "desc": "Decode JSON Web Tokens instantly.",
        "href": "/tools/jwt-decoder",
        "emoji": "🔑"
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

      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          Meta Tag <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Generate perfect HTML meta tags, OpenGraph tags, and Twitter Cards for your website instantly with our free online tool.
        </p>
      </div>

      <MetaTagGenerator />
      <RelatedTools tools={relatedTools} />

      </>
  );
}
