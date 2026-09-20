import { mkdir, writeFile } from "node:fs/promises";
import { allIndexableRoutes } from "../content/pages.ts";
import { siteConfig } from "../content/identity.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";
import { classifySourceResponse, collectSourceLinks, type SourceLink } from "../lib/source-links.ts";

const links = collectSourceLinks(allIndexableRoutes.map((path) => ({
  path,
  markdown: renderMarkdownForPath(path) ?? "",
})), siteConfig.url);
const checkedAt = new Date().toISOString();
const directory = `.quality/source-links/${checkedAt.replace(/[:.]/g, "-")}`;

async function inspect(link: SourceLink) {
  try {
    // Public references only. No cookies, credentials, analytics or form delivery.
    const response = await fetch(link.url, {
      signal: AbortSignal.timeout(12_000),
      headers: { "User-Agent": "OrdantisSourceCheck/1.0 (reference availability check)" },
    });
    await response.body?.cancel();
    return { ...link, status: response.status, finalUrl: response.url, result: classifySourceResponse(response.status), error: null };
  } catch (error) {
    return { ...link, status: null, finalUrl: null, result: classifySourceResponse(null), error: error instanceof Error ? error.name : "RequestError" };
  }
}

const results: Awaited<ReturnType<typeof inspect>>[] = [];
// Deliberately small batches: no load test or recursive crawl of source websites.
for (let offset = 0; offset < links.length; offset += 3) {
  results.push(...await Promise.all(links.slice(offset, offset + 3).map(inspect)));
}
const counts = {
  reachable: results.filter((item) => item.result === "reachable").length,
  notFound: results.filter((item) => item.result === "not-found").length,
  inconclusive: results.filter((item) => item.result === "inconclusive").length,
};
await mkdir(directory, { recursive: true });
await writeFile(`${directory}/report.json`, JSON.stringify({ checkedAt, scope: "HTTP availability, not claim validation", counts, results }, null, 2));
await writeFile(`${directory}/report.md`, [
  "# Disponibilidad de referencias externas",
  `\nComprobación: ${checkedAt}. ${links.length} URL únicas en ${allIndexableRoutes.length} páginas.`,
  "\nHTTP 2xx no prueba que la fuente respalde la afirmación, ni descarta un soft 404. Los bloqueos y fallos transitorios se revisan; no se sustituyen por enlaces inventados.",
  `\nResultado: ${counts.reachable} accesibles, ${counts.notFound} HTTP 404/410, ${counts.inconclusive} sin conclusión.`,
  "\n| Referencia | HTTP | Resultado | Páginas |",
  "| --- | --- | --- | --- |",
  ...results.map((item) => `| ${item.url} | ${item.status ?? item.error} | ${item.result} | ${item.pages.join(", ")} |`),
].join("\n"));
console.log(JSON.stringify({ directory, counts }));
for (const item of results.filter((item) => item.result !== "reachable")) console.log(`${item.status ?? item.error} ${item.url}`);
process.exitCode = counts.notFound ? 1 : counts.inconclusive ? 2 : 0;
