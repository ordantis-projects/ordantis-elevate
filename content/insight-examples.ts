export type InsightExample = {
  title: string;
  situation: string;
  decision: string;
};

// Ejemplos didácticos inventados: no son datos de propuestas ni resultados de clientes.
export const insightExamples: Record<string, InsightExample> = {
  "mantenimiento-predictivo-pocas-averias": {
    title: "Una sustitución preventiva no es una avería observada",
    situation: "Un motor acumula lecturas de vibración y se sustituye durante una revisión. El histórico termina ahí. Otro motor sigue observado, sin fallo, hasta que acaba el periodo de estudio.",
    decision: "Registrar por separado intervención, fallo y fin de seguimiento. No usar la sustitución como demostración de una avería futura ni etiquetar la falta de seguimiento como ausencia de fallo. Antes de entrenar, revisar qué evento permiten estudiar esos registros.",
  },
  "ciencia-datos-cambios-operacion": {
    title: "Más incidencias después de instalar sensores",
    situation: "Una fábrica incorpora sensores a equipos que antes solo tenían partes manuales. Aumenta el número de incidencias registradas y se propone investigar por qué empeoró la operación.",
    decision: "Comparar primero los equipos con medición equivalente en ambos periodos y revisar la exposición. Estudiar por separado la nueva cobertura. No atribuir el aumento agregado a más averías hasta separar detección, definición del evento y funcionamiento real.",
  },
  "elegir-modelo-tabular-temporal-grafo": {
    title: "Dos depósitos con el mismo nivel y distinta evolución",
    situation: "Un sistema debe anticipar la demanda de suministro. Dos depósitos tienen ahora el mismo nivel, pero uno se está vaciando y el otro acaba de recuperarse. Además, comparten parte de la red de distribución.",
    decision: "Primero se comparan lecturas actuales con pendientes y consumos recientes. Después se prueba si conservar la secuencia completa y las relaciones de suministro reduce errores adicionales. Si los agregados explican la diferencia, el grafo puede seguir siendo útil para consultar la red sin necesitar una red neuronal.",
  },
  "modelos-predictivos-picos-demanda": {
    title: "Un aviso correcto que llega cuando ya no se puede reforzar",
    situation: "Un centro de atención registra pocas desviaciones durante la jornada habitual. Cuando cierra otro centro cercano, recibe una oleada de solicitudes. El modelo detecta el pico al empezar la cola, pero el refuerzo necesita prepararse con antelación.",
    decision: "La prueba debe medir cuánto antes se anticipa el pico y si el aviso permite actuar. Acertar el máximo después de que llegue la demanda no cumple esa función. Se conserva el episodio completo para evaluar el siguiente candidato, sin repartir sus registros entre entrenamiento y prueba.",
  },
  "incertidumbre-prediccion-series-temporales": {
    title: "La misma cifra, dos decisiones de capacidad",
    situation: "Dos instalaciones reciben una previsión central similar. En una, las entradas históricas son regulares; en la otra hay un evento excepcional y falta una fuente de conteo. El panel muestra la misma etiqueta de confianza en ambas.",
    decision: "La etiqueta necesita una comprobación. Se revisa si los intervalos reflejan esa diferencia y mantienen cobertura en condiciones comparables. Si el segundo caso está fuera del dominio evaluado, se informa de esa limitación y se aplica la política de revisión acordada, sin inventar un porcentaje individual de certeza.",
  },
  "evaluar-piloto-ia-administracion-publica": {
    title: "Menos alertas después de perder cobertura",
    situation: "Un piloto detecta incidencias en varios equipamientos. En la segunda ronda aparecen menos alertas, pero dos fuentes dejaron de funcionar parte de la jornada y el personal no pudo revisar todas las entradas pendientes.",
    decision: "No se comunica una reducción de incidencias. Primero se separan horas observadas y utilizables, omisiones conocidas y revisión pendiente. La comparación se limita a condiciones comparables; lo que no pudo observarse queda como falta de evidencia, no como resultado favorable.",
  },
  "prediccion-optimizacion-asignacion-recursos": {
    title: "La demanda aumenta donde el equipo no llega a tiempo",
    situation: "Un operador dispone de equipos móviles para atender varias zonas. El predictor sitúa la mayor demanda en una de ellas, pero trasladar todos los equipos dejaría otra zona sin cobertura mínima y algunos llegarían después del pico.",
    decision: "El plan incorpora tiempos de traslado, cobertura mínima y recursos realmente disponibles. Se compara una asignación parcial con mantener la política actual, usando escenarios de demanda. La cifra prevista alimenta el cálculo; no sustituye las restricciones ni la aprobación de quien coordina el servicio.",
  },
  "cuando-no-usar-agente-ia": {
    title: "Un correo que siempre termina en el mismo registro",
    situation: "Un buzón recibe formularios con identificador, fecha y tipo de solicitud. El destino depende de una tabla de correspondencias. Los mensajes sin identificador pasan a revisión.",
    decision: "Empieza con un parser y la tabla. Si los textos libres necesitan interpretación, prueba un clasificador solo en esa entrada. No hace falta que un agente decida también dónde guardar el registro.",
  },
  "mcp-frente-api": {
    title: "La misma consulta desde dos asistentes",
    situation: "Un asistente interno y un cliente de escritorio necesitan consultar el estado de un expediente. La API ya comprueba qué expedientes puede ver cada usuario.",
    decision: "Una herramienta MCP puede reutilizar esa consulta entre clientes. El servidor mantiene la autorización de la API: conocer un identificador o descubrir la herramienta no concede acceso al expediente.",
  },
  "permisos-aprobacion-herramientas-agentes": {
    title: "Aprobar un borrador no autoriza otro destinatario",
    situation: "La persona revisora acepta enviar un resumen a una dirección concreta. Antes del envío, una nueva llamada del agente cambia esa dirección y añade un archivo.",
    decision: "La aprobación debe quedar ligada al destinatario, contenido y adjuntos revisados. Si cambia cualquiera de esos elementos, se invalida; el servicio de envío comprueba esa vinculación fuera del modelo.",
  },
  "prompt-injection-agentes-herramientas": {
    title: "Una instrucción escondida en un anexo",
    situation: "Un PDF recuperado incluye una frase que pide enviar el expediente a una dirección externa para completar la revisión. El usuario solo había solicitado un resumen.",
    decision: "El contenido del PDF sigue siendo material de consulta. Una política externa al modelo rechaza el envío porque la tarea no lo autoriza, aunque el agente interprete la frase como una instrucción legítima.",
  },
  "rag-abstencion-evidencia": {
    title: "La convocatoria existe; la prórroga no aparece",
    situation: "El corpus contiene una convocatoria y sus bases, pero ninguna resolución de ampliación. La pregunta es si se ha prorrogado el plazo.",
    decision: "La respuesta debe indicar que la colección consultada no permite confirmar una prórroga. Citar las bases originales y responder que no existe sería convertir una ausencia de evidencia en un hecho negativo.",
  },
  "data-leakage-validacion-temporal": {
    title: "Un dato de las nueve que llegó a las once",
    situation: "Una predicción se ejecuta a las 10:00. Un registro describe el estado de las 09:00, pero el sistema no lo recibió hasta las 11:00. La extracción histórica contiene ambas horas.",
    decision: "El backtest debe excluir ese registro del ejemplo de las 10:00. Filtrar solo por la hora del evento haría que el modelo evaluado dispusiera de información que el servicio real aún no conocía.",
  },
  "drift-calibracion-modelos": {
    title: "Cambió la población; aún no conocemos los resultados",
    situation: "Un servicio empieza a recibir más solicitudes de un grupo antes minoritario. La distribución cambia, pero la etiqueta final tarda semanas en llegar.",
    decision: "Comprueba cobertura y calidad de entrada, y conserva una cohorte para evaluar cuando maduren las etiquetas. La alerta justifica investigar; todavía no demuestra que reentrenar vaya a mejorar el modelo.",
  },
  "responsible-ai-privacidad-edge-ai": {
    title: "Inferencia local con diagnósticos remotos",
    situation: "Una cámara calcula ocupación en el dispositivo y envía solo un recuento. Sin embargo, el módulo de soporte adjunta fotogramas al registrar un error.",
    decision: "Incluye ese canal de soporte en el análisis del flujo. Desactivar el envío rutinario de vídeo no reduce la exposición de los fotogramas que salen por una vía de diagnóstico menos visible.",
  },
  "sensores-defectuosos-confianza-dato": {
    title: "Una lectura constante durante una maniobra",
    situation: "Un caudalímetro mantiene exactamente el mismo valor mientras cambian la posición de una válvula y la lectura de un sensor redundante.",
    decision: "Marca la serie como sospechosa y conserva el original. Contrasta alimentación, comunicaciones y mantenimiento antes de imputar: la persistencia aislada no permite distinguir un sensor bloqueado de un proceso estable.",
  },
  "exist-modalidades-aportan-valor": {
    title: "Una señal mejora la media y empeora la clase prioritaria",
    situation: "En una comparación hipotética, añadir visión mejora el resultado agregado, pero aumenta los errores de una clase poco frecuente que tiene prioridad operativa.",
    decision: "Revisa esos ejemplos y repite la comparación con la misma partición y semillas. La aceptación depende de la tarea prioritaria; una media mejor no resuelve ese compromiso. Este ejemplo no representa las cifras de GEMF.",
  },
  "exist-desacuerdo-anotadores": {
    title: "Dos mayorías que ocultan desacuerdos distintos",
    situation: "En un ejemplo inventado, cuatro de seis personas eligen una categoría. En otro, las seis la eligen. Una etiqueta mayoritaria convierte ambos casos en la misma salida.",
    decision: "Conserva los recuentos: el primer ejemplo necesita una probabilidad y una revisión distintas del segundo. Investiga además si el desacuerdo procede del contenido o de instrucciones de anotación poco claras.",
  },
  "exist-umbrales-soft-hard": {
    title: "La probabilidad apenas cambia; la etiqueta sí",
    situation: "Con un umbral ilustrativo de 0,5, una salida de 0,49 queda negativa y otra de 0,51 queda positiva. Las dos predicciones están muy próximas, pero desencadenan decisiones opuestas.",
    decision: "Evalúa la estabilidad de esa decisión alrededor del umbral y el coste de cada error. No elijas el corte con el mismo conjunto que después usarás para informar del resultado final.",
  },
  "exist-llm-mediador-semantico": {
    title: "El enriquecimiento cambió entre dos entrenamientos",
    situation: "Se repite un entrenamiento con el mismo clasificador, pero parte de las descripciones auxiliares se ha regenerado con otra versión del intérprete multimodal.",
    decision: "Trata la nueva colección de descripciones como una versión diferente del dataset. Compara ambos artefactos antes de atribuir la variación al clasificador; guardar solo su código no reproduce todo el experimento.",
  },
  "ocr-no-es-inteligencia-documental": {
    title: "Una fecha correcta en el campo equivocado",
    situation: "El OCR lee sin errores dos fechas: una junto a la firma y otra en el registro de entrada. La extracción asigna la primera al plazo del procedimiento.",
    decision: "La transcripción puede pasar su prueba mientras el campo falla. Evalúa por separado reconocimiento e interpretación, y muestra la región del documento para revisar cuál de las fechas corresponde al campo solicitado.",
  },
  "expediente-computable": {
    title: "Un anexo sustituido sigue en la carpeta",
    situation: "Un expediente contiene un presupuesto inicial y una rectificación. Ambos archivos son legibles y tienen importes distintos, pero solo el segundo corresponde al estado que se está revisando.",
    decision: "Registra que la rectificación sustituye al presupuesto desde un hito concreto. Conserva ambos originales y permite reconstruir qué versión se utilizó en cada revisión, sin decidir la vigencia por el nombre del archivo.",
  },
  "rag-no-es-chatbot-sobre-pdfs": {
    title: "Una tabla que el fragmentado rompe",
    situation: "Una condición está en el encabezado de una tabla y sus excepciones en una nota al pie. Al dividir el PDF por longitud, el índice separa la fila, el encabezado y la nota.",
    decision: "Prueba una unidad de recuperación que conserve esas relaciones antes de cambiar de modelo. Una interfaz de chat no puede compensar que los pasajes recuperados hayan perdido las condiciones que dan sentido al dato.",
  },
  "informe-tecnico-sin-inventar-informacion": {
    title: "Falta la superficie que exige una conclusión",
    situation: "La plantilla pide valorar la densidad de ocupación, pero el expediente solo aporta aforo y no identifica una superficie válida para el cálculo.",
    decision: "El borrador debe señalar el dato ausente y dejar esa conclusión pendiente. No debe sustituirlo por una superficie habitual ni por una frase como ocupación adecuada; la revisión necesita ver la dependencia sin resolver.",
  },
  "human-in-the-loop-no-es-boton-aprobar": {
    title: "Rechazar después de que el correo ya salió",
    situation: "Una interfaz muestra un resumen y dos botones: aceptar o rechazar. El envío al destinatario se ha ejecutado al generar el resumen.",
    decision: "Mueve el control antes del envío y bloquea la operación hasta resolver la revisión. El botón de rechazo solo tiene efecto si cambia lo que el sistema todavía puede hacer.",
  },
  "documento-convertido-en-geometria": {
    title: "Dos caminos compatibles con la misma descripción",
    situation: "Una descripción antigua usa un camino como lindero. La cartografía conserva dos trazados de fechas distintas y el documento no aclara a cuál se refiere.",
    decision: "Mantén dos hipótesis con sus fuentes y fechas. Resolver el topónimo por cercanía y dibujar una sola línea escondería una ambigüedad documental que debe revisar una persona con evidencia adicional.",
  },
  "procesar-audio-sin-grabar": {
    title: "El modo de error conserva lo que el modo normal descarta",
    situation: "El prototipo elimina cada ventana de audio después de clasificarla. Cuando la inferencia falla, una rutina guarda el buffer para depuración.",
    decision: "Prueba también fallos y reinicios, no solo sesiones normales. Si el objetivo es no persistir audio, sustituye ese diagnóstico por información técnica que no conserve la señal y comprueba el resultado en el dispositivo.",
  },
  "datos-publicos-mantenerlos-vivos": {
    title: "El CSV sigue disponible, pero cambió el código territorial",
    situation: "Una fuente reemplaza los códigos de distrito sin cambiar la URL. La descarga termina correctamente y el cruce con la tabla histórica pierde registros.",
    decision: "Compara cobertura y claves sin correspondencia antes de actualizar el informe. Conserva la versión anterior hasta disponer de una tabla de equivalencias revisada; un HTTP 200 no confirma que el dato siga siendo compatible.",
  },
  "validar-ia-antes-de-industrializar": {
    title: "Una demo rápida con una revisión lenta",
    situation: "El sistema prepara un borrador en segundos. Para aprobarlo, una persona vuelve a abrir cada documento porque las referencias no permiten localizar los fragmentos usados.",
    decision: "Mide el proceso hasta la aprobación, no hasta la generación. Incluye la búsqueda de evidencias y las correcciones en la comparación con el método actual antes de decidir si la prueba merece continuar.",
  },
  "anonimizar-documentos-administrativos": {
    title: "El nombre desaparece, pero queda una combinación identificativa",
    situation: "Un informe sustituye un nombre por Persona A, pero conserva cargo único, centro y fecha exacta de un incidente. Además, una tabla permite recuperar el nombre original.",
    decision: "El alias reversible debe tratarse como seudonimización. Revisa también la identificación por contexto antes de compartir el informe; ocultar el nombre no demuestra que el documento haya quedado anónimo.",
  },
  "evaluar-subvenciones-con-ia-trazable": {
    title: "La evidencia corresponde a otro periodo",
    situation: "El sistema localiza un certificado que menciona la actividad requerida. Su fecha queda fuera del periodo previsto por el criterio de valoración.",
    decision: "Muestra requisito, periodo y certificado juntos, y marca la discrepancia. La coincidencia de palabras no basta para proponer que el requisito se cumple; la valoración necesita comprobar la condición temporal.",
  },
  "convertir-excel-en-memoria-tecnica": {
    title: "Una celda parece vacía porque contiene una fórmula",
    situation: "Una fórmula devuelve una cadena vacía cuando falta una entrada. Al exportar la hoja, el sistema interpreta esa celda como cero y genera un párrafo sobre el resultado.",
    decision: "Distingue cero, ausencia y error de cálculo en el modelo intermedio. Conserva las referencias a las celdas de entrada para que la revisión no tenga que deducir por qué apareció esa cifra.",
  },
  "datos-territoriales-decisiones-publicas": {
    title: "Un recurso con nombre nuevo y dirección antigua",
    situation: "Dos registros describen el mismo equipamiento: uno usa su denominación actual y otro conserva la anterior. Un tercer registro comparte el nombre, pero pertenece a otra localidad.",
    decision: "Combina identificador, ubicación y vigencia para proponer coincidencias. Guarda las ambiguas para revisión; unir solo por nombre puede duplicar el primer recurso y fusionarlo con el tercero.",
  },
  "gemelo-digital-infraestructura-publica": {
    title: "Comparar mantenimiento sin modelar cada detalle",
    situation: "La decisión consiste en elegir una ventana de mantenimiento para una red. Importan conectividad, capacidad y demanda; el acabado visual de los activos no interviene en esa comparación.",
    decision: "Construye y contrasta primero el modelo de flujo. Añade detalle geométrico solo si modifica una restricción o una salida que se usará para escoger la ventana de intervención.",
  },
  "medir-agua-datos-incompletos": {
    title: "El hueco coincide con una avería",
    situation: "Faltan lecturas precisamente durante una incidencia de la instalación. La interpolación entre los puntos anterior y posterior produce una curva suave.",
    decision: "No evalúes el método ocultando solo puntos al azar de días normales. Reserva huecos con incidencias comparables y comprueba si el intervalo de incertidumbre permite sostener la decisión prevista.",
  },
  "ocupacion-via-publica-datos-geoespaciales": {
    title: "Una discrepancia menor que el error de posición",
    situation: "La observación parece superar el límite autorizado. Sin embargo, la incertidumbre de geolocalización es mayor que la separación entre ambas geometrías.",
    decision: "Clasifica la comparación como no concluyente y solicita una observación más precisa. Esa geometría no permite afirmar por sí sola que se haya excedido el límite.",
  },
  "industrializar-modelo-predictivo-tiempo-real": {
    title: "Una predicción correcta que llega después de la decisión",
    situation: "El modelo supera la referencia offline. Bajo concurrencia, la cola de ingestión retrasa los eventos y la respuesta llega cuando ya se ha cerrado la ventana operativa.",
    decision: "Mide desde la recepción del evento hasta la entrega utilizable, incluyendo colas y reintentos. Define una salida degradada o una abstención cuando venza el plazo; acelerar solo la inferencia puede no resolver el cuello de botella.",
  },
};
