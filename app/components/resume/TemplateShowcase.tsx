"use client";

import React from "react";
import { useResume } from "./ResumeContext";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { fakeResumeData } from "./fakeResumeData";
import { themeColorMap, ThemeColorName } from "./themeConfig";
import { Check } from "lucide-react";

const templates = [
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "creative", name: "Creative", component: CreativeTemplate },
];

const colors: ThemeColorName[] = ["blue", "indigo", "emerald", "rose", "purple"];

export function TemplateShowcase() {
  const { setSelectedTemplate, setHasStartedEditing, themeColor, setThemeColor } = useResume();

  const handleSelect = (id: string) => {
    setSelectedTemplate(id);
    setHasStartedEditing(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Color Palette Selector - Made compact */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 w-fit mx-auto">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Theme Color</span>
        <div className="flex gap-2 pr-2">
          {colors.map((color) => {
            const hex = themeColorMap[color].primary;
            const isSelected = themeColor === color;
            return (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-sm ${isSelected ? "ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-600 scale-110" : ""}`}
                style={{ backgroundColor: hex }}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative flex flex-col items-center bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => handleSelect(template.id)}
          >
            {/* The wrapper needs to scale the A4 sized resume down so it fits in the card */}
            <div className="w-full relative overflow-hidden rounded-2xl bg-gray-100 aspect-[21/29.7] flex items-center justify-center">
              <div
                className="origin-top w-[21cm] pointer-events-none absolute top-0"
                style={{ transform: "scale(0.33)" }}
              >
                <template.component previewData={fakeResumeData} />
              </div>
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Use this template
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
