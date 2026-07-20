import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import FaqSection from "@/app/components/FaqSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import UrlEncodeDecode from "@/app/components/UrlEncodeDecode";
import ToolHeader from "@/app/components/ToolHeader";

export const metadata: Metadata = {
  title: "URL Encode & Decode Online",
  description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
  keywords: ["URL Encode", "URL Decode", "Percent Encode", "URI Encode Online", "URL Encoder Decoder"],
  alternates: { canonical: "https://www.allformatter.com/tools/url-encode-decode" },
  openGraph: {
    title: "URL Encode & Decode Online",
    description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
    url: "https://www.allformatter.com/tools/url-encode-decode",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encode & Decode Online",
    description: "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔗", title: "Encode & Decode URLs", desc: "Convert special characters to percent-encoded format or decode them back to human-readable text instantly." },
  { emoji: "🎯", title: "Query String Safe", desc: "Properly encodes characters like spaces, &, =, and # that would break URL query parameters." },
  { emoji: "🔒", title: "Fully Private", desc: "All encoding and decoding happens locally in your browser — no data is sent anywhere." },
  { emoji: "⚡", title: "Instant Results", desc: "No button clicks or form submissions — output updates in real time as you type." },
];

const faqs = [
  { q: "What is URL encoding?", a: "URL encoding (also called percent-encoding) converts characters that are not allowed in URLs into a '%XX' format where XX is the hexadecimal ASCII code. For example, a space becomes %20." },
  { q: "When do I need to URL encode a string?", a: "Whenever you include special characters in a query parameter, form field, or API path. Characters like spaces, &, =, ?, #, and non-ASCII text must be encoded to form valid URLs." },
  { q: "What's the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes an entire URL, leaving characters like / and ? intact. encodeURIComponent encodes a single component (like a query value), encoding those characters too. This tool uses full component encoding." },
  { q: "Should I encode the entire URL or just the parameters?", a: "Only encode the individual parameter values, not the full URL. Encoding the entire URL would corrupt the slashes and protocol, making it invalid." },
];

export default function UrlEncoderPage() {
  const relatedTools = [
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    },
    {
        "title": "Password Generator",
        "desc": "Generate strong, secure passwords.",
        "href": "/tools/password-generator",
        "emoji": "🛡️"
    },
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "URL Encode and Decode Online",
        "url": "https://www.allformatter.com/tools/url-encode-decode",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "URL encode or decode strings instantly online. Free, browser-based percent-encoding tool for query strings, API parameters, and URI components.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolHeader 
          title={
            <>
              URL Encode &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Decode</span>
            </>
          }
          description={
            <>
              Percent-encode URLs and query parameters or decode them back to readable text — instantly and privately.
            </>
          }
        />

      <UrlEncodeDecode />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our URL Encoder / Decoder?" color="cyan" />

      <FaqSection faqs={faqs} />
      </>
  );
}
