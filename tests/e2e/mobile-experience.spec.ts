import { expect, test } from "@playwright/test";
import { serviceAreas } from "../../content/identity";

test("home keeps brand motion, offers a reachable primary action and has touch-sized navigation", async ({ page, viewport }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  const action = page.locator(".home-hero").getByRole("link", { name: "Iniciar diagnóstico", exact: true });
  await expect(action).toBeVisible();
  const bounds = await action.boundingBox();
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  if (viewport!.width <= 640) expect(bounds!.y + bounds!.height).toBeLessThan(viewport!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: testInfo.outputPath("home.png") });
  if (viewport!.width <= 900) {
    const menu = page.getByRole("button", { name: "Abrir menú", exact: true });
    await menu.click();
    const nav = page.getByRole("navigation", { name: "Navegación principal" });
    await expect(nav.getByRole("link", { name: "Inicio", exact: true })).toBeFocused();
    for (const link of await nav.getByRole("link").all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await page.screenshot({ path: testInfo.outputPath("mobile-menu.png") });
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.locator(".home-hero h1").focus();
    // Pointer outside header closes the disclosure without a blocking overlay.
    await page.mouse.click(viewport!.width - 4, viewport!.height - 4);
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await nav.getByRole("link", { name: "Iniciar diagnóstico", exact: true }).click();
    await expect(page).toHaveURL(/\/diagnostico$/);
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  expect(errors).toEqual([]);
});

test("company links local pages contextually without adding them to main navigation or footer", async ({ page }) => {
  await page.goto("/empresa");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  for (const area of serviceAreas) {
    await expect(page.locator('main a[href="' + area.path + '"]')).toHaveCount(1);
    await expect(page.locator('header a[href="' + area.path + '"], footer a[href="' + area.path + '"]')).toHaveCount(0);
    await page.locator('main a[href="' + area.path + '"]').click();
    await expect(page).toHaveURL(new RegExp(area.path + "$"));
    await expect(page.locator("h1")).toContainText(area.name);
    await page.goBack();
  }
});
