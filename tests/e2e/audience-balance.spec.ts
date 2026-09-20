import { expect, test } from "@playwright/test";
import { homeDelivery, homeEngagement, homeEvidence, systemJourney } from "../../content/home";
import { dataAdvantages } from "../../content/original-sections";

test("business and public-sector visitors can distinguish development, research and operation", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".home-hero .lead")).toContainText("empresas y administraciones públicas");
  await expect(page.locator(".home-capabilities .capability-row").first()).toHaveAttribute("href", "/capacidades/modelos-predictivos");
  await expect(page.locator(".home-engagement .stack-list li")).toHaveCount(3);
  await expect(page.locator(".home-delivery .stack-list li")).toHaveCount(4);
  for (const block of [homeEngagement, homeDelivery]) {
    await expect(page.getByRole("heading", { name: block.title, exact: true })).toBeVisible();
    for (const item of block.items) await expect(page.getByText(item.text, { exact: true })).toBeVisible();
  }
  await expect(page.locator(".evidence-section")).toContainText(homeEvidence.boundary);
  const tops = await page.evaluate(() => [".home-advantages", ".home-capabilities", ".home-engagement", ".evidence-section", ".method-section", ".home-delivery", ".backers-section"].map((selector) => document.querySelector(selector)!.getBoundingClientRect().top + window.scrollY));
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  for (const item of dataAdvantages) {
    await expect(page.getByRole("heading", { name: item.question, exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: item.diagram, exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: item.linkLabel, exact: true })).toHaveAttribute("href", item.href);
    const application = page.locator(".home-advantages article").filter({ has: page.getByRole("heading", { name: item.question, exact: true }) });
    await application.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(application.getByText(item.inputs, { exact: true })).toBeVisible();
    await expect(application.getByText(item.evaluation, { exact: true })).toBeVisible();
    await page.keyboard.press("Enter");
  }
  for (const [selector, filename] of [[".home-advantages", "applications"], [".home-capabilities", "project-areas"], [".evidence-section", "evidence"]]) {
    await page.locator(selector).screenshot({ path: testInfo.outputPath(`${filename}.png`) });
  }
  await page.locator(".home-capabilities .capability-row").nth(1).click();
  await expect(page).toHaveURL(/\/capacidades\/data-intelligence$/);
  await expect(page.locator("h1")).toContainText("Ciencia e ingeniería de datos");
});

test("the initial HTML explains scope and statistical limits without relying on JavaScript", async ({ request }) => {
  const home = await request.get("/");
  expect(home.status()).toBe(200);
  const html = await home.text();
  for (const text of [homeEngagement.lead, homeDelivery.lead, homeEvidence.boundary]) expect(html).toContain(text);
  for (const item of dataAdvantages) {
    for (const text of [item.question, item.inputs, item.evaluation, item.href]) expect(html).toContain(text);
  }
  const services = await request.get("/capacidades");
  expect(services.status()).toBe(200);
  const servicesHtml = await services.text();
  for (const step of systemJourney.steps) expect(servicesHtml).toContain(step.text);
  const data = await request.get("/capacidades/data-intelligence");
  expect(data.status()).toBe(200);
  expect(await data.text()).toContain("una correlación no demuestra una causa");
});
