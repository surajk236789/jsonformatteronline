import React from "react";
import type { Metadata } from "next";
import MainLayout from "../../components/MainLayout";
import JsonSchemaValidator from "../../components/JsonSchemaValidator";

export const metadata: Metadata = {
  title: "JSON Schema Validator | Developer Tools",
  description: "Validate JSON against a JSON Schema.",
  alternates: { canonical: "https://jsonformatteronline.com/tools/json-schema-validator" },
};

export default function JsonSchemaValidatorPage() {
  return (
    <MainLayout>
      <JsonSchemaValidator />
    </MainLayout>
  );
}
