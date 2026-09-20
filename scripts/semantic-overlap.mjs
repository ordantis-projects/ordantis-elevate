import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { insights } from "../content/site.ts";

// Tool-only dependency; never part of the website's bundle. See the audit guide
// for installation. Model inference is local; no editorial text is uploaded.
const { pipeline, env } = await import(pathToFileURL(resolve(".quality/semantic/node_modules/@huggingface/transformers/src/transformers.js")).href);
const model = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
const revision = "2c4055b12046f11709e9df2c122e59ffbdc2f900";
env.cacheDir = resolve(".quality/semantic/models");
env.backends.onnx.wasm.numThreads = 2;
const extractor = await pipeline("feature-extraction", model, { revision, dtype: "q8", device: "cpu", session_options: { intraOpNumThreads: 2, interOpNumThreads: 1 } });

async function chunksFor(text) {
  const encoded = await extractor.tokenizer(text, { truncation: false });
  if (encoded.input_ids.dims.at(-1) <= 128) return [text];
  const words = text.split(/\s+/);
  if (words.length < 2) throw new Error("Un fragmento no cabe en el modelo sin truncarlo.");
  const middle = Math.ceil(words.length / 2);
  return [...await chunksFor(words.slice(0, middle).join(" ")), ...await chunksFor(words.slice(middle).join(" "))];
}
function normalize(vector) {
  const norm = Math.hypot(...vector);
  return vector.map((value) => value / norm);
}
const vectors = [];
for (const insight of insights) {
  const prose = [insight.title, insight.description, insight.answer, ...insight.context, insight.example.situation, insight.example.decision, ...insight.checks, ...insight.method.map((item) => item.text), ...insight.stopSignals];
  const chunks = [];
  for (const paragraph of prose) chunks.push(...await chunksFor(paragraph));
  let sum;
  for (let start = 0; start < chunks.length; start += 4) {
    const batch = chunks.slice(start, start + 4);
    const output = await extractor(batch, { pooling: "mean", normalize: true });
    for (const [index, vector] of output.tolist().entries()) {
      sum ??= Array(vector.length).fill(0);
      const weight = batch[index].split(/\s+/).length;
      vector.forEach((value, dimension) => { sum[dimension] += value * weight; });
    }
  }
  vectors.push({ slug: insight.slug, chunks: chunks.length, vector: normalize(sum) });
  console.log(`Similitud semántica: ${vectors.length}/${insights.length} — ${insight.slug}`);
}
const pairs = [];
for (let first = 0; first < vectors.length; first++) {
  for (let second = first + 1; second < vectors.length; second++) {
    const a = vectors[first];
    const b = vectors[second];
    pairs.push({ first: a.slug, second: b.slug, cosine: a.vector.reduce((sum, value, index) => sum + value * b.vector[index], 0) });
  }
}
pairs.sort((a, b) => b.cosine - a.cosine);
await mkdir(".quality", { recursive: true });
await writeFile(".quality/semantic-overlap.json", JSON.stringify({ model, revision, runtime: "@huggingface/transformers@3.8.1", dtype: "q8", pooling: "mean per chunk; word-weighted mean per article; L2 normalization", maxTokens: 128, truncation: false, scope: "Full original article prose; excludes repeated template headings, citations and evidence notes", limitations: "Cosine similarity is a review queue, not a calibrated duplicate threshold or evidence of search cannibalization.", articles: vectors.map(({ slug, chunks }) => ({ slug, chunks })), pairs }, null, 2));
console.table(pairs.slice(0, 12));
await extractor.dispose();
