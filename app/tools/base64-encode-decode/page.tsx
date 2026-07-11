import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import Base64EncodeDecode from "../../components/Base64EncodeDecode";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode | Developer Tools",
  description: "Encode to or decode from Base64 string formats.",
  alternates: { canonical: "https://www.jsondiff.space/tools/base64-encode-decode" },
};

export default function Base64EncodeDecodePage() {
  return (
    <MainLayout>
      <Base64EncodeDecode />
    </MainLayout>
  );
}
