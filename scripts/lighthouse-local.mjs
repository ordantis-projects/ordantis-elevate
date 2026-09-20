import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

// Isolated audit browser only: never connect to the owner's Chrome profile.
// Supplying userDataDir also avoids chrome-launcher's Windows temp deletion race.
const runtime = path.resolve(process.env.LIGHTHOUSE_MODULE_DIR ?? ".quality/lighthouse/node_modules");
const requireTool = createRequire(path.join(runtime, "ordantis-resolver.cjs"));
let lighthouseEntry;
try {
  lighthouseEntry = requireTool.resolve("lighthouse");
} catch {
  throw new Error("Install the audit runtime: npm install --prefix .quality/lighthouse --no-save lighthouse@12.6.1");
}
const { default: lighthouse } = await import(pathToFileURL(lighthouseEntry).href);
const requireLighthouse = createRequire(lighthouseEntry);
const { launch } = await import(pathToFileURL(requireLighthouse.resolve("chrome-launcher")).href);
const options = Object.fromEntries(process.argv.slice(2).map((arg) => arg.replace(/^--/, "").split("=")));
const formFactor = options.profile ?? "mobile";
if (!["mobile", "desktop"].includes(formFactor)) throw new Error("profile must be mobile or desktop.");
const { default: desktopConfig } = await import(pathToFileURL(requireLighthouse.resolve("lighthouse/core/config/desktop-config.js")).href);
const runs = Number(options.runs ?? 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 5) throw new Error("runs must be an integer from 1 to 5.");
const base = new URL(process.env.LIGHTHOUSE_BASE_URL ?? "http://127.0.0.1:3000");
if (base.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(base.hostname)) {
  throw new Error("This command only audits a local build; it must not crawl production.");
}
const routes = options.routes?.split(",") ?? [
  "/", "/diagnostico", "/capacidades/agentes-ia", "/govtech",
  "/research/exist-2026", "/insights/validar-ia-antes-de-industrializar",
];
if (routes.some((route) => !route.startsWith("/") || new URL(route, base).origin !== base.origin)) {
  throw new Error("All audit routes must belong to the local build.");
}
const stamp = new Date().toISOString().replaceAll(":", "-");
const output = path.resolve(".quality/lighthouse-local", stamp);
const profiles = path.resolve(".quality/lighthouse-profiles");
await Promise.all([mkdir(output, { recursive: true }), mkdir(profiles, { recursive: true })]);
const samples = [];
const failures = [];

for (const route of routes) {
  const url = new URL(route, base).href;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}.`);
  await response.arrayBuffer();
  for (let run = 1; run <= runs; run++) {
    const label = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "--")}-${run}`;
    const userDataDir = await mkdtemp(path.join(profiles, "audit-"));
    let browser;
    try {
      browser = await launch({ userDataDir, chromeFlags: ["--headless=new", "--no-first-run"] });
      const result = await lighthouse(url, {
        port: browser.port,
        output: ["json", "html"],
        logLevel: "error",
        formFactor,
        throttlingMethod: "simulate",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      }, formFactor === "desktop" ? desktopConfig : undefined);
      if (!result) throw new Error("Lighthouse returned no result.");
      // Persist the evidence before closing the audit browser.
      await writeFile(path.join(output, `${label}.json`), JSON.stringify(result.lhr, null, 2));
      await writeFile(path.join(output, `${label}.html`), result.report[1]);
      if (options.trace === "true") {
        await writeFile(path.join(output, `${label}.trace.json`), JSON.stringify(result.artifacts.Trace));
        await writeFile(path.join(output, `${label}.network.json`), JSON.stringify(result.artifacts.DevtoolsLog));
      }
      if (result.lhr.runtimeError) throw new Error(JSON.stringify(result.lhr.runtimeError));
      const { lhr } = result;
      const scores = Object.fromEntries(Object.entries(lhr.categories).map(([id, value]) => [id, value.score]));
      if (Object.values(scores).some((score) => typeof score !== "number")) throw new Error("Incomplete category scores.");
      const sample = {
        route, run, report: `${label}.json`, version: lhr.lighthouseVersion,
        environment: lhr.environment, settings: lhr.configSettings, scores,
        lcp: lhr.audits["largest-contentful-paint"].numericValue,
        cls: lhr.audits["cumulative-layout-shift"].numericValue,
        tbt: lhr.audits["total-blocking-time"].numericValue,
        bytes: lhr.audits["total-byte-weight"].numericValue,
        warnings: lhr.runWarnings,
      };
      samples.push(sample);
      console.log(JSON.stringify({ route, run, scores, lcp: Math.round(sample.lcp), tbt: Math.round(sample.tbt) }));
    } catch (error) {
      failures.push({ route, run, error: String(error) });
      console.error(`${label}: ${error}`);
    } finally {
      if (browser) await browser.kill();
    }
  }
}
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const summaries = routes.map((route) => {
  const group = samples.filter((sample) => sample.route === route);
  return {
    route, successfulRuns: group.length, expectedRuns: runs,
    medians: group.length ? Object.fromEntries([
      ...Object.keys(group[0].scores).map((key) => [key, median(group.map((sample) => sample.scores[key]))]),
      ...["lcp", "cls", "tbt", "bytes"].map((key) => [key, median(group.map((sample) => sample[key]))]),
    ]) : null,
  };
});
await writeFile(path.join(output, "summary.json"), JSON.stringify({
  date: stamp, base: base.href, note: `Local simulated ${formFactor} lab measurements, not field CWV.`,
  summaries, failures, samples,
}, null, 2));
console.log(JSON.stringify({ output, summaries, failures }, null, 2));
const qualityFailure = samples.some(({ scores }) => scores.accessibility < 0.95 || scores["best-practices"] < 0.95 || scores.seo < 1);
if (failures.length || qualityFailure) process.exitCode = 1;
if (samples.some(({ scores }) => scores.performance < 0.8)) console.warn("Review performance: at least one sample scored below 80.");
