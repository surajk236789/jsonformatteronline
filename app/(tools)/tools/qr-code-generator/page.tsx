import React from "react";
import type { Metadata } from "next";

import QrCodeGenerator from "@/app/components/QrCodeGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online | High-Res PNG Download",
  description: "Create custom QR codes for URLs, text, and data online. Customize colors and error correction levels. Download high-resolution PNGs instantly for free.",
  keywords: ["QR Code Generator", "Create QR Code", "QR Code Maker", "Custom QR Code", "Free QR Code"],
  alternates: { canonical: "https://www.allformatter.com/tools/qr-code-generator" },
  openGraph: {
    title: "Free QR Code Generator Online | High-Res PNG Download",
    description: "Create custom QR codes for URLs, text, and data online. Customize colors and error correction levels. Download high-resolution PNGs instantly for free.",
    url: "https://www.allformatter.com/tools/qr-code-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator Online | High-Res PNG Download",
    description: "Create custom QR codes for URLs, text, and data online. Customize colors and error correction levels. Download high-resolution PNGs instantly for free.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Generation", desc: "Your QR code updates in real-time as you type or change colors." },
  { emoji: "🎨", title: "Custom Colors", desc: "Easily change the foreground and background colors to match your brand." },
  { emoji: "📥", title: "High-Res Download", desc: "Export your QR code as a crisp, high-resolution PNG file ready for printing." },
  { emoji: "🔒", title: "100% Private", desc: "Your data is converted to a QR code directly in your browser. We do not track or save your links." },
];

const faqs = [
  { q: "What is a QR Code?", a: "QR stands for 'Quick Response'. It is a two-dimensional barcode that can store data such as website URLs, plain text, or contact information, which can be read easily by a digital device like a smartphone camera." },
  { q: "What is Error Correction Level?", a: "Error correction allows a QR code to remain scannable even if part of it is damaged, covered, or dirty. 'Low' allows ~7% damage recovery, while 'High' allows up to 30% recovery (great for adding logos in the center)." },
  { q: "Do these QR codes expire?", a: "No! The QR codes generated here are 'Static' QR codes. They directly contain the text or URL you input, meaning they will work forever and never expire." },
];

export default function QrCodeGeneratorPage() {
  const relatedTools = [
    {
      "title": "Base64 Encode",
      "desc": "Encode strings to Base64.",
      "href": "/tools/base64-encode-decode",
      "emoji": "🔄"
    },
    {
      "title": "URL Encode",
      "desc": "Safely encode URLs and parameters.",
      "href": "/tools/url-encode-decode",
      "emoji": "🔗"
    },
    {
      "title": "UUID Generator",
      "desc": "Generate random v4 UUIDs.",
      "href": "/tools/uuid-generator",
      "emoji": "🆔"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "QR Code Generator",
        "url": "https://www.allformatter.com/tools/qr-code-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Create custom QR codes for URLs, text, and data online. Customize colors and error correction levels. Download high-resolution PNGs instantly for free.",
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
    <ToolLayout
      title={<>
        QR Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Generator</span>
      </>}
      description={<>
        Create custom, high-quality QR codes instantly. Free, private, and no expiration dates.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our QR Generator?" featureColor="indigo"
      faqs={faqs}
    >
      <QrCodeGenerator />
    </ToolLayout>
  );
}
