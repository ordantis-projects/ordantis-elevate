import { access, readFile } from "node:fs/promises";

const required = [
  "app/layout.tsx",
  "app/robots.txt/route.ts",
  "app/sitemap.ts",
  "app/manifest.ts",
  "app/not-found.tsx",
  "app/llms.txt/route.ts",
  "app/llms-full.txt/route.ts",
  "app/markdown/[[...slug]]/route.ts",
  "proxy.ts",
  "lib/schema.ts",
  "lib/crawler-policy.ts",
  "content/site.ts",
];

for (const file of required) await access(file);

const layout = await readFile("app/layout.tsx", "utf8");
const robots = await readFile("app/robots.txt/route.ts", "utf8");
const crawlers = await readFile("lib/crawler-policy.ts", "utf8");
const schema = await readFile("lib/schema.ts", "utf8");
const home = await readFile("app/page.tsx", "utf8");

const assertions = [
  [layout.includes('lang="es"'), "El documento raíz debe declarar lang=es."],
  [layout.includes("organizationGraph"), "Falta el grafo Organization/WebSite."],
  [robots.includes("renderRobotsText()"), "robots.txt debe utilizar la política común probada."],
  [["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot", "Claude-User", "Bravebot"].every((bot) => crawlers.includes(bot)), "Faltan crawlers de búsqueda generativa."],
  [crawlers.includes("restrictedModelCrawlers") && crawlers.includes("GPTBot"), "Falta separar búsqueda y entrenamiento."],
  [!schema.includes('"Person"'), "La decisión del propietario excluye Person schema."],
  [schema.includes("schema-dts"), "JSON-LD debe estar tipado con schema-dts."],
  [home.includes("<h1>"), "La home necesita un H1 renderizado en servidor."],
  [home.includes("researchEvidence"), "La home debe mostrar evidencia técnica."],
];

const failed = assertions.filter(([passed]) => !passed);
if (failed.length) {
  for (const [, message] of failed) console.error(message);
  process.exit(1);
}
console.log(`${required.length} artefactos SEO/GEO y ${assertions.length} invariantes comprobados.`);
