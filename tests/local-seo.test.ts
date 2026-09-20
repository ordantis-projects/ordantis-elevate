import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { companyRegistration, serviceAreas } from "../content/identity.ts";
import { allIndexableRoutes, getStaticPage } from "../content/pages.ts";
import { renderLlmsIndex } from "../lib/llms.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

test("Albacete and Valencia have distinct indexable service-area pages", () => {
  assert.deepEqual(serviceAreas.map((area) => area.name), ["Albacete", "Valencia"]);
  for (const area of serviceAreas) {
    assert.ok(allIndexableRoutes.includes(area.path));
    assert.ok(getStaticPage(area.path));
    assert.ok(renderMarkdownForPath(area.path)?.includes(area.name));
  }
  assert.match(renderMarkdownForPath("/inteligencia-artificial-albacete")!, /domicilio registral/i);
  assert.match(renderMarkdownForPath("/inteligencia-artificial-valencia")!, /No publicamos una sede/i);
});

test("location claims keep the address in Albacete and Valencia as an area of service", () => {
  assert.equal(companyRegistration.addressLocality, "Albacete");
  assert.match(serviceAreas.find((area) => area.name === "Albacete")!.relationship, /Domicilio registral/);
  assert.match(serviceAreas.find((area) => area.name === "Valencia")!.relationship, /Área de servicio/);
  assert.doesNotMatch(serviceAreas.find((area) => area.name === "Valencia")!.relationship, /sede|oficina/i);
});

test("local landing pages stay outside the visible main navigation but remain discoverable", async () => {
  const [footer, capabilitiesPage] = await Promise.all([
    readFile("components/site-footer.tsx", "utf8"),
    readFile("app/capacidades/page.tsx", "utf8"),
  ]);
  for (const area of serviceAreas) {
    assert.doesNotMatch(footer, new RegExp(area.path));
    assert.doesNotMatch(capabilitiesPage, new RegExp(area.path));
    assert.doesNotMatch(renderMarkdownForPath("/capacidades")!, new RegExp(area.path));
    assert.match(renderLlmsIndex(), new RegExp(`/markdown${area.path}`));
    assert.ok(getStaticPage("/empresa")!.sections.some((section) => section.links?.some((link) => link.path === area.path)));
    assert.match(renderMarkdownForPath("/empresa")!, new RegExp(area.path));
  }
});

test("llms index follows the compact v2 structure and states evidence boundaries", () => {
  const llms = renderLlmsIndex();
  assert.match(llms, /^# Ordantis\n\n> /);
  assert.match(llms, /## Páginas principales/);
  assert.match(llms, /## Optional/);
  assert.match(llms, /ejemplos inventados/i);
  assert.match(llms, /no son certificaciones técnicas ni resultados de clientes/i);
  assert.match(llms, /Machine learning, ciencia de datos y sistemas de IA para empresas y administraciones en España/i);
});
