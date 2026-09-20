import { capabilities, insights, researchEvidence, siteConfig } from "./site.ts";
import { dataQualityLab } from "./labs.ts";
import { ragBenchmarkLab } from "./rag-benchmark.ts";
import { agentEvaluationLab } from "./agent-evaluation.ts";
import { documentIntelligenceLab } from "./document-intelligence.ts";
import { diagnostic } from "./diagnostic.ts";
import { companyRegistration } from "./identity.ts";

export type ContentSection = {
  title: string;
  eyebrow?: string;
  paragraphs: string[];
  items?: string[];
  links?: { path: string; label: string }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
};

export type StaticPage = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  sections: ContentSection[];
  indexable?: boolean;
};

export const staticPages: StaticPage[] = [
  {
    path: "/empresa",
    title: "Empresa",
    description:
      "Ordantis: desarrollo de modelos de machine learning, ciencia de datos, sistemas de IA e investigación aplicada para empresas y administraciones públicas en España.",
    eyebrow: "Ordantis",
    lead:
      "Ordantis es una empresa española especializada en machine learning, ciencia de datos y sistemas de inteligencia artificial. Trabajamos con empresas que necesitan desarrollar modelos, invertir en I+D o integrar sistemas exigentes, y con administraciones que plantean retos GovTech.",
    sections: [
      {
        eyebrow: "Misión",
        title: "Desarrollar modelos y sistemas que respondan a un problema concreto.",
        paragraphs: [
          "Una empresa puede necesitar anticipar carga, estudiar fallos de equipos o planificar recursos. Una administración, estimar demanda de un servicio o relacionar fuentes territoriales. La especialidad técnica es común, pero la decisión, los datos y las condiciones de aceptación cambian.",
          "Revisamos los métodos disponibles y el histórico antes de elegir una arquitectura. La comparación utiliza datos representativos, una referencia reproducible y métricas vinculadas al uso previsto. Cuando la viabilidad técnica está abierta, definimos una línea de investigación con sus propios ensayos.",
          "La entrega puede incluir el modelo, las interfaces y las pruebas para integrarlo. El alcance especifica operación, revisión humana y mantenimiento; no se confunden una demo, un experimento y un servicio operativo.",
        ],
      },
      {
        eyebrow: "Visión",
        title: "Acercar la investigación a la aplicación.",
        paragraphs: [
          "La investigación y la ingeniería tienen entregas distintas. Un experimento resuelve una hipótesis; un sistema integrado también necesita interfaces, pruebas operativas y responsables de mantenimiento.",
          "Colaboramos con el equipo receptor para definir ese recorrido y las condiciones de transferencia. El acceso a código, modelos y datos se acuerda según los derechos y dependencias de cada proyecto.",
        ],
      },
      {
        title: "Qué publicamos como evidencia",
        paragraphs: [
          "Diferenciamos investigación, propuestas y sistemas ejecutados. Una propuesta técnica describe una línea de trabajo posible; no la presentamos como caso de éxito.",
          "Los resultados de research incluyen fuente, autores, método y limitaciones. EXIST 2026 es la primera evidencia publicada con este formato.",
        ],
      },
      {
        title: "Ámbitos de trabajo",
        paragraphs: [],
        items: ["GovTech y administraciones públicas", ...capabilities.slice(0, 3).map((capability) => capability.title)],
        links: [{ path: "/govtech", label: "Retos públicos, evaluación y entregables" }, { path: "/capacidades", label: "Desarrollo de modelos y sistemas" }],
      },
      {
        eyebrow: "Áreas de servicio",
        title: "Desde Albacete, para organizaciones de toda España.",
        paragraphs: [
          "Ordantis tiene su domicilio registral en Albacete y presta servicios a organizaciones de toda España. En Valencia mantiene una relación con el ecosistema UPV; es un área de servicio, no una oficina comercial.",
        ],
        links: [
          { path: "/inteligencia-artificial-albacete", label: "Inteligencia artificial en Albacete" },
          { path: "/inteligencia-artificial-valencia", label: "Inteligencia artificial y datos en Valencia" },
        ],
      },
    ],
  },
  {
    path: "/inteligencia-artificial-albacete",
    title: "Empresa de inteligencia artificial en Albacete",
    description:
      "Machine learning y ciencia de datos desde Albacete: modelos predictivos, sistemas de IA e I+D aplicada para empresas y administraciones públicas en España.",
    eyebrow: "Albacete · área local",
    lead:
      "Ordantis tiene su domicilio registral en Albacete y desarrolla modelos de machine learning, análisis de datos y sistemas de IA para empresas y administraciones. El trabajo puede ser desarrollo, I+D o integración, según la solución que ya existe y lo que queda por demostrar.",
    sections: [
      {
        title: "Qué hace Ordantis en Albacete",
        paragraphs: [
          "Desarrollamos modelos predictivos y sistemas de datos para problemas de demanda, mantenimiento y planificación. La predicción de carga, el análisis territorial y la calidad de sensores necesitan datos y criterios de aceptación distintos.",
          "Podemos abordar desde la calidad e integración de datos hasta una prueba de I+D aplicada. Cada propuesta identifica entradas, entregables, criterios de aceptación y lo que queda fuera antes de construir.",
        ],
        links: [
          { path: "/capacidades", label: "Revisar los servicios y sus entregables" },
          { path: "/diagnostico", label: "Iniciar diagnóstico" },
        ],
      },
      {
        title: "Cómo elegir una empresa de IA en Albacete",
        paragraphs: [
          "No existe una empresa que sea la mejor para cualquier proyecto. Para comparar proveedores conviene pedir una hipótesis verificable, una referencia sencilla, datos de evaluación separados y una condición de parada. Una demo atractiva no demuestra que el sistema funcione con los casos difíciles del proceso.",
          "También hay que saber quién podrá acceder a cada fuente, qué acciones requieren aprobación, cómo se revisará un error y qué coste tendrá mantener la integración. Ordantis publica estas preguntas porque permiten descartar proyectos que no deberían empezar.",
        ],
        links: [
          { path: "/capacidades/investigacion-desarrollo", label: "Cómo definimos un proyecto de I+D" },
          { path: "/research/exist-2026", label: "Ver una investigación con resultados y limitaciones" },
        ],
      },
      {
        title: "Problemas que podemos evaluar",
        paragraphs: [],
        items: [
          "Fuentes territoriales, sensores y registros con distintas unidades, frecuencias y niveles de fiabilidad.",
          "Hipótesis de modelado que requieren comparar arquitecturas y medir la contribución de cada componente.",
          "Predicción de demanda, carga o riesgo con validación temporal y seguimiento del deterioro.",
          "Planificación de recursos con restricciones de capacidad, desplazamiento y cobertura.",
          "Procedimientos públicos o territoriales que necesitan trazabilidad y revisión humana.",
        ],
      },
      {
        title: "Relación verificable con Albacete",
        paragraphs: [
          "El domicilio de Ordantis consta en el Registro Mercantil de Albacete. La sociedad también figura entre los ocho proyectos finalistas del programa Sherpa 2025 de FEDA. Son datos de identidad y participación; no se presentan como certificaciones técnicas ni como resultados de clientes.",
          "El domicilio publicado es registral, no una oficina abierta al público. Las reuniones presenciales o remotas se acuerdan previamente mediante el canal de contacto.",
        ],
        links: [
          { path: companyRegistration.source, label: "Comprobar la inscripción publicada en el BORME" },
          { path: "https://www.feda.es/actualidad/noticias/item/13650-el-programa-sherpa-de-feda-ya-tiene-los-ocho-finalistas-para-un-total-de-15-000-euros-en-premios", label: "Consultar los finalistas de Sherpa 2025" },
          { path: "/diagnostico", label: "Iniciar diagnóstico" },
        ],
      },
    ],
  },
  {
    path: "/inteligencia-artificial-valencia",
    title: "Inteligencia artificial y ciencia de datos en Valencia",
    description:
      "Machine learning, ciencia de datos y sistemas de IA para empresas y administraciones de Valencia. I+D aplicada y evaluación de modelos; área de servicio de Ordantis.",
    eyebrow: "Valencia · área de servicio",
    lead:
      "Ordantis presta servicios de inteligencia artificial y datos a organizaciones de Valencia y mantiene una relación verificable con el ecosistema de la Universitat Politècnica de València. No publicamos una sede ni una oficina comercial en Valencia: es un área de servicio y colaboración.",
    sections: [
      {
        title: "Proyectos para empresas y administraciones de Valencia",
        paragraphs: [
          "Una empresa puede partir de un histórico de producción, consumo o incidencias y una decisión que necesita anticipar. El proyecto puede desarrollar un modelo, revisar uno existente o investigar una arquitectura nueva. Acordamos qué parte desarrolla Ordantis y qué necesita el equipo receptor para integrarla.",
          "La evaluación compara métodos con los mismos datos reservados y registra límites de precisión, cómputo e integración. Los resultados negativos forman parte de la entrega; no se convierten en un caso de éxito ficticio.",
        ],
        links: [
          { path: "/capacidades", label: "Comparar servicios, entregables y límites" },
          { path: "/capacidades/investigacion-desarrollo", label: "Cómo planteamos una prueba de I+D aplicada" },
        ],
      },
      {
        title: "Cómo evaluar un proveedor de machine learning e I+D en IA",
        paragraphs: [
          "Para elegir un proveedor de machine learning o I+D en inteligencia artificial en Valencia conviene revisar qué evidencia corresponde al problema que quieres resolver. La evaluación debe incluir una referencia, datos reservados, análisis de errores e integración, con acceso y derechos de uso acordados.",
          "En predicción, el corte temporal debe reproducir la información disponible al decidir. En un sistema territorial, una lectura necesita unidad, localización y fecha. En investigación multimodal, las comparaciones deben aislar la aportación de cada fuente. Estos controles permiten contrastar una propuesta con preguntas concretas.",
        ],
        links: [
          { path: "/insights/data-leakage-validacion-temporal", label: "Validación temporal y fuga de datos" },
          { path: "/insights/sensores-defectuosos-confianza-dato", label: "Sensores y fiabilidad de las observaciones" },
          { path: "/insights/exist-modalidades-aportan-valor", label: "Cómo medir qué aporta cada modalidad" },
        ],
      },
      {
        title: "Relación verificable con Valencia",
        paragraphs: [
          "Ordantis forma parte del ecosistema emprendedor de StartUPV y recibe acompañamiento de Start.inf, el programa de emprendimiento de la ETSINF. También fue finalista en la categoría Empresa de los Premios Talento Joven de la Comunitat Valenciana 2026.",
          "Estas referencias acreditan participación en el ecosistema y un reconocimiento publicado. No acreditan una sede, una certificación de servicios ni resultados para clientes, por lo que se mantienen separadas de la oferta técnica.",
        ],
        links: [
          { path: "https://www.upv.es/entidades/ideas/", label: "Programa IDEAS · StartUPV" },
          { path: "https://www.inf.upv.es/", label: "ETSINF · Universitat Politècnica de València" },
          { path: "https://www.levante-emv.com/comunitat-valenciana/2026/02/10/finalistas-premios-talento-joven-2026-126518511.html", label: "Finalistas de los Premios Talento Joven 2026" },
        ],
      },
      {
        title: "Cómo empezaría el proyecto",
        paragraphs: [
          "La primera reunión puede ser remota o presencial si se acuerda previamente. No hace falta enviar documentos confidenciales: basta describir la decisión, las fuentes existentes, el volumen aproximado y qué no puede fallar.",
          "Con esa información indicamos si conviene una sesión de diagnóstico, una muestra autorizada o detener la idea hasta resolver datos, permisos o responsabilidades.",
        ],
        links: [
          { path: "/diagnostico", label: "Iniciar diagnóstico" },
        ],
      },
    ],
  },
  {
    path: "/govtech",
    title: "IA y datos para administraciones públicas · GovTech",
    description:
      "Machine learning, datos territoriales e I+D aplicada para administraciones públicas: predicción de demanda, planificación y sistemas de IA para retos GovTech.",
    eyebrow: "GovTech",
    lead:
      "Desarrollamos modelos y sistemas de IA para estimar demanda de servicios, evaluar cobertura territorial y apoyar la planificación de recursos públicos. El alcance reúne evaluación e integración con el organismo; incorpora I+D cuando hay una incertidumbre técnica que resolver.",
    sections: [
      {
        title: "Retos públicos que podemos evaluar",
        paragraphs: ["Estos son tipos de problema que podemos estudiar, no casos de clientes ni resultados ya obtenidos. La primera prueba determina si hay datos y evidencia suficientes para continuar."],
        items: [
          "Anticipar demanda de servicios y detectar dónde falla un modelo durante picos o cambios de capacidad.",
          "Evaluar cobertura de equipamientos mediante accesibilidad real, oferta disponible y datos territoriales con distinta vigencia.",
          "Distinguir una anomalía ambiental de una avería del sensor y conservar ambas hipótesis cuando falta evidencia.",
          "Comparar asignaciones de recursos bajo restricciones de capacidad, desplazamiento y cobertura mínima.",
          "Relacionar documentos, registros y geometrías cuando las fuentes se contradicen o no identifican igual el mismo activo.",
        ],
      },
      {
        title: "Qué investigaríamos en cada problema",
        paragraphs: ["La técnica se elige después de concretar la decisión. Un mapa de relaciones puede bastar para una consulta; una red neuronal de grafos necesita demostrar una aportación predictiva adicional."],
        table: {
          caption: "Ejemplos de alcance técnico; no describen proyectos ejecutados.",
          headers: ["Problema", "Pregunta que debe resolver la prueba", "Evidencia para decidir"],
          rows: [
            ["Demanda y capacidad", "¿La historia reciente y el contexto mejoran la anticipación frente al método actual?", "Error por horizonte y episodio, anticipación útil y comportamiento en saturación."],
            ["Cobertura territorial", "¿Cambian las conclusiones al usar recorridos accesibles y fuentes verificadas en lugar de distancias en línea recta?", "Áreas de influencia, registros dudosos y sensibilidad a los supuestos de acceso."],
            ["Medición ambiental", "¿La señal corresponde a un episodio real, a un cambio de cobertura o a un fallo de instrumento?", "Lectura original, contraste independiente, calidad de la fuente y periodos sin observación."],
            ["Planificación de recursos", "¿La asignación propuesta sigue siendo viable si la demanda se desvía?", "Restricciones satisfechas, coste bajo distintos escenarios y alternativa cuando no hay plan factible."],
          ],
        },
      },
      {
        title: "Predicción y planificación con datos públicos",
        paragraphs: [
          "Una estimación de demanda necesita definir territorio, horizonte y decisión. Reconstruimos qué registros estaban disponibles en cada fecha y evaluamos periodos reservados, incluidos cambios de cobertura o de procedimiento. La referencia puede ser el método actual de planificación.",
          "La aceptación distingue error del modelo y utilidad operativa. Una previsión debe llegar antes de la decisión, expresar su incertidumbre y tener una alternativa cuando los datos no sean suficientes. Un modelo de predicción no sustituye los criterios de asignación de recursos.",
        ],
        links: [{ path: "/capacidades/modelos-predictivos", label: "Desarrollo y validación de modelos predictivos" }, { path: "/insights/modelos-predictivos-picos-demanda", label: "Cómo evaluar los picos que una media puede ocultar" }, { path: "/insights/prediccion-optimizacion-asignacion-recursos", label: "De una previsión a una asignación viable" }],
      },
      {
        title: "De fuentes heterogéneas a un sistema trazable",
        paragraphs: [
          "Un registro administrativo, una geometría y una observación de sensor pueden referirse al mismo activo con identificadores y fechas diferentes. El trabajo incluye contratos de intercambio, resolución de entidades y comprobaciones de vigencia antes de combinarlos.",
          "Cada salida debe permitir volver a su origen. En un expediente, esto supone conservar documento, versión y fragmento; en una observación territorial, unidad, localización y momento de captura. Las discrepancias se mantienen visibles para revisión.",
        ],
        links: [{ path: "/capacidades/data-intelligence", label: "Ingeniería de datos y sistemas" }, { path: "/insights/ocupacion-via-publica-datos-geoespaciales", label: "Cruce de información jurídica y geoespacial" }],
      },
      {
        title: "Condiciones de diseño",
        paragraphs: [
          "Cada regla debe conservar su versión y su fuente. Cada sugerencia debe enlazar con la evidencia que la originó. Las alertas abren una revisión; no se convierten por sí solas en una resolución.",
          "La protección de datos se decide en la arquitectura: minimización, permisos, conservación y registro de accesos. La revisión jurídica concreta corresponde a profesionales competentes y al responsable del tratamiento.",
        ],
      },
      {
        title: "Cómo se prepara un reto GovTech",
        paragraphs: [
          "Acotamos el problema con el equipo del organismo, seleccionamos una muestra autorizada y definimos la referencia de comparación. Después medimos errores por tipo y efecto, no solo una media. El resultado puede justificar una integración, pedir más datos o cerrar la línea de trabajo.",
          "Antes de ejecutar el piloto se revisan las condiciones del reto o proyecto: acceso a datos, entorno de prueba, entregables, derechos de uso y responsables de aceptación. La preparación de una propuesta no se presenta como una adjudicación ni como un sistema ya implantado.",
        ],
        links: [{ path: "/insights/evaluar-piloto-ia-administracion-publica", label: "Qué puede demostrar un piloto y qué necesita otra evaluación" }],
      },
      {
        title: "Qué no demuestra por sí solo un piloto",
        paragraphs: [
          "Menos alertas pueden significar menos problemas o menos observación. El informe separa tiempo de cobertura, datos utilizables y casos pendientes de revisión. Para medir omisiones hace falta una referencia independiente de las alertas del propio sistema.",
          "Una mejora técnica tampoco acredita impacto en el servicio. Distinguimos error del modelo, carga de trabajo del personal y efecto de la intervención. Si la muestra o el diseño solo permiten una conclusión preliminar, la entrega lo declara antes de proponer una ampliación.",
        ],
      },
      {
        title: "Entregables y transferencia al organismo",
        paragraphs: ["Se acuerdan según el alcance y las condiciones del proyecto. La entrega de un experimento y la operación continuada del sistema son compromisos distintos."],
        items: [
          "Protocolo experimental y criterios de aceptación vinculados al problema público.",
          "Contratos de datos, reglas de calidad y documentación de procedencia.",
          "Modelo o componente desarrollado, configuraciones y evaluación reproducible.",
          "Interfaces, pruebas operativas y documentación para el equipo receptor.",
          "Condiciones de uso, revisión humana y responsabilidades de seguimiento.",
        ],
        links: [{ path: "/capacidades/investigacion-desarrollo", label: "Método de investigación y desarrollo" }, { path: "/research/exist-2026", label: "Una investigación publicada: método y limitaciones" }],
      },
      {
        title: "Qué necesitamos para estudiar el reto",
        paragraphs: [
          "Describe la decisión, quién la toma, con qué anticipación y cómo se resuelve hoy. Necesitamos saber qué fuentes existen, quién puede autorizar su uso y qué resultado permitiría comprobar una mejora. En el primer contacto basta esa descripción; no envíes documentos confidenciales.",
          "En predicción, revisaremos fechas de disponibilidad y resultados observados. En un análisis territorial, cobertura, unidades e identificadores. Si el reto incluye expedientes, también harán falta versiones vigentes y evidencia que permita contrastar las extracciones. La muestra y sus permisos se acuerdan después.",
        ],
        links: [
          { path: "/insights/incertidumbre-prediccion-series-temporales", label: "Cómo comprobar la incertidumbre de una predicción" },
          { path: "/insights/datos-territoriales-decisiones-publicas", label: "Cómo relacionar fuentes territoriales" },
          { path: "/diagnostico", label: "Iniciar diagnóstico" },
        ],
      },
    ],
  },
  {
    path: "/research",
    title: "Research",
    description:
      "Investigación, resultados reproducibles y análisis de limitaciones publicados por Ordantis.",
    eyebrow: "Evidencia técnica",
    lead:
      "Publicamos research cuando podemos enlazar el método, los resultados y sus límites. El objetivo es que otra persona pueda revisar qué se hizo y qué quedó sin resolver.",
    sections: [
      {
        title: researchEvidence.title,
        paragraphs: [
          researchEvidence.description,
          "El repositorio contiene código, configuraciones, resultados, guía de reproducción y el mapa entre el artículo y los artefactos.",
        ],
        items: [...researchEvidence.results],
      },
    ],
  },
  {
    path: "/insights",
    title: "Guías de machine learning, datos e I+D en IA",
    description:
      "Guías de machine learning, ciencia de datos e I+D en IA para empresas y retos GovTech: validación temporal, incertidumbre, fuentes e integración de modelos.",
    eyebrow: "Insights",
    lead:
      "Cómo separar entrenamiento y prueba, comparar métodos, evaluar datos territoriales o llevar un modelo a un entorno operativo. Las guías explican decisiones de investigación e ingeniería; cada una indica si parte de una propuesta, un ejemplo didáctico o resultados publicados.",
    sections: [
      {
        title: "Preguntas publicadas",
        paragraphs: [],
        items: insights.map((insight) => insight.title),
      },
    ],
  },
  {
    path: "/labs",
    title: "Labs",
    description:
      "Laboratorios didácticos de evaluación de datos y componentes de IA. Método, datos sintéticos y límites, separados de la investigación publicada de Ordantis.",
    eyebrow: "Trabajo experimental",
    lead:
      "Estos ejemplos interactivos permiten explorar reglas de calidad y evaluación con datos sintéticos. No acreditan el rendimiento de modelos entrenados ni resultados de clientes. Los experimentos publicados y sus resultados están en Research; las líneas pendientes se identifican al final.",
    sections: [
      {
        title: dataQualityLab.title,
        paragraphs: [dataQualityLab.description, dataQualityLab.scope],
        links: [{ path: dataQualityLab.path, label: "Abrir la demo de calidad de datos" }],
      },
      {
        title: ragBenchmarkLab.title,
        paragraphs: [ragBenchmarkLab.description, ragBenchmarkLab.scope],
        links: [{ path: ragBenchmarkLab.path, label: "Abrir el benchmark de recuperación y abstención" }],
      },
      {
        title: agentEvaluationLab.title,
        paragraphs: [agentEvaluationLab.description, agentEvaluationLab.scope],
        links: [{ path: agentEvaluationLab.path, label: "Abrir la evaluación de permisos y herramientas" }],
      },
      {
        title: documentIntelligenceLab.title,
        paragraphs: [documentIntelligenceLab.description, documentIntelligenceLab.scope],
        links: [{ path: documentIntelligenceLab.path, label: "Abrir la evaluación de extracción y evidencia" }],
      },
      {
        title: "Líneas en preparación",
        paragraphs: [
          "Las siguientes líneas forman parte del roadmap técnico. Todavía no se presentan como herramientas terminadas ni como benchmarks publicados.",
        ],
        items: [
          "Data Quality Lab: ampliación a fuentes autorizadas y contratos de datos propios.",
          "Forecasting Lab: backtesting temporal, calibración y deterioro.",
        ],
      },
    ],
  },
  {
    path: "/contacto",
    title: "Contacto",
    description:
      "Contacta con Ordantis para revisar la viabilidad de un problema de inteligencia artificial, datos o GovTech.",
    eyebrow: "Contacto",
    lead:
      "Cuéntanos qué decisión quieres mejorar, qué datos existen y qué no puede fallar. Con esa información podemos decir si conviene una sesión de diagnóstico, una prueba acotada o ninguna de las dos.",
    sections: [
      {
        title: "Qué conviene incluir",
        paragraphs: [],
        items: [
          "La decisión o tarea que hoy consume tiempo o produce errores.",
          "Las fuentes disponibles y quién puede autorizar su uso.",
          "El volumen aproximado y los casos difíciles conocidos.",
          "Las restricciones jurídicas, técnicas o de plazo.",
        ],
      },
      {
        title: "Correo",
        paragraphs: [`Puedes escribir a ${siteConfig.email}. No envíes datos personales sensibles ni documentos confidenciales en el primer mensaje.`],
      },
    ],
  },
  {
    path: "/privacidad",
    title: "Política de privacidad",
    description: "Tratamientos, bases jurídicas, destinatarios, conservación y derechos sobre los datos personales en la web de Ordantis.",
    eyebrow: "Información legal",
    lead:
      "Explicamos qué datos puede tratar esta web, para qué, durante cuánto tiempo y qué proveedores intervienen. No utilizamos los datos de una consulta para publicidad ni para entrenar modelos.",
    sections: [
      {
        title: "Responsable y contacto",
        paragraphs: [
          `${siteConfig.legalName}, NIF ${companyRegistration.nif}, es responsable de los datos enviados por los canales de contacto indicados en esta web. Domicilio registral publicado: ${companyRegistration.streetAddress}, ${companyRegistration.postalCode} ${companyRegistration.addressLocality}, España. Para cuestiones de privacidad: ${siteConfig.email}.`,
          "El domicilio es registral y no una oficina abierta al público.",
        ],
        links: [{ path: "/aviso-legal", label: "Identificación de la sociedad y fuente registral" }],
      },
      {
        title: "Tratamientos y bases jurídicas",
        paragraphs: [
          "La base no se elige mediante una casilla genérica. Depende de la finalidad concreta y se indica a continuación. No se toman decisiones automatizadas con efectos jurídicos sobre quien contacta.",
        ],
        table: {
          caption: "Tratamientos previstos en la web",
          headers: ["Tratamiento", "Datos", "Finalidad", "Base jurídica"],
          rows: [
            ["Consulta profesional", "Nombre, email, empresa, cargo y contenido que la persona decida facilitar.", "Responder, valorar el encaje de una solicitud y mantener la conversación solicitada.", "Medidas precontractuales solicitadas por la persona, artículo 6.1.b RGPD. Para consultas profesionales no precontractuales, interés legítimo en responderlas, artículo 6.1.f RGPD."],
            ["Diagnóstico", "Respuestas, contexto, perfil profesional y email si se facilita.", "Preparar un resumen y, únicamente si se pulsa Enviar, tramitarlo al buzón de Ordantis.", "Medidas precontractuales solicitadas por la persona, artículo 6.1.b RGPD. Los campos de perfil son opcionales."],
            ["Analítica", "Identificadores seudónimos, páginas, eventos, origen aproximado, dispositivo y datos técnicos.", "Medir uso, rendimiento y acciones de contacto; distinguir tráfico procedente de asistentes de IA.", "Consentimiento, artículo 6.1.a RGPD y artículo 22.2 LSSI. Se puede rechazar sin perder funciones."],
            ["Alojamiento y seguridad", "IP, fecha, URL solicitada, cabeceras del navegador, resultado de la petición, errores y señales de seguridad.", "Entregar la web, prevenir abuso, diagnosticar errores y mantener disponibilidad.", "Interés legítimo en la seguridad y funcionamiento del servicio, artículo 6.1.f RGPD."],
          ],
        },
      },
      {
        title: "Información en el contacto y el diagnóstico",
        paragraphs: [
          "Antes de enviar se muestra una primera capa con responsable, finalidad, base, destinatarios, conservación y derechos. La casilla confirma que esa información se ha podido leer; no autoriza publicidad ni sustituye la base necesaria para responder a la solicitud.",
          "El email es necesario para responder cuando se envía el diagnóstico. Nombre, empresa, cargo, web y demás datos de perfil son opcionales. En Contacto, la persona decide el contenido y confirma el envío desde su propia aplicación de correo.",
          "No incluyas categorías especiales de datos, credenciales, secretos empresariales ni documentos confidenciales. Si un proyecto necesita una muestra, finalidad, acceso, entorno y conservación se acuerdan por separado.",
        ],
      },
      {
        title: "Cuestionario y envío de consultas",
        paragraphs: [
          "El diagnóstico mantiene las respuestas en memoria mientras completas la página. No hay guardado automático en un servidor. Puedes revisar el resumen, copiarlo o descargarlo. Al abrir un borrador, los datos pasan a la aplicación de correo que elijas; debes decidir allí si los envías.",
          "Solo el diagnóstico dispone de envío directo. Antes de transmitir el email y el resumen revisado, Cloudflare Turnstile comprueba que la petición procede de una interacción humana válida. El token es de un solo uso y el servidor exige la acción y el dominio esperados. Superada esa comprobación, el Worker de Ordantis procesa la petición y Cloudflare Email Service envía el mensaje desde web@ordantis.com a contacto@ordantis.com, que lo reenvía a los buzones internos autorizados de Ordantis alojados en Google. La confirmación técnica no acredita entrega ni lectura por Ordantis.",
          "La página Contacto no tiene un segundo formulario: abre un borrador en la aplicación de correo de la persona. No se utiliza un proveedor externo de formularios ni se conserva una copia del diagnóstico en una base de datos de la web. Cloudflare puede generar registros técnicos de la petición y del resultado del envío; el contenido no se escribe deliberadamente en los logs de aplicación.",
        ],
        links: [{ path: "https://developers.cloudflare.com/email-service/", label: "Documentación de Cloudflare Email Service" }],
      },
      {
        title: "Destinatarios y transferencias internacionales",
        paragraphs: [
          "Los proveedores actúan únicamente para las funciones indicadas. Los datos no se venden ni se ceden para publicidad propia de Ordantis. Algunos proveedores globales pueden tratar información fuera del Espacio Económico Europeo; antes del lanzamiento deben comprobarse el contrato, las cláusulas contractuales tipo u otra garantía aplicable y la configuración efectiva de la cuenta.",
        ],
        table: {
          caption: "Proveedores y acceso a datos",
          headers: ["Proveedor", "Intervención", "Datos o acceso", "Transferencias"],
          rows: [
            ["Cloudflare", "DNS, proxy, Turnstile, seguridad, ejecución de Workers, logs y encaminamiento del correo corporativo.", "IP, peticiones, errores, señales de seguridad y metadatos necesarios para verificar la interacción, entregar o proteger el servicio.", "Proveedor global con posible tratamiento internacional. Publica DPA, cláusulas contractuales tipo y adhesión al marco UE-EE. UU.; debe conservarse la documentación contractual aplicable a la cuenta."],
            ["Google Analytics 4", "Analítica opcional después de aceptar.", "Identificadores seudónimos, páginas, eventos, origen y datos técnicos. Publicidad y Google Signals están desactivados en el código.", "Puede implicar tratamiento internacional conforme a las condiciones y garantías de Google; debe verificarse la propiedad definitiva."],
            ["Microsoft Clarity", "Mapas de interacción y reconstrucciones de sesión después de aceptar.", "Interacciones, URL, dispositivo e identificadores seudónimos. El diagnóstico se marca para enmascarar su contenido.", "Puede implicar tratamiento internacional conforme a las condiciones y garantías de Microsoft; debe verificarse el enmascarado real."],
            ["Cloudflare Email Service", "Procesamiento servidor y envío transaccional del diagnóstico.", "IP y metadatos técnicos de la petición; email y resumen revisado para generar el mensaje.", "Cloudflare actúa como encargado global conforme a las condiciones y garantías aplicables a la cuenta."],
            ["Google", "Buzones internos autorizados de Ordantis que reciben los mensajes enviados a contacto@ordantis.com.", "Mensaje y datos que la persona incluya.", "El buzón está prestado por Google. Puede existir tratamiento internacional conforme a sus condiciones, DPA y garantías aplicables."],
          ],
        },
        links: [{ path: "https://www.cloudflare.com/cloudflare-customer-dpa/", label: "DPA de Cloudflare" }, { path: "https://policies.google.com/privacy", label: "Privacidad de Google" }, { path: "https://privacy.microsoft.com/privacystatement", label: "Privacidad de Microsoft" }],
      },
      {
        title: "Conservación",
        paragraphs: [
          "Los plazos del buzón y de las cuentas de proveedores deben comprobarse antes del lanzamiento. Cuando un plazo no depende directamente de Ordantis se indica el máximo publicado por el proveedor, sin presentarlo como una decisión propia.",
        ],
        table: {
          caption: "Plazos o criterios de conservación",
          headers: ["Información", "Conservación"],
          rows: [
            ["Consultas", "Mientras se atiende la solicitud. Después, solo durante el tiempo necesario para continuar la relación o atender responsabilidades; los mensajes que no den lugar a una relación deben revisarse y suprimirse cuando pierdan esa finalidad."],
            ["Diagnóstico en el navegador", "Permanece en memoria durante la visita. Se pierde al recargar salvo la copia que la persona descargue o traslade a su correo."],
            ["Diagnóstico enviado", "La web no guarda una copia en una base de datos. Cloudflare conserva los registros técnicos según el plan y Google conserva el mensaje en el buzón hasta que Ordantis lo revise o deje de ser necesario para la finalidad y posibles responsabilidades."],
            ["Google Analytics 4", "Las cookies se limitan en el código a 30 días desde su creación. La retención de datos en la propiedad debe verificarse y documentarse antes del lanzamiento."],
            ["Microsoft Clarity", "Microsoft publica 30 días para datos de reproducción y nueve meses para datos de clics, mapas y sesiones etiquetadas o favoritas."],
            ["Workers Logs", "Cloudflare publica tres días en Workers Free y siete días en Workers Paid. No se deben escribir respuestas del diagnóstico ni contenido de mensajes en logs."],
          ],
        },
      },
      {
        title: "Derechos",
        paragraphs: [
          `Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a ${siteConfig.email}. La solicitud puede requerir información suficiente para comprobar la identidad.`,
          "Responderemos sin dilación indebida y, con carácter general, dentro de un mes. Puedes retirar el permiso de analítica desde Gestionar cookies sin afectar a la licitud del tratamiento anterior. La retirada detiene la medición posterior desde esta web, pero no borra por sí sola datos ya recibidos por un proveedor.",
          "Si consideras que el tratamiento vulnera tus derechos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos. La portabilidad y la oposición se aplican cuando concurran sus requisitos legales; no se presentan como derechos absolutos en todos los tratamientos.",
        ],
        links: [{ path: "https://www.aepd.es/", label: "Agencia Española de Protección de Datos" }, { path: "/cookies", label: "Cómo cambiar o retirar el permiso de analítica" }],
      },
      {
        title: "Actualización y revisión pendiente",
        paragraphs: [
          "Revisión del recorrido de contacto: 16 de septiembre de 2026. La razón social y el NIF constan en la información legal. El diagnóstico utiliza Turnstile y se envía desde web@ordantis.com a contacto@ordantis.com, con reenvío a los buzones internos autorizados. Antes del despliegue definitivo deben comprobarse los ajustes de retención de GA4, Clarity y Google, conservar los acuerdos aplicables con los encargados y realizar una validación jurídica. Esta política no sustituye la revisión de un profesional jurídico sobre la actividad real de Ordantis.",
        ],
      },
    ],
  },
  {
    path: "/cookies",
    title: "Política de cookies",
    description: "Inventario de cookies y almacenamiento local de Ordantis, Google Analytics, Microsoft Clarity y Cloudflare.",
    eyebrow: "Información legal",
    lead:
      "Puedes navegar sin aceptar analítica. Este inventario distingue almacenamiento propio, cookies de medición y cookies técnicas que Cloudflare solo puede crear cuando aplica una función de seguridad.",
    sections: [
      {
        title: "Responsable de esta web",
        paragraphs: [`${siteConfig.legalName}, NIF ${companyRegistration.nif}. Esta identificación se publica en las páginas legales y no forma parte del contenido comercial de la web.`],
        links: [{ path: "/aviso-legal", label: "Identificación y datos registrales" }],
      },
      {
        title: "Almacenamiento propio",
        paragraphs: [
          "La aplicación no crea una cookie de sesión propia. Utiliza dos claves del almacenamiento del navegador; la segunda solo aparece después de aceptar analítica y cuando la visita procede de una fuente de IA reconocida.",
          "Si el navegador bloquea ese almacenamiento, la elección se aplica durante la visita, pero puede volver a preguntarse al recargar. No es necesario aceptar analítica para usar la web.",
        ],
        table: {
          caption: "Almacenamiento creado por Ordantis",
          headers: ["Nombre", "Tecnología y categoría", "Finalidad", "Duración"],
          rows: [
            ["ordantis-cookie-consent", "localStorage; preferencia necesaria.", "Guardar aceptación o rechazo de analítica, fecha y versión. No contiene un identificador de seguimiento.", "La decisión se revalida a los 180 días. El valor puede seguir en el navegador hasta cambiar la elección o borrar los datos del sitio."],
            ["ordantis-ai-organic-recorded", "sessionStorage; analítica.", "Evitar duplicar el evento de procedencia de IA dentro de una misma pestaña o sesión.", "Sesión de la pestaña; solo después de aceptar analítica y detectar esa procedencia."],
          ],
        },
      },
      {
        title: "Google Analytics 4",
        paragraphs: [
          "GA4 solo se carga en ordantis.com o www.ordantis.com después de aceptar analítica. Mide páginas y acciones de contacto. El código desactiva Google Signals, almacenamiento publicitario y personalización, limita las cookies a 30 días desde su creación y evita renovar el plazo en cada visita.",
        ],
        table: {
          caption: "Cookies de Google Analytics 4",
          headers: ["Nombre", "Titular y tipo", "Finalidad", "Duración en Ordantis"],
          rows: [
            ["_ga", "Google; analítica, primera parte.", "Distinguir navegadores mediante un identificador seudónimo.", "30 días desde su creación; el navegador puede aplicar un plazo menor."],
            ["_ga_<ID>", "Google; analítica, primera parte.", "Mantener el estado de una sesión para el flujo de GA4 configurado.", "30 días desde su creación; el navegador puede aplicar un plazo menor."],
          ],
        },
        links: [{ path: "https://support.google.com/analytics/answer/11397207?hl=es", label: "Cookies documentadas por Google Analytics 4" }, { path: "https://developers.google.com/tag-platform/security/guides/privacy", label: "Controles de privacidad de Google" }],
      },
      {
        title: "Microsoft Clarity",
        paragraphs: [
          "Clarity solo se carga después de aceptar analítica. Produce mapas de interacción y reconstrucciones de sesión; no es una grabación de vídeo. El panel completo del diagnóstico está marcado para enmascarar su contenido y el código deniega almacenamiento publicitario. El enmascarado y las cookies efectivas deben verificarse de nuevo en la URL publicada.",
          "Microsoft documenta las siguientes cookies como posibles en una instalación de Clarity. Las dos primeras pertenecen a ordantis.com; las demás pertenecen a dominios de Microsoft y pueden verse limitadas por consentimiento, configuración o navegador.",
        ],
        table: {
          caption: "Cookies que Microsoft Clarity puede crear después de aceptar",
          headers: ["Nombre", "Tipo", "Finalidad", "Duración publicada o técnica"],
          rows: [
            ["_clck", "Clarity; analítica, primera parte.", "Mantener un identificador y preferencias de Clarity propios de este sitio.", "1 año."],
            ["_clsk", "Clarity; analítica, primera parte.", "Unir varias páginas en una misma reconstrucción de sesión.", "1 día."],
            ["CLID", "Microsoft; analítica, tercera parte.", "Registrar la primera vez que Clarity vio ese navegador en un sitio que usa el servicio.", "1 año."],
            ["ANONCHK", "Microsoft; analítica, tercera parte.", "Indicar si MUID se transfiere a ANID; Microsoft indica que Clarity no usa ANID y fija el valor a 0.", "10 minutos."],
            ["MR", "Microsoft; analítica, tercera parte.", "Indicar si debe renovarse MUID.", "Hasta 7 días; comprobar el valor efectivo en producción."],
            ["MUID", "Microsoft; analítica, tercera parte.", "Distinguir navegadores en servicios de Microsoft para analítica y fines operativos.", "Hasta 13 meses; el navegador puede limitarlo."],
            ["SM", "Microsoft; analítica, tercera parte.", "Sincronizar MUID entre dominios de Microsoft.", "Sesión."],
          ],
        },
        links: [{ path: "https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies", label: "Inventario oficial de Microsoft Clarity" }, { path: "https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention", label: "Conservación de datos en Clarity" }],
      },
      {
        title: "Cloudflare y cookies técnicas condicionales",
        paragraphs: [
          "La entrega ordinaria de la web comprobada el 30 de agosto de 2026 no devolvió una cabecera Set-Cookie de Cloudflare. Sin embargo, Cloudflare puede crear cookies estrictamente necesarias si una regla de seguridad presenta un desafío o activa detección de bots. No son cookies de analítica de Ordantis y no requieren aceptar la categoría analítica.",
          "Al llegar al envío final del diagnóstico se carga Cloudflare Turnstile como comprobación antispam necesaria. El widget está limitado a los dominios de Ordantis y a los entornos locales de prueba. Puede tratar la IP, características del navegador y señales de interacción para emitir un token de un solo uso; no se utiliza para analítica ni publicidad. La configuración efectiva y cualquier almacenamiento técnico deberán comprobarse de nuevo en la URL publicada.",
        ],
        table: {
          caption: "Cookies técnicas que solo aparecen si se activa la función indicada",
          headers: ["Nombre", "Cuándo aparece", "Finalidad", "Duración"],
          rows: [
            ["__cf_bm", "Bot Management o Bot Fight Mode.", "Distinguir tráfico automatizado y proteger el sitio; el contenido está cifrado para Cloudflare.", "30 minutos de inactividad."],
            ["cf_clearance", "Después de superar un desafío o una detección JavaScript de Cloudflare.", "Conservar la prueba de que el visitante superó el desafío para no repetirlo.", "30 minutos por defecto; depende del ajuste Challenge Passage."],
          ],
        },
        links: [{ path: "https://developers.cloudflare.com/turnstile/", label: "Documentación oficial de Cloudflare Turnstile" }, { path: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/", label: "Cookies documentadas por Cloudflare" }],
      },
      {
        title: "Aceptar, rechazar o retirar",
        paragraphs: [
          "Aceptar cookies y Rechazar cookies se ofrecen juntos, con el mismo tamaño y estilo. La aceptación permite únicamente la categoría opcional de analítica de Google Analytics y Microsoft Clarity; las tecnologías necesarias no se desactivan al rechazar. GA4 y Clarity solo se cargan después de aceptar o de guardar preferencias con la analítica activada. Navegar, desplazarse o cerrar la pestaña no equivale a aceptar. Rechazar no impide leer contenidos, usar demos o enviar un diagnóstico.",
          "Solo hay una finalidad opcional: analítica. Personalizar abre la selección de esta categoría, desactivada por defecto en la primera visita. Las necesarias figuran como Siempre activas. Guardar preferencias aplica tu elección; abrir el panel, cambiar la casilla o pulsar Volver no guarda consentimiento. No hay categorías publicitarias. Si ya habías elegido, el panel muestra tu preferencia guardada.",
          "Gestionar cookies, disponible al pie de cada página, vuelve a abrir el panel. Pulsa Rechazar cookies o entra en Personalizar, desactiva Analítica y pulsa Guardar preferencias para retirar el permiso. Si la analítica estaba activa, la página se recarga para detener también los scripts que ya estaban funcionando o cargándose. Guarda antes cualquier resumen que estés preparando.",
          "La retirada elimina las cookies de analítica reconocidas que esta web puede borrar en su propio dominio y detiene la medición en las otras pestañas abiertas que comparten la preferencia. No elimina cookies de dominios de terceros ni datos enviados anteriormente a los proveedores; puedes gestionar las primeras desde tu navegador y ejercer tus derechos según la política de privacidad.",
        ],
        links: [{ path: "/privacidad", label: "Tratamientos, proveedores, conservación y derechos" }, { path: "https://www.aepd.es/guias/guia-cookies.pdf", label: "Guía sobre cookies de la AEPD" }],
      },
      {
        title: "Revisión del inventario",
        paragraphs: [
          "Inventario técnico revisado el 31 de agosto de 2026 contra el código y la documentación de los proveedores. Debe repetirse en un navegador limpio sobre la URL de preview y sobre producción, incluida la comprobación de Turnstile, porque una configuración de cuenta o una función nueva de Cloudflare puede modificar las cookies efectivas.",
          "Brevo aparece verificado en el DNS del dominio, pero la web no carga su script, formulario ni cookies; por eso no figura como cookie utilizada. El envío del diagnóstico usa un endpoint propio y Cloudflare Email Service; ninguno se clasifica como cookie y su tratamiento se explica en Privacidad.",
        ],
      },
    ],
  },
  {
    path: "/aviso-legal",
    title: "Aviso legal e identificación de Ordantis",
    description: "Identidad de Ordantis Solutions S.L., contacto y datos registrales publicados en el BORME.",
    eyebrow: "Información legal",
    lead: "Datos de la sociedad responsable de esta web. La referencia registral permite contrastar su identidad; no acredita una certificación de los servicios.",
    sections: [
      {
        title: "Titular y contacto",
        paragraphs: [`${siteConfig.legalName} NIF: ${companyRegistration.nif}.`, `Correo de contacto: ${siteConfig.email}.`, `Domicilio registral publicado: ${companyRegistration.streetAddress}, ${companyRegistration.postalCode} ${companyRegistration.addressLocality}, España.`],
      },
      {
        title: "Inscripción registral",
        paragraphs: [companyRegistration.registry, "Datos publicados en el BORME del 4 de noviembre de 2025, anuncio 481536. Consulta de la fuente: 28 de agosto de 2026."],
        links: [{ path: companyRegistration.source, label: "Consultar la publicación del BORME" }],
      },
      {
        title: "Alcance de la identificación",
        paragraphs: ["La razón social y el NIF se muestran en la información legal, no como parte de la presentación comercial. El domicilio se identifica como registral, no como oficina abierta al público. Este aviso debe validarse junto con los tratamientos y proveedores efectivos antes de la publicación definitiva."],
        links: [{ path: "/privacidad", label: "Política de privacidad" }, { path: "/cookies", label: "Preferencias y política de cookies" }],
      },
    ],
  },
];

export const allIndexableRoutes = [
  "/",
  "/capacidades",
  "/faq",
  ...capabilities.map((capability) => `/capacidades/${capability.slug}`),
  ...staticPages.filter((page) => page.indexable !== false).map((page) => page.path),
  "/research/exist-2026",
  dataQualityLab.path,
  ragBenchmarkLab.path,
  agentEvaluationLab.path,
  documentIntelligenceLab.path,
  diagnostic.path,
  ...insights.map((insight) => `/insights/${insight.slug}`),
];

export function getStaticPage(path: string) {
  return staticPages.find((page) => page.path === path);
}
