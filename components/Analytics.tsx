"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Cookie同意状況をチェック
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));

    if (consent) {
      setConsentGiven(consent.split("=")[1] === "true");
    }

    // 初期のGoogle Analytics同意設定
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        wait_for_update: 500,
      });
    }
  }, []);

  if (!gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}

// TypeScript用の型定義
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
