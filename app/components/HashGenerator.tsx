"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

type Hashes = {
  sha1: string;
  sha256: string;
  sha384: string;
  sha512: string;
};

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

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          #️⃣
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            Hash Generator
          </h2>
          <p className="text-sm text-secondary">
            Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes online.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Input String
          </label>
          <textarea
            className="w-full h-32 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
            placeholder="Type anything here..."
          />
        </div>

        <div className="space-y-4">
          {[
            { label: "SHA-1", value: hashes.sha1 },
            { label: "SHA-256", value: hashes.sha256 },
            { label: "SHA-384", value: hashes.sha384 },
            { label: "SHA-512", value: hashes.sha512 },
          ].map((hash) => (
            <div key={hash.label} className="flex items-center gap-2">
              <div className="flex-1 relative mt-1">
                <label className="block text-xs font-bold text-secondary mb-1">
                  {hash.label}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={hash.value}
                    className="w-full p-2.5 bg-background border border-panel-border rounded-lg text-sm font-mono text-secondary outline-none pr-24"
                    placeholder={`${hash.label} hash will appear here`}
                  />
                  {hash.value && (
                    <button
                      onClick={() => copyToClipboard(hash.label, hash.value)}
                      className="absolute top-1/2 -translate-y-1/2 right-1.5 p-1.5 px-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      {copiedHash === hash.label ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
