import type { Viewport, Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primeicons/primeicons.css";
import AdSense from "./components/ads/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urls = {
  publicDomain: "https://tipshim.online",
  linkedin: "https://il.linkedin.com/in/eden-berdugo",
};

const keywords = ["table manners", "poker", "chips", "rebuys", "settle up"];
const title = "Table Manners";
const description =
  "Track chips, manage rebuys, and settle up — no confusion, no math";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(urls.publicDomain),
  authors: [{ name: "Eden Berdugo", url: urls.linkedin }],
  keywords,
  creator: "Eden Berdugo",
  publisher: "Oracle - OCI",
  applicationName: "Table Manners",
  openGraph: {
    url: urls.publicDomain,
    title,
    description,
    siteName: "Table Manners",
    images: [
      {
        url: `${urls.publicDomain}/opengraph-image.png`,
      },
    ],
  },
  // alternates: {
  //   canonical: `/`,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "";
  if (publisherId === "") {
    throw new Error("NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is not set");
  }
  return (
    <html lang="en">
      <head>
        <AdSense publisherId={publisherId} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=DM+Serif+Display:ital,opsz,wght@0,6..40,400;1,6..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
