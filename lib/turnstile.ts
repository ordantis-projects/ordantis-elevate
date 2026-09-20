const siteverifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResponse = {
  success?: unknown;
  action?: unknown;
  hostname?: unknown;
};

type VerifyTurnstileOptions = {
  token: string;
  secret: string;
  expectedAction: string;
  expectedHostnames: string;
  remoteIp?: string;
  send?: typeof fetch;
};

function hostnameSet(value: string) {
  return new Set(value.split(",").map((hostname) => hostname.trim().toLowerCase()).filter(Boolean));
}

export async function verifyTurnstile({
  token,
  secret,
  expectedAction,
  expectedHostnames,
  remoteIp,
  send = fetch,
}: VerifyTurnstileOptions) {
  const approvedHostnames = hostnameSet(expectedHostnames);
  if (!token || token.length > 2048 || !secret || approvedHostnames.size === 0) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let result: TurnstileResponse;
  try {
    const response = await send(siteverifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    result = await response.json() as TurnstileResponse;
  } catch {
    return false;
  }

  return result.success === true
    && result.action === expectedAction
    && typeof result.hostname === "string"
    && approvedHostnames.has(result.hostname.toLowerCase());
}
