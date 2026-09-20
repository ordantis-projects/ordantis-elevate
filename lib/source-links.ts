export type SourceLink = { url: string; pages: string[] };
export type LinkStatus = "reachable" | "not-found" | "inconclusive";

export function collectSourceLinks(pages: { path: string; markdown: string }[], siteUrl: string): SourceLink[] {
  const links = new Map<string, Set<string>>();
  const siteHost = new URL(siteUrl).hostname.replace(/^www\./, "");
  for (const page of pages) {
    for (const match of page.markdown.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
      const url = new URL(match[1]);
      if (url.hostname.replace(/^www\./, "") === siteHost) continue;
      url.hash = "";
      const key = url.toString();
      if (!links.has(key)) links.set(key, new Set());
      links.get(key)!.add(page.path);
    }
  }
  return [...links].sort(([a], [b]) => a.localeCompare(b)).map(([url, paths]) => ({ url, pages: [...paths].sort() }));
}

export function classifySourceResponse(status: number | null): LinkStatus {
  if (status !== null && status >= 200 && status < 300) return "reachable";
  if (status === 404 || status === 410) return "not-found";
  // 403/429, timeouts and server errors are not evidence that a source is gone.
  return "inconclusive";
}
