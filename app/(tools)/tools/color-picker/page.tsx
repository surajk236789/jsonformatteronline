import React from "react";
import { Metadata } from "next";
import ToolLayout from "@/app/components/ToolLayout";
import ColorPicker from "@/app/components/ColorPicker";

export const metadata: Metadata = {
  title: "Color Picker & HEX/RGB/HSL Converter | AllFormatter",
  description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL formats.",
  keywords: ["color picker", "HEX converter", "RGB converter", "HSL converter", "color code generator"],
  alternates: { canonical: "https://www.allformatter.com/tools/color-picker" },
  openGraph: {
    title: "Color Picker & HEX/RGB/HSL Converter | AllFormatter",
    description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL.",
    url: "https://www.allformatter.com/tools/color-picker",
    siteName: "AllFormatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker & HEX/RGB/HSL Converter | AllFormatter",
    description: "Free online color picker and converter. Pick colors from a palette and instantly convert between HEX, RGB, and HSL.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ColorPickerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
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
  };

  return (
    <ToolLayout
      title={<>Color Picker & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Converter</span></>}
      description={<>Quickly pick colors and convert values between HEX, RGB, and HSL formats.</>}
      jsonLd={jsonLd}
    >
      <ColorPicker />
    </ToolLayout>
  );
}
