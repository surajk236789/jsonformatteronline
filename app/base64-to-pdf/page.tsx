import React from "react";
import type { Metadata } from "next";
import MainLayout from "../components/MainLayout";
import Base64ToPdf from "../components/Base64ToPdf";

export const metadata: Metadata = {
  title: "Base64 to PDF Converter Online | Devloper Tools",
  description: "Free online Base64 to PDF converter. Instantly decode Base64 strings and preview or download them as PDF documents securely in your browser.",
  keywords: ["Base64 to PDF", "Decode Base64", "Base64 Converter", "Convert Base64 String to PDF"],
  alternates: {
    canonical: "https://jsonformatteronline.com/base64-to-pdf",
  },
};

export default function Base64ToPdfPage() {
  return (
    <MainLayout>
      <Base64ToPdf />
    </MainLayout>
  );
}
