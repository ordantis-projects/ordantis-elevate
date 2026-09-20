import assert from "node:assert/strict";
import test from "node:test";
import { allowedCrawlers, crawlerRules, modelDevelopmentCrawlers, renderRobotsText } from "../lib/crawler-policy.ts";
import { contentSignalPolicy } from "../lib/agent-discovery.ts";

test("search and model-development crawlers are explicitly allowed", () => {
  const allowed = new Set<string>(allowedCrawlers);
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "Claude-User", "Bravebot"]) {
    assert.ok(allowed.has(bot), bot);
  }
  for (const bot of modelDevelopmentCrawlers) assert.ok(allowed.has(bot), bot);
  assert.deepEqual(crawlerRules()[0], {
    userAgent: [...allowedCrawlers],
    allow: "/",
    disallow: ["/api/", "/api$"],
    contentSignal: contentSignalPolicy,
  });
});

test("named crawlers and wildcard carry the same API exclusions", () => {
  const [search, fallback] = crawlerRules();
  assert.equal(search.allow, "/");
  assert.equal(fallback.allow, "/");
  assert.deepEqual(search.disallow, ["/api/", "/api$"]);
  assert.deepEqual(search.disallow, fallback.disallow);
  assert.equal(search.contentSignal, contentSignalPolicy);
  assert.equal(fallback.contentSignal, contentSignalPolicy);
});

test("canonical content and Markdown headers remain accessible to every crawler", () => {
  for (const rule of crawlerRules()) {
    assert.ok(Array.isArray(rule.disallow));
    assert.ok(!rule.disallow.some((path) => ["/", "/insights", "/capacidades", "/markdown", "/_next"].some((prefix) => path === prefix || path === `${prefix}/`)));
  }
});

test("robots declares allowed content uses and allows model-development crawlers", () => {
  const robots = renderRobotsText();
  const groups = robots.split(/\r?\n\s*\r?\n/);
  const search = groups.find((group) => group.includes("User-Agent: OAI-SearchBot"));
  const training = groups.find((group) => group.includes("User-Agent: GPTBot"));
  assert.match(search!, /^Allow: \/$/m);
  assert.match(training!, /^Allow: \/$/m);
  assert.doesNotMatch(training!, /^Disallow: \/$/m);
  assert.match(search!, new RegExp(`^Content-Signal: ${contentSignalPolicy}$`, "m"));
  assert.match(training!, new RegExp(`^Content-Signal: ${contentSignalPolicy}$`, "m"));
  assert.match(robots, /Sitemap: https:\/\/www\.ordantis\.com\/sitemap\.xml/);
});
