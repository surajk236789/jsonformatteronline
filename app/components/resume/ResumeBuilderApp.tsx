"use client";

import React from "react";
import { useResume } from "./ResumeContext";
import { TemplateShowcase } from "./TemplateShowcase";
import { FormSections } from "./FormSections";
import { DynamicPreviewPane } from "./DynamicPreviewPane";

import { Button } from "../ui/Button";

export function ResumeBuilderApp() {
  const { hasStartedEditing, setHasStartedEditing } = useResume();

  if (!hasStartedEditing) {
    return <TemplateShowcase />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Editor */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex-1">
          <FormSections />
        </div>
      </div>

      {/* Right Column: Preview */}
      <div className="lg:col-span-3 h-[80vh] lg:h-[calc(100vh-6rem)] sticky top-6">
        <DynamicPreviewPane />
      </div>
    </div>
  );
}
