import assert from "node:assert/strict";
import test from "node:test";
import { homeDelivery, homeEngagement, homeEvidence, homeIntro, homeProblems, homeProjectAreas } from "../content/home.ts";
import { primaryNavigation } from "../content/identity.ts";
import { capabilities, integrationCapabilities, projectCapabilities } from "../content/site.ts";
import { integrationIntro, integrationServices, projectServicePhases, servicePhases } from "../content/services.ts";
import { allIndexableRoutes, getStaticPage } from "../content/pages.ts";
import { diagnosticSteps, diagnosticProfileFields } from "../content/diagnostic.ts";
import { getDiagnosticRecommendation } from "../lib/diagnostic-recommendation.ts";
import { buildDiagnosticSummary } from "../lib/diagnostic-summary.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";
import { renderLlmsIndex } from "../lib/llms.ts";

test("ML, data and applied R&D address businesses and public bodies without generic automation positioning", () => {
  assert.equal(capabilities[0].slug, "modelos-predictivos");
  assert.equal(capabilities.length, 5);
  assert.equal(servicePhases.flatMap((phase) => phase.services).length, 12);
  assert.ok(primaryNavigation.some((item) => item.href === "/govtech"));
  assert.equal(homeProjectAreas[0].path, "/capacidades/modelos-predictivos");
  assert.match(homeIntro.lead, /empresas y administraciones públicas/);
  assert.match(homeIntro.eyebrow, /Ciencia de datos/);
  assert.ok(homeProjectAreas.every((item) => allIndexableRoutes.includes(item.path)));
  for (const path of ["/", "/capacidades"]) {
    const markdown = renderMarkdownForPath(path)!;
    for (const area of homeProjectAreas) assert.ok(markdown.includes(area.path));
    assert.doesNotMatch(markdown, /Consultoría de inteligencia artificial para empresas en España/);
  }
  assert.ok(renderMarkdownForPath("/")!.includes(homeIntro.title));
  assert.match(renderLlmsIndex(), /\/markdown\/govtech/);
});

test("project entry points, delivery conditions and evidence boundaries stay in crawlable shared content", () => {
  const home = renderMarkdownForPath("/")!;
  for (const block of [homeEngagement, homeDelivery]) {
    assert.ok(home.includes(block.title));
    assert.ok(home.includes(block.lead));
    for (const item of block.items) assert.ok(home.includes(item.text));
  }
  assert.ok(home.includes(homeProblems.scope));
  assert.ok(home.includes(homeEvidence.boundary));
  const data = capabilities.find((item) => item.slug === "data-intelligence")!;
  assert.match(data.title, /Ciencia/);
  assert.match(data.directAnswer, /correlación no demuestra una causa/);
  assert.match(renderLlmsIndex(), /no un requisito para cualquier encargo/);
});

test("research guides share their editorial introduction across HTML content and Markdown", () => {
  const page = getStaticPage("/insights")!;
  const markdown = renderMarkdownForPath(page.path)!;
  assert.ok(markdown.includes(page.description));
  assert.ok(markdown.includes(page.lead));
  assert.match(page.description, /machine learning/);
  for (const id of ["ingenieria", "prediccion", "optimizacion"]) {
    const service = servicePhases.flatMap((phase) => phase.services).find((item) => item.id === id)!;
    assert.ok(service.useCases.some((example) => /pública|públicos/.test(example.sector)));
  }
});

test("model development leads the catalogue while original integration components stay secondary", () => {
  const development = projectServicePhases.find((phase) => phase.id === "implementacion")!;
  assert.equal(development.title, "Desarrollo de modelos y sistemas de IA");
  assert.deepEqual(development.services.map((service) => service.id), ["prediccion", "optimizacion", "vision"]);
  assert.deepEqual(integrationServices.map((service) => service.id), ["bi", "agentes", "documentos", "rag"]);
  const combined = [...projectServicePhases.flatMap((phase) => phase.services), ...integrationServices];
  assert.equal(combined.length, 12);
  assert.equal(new Set(combined.map((service) => service.id)).size, 12);
  assert.deepEqual(projectCapabilities.map((capability) => capability.slug), ["modelos-predictivos", "data-intelligence", "investigacion-desarrollo"]);
  assert.deepEqual(integrationCapabilities.map((capability) => capability.slug), ["document-intelligence", "agentes-ia"]);
  const home = renderMarkdownForPath("/")!;
  for (const service of integrationServices) assert.ok(!home.includes(`/capacidades#${service.id}`));
  const catalogue = renderMarkdownForPath("/capacidades")!;
  const complementaryStart = catalogue.indexOf(`## ${integrationIntro.title}`);
  assert.ok(complementaryStart > catalogue.indexOf("### 4.1"));
  for (const service of integrationServices) assert.ok(catalogue.indexOf(`### ${service.number} ${service.title}`) > complementaryStart);
  assert.ok(renderLlmsIndex().includes("## Especialidades complementarias de integración"));
});

test("every diagnostic decision has a valid route including the public-sector journey", () => {
  for (const decision of diagnosticSteps[0].options) {
    const route = getDiagnosticRecommendation({ decision });
    assert.notEqual(route.title, "Revisión inicial");
    assert.ok(allIndexableRoutes.includes(route.path ?? "/capacidades/" + route.capability));
  }
  assert.equal(getDiagnosticRecommendation({ decision: "Resolver un reto GovTech" }).path, "/govtech");
  assert.ok(diagnosticProfileFields.every((field) => !["revenue", "size", "maturity"].includes(field.id)));
});

test("all optional organisation and project fields remain in the diagnostic summary", () => {
  const profile = Object.fromEntries(diagnosticProfileFields.map((field) => [field.id, field.type === "multi" ? ["fuente A", "fuente B"] : "valor de " + field.id]));
  const summary = buildDiagnosticSummary({ answers: Object.fromEntries(diagnosticSteps.map((step) => [step.id, step.options[0]])), profile, context: "Reto público de prueba" });
  for (const field of diagnosticProfileFields) {
    const value = profile[field.id];
    assert.ok(summary.includes(field.label + "\n" + (Array.isArray(value) ? value.join(", ") : value)));
  }
  assert.match(summary, /Reto público de prueba/);
});
