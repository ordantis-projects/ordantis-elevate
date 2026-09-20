import { expect, test } from "@playwright/test";

test("hero links wait for mouse intent before prefetching another full route", async ({ page }, testInfo) => {
  const prefetched: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.searchParams.has("_rsc")) prefetched.push(url.pathname);
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.waitForLoadState("networkidle");
  expect(prefetched.filter((path) => ["/", "/capacidades", "/diagnostico"].includes(path))).toEqual([]);
  await page.screenshot({ path: `.quality/preview-home-${testInfo.project.name}.png` });
  const services = page.getByRole("link", { name: "Ver servicios", exact: true });
  await services.hover();
  await expect.poll(() => prefetched.includes("/capacidades")).toBe(true);
  await services.click();
  await expect(page).toHaveURL(/\/capacidades$/);
  await expect(page.locator("h1")).toBeVisible();
});

test("keyboard focus warms the diagnostic without changing keyboard navigation", async ({ page }) => {
  const prefetched: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.searchParams.has("_rsc")) prefetched.push(url.pathname);
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  const diagnostic = page.locator(".home-hero").getByRole("link", { name: "Iniciar diagnóstico", exact: false });
  await diagnostic.focus();
  await expect.poll(() => prefetched.includes("/diagnostico")).toBe(true);
  await diagnostic.press("Enter");
  await expect(page).toHaveURL(/\/diagnostico$/);
  await expect(page.getByRole("heading", { name: "Empezamos por tu problema." })).toBeVisible();
});
