import { renderLlmsIndex } from "@/lib/llms";
import { absoluteUrl } from "@/lib/metadata";

export function GET() {
  return new Response(renderLlmsIndex(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex",
      Link: `<${absoluteUrl("/llms.txt")}>; rel="self"`,
    },
  });
}
