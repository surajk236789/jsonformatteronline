"use client";

import React, { useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import { useTheme } from "next-themes";

export default function JsonCompare() {
  const { resolvedTheme } = useTheme();

  // Initial placeholder values
  const defaultLeft = "{\n  \"example\": \"old data\",\n  \"nested\": {\n    \"value\": 1\n  }\n}";
  const defaultRight = "{\n  \"example\": \"new data\",\n  \"nested\": {\n    \"value\": 2\n  }\n}";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col h-[80vh]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
          JSON Compare Tool
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Paste your JSON below. Edit directly in the panes to see live, VSCode-style comparison with line numbers and collapsible objects.
        </p>
      </div>

      <div className="flex-grow border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-inner bg-slate-50 dark:bg-slate-900 transition-all duration-200">
        <DiffEditor
          height="100%"
          language="json"
          original={defaultLeft}
          modified={defaultRight}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          options={{
            renderSideBySide: true,
            minimap: { enabled: false },
            wordWrap: "on",
            lineNumbers: "on",
            folding: true,
            originalEditable: true,
            readOnly: false,
          }}
        />
      </div>
    </div>
  );
}
