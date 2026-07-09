import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HashGenerator from "../../components/HashGenerator";

export const metadata: Metadata = {
  title: "Hash Generator | Developer Tools",
  description: "Generate MD5, SHA-1, SHA-256 hashes online.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/hash-generator" },
};

export default function HashGeneratorPage() {
  return (
    <MainLayout>
      <HashGenerator />
    </MainLayout>
  );
}
