const stopWords = new Set("a al algo ante antes asi cada como con contra cual cuando de del desde despues donde dos el ella en entre era es esa ese eso esta este esto hay la las lo los mas muy no o para pero por porque que se si sin sobre solo son su sus te tiene un una uno unos unas y ya".split(" "));

export function editorialTokens(text: string) {
  return (text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

export function findEditorialOverlap(documents: { slug: string; text: string }[]) {
  const tokenLists = documents.map((document) => editorialTokens(document.text));
  const documentFrequency = new Map<string, number>();
  for (const tokens of tokenLists) {
    for (const token of new Set(tokens)) documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
  }
  const vectors = tokenLists.map((tokens) => {
    const counts = new Map<string, number>();
    for (const token of tokens) counts.set(token, (counts.get(token) ?? 0) + 1);
    const weighted = new Map([...counts].map(([token, count]) => [token,
      (1 + Math.log(count)) * (1 + Math.log((documents.length + 1) / ((documentFrequency.get(token) ?? 0) + 1))),
    ]));
    const norm = Math.sqrt([...weighted.values()].reduce((sum, value) => sum + value * value, 0));
    return { weighted, norm };
  });

  const pairs: { first: string; second: string; similarity: number }[] = [];
  for (let first = 0; first < documents.length; first += 1) {
    for (let second = first + 1; second < documents.length; second += 1) {
      const a = vectors[first];
      const b = vectors[second];
      let dotProduct = 0;
      for (const [token, weight] of a.weighted) dotProduct += weight * (b.weighted.get(token) ?? 0);
      const similarity = a.norm && b.norm ? Math.min(1, dotProduct / (a.norm * b.norm)) : 0;
      pairs.push({ first: documents[first].slug, second: documents[second].slug, similarity });
    }
  }
  return pairs.sort((a, b) => b.similarity - a.similarity);
}
