import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  testMatch: "**/search-readiness.spec.ts",
  use: { ...base.use, baseURL: "http://127.0.0.1:3002" },
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
