import { expect, test, type BrowserContext, type Page } from "@playwright/test";

async function provider(context: BrowserContext, status: number | "offline" = 200, delayed = false) {
  const sent: Record<string, unknown>[] = [];
  const unexpected: string[] = [];
  let release: () => void = () => {};
  const pending = delayed ? new Promise<void>((resolve) => { release = resolve; }) : Promise.resolve();
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === "https://challenges.cloudflare.com" && url.pathname === "/turnstile/v0/api.js") {
      return route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: `let latest;window.turnstile={render:(container,options)=>{latest=options;container.dataset.size=options.size;const box=document.createElement("div");box.textContent="Verificación de prueba completada";box.style.cssText=options.size==="compact"?"width:150px;height:140px":"width:100%;min-width:300px;height:65px";container.replaceChildren(box);queueMicrotask(()=>options.callback("test-turnstile-token"));return "test-widget"},remove:()=>{}};window.addEventListener("test-turnstile-expired",()=>latest["expired-callback"]());window.addEventListener("test-turnstile-renewed",()=>latest.callback("test-turnstile-token"));`,
      });
    }
    if (url.href === "http://127.0.0.1:3001/api/diagnostic") {
      sent.push(request.postDataJSON());
      await pending;
      if (status === "offline") return route.abort("failed");
      return route.fulfill({ status: status === 200 ? 202 : status, json: { status: status === 200 ? "accepted" : "Provider-private diagnostic text" } });
    }
    if (url.origin === "http://127.0.0.1:3001") return route.continue();
    unexpected.push(url.origin);
    return route.abort();
  });
  return { sent, unexpected, release };
}

async function complete(page: Page) {
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.getByRole("radio", { name: "Integrar fuentes y evaluar su calidad", exact: true }).check();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("radio", { name: "Datos dispersos o con errores conocidos", exact: true }).check();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("radio", { name: "La decisión necesita aprobación humana", exact: true }).check();
  await page.getByLabel("Contexto adicional (opcional)").fill("Consulta de prueba: inventario sintético.");
  await page.getByRole("button", { name: "Continuar al envío", exact: true }).click();
  await expect(page.getByRole("form", { name: "Enviar diagnóstico", exact: true })).toBeVisible();
  await expect(page.getByText("Verificación de prueba completada", { exact: true })).toBeVisible();
}

test("contact has no direct form and offers email or the guided diagnostic", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await expect(page.getByRole("form", { name: /contacto/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Escribir desde mi correo", exact: true })).toHaveAttribute("href", /mailto:contacto@ordantis\.com/);
  await expect(page.locator("main").getByRole("link", { name: "Iniciar diagnóstico", exact: true })).toHaveAttribute("href", "/diagnostico");
});

test("complete questionnaire: every optional answer reaches the payload and the final screen has one email", async ({ context, page }, testInfo) => {
  const mock = await provider(context);
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await expect(page.locator(".diagnostic-optional")).not.toHaveAttribute("open", "");
  await page.getByRole("radio", { name: "Resolver un reto GovTech", exact: true }).check();
  await page.locator(".diagnostic-optional summary").click();
  await page.getByLabel("Sector de actividad").selectOption("Industrial / Manufactura");
  await page.getByLabel("Tipo de organización").selectOption("Administración pública");
  await expect(page.getByLabel("Rango de facturación anual")).toHaveCount(0);
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("radio", { name: "Datos dispersos o con errores conocidos", exact: true }).check();
  await page.locator(".diagnostic-optional summary").click();
  await page.getByLabel("Estado del proyecto").selectOption("Modelo o prototipo existente");
  await page.getByRole("checkbox", { name: "Servidores locales", exact: true }).check();
  await page.getByRole("checkbox", { name: "Bases de datos SQL / NoSQL", exact: true }).check();
  await page.getByRole("button", { name: "Siguiente", exact: true }).click();
  await page.getByRole("radio", { name: "La decisión necesita aprobación humana", exact: true }).check();
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
  await page.locator(".diagnostic-optional summary").click();
  for (const [label, value] of [["Nombre completo", "Persona de prueba"], ["Cargo", "Operaciones"], ["Organismo o empresa", "Empresa sintética"], ["Sitio web", "https://example.test"]]) {
    await page.getByLabel(label, { exact: true }).fill(value);
  }
  // A folded optional field must become visible when native validation fails.
  await page.getByLabel("Sitio web", { exact: true }).fill("invalid");
  await page.locator(".diagnostic-optional summary").click();
  await page.getByRole("button", { name: "Continuar al envío", exact: true }).click();
  await expect(page.getByLabel("Sitio web", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Sitio web", { exact: true })).toBeFocused();
  await page.getByLabel("Sitio web", { exact: true }).fill("https://example.test");
  await page.getByLabel("Contexto adicional (opcional)").fill("Contexto sintético sin información personal real.");
  await page.getByRole("button", { name: "Continuar al envío", exact: true }).click();
  await expect(page.locator('input[type="email"]')).toHaveCount(1);
  await expect(page.locator(".diagnostic-review")).not.toHaveAttribute("open", "");
  await expect(page.getByRole("button", { name: "Copiar resumen", exact: true })).not.toBeVisible();
  await page.getByLabel("Email para responder a tu consulta").fill("visitor@example.test");
  const form = page.getByRole("form", { name: "Enviar diagnóstico", exact: true });
  await form.getByRole("checkbox").check();
  await expect(form.getByRole("button", { name: "Enviar diagnóstico", exact: true })).toBeEnabled();
  expect(mock.sent).toHaveLength(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.getByRole("heading", { name: "Tu consulta, lista para enviar.", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("diagnostic-final.png"), fullPage: true });
  await form.getByRole("button", { name: "Enviar diagnóstico", exact: true }).click();
  await expect(form.getByRole("status")).toContainText("no confirma su entrega");
  expect(mock.sent).toHaveLength(1);
  const summary = String(mock.sent[0].summary);
  for (const value of ["Resolver un reto GovTech", "Datos dispersos o con errores conocidos", "La decisión necesita aprobación humana", "Industrial / Manufactura", "Administración pública", "Modelo o prototipo existente", "Servidores locales", "Bases de datos SQL / NoSQL", "Persona de prueba", "Operaciones", "Empresa sintética", "https://example.test", "visitor@example.test", "Contexto sintético", "GovTech e I+D para administraciones públicas"]) expect(summary).toContain(value);
  expect(mock.unexpected).toEqual([]);
});

test("security widget fits small screens, expires safely and renews after returning to the final step", async ({ context, page }) => {
  const mock = await provider(context);
  await complete(page);
  const widget = page.getByLabel("Comprobación de seguridad de Cloudflare Turnstile");
  const button = page.getByRole("button", { name: "Enviar diagnóstico", exact: true });
  await expect(widget).toHaveAttribute("data-size", /compact|flexible/);
  await page.setViewportSize({ width: 320, height: 720 });
  await expect(widget).toHaveAttribute("data-size", "compact");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(widget).toHaveAttribute("data-size", "flexible");
  await expect(button).toBeEnabled();
  await page.evaluate(() => window.dispatchEvent(new Event("test-turnstile-expired")));
  await expect(button).toBeDisabled();
  await page.getByRole("button", { name: "Volver al paso anterior", exact: true }).click();
  await page.getByRole("button", { name: "Continuar al envío", exact: true }).click();
  await expect(button).toBeEnabled();
  expect(mock.sent).toHaveLength(0);
  expect(mock.unexpected).toEqual([]);
});

test("delivery: only an explicit valid submission sends, with no duplicate while pending", async ({ context, page }) => {
  const mock = await provider(context, 200, true);
  await complete(page);
  const form = page.getByRole("form", { name: "Enviar diagnóstico", exact: true });
  const button = form.getByRole("button", { name: "Enviar diagnóstico", exact: true });
  expect(mock.sent).toHaveLength(0);
  await button.click();
  expect(mock.sent).toHaveLength(0);
  await page.getByLabel("Email para responder a tu consulta").fill("visitor@example.test");
  await button.click();
  expect(mock.sent).toHaveLength(0);
  await form.getByRole("checkbox").check();
  await button.click();
  await expect(form.getByRole("button", { name: "Enviando…", exact: true })).toBeDisabled();
  await expect.poll(() => mock.sent.length).toBe(1);
  expect(mock.sent[0].email).toBe("visitor@example.test");
  const submittedSummary = String(mock.sent[0].summary);
  expect(submittedSummary).toContain("Preguntas principales");
  expect(submittedSummary).toContain("inventario sintético");
  expect(submittedSummary).toContain("Sector de actividad\nSin indicar");
  expect(submittedSummary).toContain("Infraestructura de datos disponible\nSin indicar");
  expect(submittedSummary).toContain("Email de contacto\nvisitor@example.test");
  expect(mock.sent[0].turnstileToken).toBe("test-turnstile-token");
  expect(mock.sent[0]).not.toHaveProperty("access_key");
  mock.release();
  await expect(form.getByRole("status")).toContainText("no confirma su entrega");
  await expect(form.getByRole("button", { name: "Enviar diagnóstico", exact: true })).toHaveCount(0);
  await expect(form.getByRole("heading", { name: "Gracias. El servicio ha aceptado tu diagnóstico." })).toBeVisible();
  await expect(page.locator(".diagnostic-summary")).toContainText("inventario sintético");
  expect(mock.sent).toHaveLength(1);
  expect(mock.unexpected).toEqual([]);
});

for (const scenario of [{ status: 500, text: "no ha aceptado el diagnóstico" }, { status: 429, text: "limitado temporalmente" }, { status: "offline", text: "No se ha podido confirmar el envío" }] as const) {
  test(`delivery: ${scenario.status} preserves the summary and never retries automatically`, async ({ context, page }) => {
    const mock = await provider(context, scenario.status);
    await complete(page);
    const form = page.getByRole("form", { name: "Enviar diagnóstico", exact: true });
    await page.getByLabel("Email para responder a tu consulta").fill("visitor@example.test");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: "Enviar diagnóstico", exact: true }).click();
    await expect(form.getByRole("status")).toContainText(scenario.text);
    await expect(form.getByRole("status")).not.toContainText("Provider-private");
    await expect(form.getByRole("button", { name: "Enviar diagnóstico", exact: true })).toBeEnabled();
    await expect(page.locator(".diagnostic-summary")).toContainText("inventario sintético");
    await page.locator(".diagnostic-review summary").click();
    await page.getByRole("button", { name: "Modificar respuestas", exact: true }).click();
    await page.waitForLoadState("networkidle");
    expect(mock.sent).toHaveLength(1);
    expect(mock.unexpected).toEqual([]);
  });
}
