import { renderLlmsIndex } from "@/lib/llms";
import { absoluteUrl } from "@/lib/metadata";
import { contentSignalPolicy } from "@/lib/agent-discovery";

export function GET() {
  return new Response(renderLlmsIndex(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": contentSignalPolicy,
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
      Link: `<${absoluteUrl("/llms.txt")}>; rel="self", <${absoluteUrl("/sitemap.xml")}>; rel="sitemap"; type="application/xml"`,
    },
  });
}
