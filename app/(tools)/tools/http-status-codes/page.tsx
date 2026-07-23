import React from "react";
import type { Metadata } from "next";

import HttpStatusCodes from "@/app/components/HttpStatusCodes";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "HTTP Status Codes Reference Online",
  description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
  keywords: ["HTTP Status Codes", "HTTP Response Codes", "404 Meaning", "500 Error Code", "HTTP Reference"],
  alternates: { canonical: "https://www.allformatter.com/tools/http-status-codes" },
  openGraph: {
    title: "HTTP Status Codes Reference Online",
    description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
    url: "https://www.allformatter.com/tools/http-status-codes",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTTP Status Codes Reference Online",
    description: "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🌐", title: "Complete Reference", desc: "All HTTP/1.1 and HTTP/2 status codes from 100 Continue to 599, organized by category." },
  { emoji: "🔍", title: "Instant Search", desc: "Search by code number or keyword — find the status code you need in milliseconds." },
  { emoji: "📖", title: "Plain English Descriptions", desc: "Every status code includes a clear description of what it means and when it's used in real APIs." },
  { emoji: "🎯", title: "Category Grouping", desc: "Browse by category: 2xx Success, 3xx Redirection, 4xx Client Errors, 5xx Server Errors." },
];

const faqs = [
  { q: "What are HTTP status codes?", a: "HTTP status codes are 3-digit numbers that servers return in response to a client's request. They indicate whether the request was successful, redirected, or resulted in an error." },
  { q: "What's the difference between 401 and 403?", a: "401 Unauthorized means the user is not authenticated — they need to log in. 403 Forbidden means the user is authenticated but doesn't have permission to access the resource." },
  { q: "What causes a 500 Internal Server Error?", a: "A 500 error means something went wrong on the server side. It's a generic error that can be caused by unhandled exceptions, misconfigurations, database failures, or bugs in the server code." },
  { q: "Is 301 or 302 better for permanent redirects?", a: "Use 301 for permanent redirects — browsers and search engines will update their cached URL. Use 302 for temporary redirects where the original URL should remain indexed by search engines." },
];


const contentBlocks = [
  {
    title: "What are HTTP Status Codes?",
    body: "HTTP status codes are standard response codes given by web servers on the internet to indicate whether a specific HTTP request has been successfully completed. They are divided into five classes, such as 2xx for success and 4xx for client errors."
  },
  {
    title: "How to Use This Reference",
    body: "Browse through the categorized list of HTTP status codes or use the search bar to find a specific code. Each entry provides a detailed explanation of what the code means and when it is typically used."
  }
];

export default function HttpStatusCodesPage() {
  const relatedTools = [
    {
        "title": "YAML to JSON",
        "desc": "Convert YAML to JSON format.",
        "href": "/tools/yaml-to-json",
        "emoji": "📝"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON to XML",
        "desc": "Convert JSON to well-formed XML.",
        "href": "/tools/json-to-xml",
        "emoji": "🔄"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "HTTP Status Codes References",
        "url": "https://www.allformatter.com/tools/http-status-codes",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Complete HTTP status code reference with descriptions and use cases. Look up any 1xx, 2xx, 3xx, 4xx, or 5xx status code instantly.",
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
    <ToolLayout contentBlocks={contentBlocks}
      title={<>
              HTTP Status Codes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Reference</span>
            </>}
      description={<>
              Complete reference for all HTTP status codes — search by number or keyword and get plain-English explanations instantly.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our HTTP Status Code Reference?" featureColor="sky"
      faqs={faqs}
    >
      <HttpStatusCodes />
    </ToolLayout>
  );
}
