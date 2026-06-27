import { useState } from "react";

export default function JsonBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const beautifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError("");
    } catch (e) {
      setError("Invalid JSON input");
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">JSON Beautifier</h1>
      <textarea
        className="w-full max-w-2xl h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={beautifyJson}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {output && (
        <pre className="w-full max-w-2xl mt-6 p-4 bg-white border rounded-lg shadow overflow-auto">
          {output}
        </pre>
      )}
    </div>
  );
}
