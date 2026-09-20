import { siteConfig } from "../content/identity.ts";

// The owner permits indexing, use in generated answers and model development.
// Keep this policy aligned with robots.txt and public content responses.
export const contentSignalPolicy = "search=yes, ai-input=yes, ai-train=yes, use=full";

function normalizePublicPath(path: string) {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function agentDiscoveryLinkHeader(path: string) {
  const canonicalPath = normalizePublicPath(path);
  const canonical = new URL(canonicalPath, siteConfig.url).toString();
  const markdownPath = canonicalPath === "/" ? "/markdown" : `/markdown${canonicalPath}`;
  const markdown = new URL(markdownPath, siteConfig.url).toString();

  return [
    `<${canonical}>; rel="canonical"`,
    `<${markdown}>; rel="alternate"; type="text/markdown"`,
    `<${siteConfig.url}/llms.txt>; rel="describedby"; type="text/markdown"`,
    `<${siteConfig.url}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ].join(", ");
}
