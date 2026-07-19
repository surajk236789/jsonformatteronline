"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Button } from "./ui/Button";

type Hashes = {
  sha1: string;
  sha256: string;
  sha384: string;
  sha512: string;
};

const SAMPLE_TEXT = `Hello World!`;

export default function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [hashes, setHashes] = useState<Hashes>({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: "",
  });

  useEffect(() => {
    async function generateHashes() {
      if (!input) {
        setHashes({ sha1: "", sha256: "", sha384: "", sha512: "" });
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const bufferToHex = (buffer: ArrayBuffer): string => {
        return Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      };

      try {
        const [hash1, hash256, hash384, hash512] = await Promise.all([
          crypto.subtle.digest("SHA-1", data),
          crypto.subtle.digest("SHA-256", data),
          crypto.subtle.digest("SHA-384", data),
          crypto.subtle.digest("SHA-512", data),
        ]);

        setHashes({
          sha1: bufferToHex(hash1),
          sha256: bufferToHex(hash256),
          sha384: bufferToHex(hash384),
          sha512: bufferToHex(hash512),
        });
      } catch (e) {
        console.error("Crypto API not available", e);
      }
    }

    generateHashes();
  }, [input]);

  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (label: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedHash(label);
        setTimeout(() => setCopiedHash(null), 2000);
      },
      (err) => console.error("Failed to copy:", err)
    );
  };

  const loadSample = useCallback(() => {
    setInput(SAMPLE_TEXT);
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-yellow-500 rounded-full inline-block" />
            {"Hash Generator"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes securely online."}
          </p>
        </div>
        <Button
          onClick={loadSample}
          variant="secondary"
        >
          {"Paste Sample Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{"Input String"}</span>
            <span className="text-[10px] text-slate-400 normal-case">
              {input.length} chars
            </span>
          </label>
          <textarea
            className="w-full h-80 md:h-[420px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            placeholder="Type anything here to hash..."
            spellCheck={false}
          />
        </div>

        {/* Output Panel (Hashes) */}
        <div className="flex flex-col space-y-4">
          {[
            { label: "SHA-1", value: hashes.sha1 },
            { label: "SHA-256", value: hashes.sha256 },
            { label: "SHA-384", value: hashes.sha384 },
            { label: "SHA-512", value: hashes.sha512 },
          ].map((hash) => (
            <div key={hash.label} className="flex-1 relative flex flex-col">
              <label className="block text-xs font-bold text-secondary mb-1">
                {hash.label}
              </label>
              <div className="relative h-full border border-panel-border rounded-xl bg-background overflow-hidden shadow-inner flex flex-col">
                <textarea
                  readOnly
                  value={hash.value}
                  className="w-full p-4 font-mono text-sm bg-transparent outline-none resize-none text-yellow-600 dark:text-yellow-500 overflow-hidden pr-24"
                  placeholder={`${hash.label} hash will appear here`}
                  rows={2}
                />
                {hash.value && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-3">
                    <Button
                      onClick={() => copyToClipboard(hash.label, hash.value)}
                      title={`Copy ${hash.label}`}
                      className="p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                    >
                      {copiedHash === hash.label ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {"Copied!"}
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          {"Copy"}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-panel-border/50">
        <Button
          onClick={handleClear}
          variant="secondary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {"Clear"}
        </Button>
      </div>
    </div>
  );
}
