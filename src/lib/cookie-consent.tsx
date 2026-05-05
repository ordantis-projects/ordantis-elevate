import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "ordantis-cookie-consent";
const VERSION = 1;

export type CookieCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  version: number;
  decidedAt: string;
  categories: CookieCategories;
};

type CookieConsentValue = {
  decided: boolean;
  categories: CookieCategories;
  isSettingsOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (prefs: { analytics: boolean; marketing: boolean }) => void;
  openSettings: () => void;
  closeSettings: () => void;
  reset: () => void;
};

const defaultCategories: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

const readStored = (): StoredConsent | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeStored = (categories: CookieCategories) => {
  if (typeof window === "undefined") return;
  const payload: StoredConsent = {
    version: VERSION,
    decidedAt: new Date().toISOString(),
    categories,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [decided, setDecided] = useState(false);
  const [categories, setCategories] = useState<CookieCategories>(defaultCategories);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setCategories({ ...stored.categories, necessary: true });
      setDecided(true);
    }
  }, []);

  const persist = useCallback((next: CookieCategories) => {
    setCategories(next);
    setDecided(true);
    writeStored(next);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
  }, [persist]);

  const save = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      persist({ necessary: true, analytics: prefs.analytics, marketing: prefs.marketing });
    },
    [persist],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    setCategories(defaultCategories);
    setDecided(false);
  }, []);

  const value = useMemo<CookieConsentValue>(
    () => ({
      decided,
      categories,
      isSettingsOpen,
      acceptAll,
      rejectAll,
      save,
      openSettings,
      closeSettings,
      reset,
    }),
    [decided, categories, isSettingsOpen, acceptAll, rejectAll, save, openSettings, closeSettings, reset],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = (): CookieConsentValue => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used inside <CookieConsentProvider>");
  return ctx;
};
