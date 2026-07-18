"use client";
import React, { useState } from "react";
import { Button } from "./ui/Button";

type RuleType = "Allow" | "Disallow";

interface Directive {
  type: RuleType;
  path: string;
}

interface RuleGroup {
  id: string;
  userAgent: string;
  directives: Directive[];
}

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState<RuleGroup[]>([
    { id: "1", userAgent: "*", directives: [{ type: "Disallow", path: "/admin/" }] }
  ]);
  const [sitemap, setSitemap] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const addRuleGroup = () => {
    setRules([...rules, { id: Date.now().toString(), userAgent: "*", directives: [] }]);
  };

  const removeRuleGroup = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRuleUserAgent = (id: string, agent: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, userAgent: agent } : r));
  };

  const addDirective = (groupId: string, type: RuleType = "Disallow") => {
    setRules(rules.map(r => {
      if (r.id === groupId) {
        return { ...r, directives: [...r.directives, { type, path: "/" }] };
      }
      return r;
    }));
  };

  const removeDirective = (groupId: string, index: number) => {
    setRules(rules.map(r => {
      if (r.id === groupId) {
        const newDirectives = [...r.directives];
        newDirectives.splice(index, 1);
        return { ...r, directives: newDirectives };
      }
      return r;
    }));
  };

  const updateDirective = (groupId: string, index: number, field: "type" | "path", value: string) => {
    setRules(rules.map(r => {
      if (r.id === groupId) {
        const newDirectives = [...r.directives];
        newDirectives[index] = { ...newDirectives[index], [field]: value };
        return { ...r, directives: newDirectives };
      }
      return r;
    }));
  };

  const generateRobotsTxt = () => {
    let output = "";
    rules.forEach(rule => {
      if (!rule.userAgent.trim()) return;
      output += `User-agent: ${rule.userAgent}\n`;
      rule.directives.forEach(d => {
        if (d.path.trim()) {
          output += `${d.type}: ${d.path}\n`;
        }
      });
      output += "\n";
    });
    
    if (sitemap.trim()) {
      output += `Sitemap: ${sitemap}\n`;
    }
    
    return output.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateRobotsTxt());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-6 bg-orange-500 rounded-full inline-block"></span>
              Robots.txt Editor
            </h2>
            <Button variant="secondary" size="sm" onClick={addRuleGroup}>
              + Add Rule Group
            </Button>
          </div>
          
          <div className="space-y-6">
            {rules.map((rule, gIndex) => (
              <div key={rule.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">User Agent</label>
                    <select 
                      value={rule.userAgent}
                      onChange={(e) => updateRuleUserAgent(rule.id, e.target.value)}
                      className="w-full p-2 bg-white dark:bg-slate-900 border border-panel-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="*">* (All Bots)</option>
                      <option value="Googlebot">Googlebot (Google)</option>
                      <option value="Googlebot-Image">Googlebot-Image</option>
                      <option value="Bingbot">Bingbot (Microsoft)</option>
                      <option value="Slurp">Slurp (Yahoo)</option>
                      <option value="DuckDuckBot">DuckDuckBot</option>
                      <option value="Baiduspider">Baiduspider</option>
                      <option value="YandexBot">YandexBot</option>
                      <option value="AhrefsBot">AhrefsBot</option>
                      <option value="SemrushBot">SemrushBot</option>
                    </select>
                  </div>
                  <Button variant="danger" size="icon" className="mt-5" onClick={() => removeRuleGroup(rule.id)} title="Remove Group">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </Button>
                </div>
                
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Directives (Allow / Disallow paths)</label>
                  {rule.directives.map((dir, dIndex) => (
                    <div key={dIndex} className="flex items-center gap-2">
                      <select 
                        value={dir.type}
                        onChange={(e) => updateDirective(rule.id, dIndex, "type", e.target.value)}
                        className="w-28 p-2 bg-white dark:bg-slate-900 border border-panel-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option value="Allow">Allow</option>
                        <option value="Disallow">Disallow</option>
                      </select>
                      <input 
                        type="text"
                        value={dir.path}
                        onChange={(e) => updateDirective(rule.id, dIndex, "path", e.target.value)}
                        className="flex-1 p-2 bg-white dark:bg-slate-900 border border-panel-border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                        placeholder="/wp-admin/"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeDirective(rule.id, dIndex)}>
                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </Button>
                    </div>
                  ))}
                  {rule.directives.length === 0 && <div className="text-xs text-secondary italic">No directives added for this User-agent.</div>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => addDirective(rule.id, "Disallow")}>+ Disallow</Button>
                  <Button variant="outline" size="sm" onClick={() => addDirective(rule.id, "Allow")}>+ Allow</Button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Sitemap URL (Optional)</label>
            <input 
              type="text"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="w-full p-2.5 bg-background border border-panel-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-primary font-mono"
              placeholder="https://example.com/sitemap.xml"
            />
          </div>

        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Generated robots.txt</label>
            <Button onClick={handleCopy} variant="primary" size="sm">
              {copySuccess ? "Copied!" : "Copy Code"}
            </Button>
          </div>
          <textarea 
            readOnly
            value={generateRobotsTxt()}
            className="w-full flex-1 min-h-[400px] p-4 font-mono text-sm border border-panel-border rounded-xl bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 focus:outline-none whitespace-pre"
          />
        </div>

      </div>
    </div>
  );
}
