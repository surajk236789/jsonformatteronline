"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "./ui/Button";

export default function HtmlToJsx() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const convert = () => {
    let jsx = input;

    // class -> className
    jsx = jsx.replace(/class=/g, "className=");
    // for -> htmlFor
    jsx = jsx.replace(/for=/g, "htmlFor=");

    // Handle inline styles string to object (naive implementation)
    jsx = jsx.replace(/style="([^"]*)"/g, (_match, styleString: string) => {
      const styles = styleString
        .split(";")
        .filter((s) => s.trim() !== "");
      const obj = styles
        .map((s) => {
          const [k, v] = s.split(":");
          if (!k || !v) return "";
          const camelKey = k
            .trim()
            .replace(/-([a-z])/g, (_g, char: string) => char.toUpperCase());
          return `${camelKey}: "${v.trim().replace(/"/g, "'")}"`;
        })
        .filter((s) => s !== "")
        .join(", ");
      return `style={{${obj}}}`;
    });

    // Close void elements: img, input, br, hr, etc
    const voidTags = [
      "img",
      "input",
      "br",
      "hr",
      "meta",
      "link",
      "source",
      "track",
      "wbr",
      "area",
      "base",
      "col",
      "embed",
      "param",
    ];
    voidTags.forEach((tag) => {
      const regex = new RegExp(`<${tag}([^>]*)>`, "gi");
      jsx = jsx.replace(regex, `<${tag}$1 />`);
    });

    setOutput(jsx);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          ⚛️
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            HTML to JSX Converter
          </h2>
          <p className="text-sm text-secondary">
            Convert standard HTML to React JSX syntax.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Input HTML
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            placeholder={`<div class="container">\n  <img src="logo.png">\n  <label for="name">Name</label>\n  <input type="text" id="name">\n</div>`}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Output JSX
          </label>
          <textarea
            className="w-full h-64 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={output}
            readOnly
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={convert}
          variant="primary"
        >
          Convert to JSX
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
