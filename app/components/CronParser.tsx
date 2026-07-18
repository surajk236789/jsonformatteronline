"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { CronExpressionParser } from 'cron-parser';
import { Button } from './ui/Button';

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
  const [isValid, setIsValid] = useState<boolean>(true);
  const [parts, setParts] = useState<CronParts>({
    min: "",
    hour: "",
    dom: "",
    month: "",
    dow: "",
  });
  const [nextSchedules, setNextSchedules] = useState<Date[]>([]);

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

        // Naive description logic
        const desc = `Runs at minute ${p[0]}, hour ${p[1]}, day of month ${p[2]}, month ${p[3]}, day of week ${p[4]}`;
        setDescription(desc.replace(/\*/g, "every"));

        try {
          const interval = CronExpressionParser.parse(cron.trim());
          const schedules: Date[] = [];
          for (let i = 0; i < 5; i++) {
            schedules.push(interval.next().toDate());
          }
          setNextSchedules(schedules);
          setIsValid(true);
        } catch (err) {
          // keep previous schedules while typing invalid expression
          setIsValid(false);
          setDescription("Invalid cron values or out of bounds (e.g. day of week > 7)");
        }
      } else {
        setParts({ min: "-", hour: "-", dom: "-", month: "-", dow: "-" });
        setDescription("Invalid cron expression format (needs exactly 5 parts)");
        setIsValid(false);
        // don't clear schedules here either
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
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-bold text-secondary uppercase tracking-wider">
            Cron Expression
          </label>
          <div className="flex gap-2">
            <Button 
              variant="secondary"
              onClick={() => setCron("* * * * *")} 
            >
              Clear
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigator.clipboard.writeText(cron)} 
            >
              Copy
            </Button>
          </div>
        </div>
        <input
          type="text"
          className={`w-full p-4 bg-background border ${isValid ? 'border-panel-border focus:ring-indigo-500' : 'border-red-500 focus:ring-red-500'} rounded-xl text-xl font-mono focus:ring-2 outline-none text-center tracking-widest`}
          value={cron}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCron(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
          <span className="text-xs text-secondary py-1 font-semibold">Presets:</span>
          <Button variant="ghost" size="sm" onClick={() => setCron("* * * * *")}>Every Minute</Button>
          <Button variant="ghost" size="sm" onClick={() => setCron("0 * * * *")}>Every Hour</Button>
          <Button variant="ghost" size="sm" onClick={() => setCron("0 0 * * *")}>Midnight</Button>
          <Button variant="ghost" size="sm" onClick={() => setCron("0 0 * * 1-5")}>Weekdays</Button>
          <Button variant="ghost" size="sm" onClick={() => setCron("0 0 1 * *")}>1st of Month</Button>
        </div>
      </div>

      <div className="mt-8">
        <div className={`text-center font-semibold text-lg mb-8 p-4 rounded-xl ${isValid ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
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

      {nextSchedules.length > 0 && (
        <div className="mt-8 border-t border-panel-border pt-8">
          <h3 className="text-lg font-bold text-primary mb-4 text-center">Next 5 Scheduled Runs</h3>
          <div className="overflow-x-auto rounded-xl border border-panel-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-panel-border/30 text-secondary uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Local Time</th>
                  <th className="px-6 py-3 font-semibold">UTC Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border bg-background">
                {nextSchedules.map((date, idx) => (
                  <tr key={idx} className="hover:bg-panel-border/10 transition-colors">
                    <td className="px-6 py-4 font-mono text-primary whitespace-nowrap">
                      {date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                    </td>
                    <td className="px-6 py-4 font-mono text-secondary whitespace-nowrap">
                      {date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' })} UTC
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
