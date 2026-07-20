import React from "react";
import FeatureSection from "@/app/components/FeatureSection";
import RelatedTools from "@/app/components/RelatedTools";
import type { Metadata } from "next";

import JwtDecoder from "@/app/components/JwtDecoder";

export const metadata: Metadata = {
  title: "JWT Decoder Online",
  description: "Decode and inspect JSON Web Tokens (JWT) instantly in your browser. View header, payload, and claims — no upload, no registration, 100% private.",
  keywords: [
    "JWT decoder",
    "decode JWT online",
    "JSON Web Token decoder",
    "JWT parser",
    "inspect JWT token",
    "JWT claims viewer",
    "JWT header payload",
    "JWT inspector tool",
    "decode bearer token",
    "JWT debugger",
    "read JWT token online",
  ],
  alternates: { canonical: "https://www.allformatter.com/tools/jwt-decoder" },
  openGraph: {
    title: "JWT Decoder Online",
    description: "Decode and inspect JSON Web Tokens (JWT) instantly in your browser. View header, payload, and claims — no upload, no registration, 100% private.",
    url: "https://www.allformatter.com/tools/jwt-decoder",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder Online",
    description: "Decode and inspect JSON Web Tokens (JWT) instantly in your browser. View header, payload, and claims — no upload, no registration, 100% private.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🔑", title: "Decode Instantly", desc: "Instantly parse and decode the Header and Payload of your JSON Web Token." },
  { emoji: "🔒", title: "Fully Private", desc: "All decoding happens in your browser. Your token is never sent to any server, keeping your credentials secure." },
  { emoji: "⚡", title: "Works Instantly", desc: "No login, no upload, no waiting. Paste your JWT and get the decoded JSON output right away." },
];

export default function JwtDecoderPage() {
  const relatedTools = [
    {
        "title": "JSON Beautifier",
        "desc": "Format, clean, and beautify your JSON data.",
        "href": "/",
        "emoji": "🗂️"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    },
    {
        "title": "JSON Schema Validator",
        "desc": "Validate JSON against a Schema.",
        "href": "/tools/json-schema-validator",
        "emoji": "✅"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "JWT Decoder Online",
        "url": "https://www.allformatter.com/tools/jwt-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Decode and inspect JSON Web Tokens (JWT) instantly in your browser. View header, payload, and claims — no upload, no registration, 100% private.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary leading-tight mb-3">
          JWT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Decoder</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary max-w-2xl mx-auto">
          Decode JSON Web Tokens instantly and securely — entirely in your browser.
        </p>
      </div>

      <JwtDecoder />

      <RelatedTools tools={relatedTools} />

      <FeatureSection features={features} title="Why use our JWT Decoder?" color="purple" />
      </>
  );
}
