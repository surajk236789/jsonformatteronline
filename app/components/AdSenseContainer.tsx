"use client";

import React, { useEffect, useState } from "react";

interface AdSenseContainerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: "true" | "false";
}

export default function AdSenseContainer({
  slot = "default-slot",
  format = "horizontal",
  responsive = "true",
}: AdSenseContainerProps) {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for realistic ad insertion feel
    const timer = setTimeout(() => {
      setAdLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 font-medium">
        Sponsored Advertisement
      </span>
      <div 
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        className="w-full max-w-4xl min-h-[90px] md:min-h-[120px] rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 glass-panel shadow-sm"
      >
        {!adLoaded ? (
          <div className="absolute inset-0 animate-shimmer" />
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 w-full gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/30">
                AD
              </span>
              <div>
                <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Accelerate development with Next.js Turbopack
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Build faster, deploy safer, and deliver optimized static content instantly.
                </p>
              </div>
            </div>
            <button className="glow-button px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer">
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
