import { renderMarkdownForPath } from "@/lib/markdown";
import { markdownUrl } from "@/lib/metadata";
import { siteConfig } from "@/content/site";
import { contentSignalPolicy } from "@/lib/agent-discovery";

type Props = { params: Promise<{ slug?: string[] }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug = [] } = await params;
  const path = slug.length ? `/${slug.join("/")}` : "/";
  const markdown = renderMarkdownForPath(path);

  if (!markdown) {
    return new Response(`# Página no encontrada\n\nConsulta ${siteConfig.url}/sitemap.xml o ${siteConfig.url}/llms.txt.\n`, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Signal": contentSignalPolicy,
        Vary: "Accept",
        "X-Robots-Tag": "noindex",
      },
    });
  }

  const canonical = new URL(path, siteConfig.url).toString();
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Signal": contentSignalPolicy,
      Vary: "Accept",
      "X-Robots-Tag": "noindex",
      Link: `<${canonical}>; rel="canonical", <${markdownUrl(path)}>; rel="alternate"; type="text/markdown", <${siteConfig.url}/llms.txt>; rel="describedby"; type="text/markdown", <${siteConfig.url}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
