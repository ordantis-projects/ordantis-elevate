import { insights, siteConfig } from "./site.ts";

// Solo se avanza la fecha de las páginas cuyo contenido se ha modificado.
const editedPages: Record<string, string> = {
  "/": "2026-09-18",
  "/capacidades": "2026-09-18",
  "/capacidades/investigacion-desarrollo": "2026-09-17",
  "/capacidades/modelos-predictivos": "2026-09-17",
  "/capacidades/data-intelligence": "2026-09-17",
  "/inteligencia-artificial-albacete": "2026-09-17",
  "/inteligencia-artificial-valencia": "2026-09-17",
  "/empresa": "2026-09-17",
  "/contacto": "2026-09-16",
  "/faq": "2026-09-17",
  "/diagnostico": "2026-09-17",
  "/govtech": "2026-09-17",
  "/aviso-legal": "2026-08-28",
  "/privacidad": "2026-09-16",
  "/cookies": "2026-09-19",
  "/labs": "2026-09-16",
  "/labs/calidad-datos": "2026-09-17",
  "/insights": "2026-09-17",
  "/labs/rag-evaluacion": "2026-09-02",
  "/labs/evaluacion-agentes": "2026-09-02",
  "/labs/inteligencia-documental": "2026-09-13",
  "/research/exist-2026": "2026-08-26",
};
const insightDates = new Map(insights.map((item) => ["/insights/" + item.slug, item.updatedAt]));
export function pageUpdatedAt(path: string) {
  return editedPages[path] ?? insightDates.get(path) ?? siteConfig.updatedAt;
}
