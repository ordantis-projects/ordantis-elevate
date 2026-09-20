export type RagBenchmarkDocument = {
  id: string;
  title: string;
  path: string;
  text: string;
};

export type RagBenchmarkQuestion = {
  id: string;
  question: string;
  expectedDocumentId: string | null;
  expectation: string;
};

const spanishStopwords = new Set([
  "como", "con", "cuando", "del", "desde", "donde", "el", "ella", "en", "entre", "es", "esta", "este",
  "hay", "la", "las", "los", "para", "por", "que", "se", "sin", "sobre", "su", "sus", "una", "uno", "unos", "y",
]);

export function tokenizeForRetrieval(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9áéíóúüñ]+/gi, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 2 && !spanishStopwords.has(token));
}

function counts(tokens: readonly string[]) {
  const result = new Map<string, number>();
  for (const token of tokens) result.set(token, (result.get(token) ?? 0) + 1);
  return result;
}

function round(value: number) {
  return Math.round(value * 10_000) / 10_000;
}

export function rankRagDocuments(documents: readonly RagBenchmarkDocument[], question: string) {
  if (!documents.length) return [];
  const documentTokens = documents.map((document) => tokenizeForRetrieval(`${document.title} ${document.text}`));
  const frequencies = documentTokens.map(counts);
  const documentFrequency = new Map<string, number>();
  for (const tokens of documentTokens) {
    for (const token of new Set(tokens)) documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
  }
  const queryFrequency = counts(tokenizeForRetrieval(question));
  const idf = (token: string) => Math.log((documents.length + 1) / ((documentFrequency.get(token) ?? 0) + 1)) + 1;
  const queryNorm = Math.sqrt([...queryFrequency].reduce((sum, [token, frequency]) => {
    if (!documentFrequency.has(token)) return sum;
    return sum + (frequency * idf(token)) ** 2;
  }, 0));

  return documents.map((document, index) => {
    const frequency = frequencies[index];
    const documentNorm = Math.sqrt([...frequency].reduce((sum, [token, amount]) => sum + (amount * idf(token)) ** 2, 0));
    const dot = [...queryFrequency].reduce((sum, [token, amount]) => {
      const documentAmount = frequency.get(token) ?? 0;
      return sum + amount * documentAmount * idf(token) ** 2;
    }, 0);
    return { document, score: round(queryNorm && documentNorm ? dot / (queryNorm * documentNorm) : 0) };
  }).sort((left, right) => right.score - left.score || left.document.id.localeCompare(right.document.id));
}

export function evaluateRagBenchmark({
  documents,
  questions,
  threshold,
  minimumMargin,
}: {
  documents: readonly RagBenchmarkDocument[];
  questions: readonly RagBenchmarkQuestion[];
  threshold: number;
  minimumMargin: number;
}) {
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1
    || !Number.isFinite(minimumMargin) || minimumMargin < 0 || minimumMargin > 1) {
    throw new Error("Los umbrales deben ser números entre 0 y 1.");
  }

  const outcomes = questions.map((question) => {
    const ranking = rankRagDocuments(documents, question.question);
    const top = ranking[0] ?? null;
    const runnerUp = ranking[1] ?? null;
    const margin = round((top?.score ?? 0) - (runnerUp?.score ?? 0));
    const predictedDocumentId = top && top.score >= threshold && margin >= minimumMargin ? top.document.id : null;
    const correct = predictedDocumentId === question.expectedDocumentId;
    return { question, ranking, top, margin, predictedDocumentId, correct };
  });
  const answerable = outcomes.filter((outcome) => outcome.question.expectedDocumentId !== null);
  const unanswerable = outcomes.filter((outcome) => outcome.question.expectedDocumentId === null);
  const recovered = answerable.filter((outcome) => outcome.correct).length;
  const abstained = unanswerable.filter((outcome) => outcome.correct).length;
  const falseAnswers = unanswerable.filter((outcome) => outcome.predictedDocumentId !== null).length;

  return {
    methodologyVersion: "1.0.0",
    corpusKind: "controlled-ordantis-content" as const,
    threshold,
    minimumMargin,
    documentCount: documents.length,
    questionCount: questions.length,
    answerableCount: answerable.length,
    recovered,
    unanswerableCount: unanswerable.length,
    abstained,
    falseAnswers,
    overallCorrect: outcomes.filter((outcome) => outcome.correct).length,
    outcomes,
  };
}
