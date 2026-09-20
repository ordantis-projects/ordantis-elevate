import { renderRobotsText } from "@/lib/crawler-policy";

export function GET() {
  const isPreviewBuild = process.env.ORDANTIS_DEPLOYMENT === "preview";
  const body = isPreviewBuild ? "User-agent: *\nDisallow: /\n" : renderRobotsText();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": isPreviewBuild
        ? "private, no-store"
        : "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      ...(isPreviewBuild ? { "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet" } : {}),
    },
  });
}
