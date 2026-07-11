import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import CsvToJson from "../../components/CsvToJson";

export const metadata: Metadata = {
  title: "CSV to JSON Converter | Developer Tools",
  description: "Convert CSV files to JSON array format instantly.",
  alternates: { canonical: "https://www.jsondiff.space/tools/csv-to-json" },
};

export default function CsvToJsonPage() {
  return (
    <MainLayout>
      <CsvToJson />
    </MainLayout>
  );
}
