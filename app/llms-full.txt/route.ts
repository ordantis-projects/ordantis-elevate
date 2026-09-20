import { allIndexableRoutes } from "@/content/pages";
import { renderMarkdownForPath } from "@/lib/markdown";

export function GET() {
  const body = allIndexableRoutes.map((path) => renderMarkdownForPath(path)).filter(Boolean).join("\n\n---\n\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
