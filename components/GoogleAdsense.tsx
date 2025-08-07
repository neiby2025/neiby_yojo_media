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
  const [advertisingConsent, setAdvertisingConsent] = useState(false);

  useEffect(() => {
    // 詳細Cookie同意状況をチェック
    const generalConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));
    
    const advertisingConsentCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_consent_advertising="));

    const hasGeneralConsent = generalConsent && generalConsent.split("=")[1] === "true";
    const hasAdvertisingConsent = advertisingConsentCookie 
      ? advertisingConsentCookie.split("=")[1] === "true"
      : hasGeneralConsent; // フォールバック

    setConsentGiven(hasGeneralConsent);
    setAdvertisingConsent(hasAdvertisingConsent);

    // Google AdSenseスクリプトの読み込みと初期化
    if (hasAdvertisingConsent && typeof window !== "undefined") {
      try {
        // AdSenseの初期化
        if (window.adsbygoogle) {
          (window.adsbygoogle as any[]).push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, []);  // 広告Cookie同意がない場合は何も表示しない
  if (!advertisingConsent) {
    return (
      <div className={`adsense-container ${className} text-center p-4 bg-gray-100 rounded`}>
        <p className="text-sm text-gray-600">
          広告を表示するには、
          <button 
            onClick={() => window.location.href = '/cookie-settings'}
            className="text-blue-600 hover:underline mx-1"
          >
            Cookie設定
          </button>
          で広告Cookieを有効にしてください。
        </p>
      </div>
    );
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
