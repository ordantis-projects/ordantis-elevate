import { expect, test } from "@playwright/test";
import { rdInsights } from "../../content/rd-insights";

const pages = ["/", "/govtech", "/capacidades/modelos-predictivos", ...rdInsights.map((guide) => `/insights/${guide.slug}`)];
for (const path of pages) {
  test(`R&D content remains readable and confidential at ${path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/\bCRIDA\b|PISA[-\s]?MaT|\bLEBL\b|GEST[-\s]?PPT[-\s]?SERV[-\s]?IA|millas\s+a\s+toma/iu);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
    if (path.startsWith("/insights/")) {
      const guide = rdInsights.find((entry) => path.endsWith(entry.slug))!;
      await expect(page.locator("article .source-note")).toHaveCount(0);
      await expect(page.locator("article")).not.toContainText(guide.evidenceNote!);
      await expect(page.locator(".worked-example")).toContainText("situación inventada");
      const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
      const article = schema.map((item) => JSON.parse(item)).find((item) => item["@type"] === "Article");
      expect(article.datePublished).toBe(guide.publishedAt);
      expect(article.dateModified).toBe(guide.updatedAt);
    }
    if (path === "/govtech") {
      const table = page.getByRole("region", { name: "Ejemplos de alcance técnico; no describen proyectos ejecutados." });
      await table.scrollIntoViewIfNeeded();
      await expect(table).toBeVisible();
      await table.focus();
      await expect(table).toBeFocused();
      await page.screenshot({ path: testInfo.outputPath("govtech-matrix.png") });
    } else if (path === "/insights/elegir-modelo-tabular-temporal-grafo") {
      await page.screenshot({ path: testInfo.outputPath("rd-guide.png") });
    }
  });
}
