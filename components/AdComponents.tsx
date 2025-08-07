import GoogleAdsense from "./GoogleAdsense";

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

// レスポンシブディスプレイ広告
export function ResponsiveAd({ adSlot, className }: AdBannerProps) {
  return (
    <GoogleAdsense
      adSlot={adSlot}
      adFormat="auto"
      fullWidthResponsive={true}
      className={className}
      adStyle={{
        display: "block",
        width: "100%",
        height: "auto",
      }}
    />
  );
}

// 記事内広告
export function InArticleAd({ adSlot, className }: AdBannerProps) {
  return (
    <div className={`my-8 ${className}`}>
      <GoogleAdsense
        adSlot={adSlot}
        adFormat="fluid"
        className="text-center"
        adStyle={{
          display: "block",
          textAlign: "center",
        }}
      />
    </div>
  );
}

// サイドバー広告
export function SidebarAd({ adSlot, className }: AdBannerProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <GoogleAdsense
        adSlot={adSlot}
        adFormat="auto"
        fullWidthResponsive={false}
        adStyle={{
          display: "block",
          width: "300px",
          height: "250px",
        }}
      />
    </div>
  );
}

// フッター広告
export function FooterAd({ adSlot, className }: AdBannerProps) {
  return (
    <div className={`w-full ${className}`}>
      <GoogleAdsense
        adSlot={adSlot}
        adFormat="auto"
        fullWidthResponsive={true}
        adStyle={{
          display: "block",
          width: "100%",
          height: "90px",
        }}
      />
    </div>
  );
}
