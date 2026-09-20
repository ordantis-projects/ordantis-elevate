import assert from "node:assert/strict";
import test from "node:test";
import { classifySourceResponse, collectSourceLinks } from "../lib/source-links.ts";

test("reference inventory de-duplicates fragments and retains every referring page", () => {
  const result = collectSourceLinks([
    { path: "/a", markdown: "[A](https://www.nist.gov/ai#method) [B](https://www.nist.gov/ai#results) [local](https://ordantis.com/b)" },
    { path: "/b", markdown: "[A](https://www.nist.gov/ai) [local](https://www.ordantis.com/a) [mail](mailto:contacto@ordantis.com)" },
  ], "https://www.ordantis.com");
  assert.deepEqual(result, [{ url: "https://www.nist.gov/ai", pages: ["/a", "/b"] }]);
});

test("a similarly named external host is not mistaken for the canonical site", () => {
  const result = collectSourceLinks([{ path: "/", markdown: "[external](https://ordantis.com.example.org/)" }], "https://www.ordantis.com");
  assert.equal(result.length, 1);
});

test("access blocks and transient failures are not reported as broken sources", () => {
  assert.equal(classifySourceResponse(200), "reachable");
  for (const status of [404, 410]) assert.equal(classifySourceResponse(status), "not-found");
  for (const status of [null, 301, 401, 403, 429, 500, 503]) assert.equal(classifySourceResponse(status), "inconclusive");
});
