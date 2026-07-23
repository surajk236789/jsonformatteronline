import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/app/components/ToolLayout";
import ColorPicker from "@/app/components/ColorPicker";

export const metadata: Metadata = {
  title: "Color Picker & HEX RGB HSL Converter Online",
  description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL formats.",
  keywords: ["color picker", "HEX converter", "RGB converter", "HSL converter", "color code generator"],
  alternates: { canonical: "https://www.allformatter.com/tools/color-picker" },
  openGraph: {
    title: "Color Picker & HEX RGB HSL Converter Online",
    description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL.",
    url: "https://www.allformatter.com/tools/color-picker",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker & HEX RGB HSL Converter Online",
    description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL.",
  },
  robots: {
    index: true,
    follow: true,
  }
};


const faqs = [
  { q: "How do I convert HEX to RGB?", a: "Our color picker automatically converts any color you select into HEX, RGB, and HSL values instantly." },
  { q: "What is the difference between HEX and RGB?", a: "HEX is a base-16 representation commonly used in web design, while RGB defines the mix of Red, Green, and Blue light." },
  { q: "Is this color picker free to use?", a: "Yes, it is 100% free and works entirely in your browser." }
];

export default function ColorPickerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
    "name": "Color Picker and Converter",
    "url": "https://www.allformatter.com/tools/color-picker",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Any",
    "description": "Pick colors and convert between HEX, RGB, and HSL formats.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
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
    <ToolLayout faqs={faqs}
      title={<>Color Picker & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Converter</span></>}
      description={<>Quickly pick colors and convert values between HEX, RGB, and HSL formats.</>}
      jsonLd={jsonLd}
    >
      <ColorPicker />
    </ToolLayout>
  );
}
