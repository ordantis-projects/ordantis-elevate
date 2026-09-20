// Editorial navigation, not measured search demand or evidence of delivery.
// The llms index resolves these references against the existing public corpus.
export const searchGraph = [
  {
    id: "prediccion",
    title: "Machine learning y modelos predictivos",
    path: "/capacidades/modelos-predictivos",
    decision: "Anticipar demanda o fallos y comprobar si la previsión llega a tiempo para actuar.",
    guides: ["modelos-predictivos-picos-demanda", "mantenimiento-predictivo-pocas-averias", "incertidumbre-prediccion-series-temporales", "data-leakage-validacion-temporal", "drift-calibracion-modelos"],
  },
  {
    id: "datos",
    title: "Ciencia e ingeniería de datos",
    path: "/capacidades/data-intelligence",
    decision: "Distinguir cambios de operación y de medición; preparar fuentes trazables para análisis y modelos.",
    guides: ["ciencia-datos-cambios-operacion", "sensores-defectuosos-confianza-dato", "datos-publicos-mantenerlos-vivos"],
  },
  {
    id: "planificacion",
    title: "Predicción, optimización y planificación",
    path: "/capacidades#optimizacion",
    decision: "Comparar asignaciones de recursos con restricciones de capacidad, cobertura y desplazamiento.",
    guides: ["prediccion-optimizacion-asignacion-recursos"],
  },
  {
    id: "investigacion",
    title: "I+D y arquitecturas de IA",
    path: "/capacidades/investigacion-desarrollo",
    decision: "Resolver una incertidumbre técnica mediante referencias, experimentos y alternativas que se puedan descartar.",
    guides: ["elegir-modelo-tabular-temporal-grafo", "exist-modalidades-aportan-valor"],
  },
  {
    id: "sistemas",
    title: "Integración y operación de sistemas de IA",
    path: "/capacidades#implementacion",
    decision: "Llevar un modelo o prototipo al entorno de destino con interfaces, latencia, monitorización y transferencia acordadas.",
    guides: ["industrializar-modelo-predictivo-tiempo-real", "validar-ia-antes-de-industrializar", "responsible-ai-privacidad-edge-ai"],
  },
  {
    id: "govtech",
    title: "GovTech y administraciones públicas",
    path: "/govtech",
    decision: "Evaluar un piloto público, relacionar datos territoriales y comprobar utilidad, cobertura y límites antes de ampliarlo.",
    guides: ["evaluar-piloto-ia-administracion-publica", "datos-territoriales-decisiones-publicas", "gemelo-digital-infraestructura-publica"],
  },
] as const;
