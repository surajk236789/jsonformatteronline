import React from "react";
import type { Metadata } from "next";

import ImageToBase64 from "@/app/components/ImageToBase64";
import ToolLayout from "@/app/components/ToolLayout";

export const metadata: Metadata = {
  title: "Free Image to Base64 Converter Online",
  description: "Convert images (PNG, JPG, GIF, SVG, WEBP) to Base64 encoding instantly. Secure, browser-based converter. Perfect for embedding images in HTML or CSS.",
  keywords: ["Image to Base64", "Convert Image to Base64", "Base64 Image Encoder", "Data URI Generator"],
  alternates: { canonical: "https://www.allformatter.com/tools/image-to-base64" },
  openGraph: {
    title: "Free Image to Base64 Converter Online",
    description: "Convert images (PNG, JPG, GIF, SVG, WEBP) to Base64 encoding instantly. Secure, browser-based converter. Perfect for embedding images in HTML or CSS.",
    url: "https://www.allformatter.com/tools/image-to-base64",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Base64 Converter Online",
    description: "Convert images (PNG, JPG, GIF, SVG, WEBP) to Base64 encoding instantly. Secure, browser-based converter. Perfect for embedding images in HTML or CSS.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const features = [
  { emoji: "⚡", title: "Instant Conversion", desc: "No uploading or waiting. Images are converted instantly within your web browser." },
  { emoji: "🖼️", title: "All Formats Supported", desc: "Supports all standard web image formats including PNG, JPG, JPEG, GIF, SVG, and WEBP." },
  { emoji: "🛡️", title: "100% Private", desc: "Your images never leave your device. The encoding process happens securely on the client-side." },
  { emoji: "📋", title: "Data URI Included", desc: "The output includes the full Data URI scheme (data:image/png;base64,...) ready to be pasted." },
];

const faqs = [
  { q: "What is an Image to Base64 Converter?", a: "It is a tool that takes a standard binary image file and converts it into a long string of ASCII text (Base64). This text representation can be read by browsers exactly like a normal image file." },
  { q: "Why would I want to convert an image to Base64?", a: "By converting an image to Base64, you can embed the image directly inside your HTML or CSS files using a Data URI. This reduces the number of HTTP requests your website makes, potentially speeding up load times for small icons." },
  { q: "Are there any downsides?", a: "Yes. Base64 strings are generally 33% larger than the original image file size. You should only use Base64 encoding for very small images, logos, or icons. Large photographs will make your HTML/CSS files massive and slow to parse." },
];


const contentBlocks = [
  {
    title: "Why Convert Images to Base64?",
    body: "Converting an image to a Base64 string allows you to embed the image data directly into your HTML or CSS files. This eliminates the need for an external HTTP request to fetch the image, which can speed up the loading time of small icons or logos."
  },
  {
    title: "How to Convert",
    body: "Drag and drop your image file (PNG, JPG, SVG, GIF) into the dropzone. The tool will instantly encode the image and provide the Base64 string formatted as a valid Data URI."
  }
];

export default function ImageToBase64Page() {
  const relatedTools = [
    {
      "title": "Base64 Encode/Decode",
      "desc": "Encode text to Base64 strings.",
      "href": "/tools/base64-encode-decode",
      "emoji": "🔄"
    },
    {
      "title": "URL Encode/Decode",
      "desc": "Safely encode URLs and parameters.",
      "href": "/tools/url-encode-decode",
      "emoji": "🔗"
    },
    {
      "title": "Base64 to PDF",
      "desc": "Convert Base64 back to PDF files.",
      "href": "/tools/base64-to-pdf",
      "emoji": "📄"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Image to Base64 Converter",
        "url": "https://www.allformatter.com/tools/image-to-base64",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "description": "Convert images (PNG, JPG, GIF, SVG, WEBP) to Base64 encoding instantly. Secure, browser-based converter. Perfect for embedding images in HTML or CSS.",
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
        Image to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Base64</span>
      </>}
      description={<>
        Encode any image to a Base64 string instantly for inline embedding.
      </>}
      jsonLd={jsonLd}
      relatedTools={relatedTools}
      features={features} featureTitle="Why encode images to Base64?" featureColor="pink"
      faqs={faqs}
    >
      <ImageToBase64 />
    </ToolLayout>
  );
}
