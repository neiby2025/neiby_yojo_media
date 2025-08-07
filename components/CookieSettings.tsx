"use client";

import { useState, useEffect } from "react";

interface CookieSettingsProps {
  onToggle?: (enabled: boolean) => void;
}

export default function CookieSettings({ onToggle }: CookieSettingsProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 現在のCookie設定を確認
    const currentConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));

    const isAccepted =
      currentConsent && currentConsent.split("=")[1] === "true";
    setAnalyticsEnabled(isAccepted);
    setIsLoaded(true);
  }, []);

  const toggleAnalytics = () => {
    const newState = !analyticsEnabled;

    // Cookieを設定
    document.cookie = `neiby_cookie_consent=${newState}; path=/; max-age=${
      365 * 24 * 60 * 60
    }`;

    // Google Analyticsの設定を更新
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: newState ? "granted" : "denied",
        ad_storage: newState ? "granted" : "denied",
        ad_user_data: newState ? "granted" : "denied",
        ad_personalization: newState ? "granted" : "denied",
      });
    }

    setAnalyticsEnabled(newState);
    onToggle?.(newState);
  };

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">必須Cookie</h3>
        <p className="text-sm text-gray-600 mb-2">
          サイトの基本機能に必要なCookieです。これらは無効にできません。
        </p>
        <div className="flex items-center">
          <input type="checkbox" checked disabled className="mr-2" />
          <span className="text-sm">常に有効</span>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">アクセス解析・広告Cookie</h3>
        <p className="text-sm text-gray-600 mb-2">
          Google AnalyticsとGoogle AdSenseによるサイトの利用状況分析と広告配信に使用されます。
          パーソナライズされた広告の表示も含まれます。
        </p>
        <button
          className={`px-4 py-2 text-white rounded transition-colors ${
            analyticsEnabled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 hover:bg-gray-700"
          } ${!isLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={toggleAnalytics}
          disabled={!isLoaded}
        >
          {analyticsEnabled ? "無効にする" : "有効にする"}
        </button>
        {analyticsEnabled && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            アクセス解析と広告配信が有効です。パーソナライズ広告が表示されます。
          </div>
        )}
        {!analyticsEnabled && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
            広告配信が無効です。一般的な広告のみが表示され、サイト収益が低下する場合があります。
          </div>
        )}
      </div>
    </div>
  );
}
