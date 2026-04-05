import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
} from "@/lib/site-config";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

const ibmPlex = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Medical Books in Sri Lanka`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "medical books Sri Lanka",
    "Librica Med",
    "nursing books",
    "pharmacy books",
    "online medical bookstore",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-LK" className={`${ibmPlex.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-[#001f40]">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
