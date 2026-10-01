import { expect, test } from "@playwright/test";

test("the light appearance remains fixed without a selector or theme storage", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/empresa");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#ffffff");
  const banner = page.getByRole("dialog", { name: "Cookies y privacidad" });
  await expect(banner).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await banner.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await expect(page.getByRole("button", { name: /Cambiar tema|Modo oscuro|Modo claro/i })).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage).filter((key) => /theme|appearance|color-scheme/.test(key)))).toEqual([]);
  await page.goto("/");
  await expect(page.locator(".brand-arrows .brand-arrow")).toHaveCount(44);
  await expect(page.locator(".site-header .brand img")).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".partners-section")).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("a dark device preference cannot alter content or form surfaces", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/diagnostico");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  for (const path of ["/empresa", "/capacidades", "/diagnostico", "/cookies", "/labs/calidad-datos", "/insights"]) {
    await page.goto(path);
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), path).toBeLessThanOrEqual(1);
    if (path === "/capacidades") {
      const detail = page.locator(".service-detail").first();
      await detail.locator(":scope > summary").click();
      await expect(detail).toHaveCSS("background-color", "rgb(255, 255, 255)");
      const deliverable = detail.locator(".service-deliverables-grid > div").first();
      await expect(deliverable).toHaveCSS("background-color", "rgb(255, 255, 255)");
    }
    if (path === "/labs/calidad-datos") {
      const field = page.locator(".lab-field input, .lab-field select").first();
      await expect(field).toHaveCSS("background-color", "rgb(255, 255, 255)");
    }
  }
  await page.goto("/diagnostico");
  for (let step = 0; step < 3; step++) {
    await page.locator(".diagnostic-options input").first().check();
    await page.getByRole("button", { name: step === 2 ? /^Continuar al envío/ : /^Siguiente/ }).click();
  }
  const email = page.locator('input[type="email"]');
  await expect(email).toBeVisible();
  await expect(email).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("the light appearance remains without JavaScript or hydration", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "dark", viewport: testInfo.project.use.viewport });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-brand-intro]")).not.toBeVisible();
    await expect(page.locator(".site-header .brand img")).toBeVisible();
  } finally { await context.close(); }
});

test("the light intro covers the first frame before hydration", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.route("**/_next/**/*.js", (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const intro = page.locator("[data-brand-intro]");
  await expect(page.locator("html")).toHaveAttribute("data-brand-intro-pending", "");
  await expect(intro).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(intro).toBeVisible();
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      animation.pause();
      if (animation.effect?.getTiming().duration === 1000) animation.currentTime = 600;
    }
  });
  const topLayer = await page.evaluate(() => Boolean(document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest("[data-brand-intro]")));
  expect(topLayer).toBe(true);
});
