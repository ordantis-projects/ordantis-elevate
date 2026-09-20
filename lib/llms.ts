import { companyRegistration, serviceAreas } from "../content/identity.ts";
import { insights, integrationCapabilities, projectCapabilities, researchEvidence, siteConfig } from "../content/site.ts";
import { servicesIntro } from "../content/services.ts";
import { searchGraph } from "../content/search-graph.ts";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function markdownUrl(path: string) {
  return absoluteUrl(path === "/" ? "/markdown" : `/markdown${path}`);
}

export function renderLlmsIndex() {
  const capabilityLinks = projectCapabilities
    .map((capability) => `- [${capability.title}](${markdownUrl(`/capacidades/${capability.slug}`)}): ${capability.description}`)
    .join("\n");
  const integrationLinks = integrationCapabilities
    .map((capability) => `- [${capability.title}](${markdownUrl(`/capacidades/${capability.slug}`)}): especialidad complementaria; ${capability.description}`)
    .join("\n");
  const areaLinks = serviceAreas
    .map((area) => `- [IA, machine learning y datos en ${area.name}](${markdownUrl(area.path)}): ${area.relationship}; ${area.region}.`)
    .join("\n");
  const decisions = searchGraph.map((topic) => {
    const guides = topic.guides.map((slug) => {
      const guide = insights.find((entry) => entry.slug === slug);
      if (!guide) throw new Error(`Unknown search graph guide: ${slug}`);
      return `- [${guide.title}](${markdownUrl(`/insights/${guide.slug}`)})`;
    }).join("\n");
    // HTML service anchors have no equivalent IDs in the Markdown representation.
    return `## ${topic.title}\n\n- [Alcance y entregables](${markdownUrl(topic.path.split("#")[0])}): ${topic.decision}\n${guides}`;
  }).join("\n\n");

  return `# Ordantis

> ${siteConfig.description}

Ordantis desarrolla modelos de machine learning, ciencia e ingeniería de datos y sistemas de inteligencia artificial para empresas y administraciones públicas en España. Los proyectos parten de decisiones como prever demanda, detectar fallos o planificar recursos. El alcance puede ser desarrollar un modelo, investigar una solución o integrar un sistema existente. I+D es una línea de trabajo cuando hay incertidumbre técnica, no un requisito para cualquier encargo.

Las guías explican datos necesarios, métodos de evaluación y límites. Distinguen evidencia propia, referencias externas y ejemplos inventados. Las propuestas técnicas inspiran preguntas, no acreditan proyectos ejecutados ni resultados de clientes. Las demos son didácticas y usan datos sintéticos. Agentes, RAG, BI y procesamiento documental se conservan como especialidades complementarias, no como identidad principal.

## Páginas principales

- [Inicio](${markdownUrl("/")}): propuesta, método, servicios y evidencia destacada.
- [${servicesIntro.title}](${markdownUrl("/capacidades")}): ámbitos de proyecto, catálogo, entregables y condiciones de aceptación.
- [Preguntas frecuentes](${markdownUrl("/faq")}): investigación, evaluación de modelos, integración, datos y transferencia técnica.
- [Diagnóstico](${markdownUrl("/diagnostico")}): tres preguntas y email, con información adicional opcional. Las respuestas permanecen en la página hasta que la persona revisa el resumen y confirma el envío a ${siteConfig.email}; el cuestionario no acredita viabilidad técnica.

## Capacidades principales de modelos, datos e I+D

${capabilityLinks}

${decisions}

## Evidencia y límites de los resultados

- [${researchEvidence.title}](${markdownUrl(`/research/${researchEvidence.slug}`)}): investigación de NLP y multimodalidad, paper, resultados oficiales, reproducción y limitaciones. No acredita implantaciones predictivas en empresas o administraciones ni rendimiento en otros problemas.
- [Laboratorio de calidad del dato](${markdownUrl("/labs/calidad-datos")}): prueba reproducible con datos sintéticos y reglas explícitas; no es un benchmark de producción.
- [Guías técnicas](${markdownUrl("/insights")}): índice de preguntas, protocolos y fuentes; las guías no son casos de éxito.

## España, Albacete y Valencia

${areaLinks}

El domicilio de Albacete es registral, no una oficina abierta al público. Valencia es un área de servicio y relación con el ecosistema UPV; no se presenta como sede. Las participaciones en programas y reconocimientos no son certificaciones técnicas ni resultados de clientes.

## Identidad y contacto

- [Empresa](${markdownUrl("/empresa")}): identidad de Ordantis, principios y relaciones verificables.
- [Aviso legal](${markdownUrl("/aviso-legal")}): identidad de la sociedad y datos registrales.
- [BORME](${companyRegistration.source}): publicación registral de la sociedad.
- [Política de privacidad](${markdownUrl("/privacidad")}): información sobre el tratamiento de datos.
- [Correo de contacto](mailto:${siteConfig.email}): ${siteConfig.email}.

## Especialidades complementarias de integración

${integrationLinks}

## Optional

- [Contenido completo en Markdown](${absoluteUrl("/llms-full.txt")}): concatenación de todas las páginas indexables; úsala solo cuando se necesite el corpus completo.
- [Sitemap XML](${absoluteUrl("/sitemap.xml")}): inventario de URL canónicas indexables.
- [Política de cookies](${markdownUrl("/cookies")}): consentimiento y medición.
`;
}
