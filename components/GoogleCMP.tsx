"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    __tcfapi?: (command: string, version: number, callback: Function, parameter?: any) => void;
  }
}

export default function GoogleCMP() {
  useEffect(() => {
    // Google Funding Choices (CMP) の初期設定
    if (typeof window !== "undefined") {
      // 初期同意状態を拒否に設定
      if (window.gtag) {
        window.gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          wait_for_update: 500,
        });
      }
    }
  }, []);

  return (
    <>
      {/* Google Funding Choices Script */}
      <Script
        id="google-funding-choices"
        src={`https://fundingchoicesmessages.google.com/i/${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}?ers=1`}
        strategy="afterInteractive"
      />
      
      {/* Google FC Present Script */}
      <Script
        id="google-fc-present"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function signalGooglefcPresent() {
                if (!window.frames['googlefcPresent']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                    iframe.name = 'googlefcPresent';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
              signalGooglefcPresent();
            })();
          `,
        }}
      />

      {/* TCF API Listener */}
      <Script
        id="tcf-api-listener"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function addConsentListener() {
                if (typeof window.__tcfapi === 'function') {
                  window.__tcfapi('addEventListener', 2, function(tcData, success) {
                    if (success && tcData) {
                      // ユーザーが同意を変更した時の処理
                      if (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded') {
                        const hasAnalyticsConsent = tcData.purpose?.consents?.[1] || false; // Analytics
                        const hasAdsConsent = tcData.purpose?.consents?.[3] || false; // Ad selection/delivery/reporting
                        const hasPersonalizationConsent = tcData.purpose?.consents?.[4] || false; // Personalization
                        
                        // Google Consent Mode の更新
                        if (window.gtag) {
                          window.gtag('consent', 'update', {
                            analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
                            ad_storage: hasAdsConsent ? 'granted' : 'denied',
                            ad_user_data: hasAdsConsent ? 'granted' : 'denied',
                            ad_personalization: hasPersonalizationConsent ? 'granted' : 'denied',
                          });
                        }
                        
                        // カスタムCookieの設定（既存システムとの互換性のため）
                        const hasOverallConsent = hasAnalyticsConsent && hasAdsConsent;
                        document.cookie = 'neiby_cookie_consent=' + hasOverallConsent + '; path=/; max-age=' + (365 * 24 * 60 * 60);
                        
                        console.log('Consent updated:', {
                          analytics: hasAnalyticsConsent,
                          ads: hasAdsConsent,
                          personalization: hasPersonalizationConsent
                        });
                      }
                    }
                  });
                } else {
                  // TCF API が読み込まれるまで待機
                  setTimeout(addConsentListener, 100);
                }
              }
              
              addConsentListener();
            })();
          `,
        }}
      />
    </>
  );
}
