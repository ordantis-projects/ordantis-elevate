import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

// Separate test-only build/server. Never enable a dummy delivery key on the
// owner's normal preview. All provider requests are intercepted by this suite.
export default defineConfig({
  ...base,
  testIgnore: [],
  testMatch: "**/diagnostic-delivery.spec.ts",
  use: { ...base.use, baseURL: "http://127.0.0.1:3001" },
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
