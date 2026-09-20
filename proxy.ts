import { NextResponse, type NextRequest } from "next/server";
import { prefersMarkdown } from "@/lib/accept";

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();
  if (prefersMarkdown(request.headers.get("accept"))) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname === "/" ? "/markdown" : `/markdown${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|markdown|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|llms.txt|llms-full.txt).*)"],
};
