"use client";

import React, { useEffect } from "react";

interface AdSenseContainerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: "true" | "false";
}

export default function AdSenseContainer({
  slot = "", // Leave blank if using Auto Ads, or enter numerical slot ID
  format = "auto",
  responsive = "true",
}: AdSenseContainerProps) {
  const adRef = React.useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only push if the ad container exists and hasn't been filled yet (prevents Strict Mode double-push errors)
    if (adRef.current && adRef.current.innerHTML === "") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense loading error:", err);
      }
    }
  }, []);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-secondary mb-1.5 font-medium">
        Advertisement
      </span>
      <div className="w-full max-w-4xl flex items-center justify-center relative overflow-hidden min-h-[90px]">
        <ins
          ref={adRef}
          className="adsbygoogle w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2678573850280758"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
