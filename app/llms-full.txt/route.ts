import { allIndexableRoutes } from "@/content/pages";
import { renderMarkdownForPath } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/metadata";
import { contentSignalPolicy } from "@/lib/agent-discovery";

export function GET() {
  const body = allIndexableRoutes.map((path) => renderMarkdownForPath(path)).filter(Boolean).join("\n\n---\n\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": contentSignalPolicy,
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "X-Robots-Tag": "noindex",
      Link: `<${absoluteUrl("/llms-full.txt")}>; rel="self", <${absoluteUrl("/llms.txt")}>; rel="index"; type="text/markdown", <${absoluteUrl("/sitemap.xml")}>; rel="sitemap"; type="application/xml"`,
    },
  });
}
