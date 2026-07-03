import React from "react";
import type { Metadata } from "next";
import MainLayout from "./components/MainLayout";
import JsonBeautifier from "./components/JsonBeautifier";

export const metadata: Metadata = {
  title: "Best Online JSON Formatter & Beautifier | DevTools Hub",
  description: "Free online JSON Formatter and Beautifier. Format, parse, validate, and minify your JSON data instantly and securely in your browser.",
  keywords: ["JSON Formatter", "JSON Beautifier", "JSON Parser", "Format JSON Online", "JSON Validator"],
  alternates: {
    canonical: "https://jsonformatteronline.com/",
  },
};

export default function JsonBeautifierPage() {
  return (
    <MainLayout>
      <JsonBeautifier />
    </MainLayout>
  );
}
