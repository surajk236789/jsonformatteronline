"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [headerOutput, setHeaderOutput] = useState("");
  const [payloadOutput, setPayloadOutput] = useState("");
  const [error, setError] = useState("");

  const decodeJWT = () => {
    setError("");
    try {
      if (!input.trim()) {
        setHeaderOutput("");
        setPayloadOutput("");
        return;
      }
      const parts = input.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Expected 3 parts separated by dots.");
      }
      
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        const pad = base64.length % 4;
        if (pad) {
          if (pad === 1) throw new Error("Invalid base64url string!");
          base64 += new Array(5 - pad).join("=");
        }
        return decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      };

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      setHeaderOutput(JSON.stringify(header, null, 2));
      setPayloadOutput(JSON.stringify(payload, null, 2));
    } catch (err: any) {
      setError(err.message || "Failed to decode JWT");
      setHeaderOutput("");
      setPayloadOutput("");
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-xl">
          🔑
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            JWT Decoder
          </h2>
          <p className="text-sm text-secondary">
            Decode JSON Web Tokens instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Encoded JWT
          </label>
          <textarea
            className="w-full h-96 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none break-all"
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
            }}
            placeholder={"eyJhbGciOiJIUzI1NiIsInR5cCI... "}
          />
          <div className="mt-4 flex gap-3">
            <Button
              onClick={decodeJWT}
              
            >
              Decode JWT
            </Button>
            <Button
              onClick={() => {
                setInput("");
                setHeaderOutput("");
                setPayloadOutput("");
                setError("");
              }}
              variant="secondary"
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
              Decoded Header
            </label>
            <textarea
              className="w-full h-32 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none text-red-600 dark:text-red-400"
              value={headerOutput}
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
              Decoded Payload
            </label>
            <textarea
              className="w-full h-48 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none text-purple-600 dark:text-purple-400"
              value={payloadOutput}
              readOnly
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
