const sources = [
  { name: "ChatGPT", domains: ["chatgpt.com", "chat.openai.com"], tags: ["chatgpt", "chatgpt.com"] },
  { name: "Perplexity", domains: ["perplexity.ai"], tags: ["perplexity", "perplexity.ai"] },
  { name: "Gemini", domains: ["gemini.google.com"], tags: ["gemini", "gemini.google.com"] },
  { name: "Microsoft Copilot", domains: ["copilot.microsoft.com"], tags: ["copilot", "copilot.microsoft.com"] },
  { name: "Claude", domains: ["claude.ai"], tags: ["claude", "claude.ai"] },
  { name: "Poe", domains: ["poe.com"], tags: ["poe", "poe.com"] },
  { name: "Phind", domains: ["phind.com"], tags: ["phind", "phind.com"] },
  { name: "You.com", domains: ["you.com"], tags: ["you.com"] },
  { name: "Meta AI", domains: ["meta.ai"], tags: ["meta.ai"] },
] as const;

export function aiReferralSource(referrer: string, utmSource: string | null) {
  const tag = utmSource?.trim().toLowerCase();
  const tagged = sources.find((source) => source.tags.some((candidate) => candidate === tag));
  if (tagged) return tagged.name;
  let host;
  try { host = new URL(referrer).hostname.toLowerCase(); } catch { return undefined; }
  return sources.find((source) => source.domains.some((domain) => host === domain || host.endsWith(`.${domain}`)))?.name;
}

export function contactIntent(href: string, method: string | null) {
  if (method === "email_draft") return "email_draft";
  if (href.startsWith("mailto:")) return "email";
  if (href === "/contacto" || href.startsWith("/contacto?")) return "contact_page";
  return undefined;
}
