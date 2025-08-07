"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EnhancedCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // 常に有効
    analytics: false,
    advertising: false,
    personalization: false,
  });

  useEffect(() => {
    // 既存の同意状況をチェック
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));

    if (!consent) {
      setShowBanner(true);
    }

    // 初期のGoogle Consent設定
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });
    }
  }, []);

  const acceptAll = () => {
    updateConsent(true, true, true);
    setShowBanner(false);
  };

  const rejectAll = () => {
    updateConsent(false, false, false);
    setShowBanner(false);
  };

  const savePreferences = () => {
    updateConsent(preferences.analytics, preferences.advertising, preferences.personalization);
    setShowBanner(false);
    setShowOptions(false);
  };

  const updateConsent = (analytics: boolean, advertising: boolean, personalization: boolean) => {
    // Cookieの設定
    const hasAnyConsent = analytics || advertising;
    document.cookie = `neiby_cookie_consent=${hasAnyConsent}; path=/; max-age=${365 * 24 * 60 * 60}`;
    
    // 詳細設定用Cookie
    document.cookie = `neiby_consent_analytics=${analytics}; path=/; max-age=${365 * 24 * 60 * 60}`;
    document.cookie = `neiby_consent_advertising=${advertising}; path=/; max-age=${365 * 24 * 60 * 60}`;
    document.cookie = `neiby_consent_personalization=${personalization}; path=/; max-age=${365 * 24 * 60 * 60}`;

    // Google Consent Mode の更新
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: advertising ? "granted" : "denied",
        ad_user_data: advertising ? "granted" : "denied",
        ad_personalization: personalization ? "granted" : "denied",
      });
    }

    // AdSenseの再初期化
    if (advertising && typeof window !== "undefined" && window.adsbygoogle) {
      try {
        (window.adsbygoogle as any[]).push({});
      } catch (error) {
        console.log("AdSense reinitialization:", error);
      }
    }
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {!showOptions ? (
            // メインバナー
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cookie とプライバシーの設定
              </h2>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                当サイトでは、サービスの向上、アクセス解析、および広告配信の最適化のためにCookieと類似技術を使用しています。
                これには、パーソナライズされた広告の表示とGoogle AdSenseによる広告収益の向上が含まれます。
              </p>
              <p className="text-gray-700 mb-6 text-sm">
                詳細については、
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  すべて同意する
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  すべて拒否する
                </button>
                <button
                  onClick={() => setShowOptions(true)}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  オプションを管理
                </button>
              </div>
            </div>
          ) : (
            // 詳細オプション
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cookie設定の詳細
              </h2>
              
              <div className="space-y-4 mb-6">
                {/* 必須Cookie */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">必須Cookie</h3>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    サイトの基本機能に必要です。無効にすることはできません。
                  </p>
                </div>

                {/* アクセス解析Cookie */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">アクセス解析Cookie</h3>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Google Analyticsによるサイト利用状況の分析に使用されます。
                  </p>
                </div>

                {/* 広告Cookie */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">広告Cookie</h3>
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) => setPreferences({...preferences, advertising: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Google AdSenseによる広告配信と収益化に使用されます。
                  </p>
                </div>

                {/* パーソナライゼーションCookie */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">パーソナライゼーションCookie</h3>
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) => setPreferences({...preferences, personalization: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    あなたの興味に基づいたパーソナライズ広告の表示に使用されます。
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  設定を保存
                </button>
                <button
                  onClick={() => setShowOptions(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  戻る
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// TypeScript用の型定義
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    adsbygoogle: any[];
  }
}
