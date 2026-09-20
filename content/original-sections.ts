// Conserva la estructura y los temas del original; sustituye promesas genéricas
// por trabajo concreto y no atribuye porcentajes sin evidencia a Ordantis.
export const dataAdvantages = [
  {
    title: "Demanda y capacidad", visual: "forecast",
    question: "¿Con qué antelación podemos prever un pico de demanda?",
    text: "Anticipar pedidos, consumo o uso de un servicio. Evaluar dónde falla la previsión durante los picos y con qué antelación puede ayudar a planificar producción, suministro o atención.",
    inputs: "Históricos, calendario y capacidad disponible.",
    evaluation: "Error por horizonte y comportamiento durante los picos.",
    href: "/insights/modelos-predictivos-picos-demanda", linkLabel: "Cómo evaluar la previsión",
    diagram: "Una serie observada continúa como previsión con un intervalo de incertidumbre. Esquema ilustrativo, sin datos de clientes.",
  },
  {
    title: "Fiabilidad de activos y datos", visual: "signals",
    question: "¿Falla el equipo o falla la medición?",
    text: "Estudiar señales de máquinas, sensores e incidencias para detectar anomalías. Separar un posible fallo del activo de una medición defectuosa antes de proponer una intervención.",
    inputs: "Señales de sensores, condiciones de uso e incidencias.",
    evaluation: "Falsas alarmas, anticipación y cobertura de los registros.",
    href: "/insights/mantenimiento-predictivo-pocas-averias", linkLabel: "Trabajar con pocas averías",
    diagram: "Dos señales se comparan en el mismo instante; una presenta un pico aislado que requiere contrastar la medición. Esquema ilustrativo, sin datos de clientes.",
  },
  {
    title: "Planificación y territorio", visual: "network",
    question: "¿Cómo repartir recursos cuando la capacidad es limitada?",
    text: "Relacionar demanda, ubicaciones y recursos para comparar decisiones viables. Hacer explícitas las restricciones de capacidad, desplazamiento y cobertura, tanto en una red logística como en un servicio público.",
    inputs: "Demanda, ubicaciones, tiempos y restricciones operativas.",
    evaluation: "Viabilidad del plan y respuesta ante cambios de demanda.",
    href: "/insights/prediccion-optimizacion-asignacion-recursos", linkLabel: "De la predicción al plan",
    diagram: "Una red conecta puntos de demanda con recursos disponibles y destaca una asignación posible. Esquema ilustrativo, sin ubicaciones reales ni datos de clientes.",
  },
] as const;

export const methodPoints = {
  estrategia: [
    { title: "Decisión y alcance", text: "Identificar quién usará el resultado, cuándo lo necesita y cómo resuelve hoy el problema. Revisar métodos y datos para distinguir desarrollo, investigación e integración." },
    { title: "Referencia y evaluación", text: "Fijar una referencia, particiones de datos y métricas vinculadas al uso. Si se investiga una técnica, formular la hipótesis antes de comparar alternativas." },
    { title: "Plan de trabajo", text: "Ordenar entregas y dependencias de datos, cómputo e instrumentación. El desarrollo tiene criterios de aceptación; cada ensayo de I+D responde una pregunta y tiene una condición de cierre." },
  ],
  preparacion: [
    { title: "Fuentes y disponibilidad", text: "Conectar registros administrativos, datos territoriales y observaciones de sensores con contratos de intercambio. Comprobar qué información está disponible al entrenar, evaluar y servir el modelo." },
    { title: "Calidad de la información", text: "Resolver identificadores, unidades y valores contradictorios. Las transformaciones conservan el registro original y dejan separadas las incidencias no resueltas." },
    { title: "Gobernanza y trazabilidad", text: "Asignar responsables, permisos y conservación. Comprobar que la restricción se mantiene en consultas, exportaciones, respuestas y registros." },
  ],
  implementacion: [
    { title: "Comparación experimental", text: "Evaluar arquitecturas con información equivalente, periodos reservados y presupuesto registrado. Las ablaciones permiten comprobar qué aporta cada fuente y componente." },
    { title: "Inferencia e integración", text: "Medir latencia y comportamiento bajo carga. Reproducir entradas tardías o ausentes y comprobar que el equipo receptor puede integrar una versión del modelo." },
    { title: "Error y degradación", text: "Separar errores por horizonte y situación relevante, comprobar incertidumbre y detectar cambios en los datos. Acordar señales de retirada y una referencia a la que volver." },
  ],
  capacitacion: [
    { title: "Reproducción", text: "Entregar las versiones y configuraciones acordadas, con instrucciones para repetir la evaluación y reconstruir un resultado." },
    { title: "Integración y derechos de uso", text: "Documentar interfaces, dependencias y condiciones de acceso al código, datos y modelos. La transferencia se concreta antes de la entrega." },
    { title: "Operación y seguimiento", text: "Practicar con el equipo receptor la detección de fallos, revisión de salidas y retirada de una versión. Acordar responsables y alcance del soporte." },
  ],
} as const;

export const companyAchievements = [
  { title: "Programa StartUPV", image: "/brand/backers/startupv.svg", text: "Ordantis forma parte del ecosistema emprendedor de la Universitat Politècnica de València.", url: "https://www.upv.es/entidades/ideas/" },
  { title: "Start.inf · ETSINF (UPV)", image: "/brand/backers/logo_startinf.png", text: "El programa de emprendimiento de la ETSINF acompaña el desarrollo de Ordantis con asesoramiento y espacio de trabajo.", url: "https://www.inf.upv.es/" },
  { title: "Finalistas del Proyecto Sherpa", image: "/brand/backers/sherpa.svg", text: "Ordantis figura entre los ocho proyectos finalistas del programa Sherpa 2025 de FEDA.", url: "https://www.feda.es/actualidad/noticias/item/13650-el-programa-sherpa-de-feda-ya-tiene-los-ocho-finalistas-para-un-total-de-15-000-euros-en-premios" },
  { title: "Premios Talento Joven", image: "/brand/backers/talentojoven.png", text: "Finalista en la categoría Empresa de los Premios Talento Joven de la Comunitat Valenciana 2026.", url: "https://www.levante-emv.com/comunitat-valenciana/2026/02/10/finalistas-premios-talento-joven-2026-126518511.html" },
  { title: "Cátedra HP", image: "/brand/backers/catedra-hp.png", text: "Apoyo de la Cátedra HP de la UPV en el entorno de innovación y emprendimiento de Ordantis." },
  { title: "Cybersecurity Ventures II", image: "/brand/backers/incibe.svg", text: "Participación en el programa de aceleración de INCIBE. Esta participación no equivale a certificar los servicios de la empresa.", url: "https://www.incibe.es/node/619170" },
] as const;
