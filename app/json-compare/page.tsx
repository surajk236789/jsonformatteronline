import React from "react";
import type { Metadata } from "next";
import MainLayout from "../components/MainLayout";
import JsonCompare from "../components/JsonCompare";

export const metadata: Metadata = {
  title: "JSON Compare Tool Online | Visual Diff & Editor",
  description: "Free online JSON Compare tool. Visually compare differences between two JSON objects side-by-side using our advanced Monaco Editor with folding and line numbers.",
  keywords: ["JSON Compare", "JSON Diff", "Compare JSON Online", "JSON Visualizer", "Diff Editor"],
  alternates: {
    canonical: "https://www.jsondiff.space/json-compare",
  },
};

export default function JsonComparePage() {
  return (
    <MainLayout>
      <JsonCompare />
    </MainLayout>
  );
}
