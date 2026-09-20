import { mkdir, writeFile } from "node:fs/promises";
import { allIndexableRoutes } from "../content/pages.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

await mkdir(".quality/pages", { recursive: true });
const pages = [];
for (const route of allIndexableRoutes) {
  const content = renderMarkdownForPath(route);
  if (!content) throw new Error(`Falta contenido Markdown para ${route}.`);
  const file = `.quality/pages/${route === "/" ? "index" : route.slice(1).replaceAll("/", "__")}.md`;
  await writeFile(file, content, "utf8");
  pages.push({ route, file, words: content.split(/\s+/).length, content });
}
const output = pages.map((page) => page.content).join("\n\n---\n\n");

await mkdir(".quality", { recursive: true });
await writeFile(".quality/content.md", output, "utf8");
await writeFile(".quality/pages.json", JSON.stringify(pages.map(({ route, file, words }) => ({ route, file, words })), null, 2), "utf8");
console.log(`Contenido editorial exportado: ${pages.length} páginas, ${output.split(/\s+/).length} palabras.`);
