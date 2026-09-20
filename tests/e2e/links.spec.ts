import { expect, test } from "@playwright/test";
import { allIndexableRoutes } from "../../content/pages";
import { serviceAreas, siteConfig } from "../../content/identity";

test("all internal links resolve and pages retain their agreed discovery paths", async ({ page, request, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "The link graph does not depend on viewport.");
  test.setTimeout(180_000);
  const pages = new Map<string, { hrefs: string[]; ids: string[] }>();
  for (const route of allIndexableRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('a[href*="llms.txt"], a[href*="llms-full.txt"], a[href*="sitemap.xml"], a[href*="github.com/cofrian/exist2026-ordantis"]'), `${route}: no technical/repository shortcuts in the interface`).toHaveCount(0);
    pages.set(route, {
      hrefs: await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")!)),
      ids: await page.locator("[id]").evaluateAll((nodes) => nodes.map((node) => node.id)),
    });
  }

  const incoming = new Set<string>();
  const checkedResources = new Set<string>();
  const problems: string[] = [];
  for (const [source, { hrefs }] of pages) {
    for (const href of hrefs) {
      const url = new URL(href, `${baseURL}${source}`);
      if (![new URL(baseURL!).hostname, "www.ordantis.com", "ordantis.com"].includes(url.hostname)) continue;
      const destination = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
      const target = pages.get(destination);
      if (source !== destination) incoming.add(destination);
      if (target) {
        if (url.hash && !target.ids.includes(decodeURIComponent(url.hash.slice(1)))) problems.push(`${source} → ${href}: fragmento ausente`);
      } else if (!checkedResources.has(destination)) {
        checkedResources.add(destination);
        const response = await request.get(`${baseURL}${url.pathname}${url.search}`);
        if (!response.ok()) problems.push(`${source} → ${href}: HTTP ${response.status()}`);
      }
    }
  }
  // Local pages remain outside navigation but now have approved contextual
  // links from Empresa, so they must pass the incoming-link check too.
  const localRoutes = new Set<string>(serviceAreas.map((area) => area.path));
  const [sitemap, llms] = await Promise.all([request.get("/sitemap.xml"), request.get("/llms.txt")]);
  expect(sitemap.ok()).toBe(true);
  expect(llms.ok()).toBe(true);
  const [sitemapText, llmsText] = await Promise.all([sitemap.text(), llms.text()]);
  for (const route of allIndexableRoutes) {
    if (localRoutes.has(route)) {
      expect(pages.get("/empresa")!.hrefs).toContain(route);
      expect(sitemapText, `${route}: presente en sitemap`).toContain(`<loc>${siteConfig.url}${route}</loc>`);
      expect(llmsText, `${route}: presente en llms.txt`).toContain(`/markdown${route}`);
      const markdown = await request.get(`/markdown${route}`);
      expect(markdown.status(), `${route}: Markdown accesible`).toBe(200);
    }
    if (!incoming.has(route)) {
      problems.push(`${route}: sin enlaces entrantes`);
    }
  }
  expect(problems).toEqual([]);
});
