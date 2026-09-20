import { expect, test } from "@playwright/test";
import { servicePhases } from "../../content/services";

test("original brand colours, rectangular controls and visible hero survive", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".home-hero h1")).toContainText("IA y datos.");
  expect(await page.locator("body").evaluate((node) => getComputedStyle(node).backgroundColor)).toBe("rgb(255, 255, 255)");
  const button = page.locator(".home-hero .button").first();
  expect(await button.evaluate((node) => getComputedStyle(node).borderRadius)).toBe("0px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".brand-arrow").first().evaluate((node) => getComputedStyle(node).animationName)).toBe("none");
});

test("home restores the original small moving arrows and retains its content routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".home-hero h1")).toHaveText("IA y datos. Modelos y sistemas.");
  await expect(page.locator(".hero-phase-nav a")).toHaveCount(4);
  await expect(page.locator(".capability-row")).toHaveCount(4);
  await expect(page.locator(".home-insights .card")).toHaveCount(6);
  await expect(page.locator(".result-ranking").first()).toContainText("de 144");
  await expect(page.locator(".hero-art, .hero-emblem")).toHaveCount(0);
  const canvas = page.locator(".home-hero > .brand-arrows");
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await expect(canvas).toBeVisible();
  await expect(canvas.locator(".brand-arrow")).toHaveCount(44);
  const heroBox = await page.locator(".home-hero").boundingBox();
  const canvasBox = await canvas.boundingBox();
  expect(canvasBox!.width).toBeCloseTo(heroBox!.width, 0);
  const arrow = canvas.locator(".brand-arrow").first();
  await expect(arrow).toHaveCSS("animation-name", "hero-rise");
  const initialTransform = await arrow.evaluate((node) => getComputedStyle(node).transform);
  await expect.poll(() => arrow.evaluate((node) => getComputedStyle(node).transform)).not.toBe(initialTransform);
  for (const link of await page.locator(".hero-phase-nav a").all()) {
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("all method phases and service disclosures work with a keyboard", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const phase = page.locator(".method-phase").first();
  await phase.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(phase).toHaveAttribute("open", "");
  await expect(phase.locator(".phase-detail")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.keyboard.press("Enter");
  await expect(phase).not.toHaveAttribute("open", "");
  await page.goto("/capacidades");
  await expect(page.locator(".service-detail")).toHaveCount(12);
  await expect(page.locator("#implementacion .service-detail")).toHaveCount(3);
  await expect(page.locator(".integration-services")).not.toHaveAttribute("open", "");
  for (const id of ["bi", "agentes", "documentos", "rag"]) await expect(page.locator(`#${id} > summary`)).not.toBeVisible();
  await page.locator("#implementacion").screenshot({ path: testInfo.outputPath("model-development.png") });
  for (const service of servicePhases.flatMap((item) => item.services)) {
    if (service.placement === "integration" && !await page.locator(".integration-services").evaluate((node) => (node as HTMLDetailsElement).open)) {
      await page.locator(".integration-services > summary").focus();
      await page.keyboard.press("Enter");
    }
    const detail = page.locator("#" + service.id);
    await detail.locator("summary").click();
    await expect(detail.locator(".service-detail-body")).toBeVisible();
    await expect(detail).toContainText(service.boundary);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("diagnostic preserves selections and sends nothing until the visitor submits", async ({ page }) => {
  const sent: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" && new URL(request.url()).pathname === "/api/diagnostic") sent.push(request.url());
  });
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(page.getByRole("heading", { name: "¿Qué necesitas resolver?" })).toBeVisible();
  await page.getByRole("radio", { name: "Integrar fuentes y evaluar su calidad", exact: true }).check();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("radio", { name: "Datos dispersos o con errores conocidos", exact: true }).check();
  await page.getByRole("button", { name: "Anterior", exact: true }).click();
  await expect(page.getByRole("radio", { name: "Integrar fuentes y evaluar su calidad", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(page.getByRole("radio", { name: "Datos dispersos o con errores conocidos", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("radio", { name: "La decisión necesita aprobación humana", exact: true }).check();
  await page.getByLabel("Contexto adicional (opcional)").fill("Comparar dos inventarios & revisar duplicados.");
  await page.getByRole("button", { name: "Continuar al envío" }).click();
  await expect(page.getByRole("heading", { name: "Tu consulta, lista para enviar." })).toBeFocused();
  await expect(page.getByRole("button", { name: "Abrir borrador en mi correo" })).not.toBeVisible();
  await page.locator(".diagnostic-exports summary").click();
  await expect(page.getByRole("button", { name: "Abrir borrador en mi correo" })).toBeVisible();
  await expect(page.getByRole("form", { name: "Enviar diagnóstico", exact: true })).toBeVisible();
  await expect(page.locator('a[href*="body="]')).toHaveCount(0);
  await expect(page.locator(".diagnostic-panel")).toHaveAttribute("data-clarity-mask", "true");
  await expect(page.locator(".diagnostic-summary")).toContainText("Comparar dos inventarios & revisar duplicados.");
  await page.getByText("Ver orientación inicial", { exact: false }).click();
  const recommendation = page.getByRole("region", { name: "Ruta sugerida: Ingeniería de datos y sistemas" });
  await expect(recommendation).toContainText("Inventario de fuentes, contratos de intercambio y protocolo de calidad y actualización");
  await expect(recommendation).toContainText("Medir duplicados, ausencias, incoherencias y cobertura");
  await expect(recommendation).toContainText("registrar quién acepta, corrige o rechaza");
  await expect(page.getByText("No se ha enviado ninguna solicitud.", { exact: false })).toBeVisible();
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar resumen" }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("diagnostico-ordantis.txt");
  await expect(page.getByText("Descarga preparada en tu dispositivo. No se ha enviado a Ordantis.", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copiar resumen" })).toBeVisible();
  expect(sent).toEqual([]);
});

test("old routes preserve destinations and service anchors", async ({ request }) => {
  const assessment = await request.get("/assessment", { maxRedirects: 0 });
  expect(assessment.status()).toBe(308);
  expect(assessment.headers().location).toBe("/diagnostico");
  const services = await request.get("/services", { maxRedirects: 0 });
  expect(services.headers().location).toBe("/capacidades");
});
