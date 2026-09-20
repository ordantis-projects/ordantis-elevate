import { expect, test, type Locator } from "@playwright/test";

async function contrast(locator: Locator) {
  return locator.evaluate((node) => {
    const rgb = (color: string) => color.match(/[\d.]+/g)!.slice(0, 3).map(Number);
    const luminance = (color: string) => rgb(color).map((value) => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    let ancestor: Element | null = node;
    let background = "rgb(8, 23, 40)";
    while (ancestor) {
      const value = getComputedStyle(ancestor).backgroundColor;
      if (value.startsWith("rgb(") || value.endsWith(", 1)")) { background = value; break; }
      ancestor = ancestor.parentElement;
    }
    const a = luminance(getComputedStyle(node).color);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
}

test("appearance follows the system live without a selector or theme storage", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/empresa");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "light dark");
  await expect(page.locator('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')).toHaveAttribute("content", "#081728");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(8, 23, 40)");
  const banner = page.getByRole("dialog", { name: "Cookies y privacidad" });
  await expect(banner).toHaveCSS("background-color", "rgb(16, 34, 55)");
  await banner.getByRole("button", { name: "Personalizar", exact: true }).click();
  expect(await contrast(banner.locator("#cookie-description"))).toBeGreaterThanOrEqual(4.5);
  for (const name of ["Rechazar cookies", "Aceptar cookies"]) {
    expect(await contrast(banner.getByRole("button", { name, exact: true }))).toBeGreaterThanOrEqual(4.5);
  }
  await banner.screenshot({ path: `.quality/appearance-cookies-dark-${testInfo.project.name}.png` });
  await banner.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await expect(page.getByRole("button", { name: /Cambiar tema|Modo oscuro|Modo claro/i })).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage).filter((key) => /theme|appearance|color-scheme/.test(key)))).toEqual([]);
  await page.goto("/");
  await expect(page.locator(".brand-arrows .brand-arrow")).toHaveCount(44);
  await expect(page.locator(".site-header .brand img")).toBeVisible();
  await page.screenshot({ path: `.quality/appearance-home-dark-${testInfo.project.name}.png`, fullPage: true });
  await page.screenshot({ path: `.quality/appearance-home-dark-viewport-${testInfo.project.name}.png` });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".partners-section")).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("dark content, diagnostic fields and technical components remain readable", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  for (const path of ["/empresa", "/capacidades", "/diagnostico", "/cookies", "/labs/calidad-datos", "/insights"]) {
    await page.goto(path);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(8, 23, 40)");
    await expect(page.locator("h1")).toBeVisible();
    expect(await contrast(page.locator("h1")), path).toBeGreaterThanOrEqual(4.5);
    const description = page.locator(".page-hero .lead").first();
    if (await description.isVisible()) expect(await contrast(description), path).toBeGreaterThanOrEqual(4.5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), path).toBeLessThanOrEqual(1);
    if (path === "/capacidades") {
      const detail = page.locator(".service-detail").first();
      await detail.locator(":scope > summary").click();
      await expect(detail).toHaveCSS("background-color", "rgb(16, 34, 55)");
      const deliverable = detail.locator(".service-deliverables-grid > div").first();
      await expect(deliverable).toHaveCSS("background-color", "rgb(16, 34, 55)");
    }
    if (path === "/labs/calidad-datos") {
      const field = page.locator(".lab-field input, .lab-field select").first();
      await expect(field).toHaveCSS("background-color", "rgb(16, 34, 55)");
      expect(await contrast(field)).toBeGreaterThanOrEqual(4.5);
    }
  }
  await page.goto("/diagnostico");
  for (let step = 0; step < 3; step++) {
    await page.locator(".diagnostic-options input").first().check();
    await page.getByRole("button", { name: step === 2 ? /^Continuar al envío/ : /^Siguiente/ }).click();
  }
  const email = page.locator('input[type="email"]');
  await expect(email).toBeVisible();
  await expect(email).toHaveCSS("background-color", "rgb(16, 34, 55)");
  expect(await contrast(email)).toBeGreaterThanOrEqual(4.5);
  await page.screenshot({ path: `.quality/appearance-diagnostic-dark-${testInfo.project.name}.png` });
});

test("dark preference applies without JavaScript or hydration", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark", viewport: testInfo.project.use.viewport });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(8, 23, 40)");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-brand-intro]")).not.toBeVisible();
    await expect(page.locator(".site-header .brand img")).toBeVisible();
  } finally { await context.close(); }
});

test("dark intro covers the first frame before hydration without a white background", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.route("**/_next/**/*.js", (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const intro = page.locator("[data-brand-intro]");
  await expect(page.locator("html")).toHaveAttribute("data-brand-intro-pending", "");
  await expect(intro).toHaveCSS("background-color", "rgb(8, 23, 40)");
  await expect(intro).toBeVisible();
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      animation.pause();
      if (animation.effect?.getTiming().duration === 1000) animation.currentTime = 600;
    }
  });
  await page.screenshot({ path: `.quality/appearance-intro-dark-${testInfo.project.name}.png` });
  const topLayer = await page.evaluate(() => Boolean(document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest("[data-brand-intro]")));
  expect(topLayer).toBe(true);
});
