import "./globals.css";
import { SITE_NAME } from "@/lib/site";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://fretwork.app"),
  title: {
    default: `${SITE_NAME}: free interactive guitar theory tools`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Free, interactive guitar tools and plain-language lessons: tuner, CAGED fretboard explorer, chord library, ear trainer, metronome, and more. No paywalls, no account required.",
  keywords: [
    "guitar tuner online",
    "CAGED system chart",
    "chord finder",
    "guitar ear trainer",
    "metronome",
    "circle of fifths",
    "nashville number system",
  ],
  openGraph: {
    title: `${SITE_NAME}: free interactive guitar theory tools`,
    description:
      "Interactive guitar tools and lessons for players who want to understand the neck. Everything free.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#191411",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
