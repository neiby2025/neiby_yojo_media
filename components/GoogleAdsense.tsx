"use client";

import { useEffect, useState } from "react";

interface GoogleAdsenseProps {
  adSlot: string;
  adStyle?: React.CSSProperties;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function GoogleAdsense({
  adSlot,
  adStyle = { display: "block" },
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: GoogleAdsenseProps) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Cookie同意状況をチェック
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));

    if (consent) {
      setConsentGiven(consent.split("=")[1] === "true");
    }

    // Google AdSenseスクリプトの読み込みと初期化
    if (consentGiven && typeof window !== "undefined") {
      try {
        // Google Consentの設定
        if (window.gtag) {
          window.gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
          });
        }
        
        // AdSenseの初期化
        if (window.adsbygoogle) {
          (window.adsbygoogle as any[]).push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [consentGiven]);

  // Cookie同意がない場合は何も表示しない
  if (!consentGiven) {
    return null;
  }

  const adClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

  if (!adClient) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}

// TypeScript用の型定義
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
