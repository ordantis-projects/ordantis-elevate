import { allIndexableRoutes } from "./content/pages.ts";

export default {
  site: "http://127.0.0.1:3000",
  urls: allIndexableRoutes,
  scanner: {
    // This local crawl checks every URL, not five samples from /insights.
    // robots/sitemap still point to production: do not follow them from here.
    sitemap: false,
    robotsTxt: false,
    crawler: false,
    dynamicSampling: false,
    device: "mobile",
    // Full-site diagnostic pass, NOT the mobile performance benchmark.
    // Throttled benchmarks use lighthouse:local or Lighthouse CI separately.
    throttle: false,
    samples: 1,
  },
  puppeteerClusterOptions: { maxConcurrency: 2 },
  ci: { reporter: "jsonExpanded", buildStatic: true, budget: { accessibility: 95, "best-practices": 95, seo: 100 } },
  lighthouseOptions: {
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  },
};
