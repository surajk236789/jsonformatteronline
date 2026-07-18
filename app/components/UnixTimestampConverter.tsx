"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";

export default function UnixTimestampConverter() {
  const [currentUnix, setCurrentUnix] = useState(Math.floor(Date.now() / 1000));
  const [inputUnix, setInputUnix] = useState("");
  const [inputDate, setInputDate] = useState("");
  
  const [convertedDate, setConvertedDate] = useState("");
  const [convertedUnix, setConvertedUnix] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUnix(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnixChange = (val: string) => {
    setInputUnix(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      // Determine if seconds or milliseconds (naive check: if length > 10 assume ms)
      const isMs = val.length > 10;
      const date = new Date(isMs ? num : num * 1000);
      setConvertedDate(date.toLocaleString() + " (" + Intl.DateTimeFormat().resolvedOptions().timeZone + ")");
    } else {
      setConvertedDate("Invalid Timestamp");
    }
  };

  const handleDateChange = (val: string) => {
    setInputDate(val);
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      setConvertedUnix(Math.floor(date.getTime() / 1000).toString());
    } else {
      setConvertedUnix("Invalid Date");
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-bold text-primary mb-2">Current Unix Timestamp</h2>
        <div className="text-4xl md:text-5xl font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
          {currentUnix}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Timestamp to Date */}
        <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-slate-900/30 border border-panel-border rounded-2xl">
          <h3 className="font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-5 bg-blue-500 rounded-full inline-block"></span>
            Timestamp to Date
          </h3>
          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Timestamp (Seconds or Ms)</label>
            <input 
              type="text"
              value={inputUnix}
              onChange={(e) => handleUnixChange(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-slate-900 border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary font-mono"
              placeholder="e.g. 1718000000"
            />
          </div>
          <div className="mt-2">
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Result</label>
            <div className="p-3 bg-white dark:bg-slate-900 border border-panel-border rounded-xl text-sm font-medium min-h-[44px] flex items-center text-primary">
              {inputUnix ? convertedDate : "Waiting for input..."}
            </div>
          </div>
        </div>

        {/* Date to Timestamp */}
        <div className="flex flex-col gap-4 p-5 bg-slate-50 dark:bg-slate-900/30 border border-panel-border rounded-2xl">
          <h3 className="font-bold text-primary flex items-center gap-2">
            <span className="w-2 h-5 bg-rose-500 rounded-full inline-block"></span>
            Date to Timestamp
          </h3>
          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Date String</label>
            <input 
              type="text"
              value={inputDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-slate-900 border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary font-mono"
              placeholder="e.g. 2026-10-15 14:30:00"
            />
          </div>
          <div className="mt-2">
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Result (Seconds)</label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-white dark:bg-slate-900 border border-panel-border rounded-xl text-sm font-medium font-mono min-h-[44px] flex items-center text-primary">
                {inputDate ? convertedUnix : "Waiting for input..."}
              </div>
              {inputDate && convertedUnix !== "Invalid Date" && (
                <Button 
                  variant="outline" 
                  onClick={() => navigator.clipboard.writeText(convertedUnix)}
                  className="px-4"
                >
                  Copy
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
