import type { Insight } from "./site.ts";

const publishedAt = "2026-08-26";
const proposalEvidence =
  "Pregunta derivada de decisiones técnicas recurrentes en propuestas internas. No describe un proyecto ejecutado, un cliente ni un resultado implantado.";

export const priorityInsights: Insight[] = [
  {
    slug: "ocr-no-es-inteligencia-documental",
    title: "¿Por qué OCR no es lo mismo que inteligencia documental?",
    description:
      "El OCR transcribe signos; un sistema documental debe reconstruir estructura, significado, evidencia y condiciones de revisión.",
    answer:
      "El OCR convierte una imagen en texto y coordenadas, pero no sabe por sí solo qué cifra es un total, qué versión está vigente o qué párrafo justifica una conclusión. La inteligencia documental empieza cuando esa transcripción se relaciona con una estructura, se valida y conserva el fragmento original como evidencia.",
    context: [
      "Dos documentos pueden contener las mismas palabras y asignarles funciones distintas: una fecha puede ser de firma, registro, vigencia o vencimiento. Perder la posición, el encabezado o la tabla elimina parte del significado.",
      "La tasa media de caracteres correctos tampoco describe el riesgo. Un error en una nota al pie puede ser irrelevante; el mismo error en un importe, un identificador o una condición puede cambiar una decisión.",
    ],
    checks: [
      "Formatos, calidades de escaneo, idiomas y estructuras presentes en la muestra.",
      "Campos cuya posición o relación con una tabla cambia su interpretación.",
      "Errores que requieren revisión obligatoria por su efecto jurídico, económico u operativo.",
      "Referencia necesaria para volver desde cada dato al documento, página y región de origen.",
      "Documentos que deben rechazarse porque su calidad no permite una extracción fiable.",
    ],
    method: [
      { title: "Transcribir", text: "Conservamos texto, página, coordenadas, confianza y versión del motor de OCR." },
      { title: "Reconstruir", text: "Identificamos bloques, tablas, secciones, encabezados y relaciones antes de extraer campos." },
      { title: "Validar", text: "Aplicamos tipos, reglas cruzadas y comprobaciones contra otras partes del expediente." },
      { title: "Citar", text: "Cada salida revisable enlaza con el fragmento visual que permite confirmarla o corregirla." },
    ],
    stopSignals: [
      "La calidad del documento impide distinguir caracteres críticos.",
      "La extracción pierde tablas, anexos o notas necesarios para interpretar el dato.",
      "No se puede volver desde un campo al fragmento que lo originó.",
      "La revisión corrige de forma repetida la misma clase de campo de alto riesgo.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "expediente-computable",
    title: "¿Qué hace que un expediente sea computable?",
    description:
      "Una definición operativa que incluye documentos, versiones, entidades, reglas, estados y evidencia, no solo archivos digitalizados.",
    answer:
      "Un expediente es computable cuando sus piezas pueden relacionarse mediante identificadores y versiones, y cuando cada hecho o estado conserva la evidencia que lo respalda. Digitalizar archivos facilita el acceso; convertirlos en un modelo revisable permite comprobar requisitos, detectar contradicciones y seguir cambios.",
    context: [
      "Una carpeta ordenada sigue siendo ambigua si no distingue borradores, anexos vigentes, documentos sustituidos y resoluciones. El nombre del archivo rara vez basta para reconstruir el procedimiento.",
      "La representación estructurada sirve para consultar y validar, pero debe conservar el vínculo con el original y el contexto que una extracción puede perder. Su valor probatorio depende del procedimiento y no lo determina el modelo.",
    ],
    checks: [
      "Unidad del expediente y claves que relacionan personas, documentos, hitos y decisiones.",
      "Estados permitidos, transiciones y responsable de cada cambio.",
      "Versiones de documentos y reglas aplicables en cada fecha.",
      "Evidencia mínima que debe acompañar a un dato, una ausencia o una contradicción.",
      "Permisos distintos para originales, campos estructurados y resultados derivados.",
    ],
    method: [
      { title: "Inventariar", text: "Listamos tipos documentales, versiones, actores, hitos y decisiones sin asumir que todos los expedientes son iguales." },
      { title: "Modelar", text: "Definimos entidades, relaciones, estados y reglas con identificadores estables." },
      { title: "Enlazar evidencia", text: "Cada campo extraído mantiene documento, página, fragmento y fecha de vigencia." },
      { title: "Probar consultas", text: "Validamos preguntas reales, contradicciones y cambios de versión con expedientes completos e incompletos." },
    ],
    stopSignals: [
      "No existe una fuente fiable para identificar versiones vigentes.",
      "Las reglas dependen de interpretación no documentada y el sistema la presenta como hecho.",
      "Los identificadores no permiten relacionar piezas sin mezclar expedientes.",
      "La representación estructurada no conserva el camino hasta el original.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "rag-no-es-chatbot-sobre-pdfs",
    title: "¿Qué necesita un RAG además de un chat sobre PDF?",
    description:
      "Decisiones sobre inventario, estructura documental, versiones y recuperación antes de añadir una interfaz de conversación.",
    answer:
      "Necesita un corpus mantenido, permisos aplicados a la recuperación y fragmentos que conserven el contexto del documento. El primer diseño debe resolver qué entra en el índice, cómo se actualiza y cómo recuperar una tabla o una condición completa; la interfaz conversacional viene después.",
    context: [
      "La respuesta puede sonar correcta aunque proceda de un documento derogado o combine fragmentos incompatibles. El problema aparece antes de generar: en el inventario, los metadatos y la recuperación.",
      "Para comprobar esta arquitectura, empieza por preguntas con pasajes esperados y observa si aparecen en la recuperación. La evaluación de respuestas y abstención es una prueba posterior, descrita en la guía específica de RAG con evidencia.",
    ],
    checks: [
      "Propietario, vigencia, versión y nivel de acceso de cada documento.",
      "Unidad de fragmentación que conserva tablas, referencias y contexto suficiente.",
      "Preguntas que requieren una fila de tabla, una excepción o un anexo completo.",
      "Regla de sustitución y borrado de documentos que dejan de estar vigentes.",
      "Sincronización entre los permisos de la fuente y los del índice.",
    ],
    method: [
      { title: "Gobernar el corpus", text: "Registramos fuente, versión, vigencia, permisos y motivo de inclusión de cada documento." },
      { title: "Evaluar recuperación", text: "Medimos si los pasajes necesarios aparecen antes de valorar la redacción del modelo." },
      { title: "Probar estructura", text: "Comparamos fragmentos por longitud y por estructura documental con preguntas que dependen de tablas y notas." },
      { title: "Ensayar cambios", text: "Sustituimos un documento y revocamos un permiso para comprobar que la búsqueda deja de devolver los fragmentos anteriores." },
    ],
    stopSignals: [
      "Los permisos documentales no se aplican antes de recuperar fragmentos.",
      "El sistema mezcla versiones sin mostrar cuál utilizó.",
      "El fragmentado separa una regla de sus condiciones y excepciones.",
      "Borrar o restringir un documento no actualiza los resultados de recuperación.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
    sources: [
      { label: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401" },
    ],
  },
  {
    slug: "informe-tecnico-sin-inventar-informacion",
    title: "¿Puede una IA redactar un informe técnico sin inventar información?",
    description:
      "Un diseño que separa hechos, cálculos, redacción y revisión para que una frase no aparezca sin procedencia.",
    answer:
      "Puede preparar un borrador si cada afirmación procede de un campo validado, una regla de cálculo o un fragmento citado. La generación debe trabajar dentro de un esquema explícito, marcar ausencias y contradicciones y dejar a una persona la aprobación de conclusiones con efecto técnico o administrativo.",
    context: [
      "Pedir a un modelo que lea todos los anexos y escriba el informe de una vez mezcla extracción, interpretación y estilo en una operación difícil de comprobar. Una redacción fluida puede ocultar que falta un dato obligatorio.",
      "Construye primero una representación intermedia con hechos, unidades, versiones, cálculos y evidencia. Después compara las afirmaciones del borrador con esa representación: un esquema o un prompt por sí solos no impiden que el generador añada información.",
    ],
    checks: [
      "Secciones obligatorias y fuente permitida para cada una.",
      "Cálculos que deben ejecutarse con código o reglas deterministas.",
      "Tratamiento visible de datos ausentes, incompatibles o fuera de rango.",
      "Frases que requieren cita y nivel de precisión de esa referencia.",
      "Persona competente para corregir y aprobar cada tipo de conclusión.",
    ],
    method: [
      { title: "Estructurar", text: "Extraemos hechos y evidencias a un esquema con tipos, unidades y estados de validación." },
      { title: "Calcular", text: "Las operaciones reproducibles se resuelven fuera del modelo y conservan entradas y fórmula." },
      { title: "Redactar", text: "El generador recibe campos autorizados. Un control posterior detecta afirmaciones sin respaldo y bloquea el borrador o lo envía a revisión." },
      { title: "Revisar", text: "La interfaz presenta frase, dato y fuente juntos para aceptar, corregir o rechazar con trazabilidad." },
    ],
    stopSignals: [
      "El borrador introduce cifras o conclusiones que no existen en la representación validada.",
      "Un dato ausente se transforma en una frase plausible sin aviso.",
      "Los cálculos dependen de texto generado y no se pueden reproducir.",
      "La persona revisora no puede localizar la evidencia sin rehacer todo el análisis.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "human-in-the-loop-no-es-boton-aprobar",
    title: "¿Por qué human-in-the-loop no es poner un botón de aprobar?",
    description:
      "La intervención humana necesita autoridad real, información suficiente y una consecuencia trazable dentro del flujo.",
    answer:
      "Existe human-in-the-loop cuando una persona puede comprender la propuesta, cambiarla, rechazarla o detener el proceso antes de una acción relevante. Un botón que aparece al final, sin evidencia ni alternativas y con la aprobación preseleccionada, solo añade fricción y desplaza la responsabilidad.",
    context: [
      "La revisión funciona peor cuando el sistema entrega muchas sugerencias plausibles y casi nunca se equivoca de forma visible. Con el tiempo, aprobar se convierte en un gesto automático.",
      "El punto de control debe situarse donde todavía es posible cambiar el resultado. También necesita registrar qué vio la persona, qué modificó y qué versión de reglas o modelo produjo la propuesta.",
    ],
    checks: [
      "Acciones que una persona puede corregir, rechazar, posponer o escalar.",
      "Evidencia, incertidumbre y alternativas visibles en el momento de decidir.",
      "Carga de revisión por caso y riesgo de aprobación rutinaria.",
      "Consecuencia técnica de un rechazo y forma de recuperar el flujo.",
      "Registro necesario sin almacenar información personal innecesaria.",
    ],
    method: [
      { title: "Clasificar decisiones", text: "Separamos información, recomendación, aprobación y acción según impacto y reversibilidad." },
      { title: "Diseñar la vista", text: "Mostramos propuesta, evidencia, incertidumbre, cambios y alternativas en la misma pantalla." },
      { title: "Probar desacuerdo", text: "Introducimos errores y casos ambiguos para observar si la persona detecta y corrige el problema." },
      { title: "Medir la revisión", text: "Registramos tiempo, correcciones, rechazos y omisiones por tipo de riesgo." },
    ],
    stopSignals: [
      "La interfaz no permite modificar o rechazar la propuesta.",
      "La persona aprueba sin poder ver la evidencia utilizada.",
      "El volumen obliga a revisar más rápido de lo que permite comprender cada caso.",
      "Un rechazo no cambia el flujo o la acción ya se ejecutó.",
    ],
    relatedCapability: "agentes-ia",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "documento-convertido-en-geometria",
    title: "¿Puede un documento convertirse en una geometría?",
    description:
      "Cómo pasar de descripciones, relaciones y referencias a hipótesis geoespaciales que una persona pueda contrastar.",
    answer:
      "Un documento puede aportar límites, distancias, colindancias y referencias para construir una o varias hipótesis geométricas. No debería producir automáticamente una geometría definitiva: el sistema debe conservar qué fragmento originó cada relación, qué transformación aplicó y qué incertidumbre queda por resolver.",
    context: [
      "Las descripciones territoriales pueden usar nombres históricos, medidas antiguas, hitos desaparecidos o referencias relativas. Dos documentos compatibles en texto pueden apuntar a geometrías distintas por fecha o sistema de coordenadas.",
      "Representar varias hipótesis evita que una interpretación temprana se convierta en un hecho. La comparación con cartografía, topología y documentos posteriores sirve para descartar alternativas, no para borrar la duda original.",
    ],
    checks: [
      "Fecha, versión, vocabulario territorial y unidad de medida del documento.",
      "Sistema de referencia espacial y transformaciones aplicadas.",
      "Relaciones topológicas: linda con, contiene, segrega de, coincide con o queda entre.",
      "Fuentes cartográficas externas y vigencia de cada una.",
      "Nivel de incertidumbre y autoridad competente para validar la geometría.",
    ],
    method: [
      { title: "Extraer relaciones", text: "Convertimos descripciones en entidades, medidas y vínculos con referencia al fragmento original." },
      { title: "Normalizar", text: "Unificamos unidades, fechas, topónimos y sistemas de coordenadas sin ocultar la conversión." },
      { title: "Generar hipótesis", text: "Construimos alternativas geométricas y comprobamos restricciones espaciales y temporales." },
      { title: "Contrastar", text: "Una persona compara evidencia documental, cartografía y coherencia topológica antes de validar." },
    ],
    stopSignals: [
      "El sistema no puede identificar el sistema de referencia o la unidad utilizada.",
      "Varias hipótesis siguen siendo compatibles y la salida presenta solo una.",
      "Una fuente posterior contradice la geometría sin que aparezca la discrepancia.",
      "Se confunde una reconstrucción técnica con una delimitación jurídica definitiva.",
    ],
    relatedCapability: "data-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "procesar-audio-sin-grabar",
    title: "¿Puede una IA procesar audio sin grabarlo?",
    description:
      "Qué significa analizar una señal en memoria o en el dispositivo y qué datos derivados siguen necesitando control.",
    answer:
      "Sí, una arquitectura puede analizar audio en memoria o en el propio dispositivo y descartar la señal después de obtener el resultado necesario. Eso, por sí solo, no basta para afirmar que el diseño protege la privacidad: hay que comprobar si se guardan transcripciones, embeddings, eventos, diagnósticos, telemetría o fragmentos de error capaces de revelar información.",
    context: [
      "Grabar es persistir la señal; procesar puede ocurrir durante unos milisegundos sin crear un archivo. Aun así, la memoria, los buffers, los logs y los servicios de diagnóstico forman parte del flujo de datos.",
      "El resultado derivado también puede ser sensible. Una etiqueta de evento, una transcripción parcial o una marca temporal puede permitir inferir conducta aunque el audio original ya no exista.",
    ],
    checks: [
      "Lugar exacto de captura, inferencia, agregación y descarte de la señal.",
      "Buffers, volcados de error, telemetría y registros que pueden conservar fragmentos.",
      "Datos derivados producidos y tiempo de conservación de cada uno.",
      "Actualizaciones, acceso físico y mecanismos para verificar el software del dispositivo.",
      "Comportamiento cuando no hay conexión, el modelo falla o la confianza es insuficiente.",
    ],
    method: [
      { title: "Dibujar el flujo", text: "Documentamos desde el micrófono hasta cada salida, almacenamiento y servicio externo." },
      { title: "Minimizar", text: "Eliminamos audio, transcripciones y telemetría que no sean necesarios para la función declarada." },
      { title: "Probar el dispositivo", text: "Inspeccionamos buffers, logs, tráfico y estados de error durante una sesión representativa." },
      { title: "Verificar derivados", text: "Evaluamos si eventos o vectores permiten reidentificar, reconstruir o inferir más de lo previsto." },
    ],
    stopSignals: [
      "Un proveedor remoto recibe la señal sin que el diseño lo declare.",
      "Los logs conservan audio o transcripciones durante fallos.",
      "Los datos derivados permiten inferencias incompatibles con la finalidad prevista.",
      "No existe una forma técnica de comprobar el borrado o limitar la conservación.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
  {
    slug: "datos-publicos-mantenerlos-vivos",
    title: "¿Por qué el problema de los datos públicos no termina al encontrarlos?",
    description:
      "Publicar un archivo no resuelve su vigencia, sus identificadores ni los cambios que pueden romper un sistema que depende de él.",
    answer:
      "Un dato público resulta operativo cuando se conoce quién lo mantiene, con qué frecuencia cambia, qué significa cada campo y cómo se identifican sus versiones. Encontrar un CSV o una API es solo el inicio: sin controles de esquema, actualidad y procedencia, una integración puede seguir funcionando mientras entrega información incompleta o antigua.",
    context: [
      "Las fuentes públicas cambian encabezados, formatos, códigos y calendarios sin que todas las modificaciones aparezcan como una nueva versión formal. Un proceso automático puede aceptar el archivo y perder silenciosamente parte de los registros.",
      "La vigencia también depende de la decisión. Un catálogo anual puede servir para un análisis histórico y ser insuficiente para una alerta diaria. La frecuencia necesaria debe derivarse del uso, no de la disponibilidad de la fuente.",
    ],
    checks: [
      "Organismo responsable, licencia, URL canónica y canal de cambios de cada fuente.",
      "Fecha de observación, fecha de publicación y periodo al que se refiere cada registro.",
      "Identificadores que permiten relacionar versiones, territorios y entidades sin usar solo el nombre.",
      "Cambios de esquema, unidades, cobertura y definiciones a lo largo del tiempo.",
      "Tolerancia de la decisión a retrasos, huecos y revisiones retroactivas.",
    ],
    method: [
      { title: "Inventariar", text: "Registramos responsable, licencia, cobertura, frecuencia, esquema e identificadores antes de integrar." },
      { title: "Contratar el dato", text: "Convertimos tipos, unidades, claves y mínimos de calidad en pruebas reproducibles." },
      { title: "Versionar", text: "Conservamos la fecha de captura, el original y las transformaciones para reconstruir cada resultado." },
      { title: "Monitorizar", text: "Alertamos sobre retrasos, cambios de esquema, caídas de cobertura y valores físicamente incompatibles." },
    ],
    stopSignals: [
      "La fuente no permite identificar el periodo o la versión de los registros.",
      "Un cambio de esquema elimina datos sin provocar un fallo visible.",
      "Los nombres se usan como única clave y mezclan entidades distintas.",
      "La actualización disponible llega después de la decisión que pretende apoyar.",
    ],
    relatedCapability: "data-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote: proposalEvidence,
  },
];
