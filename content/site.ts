import { additionalInsights } from "./insights-additions.ts";
import { priorityInsights } from "./priority-insights.ts";
import { rdInsights } from "./rd-insights.ts";
import { enterpriseInsights } from "./enterprise-insights.ts";
import { insightExamples } from "./insight-examples.ts";
import { capabilityEngagements } from "./capability-engagements.ts";

export { siteConfig, primaryNavigation } from "./identity.ts";

export type ReferenceLink = {
  label: string;
  url: string;
  note?: string;
};

export type Capability = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  openingQuestion: string;
  directAnswer: string;
  suitableWhen: string[];
  work: { title: string; text: string }[];
  decisions: string[];
  questions: string[];
  references?: ReferenceLink[];
};

const capabilityDefinitions: Capability[] = [
  {
    slug: "agentes-ia",
    title: "Agent Engineering",
    shortTitle: "Agentes de IA",
    description:
      "Diseño, desarrollo y evaluación de agentes de IA para empresas: herramientas con permisos acotados, trazas y aprobación humana cuando la decisión lo exige.",
    openingQuestion: "¿Cuándo merece la pena construir un agente de IA?",
    directAnswer:
      "Cuando el trabajo exige elegir pasos, consultar varias fuentes o utilizar herramientas bajo reglas explícitas. Si una automatización determinista resuelve el proceso con menos riesgo, proponemos esa opción.",
    suitableWhen: [
      "La tarea cambia según el contexto y no cabe en una secuencia fija.",
      "El sistema debe consultar documentos, bases de datos o API antes de actuar.",
      "Hace falta registrar qué herramienta se usó, con qué entrada y qué resultado devolvió.",
      "Existen puntos de aprobación humana que no se deben omitir.",
    ],
    work: [
      {
        title: "Mapa de decisiones",
        text: "Separamos lo que el agente puede decidir, lo que debe escalar y lo que queda fuera de alcance. El mapa se convierte después en pruebas.",
      },
      {
        title: "Herramientas con permisos",
        text: "Cada herramienta expone el mínimo acceso necesario. Validamos parámetros, respuestas, errores y límites de frecuencia antes de conectarla al agente.",
      },
      {
        title: "Evaluación antes del despliegue",
        text: "Probamos casos normales, entradas ambiguas, fallos de herramientas e intentos de saltarse instrucciones. Un buen resultado medio no compensa un fallo grave sin control.",
      },
      {
        title: "Trazas y revisión",
        text: "Guardamos las decisiones necesarias para reproducir un incidente sin convertir la observabilidad en una copia indiscriminada de datos sensibles.",
      },
    ],
    decisions: [
      "Agente, workflow determinista o combinación de ambos.",
      "Permisos por herramienta y límites de actuación.",
      "Casos que requieren aprobación humana.",
      "Suite de evaluación y criterio de parada.",
    ],
    questions: [
      "¿Qué puede hacer el agente sin confirmación?",
      "¿Cómo se prueba una llamada a herramienta que puede cambiar datos?",
      "¿Qué información debe conservar una traza?",
      "¿Cuándo conviene MCP y cuándo basta una API?",
    ],
    references: [
      { label: "Model Context Protocol", url: "https://modelcontextprotocol.io/" },
      { label: "Agent Skills", url: "https://agentskills.io/specification" },
      { label: "A2A Protocol", url: "https://github.com/a2aproject/A2A" },
      { label: "Promptfoo", url: "https://github.com/promptfoo/promptfoo" },
    ],
  },
  {
    slug: "modelos-predictivos",
    title: "Machine learning y modelos predictivos",
    shortTitle: "Machine learning",
    description:
      "Desarrollo y evaluación de modelos de machine learning para demanda, riesgo y mantenimiento: validación temporal, incertidumbre e integración en sistemas operativos.",
    openingQuestion: "¿Qué hace que una predicción sea útil para decidir?",
    directAnswer:
      "La predicción debe llegar antes de la decisión y mejorar una referencia conocida en los periodos y condiciones relevantes. Definimos el horizonte, el coste de infraestimar o sobreestimar y cómo comprobar la incertidumbre. Desarrollamos el modelo junto a su evaluación temporal y a los contratos de datos necesarios para integrarlo.",
    suitableWhen: [
      "Existe una decisión recurrente que depende de lo que puede ocurrir después.",
      "Hay histórico suficiente y se conoce cómo se generó.",
      "El coste de anticiparse se puede comparar con el coste de equivocarse.",
      "La organización puede revisar el modelo cuando cambian los datos.",
      "La predicción debe integrarse en un servicio continuo con límites de latencia y carga.",
    ],
    work: [
      {
        title: "Definir la decisión",
        text: "Antes de modelar fijamos el horizonte, la variable que se quiere estimar y la decisión que utilizará el resultado.",
      },
      {
        title: "Construir una referencia",
        text: "Comparamos contra reglas simples, medias históricas o el método actual. Si un modelo complejo no mejora esa referencia, no se industrializa.",
      },
      {
        title: "Validar en el tiempo",
        text: "Reconstruimos la información disponible en cada instante y reservamos episodios completos. El análisis separa horizontes, periodos de saturación y cambios de régimen: una media mejor no basta si empeora una condición crítica.",
      },
      {
        title: "Comparar representaciones",
        text: "Contrastamos variables tabulares con historia temporal y relaciones entre entidades cuando el problema lo requiere. Las secuencias, los grafos o el aprendizaje compartido continúan solo si aportan mejora frente a controles con información equivalente.",
      },
      {
        title: "Cuantificar incertidumbre",
        text: "Evaluamos cobertura y anchura de los intervalos en periodos no usados para calibrar. Diferenciamos una observación poco fiable, un régimen poco representado y una situación con varios futuros plausibles; no les asignamos una confianza genérica.",
      },
      {
        title: "Vigilar el deterioro",
        text: "Definimos alertas para cambios de distribución, errores por segmento y pérdida de calibración.",
      },
      {
        title: "Preparar la operación",
        text: "Probamos concurrencia, latencia, entradas tardías, estados degradados y reproducción de cada predicción antes de integrar el servicio.",
      },
    ],
    decisions: [
      "Horizonte y unidad de predicción.",
      "Métrica vinculada al coste del error.",
      "Intervalos o probabilidades que acompañan la estimación.",
      "Presupuesto de latencia y comportamiento en regímenes de alta carga.",
      "Regla de reentrenamiento o retirada.",
    ],
    questions: [
      "¿Hay suficiente histórico para la decisión concreta?",
      "¿Qué baseline debe superar el modelo?",
      "¿Cómo cambia el error entre periodos o grupos?",
      "¿Qué información estaba disponible en el instante exacto de cada predicción?",
      "¿Qué haría que dejáramos de confiar en la predicción?",
    ],
  },
  {
    slug: "data-intelligence",
    title: "Ciencia e ingeniería de datos",
    shortTitle: "Ciencia de datos",
    description:
      "Ciencia de datos e ingeniería para empresas y administraciones: análisis estadístico, integración de fuentes, calidad y datos reproducibles para modelos y sistemas de IA.",
    openingQuestion: "¿Qué permiten concluir los datos y cómo llevar ese análisis a un sistema?",
    directAnswer:
      "Primero revisamos cobertura, calidad y representatividad para saber qué preguntas pueden responder los datos. El análisis estadístico separa patrones, sesgos y explicaciones que aún requieren una prueba: una correlación no demuestra una causa. Después definimos entidades, transformaciones e interfaces que permitan repetir el análisis e integrar modelos. El sistema distingue lo observado de lo estimado y conserva qué información estaba disponible en cada momento.",
    suitableWhen: [
      "Hay que explicar diferencias en demanda, rendimiento o incidencias sin confundirlas con cambios de registro o de cobertura.",
      "El proyecto combina datos de operación, registros administrativos, fuentes territoriales o sensores.",
      "Las fuentes cambian de esquema, unidad, frecuencia o identificador.",
      "Hay que reproducir los datos utilizados para entrenar o evaluar una versión del modelo.",
      "La operación exige controlar retrasos, accesos y calidad antes de servir los datos.",
    ],
    work: [
      {
        title: "Análisis y representatividad",
        text: "Definimos la unidad de análisis, revisamos distribuciones y ausencias y contrastamos segmentos y periodos. Documentamos incertidumbre y factores de confusión antes de interpretar un patrón o usarlo como variable del modelo.",
      },
      {
        title: "Inventario y contratos",
        text: "Documentamos fuentes, responsables, frecuencia, campos y condiciones mínimas de calidad.",
      },
      {
        title: "Modelo semántico",
        text: "Relacionamos activos, fuentes y observaciones sin confundir coincidencia con identidad. Una geometría conserva su fecha y sistema de referencia; una entidad, los vínculos confirmados y los que siguen pendientes de revisión.",
      },
      {
        title: "Controles de calidad",
        text: "Separamos lectura original, dato corregido y estimación. Los controles de unidades, continuidad y coherencia señalan por qué se acepta o rechaza un valor. Una ausencia de medición no se convierte en cero ni en una señal de normalidad.",
      },
      {
        title: "Acceso útil",
        text: "Preparamos interfaces para modelos y sistemas existentes con procedencia, vigencia y estado de calidad. Versionamos fuentes y transformaciones para reconstruir un resultado histórico, incluso si el origen ya ha cambiado.",
      },
      {
        title: "Pruebas del sistema",
        text: "Reproducimos llegadas tardías, cambios de esquema y fallos de fuente. La carga y la recuperación se comprueban con criterios acordados antes de la integración.",
      },
    ],
    decisions: [
      "Fuente considerada canónica para cada entidad.",
      "Versiones de los conjuntos de datos y las transformaciones.",
      "Umbrales de calidad y respuesta ante fallos.",
      "Datos autorizados para desarrollo, evaluación e inferencia.",
    ],
    questions: [
      "¿Se puede reconstruir el conjunto de datos de un experimento?",
      "¿Qué registros no se pueden relacionar y por qué?",
      "¿Qué información estaba disponible en el instante de la predicción?",
      "¿Cómo se prueban los cambios de esquema, las llegadas tardías y los fallos de sensores?",
    ],
  },
  {
    slug: "document-intelligence",
    title: "Document Intelligence",
    shortTitle: "Documentos",
    description:
      "Inteligencia documental y procesamiento inteligente de documentos: extracción, clasificación y comparación con referencias al original y revisión humana.",
    openingQuestion: "¿Cómo automatizar documentos sin perder la trazabilidad?",
    directAnswer:
      "Cada dato extraído debe conservar su origen: documento, página o fragmento. La automatización propone y estructura; una persona revisa los puntos con efecto jurídico, económico o reputacional.",
    suitableWhen: [
      "La información llega en PDF, Word, imágenes o anexos con estructuras diferentes.",
      "El equipo repite búsquedas, comprobaciones o transcripciones.",
      "Una respuesta debe justificar de qué documento procede.",
      "Existen datos personales o campos que requieren anonimización.",
    ],
    work: [
      {
        title: "Muestra representativa",
        text: "Seleccionamos documentos fáciles, raros, incompletos y contradictorios. Evaluar solo plantillas limpias produce una falsa sensación de avance.",
      },
      {
        title: "Esquema de información",
        text: "Definimos los campos, relaciones, estados y evidencias que necesita el proceso de destino.",
      },
      {
        title: "Extracción con referencias",
        text: "El sistema conserva coordenadas, página o cita para que una persona pueda verificar la salida sin releer el expediente completo.",
      },
      {
        title: "Revisión por riesgo",
        text: "No todos los campos reciben el mismo control. Priorizamos importes, identidades, fechas, condiciones y contradicciones.",
      },
    ],
    decisions: [
      "Unidad documental y esquema de salida.",
      "Campos que requieren revisión obligatoria.",
      "Criterio de coincidencia, ausencia o contradicción.",
      "Política de conservación y acceso.",
    ],
    questions: [
      "¿Qué evidencia necesita ver quien valida el resultado?",
      "¿Cómo se mide un error de extracción que cambia una decisión?",
      "¿Qué documentos quedan fuera por calidad insuficiente?",
      "¿Cómo se mantiene coherencia al anonimizar una entidad repetida?",
    ],
  },
  {
    slug: "investigacion-desarrollo",
    title: "I+D en inteligencia artificial",
    shortTitle: "I+D aplicada",
    description:
      "Investigación aplicada y desarrollo experimental en IA para retos públicos y empresariales: hipótesis, modelos, evaluación reproducible y transferencia técnica.",
    openingQuestion: "¿Cómo convertir un problema abierto de IA en un proyecto de I+D evaluable?",
    directAnswer:
      "Delimitando la incertidumbre técnica, revisando métodos existentes y fijando qué experimento puede resolverla. El protocolo compara alternativas con datos representativos y criterios decididos de antemano. Sus resultados permiten diseñar el siguiente desarrollo, preparar una integración o cerrar la línea.",
    suitableWhen: [
      "La técnica parece posible, pero no hay evidencia con los datos reales.",
      "Varias arquitecturas compiten y el coste de equivocarse es alto.",
      "Se necesita medir precisión, calibración, latencia o coste antes de integrar.",
      "El problema exige combinar investigación y restricciones operativas.",
    ],
    work: [
      {
        title: "Pregunta falsable",
        text: "La formulamos de modo que un resultado pueda refutar la hipótesis. Evitamos objetivos como mejorar la eficiencia sin una medida concreta.",
      },
      {
        title: "Protocolo y baseline",
        text: "Congelamos una referencia reproducible y separamos desarrollo, selección y prueba final. Cada experimento declara qué cambia, qué se mantiene y qué presupuesto de ajuste recibe; así no atribuimos a la arquitectura una mejora que procede de nuevos datos.",
      },
      {
        title: "Registro experimental",
        text: "Las ablaciones miden la aportación de cada componente. Guardamos predicciones, configuraciones y análisis de errores por episodio o grupo. Comparamos también latencia y recursos; las alternativas descartadas forman parte del informe de investigación.",
      },
      {
        title: "Decisión de salida",
        text: "El cierre puede ser industrializar, repetir con nuevos datos o detener. Las tres salidas son válidas si están justificadas.",
      },
      {
        title: "Desarrollo y transferencia",
        text: "La alternativa seleccionada se convierte en componentes con interfaces, dependencias y pruebas. Acordamos los artefactos que recibe el equipo técnico y las condiciones para reproducir e integrar el resultado.",
      },
    ],
    decisions: [
      "Hipótesis y medida de éxito.",
      "Baseline y conjunto de evaluación.",
      "Presupuesto de tiempo, datos y cómputo.",
      "Condición de industrialización o parada.",
    ],
    questions: [
      "¿Qué resultado demostraría que la idea no funciona?",
      "¿La muestra representa los casos difíciles?",
      "¿La mejora compensa la complejidad añadida?",
      "¿Puede otra persona reproducir el experimento?",
    ],
  },
];

const capabilityOrder = ["modelos-predictivos", "data-intelligence", "investigacion-desarrollo", "document-intelligence", "agentes-ia"];
export const capabilities = capabilityDefinitions.toSorted((a, b) => capabilityOrder.indexOf(a.slug) - capabilityOrder.indexOf(b.slug)).map((capability) => ({
  ...capability,
  engagement: capabilityEngagements[capability.slug],
}));

const integrationCapabilitySlugs = new Set(["document-intelligence", "agentes-ia"]);
export const projectCapabilities = capabilities.filter((capability) => !integrationCapabilitySlugs.has(capability.slug));
export const integrationCapabilities = capabilities.filter((capability) => integrationCapabilitySlugs.has(capability.slug));

export type Insight = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  context: string[];
  checks: string[];
  method: { title: string; text: string }[];
  stopSignals: string[];
  relatedCapability: string;
  publishedAt: string;
  updatedAt: string;
  evidenceNote?: string;
  sources?: ReferenceLink[];
};

const publicationDate = "2026-08-25";

const foundationalInsights: Insight[] = [
  {
    slug: "validar-ia-antes-de-industrializar",
    title: "¿Cómo validar una solución de IA antes de industrializarla?",
    description:
      "Un protocolo para separar una demo convincente de una solución que puede sostener un proceso real.",
    answer:
      "La validación debe usar datos representativos, comparar contra el método actual y fijar por adelantado qué error resulta inaceptable. También debe medir el tiempo de revisión humana, la latencia y el coste de mantener el sistema.",
    context: [
      "Una demo suele enseñar los mejores ejemplos. La operación diaria contiene documentos dañados, periodos atípicos, campos ausentes y usuarios que hacen preguntas imprevistas.",
      "La prueba útil reproduce esas condiciones y deja registro de por qué cada caso pasó o falló.",
    ],
    checks: [
      "Cuál es la decisión que cambiará con el resultado.",
      "Qué método sencillo sirve de referencia.",
      "Qué casos raros deben aparecer en la muestra.",
      "Cuánto trabajo humano queda después de automatizar.",
      "Qué coste tendrá revisar, actualizar y retirar el sistema.",
    ],
    method: [
      { title: "Fijar el protocolo", text: "Datos, métricas y criterio de éxito se deciden antes de ejecutar la comparación." },
      { title: "Registrar errores", text: "Agrupamos fallos por causa y efecto, no solo en una media global." },
      { title: "Probar la operación", text: "Incluimos permisos, latencia, recuperación ante fallos y revisión humana." },
      { title: "Decidir", text: "Industrializar es una salida posible. Repetir o detener también lo son." },
    ],
    stopSignals: [
      "El modelo no supera la referencia sencilla.",
      "Los casos críticos dependen de una revisión tan extensa como el proceso original.",
      "No se puede reconstruir la salida hasta sus datos de entrada.",
      "El mantenimiento previsto supera el valor de la decisión mejorada.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "anonimizar-documentos-administrativos",
    title: "¿Cómo anonimizar documentos administrativos de forma coherente y trazable?",
    description:
      "Criterios para localizar datos personales, mantener alias coherentes y revisar los casos con mayor riesgo.",
    answer:
      "Primero hay que distinguir anonimización y seudonimización. Si un alias permite recuperar la identidad mediante una tabla, el proceso es reversible y debe tratarse como seudonimización. Para compartir un documento como anónimo también hay que evaluar si el contexto permite identificar razonablemente a alguien.",
    context: [
      "Los expedientes mezclan texto, tablas, sellos, anexos e imágenes. Un mismo nombre puede aparecer abreviado, con errores o en dos idiomas.",
      "Eliminar patrones evidentes no basta cuando el contexto permite reidentificar a una persona.",
    ],
    checks: [
      "Tipos de dato y base jurídica aplicable.",
      "Consistencia necesaria dentro de un expediente o entre expedientes.",
      "Riesgo de reidentificación por contexto.",
      "Tratamiento de imágenes, firmas y metadatos.",
      "Muestra que revisará una persona antes de liberar el documento.",
    ],
    method: [
      { title: "Detectar", text: "Combinamos reglas, reconocimiento de entidades y estructura documental." },
      { title: "Resolver identidades", text: "Agrupamos variantes que representan a la misma entidad." },
      { title: "Sustituir", text: "Elegimos borrado, generalización o alias según el uso. Si conservamos una correspondencia reversible, la protegemos por separado y no presentamos el resultado como anónimo." },
      { title: "Verificar", text: "La revisión busca omisiones y también contexto que permita reidentificar." },
    ],
    stopSignals: [
      "La calidad del escaneo impide localizar zonas relevantes.",
      "No existe una regla acordada para datos indirectamente identificativos.",
      "La tabla de correspondencias no puede protegerse con controles separados.",
      "La revisión detecta fallos repetidos en categorías de alto riesgo.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    sources: [{ label: "AEPD: anonimización y seudonimización", url: "https://www.aepd.es/prensa-y-comunicacion/blog/anonimizacion-y-seudonimizacion" }],
  },
  {
    slug: "evaluar-subvenciones-con-ia-trazable",
    title: "¿Puede la IA ayudar a valorar subvenciones sin ocultar el criterio técnico?",
    description:
      "Un diseño de apoyo a la valoración que conserva documentos, criterios, discrepancias y decisión humana.",
    answer:
      "Puede ordenar evidencias, señalar ausencias y preparar una propuesta de valoración. La resolución debe seguir en manos del personal competente, con acceso al fragmento que justifica cada sugerencia y a las reglas aplicadas.",
    context: [
      "La dificultad suele estar en relacionar bases, memorias, anexos y criterios, no en producir una puntuación aislada.",
      "Dos expedientes parecidos pueden diferir por una condición pequeña con efecto decisivo.",
    ],
    checks: [
      "Versión exacta de las bases y criterios.",
      "Evidencia documental exigida para cada punto.",
      "Casos en los que la regla admite interpretación.",
      "Separación entre propuesta automática y decisión firmada.",
      "Registro de cambios durante alegaciones o revisiones.",
    ],
    method: [
      { title: "Estructurar el expediente", text: "Relacionamos documentos, requisitos, criterios y evidencias." },
      { title: "Detectar incidencias", text: "Señalamos faltas, contradicciones y fragmentos dudosos." },
      { title: "Proponer", text: "El sistema prepara una valoración con referencias visibles." },
      { title: "Resolver", text: "Una persona acepta, corrige o rechaza cada punto y deja constancia." },
    ],
    stopSignals: [
      "Los criterios no se pueden convertir en reglas revisables.",
      "La documentación de entrada carece de versiones fiables.",
      "El sistema no puede citar la evidencia usada.",
      "La interfaz induce a aceptar la sugerencia sin revisarla.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "convertir-excel-en-memoria-tecnica",
    title: "¿Cómo convertir un Excel técnico en una memoria revisable?",
    description:
      "Del dato estructurado al documento, manteniendo reglas de cálculo, versiones y aprobaciones.",
    answer:
      "La hoja debe convertirse primero en un modelo de datos estable. La redacción se genera después a partir de campos validados, con referencias a celdas o registros y un flujo claro para revisar cambios.",
    context: [
      "Las hojas suelen mezclar entradas, cálculos, comentarios y texto final. Redactar directamente sobre ese conjunto hace difícil saber qué cambió.",
      "La solución necesita separar datos, reglas y narrativa.",
    ],
    checks: [
      "Campos que actúan como fuente y campos calculados.",
      "Reglas que deben conservarse fuera de las fórmulas de la hoja.",
      "Secciones obligatorias y condiciones para incluirlas.",
      "Responsables de revisar datos y redacción.",
      "Formato final y requisitos de exportación.",
    ],
    method: [
      { title: "Modelar", text: "Extraemos un esquema estable y validamos tipos, unidades y dependencias." },
      { title: "Calcular", text: "Las reglas se ejecutan de forma reproducible y dejan un registro." },
      { title: "Redactar", text: "Cada párrafo usa datos aprobados y plantillas con condiciones explícitas." },
      { title: "Aprobar", text: "La revisión distingue cambios de datos, reglas y texto." },
    ],
    stopSignals: [
      "La hoja depende de operaciones manuales que nadie puede explicar.",
      "No se distingue entre dato de entrada y resultado calculado.",
      "El documento exige afirmaciones que no están en la fuente.",
      "No hay responsable para aprobar cada sección.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "datos-territoriales-decisiones-publicas",
    title: "¿Cómo unir datos territoriales dispersos para una decisión pública?",
    description:
      "Un enfoque para identificar entidades, resolver ubicaciones y conservar la procedencia de cada dato.",
    answer:
      "Hace falta un modelo común de entidades y territorio, reglas para resolver duplicados y una fecha de vigencia por fuente. Un mapa útil debe explicar qué sabe, qué desconoce y cuándo se actualizó.",
    context: [
      "Los registros públicos describen el mismo recurso con nombres, direcciones y niveles administrativos distintos.",
      "La visualización llega al final. Primero hay que resolver identidad, procedencia y tiempo.",
    ],
    checks: [
      "Entidad que se quiere localizar o relacionar.",
      "Nivel geográfico adecuado para la decisión.",
      "Fuentes, licencias y frecuencia de actualización.",
      "Reglas para duplicados y ubicaciones dudosas.",
      "Datos que no deben mostrarse con precisión individual.",
    ],
    method: [
      { title: "Inventariar", text: "Registramos fuentes, cobertura, licencia, fecha y responsable." },
      { title: "Resolver", text: "Normalizamos entidades y conservamos la confianza de cada coincidencia." },
      { title: "Relacionar", text: "Construimos vínculos espaciales, administrativos y temporales." },
      { title: "Publicar", text: "El mapa muestra procedencia, fecha y límites junto al resultado." },
    ],
    stopSignals: [
      "La licencia no permite el uso previsto.",
      "La actualización es demasiado lenta para la decisión.",
      "La geocodificación introduce errores sistemáticos en una zona.",
      "El nivel de detalle crea un riesgo de privacidad.",
    ],
    relatedCapability: "data-intelligence",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "gemelo-digital-infraestructura-publica",
    title: "¿Qué datos necesita un gemelo digital de infraestructura pública?",
    description:
      "Cómo acotar un gemelo digital para que responda una decisión concreta y no se convierta en un modelo sin uso.",
    answer:
      "Debe empezar por la decisión que se quiere ensayar: capacidad, mantenimiento, accesibilidad o inversión. A partir de ella se eligen activos, variables, frecuencia y nivel de precisión.",
    context: [
      "Copiar todo el entorno físico suele elevar el coste sin mejorar la decisión.",
      "Un gemelo útil puede ser pequeño si representa bien las restricciones que afectan al escenario estudiado.",
    ],
    checks: [
      "Decisión y horizonte que se quiere simular.",
      "Inventario y estado de los activos.",
      "Variables observadas y variables estimadas.",
      "Frecuencia con la que el modelo debe actualizarse.",
      "Error tolerable para comparar escenarios.",
    ],
    method: [
      { title: "Acotar", text: "Elegimos una decisión, un territorio y un horizonte." },
      { title: "Representar", text: "Modelamos solo los activos y relaciones que cambian el resultado." },
      { title: "Calibrar", text: "Comparamos el comportamiento simulado con periodos observados." },
      { title: "Ensayar", text: "Cada escenario declara supuestos, datos y margen de error." },
    ],
    stopSignals: [
      "El inventario de activos no tiene fecha ni responsable.",
      "La decisión exige una precisión que los sensores no pueden aportar.",
      "El modelo no reproduce periodos históricos básicos.",
      "Los escenarios cambian variables que la organización no puede controlar.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "medir-agua-datos-incompletos",
    title: "¿Cómo estimar cantidad y calidad del agua con datos incompletos?",
    description:
      "Un diseño de medición que distingue observación, estimación e incertidumbre.",
    answer:
      "Primero se construye un balance de entradas, salidas y puntos de medición. Las lagunas se estiman con un modelo que declara su incertidumbre y se contrasta en periodos con observaciones suficientes.",
    context: [
      "Los sensores fallan, cambian de calibración y no siempre cubren el mismo periodo.",
      "Rellenar huecos sin conservar su origen puede producir una serie limpia que transmite una seguridad falsa.",
    ],
    checks: [
      "Variables, unidades y frecuencia de cada fuente.",
      "Calibración y mantenimiento de sensores.",
      "Periodos sin observación y causa de la ausencia.",
      "Restricciones físicas del balance.",
      "Uso que se hará de la estimación.",
    ],
    method: [
      { title: "Alinear", text: "Unificamos tiempo, unidades y ubicación sin borrar las banderas de calidad." },
      { title: "Balancear", text: "Aplicamos restricciones físicas y detectamos incoherencias." },
      { title: "Estimar", text: "Probamos métodos simples y modelos con intervalos de incertidumbre." },
      { title: "Contrastar", text: "Reservamos periodos completos para medir el error real." },
    ],
    stopSignals: [
      "No se conoce la calibración de las fuentes principales.",
      "Las entradas y salidas incumplen de forma persistente el balance físico.",
      "El intervalo de incertidumbre no permite tomar la decisión prevista.",
      "El modelo oculta qué puntos son observados y cuáles estimados.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "ocupacion-via-publica-datos-geoespaciales",
    title: "¿Cómo verificar ocupaciones de vía pública con datos jurídicos y geoespaciales?",
    description:
      "Una arquitectura para relacionar permisos, geometrías, fechas y observaciones sin convertir una alerta en una sanción automática.",
    answer:
      "El sistema debe relacionar la geometría autorizada, su periodo de vigencia y la observación disponible. Las discrepancias generan expedientes de revisión con evidencia; no una conclusión automática.",
    context: [
      "La misma ubicación puede tener autorizaciones sucesivas, geometrías imprecisas y cambios temporales.",
      "Una coincidencia espacial necesita contexto jurídico y temporal para ser útil.",
    ],
    checks: [
      "Sistema de referencia y precisión de las geometrías.",
      "Vigencia, condiciones y versión del permiso.",
      "Fecha y calidad de la observación.",
      "Tolerancias espaciales según el tipo de ocupación.",
      "Procedimiento de revisión y alegación.",
    ],
    method: [
      { title: "Normalizar", text: "Unificamos referencias espaciales, fechas e identificadores." },
      { title: "Relacionar", text: "Cruzamos permisos y observaciones con tolerancias explícitas." },
      { title: "Explicar", text: "Cada alerta conserva geometría, regla, fecha y documento asociado." },
      { title: "Revisar", text: "Una persona clasifica la discrepancia y puede corregir los datos." },
    ],
    stopSignals: [
      "La precisión espacial es menor que la tolerancia de la regla.",
      "Los permisos no conservan su historial de versiones.",
      "La observación no tiene fecha fiable.",
      "La interfaz presenta una coincidencia como infracción confirmada.",
    ],
    relatedCapability: "data-intelligence",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
  {
    slug: "industrializar-modelo-predictivo-tiempo-real",
    title: "¿Cómo industrializar un modelo predictivo que debe responder en tiempo real?",
    description:
      "Criterios para pasar de experimentos temporales a un servicio reproducible, observable y probado bajo carga.",
    answer:
      "El modelo debe validarse con la información que existía en cada instante, superar una referencia simple y mantener el rendimiento en los regímenes más exigentes. Después hay que probar el sistema completo: ingestión, concurrencia, latencia, trazabilidad, degradación y reentrenamiento.",
    context: [
      "Una buena métrica offline no demuestra que el sistema pueda responder cuando llegan muchos eventos, faltan fuentes o cambia el contexto operacional.",
      "La arquitectura final debe elegirse después de comparar alternativas reproducibles. El coste y la mantenibilidad forman parte del resultado, no son tareas posteriores.",
    ],
    checks: [
      "Evento que dispara la predicción y horizontes que debe cubrir.",
      "Momento real de disponibilidad de cada dato, no solo su fecha nominal.",
      "Baseline y partición temporal reservada para la aceptación.",
      "Regímenes de alta carga, casos poco frecuentes y segmentos críticos.",
      "Latencia máxima, concurrencia y respuesta ante entradas inválidas o tardías.",
      "Artefactos necesarios para reproducir, vigilar y reentrenar una versión.",
    ],
    method: [
      {
        title: "Reconstruir el instante",
        text: "Cada ejemplo conserva qué datos estaban disponibles y qué versión de las fuentes produjo la decisión.",
      },
      {
        title: "Comparar en el tiempo",
        text: "Las alternativas se evalúan contra el baseline en periodos futuros y en escenarios de carga separados.",
      },
      {
        title: "Elegir arquitectura",
        text: "Solo continúan los componentes cuya mejora compensa su latencia, coste y dificultad de mantenimiento.",
      },
      {
        title: "Probar el servicio",
        text: "Repetimos escenas históricas y medimos ingestión, inferencia concurrente, errores, telemetría y recuperación.",
      },
      {
        title: "Promover con evidencia",
        text: "Datos, código, configuración, métricas y contenedor quedan unidos a un identificador antes de aceptar una versión.",
      },
    ],
    stopSignals: [
      "La evaluación utiliza datos que en operación llegarían después de la predicción.",
      "La media global oculta una degradación relevante en alta carga o casos críticos.",
      "El servicio no cumple latencia o pierde eventos cuando aumenta la concurrencia.",
      "No se puede reconstruir qué datos, código y configuración generaron una salida.",
      "No existe una respuesta acordada para datos tardíos, deriva o pérdida de calibración.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt: publicationDate,
    updatedAt: publicationDate,
  },
];

const reviewedInsights = new Set(["prompt-injection-agentes-herramientas", "rag-abstencion-evidencia", "drift-calibracion-modelos", "exist-modalidades-aportan-valor", "exist-llm-mediador-semantico"]);
const previousInsights = [...additionalInsights, ...priorityInsights, ...foundationalInsights].map((insight) => ({
  ...insight,
  updatedAt: reviewedInsights.has(insight.slug) ? "2026-08-28" : "2026-08-27",
}));
export const insights = [...enterpriseInsights, ...rdInsights, ...previousInsights].map((insight) => ({
  ...insight,
  example: insightExamples[insight.slug],
}));

export const researchEvidence = {
  slug: "exist-2026",
  title: "GEMF en EXIST 2026",
  description:
    "Sistema multimodal para caracterización de sexismo en memes, con enriquecimiento semántico, aprendizaje con desacuerdo y evaluación oficial.",
  context: [
    "GEMF estudia la caracterización de sexismo en memes bilingües. El sistema combina OCR, interpretación semántica multimodal, encoders multilingües y señales fisiológicas. El entrenamiento utiliza distribuciones de anotadores en lugar de reducir el desacuerdo a una sola etiqueta mayoritaria.",
    "Gemini actúa como mediador semántico offline. Produce una representación estructurada del contenido visual y pragmático; el clasificador supervisado utiliza después esa representación junto con el resto de modalidades.",
  ],
  contributions: [
    "Comparación de representaciones visuales y enriquecimiento semántico multimodal.",
    "Aprendizaje con soft labels para conservar el desacuerdo entre anotadores.",
    "Heads específicos para detección binaria, intención y categorización multietiqueta.",
    "Calibración, ablación de modalidades y análisis de errores por subtarea.",
    "Publicación del prompt, configuraciones, runs y guía de reproducción.",
  ],
  weakResult: "Task 2.3 hard quedó en la posición 132 de 187. El mismo sistema obtuvo 10 de 118 en soft. La divergencia exige revisar la binarización y los umbrales; las posiciones, por sí solas, no permiten aislar la causa del deterioro.",
  reproduction: "El dataset no se redistribuye. Quien quiera reproducir el trabajo debe obtenerlo de los organizadores y aceptar sus condiciones.",
  results: [
    "1.º de 144 en Task 2.1, detección binaria, evaluación soft.",
    "1.º de 117 en Task 2.2, intención de la fuente, evaluación soft.",
    "1.º de 186 en Task 2.2, intención de la fuente, evaluación hard.",
    "3.º de 217 en Task 2.1, detección binaria, evaluación hard.",
  ],
  limitations: [
    "El enriquecimiento semántico depende de un único intérprete multimodal.",
    "La categorización hard de Task 2.3 mostró sobreajuste de umbrales.",
    "Las salidas auxiliares del modelo multimodal no se consideran verdad de referencia.",
    "El conjunto de datos tiene condiciones de uso propias y no se redistribuye en el repositorio.",
  ],
  links: [
    { label: "Repositorio y guía de reproducción", url: "https://github.com/cofrian/exist2026-ordantis" },
    { label: "Paper publicado", url: "https://clef-staging.pages.dev/paper174.pdf" },
    { label: "Resultados oficiales EXIST 2026", url: "https://clef-staging.pages.dev/paper152.pdf" },
  ] satisfies ReferenceLink[],
} as const;

export function getCapability(slug: string) {
  return capabilities.find((capability) => capability.slug === slug);
}

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
