import { JsonLd } from "@/components/json-ld";
import { StaticContentPage } from "@/components/static-content-page";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const page = getStaticPage("/inteligencia-artificial-valencia")!;

export const metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ArtificialIntelligenceValenciaPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          path: page.path,
          name: "Consultoría de inteligencia artificial y datos en Valencia",
          description: page.description,
          areaServed: { name: "Valencia", region: "Comunitat Valenciana" },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ordantis", path: "/" },
          { name: "Servicios", path: "/capacidades" },
          { name: "Inteligencia artificial en Valencia", path: page.path },
        ])}
      />
      <StaticContentPage page={page} />
    </>
  );
}
