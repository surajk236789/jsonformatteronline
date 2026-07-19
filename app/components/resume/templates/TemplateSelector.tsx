"use client";

import React from "react";
import { useResume } from "../ResumeContext";

const TEMPLATES = [
  { id: "professional", name: "Professional", description: "Clean & standard. Best for corporate." },
  { id: "modern", name: "Modern", description: "Two-column sleek design. Best for tech." },
  { id: "creative", name: "Creative", description: "Bold & vibrant. Best for design." },
];

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
      {TEMPLATES.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => setSelectedTemplate(tpl.id)}
          className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all min-w-[200px] ${
            selectedTemplate === tpl.id
              ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-800"
          }`}
        >
          <span className={`font-bold ${selectedTemplate === tpl.id ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-gray-100"}`}>
            {tpl.name}
          </span>
          <span className="text-sm text-gray-500 mt-1">{tpl.description}</span>
        </button>
      ))}
    </div>
  );
}
