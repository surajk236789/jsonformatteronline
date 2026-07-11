import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import JsonToCsv from "../../components/JsonToCsv";

export const metadata: Metadata = {
  title: "JSON to CSV Converter | Developer Tools",
  description: "Convert JSON arrays to CSV format instantly.",
  alternates: { canonical: "https://www.jsondiff.space/tools/json-to-csv" },
};

export default function JsonToCsvPage() {
  return (
    <MainLayout>
      <JsonToCsv />
    </MainLayout>
  );
}
