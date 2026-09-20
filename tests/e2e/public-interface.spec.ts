import { expect, test } from "@playwright/test";

const technicalLinks = 'a[href*="llms.txt"], a[href*="llms-full.txt"], a[href*="sitemap.xml"], a[href*="github.com/cofrian/exist2026-ordantis"]';

test("footer exposes accessible customer navigation, not crawler files or the research repository", async ({ page, request }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await expect(page.locator(technicalLinks)).toHaveCount(0);
  const footer = page.locator("footer");
  await expect(footer).not.toContainText(/llms\.txt|sitemap|GitHub research/i);
  await expect(footer.getByRole("link", { name: "Research", exact: true })).toHaveAttribute("href", "/research");
  await expect(footer.getByRole("link", { name: "contacto@ordantis.com", exact: true })).toHaveAttribute("href", "mailto:contacto@ordantis.com");
  await expect(footer.getByRole("navigation")).toHaveCount(3);
  await expect(footer.getByRole("navigation", { name: "Información legal" })).toBeVisible();
  await expect(footer).toContainText("Para empresas y administraciones públicas.");
  await expect(footer).not.toContainText(/Contenido revisado|B23922552/);
  const targets = await footer.locator("a, button").evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(targets.every((height) => height >= 44)).toBe(true);
  const settings = footer.getByRole("button", { name: "Gestionar cookies" });
  await settings.focus();
  await expect(settings).toBeFocused();
  await settings.click();
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  if (testInfo.project.name === "desktop") {
    const paths = await footer.locator('a[href^="/"]').evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("href")!))]);
    for (const path of paths) expect((await request.get(path)).status(), path).toBe(200);
  }
  // Check normal viewport geometry before using a taller component capture.
  // Mobile footers exceed one screen; leave room for the fixed header above.
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  const viewport = page.viewportSize()!;
  const footerHeight = (await footer.boundingBox())!.height;
  await page.setViewportSize({ width: viewport.width, height: Math.max(viewport.height, Math.ceil(footerHeight) + 200) });
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    const footer = document.querySelector("footer")!;
    window.scrollTo({ top: window.scrollY + footer.getBoundingClientRect().top - 100, behavior: "instant" });
  });
  await footer.screenshot({ path: `.quality/footer-public-${testInfo.project.name}.png` });
  await page.setViewportSize(viewport);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("404 uses a visitor destination and machine discovery remains available", async ({ page, request }) => {
  const response = await page.goto("/ruta-inexistente-prueba-interfaz");
  expect(response?.status()).toBe(404);
  await expect(page.locator(technicalLinks)).toHaveCount(0);
  // The first layer intentionally remains until an explicit choice; on narrow
  // screens it may cover the 404's lower CTA. Rejection must release it.
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.getByRole("link", { name: "Ver guías técnicas", exact: true }).click();
  await expect(page).toHaveURL(/\/insights$/);
  for (const path of ["/llms.txt", "/llms-full.txt", "/sitemap.xml"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://www.ordantis.com/sitemap.xml");
  await expect(page.locator('head link[rel="describedby"][href="/llms.txt"]')).toHaveCount(1);
});
