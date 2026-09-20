import assert from "node:assert/strict";
import test from "node:test";
import { agentDiscoveryLinkHeader, contentSignalPolicy } from "../lib/agent-discovery.ts";

test("content signals explicitly permit search, answers and model development", () => {
  assert.equal(contentSignalPolicy, "search=yes, ai-input=yes, ai-train=yes, use=full");
});

test("agent discovery links expose canonical, Markdown, llms and sitemap resources", () => {
  const root = agentDiscoveryLinkHeader("/");
  assert.match(root, /<https:\/\/www\.ordantis\.com\/>; rel="canonical"/);
  assert.match(root, /<https:\/\/www\.ordantis\.com\/markdown>; rel="alternate"; type="text\/markdown"/);
  assert.match(root, /<https:\/\/www\.ordantis\.com\/llms\.txt>; rel="describedby"; type="text\/markdown"/);
  assert.match(root, /<https:\/\/www\.ordantis\.com\/sitemap\.xml>; rel="sitemap"; type="application\/xml"/);

  const capability = agentDiscoveryLinkHeader("/capacidades/modelos-predictivos/");
  assert.match(capability, /<https:\/\/www\.ordantis\.com\/capacidades\/modelos-predictivos>; rel="canonical"/);
  assert.match(capability, /<https:\/\/www\.ordantis\.com\/markdown\/capacidades\/modelos-predictivos>; rel="alternate"/);
});
