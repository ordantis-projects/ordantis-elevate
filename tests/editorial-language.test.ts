import assert from "node:assert/strict";
import test from "node:test";
import { editorialProse, languageChunks } from "../lib/editorial-language.ts";

test("la revisión lingüística conserva la prosa y excluye metadatos y código", () => {
  const text = editorialProse("# Pregunta real\n\nCanonical: https://example.com\nUpdated: 2026-08-28\n\nUn [dato fiable](https://example.com/data) y **su evidencia**.\n\n```json\n{\"badWord\": 2}\n```\n");
  assert.match(text, /Pregunta real/);
  assert.match(text, /Un dato fiable y su evidencia\./);
  assert.doesNotMatch(text, /https|Canonical|Updated|badWord/);
});

test("LanguageTool no recibe palabras partidas ni bloques excesivos", () => {
  const text = "Sensores defectuosos y confianza del dato.\n\n".repeat(100);
  const chunks = languageChunks(text, 100);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.length <= 100));
  assert.equal(chunks.join(" ").split(/\s+/).filter(Boolean).join(" "), text.trim().split(/\s+/).join(" "));
});

test("los bloques largos se parten por palabras sin perder texto", () => {
  const text = "Palabra larga repetida ".repeat(40).trim();
  const chunks = languageChunks(text, 90);
  assert.ok(chunks.every((chunk) => chunk.length <= 90));
  assert.equal(chunks.join(" "), text);
});
