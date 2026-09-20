import { JsonLd } from "@/components/json-ld";
import { StaticContentPage } from "@/components/static-content-page";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const page = getStaticPage("/inteligencia-artificial-albacete")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ArtificialIntelligenceAlbacetePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          path: page.path,
          name: "Consultoría de inteligencia artificial y datos en Albacete",
          description: page.description,
          areaServed: { name: "Albacete", region: "Castilla-La Mancha" },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ordantis", path: "/" },
          { name: "Servicios", path: "/capacidades" },
          { name: "Inteligencia artificial en Albacete", path: page.path },
        ])}
      />
      <StaticContentPage page={page} />
    </>
  );
}
