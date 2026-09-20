import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ConsentAwareAnalytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/content/site";
import { organizationGraph } from "@/lib/schema";
import { brandIntroBootstrap } from "@/lib/brand-intro";
import { consentFirstPaintBootstrap } from "@/lib/consent";
import "./globals.css";

// The same installed brand fonts, discovered in the initial HTML rather than
// after downloading and parsing the stylesheet. No requests to Google Fonts.
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});
const spaceGrotesk = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ordantis — I+D aplicada en inteligencia artificial y datos",
    template: "%s | Ordantis",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#081728" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Must execute while parsing, not after Next's script queue/hydration. */}
        <script id="ordantis-intro-first-paint" dangerouslySetInnerHTML={{ __html: brandIntroBootstrap }} />
        <script id="ordantis-consent-first-paint" dangerouslySetInnerHTML={{ __html: consentFirstPaintBootstrap }} />
        <noscript><style>{`.cookie-panel{display:none!important}`}</style></noscript>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <JsonLd data={organizationGraph()} />
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <ConsentAwareAnalytics />
        <ScrollReveal />
      </body>
    </html>
  );
}
