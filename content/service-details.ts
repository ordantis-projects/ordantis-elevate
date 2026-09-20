export type DemoName = "PredictionDemo" | "OptimizationDemo" | "BIDemo" | "AgentDemo" | "DocumentDemo" | "RAGDemo" | "GovernanceDemo" | "InfraDemo" | "VisionDemo";
export type ServiceExplanation = {
  description: string;
  components: string[];
  useCases: { sector: string; text: string }[];
  demo?: DemoName;
  demoNote?: string;
};

// Amplía los doce servicios de la web original. Los ejemplos indican posibles
// aplicaciones: no son proyectos adjudicados ni resultados de clientes.
export const serviceExplanations: Record<string, ServiceExplanation> = {
  auditoria: {
    description: "Revisamos la decisión, los métodos disponibles, una muestra autorizada de datos y las restricciones de operación. Definimos si el trabajo necesita desarrollo, una prueba de I+D o integración. La evaluación separa datos de desarrollo y prueba, incluye una referencia reproducible y registra los errores relevantes. Si hay una incertidumbre técnica, concretamos la hipótesis, los ensayos y su presupuesto antes de investigar.",
    components: ["Revisión de métodos y resultados previos relevantes para el reto.", "Hipótesis, referencia y particiones de evaluación.", "Disponibilidad, representatividad y permisos de los datos.", "Plan de experimentos, presupuesto de cómputo y criterios de cierre."],
    useCases: [
      { sector: "Industria", text: "Antes de predecir paradas, comprobar si las averías y los datos de máquina comparten identificadores y fechas." },
      { sector: "Administración pública", text: "Definir cómo evaluar una estimación de demanda cuando los registros históricos cambian de cobertura y de unidad territorial." },
      { sector: "I+D empresarial", text: "Comparar representaciones y arquitecturas con el mismo conjunto reservado, aislando la aportación de cada modalidad." },
    ],
  },
  infraestructura: {
    description: "Diseñamos y desplegamos la conexión entre fuentes, almacenes de datos y aplicaciones. Puede estar en la nube, en las instalaciones o repartida entre ambos entornos. La arquitectura debe especificar frecuencia de actualización, volumen, accesos y recuperación ante fallos. La elección se comprueba con una carga representativa antes de comprometer capacidad o tiempos de respuesta.",
    components: ["Inventario de fuentes, formatos y vías de acceso.", "Arquitectura cloud, local o híbrida según las restricciones.", "Almacenamiento y bases de datos adaptados a las consultas previstas.", "Ingesta, copias, recuperación y observación de fallos."],
    useCases: [
      { sector: "Industria", text: "Conservar datos de planta durante un corte de conexión y sincronizarlos después sin duplicar eventos." },
      { sector: "Administración y banca", text: "Separar almacenamiento y aplicaciones según las zonas de acceso y las condiciones del organismo." },
      { sector: "Salud", text: "Evaluar el procesamiento local de imágenes cuando los datos no deben salir del entorno autorizado." },
    ],
    demo: "InfraDemo", demoNote: "Esquema de fuentes, orquestación y consumo; no representa una infraestructura desplegada ni mide latencia.",
  },
  ingenieria: {
    description: "Construimos procesos de ingesta y transformación para combinar registros administrativos, fuentes territoriales, sensores y aplicaciones. Definimos contratos de datos, versionado y tratamiento de entradas tardías. Cada transformación conserva el valor original y la regla aplicada. Para entrenar y evaluar modelos, reconstruimos la información disponible en cada instante sin confundir una estimación con una observación.",
    components: ["Modelado de esquemas y contratos de intercambio.", "Pipelines con reintentos, control de duplicados y registro de errores.", "Reglas de calidad, pruebas y tratamiento de registros rechazados.", "Master Data Management y diccionario de datos.", "Linaje y clasificación de campos personales."],
    useCases: [
      { sector: "Administración pública", text: "Relacionar inventarios de activos, geometrías y lecturas de sensores conservando identificadores, fechas de vigencia y discrepancias entre fuentes." },
      { sector: "Retail", text: "Relacionar producto, tienda y venta online cuando los códigos o unidades no coinciden entre sistemas." },
      { sector: "Sanidad", text: "Normalizar unidades y fechas de fuentes autorizadas, conservando el registro que originó cada transformación." },
      { sector: "Finanzas", text: "Reconciliar transacciones y marcar las que no cuadran, en lugar de forzar un total aparentemente correcto." },
    ],
  },
  gobernanza: {
    description: "Definimos propiedad, clasificación, acceso y conservación de los datos. Implantamos los controles acordados en las integraciones y comprobamos qué ocurre al cambiar un rol, revocar un permiso o exportar información. El enmascaramiento no se presenta como anonimización automática: hay que revisar si una persona sigue siendo identificable y qué finalidad tiene el tratamiento.",
    components: ["Políticas de propiedad, acceso y administración de datos.", "Control por rol y finalidad, con pruebas de revocación.", "Clasificación de información y tratamiento de campos personales.", "Registros de acceso, cambios, exportaciones y excepciones.", "Catálogo, linaje y análisis del impacto de una modificación."],
    useCases: [
      { sector: "Investigación", text: "Preparar vistas con los campos estrictamente necesarios, manteniendo separado el acceso a identificadores." },
      { sector: "Finanzas y seguros", text: "Seguir una cifra desde la transacción hasta el informe y registrar qué versión de la regla la calculó." },
      { sector: "Sector público", text: "Separar los documentos publicables de aquellos que necesitan revisión antes de una difusión." },
    ],
    demo: "GovernanceDemo", demoNote: "Matriz didáctica de permisos y flujo de datos. Seleccionar un rol no configura accesos reales.",
  },
  bi: {
    description: "Diseñamos paneles ejecutivos y operativos sobre una capa de métricas compartida. Antes de dibujar una gráfica, acordamos la unidad de análisis, los filtros y la fecha de actualización. El trabajo puede incluir almacén de datos, informes recurrentes, alertas y vistas por rol. Un total debe poder reconciliarse con sus fuentes y explicar por qué difiere del de otro departamento.",
    components: ["Definición de indicadores (KPI) y reglas comunes entre departamentos.", "Modelo de datos, capa semántica y conexión con ERP o CRM.", "Paneles por rol y exploración de los registros que explican una cifra.", "Informes y alertas con frecuencia de actualización acordada."],
    useCases: [
      { sector: "Industria", text: "Comparar turnos con la misma definición de parada y separar falta de producción de falta de datos." },
      { sector: "Finanzas", text: "Explicar diferencias entre cobros, facturación y previsión de caja sin mezclarlas en un único indicador." },
      { sector: "Sanidad", text: "Revisar tiempos de espera y ocupación con definiciones de inicio y cierre consistentes." },
      { sector: "Retail", text: "Consultar ventas físicas y online descontando devoluciones y evitando contabilizar dos veces un pedido." },
    ],
    demo: "BIDemo", demoNote: "Panel interactivo con filtros de área, curva temporal y desglose. Las cifras son sintéticas; el periodo solo modifica la curva.",
  },
  prediccion: {
    description: "Desarrollamos modelos a partir de la decisión que necesita la predicción y de la información disponible para anticiparla. Comparamos modelos tabulares, secuencias temporales o grafos cuando las relaciones entre entidades justifican esa estructura. Cada alternativa utiliza información equivalente y un presupuesto registrado. Las pruebas separan entrenamiento y evaluación, reservan episodios difíciles y miden la aportación de las fuentes añadidas. Cuando el método conocido no resuelve el reto, investigamos representaciones o arquitecturas nuevas. La integración comprueba inferencia, entradas tardías y degradación del error con el equipo receptor.",
    components: ["Disponibilidad temporal, representatividad y versión de cada fuente.", "Referencias reproducibles y comparación de representaciones y arquitecturas.", "Ablaciones para comprobar qué aporta cada fuente o componente.", "Errores por horizonte, segmento y episodio de demanda elevada.", "Intervalos de incertidumbre, calibración y condiciones de revisión.", "Contrato de inferencia, pruebas de carga y seguimiento del modelo."],
    useCases: [
      { sector: "Administración pública", text: "Estimar demanda de un servicio por zona y periodo, separando cambios de cobertura del registro de cambios reales en la demanda." },
      { sector: "Industria", text: "Evaluar señales previas a una parada con datos disponibles antes de la intervención, separando máquinas o periodos no vistos para comprobar generalización." },
      { sector: "Logística y suministro", text: "Prever carga por centro y horizonte, comparando errores en picos y el coste de reservar capacidad que después no se utiliza." },
      { sector: "Infraestructura pública", text: "Evaluar una previsión de fallos usando solo lecturas e intervenciones conocidas antes de cada decisión de mantenimiento." },
      { sector: "I+D empresarial", text: "Comparar si una representación temporal o de grafo mejora la referencia tabular cuando las entidades comparten dependencias y observaciones incompletas." },
      { sector: "Planificación territorial", text: "Evaluar si las relaciones entre zonas añaden información a una previsión, reservando periodos y áreas para comprobar dónde deja de generalizar." },
      { sector: "Energía", text: "Evaluar demanda por horizonte con las previsiones meteorológicas disponibles en cada fecha." },
    ],
    demo: "PredictionDemo", demoNote: "Serie de demanda inventada con controles de cambio, estacionalidad e interrupción. Explora una fórmula con pesos fijados; no entrena ni evalúa un modelo predictivo.",
  },
  optimizacion: {
    description: "Formulamos un problema de asignación o planificación y evaluamos métodos de solución según su tamaño y restricciones. La función objetivo expresa los criterios que fija el organismo o la empresa; no se deduce de la predicción. Comparamos programación matemática y otros métodos de búsqueda con el plan de referencia, registrando tiempo de cálculo y soluciones inviables. Si el sistema consume una previsión, probamos escenarios de error y demanda extrema antes de aceptar una planificación. La persona responsable conserva la revisión de los criterios y la decisión.",
    components: ["Variables de decisión, función objetivo y restricciones de cobertura y capacidad.", "Comparación de métodos de solución con un plan de referencia.", "Simulación de escenarios y sensibilidad al error de la previsión.", "Tiempo de cálculo, factibilidad y tratamiento de restricciones incompatibles.", "Registro de criterios y mecanismo de revisión por la persona responsable."],
    useCases: [
      { sector: "Servicios públicos", text: "Comparar asignaciones de equipos de mantenimiento con restricciones de cobertura territorial, desplazamiento y capacidad, manteniendo explícitos los criterios que fija el organismo." },
      { sector: "Logística", text: "Asignar rutas con capacidad, ventanas de entrega y tiempos de conducción explícitos." },
      { sector: "Planificación de personal", text: "Proponer turnos respetando disponibilidad, descansos y cobertura; señalar una demanda imposible de cubrir." },
      { sector: "Retail", text: "Comparar reposiciones con límites de almacén y suministro, incluyendo el coste de una rotura de stock." },
    ],
    demo: "OptimizationDemo", demoNote: "Dos repartos prefijados de 120 horas entre cuatro zonas inventadas, con inspecciones también prefijadas. El comparador muestra su aritmética; no ejecuta un solver ni evalúa su utilidad en una operación real.",
  },
  agentes: {
    description: "Diseñamos agentes que consultan información y coordinan herramientas en procesos con decisiones contextuales. Conservamos las integraciones con ERP, CRM y herramientas de trabajo, pero las acciones sensibles pasan por permisos y aprobaciones verificables. La evaluación cubre reintentos, interrupciones, instrucciones maliciosas y tareas que deben terminar con una derivación a una persona.",
    components: ["Diseño de herramientas, contexto y memoria necesaria para la tarea.", "Integración con sistemas empresariales y permisos mínimos.", "Aprobación humana vinculada a los parámetros de la acción.", "Trazas, idempotencia, reintentos y recuperación de fallos.", "Evaluación de prompt injection, costes y tareas incompletas."],
    useCases: [
      { sector: "Atención al cliente", text: "Consultar un pedido y preparar una devolución que el sistema solo ejecuta con la autorización exigida." },
      { sector: "Administración", text: "Cruzar una factura con su pedido y enviar a revisión las diferencias; no autorizar pagos por una instrucción del documento." },
      { sector: "Recursos humanos", text: "Preparar un alta, proponer accesos y registrar quién aprobó cada permiso." },
      { sector: "Logística", text: "Investigar un retraso y proponer alternativas sin cambiar reservas fuera del alcance autorizado." },
    ],
    demo: "AgentDemo", demoNote: "Onboarding simulado con aprobación previa, pasos y traza. No crea cuentas, concede licencias, envía correos ni firma contratos.",
  },
  documentos: {
    description: "El servicio combina extracción de información y composición de documentos. La extracción registra campo, página y evidencia. La generación combina plantillas versionadas, datos de sistemas autorizados y reglas para añadir secciones. Contratos, informes y propuestas pasan por las revisiones acordadas; un borrador no se da por aprobado porque tenga buen formato.",
    components: ["Esquema de extracción y muestra anotada por tipo documental.", "Plantillas, reglas condicionales y selección de fuentes.", "Integración con CRM, ERP y repositorios autorizados.", "Comprobaciones de coherencia, completitud y referencias.", "Revisión humana, versionado y registro de cambios."],
    useCases: [
      { sector: "Recursos humanos", text: "Preparar un borrador de incorporación a partir de campos verificados y una plantilla aprobada." },
      { sector: "Salud y farmacéutica", text: "Preparar resúmenes con referencias al documento de origen para su revisión por personal autorizado." },
      { sector: "Finanzas", text: "Componer un informe a partir de tablas reconciliadas, conservando unidades, periodos y fuentes." },
      { sector: "Legal e inmobiliario", text: "Seleccionar cláusulas de una biblioteca revisada y marcar datos o condiciones que requieren validación jurídica." },
      { sector: "Seguros", text: "Extraer campos de un expediente y dejar en revisión los que no tienen evidencia suficiente." },
    ],
    demo: "DocumentDemo", demoNote: "Selector de fuentes y cláusulas con vista previa condicional. No genera un contrato completo ni sustituye una revisión jurídica.",
  },
  rag: {
    description: "Indexamos documentos, manuales y repositorios autorizados para recuperarlos mediante consultas en lenguaje natural. Cada respuesta debe permitir revisar la fuente y su versión. Si el caso necesita búsqueda externa, se separa de la evidencia interna y se acuerda qué puede salir del sistema. Probamos también preguntas sin respuesta, fuentes contradictorias y cambios de permisos.",
    components: ["Inventario, fragmentación e indexación del corpus.", "Recuperación semántica y evaluación con preguntas anotadas.", "Permisos aplicados antes de recuperar y al responder.", "Citas, versiones y política de actualización.", "Abstención y búsqueda externa solo cuando el alcance lo permite."],
    useCases: [
      { sector: "Soporte", text: "Relacionar una pregunta con manuales y tickets vigentes, mostrando la evidencia que respalda la respuesta." },
      { sector: "Ingeniería", text: "Consultar un procedimiento de equipo y abstenerse si la versión del manual no corresponde al modelo instalado." },
      { sector: "Recursos humanos", text: "Resolver preguntas sobre políticas internas con su versión y fecha de aplicación." },
      { sector: "Legal", text: "Localizar y comparar fragmentos de contratos autorizados, sin convertir una coincidencia textual en asesoramiento jurídico." },
    ],
    demo: "RAGDemo", demoNote: "Consulta de una política de viajes inventada. Puede retirarse la fuente para observar la abstención; no realiza búsquedas web reales.",
  },
  vision: {
    description: "Desarrollamos y comparamos modelos para clasificar imágenes, localizar objetos o detectar cambios. El protocolo separa muestras por cámara, ubicación, lote o periodo para evitar que imágenes casi idénticas falseen la evaluación. Cuando hay sensores u otras observaciones disponibles, comprobamos por separado si combinarlos mejora el modelo visual y qué ocurre si falta una modalidad. La prueba incluye variaciones de captura y límites de cómputo. La inferencia local, en edge o por lotes se acuerda según la latencia, la privacidad y el entorno de destino.",
    components: ["Captura, anotación y particiones independientes por entorno de origen.", "Comparación de arquitecturas de visión y referencias reproducibles.", "Evaluación de modalidades adicionales y entradas ausentes cuando corresponda.", "Errores por clase, cámara, ubicación y condición de captura.", "Inferencia en el entorno de destino y presupuesto de cómputo.", "Umbrales de revisión y seguimiento de cambios del entorno."],
    useCases: [
      { sector: "Industria", text: "Evaluar defectos de superficie por tamaño, iluminación y velocidad de captura, sin extrapolar la precisión entre líneas." },
      { sector: "Sector público", text: "Evaluar cambios o incidencias en activos e infraestructura con imágenes de distintos periodos y zonas, contrastando las observaciones antes de una decisión de mantenimiento." },
      { sector: "I+D empresarial", text: "Comparar un modelo visual con otro que incorpora lecturas de sensores, reservando equipos o ubicaciones no vistos y probando la ausencia de una fuente." },
      { sector: "Agroalimentario", text: "Separar lotes y condiciones de captura al evaluar una clasificación visual de producto." },
    ],
    demo: "VisionDemo", demoNote: "Escenas sintéticas de figuras con etiquetas conocidas. La selección muestra coincidencias y no es una prueba de precisión de visión artificial.",
  },
  talleres: {
    description: "Preparamos al equipo receptor para reproducir una evaluación y operar los componentes entregados. La documentación explica versiones, interfaces, dependencias y fallos conocidos. Los ejercicios cubren la interpretación de errores, los cambios de datos y la retirada de una versión. Se acuerdan los artefactos, los derechos de uso y el acompañamiento posterior; la transferencia no implica soporte ilimitado.",
    components: ["Documentación de arquitectura, interfaces y dependencias.", "Instrucciones y artefactos acordados para repetir la evaluación.", "Práctica de detección, revisión y escalado de errores.", "Guía de operación y condiciones de uso de código, datos y modelos.", "Responsables y alcance del seguimiento técnico."],
    useCases: [
      { sector: "Dirección", text: "Revisar si una prueba justifica continuar y qué evidencias faltan para decidir." },
      { sector: "Responsables de área", text: "Practicar qué hacer si una herramienta falla o una recomendación contradice el procedimiento." },
      { sector: "Equipos operativos", text: "Resolver tareas diarias y detectar salidas que necesitan una comprobación antes de usarse." },
    ],
  },
};
