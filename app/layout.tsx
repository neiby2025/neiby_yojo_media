import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import EnhancedCookieConsent from "@/components/EnhancedCookieConsent";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://neiby-yojo.com"),
  title: "Neiby｜体質診断できる養生メディア",
  description:
    "東洋医学の視点から体質診断を行い、個人に合った養生法をお伝えするメディアサイト",
  generator: "v0.dev",
  icons: {
    icon: "/logo-min.jpg",
  },
  other: {
    "google-adsense-account": "ca-pub-1468581508096237",
  },
  openGraph: {
    title: "Neiby｜体質診断できる養生メディア",
    description:
      "東洋医学の視点から体質診断を行い、個人に合った養生法をお伝えするメディアサイト",
    url: "https://neiby-yojo.com",
    siteName: "Neiby",
    images: [
      {
        url: "/images/owner-blog/first-post.jpg",
        width: 1200,
        height: 630,
        alt: "Neiby - 体質診断できる養生メディア",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neiby｜体質診断できる養生メディア",
    description:
      "東洋医学の視点から体質診断を行い、個人に合った養生法をお伝えするメディアサイト",
    images: ["/images/owner-blog/first-post.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1468581508096237" />
      </head>
      <body className={GeistSans.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <EnhancedCookieConsent />
      </body>
    </html>
  );
}
