import React from "react";
import type { Metadata } from "next";
import MainLayout from "../components/MainLayout";
import JsonToXml from "../components/JsonToXml";

export const metadata: Metadata = {
  title: "JSON to XML Converter Online | Free & Instant | Developer Tools",
  description:
    "Convert JSON to XML online for free. Fast, secure, browser-based JSON to XML converter — no data leaves your device. Supports nested objects, arrays, and all JSON types.",
  keywords: [
    "JSON to XML",
    "Convert JSON to XML",
    "JSON XML Converter",
    "JSON to XML Online",
    "Free JSON Converter",
  ],
  alternates: {
    canonical: "https://jsonformatteronline.com/json-to-xml",
  },
};

export default function JsonToXmlPage() {
  return (
    <MainLayout>
      <JsonToXml />
    </MainLayout>
  );
}
