import React from "react";

interface ToolHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="w-full space-y-6 mb-12">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {description}
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-full border border-emerald-200/50 dark:border-emerald-800/50 text-xs font-semibold tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            No Data Stored
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 rounded-full border border-blue-200/50 dark:border-blue-800/50 text-xs font-semibold tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            100% Client-Side
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 rounded-full border border-purple-200/50 dark:border-purple-800/50 text-xs font-semibold tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            Free Forever
          </div>
        </div>
      </div>
    </div>
  );
}
