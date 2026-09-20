import { expect, test } from "@playwright/test";
import { allIndexableRoutes } from "../../content/pages";

for (const route of allIndexableRoutes) {
  test(`${route} renders one H1 without horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).not.toBeEmpty();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
    await expect(page.locator("[data-nextjs-dialog]"), "Next error overlay").toHaveCount(0);
  });
}

test("mobile navigation exposes state and closes with Escape", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 900, "Mobile navigation is hidden on desktop.");
  await page.goto("/");
  const button = page.locator(".menu-button");
  await expect(button).toHaveAccessibleName("Abrir menú");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await expect(button).toHaveAccessibleName("Cerrar menú");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
});

test("cookie decision is versioned and can be reopened", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("ordantis-cookie-consent") ?? "null"));
  expect(stored).toMatchObject({ version: 1, analytics: false });
  await page.getByRole("button", { name: "Gestionar cookies" }).click();
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
});

test("HTML, Markdown and 404 semantics are correct", async ({ request }) => {
  const html = await request.get("/capacidades/agentes-ia");
  expect(html.status()).toBe(200);
  expect(await html.text()).toContain("Agent Engineering");

  const markdown = await request.get("/capacidades/agentes-ia", { headers: { Accept: "text/markdown" } });
  expect(markdown.status()).toBe(200);
  expect(markdown.headers()["content-type"]).toContain("text/markdown");
  expect(markdown.headers().vary).toContain("Accept");
  expect(await markdown.text()).toMatch(/^# Agent Engineering/);

  const missing = await request.get("/ruta-que-no-existe-ordantis");
  expect(missing.status()).toBe(404);

  const retiredAuthorProfile = await request.get("/autores/sergio-ortiz-montesinos");
  expect(retiredAuthorProfile.status()).toBe(404);
});
