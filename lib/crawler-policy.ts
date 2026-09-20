// Search/retrieval and model-development crawlers are both allowed by the owner.
// API routes remain excluded because they are not public content.
import { siteConfig } from "../content/identity.ts";

export const searchCrawlers = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Claude-SearchBot",
  "Claude-User",
  "Bravebot",
] as const;

export const modelDevelopmentCrawlers = ["GPTBot", "CCBot", "Google-Extended", "ClaudeBot"] as const;

export const allowedCrawlers = [...searchCrawlers, ...modelDevelopmentCrawlers] as const;

export function crawlerRules() {
  // Specific user-agent groups do not inherit the wildcard group's exclusions.
  // Markdown remains crawlable so consumers can read its canonical/noindex headers.
  const publicContent = { allow: "/", disallow: ["/api/", "/api$"] };
  return [
    { userAgent: [...allowedCrawlers], ...publicContent },
    { userAgent: "*", ...publicContent },
  ];
}

function values(value: string | readonly string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function renderRobotsText() {
  const groups = crawlerRules().map((rule) => {
    return [
      ...values(rule.userAgent).map((agent) => `User-Agent: ${agent}`),
      ...values("allow" in rule ? rule.allow : undefined).map((path) => `Allow: ${path}`),
      ...values(rule.disallow).map((path) => `Disallow: ${path}`),
    ].join("\n");
  });

  return `${groups.join("\n\n")}\n\nSitemap: ${siteConfig.url}/sitemap.xml\n`;
}
