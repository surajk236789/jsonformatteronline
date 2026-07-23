import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/app/components/ToolLayout";
import JsFormatter from "@/app/components/JsFormatter";

export const metadata: Metadata = {
  title: "JavaScript Formatter & Beautifier Online",
  description: "Format, beautify, and minify your JavaScript code instantly in your browser. 100% secure and private.",
  keywords: ["JavaScript formatter", "JS beautifier", "JS minifier", "format JS online", "minify JavaScript"],
  alternates: { canonical: "https://www.allformatter.com/tools/javascript-formatter" },
  openGraph: {
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format, beautify, and minify your JavaScript code instantly in your browser.",
    url: "https://www.allformatter.com/tools/javascript-formatter",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Formatter & Beautifier Online",
    description: "Format, beautify, and minify your JavaScript code instantly in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function JavascriptFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JavaScript Formatter and Minifier",
    "url": "https://www.allformatter.com/tools/javascript-formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "description": "Format, beautify, and minify your JavaScript code instantly in your browser.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <ToolLayout
      title={<>JavaScript <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Formatter & Minifier</span></>}
      description={<>Instantly beautify or minify your JS code. All processing happens entirely in your browser.</>}
      jsonLd={jsonLd}
    >
      <JsFormatter />
    </ToolLayout>
  );
}
