export type PlannerSeedCluster = {
  id: string;
  targetPath: string;
  intentHypothesis: string;
  keywords: string[];
};

export type PlannerScope = {
  country: string;
  language: string;
  network: string;
  startDate: string;
  endDate: string;
  currency: string;
};

export type PlannerSeedPlan = {
  requestedContext: PlannerScope;
  clusters: PlannerSeedCluster[];
};

type ExportRow = Record<string, string>;

function cleanCell(value: string | undefined) {
  if (!value) return "";
  const trimmed = value.trim();
  return trimmed.startsWith('"') && trimmed.endsWith('"')
    ? trimmed.slice(1, -1).replaceAll('""', '"')
    : trimmed;
}

function parseNullableNumber(value: string | undefined) {
  const cleaned = cleanCell(value).replaceAll("\u00a0", "").replaceAll(" ", "").replace(",", ".");
  if (!cleaned) return null;
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function parseChange(value: string | undefined) {
  const raw = cleanCell(value);
  if (!raw) return { raw: null, percent: null, fromZero: false };
  if (raw.includes("∞")) return { raw, percent: null, fromZero: true };
  return { raw, percent: parseNullableNumber(raw.replace("%", "")), fromZero: false };
}

export function normalizePlannerKeyword(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function parseKeywordPlannerExport(raw: string) {
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.startsWith("Keyword\t"));
  if (headerIndex < 0) throw new Error("Keyword Planner header not found");
  const headers = lines[headerIndex].split("\t").map(cleanCell);
  const rows: ExportRow[] = [];
  for (const line of lines.slice(headerIndex + 1)) {
    if (!line.trim()) continue;
    const values = line.split("\t").map(cleanCell);
    rows.push(Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
  }
  const aggregates = rows.filter((row) => !row.Keyword && row.Segmentation);
  const keywords = rows.filter((row) => row.Keyword);
  return {
    exportTitle: lines[0]?.trim() ?? "",
    exportPeriod: lines[1]?.trim() ?? "",
    headers,
    aggregates,
    keywords,
  };
}

export function buildKeywordPlannerResult(options: {
  raw: string;
  seeds: PlannerSeedPlan;
  capturedAt: string;
  sourceFile: string;
  sourceSha256: string;
  actualScope: PlannerScope & { queryLanguage: string };
}) {
  const parsed = parseKeywordPlannerExport(options.raw);
  const seedRows = options.seeds.clusters.flatMap((cluster) => cluster.keywords.map((keyword) => ({
    keyword,
    clusterId: cluster.id,
    targetPath: cluster.targetPath,
    intentHypothesis: cluster.intentHypothesis,
  })));
  const seedsByKey = new Map(seedRows.map((row) => [normalizePlannerKeyword(row.keyword), row]));
  if (seedsByKey.size !== seedRows.length) throw new Error("Seed keywords are not unique after normalization");

  const exportedByKey = new Map<string, ExportRow>();
  for (const row of parsed.keywords) {
    const key = normalizePlannerKeyword(row.Keyword);
    if (exportedByKey.has(key)) throw new Error(`Duplicate exported keyword: ${row.Keyword}`);
    exportedByKey.set(key, row);
  }

  const unmatchedSeeds = seedRows.filter((row) => !exportedByKey.has(normalizePlannerKeyword(row.keyword)));
  const unmatchedExports = parsed.keywords.filter((row) => !seedsByKey.has(normalizePlannerKeyword(row.Keyword)));
  if (unmatchedSeeds.length || unmatchedExports.length) {
    throw new Error(`Unmatched keywords: ${unmatchedSeeds.length} seeds, ${unmatchedExports.length} exports`);
  }

  const monthHeaders = parsed.headers.filter((header) => header.startsWith("Searches: "));
  const rows = seedRows.map((seed) => {
    const exported = exportedByKey.get(normalizePlannerKeyword(seed.keyword))!;
    const averageMonthlySearches = parseNullableNumber(exported["Avg. monthly searches"]);
    const threeMonth = parseChange(exported["Three month change"]);
    const yearOverYear = parseChange(exported["YoY change"]);
    const monthlySearches = Object.fromEntries(monthHeaders.map((header) => [
      header.replace("Searches: ", ""),
      parseNullableNumber(exported[header]),
    ]));
    return {
      keyword: seed.keyword,
      exportedKeyword: exported.Keyword,
      clusterId: seed.clusterId,
      targetPath: seed.targetPath,
      intentHypothesis: seed.intentHypothesis,
      averageMonthlySearches,
      threeMonthChangeRaw: threeMonth.raw,
      threeMonthChangePercent: threeMonth.percent,
      threeMonthChangeFromZero: threeMonth.fromZero,
      yearOverYearChangeRaw: yearOverYear.raw,
      yearOverYearChangePercent: yearOverYear.percent,
      yearOverYearChangeFromZero: yearOverYear.fromZero,
      advertisingCompetition: cleanCell(exported.Competition) || null,
      advertisingCompetitionIndex: parseNullableNumber(exported["Competition (indexed value)"]),
      topOfPageBidLowEur: parseNullableNumber(exported["Top of page bid (low range)"]),
      topOfPageBidHighEur: parseNullableNumber(exported["Top of page bid (high range)"]),
      adImpressionShare: cleanCell(exported["Ad impression share"]) || null,
      organicAveragePosition: parseNullableNumber(exported["Organic average position"]),
      organicImpressionShare: cleanCell(exported["Organic impression share"]) || null,
      monthlySearches,
    };
  });

  const withAverage = rows.filter((row) => row.averageMonthlySearches !== null);
  const withMonthlySeries = rows.filter((row) => Object.values(row.monthlySearches).some((value) => value !== null));
  const sourceAggregate = parsed.aggregates.find((row) => row.Segmentation === options.actualScope.country);
  const clusters = options.seeds.clusters.map((cluster) => {
    const clusterRows = rows.filter((row) => row.clusterId === cluster.id);
    return {
      id: cluster.id,
      targetPath: cluster.targetPath,
      keywordsRequested: clusterRows.length,
      keywordsWithAverage: clusterRows.filter((row) => row.averageMonthlySearches !== null).length,
      keywordsWithoutAverage: clusterRows.filter((row) => row.averageMonthlySearches === null).length,
      strongestObservedKeywords: clusterRows
        .filter((row) => row.averageMonthlySearches !== null)
        .sort((a, b) => b.averageMonthlySearches! - a.averageMonthlySearches!)
        .slice(0, 3)
        .map((row) => ({ keyword: row.keyword, averageMonthlySearches: row.averageMonthlySearches })),
    };
  });

  return {
    version: 2,
    capturedAt: options.capturedAt,
    status: "measured_with_limitations",
    source: {
      platform: "Google Ads Keyword Planner",
      file: options.sourceFile,
      sha256: options.sourceSha256,
      exportTitle: parsed.exportTitle,
      exportPeriod: parsed.exportPeriod,
    },
    requestedScope: options.seeds.requestedContext,
    actualScope: options.actualScope,
    summary: {
      keywordsRequested: seedRows.length,
      keywordsReturned: rows.length,
      keywordsWithAverage: withAverage.length,
      keywordsWithoutAverage: rows.length - withAverage.length,
      averageCoverageRate: withAverage.length / rows.length,
      keywordsWithMonthlySeries: withMonthlySeries.length,
      duplicateKeywords: 0,
      unmatchedSeeds: 0,
      unmatchedExports: 0,
      sourceAggregateAverageMonthlySearches: parseNullableNumber(sourceAggregate?.["Avg. monthly searches"]),
    },
    interpretationRules: [
      "El promedio exportado está redondeado por Google y no es un conteo exacto de búsquedas futuras.",
      "Una celda vacía no se convierte en cero: significa que el Planner no devolvió una estimación para esa consulta.",
      "No se suman variantes para estimar mercado porque pueden solaparse o compartir intención.",
      "Competencia e intervalos de puja son métricas publicitarias; no equivalen a dificultad SEO.",
      "La exportación no incluye el desglose mensual de las 50 consultas, por lo que no permite validar estacionalidad.",
      "Los cambios porcentuales extremos sobre volúmenes pequeños requieren cautela; infinito indica crecimiento desde una base cero.",
      "El plan se ejecutó con el filtro Todos los idiomas; las consultas introducidas están redactadas en español, pero no se presenta la muestra como filtrada por idioma."
    ],
    clusters,
    rows,
  };
}
