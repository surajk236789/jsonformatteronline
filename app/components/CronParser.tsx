"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

type CronParts = {
  min: string;
  hour: string;
  dom: string;
  month: string;
  dow: string;
};

export default function CronParser() {
  const [cron, setCron] = useState<string>("*/5 * * * *");
  const [description, setDescription] = useState<string>("");
  const [parts, setParts] = useState<CronParts>({
    min: "",
    hour: "",
    dom: "",
    month: "",
    dow: "",
  });

  useEffect(() => {
    const parse = () => {
      const p = cron.trim().split(/\s+/);
      if (p.length === 5) {
        const newParts: CronParts = {
          min: p[0],
          hour: p[1],
          dom: p[2],
          month: p[3],
          dow: p[4],
        };
        setParts(newParts);

        // Very naive description logic
        const desc = `Runs at minute ${p[0]}, hour ${p[1]}, day of month ${p[2]}, month ${p[3]}, day of week ${p[4]}`;
        setDescription(desc.replace(/\*/g, "every"));
      } else {
        setParts({ min: "-", hour: "-", dom: "-", month: "-", dow: "-" });
        setDescription("Invalid cron expression format (needs exactly 5 parts)");
      }
    };
    parse();
  }, [cron]);

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          ⏰
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">Cron Expression Parser</h2>
          <p className="text-sm text-secondary">Parse and explain crontab expressions.</p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
          Cron Expression
        </label>
        <input
          type="text"
          className="w-full p-4 bg-background border border-panel-border rounded-xl text-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none text-center tracking-widest"
          value={cron}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCron(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <div className="text-center font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-8 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
          "{description}"
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-background border border-panel-border p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">Minute</div>
            <div className="text-xl font-mono text-primary font-bold">{parts.min}</div>
          </div>
          <div className="bg-background border border-panel-border p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">Hour</div>
            <div className="text-xl font-mono text-primary font-bold">{parts.hour}</div>
          </div>
          <div className="bg-background border border-panel-border p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">Day (Month)</div>
            <div className="text-xl font-mono text-primary font-bold">{parts.dom}</div>
          </div>
          <div className="bg-background border border-panel-border p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">Month</div>
            <div className="text-xl font-mono text-primary font-bold">{parts.month}</div>
          </div>
          <div className="bg-background border border-panel-border p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">Day (Week)</div>
            <div className="text-xl font-mono text-primary font-bold">{parts.dow}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
