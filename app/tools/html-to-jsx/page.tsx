import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HtmlToJsx from "../../components/HtmlToJsx";

export const metadata: Metadata = {
  title: "HTML to JSX Converter | Developer Tools",
  description: "Convert standard HTML to React JSX syntax.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/html-to-jsx" },
};

export default function HtmlToJsxPage() {
  return (
    <MainLayout>
      <HtmlToJsx />
    </MainLayout>
  );
}
