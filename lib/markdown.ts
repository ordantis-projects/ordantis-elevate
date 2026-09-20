import { getStaticPage } from "../content/pages.ts";
import { capabilities, projectCapabilities, getCapability, getInsight, insights, researchEvidence, siteConfig } from "../content/site.ts";
import { dataQualityLab, defaultDataContract, qualityScenarios } from "../content/labs.ts";
import { defaultRagBenchmarkParameters, ragBenchmarkDocuments, ragBenchmarkLab, ragBenchmarkQuestions } from "../content/rag-benchmark.ts";
import { agentEvaluationLab, agentEvaluationScenarios, defaultAgentPolicy } from "../content/agent-evaluation.ts";
import { defaultDocumentExtractionPolicy, documentIntelligenceLab, extractionCandidates, syntheticContractPages } from "../content/document-intelligence.ts";
import { analyzeObservations, qualityRuleLabels } from "./data-quality.ts";
import { evaluateRagBenchmark } from "./rag-benchmark.ts";
import { agentDecisionLabels, evaluateAgentPolicy } from "./agent-evaluation.ts";
import { evidenceStateLabels, evaluateDocumentExtraction, extractionDecisionLabels } from "./document-intelligence.ts";
import { homeDelivery, homeEngagement, homeEvidence, homeIntro, homeFaqs, homeProblems, homeProjectAreas, systemJourney, methodology, companyPrinciples, originalBackers, originalPartners } from "../content/home.ts";
import { projectServicePhases as servicePhases, integrationIntro, integrationServices, servicesIntro, type ServiceDetail } from "../content/services.ts";
import { companyFaqs, faqIntro } from "../content/faq.ts";
import { dataAdvantages, methodPoints, companyAchievements } from "../content/original-sections.ts";
import { diagnostic, diagnosticSteps, diagnosticProfileFields } from "../content/diagnostic.ts";
import { pageUpdatedAt } from "../content/page-updates.ts";

function renderTrust() {
  return `## Ecosistema de emprendimiento\n\n${originalBackers.map((item) => item.url ? `- [${item.name}](${item.url})` : `- ${item.name}`).join("\n")}\n\n## Programas\n\n[Participación en INCIBE Emprende](https://www.incibe.es/node/619170). El sello identifica participación en el programa de aceleración, no certificación de los servicios.\n\nOrdantis es startup finalista de DesafIA 2026.\n`;
}

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function header(title: string, description: string, canonical: string, updatedAt: string = pageUpdatedAt(new URL(canonical).pathname)) {
  return `# ${title}\n\n${description}\n\nCanonical: ${canonical}\nUpdated: ${updatedAt}\n`;
}

function renderService(service: ServiceDetail) {
  return `### ${service.number} ${service.title}\n\n${service.summary}\n\n${service.description}\n\nComponentes clave:\n\n${list(service.components)}\n\n${service.demoNote ? `Demostración: ${service.demoNote}\n\n` : ""}Ejemplos de aplicación (orientativos; no son proyectos ejecutados):\n\n${service.useCases.map((item) => `- ${item.sector}: ${item.text}`).join("\n")}\n\nEntregables:\n\n${list(service.deliverables)}\n\nQué condiciona el alcance: ${service.boundary}\n\n[Método, aceptación y preguntas](${siteConfig.url}/capacidades/${service.capability})`;
}

export function renderMarkdownForPath(path: string) {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  const canonical = new URL(normalized, siteConfig.url).toString();

  if (normalized === "/") {
    return [
      header("Ordantis — machine learning, ciencia de datos y sistemas de IA", siteConfig.description, canonical),
      `## ${homeIntro.title}\n\n${homeIntro.lead}\n\n${homeIntro.detail}`,
      `## ${homeProblems.title}\n\n${homeProblems.lead}\n\n${dataAdvantages.map((item) => `### ${item.question}\n\n${item.title}\n\n${item.text}\n\nDatos de partida: ${item.inputs}\n\nQué evaluamos: ${item.evaluation}\n\n${item.diagram}\n\n[${item.linkLabel}](${siteConfig.url}${item.href})`).join("\n\n")}\n\n${homeProblems.scope}`,
      `## Ámbitos de proyecto\n\n${homeProjectAreas.map((area) => `- [${area.title}](${siteConfig.url}${area.path}): ${area.description}`).join("\n")}`,
      `## ${homeEngagement.title}\n\n${homeEngagement.lead}\n\n${homeEngagement.items.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}`,
      `## ${homeEvidence.title}\n\n${homeEvidence.lead}\n\n[${researchEvidence.title}](${siteConfig.url}/research/${researchEvidence.slug}): ${researchEvidence.description}\n\n${list(researchEvidence.results)}\n\n${homeEvidence.boundary}`,
      `## Metodología\n\n${methodology.map((phase) => `### ${phase.title}\n\n${phase.lead}\n\n${phase.detail}\n\n${methodPoints[phase.phase].map((point) => `#### ${point.title}\n\n${point.text}`).join("\n\n")}\n\nServicios asociados:\n\n${servicePhases.find((item) => item.id === phase.phase)!.services.map((service) => `- [${service.number} ${service.title}](${siteConfig.url}/capacidades#${service.id})`).join("\n")}\n\nEntrega: ${phase.output}\n\nPregunta de control: ${phase.question}`).join("\n\n")}`,
      `## ${homeDelivery.title}\n\n${homeDelivery.lead}\n\n${homeDelivery.items.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}`,
      `## Empresas que confían en nosotros\n\n${list(originalPartners.map((item) => item.name))}`,
      `## Preguntas frecuentes\n\n${homeFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}\n\n[Ver detalle](${siteConfig.url}${faq.href})`).join("\n\n")}`,
      renderTrust(),
      `## Contacto\n\n[Iniciar diagnóstico](${siteConfig.url}/diagnostico)\n\n${siteConfig.email}\n`,
    ].join("\n\n");
  }

  if (normalized === "/faq") {
    return `${header(faqIntro.title, faqIntro.description, canonical)}\n${companyFaqs.map((faq) => `## ${faq.question}\n\n${faq.answer}\n\n[Ver el detalle](${siteConfig.url}${faq.href})`).join("\n\n")}\n\n[Guías técnicas](${siteConfig.url}/insights)\n`;
  }

  if (normalized === "/capacidades") {
    return [
      header(servicesIntro.title, servicesIntro.description, canonical),
      servicesIntro.lead,
      `## Ámbitos de proyecto\n\n${homeProjectAreas.map((area) => `- [${area.title}](${siteConfig.url}${area.path}): ${area.description}`).join("\n")}`,
      `## ${systemJourney.title}\n\n${systemJourney.lead}\n\n${systemJourney.steps.map((step) => `### ${step.title}\n\n${step.text}`).join("\n\n")}`,
      servicePhases.map((phase) => `## ${phase.title}\n\n${phase.intro}\n\n${phase.services.map(renderService).join("\n\n")}`).join("\n\n"),
      `## ${integrationIntro.title}\n\n${integrationIntro.description}\n\n${integrationServices.map(renderService).join("\n\n")}`,
      `## Método, evaluación y entregables\n\n${projectCapabilities.map((capability) => `- [${capability.title}](${siteConfig.url}/capacidades/${capability.slug}): ${capability.description}`).join("\n")}\n`,
    ].join("\n\n");
  }

  if (normalized === diagnostic.path) {
    return `${header(diagnostic.title, diagnostic.description, canonical)}\n${diagnostic.lead}\n\n${diagnostic.privacy}\n\n${diagnosticSteps.map((step) => `## ${step.title}\n\n${step.explanation}\n\n${list(step.options)}`).join("\n\n")}\n\n## Datos opcionales y email de respuesta\n\n${diagnosticProfileFields.map((field) => `### ${field.label}\n\n${field.id === "email" ? "Se pide una sola vez al final y es necesario para enviar el diagnóstico desde la web." : field.options ? list(field.options) : "Campo opcional de texto; se incluye en el resumen."}`).join("\n\n")}\n\n## Resultado\n\nLa herramienta prepara un resumen con todas tus respuestas. Al final puedes revisarlo, indicar tu email y enviar el diagnóstico a ${siteConfig.email} tras confirmar que has leído la información de privacidad y completar la comprobación antispam. No se envía ninguna solicitud mientras rellenas las preguntas. La confirmación del servicio no acredita entrega ni lectura del correo. También puedes copiar el resumen, descargarlo o abrir un borrador en tu correo. La orientación no acredita viabilidad ni calcula una puntuación de madurez. Si incluyes datos de contacto, también aparecerán en la copia descargada.\n`;
  }

  const capability = normalized.startsWith("/capacidades/")
    ? getCapability(normalized.slice("/capacidades/".length))
    : undefined;
  if (capability) {
    const engagement = capability.engagement;
    return `${header(capability.title, capability.description, canonical)}\n## ${capability.openingQuestion}\n\n${capability.directAnswer}\n\n## Cuándo encaja\n\n${list(capability.suitableWhen)}\n\n## Para empezar\n\n${list(engagement.inputs)}\n\n## Entregables propuestos\n\n${list(engagement.deliverables)}\n\n## Cómo se acepta la prueba\n\n${engagement.acceptance}\n\n## Qué queda fuera\n\n${engagement.notIncluded}\n\n## Trabajo\n\n${capability.work.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}\n\n## Decisiones\n\n${list(capability.decisions)}\n\n## Preguntas\n\n${list(capability.questions)}\n\n## Referencias técnicas\n\n${capability.references?.map((item) => `- [${item.label}](${item.url})`).join("\n") ?? "El alcance y el protocolo se acuerdan para cada prueba."}\n`;
  }

  const insight = normalized.startsWith("/insights/")
    ? getInsight(normalized.slice("/insights/".length))
    : undefined;
  if (insight) {
    const sourceList = insight.sources?.length
      ? `\n\n## Fuentes\n\n${insight.sources.map((source) => `- [${source.label}](${source.url})`).join("\n")}`
      : "";
    const related = insights.filter((item) => item.slug !== insight.slug && item.relatedCapability === insight.relatedCapability).slice(0, 3);
    return `${header(insight.title, insight.description, canonical, insight.updatedAt)}\n## Respuesta breve\n\n${insight.answer}\n\n## Contexto\n\n${insight.context.join("\n\n")}\n\n## Ejemplo didáctico: ${insight.example.title}\n\nSituación inventada; no representa un resultado de clientes.\n\n${insight.example.situation}\n\nQué decisión cambia: ${insight.example.decision}\n\n## Qué comprobar\n\n${list(insight.checks)}\n\n## Método\n\n${insight.method.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}\n\n## Señales para detener la prueba\n\n${list(insight.stopSignals)}${sourceList}\n\n## Para seguir con esta decisión\n\n${related.map((item) => `- [${item.title}](${siteConfig.url}/insights/${item.slug})`).join("\n")}\n- [Servicio y entregables](${siteConfig.url}/capacidades/${insight.relatedCapability})\n`;
  }

  if (normalized === "/research/exist-2026") {
    return `${header(researchEvidence.title, researchEvidence.description, canonical)}\n## Qué se investigó\n\n${researchEvidence.context.join("\n\n")}\n\n## Resultados oficiales\n\n${list(researchEvidence.results)}\n\n## Qué aportó el experimento\n\n${list(researchEvidence.contributions)}\n\n## Limitaciones\n\n${list(researchEvidence.limitations)}\n\n${researchEvidence.weakResult}\n\n## Fuentes\n\n${researchEvidence.links.map((link) => `- [${link.label}](${link.url})`).join("\n")}\n\n${researchEvidence.reproduction}\n`;
  }

  if (normalized === "/insights") {
    const page = getStaticPage(normalized)!;
    return `${header(page.title, page.description, canonical)}\n${page.lead}\n\n${capabilities.map((capability) => `## ${capability.title}\n\n[Método y entregables](${siteConfig.url}/capacidades/${capability.slug})\n\n${insights.filter((item) => item.relatedCapability === capability.slug).map((item) => `- [${item.title}](${siteConfig.url}/insights/${item.slug}): ${item.description}`).join("\n")}`).join("\n\n")}\n`;
  }

  if (normalized === dataQualityLab.path) {
    const scenario = qualityScenarios[0];
    const report = analyzeObservations(scenario.observations, defaultDataContract);
    return `${header(dataQualityLab.title, dataQualityLab.description, canonical, dataQualityLab.updatedAt)}\n${dataQualityLab.lead}\n\n${dataQualityLab.scope}\n\n## Cómo se calcula\n\n${list(dataQualityLab.method)}\n\n## Contrato inicial\n\n${list(Object.entries(defaultDataContract).map(([key, value]) => `${key}: ${value}`))}\n\n## Muestra sintética inicial\n\n${list(scenario.observations.map((row, index) => `Fila ${index + 1}: ${row.id}; ${row.sensor}; ${row.observedAt}; ${row.value ?? "ausente"}; ${row.unit}`))}\n\n## Resultado reproducible\n\n${report.affectedRows} de ${report.totalRows} filas con incidencias; ${report.findings.length} incidencias.\n\n${list(report.findings.map((finding) => `Fila ${finding.row}: ${qualityRuleLabels[finding.rule]}. ${finding.explanation}`))}\n\n## Qué no demuestra esta prueba\n\n${list(dataQualityLab.limitations)}\n\n## Guías relacionadas\n\n${dataQualityLab.related.map((item) => `- [${item.label}](${siteConfig.url}${item.path})`).join("\n")}\n`;
  }

  if (normalized === ragBenchmarkLab.path) {
    const report = evaluateRagBenchmark({ documents: ragBenchmarkDocuments, questions: ragBenchmarkQuestions, ...defaultRagBenchmarkParameters });
    const documentById = new Map(ragBenchmarkDocuments.map((document) => [document.id, document]));
    return `${header(ragBenchmarkLab.title, ragBenchmarkLab.description, canonical, ragBenchmarkLab.updatedAt)}\n${ragBenchmarkLab.lead}\n\n${ragBenchmarkLab.scope}\n\n## Cómo se calcula\n\n${list(ragBenchmarkLab.method)}\n\n## Parámetros iniciales\n\n- Puntuación mínima: ${defaultRagBenchmarkParameters.threshold}\n- Margen mínimo entre primera y segunda fuente: ${defaultRagBenchmarkParameters.minimumMargin}\n\n## Corpus controlado\n\n${ragBenchmarkDocuments.map((document) => `- [${document.title}](${siteConfig.url}${document.path})`).join("\n")}\n\n## Preguntas y resultado esperado\n\n${ragBenchmarkQuestions.map((question) => `### ${question.id}: ${question.question}\n\n${question.expectation}`).join("\n\n")}\n\n## Resultado reproducible con los parámetros iniciales\n\n- ${report.recovered} de ${report.answerableCount} fuentes respondibles recuperadas.\n- ${report.abstained} de ${report.unanswerableCount} abstenciones correctas.\n- ${report.falseAnswers} respuestas falsas.\n- ${report.overallCorrect} de ${report.questionCount} decisiones correctas en esta prueba preparada.\n\n${report.outcomes.map((outcome) => {
      const expected = outcome.question.expectedDocumentId ? documentById.get(outcome.question.expectedDocumentId)?.title : "abstención";
      const predicted = outcome.predictedDocumentId ? documentById.get(outcome.predictedDocumentId)?.title : "abstención";
      return `- ${outcome.question.id}: resultado esperado: ${expected}; primera fuente ${outcome.top?.document.title ?? "ninguna"} (${outcome.top?.score.toFixed(4) ?? "0.0000"}); margen ${outcome.margin.toFixed(4)}; decisión ${predicted}; ${outcome.correct ? "correcta" : "incorrecta"}.`;
    }).join("\n")}\n\n## Qué no demuestra esta prueba\n\n${list(ragBenchmarkLab.limitations)}\n\n## Guías relacionadas\n\n${ragBenchmarkLab.related.map((item) => `- [${item.label}](${siteConfig.url}${item.path})`).join("\n")}\n`;
  }

  if (normalized === agentEvaluationLab.path) {
    const report = evaluateAgentPolicy(agentEvaluationScenarios, defaultAgentPolicy);
    return `${header(agentEvaluationLab.title, agentEvaluationLab.description, canonical, agentEvaluationLab.updatedAt)}\n${agentEvaluationLab.lead}\n\n${agentEvaluationLab.scope}\n\n## Cómo se evalúa\n\n${list(agentEvaluationLab.method)}\n\n## Política inicial\n\n${list(Object.entries(defaultAgentPolicy).map(([key, value]) => `${key}: ${value ? "activo" : "inactivo"}`))}\n\n## Escenarios sintéticos y expectativas\n\n${agentEvaluationScenarios.map((scenario) => `### ${scenario.id}: ${scenario.title}\n\n${scenario.request}\n\n- Herramienta: ${scenario.tool}\n- Destino: ${scenario.target}\n- Acción: ${scenario.actionKind}\n- Clasificación del dato: ${scenario.dataClassification}\n- Origen de la instrucción: ${scenario.instructionSource}\n- Coincide con el alcance: ${scenario.scopeMatched ? "sí" : "no"}\n- Destino externo: ${scenario.externalDestination ? "sí" : "no"}\n- Reversible: ${scenario.reversible ? "sí" : "no"}\n- Decisión esperada: ${agentDecisionLabels[scenario.expectedDecision]}\n\n${scenario.expectedReason}`).join("\n\n")}\n\n## Resultado reproducible con la política inicial\n\n- ${report.correctCount} de ${report.scenarioCount} decisiones coinciden con la expectativa preparada.\n- ${report.unsafeAllows} ejecuciones inseguras.\n- ${report.missedApprovals} aprobaciones omitidas.\n- ${report.overBlocked} lecturas permitidas bloqueadas.\n\n${report.outcomes.map((outcome) => `- ${outcome.scenario.id}: esperado ${agentDecisionLabels[outcome.scenario.expectedDecision]}; política ${agentDecisionLabels[outcome.decision]}; ${outcome.correct ? "correcto" : "incorrecto"}. ${outcome.reason}`).join("\n")}\n\n## Qué no demuestra esta prueba\n\n${list(agentEvaluationLab.limitations)}\n\n## Guías relacionadas\n\n${agentEvaluationLab.related.map((item) => `- [${item.label}](${siteConfig.url}${item.path})`).join("\n")}\n`;
  }

  if (normalized === documentIntelligenceLab.path) {
    const report = evaluateDocumentExtraction(syntheticContractPages, extractionCandidates, defaultDocumentExtractionPolicy);
    return `${header(documentIntelligenceLab.title, documentIntelligenceLab.description, canonical, documentIntelligenceLab.updatedAt)}\n${documentIntelligenceLab.lead}\n\n${documentIntelligenceLab.scope}\n\n## Contrato sintético\n\n${syntheticContractPages.map((page) => `### Página ${page.page}\n\n${page.text}`).join("\n\n")}\n\n## Cómo se evalúa\n\n${list(documentIntelligenceLab.method)}\n\n## Política inicial\n\n- Confianza mínima: ${defaultDocumentExtractionPolicy.minimumConfidence}\n- Exigir evidencia: ${defaultDocumentExtractionPolicy.requireEvidence ? "activo" : "inactivo"}\n- Revisar contradicciones: ${defaultDocumentExtractionPolicy.reviewContradictions ? "activo" : "inactivo"}\n- Revisar campos de alto riesgo: ${defaultDocumentExtractionPolicy.reviewHighRisk ? "activo" : "inactivo"}\n\n## Candidatos sintéticos y expectativas\n\n${extractionCandidates.map((candidate) => `### ${candidate.id}: ${candidate.field}\n\n- Valor extraído: ${candidate.value}\n- Página: ${candidate.page ?? "sin página"}\n- Fragmento: ${candidate.excerpt ?? "sin fragmento"}\n- Confianza: ${candidate.confidence.toFixed(2)}\n- Riesgo: ${candidate.risk}\n- Decisión esperada: ${extractionDecisionLabels[candidate.expectedDecision]}\n\n${candidate.expectedReason}`).join("\n\n")}\n\n## Resultado reproducible con la política inicial\n\n- ${report.correctCount} de ${report.candidateCount} decisiones coinciden con la expectativa preparada.\n- ${report.autoAccepted} aceptadas automáticamente.\n- ${report.manualReview} enviadas a revisión.\n- ${report.rejected} rechazadas.\n- ${report.unsafeAccepts} aceptaciones inseguras.\n- ${report.acceptedWithoutSupport} aceptadas sin respaldo.\n\n${report.outcomes.map((outcome) => `- ${outcome.candidate.id}: evidencia ${evidenceStateLabels[outcome.evidenceState]}; esperado ${extractionDecisionLabels[outcome.candidate.expectedDecision]}; política ${extractionDecisionLabels[outcome.decision]}; ${outcome.correct ? "correcto" : "incorrecto"}. ${outcome.reason}`).join("\n")}\n\n## Qué no demuestra esta prueba\n\n${list(documentIntelligenceLab.limitations)}\n\n## Guías relacionadas\n\n${documentIntelligenceLab.related.map((item) => `- [${item.label}](${siteConfig.url}${item.path})`).join("\n")}\n`;
  }

  const staticPage = getStaticPage(normalized);
  if (staticPage) {
    const companyExtra = normalized === "/empresa" ? `\n\n## Valores\n\n${companyPrinciples.map((item) => `### ${item.title}\n\n${item.text}`).join("\n\n")}\n\n${renderTrust()}\n\n## Programas y reconocimientos\n\n${companyAchievements.map((item) => `### ${item.title}\n\n${item.text}${"url" in item ? `\n\n[Referencia](${item.url})` : ""}`).join("\n\n")}` : "";
    return `${header(staticPage.title, staticPage.description, canonical)}\n${staticPage.lead}\n\n${staticPage.sections.map((section) => `## ${section.title}\n\n${section.paragraphs.join("\n\n")}${section.items?.length ? `\n\n${list(section.items)}` : ""}${section.table ? `\n\n${section.table.caption}\n\n${section.table.headers.join(" | ")}\n${section.table.headers.map(() => "---").join(" | ")}\n${section.table.rows.map((row) => row.join(" | ")).join("\n")}` : ""}${section.links?.length ? `\n\n${section.links.map((link) => `- [${link.label}](${new URL(link.path, siteConfig.url).toString()})`).join("\n")}` : ""}`).join("\n\n")}${companyExtra}\n`;
  }

  return null;
}
