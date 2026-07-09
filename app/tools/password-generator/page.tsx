import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import PasswordGenerator from "../../components/PasswordGenerator";

export const metadata: Metadata = {
  title: "Secure Password Generator | Developer Tools",
  description: "Generate strong, random passwords securely.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/password-generator" },
};

export default function PasswordGeneratorPage() {
  return (
    <MainLayout>
      <PasswordGenerator />
    </MainLayout>
  );
}
