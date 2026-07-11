import React from "react";
import type { Metadata } from "next";
import MainLayout from "./components/MainLayout";
import JsonBeautifier from "./components/JsonBeautifier";

export const metadata: Metadata = {
  title: "Best Online JSON Formatter & Beautifier | Developer Tools",
  description:
    "Free online JSON Formatter and Beautifier. Format, parse, validate, and minify your JSON data instantly and securely in your browser.",
  keywords: [
    "JSON Formatter",
    "JSON Beautifier",
    "JSON Parser",
    "Format JSON Online",
    "JSON Validator",
    "JSON Compare"
  ],
  alternates: {
    canonical: "https://www.jsondiff.space/",
  },
};

export default function JsonBeautifierPage() {
  return (
    <MainLayout>
      <JsonBeautifier />
    </MainLayout>
  );
}
