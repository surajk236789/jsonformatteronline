"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "./ui/Button";

export default function CssMinifier() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const minify = () => {
    let minified = input;
    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");
    // Remove newlines and tabs
    minified = minified.replace(/\n/g, "").replace(/\t/g, "");
    // Remove multiple spaces
    minified = minified.replace(/\s+/g, " ");
    // Remove spaces around brackets, colons, commas, semicolons
    minified = minified.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    // Remove trailing semicolons before closing brackets
    minified = minified.replace(/;\}/g, "}");

    setOutput(minified.trim());
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          💨
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            CSS Minifier
          </h2>
          <p className="text-sm text-secondary">
            Minify CSS code and reduce file size.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Input CSS
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            placeholder={`body {\n  color: red;\n  margin: 0;\n}`}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Minified CSS
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
            placeholder="body{color:red;margin:0}"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={minify}
          variant="primary"
        >
          Minify CSS
        </Button>
        <Button
          onClick={() => {
            setInput("");
            setOutput("");
          }}
          variant="secondary"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
