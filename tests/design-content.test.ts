import assert from "node:assert/strict";
import test from "node:test";
import { capabilities } from "../content/site.ts";
import { servicePhases } from "../content/services.ts";
import { homeFaqs, methodology, companyPrinciples } from "../content/home.ts";
import { diagnostic, diagnosticSteps, diagnosticCapabilityByDecision } from "../content/diagnostic.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";
import { diagnosticEmailDraft } from "../lib/diagnostic.ts";
import { dataAdvantages, companyAchievements, methodPoints } from "../content/original-sections.ts";
import { companyFaqs } from "../content/faq.ts";
import { diagnosticProfileFields } from "../content/diagnostic.ts";
import { pageUpdatedAt } from "../content/page-updates.ts";

test("the twelve original services remain discoverable with explicit boundaries", () => {
  const services = servicePhases.flatMap((phase) => phase.services);
  assert.equal(services.length, 12);
  assert.equal(new Set(services.map((service) => service.id)).size, 12);
  const markdown = renderMarkdownForPath("/capacidades")!;
  for (const service of services) {
    assert.ok(capabilities.some((capability) => capability.slug === service.capability), service.id);
    assert.ok(markdown.includes(service.summary), service.id);
    assert.ok(markdown.includes(service.boundary), service.id);
    for (const delivery of service.deliverables) assert.ok(markdown.includes(delivery));
    assert.ok(markdown.includes(service.description));
    for (const component of service.components) assert.ok(markdown.includes(component));
    for (const example of service.useCases) assert.ok(markdown.includes(example.text));
    if (service.demo) assert.ok(service.demoNote && markdown.includes(service.demoNote));
  }
});

test("the restored homepage and company content is also available as Markdown", () => {
  const home = renderMarkdownForPath("/")!;
  for (const phase of methodology) {
    assert.ok(home.includes(phase.detail));
    assert.ok(home.includes(phase.output));
  }
  for (const faq of homeFaqs) {
    assert.ok(home.includes(faq.answer));
    assert.ok(renderMarkdownForPath(faq.href.split("#")[0]), faq.href);
  }
  const company = renderMarkdownForPath("/empresa")!;
  for (const principle of companyPrinciples) assert.ok(company.includes(principle.text));
  for (const item of companyAchievements) assert.ok(company.includes(item.text));
  for (const item of dataAdvantages) assert.ok(home.includes(item.text));
  for (const phase of Object.values(methodPoints)) for (const point of phase) assert.ok(home.includes(point.text));
});

test("diagnostic choices map to real capabilities and expose limitations", () => {
  for (const decision of diagnosticSteps[0].options) {
    assert.ok(capabilities.some((capability) => capability.slug === diagnosticCapabilityByDecision[decision]), decision);
  }
  const markdown = renderMarkdownForPath(diagnostic.path)!;
  assert.ok(markdown.includes(diagnostic.privacy));
  for (const step of diagnosticSteps) for (const option of step.options) assert.ok(markdown.includes(option));
  for (const field of diagnosticProfileFields) assert.ok(markdown.includes(field.label));
});

test("all nine original demos and the ten project FAQs have a destination", () => {
  const demos = servicePhases.flatMap((phase) => phase.services).flatMap((service) => service.demo ? [service.demo] : []);
  assert.equal(demos.length, 9);
  assert.equal(new Set(demos).size, 9);
  assert.equal(companyFaqs.length, 10);
  for (const faq of companyFaqs) {
    assert.ok(renderMarkdownForPath("/faq")!.includes(faq.answer));
    assert.ok(renderMarkdownForPath(faq.href.split("#")[0]));
  }
});

test("page dates advance only when their editorial content changes", () => {
  for (const route of ["/contacto", "/privacidad"]) {
    assert.equal(pageUpdatedAt(route), "2026-09-16");
  }
  assert.equal(pageUpdatedAt("/capacidades"), "2026-09-18");
  assert.equal(pageUpdatedAt("/"), "2026-09-18");
  for (const route of ["/empresa", "/faq", "/diagnostico", "/inteligencia-artificial-albacete", "/govtech", "/capacidades/investigacion-desarrollo", "/capacidades/modelos-predictivos", "/capacidades/data-intelligence"]) {
    assert.equal(pageUpdatedAt(route), "2026-09-17");
  }
  assert.equal(pageUpdatedAt("/research/exist-2026"), "2026-08-26");
  assert.ok(renderMarkdownForPath("/faq")!.includes("Updated: 2026-09-17"));
});

test("email draft keeps free text inside an encoded body, never as recipients or headers", () => {
  const text = "Duplicados & revisión\nBcc: otro@example.com?x=1";
  const draft = new URL(diagnosticEmailDraft(text));
  assert.equal(draft.protocol, "mailto:");
  assert.equal(draft.pathname, "contacto@ordantis.com");
  assert.equal(draft.searchParams.get("body"), text);
  assert.equal(draft.searchParams.has("bcc"), false);
});
