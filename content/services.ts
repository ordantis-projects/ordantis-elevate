import { serviceExplanations, type ServiceExplanation } from "./service-details.ts";

export const servicesIntro = {
  title: "Machine learning, ciencia de datos y sistemas de IA",
  description: "Desarrollo de modelos predictivos, ciencia e ingeniería de datos e I+D en IA para empresas y administraciones. Evaluación, integración y transferencia técnica.",
  lead: "Desarrollamos modelos predictivos, analizamos datos y construimos sistemas de IA bajo requisitos de operación. Podemos empezar desde el problema o trabajar sobre un modelo existente. Cuando hay incertidumbre técnica, acotamos una línea de I+D con ensayos y criterios de cierre.",
};

export type ServiceDetail = ServiceExplanation & {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  boundary: string;
  capability: string;
  placement?: "integration";
};

const originalServicePhases: { id: string; title: string; intro: string; services: Omit<ServiceDetail, keyof ServiceExplanation>[] }[] = [
  {
    id: "estrategia", title: "Diseño y viabilidad técnica",
    intro: "Revisamos el estado del problema, las alternativas y la incertidumbre técnica. El alcance distingue la investigación experimental del trabajo de integración conocido.",
    services: [{
      id: "auditoria", number: "1.1", title: "Diseño técnico y viabilidad",
      summary: "Concretar la decisión, revisar métodos y datos disponibles y definir el desarrollo. Cuando hay incertidumbre técnica, formular una hipótesis y los ensayos que permitirían resolverla.",
      deliverables: ["Objetivo, fuentes autorizadas y restricciones.", "Plan de evaluación con referencia, particiones, métricas y presupuesto.", "Dependencias y criterios de aceptación; protocolo experimental si el alcance incluye I+D."],
      boundary: "Una propuesta o un cuestionario no demuestran viabilidad. El alcance debe identificar qué necesita una prueba y qué puede resolverse con ingeniería conocida.", capability: "investigacion-desarrollo",
    }],
  },
  {
    id: "preparacion", title: "Ingeniería y gobierno de datos",
    intro: "Antes de conectar un modelo, hay que saber de dónde sale cada dato, qué significa y quién puede usarlo.",
    services: [
      {
        id: "infraestructura", number: "2.1", title: "Infraestructura de datos",
        summary: "Diseñar la conexión entre fuentes, almacenamiento y aplicaciones, con requisitos explícitos de disponibilidad, latencia y recuperación.",
        deliverables: ["Arquitectura y contratos de intercambio.", "Prueba de integración y tratamiento de fallos.", "Procedimientos de acceso, copia y recuperación."],
        boundary: "No se decide nube, local o híbrido por preferencia de una herramienta. La elección depende de los accesos, costes y restricciones del proceso.", capability: "data-intelligence",
      },
      {
        id: "ingenieria", number: "2.2", title: "Ingeniería y calidad de datos",
        summary: "Resolver identificadores, duplicados, unidades, fechas y campos incompletos sin perder el valor original ni su procedencia.",
        deliverables: ["Reglas de transformación versionadas.", "Informe de calidad y excepciones por fuente.", "Pruebas de contratos y conservación del dato original."],
        boundary: "Una corrección automática no convierte un dato desconocido en observado. Se distingue lo medido, lo transformado y lo estimado.", capability: "data-intelligence",
      },
      {
        id: "gobernanza", number: "2.3", title: "Gobernanza y controles de datos",
        summary: "Definir responsabilidades, permisos y conservación para que la misma información no circule sin control por aplicaciones, exportaciones y trazas.",
        deliverables: ["Matriz de acceso por rol y finalidad.", "Linaje de fuentes y reglas de conservación.", "Pruebas de acceso, revocación y registro de cambios."],
        boundary: "La implantación de controles técnicos no equivale a una certificación de cumplimiento. Las obligaciones concretas se revisan con el responsable y sus asesores.", capability: "data-intelligence",
      },
    ],
  },
  {
    id: "implementacion", title: "Desarrollo de modelos y sistemas de IA",
    intro: "Comparamos modelos tabulares, temporales, de grafos o de visión según la información disponible y la pregunta experimental. Evaluamos los errores relevantes, la incertidumbre y las restricciones de inferencia antes de integrar el modelo con una decisión o una planificación.",
    services: [
      {
        id: "bi", number: "C.1", title: "Visualización y métricas (BI)", placement: "integration",
        summary: "Construir métricas que distintas áreas puedan interpretar de la misma manera, con acceso al origen de una cifra y a su fecha de actualización.",
        deliverables: ["Diccionario de métricas y reglas de cálculo.", "Modelo de datos y panel para las decisiones acordadas.", "Reconciliación de cifras con las fuentes originales."],
        boundary: "Un panel no arregla una definición ambigua. Se acuerda qué entra en cada indicador antes de diseñar las gráficas.", capability: "data-intelligence",
      },
      {
        id: "prediccion", number: "3.1", title: "Machine learning y modelos predictivos",
        summary: "Desarrollar modelos para estimar demanda, carga o riesgo. Elegir la representación adecuada, comparar con una referencia y evaluar picos, horizontes e incertidumbre; investigar nuevas arquitecturas cuando el problema lo requiere.",
        deliverables: ["Comparación reproducible de modelos y aportación de cada fuente o componente.", "Backtesting temporal y análisis de errores por horizonte, episodio y segmento.", "Artefactos del modelo, evaluación de incertidumbre y contrato de inferencia según el alcance."],
        boundary: "El histórico debe representar la decisión. Se rechaza una evaluación que usa datos aún no disponibles en el momento de predecir.", capability: "modelos-predictivos",
      },
      {
        id: "optimizacion", number: "3.2", title: "Optimización y sistemas de apoyo a la decisión",
        summary: "Formular decisiones de asignación y comparar métodos de solución con restricciones de cobertura, capacidad y tiempo. Comprobar cómo cambia la planificación cuando falla la previsión o faltan recursos.",
        deliverables: ["Modelo de decisión: variables, función objetivo y restricciones acordadas.", "Comparación con el plan de referencia, coste de cómputo y límites de factibilidad.", "Escenarios de sensibilidad a la demanda y procedimiento de revisión por la persona responsable."],
        boundary: "Una predicción estima qué puede ocurrir; un optimizador propone qué hacer. Si faltan restricciones operativas, una solución matemática puede ser inutilizable.", capability: "investigacion-desarrollo",
      },
      {
        id: "agentes", number: "C.2", title: "Orquestación y control de herramientas de IA", placement: "integration",
        summary: "Coordinar pasos y herramientas cuando la tarea necesita decisiones contextuales, con límites verificables fuera de las instrucciones del modelo.",
        deliverables: ["Mapa de herramientas y permisos.", "Pruebas de errores, inyección de instrucciones y aprobaciones.", "Trazas de ejecución y procedimiento de intervención."],
        boundary: "Si una secuencia fija resuelve el problema, se evalúa esa opción primero. No se conceden permisos de escritura por el mero hecho de que el agente los solicite.", capability: "agentes-ia",
      },
      {
        id: "documentos", number: "C.3", title: "Análisis documental con evidencia", placement: "integration",
        summary: "Extraer información con evidencia y componer contratos, informes o propuestas con fuentes, plantillas y reglas de revisión.",
        deliverables: ["Esquema de extracción y muestra anotada.", "Referencias al documento y revisión de campos críticos.", "Informe de errores por campo y tipo de documento."],
        boundary: "Un campo bien formado puede ser falso. La aceptación comprueba el contenido contra el documento, no solo que la salida tenga formato JSON.", capability: "document-intelligence",
      },
      {
        id: "rag", number: "C.4", title: "Búsqueda semántica y RAG", placement: "integration",
        summary: "Recuperar información de un corpus autorizado y responder con evidencia comprobable, incluidos los casos en que no hay una respuesta suficiente.",
        deliverables: ["Inventario del corpus y política de actualización.", "Evaluación separada de recuperación y respuesta.", "Pruebas de permisos, contradicción y abstención."],
        boundary: "Una cita no demuestra que la respuesta sea correcta. Se revisa si el fragmento respalda la afirmación y si el usuario tenía derecho a verlo.", capability: "document-intelligence",
      },
      {
        id: "vision", number: "3.3", title: "Visión por computador y evaluación multimodal",
        summary: "Desarrollar modelos sobre imágenes y comprobar si relacionarlas con otras observaciones aporta una mejora. Separar cámaras, ubicaciones y periodos para medir la generalización.",
        deliverables: ["Protocolo de captura, anotación y particiones por entorno de origen.", "Comparación de arquitecturas y modalidades con análisis de errores por condición de captura.", "Artefactos e interfaz de inferencia, umbrales de revisión y pruebas en el entorno de destino."],
        boundary: "Fotogramas casi idénticos no deben repartirse entre entrenamiento y prueba. Una demostración visual no acredita el rendimiento en otra cámara o entorno.", capability: "investigacion-desarrollo",
      },
    ],
  },
  {
    id: "capacitacion", title: "Transferencia y equipo receptor",
    intro: "Acordamos documentación, acceso a los artefactos y responsabilidades de operación. La capacitación utiliza el sistema y los procedimientos de evaluación desarrollados.",
    services: [{
      id: "talleres", number: "4.1", title: "Transferencia técnica y capacitación",
      summary: "Preparar al equipo receptor para reproducir evaluaciones, utilizar las interfaces y detectar errores o degradaciones del sistema entregado.",
      deliverables: ["Artefactos, versiones y documentación acordados para repetir la evaluación.", "Contratos de integración, dependencias y condiciones de uso de código, datos y modelos.", "Ejercicios de reproducción, diagnóstico de fallos y retirada de una versión con el equipo receptor."],
      boundary: "Entregar un archivo de modelo no completa la transferencia. El equipo receptor necesita poder reconstruir la evaluación; operación, mantenimiento y derechos de uso tienen un alcance explícito.", capability: "investigacion-desarrollo",
    }],
  },
];

export const servicePhases = originalServicePhases.map((phase) => ({
  ...phase,
  services: phase.services.map((service): ServiceDetail => {
    const explanation = serviceExplanations[service.id];
    if (!explanation) throw new Error("Falta el detalle del servicio " + service.id);
    return { ...service, ...explanation };
  }),
}));

// La oferta principal y los componentes conservados tienen el mismo origen en
// HTML y Markdown. Las anclas originales siguen vigentes aunque cambie su peso.
export const projectServicePhases = servicePhases.map((phase) => ({
  ...phase,
  services: phase.services.filter((service) => service.placement !== "integration"),
}));

export const integrationServices = servicePhases.flatMap((phase) =>
  phase.services.filter((service) => service.placement === "integration"));

export const integrationIntro = {
  title: "Componentes de integración, cuando el proyecto los necesita",
  description: "Una interfaz de consulta, un panel o una conexión con herramientas puede formar parte del sistema desarrollado. Se incorpora si la operación lo necesita, con evaluación y permisos propios. Estos componentes no definen por sí solos un proyecto de I+D ni son la oferta principal de Ordantis.",
};
