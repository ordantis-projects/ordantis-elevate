import { expect, test } from "@playwright/test";
import { insights } from "../../content/site";

test("guides omit repeated evidence banners and visible revision dates while retaining examples and article metadata", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const guides = testInfo.project.name === "desktop" ? insights : insights.slice(-1);
  for (const guide of guides) {
    const response = await page.goto(`/insights/${guide.slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("article .source-note")).toHaveCount(0);
    await expect(page.locator("article")).not.toContainText("Nota de evidencia");
    await expect(page.locator("article .publication-date")).not.toContainText("Actualizado el");
    await expect(page.locator(".worked-example")).toContainText("situación inventada");
    await expect(page.locator("footer")).not.toContainText("Contenido revisado");
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    const article = schema.map((item) => JSON.parse(item)).find((item) => item["@type"] === "Article");
    expect(article.datePublished).toBe(guide.publishedAt);
    expect(article.dateModified).toBe(guide.updatedAt);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.screenshot({ path: testInfo.outputPath("guide-without-revision-banner.png"), fullPage: true });
});

test("guide index and labs omit generic banners or revision dates without removing experiment limitations", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.locator("main .source-note")).toHaveCount(0);
  for (const path of ["/labs/calidad-datos", "/labs/inteligencia-documental", "/labs/evaluacion-agentes", "/labs/rag-evaluacion"]) {
    await page.goto(path);
    await expect(page.locator(".publication-date")).toHaveText("Método 1.0.0");
    await expect(page.locator("main .source-note")).toBeVisible();
    await expect(page.locator("footer")).not.toContainText("Contenido revisado");
  }
});
