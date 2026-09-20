import type { MetadataRoute } from "next";
import { allIndexableRoutes } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { pageUpdatedAt } from "@/content/page-updates";

export default function sitemap(): MetadataRoute.Sitemap {
  return allIndexableRoutes.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: pageUpdatedAt(path),
    changeFrequency: path.startsWith("/insights/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/capacidades/") || path.startsWith("/inteligencia-artificial-") ? 0.8 : 0.7,
  }));
}
