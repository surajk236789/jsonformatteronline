import { useState } from "react";
import beautify from "js-beautify";

export default function HtmlBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautifyHtml = () => {
    try {
      const pretty = beautify.html(input, { indent_size: 2 });
      setOutput(pretty);
    } catch (e) {
      setOutput("Error beautifying HTML");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">HTML Beautifier</h1>
      <textarea
        className="w-full max-w-2xl h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        placeholder="Paste your HTML here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={beautifyHtml}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Beautify
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Copy
          </button>
        )}
      </div>
      {output && (
        <pre className="w-full max-w-2xl mt-6 p-4 bg-white border rounded-lg shadow overflow-auto">
          {output}
        </pre>
      )}
    </div>
  );
}
