"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="同意する"
      declineButtonText="拒否する"
      enableDeclineButton
      cookieName="neiby_cookie_consent"
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        fontSize: "14px",
        padding: "20px",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
      }}
      buttonStyle={{
        backgroundColor: "#3b82f6",
        color: "white",
        fontSize: "14px",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginLeft: "10px",
      }}
      declineButtonStyle={{
        backgroundColor: "transparent",
        color: "#d1d5db",
        fontSize: "14px",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "1px solid #6b7280",
        cursor: "pointer",
        marginLeft: "10px",
      }}
      expires={365}
      onAccept={() => {
        // Google Analyticsとアドセンスを有効化
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
          });
        }

        // AdSenseの再初期化
        if (typeof window !== "undefined" && window.adsbygoogle) {
          try {
            (window.adsbygoogle as any[]).forEach((ad: any) => {
              (window.adsbygoogle as any[]).push({});
            });
          } catch (error) {
            console.log("AdSense reinitialization:", error);
          }
        }
      }}
      onDecline={() => {
        // Google Analyticsとアドセンスを無効化
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          });
        }
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <div className="flex-1">
          当サイトでは、サービスの向上、アクセス解析、および広告配信の最適化のためにCookieを使用しています。
          これには、パーソナライズされた広告の表示とGoogle
          AdSenseによる広告収益の向上が含まれます。
          <Link href="/privacy" className="text-blue-400 hover:underline ml-1">
            プライバシーポリシー
          </Link>
          および
          <Link
            href="/cookie-settings"
            className="text-blue-400 hover:underline ml-1"
          >
            Cookie設定
          </Link>
          をご確認の上、ご利用ください。
        </div>
      </div>
    </CookieConsent>
  );
}

// TypeScript用の型定義
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
