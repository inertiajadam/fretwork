import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_NAME } from "@/lib/site";
import { SITE_URL } from "@/lib/seo";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ThemeScript from "@/components/ThemeScript";
import { SavedProvider } from "@/components/SavedProvider";
import { AuthProvider } from "@/components/AuthProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const DEFAULT_TITLE = `${SITE_NAME}: free interactive guitar theory tools`;
const DEFAULT_DESCRIPTION =
  "Free, interactive guitar tools and plain-language lessons: tuner, CAGED fretboard explorer, chord library, ear trainer, metronome, and more. No paywalls, no account required.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "guitar tuner online",
    "CAGED system chart",
    "chord finder",
    "guitar ear trainer",
    "online metronome",
    "circle of fifths",
    "nashville number system",
    "guitar theory tools",
    "learn guitar fretboard",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  category: "music",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description:
      "Interactive guitar tools and lessons for players who want to understand the neck. Everything free.",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Interactive guitar tools and lessons for players who want to understand the neck. Everything free.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#191411" },
    { media: "(prefers-color-scheme: light)", color: "#F4EEE1" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,650&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <SavedProvider>
            <SiteNav />
            <main>{children}</main>
            <SiteFooter />
          </SavedProvider>
        </AuthProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
