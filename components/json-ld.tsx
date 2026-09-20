import { safeJsonLd } from "@/lib/schema";

export function JsonLd({ data }: { data: Parameters<typeof safeJsonLd>[0] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
