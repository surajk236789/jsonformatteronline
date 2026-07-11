import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import UrlEncodeDecode from "../../components/UrlEncodeDecode";

export const metadata: Metadata = {
  title: "URL Encode & Decode | Developer Tools",
  description: "Encode or decode URL components easily.",
  alternates: { canonical: "https://www.jsondiff.space/tools/url-encode-decode" },
};

export default function UrlEncodeDecodePage() {
  return (
    <MainLayout>
      <UrlEncodeDecode />
    </MainLayout>
  );
}
