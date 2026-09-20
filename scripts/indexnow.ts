import { allIndexableRoutes } from "../content/pages.ts";

const key = process.env.INDEXNOW_KEY?.trim();
const host = (process.env.INDEXNOW_HOST?.trim() || "www.ordantis.com")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

if (!key) {
  throw new Error("Falta INDEXNOW_KEY. No se ha enviado ninguna URL.");
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error("INDEXNOW_KEY no tiene un formato válido.");
}

const urlList = allIndexableRoutes.map((route) => `https://${host}${route}`);
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/indexnow-key.txt`,
    urlList,
  }),
});

if (!response.ok) {
  const detail = await response.text();
  throw new Error(`IndexNow respondió ${response.status}: ${detail || response.statusText}`);
}

console.log(`IndexNow aceptó ${urlList.length} URLs para ${host}.`);
