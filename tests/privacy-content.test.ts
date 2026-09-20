import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allIndexableRoutes, getStaticPage } from "../content/pages.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

test("cookie inventory matches every storage name used by the application and enabled analytics", () => {
  const page = getStaticPage("/cookies");
  assert.ok(page);
  const names = page.sections.flatMap((section) => section.table?.rows.map((row) => row[0]) ?? []);
  for (const name of [
    "ordantis-cookie-consent",
    "ordantis-ai-organic-recorded",
    "_ga",
    "_ga_<ID>",
    "_clck",
    "_clsk",
    "CLID",
    "ANONCHK",
    "MR",
    "MUID",
    "SM",
    "__cf_bm",
    "cf_clearance",
  ]) assert.ok(names.includes(name), name);
  assert.match(renderMarkdownForPath("/cookies")!, /Nombre \| Tecnología y categoría \| Finalidad \| Duración/);
});

test("privacy policy provides Article 13 fields and describes the chosen same-origin delivery", () => {
  const markdown = renderMarkdownForPath("/privacidad")!;
  for (const expected of [
    "Responsable y contacto",
    "Tratamientos y bases jurídicas",
    "Destinatarios y transferencias internacionales",
    "Conservación",
    "Derechos",
    "artículo 6.1.b RGPD",
    "artículo 6.1.f RGPD",
    "Cloudflare Email Service",
    "contacto@ordantis.com",
    "web@ordantis.com",
    "No se utiliza un proveedor externo de formularios",
    "Agencia Española de Protección de Datos",
  ]) assert.match(markdown, new RegExp(expected, "i"), expected);
  assert.match(markdown, /B23922552/);
});

test("privacy acknowledgement is not presented as marketing consent and cookie choices have equal styling", async () => {
  const [diagnostic, contactPage, banner] = await Promise.all([
    readFile("components/diagnostic-form.tsx", "utf8"),
    readFile("components/static-content-page.tsx", "utf8"),
    readFile("components/cookie-consent.tsx", "utf8"),
  ]);
  assert.match(diagnostic, /Esta confirmación no autoriza publicidad/);
  assert.match(diagnostic, /privacyAcknowledged/);
  assert.match(contactPage, /mailto:contacto@ordantis\.com/);
  assert.doesNotMatch(contactPage, /ContactForm/);
  assert.equal((banner.match(/className="button button-ghost"/g) ?? []).length, 2);
});

test("NIF is confined to legal and privacy pages", () => {
  const legalPaths = new Set(["/aviso-legal", "/privacidad", "/cookies"]);
  for (const path of allIndexableRoutes) {
    const markdown = renderMarkdownForPath(path)!;
    if (legalPaths.has(path)) assert.match(markdown, /B23922552/, path);
    else assert.doesNotMatch(markdown, /B23922552/, path);
  }
});

test("cookie first-layer choices agree with the policy and disclose third-party analytics", async () => {
  const banner = await readFile("components/cookie-consent.tsx", "utf8");
  const policy = renderMarkdownForPath("/cookies")!;
  for (const label of ["Aceptar cookies", "Rechazar cookies", "Gestionar cookies", "Personalizar", "Guardar preferencias", "Siempre activas"]) {
    assert.ok(banner.includes(label), label);
    assert.ok(policy.includes(label), label);
  }
  for (const disclosure of ["En Ordantis", "tecnologías necesarias", "cookies de terceros", "Google Analytics", "Microsoft Clarity", "reconstrucciones de sesión"]) {
    assert.ok(banner.includes(disclosure), disclosure);
  }
  assert.match(policy, /Solo hay una finalidad opcional: analítica/);
  assert.match(policy, /Navegar, desplazarse o cerrar la pestaña no equivale a aceptar/);
  assert.doesNotMatch(banner, /B23922552|seguir navegando.*acept/i);
});
