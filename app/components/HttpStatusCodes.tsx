"use client";
import React, { useState, ChangeEvent } from "react";

type Status = {
  code: number;
  title: string;
  desc: string;
};

const statuses: Status[] = [
  { code: 200, title: "OK", desc: "The request has succeeded." },
  { code: 201, title: "Created", desc: "The request succeeded, and a new resource was created as a result." },
  { code: 204, title: "No Content", desc: "There is no content to send for this request, but the headers may be useful." },
  { code: 301, title: "Moved Permanently", desc: "The URL of the requested resource has been changed permanently." },
  { code: 302, title: "Found", desc: "URI of requested resource has been changed temporarily." },
  { code: 304, title: "Not Modified", desc: "Used for caching purposes. Tells the client that the response has not been modified." },
  { code: 400, title: "Bad Request", desc: "The server could not understand the request due to invalid syntax." },
  { code: 401, title: "Unauthorized", desc: "The client must authenticate itself to get the requested response." },
  { code: 403, title: "Forbidden", desc: "The client does not have access rights to the content." },
  { code: 404, title: "Not Found", desc: "The server can not find the requested resource." },
  { code: 429, title: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time." },
  { code: 500, title: "Internal Server Error", desc: "The server has encountered a situation it does not know how to handle." },
  { code: 502, title: "Bad Gateway", desc: "The server got an invalid response while working as a gateway to get a response." },
  { code: 503, title: "Service Unavailable", desc: "The server is not ready to handle the request (e.g. down for maintenance)." },
  { code: 504, title: "Gateway Timeout", desc: "The server acting as a gateway cannot get a response in time." }
];

export default function HttpStatusCodes() {
  const [search, setSearch] = useState<string>("");

  const filtered = statuses.filter(
    (s) =>
      s.code.toString().includes(search) ||
      s.title.toLowerCase().includes(search.toLowerCase())
  );

  const getColorClass = (code: number): string => {
    if (code >= 200 && code < 300) return "text-emerald-600 dark:text-emerald-400";
    if (code >= 300 && code < 400) return "text-blue-600 dark:text-blue-400";
    if (code >= 400 && code < 500) return "text-amber-600 dark:text-amber-400";
    if (code >= 500) return "text-red-600 dark:text-red-400";
    return "text-slate-600 dark:text-slate-400";
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🌐
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            HTTP Status Codes
          </h2>
          <p className="text-sm text-secondary">
            Lookup reference for HTTP status codes.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by code (e.g. 404) or name (e.g. Not Found)..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="w-full p-4 bg-background border border-panel-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div
            key={s.code}
            className="p-4 rounded-xl border border-panel-border bg-background flex flex-col h-full"
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-xl font-black ${getColorClass(s.code)}`}>
                {s.code}
              </span>
              <span className="text-sm font-bold text-primary">
                {s.title}
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed flex-1">
              {s.desc}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 text-sm">
            No status codes found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
