import { expect, test } from "@playwright/test";

test("Lab recalculates without mutating the observations", async ({ page }) => {
  await page.goto("/labs/calidad-datos");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.getByRole("status")).toContainText("7 de 8 filas con incidencias");
  await expect(page.getByRole("status")).toContainText("8 incidencias");
  await page.getByLabel("Antigüedad máxima (horas)").fill("200");
  await expect(page.getByRole("status")).toContainText("6 de 8 filas con incidencias");
  await expect(page.getByRole("cell", { name: "2026-08-20T10:00:00Z", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Restablecer ejemplo" }).click();
  await expect(page.getByRole("status")).toContainText("7 de 8 filas con incidencias");
  await page.getByLabel("Escenario sintético").selectOption("sin-incidencias");
  await expect(page.getByRole("status")).toContainText("0 de 3 filas con incidencias");
  await expect(page.getByRole("status")).toContainText("No demuestra que las lecturas sean verdaderas");
  await page.getByLabel("Lectura máxima (L/s)").fill("10");
  await expect(page.getByRole("status")).toContainText("3 de 3 filas con incidencias");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("Lab handles invalid inputs and downloads the evaluated contract", async ({ page }) => {
  await page.goto("/labs/calidad-datos");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await page.getByLabel("Lectura máxima (L/s)").fill("");
  await expect(page.getByLabel("Lectura máxima (L/s)")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("button", { name: "Descargar evaluación JSON" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Introduce un máximo");
  await page.getByLabel("Lectura máxima (L/s)").fill("30");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar evaluación JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("ordantis-data-quality-incidencias.json");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  expect(JSON.parse(Buffer.concat(chunks).toString("utf8"))).toMatchObject({
    dataKind: "synthetic", totalRows: 8, affectedRows: 7,
    methodologyVersion: "1.0.0", contract: { maxValue: 30, maxAgeHours: 24 },
  });
});

test("RAG benchmark exposes recovery, abstention and the cost of a stricter threshold", async ({ page }) => {
  await page.goto("/labs/rag-evaluacion");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.getByRole("status")).toContainText("9 de 9 decisiones correctas");
  await expect(page.getByRole("status")).toContainText("6/6 fuentes respondibles recuperadas");
  await expect(page.getByRole("status")).toContainText("3/3 abstenciones correctas");
  await expect(page.getByRole("status")).toContainText("0 respuestas falsas");
  await page.getByLabel("Puntuación mínima").fill("1");
  await expect(page.getByRole("status")).toContainText("3 de 9 decisiones correctas");
  await page.getByRole("button", { name: "Restablecer parámetros" }).click();
  await expect(page.getByRole("status")).toContainText("9 de 9 decisiones correctas");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("RAG benchmark downloads a scoped and reproducible report", async ({ page }) => {
  await page.goto("/labs/rag-evaluacion");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar evaluación JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("ordantis-rag-benchmark-1.0.0.json");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  expect(JSON.parse(Buffer.concat(chunks).toString("utf8"))).toMatchObject({
    methodologyVersion: "1.0.0",
    corpusKind: "controlled-ordantis-content",
    parameters: { threshold: 0.08, minimumMargin: 0.01 },
    metrics: { documentCount: 6, questionCount: 9, recovered: 6, abstained: 3, falseAnswers: 0, overallCorrect: 9 },
  });
});

test("Agent Evaluation Lab exposes the effect of removing policy controls", async ({ page }) => {
  await page.goto("/labs/evaluacion-agentes");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.getByRole("status")).toContainText("10 de 10 decisiones coinciden");
  await expect(page.getByRole("status")).toContainText("0 ejecuciones inseguras");
  for (const label of [
    "Aplicar alcance por herramienta",
    "Bloquear instrucciones de contenido",
    "Bloquear datos sensibles hacia fuera",
    "Bloquear acciones destructivas",
    "Exigir aprobación para efectos",
  ]) await page.getByLabel(label).uncheck();
  await expect(page.getByRole("status")).toContainText("2 de 10 decisiones coinciden");
  await expect(page.getByRole("status")).toContainText("8 ejecuciones inseguras");
  await expect(page.getByRole("status")).toContainText("3 aprobaciones omitidas");
  await page.getByRole("button", { name: "Restablecer política" }).click();
  await expect(page.getByRole("status")).toContainText("10 de 10 decisiones coinciden");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("Agent Evaluation Lab downloads the selected policy and every outcome", async ({ page }) => {
  await page.goto("/labs/evaluacion-agentes");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await page.getByLabel("Bloquear instrucciones de contenido").uncheck();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar evaluación JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("ordantis-agent-evaluation-1.0.0.json");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const report = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  expect(report).toMatchObject({
    methodologyVersion: "1.0.0",
    dataKind: "synthetic-agent-scenarios",
    policy: { blockUntrustedInstructions: false },
    metrics: { scenarioCount: 10, correctCount: 9, unsafeAllows: 0 },
  });
  expect(report.outcomes).toHaveLength(10);
  expect(report.outcomes.find((outcome: { scenarioId: string }) => outcome.scenarioId === "a05")).toMatchObject({
    expectedDecision: "deny",
    policyDecision: "require_approval",
    correct: false,
  });
});

test("Document Intelligence Lab exposes evidence, risk and unsafe acceptance", async ({ page }) => {
  await page.goto("/labs/inteligencia-documental");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await expect(page.getByRole("status")).toContainText("10 de 10 decisiones coinciden");
  await expect(page.getByRole("status")).toContainText("3 aceptadas");
  await expect(page.getByRole("status")).toContainText("6 a revisión");
  await expect(page.getByRole("status")).toContainText("0 aceptaciones inseguras");
  await page.getByLabel("Confianza mínima").fill("0");
  await page.getByLabel("Exigir página y fragmento válidos").uncheck();
  await page.getByLabel("Revisar contradicciones").uncheck();
  await page.getByLabel("Revisar campos de alto riesgo").uncheck();
  await expect(page.getByRole("status")).toContainText("3 de 10 decisiones coinciden");
  await expect(page.getByRole("status")).toContainText("7 aceptaciones inseguras");
  await expect(page.getByRole("status")).toContainText("3 aceptadas sin respaldo");
  await page.getByRole("button", { name: "Restablecer política" }).click();
  await expect(page.getByRole("status")).toContainText("10 de 10 decisiones coinciden");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
});

test("Document Intelligence Lab downloads the selected policy and evidence outcomes", async ({ page }) => {
  await page.goto("/labs/inteligencia-documental");
  await page.getByRole("button", { name: "Rechazar cookies" }).click();
  await page.getByLabel("Confianza mínima").fill("0");
  await page.getByLabel("Exigir página y fragmento válidos").uncheck();
  await page.getByLabel("Revisar contradicciones").uncheck();
  await page.getByLabel("Revisar campos de alto riesgo").uncheck();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar evaluación JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("ordantis-document-intelligence-1.0.0.json");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const report = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  expect(report).toMatchObject({
    methodologyVersion: "1.0.0",
    dataKind: "synthetic-contract-extraction",
    policy: { minimumConfidence: 0, requireEvidence: false, reviewContradictions: false, reviewHighRisk: false },
    metrics: { candidateCount: 10, correctCount: 3, autoAccepted: 10, unsafeAccepts: 7, acceptedWithoutSupport: 3 },
  });
  expect(report.outcomes).toHaveLength(10);
  expect(report.outcomes.find((outcome: { candidateId: string }) => outcome.candidateId === "d05")).toMatchObject({
    evidenceState: "contradicted",
    expectedDecision: "review",
    policyDecision: "accept",
    correct: false,
  });
});

test("local previews never load production analytics even after accepting", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (/googletagmanager\.com|google-analytics\.com|clarity\.ms/.test(request.url())) externalRequests.push(request.url());
  });
  await page.goto("/labs/calidad-datos");
  await page.getByRole("button", { name: "Aceptar cookies" }).click();
  await page.getByRole("link", { name: "Ingeniería de datos: alcance y entregables" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ciencia e ingeniería de datos");
  await expect(page.locator('script[src*="googletagmanager"], script[src*="clarity.ms"]')).toHaveCount(0);
  expect(externalRequests).toEqual([]);
});
