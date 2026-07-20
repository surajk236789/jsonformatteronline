import React from "react";
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

      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">Why use our JWT Decoder?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-xl flex-shrink-0">{f.emoji}</div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
