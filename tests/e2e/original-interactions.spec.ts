import { expect, test } from "@playwright/test";

test("company logos move, pause, resume and respect reduced motion", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const track = page.locator(".partners-track");
  await page.locator(".partners-section").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const position = () => track.evaluate((node) => getComputedStyle(node).transform);
  const initial = await position();
  await expect.poll(position).not.toBe(initial);
  const widths = await page.locator(".partners-group").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().width));
  expect(Math.abs(widths[0] - widths[1])).toBeLessThan(0.01);
  await page.getByRole("button", { name: "Pausar movimiento" }).click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Reanudar movimiento" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(page.locator(".partner-logo:visible")).toHaveCount(4);
  await expect(page.getByRole("img", { name: "Artecoin", exact: true })).toHaveCount(1);
});

test("restored demos respond to controls without external API calls", async ({ page }) => {
  const errors: string[] = [];
  const outbound: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (["fetch", "xhr"].includes(request.resourceType()) && !request.url().startsWith("http://127.0.0.1:3000/")) outbound.push(request.url()); });
  await page.goto("/capacidades");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const open = async (id: string) => {
    const detail = page.locator("#" + id);
    if (await detail.locator("xpath=ancestor::details[contains(@class, 'integration-services')]").count() && !await page.locator(".integration-services").evaluate((node) => (node as HTMLDetailsElement).open)) {
      await page.locator(".integration-services > summary").click();
    }
    await detail.locator("summary").click();
    await expect(detail.locator(".service-demo")).toBeVisible();
    await expect(detail.locator(".demo-notice")).toContainText("datos sintéticos");
    return detail;
  };
  let detail = await open("infraestructura");
  await expect(detail).toContainText("Data Lakehouse");
  detail = await open("gobernanza");
  await detail.getByRole("button", { name: "Developer", exact: false }).click();
  await expect(detail.locator("table")).toContainText("Enmascarado");
  await detail.getByRole("button", { name: "Flujo de datos" }).click();
  await expect(detail).toContainText("Por medir");
  detail = await open("bi");
  await detail.getByRole("button", { name: "Marketing", exact: true }).click();
  await expect(detail).toContainText("ROAS");
  await detail.getByRole("button", { name: "1M", exact: true }).click();
  await expect(detail).toContainText("n=6");
  detail = await open("prediccion");
  const slider = detail.getByRole("slider", { name: "Cambio de demanda" });
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  detail = await open("optimizacion");
  await detail.getByRole("button", { name: "Escenario B", exact: true }).click();
  await expect(detail).toContainText("0.73");
  await expect(detail).toContainText("Inspecciones / hora");
  await expect(detail).toContainText("Ambos repartos utilizan 120 horas");
  detail = await open("agentes");
  await expect(detail.getByRole("button", { name: "Simular onboarding de Marta" })).toBeDisabled();
  await detail.getByRole("checkbox", { name: "Autorizar las acciones simuladas" }).check();
  await detail.getByRole("button", { name: "Simular onboarding de Marta" }).click();
  await expect(detail).toContainText("5/5", { timeout: 12_000 });
  await expect(detail).toContainText("Firma pendiente de una persona");
  detail = await open("documentos");
  await detail.getByRole("button", { name: "Alto", exact: true }).click();
  await detail.getByRole("button", { name: "Preparar vista previa", exact: false }).click();
  await expect(detail).toContainText("Seguridad reforzada");
  detail = await open("rag");
  await detail.getByRole("checkbox", { name: "Fuente interna disponible" }).uncheck();
  await detail.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(detail).toContainText("No puedo determinar el presupuesto", { timeout: 5000 });
  detail = await open("vision");
  await detail.getByRole("button", { name: "Estrella", exact: true }).click();
  await expect(detail).toContainText("Detección completada", { timeout: 5000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
  expect(outbound).toEqual([]);
});

test("service deep links expand the original destination and close returns focus", async ({ page }) => {
  await page.goto("/services#documentos");
  const detail = page.locator("#documentos");
  await expect(detail).toHaveAttribute("open", "");
  await expect(detail.locator(".service-demo")).toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await detail.getByRole("button", { name: "Cerrar servicio" }).click();
  await expect(detail).not.toHaveAttribute("open", "");
  await expect(detail.locator("summary")).toBeFocused();
});

test("original profile fields preserve multiple infrastructure selections", async ({ page }) => {
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await page.getByRole("radio", { name: "Integrar fuentes y evaluar su calidad", exact: true }).check();
  await page.locator(".diagnostic-optional summary").click();
  await page.getByLabel("Sector de actividad").selectOption("Industrial / Manufactura");
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("radio", { name: "Datos dispersos o con errores conocidos", exact: true }).check();
  await page.locator(".diagnostic-optional summary").click();
  await page.getByRole("checkbox", { name: "Servidores locales", exact: true }).check();
  await page.getByRole("checkbox", { name: "Bases de datos SQL / NoSQL", exact: true }).check();
  await page.getByRole("button", { name: "Anterior", exact: true }).click();
  await page.locator(".diagnostic-optional summary").click();
  await expect(page.getByLabel("Sector de actividad")).toHaveValue("Industrial / Manufactura");
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.locator(".diagnostic-optional summary").click();
  await expect(page.getByRole("checkbox", { name: "Servidores locales", exact: true })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Bases de datos SQL / NoSQL", exact: true })).toBeChecked();
});

test("project FAQ remains a page and its schema matches its ten answers", async ({ page }) => {
  const response = await page.goto("/faq");
  expect(response?.status()).toBe(200);
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.locator(".faq-list details")).toHaveCount(10);
  const nodes = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq = nodes.map((text) => JSON.parse(text)).find((node) => node["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(10);
  const first = page.locator(".faq-list details").first();
  await first.locator("summary").click();
  await expect(first.locator(".faq-answer")).toContainText(faq.mainEntity[0].acceptedAnswer.text);
});

test("wide-screen phase decoration loads WebGL on demand and stops for reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Only this check uses the original 2xl breakpoint.");
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const shape = page.locator(".phase-ornament").first();
  await shape.scrollIntoViewIfNeeded();
  await expect(shape).toHaveAttribute("data-motion", "running");
  await expect(shape.locator("canvas")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(shape).toHaveAttribute("data-motion", "rest");
  await expect(shape.locator("canvas")).not.toBeVisible();
});
