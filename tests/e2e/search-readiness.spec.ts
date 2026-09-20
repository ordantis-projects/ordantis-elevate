import { expect, test } from "@playwright/test";
import { allIndexableRoutes } from "../../content/pages";
import { siteConfig } from "../../content/identity";
import { insights } from "../../content/site";
import { allowedCrawlers } from "../../lib/crawler-policy";

test.use({ javaScriptEnabled: false });

test("all canonical pages expose substantive HTML, deployment indexing rules and consistent entity markup without JavaScript", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Crawl semantics do not depend on viewport.");
  test.setTimeout(120_000);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  let articles = 0;
  const privatePreview = testInfo.config.metadata.deployment === "preview";

  for (const path of allIndexableRoutes) {
    const url = new URL(path, siteConfig.url).toString();
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), path).toBe(200);
    const robotDirectives = await page.locator('meta[name="robots"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content")).join(","));
    if (privatePreview) {
      // The private runtime must exclude every HTML page, not just robots.txt.
      expect(response?.headers()["x-robots-tag"] ?? "", path).toMatch(/\bnoindex\b/i);
    } else {
      expect(response?.headers()["x-robots-tag"] ?? "", path).not.toMatch(/noindex|none/i);
      expect(robotDirectives, path).not.toMatch(/noindex|none/i);
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="describedby"][href="/llms.txt"]')).toHaveCount(1);
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
    const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(canonicalHref!).toString(), path).toBe(url);
    expect(new URL(openGraphUrl!).toString(), path).toBe(url);

    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title.trim(), path).not.toBe("");
    expect(description?.trim(), path).toBeTruthy();
    expect(titles.has(title), `Duplicate title: ${path}`).toBe(false);
    expect(descriptions.has(description!), `Duplicate description: ${path}`).toBe(false);
    titles.add(title);
    descriptions.add(description!);

    const serialized = await page.locator('script[type="application/ld+json"]').allTextContents();
    const nodes = serialized.flatMap((text) => {
      const data = JSON.parse(text);
      return data["@graph"] ?? [data];
    });
    expect(serialized.join("\n"), path).not.toMatch(/"@type"\s*:\s*"(?:Person|ProfessionalService)"/);
    const organization = nodes.find((node) => node["@id"] === `${siteConfig.url}/#organization`);
    expect(organization, path).toMatchObject({ "@type": "Organization", name: "Ordantis", url: siteConfig.url });
    if (path === "/") {
      expect(organization.address, path).toMatchObject({ "@type": "PostalAddress", addressLocality: "Albacete" });
      expect(Array.isArray(organization.address), path).toBe(false);
      expect(organization.areaServed, path).toEqual(expect.arrayContaining([
        expect.objectContaining({ "@type": "City", name: "Albacete" }),
        expect.objectContaining({ "@type": "City", name: "Valencia" }),
      ]));
    }
    if (path.startsWith("/inteligencia-artificial-")) {
      const city = path.endsWith("albacete") ? "Albacete" : "Valencia";
      const service = nodes.find((node) => node["@id"] === `${url}#service`);
      expect(service, path).toMatchObject({
        "@type": "Service",
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: { "@type": "City", name: city },
      });
      expect(service, path).not.toHaveProperty("address");
    }
    expect(nodes.find((node) => node["@id"] === `${url}#webpage`), path).toMatchObject({ url, inLanguage: "es" });
    for (const article of nodes.filter((node) => node["@type"] === "Article")) {
      articles += 1;
      expect(article.author, path).toMatchObject({ "@type": "Organization", name: "Ordantis", url: siteConfig.url, "@id": `${siteConfig.url}/#organization` });
      expect(article.publisher, path).toEqual({ "@id": `${siteConfig.url}/#organization` });
      expect(article.mainEntityOfPage, path).toEqual({ "@id": `${url}#webpage` });
      expect(article.image, path).toBe(`${siteConfig.url}/opengraph-image`);
    }
  }
  expect(articles).toBe(insights.length + 1); // Guías más la investigación publicada de EXIST.
});

test("robots respect the deployment policy and expose Markdown noindex/canonical", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Robots and headers do not depend on viewport.");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  // A private-preview build must remain excluded, not be changed for this test.
  if (testInfo.config.metadata.deployment === "preview") {
    expect(robotsText).toBe("User-agent: *\nDisallow: /\n");
    expect(robots.headers()["x-robots-tag"]).toContain("noindex");
    expect(robots.headers()["cache-control"]).toBe("private, no-store");
  } else {
    const groups = robotsText.split(/\r?\n\s*\r?\n/);
    for (const bot of [...allowedCrawlers, "*"]) {
      const group = groups.find((item) => item.split(/\r?\n/).includes(`User-Agent: ${bot}`));
      expect(group, bot).toBeTruthy();
      expect(group, bot).toMatch(/^Allow: \/$/m);
      expect(group, bot).toContain("Disallow: /api/");
      expect(group, bot).not.toMatch(/^Disallow: \/$/m);
      expect(group, bot).not.toContain("Disallow: /markdown");
    }
    expect(robotsText).not.toMatch(/^Content-Signal:/m);
  }
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect(llms.headers()["content-type"]).toContain("text/markdown");
  expect(llms.headers()["x-robots-tag"]).toContain("noindex");
  const llmsText = await llms.text();
  expect(llmsText).toMatch(/^# Ordantis\n\n> /);
  expect(llmsText).toContain("/markdown/inteligencia-artificial-albacete");
  expect(llmsText).toContain("/markdown/inteligencia-artificial-valencia");
  const sitemap = await request.get("/sitemap.xml");
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(urls.sort()).toEqual(allIndexableRoutes.map((path) => new URL(path, siteConfig.url).toString()).sort());
  for (const path of ["/", "/capacidades/agentes-ia", "/insights/rag-abstencion-evidencia"]) {
    const markdown = await request.get(path === "/" ? "/markdown" : `/markdown${path}`);
    expect(markdown.status()).toBe(200);
    expect(markdown.headers()["x-robots-tag"]).toContain("noindex");
    expect(markdown.headers().link).toContain(`<${new URL(path, siteConfig.url)}>; rel="canonical"`);
    expect(markdown.headers().link).toContain(`<${siteConfig.url}/llms.txt>; rel="describedby"`);
    for (const bot of ["Googlebot", "OAI-SearchBot", "Claude-SearchBot"]) {
      const html = await request.get(path, { headers: { "User-Agent": bot, Accept: "text/html" } });
      expect(html.status(), `${bot} ${path}`).toBe(200);
      expect(html.headers()["content-type"]).toContain("text/html");
      if (testInfo.config.metadata.deployment === "preview") {
        expect(html.headers()["x-robots-tag"] ?? "").toMatch(/\bnoindex\b/i);
      } else {
        expect(html.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex|none/i);
      }
      expect(await html.text()).toContain("<h1");
    }
  }
});
