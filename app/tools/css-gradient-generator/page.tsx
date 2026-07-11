import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import CssGradientGenerator from "../../components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "CSS Gradient Generator | Developer Tools",
  description: "Generate CSS linear and radial gradients.",
  alternates: { canonical: "https://www.jsondiff.space/tools/css-gradient-generator" },
};

export default function CssGradientGeneratorPage() {
  return (
    <MainLayout>
      <CssGradientGenerator />
    </MainLayout>
  );
}
