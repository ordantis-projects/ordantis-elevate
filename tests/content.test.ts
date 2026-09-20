import assert from "node:assert/strict";
import test from "node:test";
import { allIndexableRoutes } from "../content/pages.ts";
import { capabilities, insights } from "../content/site.ts";
import { prefersMarkdown } from "../lib/accept.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

test("slugs and routes are unique", () => {
  assert.equal(new Set(capabilities.map(({ slug }) => slug)).size, capabilities.length);
  assert.equal(new Set(insights.map(({ slug }) => slug)).size, insights.length);
  assert.equal(new Set(allIndexableRoutes).size, allIndexableRoutes.length);
});

test("every indexable route has a Markdown representation", () => {
  for (const path of allIndexableRoutes) {
    const markdown = renderMarkdownForPath(path);
    assert.ok(markdown, `Missing Markdown for ${path}`);
    assert.match(markdown, /^# /);
    assert.match(markdown, /Canonical: https:\/\/www\.ordantis\.com/);
  }
});

test("research questions expose method and stop signals", () => {
  for (const insight of insights) {
    assert.ok(insight.answer.length > 120, insight.slug);
    assert.ok(insight.checks.length >= 4, insight.slug);
    assert.ok(insight.method.length >= 4, insight.slug);
    assert.ok(insight.stopSignals.length >= 4, insight.slug);
    assert.ok(capabilities.some((capability) => capability.slug === insight.relatedCapability), insight.slug);
    assert.match(insight.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(insight.updatedAt >= insight.publishedAt, insight.slug);
  }
});

test("requested technical gaps and EXIST decisions are covered", () => {
  const required = [
    "cuando-no-usar-agente-ia",
    "mcp-frente-api",
    "permisos-aprobacion-herramientas-agentes",
    "prompt-injection-agentes-herramientas",
    "rag-abstencion-evidencia",
    "data-leakage-validacion-temporal",
    "drift-calibracion-modelos",
    "responsible-ai-privacidad-edge-ai",
    "sensores-defectuosos-confianza-dato",
    "exist-modalidades-aportan-valor",
    "exist-desacuerdo-anotadores",
    "exist-umbrales-soft-hard",
    "exist-llm-mediador-semantico",
  ];
  const slugs = new Set(insights.map(({ slug }) => slug));
  for (const slug of required) assert.ok(slugs.has(slug), `Missing ${slug}`);
  for (const insight of insights.filter(({ slug }) => slug.startsWith("exist-"))) {
    assert.ok(insight.sources?.some(({ url }) => url.includes("paper")), insight.slug);
  }
});

test("the first proposal-derived editorial cluster is covered without duplicate sensor intent", () => {
  const required = [
    "ocr-no-es-inteligencia-documental",
    "expediente-computable",
    "rag-no-es-chatbot-sobre-pdfs",
    "informe-tecnico-sin-inventar-informacion",
    "human-in-the-loop-no-es-boton-aprobar",
    "documento-convertido-en-geometria",
    "procesar-audio-sin-grabar",
    "rag-abstencion-evidencia",
    "datos-publicos-mantenerlos-vivos",
    "sensores-defectuosos-confianza-dato",
  ];
  const slugs = new Set(insights.map(({ slug }) => slug));
  for (const slug of required) assert.ok(slugs.has(slug), `Missing ${slug}`);
});

test("Accept negotiation respects q-values", () => {
  assert.equal(prefersMarkdown("text/markdown"), true);
  assert.equal(prefersMarkdown("text/html, text/markdown;q=0.5"), false);
  assert.equal(prefersMarkdown("text/html;q=0.4, text/markdown;q=0.9"), true);
  assert.equal(prefersMarkdown("*/*"), false);
});
