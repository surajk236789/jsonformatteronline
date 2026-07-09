"use client";
import React, { useState } from "react";

export default function GitCommandGenerator() {
  const [workflow, setWorkflow] = useState("commit");
  const [branch, setBranch] = useState("main");
  const [message, setMessage] = useState("Update files");
  const [remote, setRemote] = useState("origin");

  const getCommand = () => {
    switch (workflow) {
      case "commit":
        return \`git add .\\ngit commit -m "\${message}"\\ngit push \${remote} \${branch}\`;
      case "branch":
        return \`git checkout -b \${branch}\\ngit push -u \${remote} \${branch}\`;
      case "undo":
        return \`git reset --soft HEAD~1\`;
      case "sync":
        return \`git fetch \${remote}\\ngit pull \${remote} \${branch}\`;
      default:
        return "git status";
    }
  };

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🐙
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">Git Command Generator</h2>
          <p className="text-sm text-secondary">Generate common git commands easily.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Workflow</label>
            <select 
              className="w-full p-3 bg-background border border-panel-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={workflow} onChange={(e) => setWorkflow(e.target.value)}
            >
              <option value="commit">Add, Commit & Push</option>
              <option value="branch">Create & Push Branch</option>
              <option value="undo">Undo Last Commit</option>
              <option value="sync">Sync with Remote</option>
            </select>
          </div>

          {(workflow === "commit" || workflow === "branch" || workflow === "sync") && (
            <div>
              <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Branch Name</label>
              <input 
                type="text" value={branch} onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 bg-background border border-panel-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {(workflow === "commit" || workflow === "branch" || workflow === "sync") && (
            <div>
              <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Remote</label>
              <input 
                type="text" value={remote} onChange={(e) => setRemote(e.target.value)}
                className="w-full p-3 bg-background border border-panel-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {workflow === "commit" && (
            <div>
              <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Commit Message</label>
              <input 
                type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-background border border-panel-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Generated Command</label>
          <div className="relative">
            <textarea 
              className="w-full h-48 p-4 bg-slate-900 text-green-400 border border-slate-800 rounded-xl font-mono text-sm outline-none resize-none"
              value={getCommand()}
              readOnly
            />
            <button 
              onClick={() => navigator.clipboard.writeText(getCommand())}
              className="absolute right-3 top-3 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
