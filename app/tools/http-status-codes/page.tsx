import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import HttpStatusCodes from "../../components/HttpStatusCodes";

export const metadata: Metadata = {
  title: "HTTP Status Codes | Developer Tools",
  description: "Lookup reference for HTTP status codes.",
  alternates: { canonical: "https://www.jsondiff.space/tools/http-status-codes" },
};

export default function HttpStatusCodesPage() {
  return (
    <MainLayout>
      <HttpStatusCodes />
    </MainLayout>
  );
}
