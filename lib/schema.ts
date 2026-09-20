import type {
  Article,
  BreadcrumbList,
  Dataset,
  Graph,
  Organization,
  Service,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/content/site";
import { companyRegistration, serviceAreas } from "@/content/identity";
import { pageUpdatedAt } from "@/content/page-updates";
import { absoluteUrl } from "./metadata";

type GraphNode = Organization | WebSite | WebPage | Article | Service | BreadcrumbList | Dataset;

export function safeJsonLd(data: Graph | WithContext<GraphNode>) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

export function organizationGraph(): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Consultas de proyectos",
          email: siteConfig.email,
          availableLanguage: "es",
          url: absoluteUrl("/contacto"),
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: companyRegistration.streetAddress,
          postalCode: companyRegistration.postalCode,
          addressLocality: companyRegistration.addressLocality,
          addressRegion: companyRegistration.addressRegion,
          addressCountry: companyRegistration.addressCountry,
        },
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Registro Mercantil de Albacete",
          value: "Hoja AB 31803",
          url: companyRegistration.source,
        },
        logo: absoluteUrl("/brand/ordantis-logo.svg"),
        description: siteConfig.description,
        areaServed: [
          { "@type": "Country", name: "España" },
          ...serviceAreas.map((area) => ({
            "@type": "City" as const,
            name: area.name,
            containedInPlace: {
              "@type": "AdministrativeArea" as const,
              name: area.region,
            },
          })),
        ],
        knowsAbout: [
          "Investigación y desarrollo en inteligencia artificial",
          "Machine learning",
          "Ciencia de datos",
          "Modelos predictivos",
          "Ingeniería de datos",
          "GovTech",
          "Sistemas de información territorial",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}

export function webPageSchema({
  path,
  title,
  description,
  type = "WebPage",
}: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage";
}): WithContext<WebPage> {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    dateModified: pageUpdatedAt(path),
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function articleSchema({
  path,
  title,
  description,
  publishedAt,
  updatedAt,
  citations,
}: {
  path: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  citations?: string[];
}): WithContext<Article> {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: title,
    description,
    inLanguage: siteConfig.language,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: absoluteUrl("/opengraph-image"),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    citation: citations,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  path,
  name,
  description,
  areaServed,
}: {
  path: string;
  name: string;
  description: string;
  areaServed?: { name: string; region: string };
}): WithContext<Service> {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    description,
    serviceType: name,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: areaServed
      ? {
          "@type": "City",
          name: areaServed.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: areaServed.region,
          },
        }
      : { "@type": "Country", name: "España" },
  };
}

export function datasetSchema({
  path,
  title,
  description,
  updatedAt,
  documentCount,
  questionCount,
}: {
  path: string;
  title: string;
  description: string;
  updatedAt: string;
  documentCount: number;
  questionCount: number;
}): WithContext<Dataset> {
  return evaluationDatasetSchema({
    path,
    title,
    description,
    updatedAt,
    measurementTechnique: "TF-IDF con similitud coseno, umbral de puntuación y margen de abstención",
    keywords: ["RAG", "recuperación de información", "abstención", `${documentCount} documentos`, `${questionCount} preguntas`],
  });
}

export function evaluationDatasetSchema({
  path,
  title,
  description,
  updatedAt,
  measurementTechnique,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  updatedAt: string;
  measurementTechnique: string;
  keywords: string[];
}): WithContext<Dataset> {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: title,
    description,
    url,
    dateModified: updatedAt,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    creator: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    measurementTechnique,
    keywords,
  };
}
