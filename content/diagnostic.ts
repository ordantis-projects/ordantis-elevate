export const diagnostic = {
  path: "/diagnostico",
  title: "Diagnóstico de un proyecto de IA y datos",
  description: "Prepara una primera consulta con el problema, los datos disponibles y las restricciones. El cuestionario no transmite respuestas hasta que revisas el resumen y decides enviarlo.",
  lead: "Responde tres preguntas y déjanos tu email. Revisarás las respuestas antes de enviarlas a contacto@ordantis.com.",
  privacy: "Mientras completas el cuestionario, las respuestas permanecen en esta página y se borran al recargarla. No se envían automáticamente. Tú decides si las compartes mediante las opciones disponibles al terminar. Las copias que descargues quedan bajo tu control. No incluyas datos personales sensibles, credenciales ni documentos confidenciales.",
};

export const diagnosticSteps = [
  { id: "decision", title: "¿Qué necesitas resolver?", explanation: "Elige el reto técnico que quieres abordar primero.", options: ["Comprobar una hipótesis técnica", "Desarrollar o validar un modelo predictivo", "Integrar fuentes y evaluar su calidad", "Resolver un reto GovTech", "Evaluar o industrializar un modelo existente"] },
  { id: "data", title: "¿Qué datos están disponibles?", explanation: "Selecciona la situación que mejor describe el punto de partida.", options: ["Fuentes accesibles y responsables identificados", "Datos dispersos o con errores conocidos", "Documentos que requieren permisos", "Todavía no sabemos si hay una muestra suficiente"] },
  { id: "constraint", title: "¿Qué no puede fallar?", explanation: "Indica la principal condición que tendría que respetar una prueba.", options: ["La decisión necesita aprobación humana", "Los datos no pueden salir del entorno autorizado", "Hay límites de tiempo de respuesta o disponibilidad", "Primero necesitamos definir los riesgos"] },
] as const;

export const diagnosticCapabilityByDecision: Record<string, string> = {
  "Integrar fuentes y evaluar su calidad": "data-intelligence",
  "Desarrollar o validar un modelo predictivo": "modelos-predictivos",
  "Evaluar o industrializar un modelo existente": "modelos-predictivos",
  "Resolver un reto GovTech": "investigacion-desarrollo",
  "Comprobar una hipótesis técnica": "investigacion-desarrollo",
};

export type DiagnosticRoute = {
  capability: string;
  title: string;
  reason: string;
  firstDeliverable: string;
  path?: string;
};

export const diagnosticRouteByDecision: Record<string, DiagnosticRoute> = {
  "Integrar fuentes y evaluar su calidad": {
    capability: "data-intelligence",
    title: "Ingeniería de datos y sistemas",
    reason: "La integración necesita contratos de datos, procedencia y reglas que permitan evaluar la información antes de utilizarla en modelos o análisis.",
    firstDeliverable: "Inventario de fuentes, contratos de intercambio y protocolo de calidad y actualización.",
  },
  "Desarrollar o validar un modelo predictivo": {
    capability: "modelos-predictivos",
    title: "Machine learning y modelos predictivos",
    reason: "La viabilidad depende de comparar una predicción con una referencia sencilla, respetando el orden temporal y el coste de cada tipo de error.",
    firstDeliverable: "Baseline temporal, métrica de evaluación y decisión que cambiaría con la predicción.",
  },
  "Evaluar o industrializar un modelo existente": {
    capability: "modelos-predictivos",
    title: "Evaluación e integración de modelos",
    reason: "Hay que separar la calidad del modelo de su comportamiento operativo y revisar qué cambia al integrarlo con datos, usuarios y carga reales.",
    firstDeliverable: "Protocolo de evaluación del modelo, contrato de integración y pruebas de latencia, fallos y seguimiento.",
  },
  "Resolver un reto GovTech": {
    capability: "investigacion-desarrollo",
    path: "/govtech",
    title: "GovTech e I+D para administraciones públicas",
    reason: "El problema público, las fuentes autorizadas y las condiciones del organismo determinan la investigación y la evaluación del sistema.",
    firstDeliverable: "Definición del reto público, muestra autorizada y criterios de evaluación y transferencia al organismo.",
  },
  "Comprobar una hipótesis técnica": {
    capability: "investigacion-desarrollo",
    title: "I+D en inteligencia artificial",
    reason: "La prueba debe responder una hipótesis concreta y poder terminar con un no sin convertir el experimento en un proyecto indefinido.",
    firstDeliverable: "Hipótesis, referencia de comparación y criterios de éxito y parada acordados antes del ensayo.",
  },
};

export const diagnosticDataCondition: Record<string, string> = {
  "Fuentes accesibles y responsables identificados": "Verificar una muestra y documentar quién autoriza el uso antes de diseñar la prueba.",
  "Datos dispersos o con errores conocidos": "Medir duplicados, ausencias, incoherencias y cobertura antes de entrenar o automatizar.",
  "Documentos que requieren permisos": "Inventariar permisos, finalidad y conservación; la muestra solo puede incluir documentación autorizada.",
  "Todavía no sabemos si hay una muestra suficiente": "Definir la muestra mínima y comprobar cobertura de casos normales, raros y críticos.",
};

export const diagnosticControlByConstraint: Record<string, string> = {
  "La decisión necesita aprobación humana": "La prueba debe mostrar evidencia y registrar quién acepta, corrige o rechaza cada salida con efecto relevante.",
  "Los datos no pueden salir del entorno autorizado": "La arquitectura y los proveedores se descartan o aceptan según residencia, permisos, registros y flujo real de los datos.",
  "Hay límites de tiempo de respuesta o disponibilidad": "Latencia, concurrencia, fallos y recuperación forman parte del criterio de aceptación, no de una revisión posterior.",
  "Primero necesitamos definir los riesgos": "Antes de probar se crea un registro de riesgos, responsables, controles y señales que obligan a detener el ensayo.",
};

export type ProfileField = { id: string; label: string; step: number; type: "select" | "multi" | "text" | "email" | "url"; options?: readonly string[] };
export const diagnosticProfileFields: ProfileField[] = [
  { id: "organizationType", label: "Tipo de organización", step: 0, type: "select", options: ["Administración pública", "Entidad del sector público", "Empresa", "Centro de investigación / Universidad", "Consorcio o colaboración", "Otra organización"] },
  { id: "sector", label: "Sector de actividad", step: 0, type: "select", options: ["Industrial / Manufactura", "Logística y Transporte", "Retail y Consumo", "Salud y Farmacéutico", "Finanzas y Seguros", "Energía", "Sector público", "Otros"] },
  { id: "projectStage", label: "Estado del proyecto", step: 1, type: "select", options: ["Problema abierto / definición del reto", "Preparación de una propuesta de I+D", "Datos disponibles para experimentar", "Modelo o prototipo existente", "Evaluación para integración en operación"] },
  { id: "infra", label: "Infraestructura de datos disponible", step: 1, type: "multi", options: ["Servidores locales", "Cloud (AWS / Azure / GCP)", "Bases de datos SQL / NoSQL", "Datos en silos (Excel dispersos)", "Sin infraestructura centralizada"] },
  { id: "fullName", label: "Nombre completo", step: 2, type: "text" },
  { id: "role", label: "Cargo", step: 2, type: "text" },
  { id: "email", label: "Email de contacto", step: 2, type: "email" },
  { id: "company", label: "Organismo o empresa", step: 2, type: "text" },
  { id: "website", label: "Sitio web", step: 2, type: "url" },
];
