"use client";

import { useState, useEffect } from "react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      // If consent is already given, update GA consent state
      if (consent === "granted" && typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "granted");
    setShowBanner(false);

    // Update GA consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "denied");
    setShowBanner(false);

    // Update GA consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600 dark:text-gray-300 flex-1">
        We use cookies to analyze traffic and improve your experience. By clicking "Accept", you consent to our use of cookies.
      </div>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={declineCookies}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          Decline
        </button>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
