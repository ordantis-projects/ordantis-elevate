import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function markdownUrl(path: string) {
  return absoluteUrl(path === "/" ? "/markdown" : `/markdown${path}`);
}

export function createMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        "text/markdown": markdownUrl(path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${title} — Ordantis` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
