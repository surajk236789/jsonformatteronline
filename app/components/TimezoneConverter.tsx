"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";

const COMMON_TIMEZONES = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", 
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai", 
  "Asia/Kolkata", "Australia/Sydney", "Pacific/Auckland"
];

export default function TimezoneConverter() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    "UTC",
    Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
    "Asia/Tokyo"
  ]);
  
  // Base time in UTC milliseconds
  const [baseTimeMs, setBaseTimeMs] = useState<number>(Date.now());
  const [newTzInput, setNewTzInput] = useState("");

  const addTimezone = () => {
    if (newTzInput && !selectedTimezones.includes(newTzInput)) {
      setSelectedTimezones([...selectedTimezones, newTzInput]);
      setNewTzInput("");
    }
  };

  const removeTimezone = (tz: string) => {
    setSelectedTimezones(selectedTimezones.filter(t => t !== tz));
  };

  const handleTimeChange = (tz: string, dateTimeLocalString: string) => {
    if (!dateTimeLocalString) return;
    try {
      // Parse the local time string AS IF it was in the given timezone
      // Easiest way in JS without huge libraries: construct an ISO string with the appropriate offset
      // Since native Date doesn't support parsing in a specific tz easily, we will do a trick:
      // We will parse it in local browser time, then adjust by the offset difference.
      
      const d = new Date(dateTimeLocalString); // Parsed as browser local time
      if (isNaN(d.getTime())) return;
      
      // Calculate offset of the target TZ at that date
      const tzString = d.toLocaleString("en-US", { timeZone: tz });
      const tzDate = new Date(tzString);
      
      const diff = d.getTime() - tzDate.getTime();
      const actualUtcTime = d.getTime() + diff;
      
      setBaseTimeMs(actualUtcTime);
    } catch (e) {}
  };

  const formatForInput = (ms: number, tz: string) => {
    // Return yyyy-MM-ddThh:mm for the input type="datetime-local"
    try {
      const d = new Date(ms);
      
      // Format parts in specific timezone
      const formatter = new Intl.DateTimeFormat("en-CA", { // en-CA gives YYYY-MM-DD
        timeZone: tz,
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: false
      });
      
      // en-CA output: "2026-10-15, 14:30"
      const parts = formatter.formatToParts(d);
      let year, month, day, hour, minute;
      parts.forEach(p => {
        if (p.type === 'year') year = p.value;
        if (p.type === 'month') month = p.value;
        if (p.type === 'day') day = p.value;
        if (p.type === 'hour') hour = p.value === "24" ? "00" : p.value;
        if (p.type === 'minute') minute = p.value;
      });
      
      return `${year}-${month}-${day}T${hour}:${minute}`;
    } catch (e) {
      return "";
    }
  };

  const formatDisplay = (ms: number, tz: string) => {
    try {
      return new Date(ms).toLocaleString("en-US", { 
        timeZone: tz, 
        weekday: 'short', month: 'short', day: 'numeric', 
        hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short'
      });
    } catch (e) {
      return "Invalid Timezone";
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
          Timezone Converter
        </h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setBaseTimeMs(Date.now())}>
            Reset to Now
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800">
        <select 
          value={newTzInput}
          onChange={(e) => setNewTzInput(e.target.value)}
          className="flex-1 p-2 bg-white dark:bg-slate-950 border border-panel-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
        >
          <option value="">Select a timezone to add...</option>
          {COMMON_TIMEZONES.filter(tz => !selectedTimezones.includes(tz)).map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
        <Button variant="primary" onClick={addTimezone}>Add</Button>
      </div>

      <div className="space-y-4">
        {selectedTimezones.map(tz => (
          <div key={tz} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border border-panel-border bg-white dark:bg-slate-900/50 transition-colors hover:border-indigo-300 dark:hover:border-indigo-800">
            <div className="w-full md:w-1/3">
              <div className="font-bold text-primary text-sm">{tz.split("/").pop()?.replace("_", " ")}</div>
              <div className="text-xs text-secondary">{tz}</div>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center">
              <input 
                type="datetime-local"
                value={formatForInput(baseTimeMs, tz)}
                onChange={(e) => handleTimeChange(tz, e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-panel-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary"
              />
            </div>

            <div className="w-full md:w-1/3 flex justify-between items-center">
              <div className="text-sm font-medium text-indigo-700 dark:text-indigo-400">
                {formatDisplay(baseTimeMs, tz)}
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeTimezone(tz)} title="Remove">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
