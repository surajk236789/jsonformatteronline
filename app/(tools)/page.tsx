import React from "react";
import ToolHeader from "@/app/components/ToolHeader";
import type { Metadata } from "next";

import JsonBeautifier from "@/app/components/JsonBeautifier";

export const metadata: Metadata = {
  title: "JSON Formatter & Beautifier Online — Free JSON Parser & Validator | AllFormatter",
  description: "Free JSON Formatter and Beautifier on AllFormatter. Instantly format, validate, minify, and pretty-print JSON data in your browser. Secure and private — no data leaves your device.",
  keywords: [
    "JSON Formatter",
    "JSON Beautifier",
    "JSON Parser",
    "Format JSON Online",
    "JSON Validator",
    "JSON Compare",
    "JSON Minifier",
    "Online JSON Tool",
    "AllFormatter",
    "pretty print JSON",
    "JSON pretty printer",
  ],
  alternates: {
    canonical: "https://www.allformatter.com/",
  },
};

const features = [
  {
    emoji: "⚡",
    title: "Instant Formatting",
    desc: "Paste your JSON and get a beautifully indented, readable result in milliseconds — no waiting, no loading.",
  },
  {
    emoji: "🔒",
    title: "100% Private & Secure",
    desc: "All processing happens entirely in your browser. Your data never reaches our servers — ever.",
  },
  {
    emoji: "✅",
    title: "Real-time Validation",
    desc: "Syntax errors are caught instantly with exact line and position information to help you fix issues fast.",
  },
  {
    emoji: "📦",
    title: "Minify & Compress",
    desc: "Compress JSON to a single line to reduce payload size for APIs, storage, and network transfers.",
  },
];

const faqs = [
  {
    q: "What is a JSON Formatter?",
    a: "A JSON Formatter (also called a JSON Beautifier or Pretty Printer) takes raw or minified JSON and structures it with proper indentation, line breaks, and spacing — making it human-readable and easy to debug.",
  },
  {
    q: "Is my data safe to use here?",
    a: "Absolutely. This tool runs entirely client-side in your browser using JavaScript. No data is sent to any server, logged, or stored. You can even use it offline after the page loads.",
  },
  {
    q: "What's the difference between formatting and minifying JSON?",
    a: "Formatting adds indentation and line breaks to make JSON readable. Minifying removes all whitespace to produce the smallest possible output — ideal for APIs and data transfer.",
  },
  {
    q: "Can it detect JSON errors?",
    a: "Yes. The formatter validates your JSON against the official specification and reports exact syntax errors — like missing commas, unquoted keys, or trailing commas — with a clear message.",
  },
];

export default function JsonBeautifierPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "AllFormatter",
        "url": "https://www.allformatter.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.allformatter.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebApplication",
        "name": "JSON Formatter & Beautifier",
        "url": "https://www.allformatter.com/",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Free JSON Formatter and Beautifier on AllFormatter. Instantly format, validate, minify, and pretty-print JSON data in your browser.",
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
      {/* Page H1 */}
      {/* Page H1 */}
      <ToolHeader 
        title={
          <>JSON Formatter & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Beautifier</span></>
        }
        description="AllFormatter's free JSON Formatter instantly formats, validates, and minifies JSON — fast, and fully private. Your data never leaves your browser."
      />

      {/* Tool */}
      <JsonBeautifier />

      {/* Feature highlights */}
      <section className="mt-20 max-w-4xl mx-auto" aria-label="Features">
        <h2 className="text-xl font-bold text-primary text-center mb-8">
          Why developers choose this tool
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-5 rounded-2xl border border-panel-border bg-panel hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl flex-shrink-0">
                {f.emoji}
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl mx-auto" aria-label="Frequently Asked Questions">
        <h2 className="text-xl font-bold text-primary text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 rounded-2xl border border-panel-border bg-panel [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-bold text-primary list-none">
                <span>{faq.q}</span>
                <span className="transition duration-300 group-open:-rotate-180 text-secondary">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-xs text-secondary leading-relaxed mt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Enhanced Static SEO & Hub Section */}
      <section className="mt-20 max-w-5xl mx-auto rounded-2xl border border-panel-border bg-panel p-8 md:p-12 mb-10" aria-label="About AllFormatter Developer Tools">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-primary mb-4">The Ultimate Developer Toolkit</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            AllFormatter is more than just a JSON Formatter. We provide a comprehensive suite of free, secure, browser-based utilities designed to streamline your daily development workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-indigo-500 mb-3 flex items-center gap-2">
              <span>🗂️</span> Data Formatting & Validation
            </h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Dealing with messy payloads is a thing of the past. Beyond our flagship JSON Beautifier, we offer a <a href="/tools/json-minifier" className="font-semibold text-indigo-500 hover:underline">JSON Minifier</a> for payload compression, a strict <a href="/tools/json-schema-validator" className="font-semibold text-indigo-500 hover:underline">JSON Schema Validator</a>, and seamless converters like <a href="/tools/json-to-xml" className="font-semibold text-indigo-500 hover:underline">JSON to XML</a> and <a href="/tools/yaml-to-json" className="font-semibold text-indigo-500 hover:underline">YAML to JSON</a>. Whether you are building REST APIs or configuring CI/CD pipelines, our tools ensure your data structures are perfectly formatted.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-purple-500 mb-3 flex items-center gap-2">
              <span>🔐</span> Security & Encoding
            </h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Security tasks shouldn't require sending sensitive data to remote servers. Generate cryptographically secure passwords locally with our <a href="/tools/password-generator" className="font-semibold text-purple-500 hover:underline">Password Generator</a>, safely inspect authentication tokens using the <a href="/tools/jwt-decoder" className="font-semibold text-purple-500 hover:underline">JWT Decoder</a>, or transport binary data using our <a href="/tools/base64-encode-decode" className="font-semibold text-purple-500 hover:underline">Base64 Encoder</a>. All cryptographic operations run securely in your browser's memory.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-blue-500 mb-3 flex items-center gap-2">
              <span>🎨</span> Frontend & UI Utilities
            </h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Streamline your frontend development with our UI tools. Clean up legacy markup with the <a href="/tools/html-beautifier" className="font-semibold text-blue-500 hover:underline">HTML Beautifier</a>, optimize your stylesheets for production using the <a href="/tools/css-minifier" className="font-semibold text-blue-500 hover:underline">CSS Minifier</a>, or rapidly prototype components by converting <a href="/tools/html-to-jsx" className="font-semibold text-blue-500 hover:underline">HTML to React JSX</a>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-500 mb-3 flex items-center gap-2">
              <span>📈</span> SEO & Webmaster Tools
            </h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Technical SEO is critical for modern web applications. Generate flawless meta tags, create valid <a href="/tools/robots-txt-generator" className="font-semibold text-emerald-500 hover:underline">robots.txt</a> files, and build comprehensive <a href="/tools/sitemap-generator" className="font-semibold text-emerald-500 hover:underline">XML Sitemaps</a> to ensure search engines can properly crawl and index your sites.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-panel-border text-center">
          <p className="text-sm text-secondary font-medium">
            Read our <a href="/blogs" className="text-indigo-500 hover:underline">Developer Blog</a> for deep dives, tutorials, and best practices on web development, API design, and data structures.
          </p>
        </div>
      </section>
    </>
  );
}
