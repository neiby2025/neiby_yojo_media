"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieSettingsPage() {
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
      });
    }

    setAnalyticsEnabled(newState);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-slate-100 py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-10 tracking-tight">
          Cookie設定
        </h1>

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Cookie使用について</h2>
            <p className="text-gray-700 mb-4">
              当サイトでは、サイトの機能向上とアクセス解析のためにCookieを使用しています。
              以下からCookieの使用に関する設定を変更できます。
            </p>
          </div>

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
              <h3 className="font-semibold mb-2">アクセス解析Cookie</h3>
              <p className="text-sm text-gray-600 mb-2">
                Google Analyticsによるサイトの利用状況分析に使用されます。
              </p>
              <button
                className={`px-4 py-2 text-white rounded transition-colors ${
                  analyticsEnabled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-600 hover:bg-gray-700"
                } ${!isLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (isLoaded) {
                    toggleAnalytics();
                  }
                }}
                disabled={!isLoaded}
              >
                {analyticsEnabled ? "無効にする" : "有効にする"}
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Cookie設定の変更について</h3>
            <p className="text-sm text-gray-600">
              設定を変更した場合、ページを再読み込みすると新しい設定が適用されます。
              詳細については
              <Link href="/privacy" className="text-blue-600 hover:underline">
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
