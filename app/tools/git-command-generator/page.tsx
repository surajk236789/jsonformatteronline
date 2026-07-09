import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import GitCommandGenerator from "../../components/GitCommandGenerator";

export const metadata: Metadata = {
  title: "Git Command Generator | Developer Tools",
  description: "Generate common git commands easily.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/git-command-generator" },
};

export default function GitCommandGeneratorPage() {
  return (
    <MainLayout>
      <GitCommandGenerator />
    </MainLayout>
  );
}
