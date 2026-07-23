import React from "react";
import type { Metadata } from "next";

import CssGradientGenerator from "@/app/components/CssGradientGenerator";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "CSS Gradient Generator Online",
  description: "Create stunning CSS linear and radial gradients visually. Copy the generated CSS code instantly — free, browser-based gradient builder.",
  keywords: ["CSS Gradient Generator", "Linear Gradient CSS", "Radial Gradient Tool", "CSS Background Generator", "Gradient Builder Online"],
  alternates: { canonical: "https://www.allformatter.com/tools/css-gradient-generator" },
  openGraph: {
    title: "CSS Gradient Generator Online",
    description: "Create stunning CSS linear and radial gradients visually. Copy the generated CSS code instantly — free, browser-based gradient builder.",
    url: "https://www.allformatter.com/tools/css-gradient-generator",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator Online",
    description: "Create stunning CSS linear and radial gradients visually. Copy the generated CSS code instantly — free, browser-based gradient builder.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "🌈", title: "Visual Gradient Builder", desc: "Build linear and radial gradients visually with color pickers and direction controls — no CSS knowledge needed." },
  { emoji: "📋", title: "Copy-Ready CSS", desc: "Get production-ready CSS code including vendor prefixes that works across all modern browsers." },
  { emoji: "🎨", title: "Custom Color Stops", desc: "Add as many color stops as you need, set precise positions, and fine-tune opacity for each." },
  { emoji: "👁️", title: "Live Preview", desc: "See your gradient update in real time as you adjust colors, angles, and positions." },
];

const faqs = [
  { q: "What is a CSS gradient?", a: "A CSS gradient is a smooth transition between two or more colors generated entirely using CSS — without needing image files. They are lightweight, scalable, and work on any display resolution." },
  { q: "What's the difference between linear and radial gradients?", a: "Linear gradients transition colors along a straight line (e.g., left to right, top to bottom). Radial gradients transition outward from a center point in a circular or elliptical pattern." },
  { q: "Will the CSS work in all browsers?", a: "Yes. The generated CSS includes the standard syntax that works in all modern browsers. Older browser prefixes (-webkit-) are included for maximum compatibility." },
  { q: "Can I use gradients for text or borders?", a: "Yes! Use 'background-clip: text' for gradient text effects, or apply gradients to borders using 'border-image'. The basic gradient code from this generator works as a starting point." },
];


const contentBlocks = [
  {
    title: "What is a CSS Gradient?",
    body: "CSS gradients let you display smooth transitions between two or more specified colors. They can be linear (going in a straight line) or radial (radiating outward from a center point), providing a modern aesthetic without needing image files."
  },
  {
    title: "How to Generate Gradients",
    body: "Use the color pickers to select your starting and ending colors. Adjust the angle or switch between linear and radial modes. The CSS code is automatically generated for you to copy and paste directly into your stylesheet."
  }
];

export default function CssGradientGeneratorPage() {
  const relatedTools = [
    {
        "title": "Cron Parser",
        "desc": "Parse cron expressions to human readable text.",
        "href": "/tools/cron-parser",
        "emoji": "⏱️"
    },
    {
        "title": "Base64 Encode/Decode",
        "desc": "Encode text to Base64 or decode it.",
        "href": "/tools/base64-encode-decode",
        "emoji": "🔐"
    },
    {
        "title": "HTML Beautifier",
        "desc": "Format and beautify your HTML.",
        "href": "/tools/html-beautifier",
        "emoji": "🌐"
    }
];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "CSS Gradient Generator",
        "url": "https://www.allformatter.com/tools/css-gradient-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Create stunning CSS linear and radial gradients visually. Copy the generated CSS code instantly — free, browser-based gradient builder.",
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
              CSS Gradient <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Generator</span>
            </>}
      description={<>
              Build stunning linear and radial CSS gradients visually — copy the ready-to-use CSS code in one click.
            </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why use our CSS Gradient Generator?" featureColor="purple"
      faqs={faqs}
    >
      <CssGradientGenerator />
    </ToolLayout>
  );
}
