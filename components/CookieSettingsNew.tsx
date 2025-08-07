"use client";

import { useState, useEffect } from "react";

interface CookieSettingsProps {
  onToggle?: (settings: any) => void;
}

export default function CookieSettings({ onToggle }: CookieSettingsProps) {
  const [settings, setSettings] = useState({
    analytics: false,
    advertising: false,
    personalization: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 現在のCookie設定を確認
    const analyticsCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_consent_analytics="));
    const advertisingCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_consent_advertising="));
    const personalizationCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_consent_personalization="));

    // フォールバック：古い一般的な同意Cookie
    const generalConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("neiby_cookie_consent="));
    const hasGeneralConsent =
      generalConsent && generalConsent.split("=")[1] === "true";

    const currentSettings = {
      analytics: analyticsCookie
        ? analyticsCookie.split("=")[1] === "true"
        : hasGeneralConsent,
      advertising: advertisingCookie
        ? advertisingCookie.split("=")[1] === "true"
        : hasGeneralConsent,
      personalization: personalizationCookie
        ? personalizationCookie.split("=")[1] === "true"
        : hasGeneralConsent,
    };

    setSettings(currentSettings);
    setIsLoaded(true);
  }, []);

  const updateSetting = (category: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [category]: value };
    setSettings(newSettings);
    saveSetting(category, value);
    onToggle?.(newSettings);
  };

  const saveSetting = (category: string, value: boolean) => {
    // 個別のCookie設定を保存
    document.cookie = `neiby_consent_${category}=${value}; path=/; max-age=${
      365 * 24 * 60 * 60
    }`;

    // 全体の同意状況も更新
    const hasAnyConsent = Object.values({
      ...settings,
      [category]: value,
    }).some((v) => v);
    document.cookie = `neiby_cookie_consent=${hasAnyConsent}; path=/; max-age=${
      365 * 24 * 60 * 60
    }`;

    // Google Consent Mode の更新
    if (typeof window !== "undefined" && (window as any).gtag) {
      const consentUpdate: any = {};

      if (category === "analytics") {
        consentUpdate.analytics_storage = value ? "granted" : "denied";
      }
      if (category === "advertising") {
        consentUpdate.ad_storage = value ? "granted" : "denied";
        consentUpdate.ad_user_data = value ? "granted" : "denied";
      }
      if (category === "personalization") {
        consentUpdate.ad_personalization = value ? "granted" : "denied";
      }

      (window as any).gtag("consent", "update", consentUpdate);
    }
  };

  const acceptAll = () => {
    const allEnabled = {
      analytics: true,
      advertising: true,
      personalization: true,
    };
    setSettings(allEnabled);

    // すべての設定を保存
    Object.entries(allEnabled).forEach(([key, value]) => {
      saveSetting(key, value);
    });

    onToggle?.(allEnabled);
  };

  const rejectAll = () => {
    const allDisabled = {
      analytics: false,
      advertising: false,
      personalization: false,
    };
    setSettings(allDisabled);

    // すべての設定を保存
    Object.entries(allDisabled).forEach(([key, value]) => {
      saveSetting(key, value);
    });

    onToggle?.(allDisabled);
  };

  return (
    <div className="space-y-6">
      {/* 一括操作ボタン */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={acceptAll}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          すべて有効
        </button>
        <button
          onClick={rejectAll}
          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          すべて無効
        </button>
      </div>

      {/* 必須Cookie */}
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

      {/* アクセス解析Cookie */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">アクセス解析Cookie</h3>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={(e) => updateSetting("analytics", e.target.checked)}
            disabled={!isLoaded}
            className="rounded"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Google Analyticsによるサイト利用状況の分析に使用されます。
        </p>
        {settings.analytics && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            アクセス解析が有効です
          </div>
        )}
      </div>

      {/* 広告Cookie */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">広告Cookie</h3>
          <input
            type="checkbox"
            checked={settings.advertising}
            onChange={(e) => updateSetting("advertising", e.target.checked)}
            disabled={!isLoaded}
            className="rounded"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Google AdSenseによる広告配信と収益化に使用されます。
        </p>
        {settings.advertising ? (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            広告配信が有効です。サイト運営をサポートしていただきありがとうございます。
          </div>
        ) : (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
            広告配信が無効です。サイト収益が低下し、コンテンツ提供に影響する場合があります。
          </div>
        )}
      </div>

      {/* パーソナライゼーションCookie */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">パーソナライゼーションCookie</h3>
          <input
            type="checkbox"
            checked={settings.personalization}
            onChange={(e) => updateSetting("personalization", e.target.checked)}
            disabled={!isLoaded}
            className="rounded"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          あなたの興味に基づいたパーソナライズ広告の表示に使用されます。
        </p>
        {settings.personalization ? (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            パーソナライズ広告が有効です
          </div>
        ) : (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
            一般的な広告のみが表示されます
          </div>
        )}
      </div>
    </div>
  );
}
