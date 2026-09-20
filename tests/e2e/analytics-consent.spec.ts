import { expect, test, type BrowserContext, type Page } from "@playwright/test";

// This is a simulated production origin backed entirely by localhost. Every
// vendor request is mocked/blocked; no visit reaches Google or Microsoft.
const origin = "https://www.ordantis.com";
const consentKey = "ordantis-cookie-consent";

async function mockAnalytics(context: BrowserContext, delayed = false) {
  const scripts: string[] = [];
  const events: string[] = [];
  const unexpected: string[] = [];
  let release: () => void = () => {};
  const pending = delayed ? new Promise<void>((resolve) => { release = resolve; }) : Promise.resolve();
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === origin) {
      try {
        // Retry a reset localhost connection; HTTP errors and all consent
        // assertions still fail normally. This proxy never contacts production.
        const response = await route.fetch({ url: `http://127.0.0.1:3000${url.pathname}${url.search}`, maxRedirects: 0, maxRetries: 2 });
        return await route.fulfill({ response });
      } catch (error) {
        // Navigation/teardown can cancel a local prefetch already in progress.
        if (!/has been disposed|Test ended|Target.*closed/.test(String(error))) throw error;
        return;
      }
    }
    if (url.hostname === "www.google-analytics.com" || url.hostname === "test.clarity.ms") {
      events.push(url.hostname);
      return route.fulfill({ status: 204, headers: { "Access-Control-Allow-Origin": origin } });
    }
    if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") {
      scripts.push("ga");
      await pending;
      const flag = JSON.stringify(`ga-disable-${url.searchParams.get("id")}`);
      return route.fulfill({ contentType: "application/javascript", body: `
        (() => {
          const send = () => { if (!window[${flag}]) fetch('https://www.google-analytics.com/g/collect'); };
          const queue = window.dataLayer || [];
          window.gtag = (...args) => { if (args[0] === 'event') send(); };
          queue.forEach(args => window.gtag(...args));
          document.cookie = '_ga=synthetic; Path=/; Secure; SameSite=Lax';
          document.cookie = '_ga_TEST=synthetic; Domain=ordantis.com; Path=/; Secure; SameSite=Lax';
          setInterval(send, 100);
        })();
      ` }).catch(() => { /* The document may have unloaded while this response was held. */ });
    }
    if (url.hostname === "www.clarity.ms" && url.pathname.startsWith("/tag/")) {
      scripts.push("clarity");
      await pending;
      return route.fulfill({ contentType: "application/javascript", body: `
        (() => {
          let active = true;
          const queued = window.clarity?.q || [];
          window.clarity = (...args) => { if (args[0] === 'stop') active = false; };
          queued.forEach(args => window.clarity(...args));
          document.cookie = '_clck=synthetic; Domain=ordantis.com; Path=/; Secure; SameSite=Lax';
          document.cookie = '_clsk=synthetic; Path=/; Secure; SameSite=Lax';
          setInterval(() => { if (active) fetch('https://test.clarity.ms/collect'); }, 100);
        })();
      ` }).catch(() => { /* A pending script cannot outlive a revoked page. */ });
    }
    unexpected.push(url.origin);
    await route.abort();
  });
  return { scripts, events, unexpected, release };
}

async function accept(page: Page) {
  await page.getByRole("button", { name: "Aceptar cookies", exact: true }).click();
}

async function withdraw(page: Page) {
  await page.getByRole("button", { name: "Gestionar cookies", exact: true }).click();
  await expect(page.getByText(/retirar el permiso recarga la página/)).toBeVisible();
  const reload = page.waitForEvent("domcontentloaded");
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await reload;
  await page.waitForLoadState("networkidle");
}

test("analytics: custom preferences only start SDKs on save and can withdraw them", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.goto(`${origin}/empresa`);
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  const checkbox = page.getByRole("checkbox", { name: "Analítica Opcional", exact: true });
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await page.waitForLoadState("networkidle");
  expect(mock.scripts).toEqual([]);
  expect(mock.events).toEqual([]);
  await page.getByRole("button", { name: "Guardar preferencias", exact: true }).click();
  await expect.poll(() => new Set(mock.events).size).toBe(2);
  await page.getByRole("button", { name: "Gestionar cookies", exact: true }).click();
  await page.getByRole("button", { name: "Personalizar", exact: true }).click();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  const reload = page.waitForEvent("domcontentloaded");
  await page.getByRole("button", { name: "Guardar preferencias", exact: true }).click();
  await reload;
  await page.waitForLoadState("networkidle");
  const stopped = mock.events.length;
  await page.reload();
  await page.waitForLoadState("networkidle");
  expect(mock.events.length).toBe(stopped);
  expect(mock.scripts).toHaveLength(2);
  expect((await context.cookies()).filter((cookie) => /^_ga|^_cl[cs]k/.test(cookie.name))).toEqual([]);
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), consentKey)).toMatchObject({ analytics: false });
  expect(mock.unexpected).toEqual([]);
});

test("analytics: never loads before permission or after initial rejection", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.goto(origin);
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.waitForLoadState("networkidle");
  expect(mock.scripts).toEqual([]);
  expect(mock.events).toEqual([]);
  expect(mock.unexpected).toEqual([]);
});

test("analytics: withdrawal stops loaded SDKs, clears only analytics cookies and permits reacceptance", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await context.addCookies([{ name: "session", value: "keep", domain: "www.ordantis.com", path: "/", secure: true }]);
  await page.goto(origin);
  await accept(page);
  await expect.poll(() => new Set(mock.scripts).size).toBe(2);
  await expect.poll(() => new Set(mock.events).size).toBe(2);
  await withdraw(page);
  const afterWithdrawal = mock.events.length;
  expect((await context.cookies()).filter((cookie) => /^_ga|^_cl[cs]k/.test(cookie.name))).toEqual([]);
  expect((await context.cookies()).some((cookie) => cookie.name === "session")).toBe(true);
  await page.getByRole("link", { name: "Ver servicios", exact: true }).click();
  await page.waitForLoadState("networkidle");
  expect(mock.events.length).toBe(afterWithdrawal);
  expect(mock.scripts).toHaveLength(2);
  await page.getByRole("button", { name: "Gestionar cookies", exact: true }).click();
  await accept(page);
  await expect.poll(() => mock.scripts.length).toBe(4);
  await expect.poll(() => mock.events.length).toBeGreaterThan(afterWithdrawal);
  expect(mock.unexpected).toEqual([]);
});

test("analytics: withdrawal while vendor scripts are still loading does not start tracking", async ({ context, page }) => {
  const mock = await mockAnalytics(context, true);
  await page.goto(origin);
  await accept(page);
  await expect.poll(() => mock.scripts.length).toBe(2);
  await withdraw(page);
  mock.release();
  await page.getByRole("link", { name: "Ver servicios", exact: true }).click();
  await page.waitForLoadState("networkidle");
  expect(mock.events).toEqual([]);
  expect(mock.scripts).toHaveLength(2);
  expect(mock.unexpected).toEqual([]);
});

test("analytics: another open tab also stops when permission is withdrawn", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.goto(origin);
  await accept(page);
  const second = await context.newPage();
  await second.goto(origin);
  await expect.poll(() => mock.scripts.length).toBe(4);
  const secondReload = second.waitForEvent("domcontentloaded");
  await withdraw(page);
  await secondReload;
  await second.waitForLoadState("networkidle");
  const stopped = mock.events.length;
  await second.getByRole("link", { name: "Ver servicios", exact: true }).click();
  await second.waitForLoadState("networkidle");
  expect(mock.events.length).toBe(stopped);
  expect(mock.scripts).toHaveLength(4);
  expect(mock.unexpected).toEqual([]);
});

test("analytics: blocked storage cannot prevent withdrawal", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new Error("Storage blocked for this test"); };
    Storage.prototype.getItem = () => { throw new Error("Storage blocked for this test"); };
  });
  await page.goto(origin);
  await accept(page);
  await expect.poll(() => new Set(mock.events).size).toBe(2);
  await withdraw(page);
  const stopped = mock.events.length;
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  await page.getByRole("button", { name: "Rechazar cookies", exact: true }).click();
  await page.waitForLoadState("networkidle");
  expect(mock.events.length).toBe(stopped);
  expect(mock.scripts).toHaveLength(2);
  expect(mock.unexpected).toEqual([]);
});

test("analytics: expired permission is not reused", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.addInitScript((key) => localStorage.setItem(key, JSON.stringify({ version: 1, analytics: true, updatedAt: "2020-01-01T00:00:00Z" })), consentKey);
  await page.goto(origin);
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(mock.scripts).toEqual([]);
  expect(mock.events).toEqual([]);
});

test("analytics: permission expiring in an already open page also stops SDKs", async ({ context, page }) => {
  const mock = await mockAnalytics(context);
  await page.clock.install();
  await page.addInitScript(({ key, updatedAt }) => localStorage.setItem(key, JSON.stringify({ version: 1, analytics: true, updatedAt })), {
    key: consentKey, updatedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
  });
  await page.goto(origin);
  await expect.poll(() => new Set(mock.events).size).toBe(2);
  const reload = page.waitForEvent("domcontentloaded");
  await page.clock.fastForward(61000);
  await reload;
  await expect(page.getByRole("dialog", { name: "Cookies y privacidad" })).toBeVisible();
  const stopped = mock.events.length;
  await page.clock.fastForward(10000);
  expect(mock.events.length).toBe(stopped);
  expect(mock.scripts).toHaveLength(2);
  expect(mock.unexpected).toEqual([]);
});
