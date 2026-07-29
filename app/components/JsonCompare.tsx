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

// Utility to recursively sort object keys with optimized loops
const sortKeysRecursive = (obj: any): any => {
  if (Array.isArray(obj)) {
    const len = obj.length;
    const result = new Array(len);
    for (let i = 0; i < len; i++) {
      result[i] = sortKeysRecursive(obj[i]);
    }
    return result;
  } else if (obj !== null && typeof obj === "object") {
    const keys = Object.keys(obj).sort();
    const result: any = {};
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      result[key] = sortKeysRecursive(obj[key]);
    }
    return result;
  }
  return obj;
};

// Utility to remove JSON comments (// and /* */) and trailing commas
const stripJsonComments = (jsonString: string) => {
  let cleaned = jsonString.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? "" : m)
  );
  // Remove trailing commas
  cleaned = cleaned.replace(/,\s*([\]}])/g, "$1");
  return cleaned;
};

export default function JsonCompare() {
  const { resolvedTheme } = useTheme();

  // Initial placeholder values
  const defaultLeft = "{\n  \"example\": \"old data\",\n  \"nested\": {\n    \"value\": 1\n  }\n}";
  const defaultRight = "{\n  \"example\": \"new data\",\n  \"nested\": {\n    \"value\": 2\n  }\n}";

  const diffEditorRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (diffEditorRef.current) {
        // Prevents: TextModel got disposed before DiffEditorWidget model got reset
        diffEditorRef.current.setModel(null);
      }
    };
  }, []);

  const getEditors = () => {
    if (!diffEditorRef.current) return null;
    return {
      original: diffEditorRef.current.getOriginalEditor(),
      modified: diffEditorRef.current.getModifiedEditor(),
    };
  };

  const handleFormat = () => {
    const eds = getEditors();
    if (!eds) return;
    const format = (val: string) => {
      // Fast path: Try parsing valid JSON first to avoid expensive Regex
      try {
        return JSON.stringify(JSON.parse(val), null, 2);
      } catch {
        // Slow path: Strip comments and try again
        try {
          const cleanVal = stripJsonComments(val);
          return JSON.stringify(JSON.parse(cleanVal), null, 2);
        } catch {
          return val; // Return as-is if parsing fails
        }
      }
    };
    eds.original.setValue(format(eds.original.getValue()));
    eds.modified.setValue(format(eds.modified.getValue()));
  };

  const handleSortKeys = () => {
    const eds = getEditors();
    if (!eds) return;
    const process = (val: string) => {
      let obj;
      // Fast path: Try parsing valid JSON first
      try {
        obj = JSON.parse(val);
      } catch {
        // Slow path: Strip comments and try again
        try {
          obj = JSON.parse(stripJsonComments(val));
        } catch {
          return val;
        }
      }
      return JSON.stringify(sortKeysRecursive(obj), null, 2);
    };
    eds.original.setValue(process(eds.original.getValue()));
    eds.modified.setValue(process(eds.modified.getValue()));
  };

  const handleStripComments = () => {
    const eds = getEditors();
    if (!eds) return;
    eds.original.setValue(stripJsonComments(eds.original.getValue()));
    eds.modified.setValue(stripJsonComments(eds.modified.getValue()));
  };

  const handleSwap = () => {
    const eds = getEditors();
    if (!eds) return;
    const val1 = eds.original.getValue();
    const val2 = eds.modified.getValue();
    eds.original.setValue(val2);
    eds.modified.setValue(val1);
  };

  const handleClear = () => {
    const eds = getEditors();
    if (!eds) return;
    eds.original.setValue("");
    eds.modified.setValue("");
  };

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col h-[80vh]">
      <div className="flex items-start justify-between mb-4 flex-shrink-0 flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
            JSON Compare
          </h2>
          <p className="text-xs text-secondary mt-1">
            Paste your JSON below. Edit directly in the panes to see live, VSCode-style comparison.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleFormat}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm text-slate-700 dark:text-slate-300"
            title="Format both JSON objects"
          >
            <span>✨</span> Format
          </button>
          <button
            onClick={handleSortKeys}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm text-slate-700 dark:text-slate-300"
            title="Sort JSON keys alphabetically"
          >
            <span>🔤</span> Sort Keys
          </button>
          <button
            onClick={handleStripComments}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm text-slate-700 dark:text-slate-300"
            title="Remove // and /* */ comments and trailing commas"
          >
            <span>🧹</span> Strip Comments
          </button>
          <button
            onClick={handleSwap}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm text-slate-700 dark:text-slate-300"
            title="Swap left and right editors"
          >
            <span>🔄</span> Swap
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs font-semibold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center gap-1.5 shadow-sm text-red-600 dark:text-red-400"
            title="Clear both editors"
          >
            <span>🗑️</span> Clear
          </button>
        </div>
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
            diffEditorRef.current = editor;
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
