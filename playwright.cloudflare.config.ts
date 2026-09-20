import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  metadata: { ...base.metadata, deployment: "preview" },
  testMatch: ["**/search-readiness.spec.ts", "**/brand-intro.spec.ts"],
  use: { ...base.use, baseURL: "http://127.0.0.1:8787" },
  webServer: {
    command: "npm run start:vinext -- --local --ip 127.0.0.1",
    url: "http://127.0.0.1:8787",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
