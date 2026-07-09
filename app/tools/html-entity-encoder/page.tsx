import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HtmlEntityEncoder from "../../components/HtmlEntityEncoder";

export const metadata: Metadata = {
  title: "HTML Entity Encoder / Decoder | Developer Tools",
  description: "Encode or decode HTML entities safely.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/html-entity-encoder" },
};

export default function HtmlEntityEncoderPage() {
  return (
    <MainLayout>
      <HtmlEntityEncoder />
    </MainLayout>
  );
}
