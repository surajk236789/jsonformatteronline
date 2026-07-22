"use client";

import React, { useEffect } from "react";

interface AdSenseContainerProps {
  slot?: string;
  format?: string;
  responsive?: string;
}

export default function AdSenseContainer({
  slot = "5523061044",
  format = "auto",
  responsive = "true",
}: AdSenseContainerProps) {
  const adRef = React.useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    const el = adRef.current;

    // Only push ad when the container scrolls near the viewport (200px margin)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el.innerHTML === "") {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.error("AdSense loading error:", err);
          }
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-secondary mb-1.5 font-medium">
        Advertisement
      </span>
      {/* Reserve space to prevent Cumulative Layout Shift (CLS). 
          Auto ads usually load as 280px tall rectangles on mobile, and 90px tall leaderboards on desktop. */}
      <div className="w-full flex items-center justify-center relative overflow-hidden min-h-[280px] md:min-h-[90px]">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-2678573850280758"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
