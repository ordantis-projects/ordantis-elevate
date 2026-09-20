/** Only public prose is sent to the local checker, not URL/metadata/code literals. */
export function editorialProse(markdown: string) {
  return markdown
    .replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "")
    .replace(/^(?:Canonical|Updated):.*$/gm, "")
    .replace(/!?\[([^\]]*)\]\([^\s)]+\)/g, "$1")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^(?:#{1,6}\s+|[-*]\s+|\d+\.\s+)/gm, "")
    .replace(/\*\*|__/g, "")
    .trim();
}

/** Break at paragraph/word boundaries: never invent errors by cutting a word. */
export function languageChunks(text: string, limit = 12000): string[] {
  const chunks: string[] = [];
  let current = "";
  for (const paragraph of text.split(/\n\s*\n/)) {
    if (!paragraph.trim()) continue;
    if (current && current.length + paragraph.length + 2 <= limit) {
      current += `\n\n${paragraph}`;
      continue;
    }
    if (current) chunks.push(current);
    current = paragraph;
    while (current.length > limit) {
      const boundary = current.lastIndexOf(" ", limit);
      if (boundary <= 0) throw new Error("Bloque editorial sin separadores: revisar el texto antes de enviarlo.");
      chunks.push(current.slice(0, boundary));
      current = current.slice(boundary + 1);
    }
  }
  if (current) chunks.push(current);
  return chunks;
}
