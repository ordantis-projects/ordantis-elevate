import { readAnalyticsConsent } from "./consent.ts";

type Gtag = (...args: unknown[]) => void;
type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    clarity?: Clarity;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function isProductionAnalyticsHost(host: string) {
  return host === "ordantis.com" || host === "www.ordantis.com";
}

export function mayTrackAnalytics() {
  return isProductionAnalyticsHost(window.location.hostname) && readAnalyticsConsent() === true;
}

export function analyticsCookieNames(cookieHeader: string) {
  return cookieHeader.split(";").map((cookie) => cookie.trim().split("=")[0]).filter((name) =>
    /^(?:_ga(?:_[A-Z0-9]+)?|_gid|_gat(?:_[A-Za-z0-9_-]+)?|_clck|_clsk)$/.test(name),
  );
}

export function prepareAnalytics(gaId: string | undefined, clarityId: string | undefined) {
  if (!mayTrackAnalytics()) return;
  if (gaId) {
    window[`ga-disable-${gaId}`] = false;
    window.dataLayer ??= [];
    // Preserve Google's documented command queue format (IArguments).
    // eslint-disable-next-line prefer-rest-params
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 30 * 24 * 60 * 60,
      cookie_update: false,
      page_location: `${window.location.origin}${window.location.pathname}`,
      page_referrer: safeReferrerOrigin(document.referrer),
    });
  }
  if (clarityId) {
    if (!window.clarity) {
      const queue: Clarity = (...args) => { queue.q!.push(args); };
      queue.q = [];
      window.clarity = queue;
    }
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  }
}

export function stopAnalytics(gaId: string | undefined) {
  // Disable GA before any consent command: denied storage alone can still ping.
  if (gaId) window[`ga-disable-${gaId}`] = true;
  try {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
  } catch { /* Withdrawal must continue even if a vendor API fails. */ }
  try {
    window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
  } catch { /* Stop the SDK independently of its consent API. */ }
  try { window.clarity?.("stop"); } catch { /* The caller also unloads the document. */ }

  for (const name of analyticsCookieNames(document.cookie)) {
    for (const domain of new Set(["", window.location.hostname, "ordantis.com"])) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
  try { window.sessionStorage.removeItem("ordantis-ai-organic-recorded"); } catch { /* Storage can be blocked. */ }
}

export function safeReferrerOrigin(referrer: string) {
  try { return new URL(referrer).origin; } catch { return ""; }
}
