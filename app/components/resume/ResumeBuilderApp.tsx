"use client";

import React from "react";
import { useResume } from "./ResumeContext";
import dynamic from "next/dynamic";
import { DynamicPreviewPane } from "./DynamicPreviewPane";

const TemplateShowcase = dynamic(() => import("./TemplateShowcase").then(mod => mod.TemplateShowcase), { ssr: false, loading: () => <div className="p-8 text-center animate-pulse">Loading templates...</div> });
const FormSections = dynamic(() => import("./FormSections").then(mod => mod.FormSections), { ssr: false, loading: () => <div className="p-8 text-center animate-pulse">Loading editor...</div> });

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
