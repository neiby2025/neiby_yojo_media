import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import CookieConsentBanner from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Neiby｜体質診断できる養生メディア",
  description:
    "東洋医学の視点から体質診断を行い、個人に合った養生法をお伝えするメディアサイト",
  generator: "v0.dev",
  icons: {
    icon: "/logo-min.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
