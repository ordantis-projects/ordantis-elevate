import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  PredictionDemo, OptimizationDemo, BIDemo, AgentDemo, DocumentDemo,
  RAGDemo, GovernanceDemo, InfraDemo, VisionDemo,
} from "@/components/demos";

type Case = { sector: string; text: string };

type Service = {
  id: string;
  num: string;
  title: string;
  short: string;
  description: string;
  components: string[];
  deliverables: string[];
  cases: Case[];
  Demo?: React.ComponentType;
};

type Phase = {
  id: string;
  num: string;
  tag: string;
  title: string;
  intro: string;
  services: Service[];
};

const phases: Phase[] = [
  {
    id: "estrategia",
    num: "1",
    tag: "Fase 1",
    title: "Diagnóstico y Hoja de Ruta",
    intro:
      "Antes de invertir un solo euro en tecnología hay que saber dónde está tu empresa, hacia dónde quiere ir y qué camino genera más rentabilidad. La estrategia transforma la intención en un plan concreto, medible y rentable.",
    services: [
      {
        id: "auditoria",
        num: "1.1",
        title: "Auditoría de Madurez Digital y Datos",
        short:
          "Diagnóstico exhaustivo en seis dimensiones críticas para descubrir dónde estás y trazar el camino con mayor ROI.",
        description:
          "Antes de que cualquier transformación tenga éxito, hay que saber exactamente dónde te encuentras. Realizamos una evaluación del estado actual de la organización en seis dimensiones: infraestructura cloud, calidad e integración de datos, gobernanza y cumplimiento, capacidades de BI, preparación para la IA y cultura organizacional. Entregamos un diagnóstico interactivo que puntúa tu madurez en cinco niveles, de \"Ad Hoc\" a \"Optimizado\", y produce una hoja de ruta clara que identifica victorias rápidas y prioridades estratégicas.",
        components: [
          "Entrevistas estructuradas con stakeholders de TI, operaciones, finanzas y unidades de negocio",
          "Evaluación técnica de los sistemas actuales (cloud, bases de datos, integraciones, APIs)",
          "Análisis del inventario de datos y línea base de calidad",
          "Revisión de la postura de cumplimiento normativo y seguridad",
        ],
        deliverables: [
          "Informe de madurez con gráficos de radar y puntuaciones por dimensión",
          "Análisis de brechas: lo que tienes frente a lo que necesitas",
          "Esquema de oportunidades y proyectos de interés",
          "Hoja de ruta estratégica de 12-18 meses vinculada a KPIs del negocio",
        ],
        cases: [
          { sector: "Industrial", text: "Diagnostica la madurez de tu infraestructura en planta y prioriza inversiones que generen ROI inmediato en operaciones." },
          { sector: "Servicios Financieros", text: "Identifica brechas de cumplimiento y gobernanza antes de iniciar cualquier proyecto de IA o analítica avanzada." },
          { sector: "Pyme", text: "Hoja de ruta de 12-18 meses adaptada al tamaño y la madurez digital real de tu organización." },
        ],
      },
    ],
  },
  {
    id: "preparacion",
    num: "2",
    tag: "Fase 2",
    title: "Cimientos de Datos",
    intro:
      "La IA es un motor potente, pero necesita gasolina de calidad. Si los datos son un caos disperso, los resultados serán un caos amplificado. Construimos los cimientos —infraestructura, calidad y gobernanza— sobre los que se sostendrá toda la transformación.",
    services: [
      {
        id: "infraestructura",
        num: "2.1",
        title: "Preparación de la Infraestructura de Datos",
        short:
          "Diseñamos e implementamos la columna vertebral técnica: cloud, on-premise o híbrido, escalable, segura y a medida de tus casos de uso.",
        description:
          "Construimos una infraestructura de datos escalable, segura y compatible con entornos híbridos: en tus instalaciones, en la nube (AWS, Google Cloud, Azure) o en un modelo mixto, junto con almacenes y bases de datos diseñados a medida de tus casos de uso. Es el sistema nervioso de tu organización: si esto es débil, todo lo que viene después falla.",
        components: [
          "Mapeo del panorama de datos actual: inventario de fuentes, formatos y problemas de calidad",
          "Diseño de arquitectura cloud (AWS, Azure, GCP) o despliegue on-premise",
          "Diseño de base de datos o almacén de datos a medida del caso de uso",
          "Opciones de computación híbrida para aplicaciones industriales o sensibles",
        ],
        deliverables: [
          "Arquitectura de datos documentada y desplegada (cloud, on-prem o híbrida)",
          "Almacenes y bases de datos configurados y conectados con sistemas origen",
          "Pipelines de ingesta y transformación operativos",
          "Documentación técnica y manual operativo",
        ],
        cases: [
          { sector: "Industria", text: "Pipelines capaces de ingerir millones de eventos por segundo en planta, con latencia ultrabaja y sin depender de internet." },
          { sector: "Sector Público y Banca", text: "Lagos de datos en centros 100% privados y desconectados, cumpliendo regulaciones de seguridad nacional." },
          { sector: "Salud", text: "Infraestructura local para procesar historiales e imágenes médicas dentro del hospital, garantizando privacidad total." },
        ],
        Demo: InfraDemo,
      },
      {
        id: "ingenieria",
        num: "2.2",
        title: "Ingeniería de Datos y Limpieza de Información",
        short:
          "Transformamos datos dispersos y contradictorios en una base unificada y fiable: pipelines ETL/ELT, calidad continua y MDM.",
        description:
          "Los datos en bruto rara vez están listos para impulsar la IA. Diseñamos y construimos pipelines ETL/ELT a medida que extraen datos de tus sistemas (ERPs, CRMs, contabilidad, hojas de cálculo), estandarizan formatos, detectan y corrigen inconsistencias, deduplican registros y los cargan en un repositorio centralizado y accesible. Mapeamos esquemas complejos, gestionamos valores faltantes, establecemos Master Data Management para clientes y productos, y creamos documentación de linaje completa. Al finalizar, tu equipo confía en los datos y puede actuar con agilidad.",
        components: [
          "Diseño de esquemas y modelos de datos",
          "Procesos ETL/ELT automatizados, tolerantes a fallos y escalables",
          "Marcos de calidad de datos: pruebas automatizadas y detección de anomalías",
          "Master Data Management (MDM) para clientes, productos y ubicaciones",
          "Identificación y tratamiento de datos personales (PII) para gobernanza",
        ],
        deliverables: [
          "Conjuntos de datos limpiados, deduplicados y estandarizados, listos para analítica e IA",
          "Paneles de calidad de datos con monitorización continua",
          "Diccionario de datos y repositorio de metadatos",
          "Documentación de linaje y trazabilidad",
          "Código y documentación de los procesos ETL/ELT",
        ],
        cases: [
          { sector: "Retail", text: "Unifica datos de tienda física, e-commerce, CRM y proveedores en un único registro de cliente y producto coherente." },
          { sector: "Sanidad", text: "Estandariza historiales clínicos procedentes de sistemas heterogéneos respetando privacidad y trazabilidad." },
          { sector: "Servicios Financieros", text: "Reconcilia transacciones de múltiples sistemas legacy en un único hilo auditable de extremo a extremo." },
        ],
      },
      {
        id: "gobernanza",
        num: "2.3",
        title: "Gobernanza de Datos y Cumplimiento Normativo",
        short:
          "Establecemos políticas, controles de acceso y registros de auditoría para que la IA escale sin asumir riesgos legales ni reputacionales.",
        description:
          "La IA es tan buena como los datos que la alimentan, y los datos sólo son útiles si se protegen y gobiernan correctamente. Establecemos el marco de gobernanza: políticas, controles de acceso por rol, registros de auditoría, anonimización automática de PII y trazabilidad completa. Diseñamos un control de acceso basado en roles donde un analista de marketing ve datos distintos a los de un auditor financiero, y un científico de datos accede al comportamiento de los clientes pero no a sus nombres. Cubrimos los marcos sectoriales (RGPD, HIPAA, requisitos del sector público) y entregamos trazabilidad completa frente a brechas o auditorías.",
        components: [
          "Política de gobernanza de datos: propiedad, acceso y administración",
          "Control de acceso basado en roles (RBAC) sobre todos los sistemas",
          "Marco de clasificación: público, confidencial, restringido",
          "Detección y enmascaramiento automático de PII",
          "Registros de auditoría e informes de cumplimiento normativo",
          "Catalogación de datos, linaje y análisis de impacto",
        ],
        deliverables: [
          "Documento de política de gobernanza desplegado en la organización",
          "RBAC implementado en todos tus sistemas",
          "Detección y anonimización automática de información personal",
          "Registros y dashboards de auditoría continua",
          "Catálogo de datos con linaje y análisis de impacto",
          "Plan de remediación periódico para hallazgos de cumplimiento",
        ],
        cases: [
          { sector: "Salud", text: "Acceso a millones de historiales clínicos para investigación con técnicas de enmascaramiento que cumplen RGPD/HIPAA." },
          { sector: "Finanzas y Seguros", text: "Rastrea el ciclo de vida de cada dato. Linaje exacto desde la transacción original hasta el panel final." },
          { sector: "Sector Público", text: "Clasifica automáticamente qué información es apta para portales de transparencia y qué debe permanecer clasificada." },
        ],
        Demo: GovernanceDemo,
      },
    ],
  },
  {
    id: "implementacion",
    num: "3",
    tag: "Fase 3",
    title: "Soluciones de IA",
    intro:
      "Aquí la inversión empieza a generar resultados visibles. Implementar IA no es comprar software y darle al botón: es un proceso quirúrgico, gradual y obsesivamente orientado al ROI. Empezamos por pilotos controlados y solo entonces escalamos.",
    services: [
      {
        id: "bi",
        num: "3.1",
        title: "Inteligencia de Negocio (BI)",
        short:
          "Convertimos el caos de datos dispersos en una ventaja estratégica visible: paneles interactivos en tiempo real para todo el equipo.",
        description:
          "Implementamos paneles interactivos y sistemas de monitorización en tiempo real que centralizan toda la información clave en un solo lugar. Tus equipos dejan de esperar informes semanales o mensuales y pasan a tomar decisiones con datos actualizados al segundo. Democratizamos el acceso: desde el director general hasta el responsable de tienda, cada persona accede a las métricas que necesita en el formato que mejor entiende. Es habitualmente el primer proyecto de implementación que recomendamos: genera resultados visibles en semanas, no meses, y construye la credibilidad interna que justifica las inversiones posteriores.",
        components: [
          "Definición de KPIs estratégicos y operativos por departamento",
          "Arquitectura BI: data warehouse, OLAP, capas semánticas",
          "Paneles ejecutivos, departamentales y operativos",
          "Integración con CRM, ERP, marketing y sistemas legacy",
          "Automatización de informes recurrentes y alertas inteligentes",
          "Análisis ad-hoc y exploración de datos en lenguaje natural",
        ],
        deliverables: [
          "Arquitectura BI documentada y desplegada",
          "Paneles interactivos personalizados por rol y departamento",
          "Catálogo de KPIs con definiciones estandarizadas",
          "Sistema de alertas y notificaciones automáticas",
          "Documentación técnica y manuales de usuario",
        ],
        cases: [
          { sector: "Industrial", text: "Monitoriza el rendimiento de líneas de producción al segundo. Identifica cuellos de botella y aplica mejoras inmediatas." },
          { sector: "Finanzas y Seguros", text: "Integra paneles dinámicos en tu app: tus clientes monitorizan inversiones y pólizas en tiempo real con interfaz transparente." },
          { sector: "Sanidad", text: "Visualiza tiempos de espera, rotación de camas y eficiencia en asignación de recursos médicos." },
          { sector: "Retail y Consumo", text: "Unifica ventas físicas y online. Analiza rentabilidad por producto y rendimiento de campañas en un solo lugar." },
        ],
        Demo: BIDemo,
      },
      {
        id: "prediccion",
        num: "3.2",
        title: "Análisis Predictivo y Modelado de Escenarios",
        short:
          "Pasamos de decisiones reactivas a estrategia proactiva: pronostica la demanda, optimiza inventarios y detecta riesgos antes de que impacten.",
        description:
          "Aplicamos modelos avanzados de machine learning sobre tus datos históricos para anticipar escenarios futuros con alta precisión. Pronosticamos fluctuaciones de demanda, optimizamos inventarios, detectamos riesgos antes de que impacten el negocio e identificamos oportunidades antes que la competencia. Cada predicción incluye un nivel de confianza estadístico, así que tu equipo sabe siempre cuándo confiar plenamente en el modelo y cuándo aplicar criterio humano. Mientras la BI te dice qué está pasando, la predicción te dice qué va a pasar y qué deberías hacer al respecto.",
        components: [
          "Análisis exploratorio de datos históricos",
          "Selección y entrenamiento de modelos",
          "Validación cruzada y testing fuera de muestra",
          "Integración de variables externas (clima, eventos, indicadores económicos)",
          "Monitorización del rendimiento del modelo y reentrenamiento automático",
          "Explicabilidad para que los equipos entiendan cada predicción",
          "Integración con sistemas operativos para automatizar acciones",
        ],
        deliverables: [
          "Modelos predictivos entrenados, validados y desplegados en producción",
          "API de predicciones integrada con los sistemas existentes",
          "Panel de monitorización del rendimiento del modelo",
          "Documentación técnica completa (datos, hiperparámetros, métricas)",
          "Pipeline de reentrenamiento automatizado",
          "Capacitación para los usuarios de negocio",
        ],
        cases: [
          { sector: "Retail y Consumo", text: "Anticipa qué productos exactos se venderán en cada tienda y cuándo. Optimiza stock y maximiza la rotación de capital." },
          { sector: "Logística", text: "Pronostica picos de demanda y cuellos de botella en centros de distribución, dimensionando plantilla con semanas de antelación." },
          { sector: "Turismo", text: "Modela reservas con variables externas (clima, eventos) para predecir cancelaciones y lograr el 100% de ocupación." },
          { sector: "Energético", text: "Analiza datos históricos y meteorológicos para predecir picos energéticos y comprar en mercado mayorista en el momento más rentable." },
          { sector: "Financiero y Seguros", text: "Identifica patrones para predecir abandono y cancelación de pólizas. Anticípate con ofertas personalizadas de retención." },
        ],
        Demo: PredictionDemo,
      },
      {
        id: "optimizacion",
        num: "3.3",
        title: "Optimización de Recursos y Procesos",
        short:
          "Algoritmos matemáticos e IA para maximizar el rendimiento de tu capital, tu tiempo y tu equipo. ROI medible desde los primeros meses.",
        description:
          "Donde un humano tardaría días en evaluar todas las combinaciones posibles, nuestros algoritmos encuentran la solución óptima en segundos. Implementamos programación lineal, programación entera, algoritmos genéticos y reinforcement learning para resolver problemas operativos complejos: asignación de capital, presupuesto, rutas logísticas, inventario o consumo energético. Es uno de los servicios con ROI más inmediato: en muchos casos el ahorro generado en los primeros tres meses ya supera el coste total de implementación.",
        components: [
          "Modelado matemático del problema (programación lineal/entera, algoritmos genéticos, RL)",
          "Definición de funciones objetivo y restricciones",
          "Integración de datos en tiempo real (tráfico, inventario, disponibilidad)",
          "Simulación de escenarios antes de aplicar decisiones en producción",
          "Recomendaciones explicables: por qué esta ruta y no otra",
          "Mecanismos de override humano para casos excepcionales",
        ],
        deliverables: [
          "Motor de optimización desplegado e integrado con sistemas operativos",
          "Dashboards en tiempo real con recomendaciones y KPIs",
          "Documentación del modelo matemático y restricciones",
          "Sistema de simulación para evaluar escenarios antes de ejecutar",
          "Informes periódicos de ahorros generados (ROI tracking)",
          "Capacitación operativa para los equipos que ejecutan las recomendaciones",
        ],
        cases: [
          { sector: "Logística", text: "Calcula rutas en tiempo real considerando tráfico, capacidad y combustible. Minimiza kilómetros en vacío." },
          { sector: "Sanidad", text: "Optimiza turnos médicos y asignación de quirófanos garantizando cobertura óptima frente a demanda de pacientes." },
          { sector: "Retail y Consumo", text: "Ajusta precios de miles de referencias en tiempo real según elasticidad, inventario y competencia." },
        ],
        Demo: OptimizationDemo,
      },
      {
        id: "agentes",
        num: "3.4",
        title: "Automatización con Agentes de IA",
        short:
          "Sistemas cognitivos que ejecutan flujos de trabajo de extremo a extremo: investigan, deciden e interactúan con tus plataformas 24/7.",
        description:
          "Desplegamos agentes de IA capaces de ejecutar flujos complejos y tomar decisiones dinámicas sin intervención constante. A diferencia de la automatización tradicional basada en reglas rígidas, nuestros sistemas cognitivos investigan, interactúan con múltiples plataformas, resuelven incidencias y adaptan sus acciones en tiempo real según el contexto. No se trata de reemplazar a las personas, sino de liberarlas del trabajo tedioso para que se concentren en lo verdaderamente valioso. Empezamos en procesos bien definidos y de alto volumen, donde el ROI es evidente desde el primer mes.",
        components: [
          "Diseño del agente: LLMs, herramientas, memoria y razonamiento",
          "Integración con sistemas empresariales (ERP, CRM, comunicación, SaaS)",
          "Mecanismos de seguridad y human-in-the-loop para decisiones críticas",
          "Logging y trazabilidad completa de cada acción",
          "Pruebas en entornos controlados antes del despliegue",
          "Monitorización de rendimiento y precisión del agente",
        ],
        deliverables: [
          "Agentes desplegados en producción con integraciones completas",
          "Panel de control con métricas operativas (tareas, tiempo ahorrado, tasa de éxito)",
          "Sistema de logs auditables para cumplimiento normativo",
          "Procedimientos de escalado a humano para casos excepcionales",
          "Documentación técnica y capacitación del equipo de supervisión",
          "Soporte continuo y optimización post-despliegue",
        ],
        cases: [
          { sector: "Atención al Cliente", text: "Agentes que interactúan con tu ERP para procesar devoluciones, rastrear envíos y aplicar descuentos sin intervención humana." },
          { sector: "Finanzas", text: "Monitoriza la bandeja de entrada, extrae datos de facturas, las cruza con órdenes de compra y programa pagos automáticamente." },
          { sector: "Recursos Humanos", text: "Crea cuentas, da accesos a herramientas, genera contratos y envía agendas automáticamente al contratar." },
          { sector: "Logística", text: "Detecta retrasos de contenedores, evalúa impacto, busca rutas alternativas y notifica al cliente proactivamente." },
        ],
        Demo: AgentDemo,
      },
      {
        id: "documentos",
        num: "3.5",
        title: "Automatización Inteligente de Documentos",
        short:
          "IA y PLN extraen datos de tus sistemas y generan contratos, informes y propuestas con lógica condicional. Mucho más que rellenar plantillas.",
        description:
          "Automatizamos la creación de documentos complejos —contratos, informes técnicos, facturas, propuestas, notas regulatorias— extrayendo, estructurando y sintetizando información de múltiples fuentes. La diferencia con soluciones tradicionales (mail merge, plantillas Word) es que aplicamos lógica condicional inteligente: añadimos cláusulas según el contexto, ajustamos el lenguaje según la jurisdicción, incorporamos datos en tiempo real y validamos la coherencia interna del documento. Es generación condicional, no relleno de huecos.",
        components: [
          "Análisis de plantillas y patrones documentales existentes",
          "Modelado de lógica condicional (qué cláusulas aplican en qué casos)",
          "Integración con CRM, ERP y bases jurisprudenciales",
          "Modelos de PLN para generación, resumen y traducción",
          "Validación automática (coherencia, completitud)",
          "Workflow de aprobación humana para documentos críticos",
          "Versionado, control de cambios y trazabilidad legal",
        ],
        deliverables: [
          "Sistema de generación documental desplegado e integrado",
          "API para generar documentos bajo demanda desde otros sistemas",
          "Flujo de revisión y aprobación humana",
          "Sistema de versionado y trazabilidad",
          "Dashboard de métricas (documentos generados, tiempo ahorrado, tasa de error)",
          "Capacitación para equipos editoriales y legales",
        ],
        cases: [
          { sector: "Recursos Humanos", text: "Generación de ofertas hiper-personalizadas, contratos adaptados a convenios y evaluaciones de desempeño automatizadas." },
          { sector: "Salud y Farmacéutica", text: "Notas de alta, historiales resumidos y documentación regulatoria cumpliendo estándares de privacidad." },
          { sector: "Finanzas y Banca", text: "Informes de riesgos, resúmenes de carteras y auditorías. Transformación de tablas en narrativas legibles." },
          { sector: "Legal", text: "Redacción automática de demandas, NDAs y contratos con cláusulas vigentes según jurisdicción." },
          { sector: "Inmobiliario", text: "Contratos de arras, alquiler, tasaciones dinámicas e informes hiperlocales en segundos." },
          { sector: "Seguros", text: "Pólizas personalizadas con coberturas dinámicas e informes de peritaje generados desde fotografías." },
        ],
        Demo: DocumentDemo,
      },
      {
        id: "rag",
        num: "3.6",
        title: "Búsqueda Semántica y RAG",
        short:
          "Tu equipo conversa en lenguaje natural con sus propias bases de datos, manuales y repositorios, en un entorno completamente seguro y privado.",
        description:
          "Implementamos arquitecturas de Generación Aumentada por Recuperación (RAG) para que tus empleados conversen en lenguaje natural con sus propios documentos, manuales y bases de datos. Unimos la seguridad de los datos privados con el poder de internet en tiempo real: asistentes híbridos que leen tus documentos internos y, cuando hace falta, navegan la web para comparar competencia y resolver problemas. El RAG resuelve uno de los problemas más caros y silenciosos de toda empresa: el conocimiento atrapado en silos. Reduce el MTTR un 60-80% y democratiza el conocimiento institucional.",
        components: [
          "Indexación y vectorización del corpus documental interno",
          "Selección y ajuste fino de modelos según privacidad y rendimiento",
          "Bases de datos vectoriales para recuperación semántica",
          "Control de acceso: cada usuario sólo ve lo que tiene permitido",
          "Citaciones automáticas y trazabilidad de cada respuesta",
          "Capa de búsqueda web complementaria",
          "Mecanismos anti-alucinación (decir \"no lo sé\" cuando toca)",
          "Interfaz conversacional para usuarios no técnicos",
        ],
        deliverables: [
          "Plataforma RAG desplegada con interfaz conversacional",
          "Indexación completa del corpus documental relevante",
          "Sistema de permisos y control de acceso",
          "Capacidad híbrida de búsqueda interna + web",
          "Documentación técnica y guías de usuario",
          "Proceso de actualización continua del conocimiento",
        ],
        cases: [
          { sector: "Atención al cliente", text: "Unifica wikis, manuales y tickets pasados. La IA da la solución exacta al instante reduciendo el MTTR drásticamente." },
          { sector: "Ingeniería", text: "Un operario consulta a la IA frente a un código de error y recibe los pasos de reparación exactos en segundos." },
          { sector: "Recursos Humanos", text: "Portal donde los empleados resuelven dudas sobre vacaciones, nóminas y procesos sin saturar a RRHH." },
          { sector: "Legal", text: "Interroga bases legales y repositorios de contratos históricos obteniendo resúmenes precisos y citas exactas." },
        ],
        Demo: RAGDemo,
      },
      {
        id: "vision",
        num: "3.7",
        title: "Reconocimiento de Imágenes",
        short:
          "Inspección visual con precisión sobrehumana: deep learning y visión computacional para detectar defectos y monitorizar entornos en tiempo real.",
        description:
          "Aplicamos métodos avanzados de deep learning y visión computacional para que tus sistemas procesen, analicen y comprendan imágenes y vídeos. Donde un inspector humano detecta el 92% de los defectos en una jornada (con fatiga acumulada), un sistema de visión detecta el 99,7% durante 24 horas sin descanso. El ROI aparece en dos frentes: reducción de defectos que llegan al cliente final y liberación de personal cualificado para tareas de mayor valor. Especialmente potente en sectores industrial, agroalimentario e infraestructura pública.",
        components: [
          "Captura y etiquetado de datasets específicos del cliente",
          "Selección de arquitecturas (CNN, transformers visuales, multimodales)",
          "Entrenamiento, validación y ajuste fino de modelos",
          "Integración con cámaras industriales, drones, IoT o flotas móviles",
          "Procesamiento en tiempo real (edge) o por lotes",
          "Sistemas de alertas y respuesta automatizada",
          "Aprendizaje continuo (active learning)",
          "Cumplimiento de privacidad cuando se procesan personas (RGPD)",
        ],
        deliverables: [
          "Modelos de visión por computadora entrenados y validados",
          "Sistema de captura e inferencia desplegado (edge o cloud)",
          "Integración con sistemas operativos del cliente",
          "Dashboard con métricas de detección y rendimiento",
          "Proceso de reentrenamiento con nuevos datos",
          "Documentación técnica y manual operativo",
          "Capacitación de los equipos de supervisión",
        ],
        cases: [
          { sector: "Industrial", text: "Análisis de superficies en tiempo real para identificar arañazos, abolladuras o soldaduras defectuosas a alta velocidad." },
          { sector: "Sector Público", text: "Cámaras en flota municipal detectando baches, señales dañadas y mobiliario vandalizado, generando órdenes geolocalizadas." },
          { sector: "Agroalimentario", text: "Cámaras hiperespectrales que clasifican y detectan magulladuras invisibles en frutas y verduras a granel." },
        ],
        Demo: VisionDemo,
      },
    ],
  },
  {
    id: "capacitacion",
    num: "4",
    tag: "Fase 4",
    title: "Adopción y Equipos",
    intro:
      "La mejor tecnología del mundo es un gasto inútil si los equipos siguen trabajando como hace diez años. Aquí cerramos la brecha entre la herramienta desplegada y su uso real, día a día.",
    services: [
      {
        id: "talleres",
        num: "4.1",
        title: "Talleres Prácticos de IA y Capacitación Técnica",
        short:
          "Formación práctica adaptada a cada rol, usando datos reales de tu empresa. Capacitación que se traduce en uso real, no en certificados.",
        description:
          "Nuestros talleres se construyen alrededor de las tareas reales de los empleados. Un analista financiero no quiere aprender \"cómo funciona el aprendizaje automático en teoría\" —quiere aprender \"cómo uso esta herramienta para pronosticar el flujo de caja del próximo trimestre\". Formamos a cada grupo de manera diferente: el comité directivo recibe formación sobre estrategia e impacto, los responsables de departamento sobre implicaciones para los procesos, y los colaboradores individuales sobre el uso práctico de las herramientas.",
        components: [
          "Formación específica por rol (dirección, mandos intermedios, colaboradores)",
          "Talleres prácticos utilizando los datos reales de la empresa",
          "Ejercicios interactivos y simulaciones",
          "Formación específica por caso de uso",
          "Materiales de formación y biblioteca de vídeos de referencia",
          "Itinerarios de certificación interna",
          "Base de conocimientos y sistema de FAQ",
        ],
        deliverables: [
          "Plan de estudios personalizado",
          "Materiales de formación, vídeos y documentación",
          "Base de conocimientos interna",
          "Recursos de apoyo post-formación y línea directa de consulta",
        ],
        cases: [
          { sector: "Comité directivo", text: "Sesiones de estrategia: cómo gobernar una transformación de datos e IA midiendo impacto financiero real." },
          { sector: "Mandos intermedios", text: "Cómo rediseñar procesos en torno a las nuevas herramientas y gestionar la transición del equipo sin fricción." },
          { sector: "Equipos operativos", text: "Talleres prácticos sobre tareas diarias: ventas, finanzas, operaciones y soporte aplicando IA con datos reales." },
        ],
      },
    ],
  },
];

const Services = () => {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  useScrollReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivePhase(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    phases.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const phase = phases.find((p) => p.services.some((s) => s.id === hash));
      if (!phase) return;
      setActivePhase(phase.id);
      setExpandedId(hash);
      window.setTimeout(() => {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (id: string) => setExpandedId((curr) => (curr === id ? null : id));

  return (
    <div>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-gradient-hero">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Servicios</p>
          <h1 className="text-display text-[clamp(3rem,7vw,7rem)] max-w-5xl reveal">
            Servicios Diseñados para <span className="text-primary">Cada Etapa de Tu Negocio</span>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground reveal">
            Cada fase de nuestra metodología agrupa los servicios necesarios para llegar al siguiente nivel. Explora cada bloque y abre el detalle de cualquier servicio para ver su demo, componentes y casos de uso.
          </p>
        </div>
      </section>

      {/* FLOATING SIDE RAIL — phases */}
      <nav
        aria-label="Fases"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
      >
        {phases.map((p) => {
          const isActive = activePhase === p.id;
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={() => setActivePhase(p.id)}
              className="group relative flex items-center justify-end"
              aria-label={p.title}
            >
              <span
                className={`pointer-events-none absolute right-7 whitespace-nowrap px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] bg-foreground text-background opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? "opacity-100 translate-x-0" : ""
                }`}
              >
                {p.title}
              </span>
              <span
                className={`block h-px transition-all duration-500 ${
                  isActive
                    ? "w-10 bg-primary"
                    : "w-4 bg-muted-foreground/40 group-hover:w-6 group-hover:bg-foreground"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* PHASES */}
      <div className="divide-y divide-hairline">
        {phases.map((phase) => (
          <section key={phase.id} id={phase.id} className="py-32 scroll-mt-32">
            <div className="container-luxe">
              {/* Phase header */}
              <div className="grid lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-5 reveal">
                  <h2 className="text-display text-4xl md:text-6xl">{phase.title}</h2>
                </div>
                <div className="lg:col-span-7 reveal lg:pt-10">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {phase.intro}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="reveal space-y-3">
                {phase.services.map((svc) => {
                  const open = expandedId === svc.id;
                  const Demo = svc.Demo;
                  return (
                    <article
                      key={svc.id}
                      id={svc.id}
                      className={`border bg-background scroll-mt-32 transition-all duration-500 ${
                        open
                          ? "border-primary/40 shadow-card"
                          : "border-hairline hover:border-primary/30"
                      }`}
                    >
                      {/* Card head — always visible */}
                      <button
                        type="button"
                        onClick={() => toggle(svc.id)}
                        aria-expanded={open}
                        className="group w-full text-left p-6 md:p-8 grid grid-cols-12 gap-4 md:gap-8 items-start"
                      >
                        <span className="col-span-2 md:col-span-1 text-eyebrow text-primary tabular-nums pt-1">
                          {svc.num}
                        </span>
                        <div className="col-span-10 md:col-span-9">
                          <h3 className="text-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                            {svc.title}
                          </h3>
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
                            {svc.short}
                          </p>
                        </div>
                        <div className="hidden md:flex col-span-2 items-center justify-end pt-1">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground transition-transform duration-500 ${
                              open ? "rotate-45" : "group-hover:translate-x-1"
                            }`}
                          >
                            {open ? "×" : "→"}
                          </span>
                        </div>
                      </button>

                      {/* Expandable detail */}
                      {open && (
                        <div className="border-t border-hairline animate-fade-in">
                          <div className="px-6 md:px-8 py-10 md:py-14 space-y-14">
                            {/* Description + Demo */}
                            <div className="grid lg:grid-cols-12 gap-10">
                              <div className={Demo ? "lg:col-span-5" : "lg:col-span-12 max-w-4xl"}>
                                <p className="text-eyebrow mb-4">— Descripción</p>
                                <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                                  {svc.description}
                                </p>
                              </div>
                              {Demo && (
                                <div className="lg:col-span-7">
                                  <div className="glass-card p-2 shadow-card">
                                    <Demo />
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Components + Deliverables */}
                            <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline">
                              <div className="bg-background p-8">
                                <p className="text-eyebrow text-primary mb-5">— Componentes clave</p>
                                <ul className="space-y-3">
                                  {svc.components.map((c) => (
                                    <li key={c} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                                      <span className="text-primary mt-1.5 text-[8px]">●</span>
                                      <span>{c}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-background p-8">
                                <p className="text-eyebrow text-primary mb-5">— Entregables</p>
                                <ul className="space-y-3">
                                  {svc.deliverables.map((d) => (
                                    <li key={d} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                                      <span className="text-primary mt-1.5 text-[8px]">●</span>
                                      <span>{d}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Use cases */}
                            <div>
                              <p className="text-eyebrow mb-6">— Casos de uso</p>
                              <div
                                className={`grid gap-px bg-hairline border border-hairline ${
                                  svc.cases.length >= 4
                                    ? "md:grid-cols-2 lg:grid-cols-3"
                                    : "md:grid-cols-3"
                                }`}
                              >
                                {svc.cases.map((c) => (
                                  <div
                                    key={c.sector}
                                    className="bg-background p-6 hover:bg-surface-1 transition-colors"
                                  >
                                    <p className="text-eyebrow text-primary mb-3">{c.sector}</p>
                                    <p className="text-foreground/80 text-sm leading-relaxed">{c.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Close action */}
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => toggle(svc.id)}
                                className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                              >
                                Cerrar detalle
                                <span className="inline-flex items-center justify-center w-7 h-7 border border-hairline">×</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 text-center border-t border-hairline">
        <div className="container-luxe">
          <h3 className="text-display text-4xl md:text-5xl mb-8 reveal">
            ¿Cuál de estos servicios encaja con tu negocio?
          </h3>
          <Link
            to="/assessment"
            className="reveal inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:shadow-glow transition-all duration-500"
          >
            Iniciar diagnóstico <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
