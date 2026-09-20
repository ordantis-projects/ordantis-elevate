import { expect, test } from "@playwright/test";

const intro = "[data-brand-intro]";

test("server-rendered intro covers the first frame even when hydration cannot load", async ({ page }) => {
  await page.addInitScript(() => {
    const checks: boolean[] = [];
    Object.assign(window, { introPaintChecks: checks });
    new PerformanceObserver((entries) => {
      for (const entry of entries.getEntries()) {
        if (entry.entryType !== "paint") continue;
        const element = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
        checks.push(Boolean(element?.closest("[data-brand-intro]")) ||
          getComputedStyle(document.documentElement, "::before").content === '""');
      }
    }).observe({ type: "paint", buffered: true });
  });
  await page.route("**/_next/**/*.js", (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(intro)).toBeVisible();
  expect(await page.evaluate(() => {
    const element = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    return Boolean(element?.closest("[data-brand-intro]"));
  })).toBe(true);
  await expect.poll(() => page.evaluate(() =>
    (window as Window & { introPaintChecks: boolean[] }).introPaintChecks.length)).toBeGreaterThan(0);
  expect(await page.evaluate(() =>
    (window as Window & { introPaintChecks: boolean[] }).introPaintChecks.every(Boolean))).toBe(true);
  await page.screenshot({ path: `.quality/intro-before-hydration-${page.viewportSize()?.width}.png` });
  await page.getByRole("button", { name: "Saltar intro" }).click();
  await expect(page.locator(intro)).not.toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-brand-intro-pending");
  await expect(page.locator(".home-hero h1")).toBeVisible();
});

test("hydration arriving after the safety release does not show a late intro", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/_next/**/*.js", async (route) => { await gate; await route.continue(); });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(intro)).toBeVisible();
    await expect(page.locator("html")).not.toHaveAttribute("data-brand-intro-pending", { timeout: 6000 });
    release();
    await expect(page.locator(".cookie-panel")).toBeVisible();
    await expect(page.locator(intro)).not.toBeVisible();
    await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
  } finally { release(); }
});

test("failed hydration cannot leave a permanent intro or replay it later", async ({ page }) => {
  await page.route("**/_next/**/*.js", (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(intro)).toBeVisible();
  await expect(page.locator(intro)).not.toBeVisible({ timeout: 6000 });
  await expect(page.locator("html")).not.toHaveAttribute("data-brand-intro-pending", { timeout: 6000 });
  await expect(page.locator(".home-hero h1")).toBeVisible();
  await page.unroute("**/_next/**/*.js");
  await page.getByRole("link", { name: "Ver servicios", exact: true }).click();
  await expect(page).toHaveURL(/\/capacidades$/);
});

test("intro moves right, reveals the brand and releases the unchanged homepage", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const dialog = page.locator(intro);
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName("Bienvenida a Ordantis");
  const arrow = dialog.locator("[data-intro-arrow]");
  const initial = await arrow.evaluate((node) => getComputedStyle(node).transform);
  await expect.poll(() => arrow.evaluate((node) => getComputedStyle(node).transform)).not.toBe(initial);
  await expect(dialog).not.toBeVisible({ timeout: 3500 });
  await expect(page.locator(".home-hero h1")).toHaveText("IA y datos. Modelos y sistemas.");
  await expect(page.locator(".brand-arrow")).toHaveCount(44);
  expect(await page.evaluate(() => document.querySelector(":modal"))).toBeNull();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("skip works by keyboard, releases focus and is not repeated on internal navigation", async ({ page }) => {
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Saltar intro" });
  await expect(skip).toBeFocused();
  expect((await skip.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.keyboard.press("Enter");
  await expect(page.locator(intro)).not.toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.getByRole("link", { name: "Ver servicios", exact: true }).click();
  await expect(page).toHaveURL(/\/capacidades$/);
  await page.getByRole("banner").getByRole("link", { name: "Ordantis, inicio", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".home-hero h1")).toBeVisible();
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
});

test("Escape dismisses the intro and restores the initial position", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(intro)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("changing to reduced motion immediately dismisses an active intro", async ({ page }) => {
  // Fresh entry: a reload can restore scroll and intentionally bypass the intro.
  await page.goto("/");
  await expect(page.locator(intro)).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
});

test("a restored reading position is not interrupted by the intro", async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => window.scrollTo({ top: 240, behavior: "instant" }), { once: true });
  });
  await page.goto("/");
  await expect(page.locator(".cookie-panel")).toBeVisible();
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("reduced motion, deep links and internal landing pages bypass the intro", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(intro)).not.toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#contenido");
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
  await page.goto("/capacidades");
  await expect(page.locator(intro)).toHaveCount(0);
  await page.getByRole("banner").getByRole("link", { name: "Ordantis, inicio", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(`${intro}[open]`)).toHaveCount(0);
});

test("without JavaScript the content and links are immediately usable", async ({ browser, baseURL, viewport }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(intro)).not.toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await page.getByRole("link", { name: "Ver servicios", exact: true }).click();
    await expect(page).toHaveURL(/\/capacidades$/);
  } finally {
    await context.close();
  }
});

test("intro frames keep the original logo legible and fit the viewport", async ({ page }, testInfo) => {
  await page.clock.install({ time: new Date("2026-09-14T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-14T12:00:01Z"));
  await page.goto("/");
  await expect.poll(async () => {
    await page.clock.runFor(16);
    return page.locator(`${intro}[open]`).count();
  }).toBe(1);
  const dialog = page.locator(intro);
  const setFrame = async (time: number) => dialog.evaluate((node, value) => {
    node.getAnimations({ subtree: true }).forEach((animation) => {
      animation.pause();
      animation.currentTime = value;
    });
  }, time);
  await expect(dialog.getByRole("img", { name: "Ordantis", exact: true })).toBeVisible();
  await setFrame(850);
  const early = await dialog.locator("[data-intro-arrow]").boundingBox();
  await page.screenshot({ path: `.quality/intro-sweep-${testInfo.project.name}.png` });
  await setFrame(1400);
  const late = await dialog.locator("[data-intro-arrow]").boundingBox();
  expect(late!.x).toBeGreaterThan(early!.x);
  await setFrame(1700);
  await expect(dialog.locator("[data-intro-wordmark]")).toHaveCSS("clip-path", "inset(0px)");
  await expect(dialog.locator("p")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: `.quality/intro-wordmark-${testInfo.project.name}.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  // Con las animaciones pausadas, el temporizador de seguridad debe liberar la web.
  await page.clock.runFor(2400);
  await expect(dialog).not.toBeVisible();
});
