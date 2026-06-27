import { useState } from "react";

export default function Base64ToPdf() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const downloadPdf = () => {
    try {
      const byteCharacters = atob(input);
      const byteNumbers = new Array(byteCharacters.length)
        .fill()
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "output.pdf";
      link.click();
      setError("");
    } catch (e) {
      setError("Invalid Base64 string");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Base64 → PDF Converter</h1>
      <textarea
        className="w-full max-w-2xl h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
        placeholder="Paste your Base64 string here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={downloadPdf}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Download PDF
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
