import React from "react";
import type { Metadata } from "next";
import MainLayout from "../components/MainLayout";
import HtmlBeautifier from "../components/HtmlBeautifier";

export const metadata: Metadata = {
  title: "HTML Beautifier & Formatter Online | DevTools Hub",
  description: "Free online HTML Beautifier and Formatter. Clean, format, and indent your messy HTML code instantly in your browser.",
  keywords: ["HTML Beautifier", "HTML Formatter", "Clean HTML Online", "Format HTML Code", "HTML Parser"],
  alternates: {
    canonical: "https://jsonformatteronline.com/html-beautifier",
  },
};

export default function HtmlBeautifierPage() {
  return (
    <MainLayout>
      <HtmlBeautifier />
    </MainLayout>
  );
}
