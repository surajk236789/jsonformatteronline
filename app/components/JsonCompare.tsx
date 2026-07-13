"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const DiffEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.DiffEditor), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-sm text-secondary bg-background/50 animate-pulse">
      Loading Editor...
    </div>
  ),
});

export default function JsonCompare() {
  const { resolvedTheme } = useTheme();

  // Initial placeholder values
  const defaultLeft = "{\n  \"example\": \"old data\",\n  \"nested\": {\n    \"value\": 1\n  }\n}";
  const defaultRight = "{\n  \"example\": \"new data\",\n  \"nested\": {\n    \"value\": 2\n  }\n}";

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col h-[80vh]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
          JSON Compare Tool
        </h2>
        <p className="text-xs text-secondary mt-1">
          Paste your JSON below. Edit directly in the panes to see live, VSCode-style comparison with line numbers and collapsible objects.
        </p>
      </div>

      <div className="flex-grow border border-panel-border rounded-xl overflow-hidden shadow-inner bg-background transition-all duration-200">
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
            showFoldingControls: "always",
            foldingStrategy: "indentation",
            originalEditable: true,
            readOnly: false,
          }}
          onMount={(editor: any) => {
            editor.getOriginalEditor().updateOptions({
              folding: true,
              showFoldingControls: "always",
              foldingStrategy: "indentation",
            });
            editor.getModifiedEditor().updateOptions({
              folding: true,
              showFoldingControls: "always",
              foldingStrategy: "indentation",
            });
          }}
        />
      </div>
    </div>
  );
}
