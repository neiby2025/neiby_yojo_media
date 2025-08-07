import { Metadata } from "next";

export function generateAdSenseMetadata(): Metadata {
  return {
    other: {
      "google-adsense-account": "ca-pub-1468581508096237",
    },
  };
}

export function AdSenseHead() {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1468581508096237"
        crossOrigin="anonymous"
      />
      <meta name="google-adsense-account" content="ca-pub-1468581508096237" />
    </>
  );
}
