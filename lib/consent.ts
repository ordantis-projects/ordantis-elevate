export const CONSENT_STORAGE_KEY = "ordantis-cookie-consent";
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

// Hides the server-rendered first layer before paint only when a current,
// structurally valid decision already exists. The client parser remains the
// authority and repeats the same validation after hydration.
export const consentFirstPaintBootstrap = `(() => {
  try {
    const value = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
    const updatedAt = value && typeof value.updatedAt === 'string' ? Date.parse(value.updatedAt) : NaN;
    const valid = value && value.version === 1 && typeof value.analytics === 'boolean' &&
      Number.isFinite(updatedAt) && updatedAt <= Date.now() && Date.now() - updatedAt <= ${CONSENT_MAX_AGE_MS};
    if (valid) document.documentElement.setAttribute('data-cookie-consent-decided', '');
  } catch {}
})();`;

type StoredConsent = {
  version: 1;
  analytics: boolean;
  updatedAt: string;
};

let inMemoryConsent: StoredConsent | undefined;

export function forgetInMemoryConsent() {
  inMemoryConsent = undefined;
}

export function parseAnalyticsConsent(value: unknown, now = Date.now()) {
  if (!value || typeof value !== "object") return null;
  const parsed = value as Partial<StoredConsent>;
  const date = typeof parsed.updatedAt === "string" ? Date.parse(parsed.updatedAt) : NaN;
  if (parsed.version !== 1 || typeof parsed.analytics !== "boolean" || !Number.isFinite(date)) return null;
  if (date > now || now - date > CONSENT_MAX_AGE_MS) return null;
  return parsed.analytics;
}

function readStoredConsent(): unknown {
  if (inMemoryConsent) return inMemoryConsent;
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function readAnalyticsConsent() {
  return parseAnalyticsConsent(readStoredConsent());
}

export function consentRemainingMs(value: unknown, now = Date.now()) {
  if (parseAnalyticsConsent(value, now) !== true) return 0;
  return Math.max(0, Date.parse((value as StoredConsent).updatedAt) + CONSENT_MAX_AGE_MS - now);
}

export function analyticsConsentRemainingMs() {
  return consentRemainingMs(readStoredConsent());
}

export function writeAnalyticsConsent(analytics: boolean) {
  const value: StoredConsent = { version: 1, analytics, updatedAt: new Date().toISOString() };
  inMemoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch {
    // A blocked or full storage must not prevent rejection or withdrawal.
    return false;
  }
}
