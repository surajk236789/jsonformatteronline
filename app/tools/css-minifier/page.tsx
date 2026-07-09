import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import CssMinifier from "../../components/CssMinifier";

export const metadata: Metadata = {
  title: "CSS Minifier | Developer Tools",
  description: "Minify CSS code and reduce file size.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/css-minifier" },
};

export default function CssMinifierPage() {
  return (
    <MainLayout>
      <CssMinifier />
    </MainLayout>
  );
}
