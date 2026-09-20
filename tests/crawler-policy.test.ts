import assert from "node:assert/strict";
import test from "node:test";
import { crawlerRules, renderRobotsText, restrictedModelCrawlers, searchCrawlers } from "../lib/crawler-policy.ts";

test("search and training choices are explicit and disjoint", () => {
  const allowed = new Set<string>(searchCrawlers);
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "Claude-User", "Bravebot"]) {
    assert.ok(allowed.has(bot), bot);
  }
  for (const bot of restrictedModelCrawlers) assert.ok(!allowed.has(bot), bot);
  assert.deepEqual(crawlerRules()[1], { userAgent: [...restrictedModelCrawlers], disallow: "/" });
});

test("named crawlers and wildcard carry the same API exclusions", () => {
  const [search, , fallback] = crawlerRules();
  assert.equal(search.allow, "/");
  assert.equal(fallback.allow, "/");
  assert.deepEqual(search.disallow, ["/api/", "/api$"]);
  assert.deepEqual(search.disallow, fallback.disallow);
});

test("canonical content and Markdown headers remain accessible to search crawlers", () => {
  for (const rule of [crawlerRules()[0], crawlerRules()[2]]) {
    assert.ok(Array.isArray(rule.disallow));
    assert.ok(!rule.disallow.some((path) => ["/", "/insights", "/capacidades", "/markdown", "/_next"].some((prefix) => path === prefix || path === `${prefix}/`)));
  }
});

test("robots uses standard directives and keeps search access separate from training crawlers", () => {
  const robots = renderRobotsText();
  const groups = robots.split(/\r?\n\s*\r?\n/);
  const search = groups.find((group) => group.includes("User-Agent: OAI-SearchBot"));
  const training = groups.find((group) => group.includes("User-Agent: GPTBot"));
  assert.match(search!, /^Allow: \/$/m);
  assert.match(training!, /^Disallow: \/$/m);
  assert.doesNotMatch(robots, /^Content-Signal:/m);
  assert.match(robots, /Sitemap: https:\/\/www\.ordantis\.com\/sitemap\.xml/);
});
