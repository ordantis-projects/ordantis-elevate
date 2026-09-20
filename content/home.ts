export const homeIntro = {
  eyebrow: "Machine learning · Ciencia de datos · I+D aplicada",
  title: "IA y datos. Modelos y sistemas.",
  titleStart: "IA y datos.",
  titleEmphasis: "Modelos",
  titleEnd: "y sistemas.",
  lead: "Machine learning, ciencia de datos y sistemas de inteligencia artificial para empresas y administraciones públicas.",
  detail: "Anticipar demanda, detectar fallos y planificar recursos con datos. Desarrollamos modelos y la ingeniería para integrarlos; investigamos cuando la solución técnica todavía no está demostrada.",
};

export const homeProjectAreas = [
  { path: "/capacidades/modelos-predictivos", title: "Machine learning y modelos predictivos", description: "Prever demanda, carga o riesgo de fallo. Comparar modelos, comprobar incertidumbre e integrar la predicción con la decisión y sus plazos." },
  { path: "/capacidades/data-intelligence", title: "Ciencia e ingeniería de datos", description: "Analizar qué explica un resultado, detectar sesgos y relacionar fuentes. Preparar datos e interfaces que permitan reproducir el análisis y operar modelos." },
  { path: "/capacidades/investigacion-desarrollo", title: "I+D y sistemas de IA complejos", description: "Resolver una incertidumbre técnica: comparar representaciones temporales, grafos o modalidades y medir qué aporta cada componente antes de integrarlo." },
  { path: "/govtech", title: "GovTech y administraciones públicas", description: "Demanda de servicios, cobertura de equipamientos y monitorización territorial. Evaluación técnica, integración con el organismo y revisión de decisiones." },
] as const;

export const homeProblems = {
  eyebrow: "Problemas que podemos abordar",
  title: "Qué necesita resolver tu organización.",
  lead: "Prever un pico de demanda, interpretar señales de equipos o asignar recursos limitados. Cada problema exige datos distintos y una forma de comprobar si el sistema ayuda a decidir.",
  scope: "Estos ámbitos describen posibles aplicaciones, no resultados de clientes.",
};

export const homeEngagement = {
  title: "¿Desarrollo, I+D o integración?",
  lead: "No todo proyecto de machine learning necesita investigar una técnica nueva. Elegimos el alcance según el punto de partida.",
  items: [
    { title: "Desarrollar un modelo", text: "Hay una decisión y datos con los que trabajar. Construimos una referencia, desarrollamos el modelo y medimos sus errores antes de preparar la integración." },
    { title: "Investigar una solución", text: "No se sabe si la técnica puede resolver el problema. Diseñamos ensayos con presupuesto y criterios de cierre; un resultado negativo también permite decidir." },
    { title: "Llevar un sistema a operación", text: "Existe un modelo o prototipo. Trabajamos en interfaces, latencia, fallos, monitorización y transferencia para el entorno de destino." },
  ],
};

export const homeDelivery = {
  title: "Qué acordamos antes de desarrollar.",
  lead: "El modelo es una parte de la entrega. La integración y el seguimiento necesitan un alcance y responsables definidos desde el principio.",
  items: [
    { title: "Evaluación y aceptación", text: "Referencia actual, datos de prueba, errores relevantes y límites de tiempo, cómputo y presupuesto. El criterio se fija antes de comparar resultados." },
    { title: "Datos y entorno", text: "Fuentes autorizadas, permisos, conservación y restricciones de ejecución. No necesitamos información confidencial para la primera conversación." },
    { title: "Entrega y derechos de uso", text: "Código y artefactos incluidos, dependencias, documentación e interfaces. Se concreta qué puede reproducir, integrar y modificar el equipo receptor." },
    { title: "Operación y mantenimiento", text: "Quién revisa los errores, qué ocurre si falla una fuente y cuándo retirar una versión. Soporte y reentrenamiento tienen condiciones propias." },
  ],
};

export const homeEvidence = {
  title: "Un resultado que se puede revisar.",
  lead: "EXIST 2026 reúne paper, código, resultados oficiales y una guía de reproducción. La ficha también explica las limitaciones y las configuraciones que rindieron peor.",
  boundary: "Investigación en procesamiento del lenguaje e información multimodal. Estos resultados no acreditan una implantación predictiva en una empresa o administración ni se trasladan a otro problema sin evaluarlo.",
};

export const systemJourney = {
  title: "Del dato al sistema en operación.",
  lead: "El alcance puede cubrir el sistema completo o el componente que necesita vuestro equipo.",
  steps: [
    { title: "Fuentes", text: "Datos disponibles a tiempo, con calidad y permisos definidos." },
    { title: "Modelos", text: "Predicción, optimización o visión según la decisión que se quiere apoyar." },
    { title: "Evaluación", text: "Comparación con la referencia, análisis de errores y límites de uso." },
    { title: "Integración", text: "Interfaces, monitorización y transferencia al entorno de destino." },
  ],
} as const;

export const methodology = [
  {
    title: "Diseño", shape: "cube", phase: "estrategia",
    lead: "Concretamos la decisión, los datos y las restricciones. Revisamos los métodos disponibles para elegir entre desarrollo de un modelo, investigación experimental o integración de un sistema existente.",
    detail: "Distinguimos una incertidumbre que requiere investigación de un trabajo de ingeniería conocido. Fijamos una referencia de comparación y reservamos datos de evaluación antes de entrenar o ajustar el sistema.",
    output: "Alcance, referencia, plan de evaluación y criterios de aceptación. Hipótesis y ensayos cuando el trabajo requiere investigación.",
    question: "¿Qué resultado haría que no continuáramos con la idea?",
  },
  {
    title: "Datos", shape: "cylinder", phase: "preparacion",
    lead: "Conectamos las fuentes necesarias y comprobamos su calidad, disponibilidad y permisos. Conservamos la procedencia de cada dato antes de transformarlo.",
    detail: "Identificadores, unidades y fechas deben tener un significado común. Separamos los datos de desarrollo y evaluación, y registramos quién puede consultar, modificar o exportar cada fuente.",
    output: "Inventario de fuentes, reglas de calidad, permisos y conjunto de evaluación con versiones.",
    question: "¿Dispondríamos de este dato en el momento real de la decisión?",
  },
  {
    title: "Desarrollo", shape: "sphere", phase: "implementacion",
    lead: "Desarrollamos y comparamos modelos, analizamos sus errores y probamos la integración bajo las restricciones del entorno de destino.",
    detail: "La evaluación separa rendimiento del modelo y comportamiento del sistema: latencia, concurrencia, fallos de fuentes y revisión humana. Versionamos los cambios para poder reproducir un resultado o volver a una versión anterior.",
    output: "Modelo o prototipo evaluado, análisis de errores y pruebas de integración según el alcance acordado.",
    question: "¿La mejora observada compensa el coste y el riesgo de operar el sistema?",
  },
  {
    title: "Transferencia", shape: "pyramid", phase: "capacitacion",
    lead: "Preparamos la entrega técnica para que el equipo receptor pueda reproducir los resultados, integrar los componentes y reconocer cuándo dejan de ser fiables.",
    detail: "Acordamos documentación, acceso al código y artefactos, derechos de uso y responsables de operación. La formación utiliza el sistema desarrollado; el mantenimiento y las reevaluaciones tienen un alcance explícito.",
    output: "Artefactos y documentación acordados, guía operativa y condiciones de seguimiento y mantenimiento.",
    question: "¿Puede el equipo receptor reproducir el resultado y detectar una degradación?",
  },
] as const;

export const companyPrinciples = [
  { title: "Experiencia", text: "Cada prueba deja un protocolo, una comparación y un registro de errores que se pueden revisar." },
  { title: "Confianza", text: "Definimos permisos, límites de uso y qué información se conserva antes de conectar el sistema." },
  { title: "Pragmatismo", text: "Si una regla sencilla resuelve el proceso, no añadimos un modelo para sustituirla." },
  { title: "Colaboración", text: "La persona que toma la decisión participa en la evaluación y puede rechazar la salida del sistema." },
] as const;

export const homeFaqs = [
  { question: "¿Qué proyectos encajan con Ordantis?", answer: "Proyectos de empresas y administraciones que necesitan desarrollar modelos de machine learning, analizar datos con rigor o integrar sistemas de IA con requisitos de operación. Por ejemplo, prever demanda, estudiar fallos de equipos o planificar recursos bajo restricciones. Si existe incertidumbre sobre la solución técnica, el alcance incluye I+D; si el método es conocido, puede ser un trabajo de desarrollo e ingeniería. No hace falta partir de una hipótesis de investigación para conversar con nosotros.", href: "/capacidades" },
  { question: "¿Cómo se comprueba si un modelo predictivo sirve para la operación?", answer: "Reservamos periodos que el entrenamiento no ha visto y reconstruimos qué datos estaban disponibles al predecir. Comparamos errores por horizonte y segmento con una referencia sencilla. Después comprobamos latencia, entradas tardías y respuesta ante fallos. Una buena métrica fuera de producción no demuestra que el servicio llegue a tiempo ni que siga siendo fiable.", href: "/insights/industrializar-modelo-predictivo-tiempo-real" },
  { question: "¿Cómo planteáis un reto GovTech?", answer: "Partimos del problema público, de las personas que utilizarían el resultado y de las fuentes autorizadas. Definimos una prueba con criterios de aceptación y revisamos las condiciones del reto: entregables, datos, derechos de uso e integración. El sistema puede apoyar una valoración o una planificación; la responsabilidad de la decisión permanece en el órgano competente.", href: "/govtech" },
  { question: "¿Qué se entrega además del modelo?", answer: "El alcance puede incluir el protocolo de evaluación, código y configuraciones, versiones de los datos permitidos, análisis de errores e interfaces de integración. Antes de empezar se acuerdan derechos de uso, dependencias y documentación. La transferencia permite reproducir y revisar el resultado; desplegarlo y mantenerlo requiere condiciones de operación definidas.", href: "/capacidades/investigacion-desarrollo" },
  { question: "¿Qué datos necesitamos enviar en el primer contacto?", answer: "Basta una descripción del proceso, las fuentes disponibles y las restricciones. No envíes documentos confidenciales ni datos personales sensibles. El acceso a una muestra se acuerda después, con finalidad, permisos y condiciones de conservación.", href: "/diagnostico" },
  { question: "¿Podéis trabajar con nuestro equipo técnico y modelos existentes?", answer: "Podemos acotar el trabajo a una parte del sistema: evaluar un modelo, revisar el conjunto de datos, comparar una arquitectura o preparar su integración. Necesitamos conocer la referencia actual, las interfaces y las restricciones. El reparto de responsabilidades y las condiciones de entrega se definen con el equipo receptor.", href: "/capacidades/modelos-predictivos" },
  { question: "¿Qué ocurre después de validar el prototipo?", answer: "Se decide si el resultado justifica la integración. Ese paso requiere pruebas de carga, monitorización del error, tratamiento de fallos y responsables de intervención. El mantenimiento y el reentrenamiento se acuerdan por separado; no se dan por incluidos ni resueltos porque un experimento haya funcionado.", href: "/insights/drift-calibracion-modelos" },
  { question: "¿Dónde puedo revisar un trabajo de investigación de Ordantis?", answer: "La ficha de EXIST 2026 enlaza el paper, el código y los resultados oficiales. Explica qué configuraciones se compararon y dónde el sistema no rindió bien. Es evidencia de ese experimento, no una garantía de rendimiento en otro problema.", href: "/research/exist-2026" },
] as const;

// Identidad y relaciones ya presentes en HEAD:src/pages/Home.tsx y About.tsx.
// No se deducen nuevos clientes, certificaciones ni resultados de estas marcas.
export const originalBackers = [
  { name: "StartUPV", image: "/brand/backers/startupv.svg", width: 179, height: 100 },
  { name: "Start.inf · ETSINF (UPV)", image: "/brand/backers/logo_startinf.png", width: 233, height: 142 },
  { name: "Proyecto Sherpa", image: "/brand/backers/sherpa.svg", width: 488, height: 279, url: "https://www.feda.es/actualidad/noticias/item/13650-el-programa-sherpa-de-feda-ya-tiene-los-ocho-finalistas-para-un-total-de-15-000-euros-en-premios" },
  { name: "Premios Talento Joven", image: "/brand/backers/talentojoven.png", width: 873, height: 420, url: "https://www.levante-emv.com/comunitat-valenciana/2026/02/10/finalistas-premios-talento-joven-2026-126518511.html" },
  { name: "Cátedra HP", image: "/brand/backers/catedra-hp.png", width: 816, height: 320 },
  { name: "INCIBE Emprende", image: "/trust/sello-incibe-emprende.png", width: 4167, height: 4167, url: "https://www.incibe.es/node/619170" },
];

export const originalPartners = [
  { name: "Artecoin", image: "/brand/partners/artecoin.png", width: 707, height: 353 },
  { name: "Indiva", image: "/brand/partners/indiva.svg", width: 217, height: 115 },
  { name: "Odeon Multicines", image: "/brand/partners/odeon.png", width: 256, height: 72 },
  { name: "Cofriman", image: "/brand/partners/cofriman.png", width: 1910, height: 334 },
] as const;
