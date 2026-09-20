import type { Insight } from "./site.ts";

const publishedAt = "2026-08-26";

const mcpSource = {
  label: "Especificación y autorización de Model Context Protocol",
  url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization",
};

const existSources = [
  { label: "Paper GEMF", url: "https://clef-staging.pages.dev/paper174.pdf" },
  { label: "Resultados oficiales de EXIST 2026", url: "https://clef-staging.pages.dev/paper152.pdf" },
  { label: "Código y guía de reproducción", url: "https://github.com/cofrian/exist2026-ordantis" },
];

export const additionalInsights: Insight[] = [
  {
    slug: "cuando-no-usar-agente-ia",
    title: "¿Cuándo no conviene utilizar un agente de IA?",
    description:
      "Una prueba de descarte para elegir entre agente, workflow, búsqueda asistida o automatización determinista.",
    answer:
      "No conviene usar un agente cuando los pasos son estables, la salida admite reglas verificables o una acción errónea tendría un impacto alto sin posibilidad de revisión. En esos casos, un workflow explícito suele ser más barato, reproducible y fácil de auditar.",
    context: [
      "Un agente añade decisiones en tiempo de ejecución: puede escoger una herramienta, reformular un plan o detenerse. Esa flexibilidad solo aporta valor si el proceso realmente cambia con el contexto.",
      "Si cada excepción termina codificada como otra instrucción en lenguaje natural, el problema no necesita más autonomía. Necesita un flujo visible, validaciones y responsables.",
    ],
    checks: [
      "Cuántas rutas reales sigue el proceso y con qué frecuencia cambian.",
      "Qué parte requiere interpretar contexto y qué parte admite una regla.",
      "Qué acción sería irreversible, costosa o difícil de detectar.",
      "Si existe una referencia determinista con la que comparar calidad, latencia y coste.",
      "Quién puede revisar una excepción y cuánto tarda en hacerlo.",
    ],
    method: [
      { title: "Dibujar el flujo actual", text: "Enumeramos decisiones, entradas, excepciones y salidas sin introducir todavía un modelo." },
      { title: "Construir la opción simple", text: "Probamos reglas, formularios, búsqueda y workflows antes de conceder autonomía." },
      { title: "Aislar la incertidumbre", text: "El modelo solo interviene en el tramo que requiere interpretación; el resto permanece determinista." },
      { title: "Comparar operación", text: "Medimos tasa de excepción, revisión humana, latencia, coste y fallos graves en ambas opciones." },
    ],
    stopSignals: [
      "El agente no mejora la referencia simple en los casos que importan.",
      "La misma entrada produce rutas incompatibles sin una razón trazable.",
      "Cada herramienta necesita permisos más amplios que la tarea concreta.",
      "La revisión humana cuesta tanto como ejecutar el flujo original.",
    ],
    relatedCapability: "agentes-ia",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Guía de decisión técnica. No presupone que un agente sea la solución y no describe una implantación concreta.",
  },
  {
    slug: "mcp-frente-api",
    title: "¿Cuándo utilizar MCP y cuándo integrar una API directamente?",
    description:
      "Criterios de interoperabilidad, permisos y mantenimiento para no confundir un protocolo de herramientas con la API de negocio.",
    answer:
      "MCP encaja cuando varios clientes de IA deben descubrir y utilizar recursos o herramientas con una interfaz común. Una API directa sigue siendo preferible para integraciones estables, de alto rendimiento o con contratos de negocio que no necesitan descubrimiento por un modelo.",
    context: [
      "MCP normaliza cómo un host de IA encuentra herramientas, recursos y prompts. No sustituye la lógica, la autorización ni los contratos de la API que hay detrás.",
      "Añadir una capa MCP a una única llamada interna puede crear mantenimiento sin aportar interoperabilidad. Exponer una API completa como herramientas, en cambio, amplía innecesariamente la superficie de riesgo.",
    ],
    checks: [
      "Número de clientes, modelos y proveedores que deben reutilizar la integración.",
      "Necesidad real de descubrir herramientas o recursos en tiempo de ejecución.",
      "Contrato de autenticación, audiencia del token y separación entre usuarios.",
      "Volumen, latencia y semántica de reintentos de cada operación.",
      "Qué campos de la API no deben quedar expuestos al modelo.",
    ],
    method: [
      { title: "Definir el contrato de negocio", text: "La API conserva validaciones, idempotencia y autorización aunque exista un servidor MCP." },
      { title: "Diseñar herramientas estrechas", text: "Cada herramienta representa una intención concreta, no un proxy genérico a cualquier endpoint." },
      { title: "Separar identidades", text: "Validamos audiencia y alcance de tokens; un token recibido no se reenvía sin control a otro recurso." },
      { title: "Probar dos clientes", text: "La interoperabilidad se comprueba con clientes distintos y con errores de autorización, versión y transporte." },
    ],
    stopSignals: [
      "Solo existe un consumidor estable y la capa adicional no reduce trabajo.",
      "El servidor actúa como proxy de credenciales o acepta tokens destinados a otro recurso.",
      "Las herramientas exponen operaciones genéricas que el modelo puede combinar sin límites.",
      "La latencia o el volumen hacen inviable el transporte elegido.",
    ],
    relatedCapability: "agentes-ia",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "La comparación se apoya en la especificación pública de MCP; la decisión final depende del contrato y del perfil de carga de cada sistema.",
    sources: [mcpSource, { label: "RFC 9110: semántica HTTP", url: "https://www.rfc-editor.org/rfc/rfc9110" }],
  },
  {
    slug: "permisos-aprobacion-herramientas-agentes",
    title: "¿Cómo definir permisos y aprobaciones para las herramientas de un agente?",
    description:
      "Un modelo de permisos mínimos, previsualización de cambios y confirmación humana según el impacto de cada acción.",
    answer:
      "Cada herramienta debe recibir solo los permisos, datos y alcance que necesita para una operación concreta. Las acciones con efecto externo, económico, jurídico o difícil de revertir requieren una previsualización comprensible y aprobación humana en el momento de ejecutarse.",
    context: [
      "El nombre de una herramienta no es una política de seguridad. Enviar correo, actualizar un registro o borrar un archivo requieren controles distintos aunque el agente los invoque con la misma sintaxis.",
      "La aprobación pierde valor si aparece al inicio de una sesión y cubre acciones todavía desconocidas. Quien confirma debe ver destino, alcance y efecto esperado.",
    ],
    checks: [
      "Identidad en cuyo nombre se ejecuta la acción.",
      "Recursos, campos y operaciones incluidos en el permiso.",
      "Reversibilidad, coste y personas afectadas.",
      "Datos que aparecerán en la vista previa y en la traza.",
      "Caducidad, revocación y rotación de credenciales.",
    ],
    method: [
      { title: "Clasificar herramientas", text: "Separamos lectura, escritura reversible, comunicación externa y acciones irreversibles." },
      { title: "Reducir alcance", text: "Usamos credenciales y scopes distintos por herramienta, entorno y usuario cuando sea posible." },
      { title: "Diseñar la aprobación", text: "La interfaz muestra qué cambiará, dónde, con qué datos y quién lo solicita." },
      { title: "Ensayar abusos", text: "Probamos parámetros manipulados, repeticiones, cambios de destino y fallos a mitad de operación." },
    ],
    stopSignals: [
      "Una credencial permite más acciones que las declaradas por la herramienta.",
      "La persona aprueba sin poder identificar el destinatario o el efecto.",
      "Los reintentos pueden duplicar una compra, mensaje o modificación.",
      "La traza guarda secretos o contenido sensible que no necesita para auditar.",
    ],
    relatedCapability: "agentes-ia",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Patrón de control para agentes con herramientas. Los umbrales de aprobación deben adaptarse al proceso y a su marco jurídico.",
    sources: [mcpSource],
  },
  {
    slug: "prompt-injection-agentes-herramientas",
    title: "¿Cómo limitar un ataque de prompt injection en un agente con herramientas?",
    description:
      "Controles para tratar documentos, páginas y mensajes como datos no fiables, incluso cuando parecen instrucciones legítimas.",
    answer:
      "No se resuelve con una frase defensiva en el prompt. Hay que separar instrucciones y datos, limitar herramientas por política, validar parámetros fuera del modelo y exigir aprobación para acciones sensibles. La evaluación debe incluir inyecciones indirectas dentro de fuentes recuperadas.",
    context: [
      "Un agente puede leer una instrucción maliciosa en una web, un correo o un PDF y confundirla con el objetivo de la tarea. El atacante no necesita hablar directamente con el sistema.",
      "Los filtros de texto ayudan a detectar patrones conocidos, pero no constituyen una frontera de seguridad. Esa frontera debe estar en permisos, validaciones y aislamiento.",
    ],
    checks: [
      "Fuentes externas que el agente incorpora a su contexto.",
      "Herramientas capaces de enviar, modificar, comprar, borrar o revelar datos.",
      "Validaciones que se ejecutan fuera del modelo.",
      "Información sensible visible en prompts, resultados y trazas.",
      "Casos de prueba con instrucciones ocultas, codificadas o contradictorias.",
    ],
    method: [
      { title: "Marcar procedencia", text: "Cada fragmento mantiene origen y nivel de confianza; el contenido recuperado nunca se eleva a instrucción del sistema." },
      { title: "Aplicar políticas", text: "Un componente determinista autoriza herramienta, destino y parámetros antes de ejecutar." },
      { title: "Reducir exposición", text: "El agente recibe solo los datos necesarios para la tarea y no puede leer secretos por defecto." },
      { title: "Atacar la prueba", text: "La suite incluye inyección directa e indirecta, evasiones, herramientas comprometidas y exfiltración." },
    ],
    stopSignals: [
      "Un documento puede cambiar el objetivo o habilitar una herramienta.",
      "El modelo decide por sí mismo si puede revelar un secreto.",
      "La aprobación muestra una descripción generada pero no los parámetros reales.",
      "La evaluación solo prueba prompts del usuario y omite fuentes recuperadas.",
    ],
    relatedCapability: "agentes-ia",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Guía de reducción de riesgo. Ningún control aislado elimina los ataques de prompt injection; se requiere defensa por capas.",
    sources: [
      { label: "OWASP GenAI Security Project", url: "https://genai.owasp.org/" },
      { label: "NIST AI RMF: perfil de IA generativa", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
    ],
  },
  {
    slug: "rag-abstencion-evidencia",
    title: "¿Cómo construir un RAG que se abstenga y enseñe la evidencia?",
    description:
      "Diseño de recuperación, citas y umbrales para que la ausencia de evidencia produzca una respuesta útil, no una invención.",
    answer:
      "Un RAG fiable distingue entre encontrar un texto parecido y encontrar evidencia suficiente. Debe conservar documento, versión y fragmento, comprobar si las fuentes sostienen la afirmación y abstenerse cuando falta cobertura, hay contradicción o la pregunta queda fuera del corpus.",
    context: [
      "Recuperar pasajes mejora el acceso a una colección, pero no demuestra que respondan la pregunta. El modelo puede completar huecos con conocimiento previo o unir dos fragmentos incompatibles.",
      "La abstención no es un mensaje genérico de error. Debe indicar qué falta y permitir reformular, ampliar la búsqueda o escalar a una persona.",
    ],
    checks: [
      "Unidad de indexación, versión documental y permisos por fragmento.",
      "Preguntas sin respuesta, ambiguas y con fuentes contradictorias.",
      "Criterio que relaciona cada afirmación con una cita suficiente.",
      "Umbral de recuperación y regla de abstención por tipo de consulta.",
      "Tiempo necesario para que una persona verifique la respuesta.",
    ],
    method: [
      { title: "Construir el conjunto", text: "Incluimos preguntas respondibles, no respondibles, temporales y adversariales con evidencia esperada." },
      { title: "Evaluar recuperación", text: "Medimos si el fragmento necesario aparece antes de evaluar la redacción final." },
      { title: "Verificar afirmaciones", text: "Cada proposición sustantiva se compara con la cita y su versión documental." },
      { title: "Calibrar abstención", text: "Ajustamos umbrales con el coste de inventar, omitir y escalar en el proceso real." },
    ],
    stopSignals: [
      "Las citas son próximas al tema, pero no sostienen la afirmación.",
      "Documentos sin permiso aparecen en resultados o trazas.",
      "La respuesta mantiene seguridad verbal cuando las fuentes se contradicen.",
      "El sistema no puede diferenciar una ausencia en el corpus de una respuesta negativa.",
    ],
    relatedCapability: "document-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Protocolo de evaluación para sistemas RAG. La calidad debe medirse con el corpus y las decisiones de acceso de cada organización.",
    sources: [
      { label: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401" },
    ],
  },
  {
    slug: "data-leakage-validacion-temporal",
    title: "¿Cómo detectar data leakage y validar un modelo en el tiempo?",
    description:
      "Una reconstrucción del instante de decisión para impedir que el entrenamiento vea datos futuros o consecuencias del resultado.",
    answer:
      "Cada ejemplo debe reconstruirse con la información disponible en el momento exacto de predecir. La división de datos respeta tiempo, entidad y proceso de generación; las transformaciones se ajustan solo con entrenamiento y la prueba final permanece cerrada hasta decidir el modelo.",
    context: [
      "El leakage no siempre es una columna con la etiqueta. También aparece en agregados recalculados, duplicados entre particiones, variables registradas después del evento y decisiones humanas causadas por el propio resultado.",
      "Una partición aleatoria puede ser estadísticamente limpia y operacionalmente imposible si mezcla pasado y futuro de la misma entidad.",
    ],
    checks: [
      "Instante de predicción, horizonte y latencia real de cada fuente.",
      "Entidades repetidas entre entrenamiento, validación y prueba.",
      "Transformaciones o imputaciones ajustadas con datos posteriores.",
      "Variables creadas como consecuencia de la etiqueta o de una decisión posterior.",
      "Número de veces que el equipo ha consultado el conjunto de prueba.",
    ],
    method: [
      { title: "Crear un corte de conocimiento", text: "Cada fila conserva cuándo se conoció cada atributo, no solo la fecha a la que se refiere." },
      { title: "Dividir por operación", text: "Usamos ventanas temporales y, cuando corresponde, grupos que impiden compartir la misma entidad." },
      { title: "Encapsular transformaciones", text: "Imputación, selección y escalado se ajustan dentro de cada partición de entrenamiento." },
      { title: "Avanzar ventanas", text: "El backtest repite entrenamiento y predicción como habría ocurrido en periodos sucesivos." },
    ],
    stopSignals: [
      "Una variable no estaría disponible en el instante real de decisión.",
      "La misma observación o una variante aparece en entrenamiento y prueba.",
      "El rendimiento cae de forma abrupta al pasar a la siguiente ventana temporal.",
      "El conjunto de prueba se ha usado para escoger variables, umbrales o arquitectura.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Guía de validación temporal. La partición correcta depende de cómo se generan los datos y de cuándo se toma la decisión.",
    sources: [
      { label: "Google: división de datasets", url: "https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets" },
      { label: "Google: monitorización de pipelines ML", url: "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring" },
    ],
  },
  {
    slug: "drift-calibracion-modelos",
    title: "¿Cómo vigilar drift y calibración después del despliegue?",
    description:
      "Separar cambios de datos, pérdida de calidad y probabilidades mal calibradas antes de decidir un reentrenamiento.",
    answer:
      "El drift de entradas es una alerta, no una prueba automática de deterioro. Hay que relacionarlo con calidad por segmento y con la calibración de probabilidades cuando llegan las etiquetas. El reentrenamiento se activa por una regla de decisión, no por calendario ni por una distancia estadística aislada.",
    context: [
      "Puede cambiar la distribución sin afectar a la decisión, o mantenerse estable mientras cambia la relación entre variables y resultado. Por eso la monitorización necesita señales de datos, rendimiento y negocio.",
      "Una probabilidad del 80 % solo es útil si, en casos comparables, el evento ocurre aproximadamente ocho de cada diez veces. Ordenar bien no implica estar calibrado.",
    ],
    checks: [
      "Variables cuyo cambio afecta realmente a la decisión.",
      "Retraso y calidad de las etiquetas usadas para confirmar rendimiento.",
      "Calibración global y por segmentos operativos.",
      "Baseline, versión activa y población de referencia.",
      "Acción prevista ante alerta, degradación o fallo de datos.",
    ],
    method: [
      { title: "Registrar la referencia", text: "Guardamos distribución, métricas, curvas de calibración y segmentos de la versión aceptada." },
      { title: "Vigilar el dato", text: "Controlamos esquema, nulos, rangos, mezcla de población y antigüedad de las fuentes." },
      { title: "Confirmar con resultados", text: "Cuando llegan etiquetas, calculamos error, calibración y coste por ventana y segmento." },
      { title: "Aplicar la regla", text: "Recalibrar, reentrenar, degradar o retirar son respuestas distintas con condiciones explícitas." },
    ],
    stopSignals: [
      "Se activa un reentrenamiento sin comprobar calidad de etiquetas ni causa del cambio.",
      "La media permanece estable, pero falla un segmento crítico.",
      "Las probabilidades deciden umbrales y nunca se comprueba su calibración.",
      "No se puede comparar la versión activa con la anterior sobre la misma ventana.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Marco de operación para modelos predictivos. Los umbrales deben traducirse al coste de la decisión y revisarse con datos posteriores.",
    sources: [
      { label: "Google: monitorización de pipelines ML", url: "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring" },
      { label: "Scikit-learn: calibración de probabilidades", url: "https://scikit-learn.org/stable/modules/calibration.html" },
    ],
  },
  {
    slug: "responsible-ai-privacidad-edge-ai",
    title: "¿Cuándo ayuda Edge AI a la privacidad por diseño?",
    description:
      "Decisiones sobre minimización, inferencia local y Responsible AI sin asumir que ejecutar en el dispositivo elimina el riesgo.",
    answer:
      "Edge AI reduce exposición cuando la inferencia local evita enviar datos brutos y solo transmite el resultado mínimo necesario. No elimina riesgos: el dispositivo puede perderse, el modelo puede filtrar atributos y las actualizaciones, trazas o telemetría todavía pueden revelar información personal.",
    context: [
      "Privacidad por diseño empieza por la finalidad y el flujo de datos. Mover un modelo al borde es una decisión de arquitectura dentro de ese análisis, no una garantía jurídica.",
      "El procesamiento local también cambia latencia, consumo, capacidad de actualización y observabilidad. Un sistema difícil de parchear puede aumentar otro tipo de riesgo.",
    ],
    checks: [
      "Finalidad, base aplicable y dato mínimo que necesita cada fase.",
      "Qué abandona el dispositivo: entrada, embedding, evento, métrica o diagnóstico.",
      "Riesgo de acceso físico, extracción del modelo y versiones sin actualizar.",
      "Rendimiento por grupo, contexto y capacidad de hardware.",
      "Política de conservación, borrado, telemetría y respuesta a incidentes.",
    ],
    method: [
      { title: "Dibujar el flujo", text: "Representamos recogida, inferencia, sincronización, soporte y borrado con responsables y finalidad." },
      { title: "Minimizar antes de modelar", text: "Eliminamos campos, resolución y conservación que la decisión no necesita." },
      { title: "Comparar arquitecturas", text: "Evaluamos local, nube y combinada en privacidad, calidad, latencia, energía y mantenimiento." },
      { title: "Probar el ciclo de vida", text: "Incluimos actualización segura, revocación, dispositivo perdido, modo offline y retirada del modelo." },
    ],
    stopSignals: [
      "La inferencia local envía después los datos brutos mediante telemetría.",
      "No existe un mecanismo fiable para parchear o retirar versiones vulnerables.",
      "La minimización impide la finalidad y se compensa recogiendo más datos ocultamente.",
      "El sistema se presenta como responsable sin medir impacto, sesgos y uso fuera de contexto.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Guía técnica de privacidad por diseño; no sustituye una evaluación jurídica ni una evaluación de impacto cuando sea exigible.",
    sources: [
      { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { label: "EDPB: riesgos y mitigaciones de privacidad en LLM", url: "https://www.edpb.europa.eu/system/files/2025-04/ai-privacy-risks-and-mitigations-in-llms.pdf" },
    ],
  },
  {
    slug: "sensores-defectuosos-confianza-dato",
    title: "¿Cómo detectar sensores defectuosos y expresar confianza en el dato?",
    description:
      "Controles de calibración, redundancia y coherencia física para no convertir una lectura dudosa en un dato limpio.",
    answer:
      "Una lectura debe conservar sensor, calibración, tiempo, unidad y banderas de calidad. La confianza combina reglas físicas, continuidad temporal, mantenimiento y comparación con fuentes redundantes; un valor imputado nunca debe quedar indistinguible de una observación real.",
    context: [
      "Un sensor puede quedarse fijo, derivar lentamente, cambiar de escala o registrar con retraso sin producir un error técnico. La serie sigue pareciendo válida hasta compararla con el proceso físico.",
      "Eliminar outliers de forma automática puede borrar precisamente el evento importante. Primero se clasifica la causa y se conserva la lectura original.",
    ],
    checks: [
      "Identificador, modelo, ubicación y unidad de cada sensor.",
      "Fecha de calibración, mantenimiento y cambios de firmware.",
      "Rangos físicos, velocidad máxima de cambio y balances entre variables.",
      "Redundancia disponible y calidad histórica de cada fuente.",
      "Consecuencia operativa de usar un dato dudoso o ausente.",
    ],
    method: [
      { title: "Conservar el crudo", text: "La lectura original permanece inmutable junto a sus metadatos y a la hora de recepción." },
      { title: "Aplicar controles", text: "Rango, persistencia, derivada, coherencia entre variables y retraso producen banderas separadas." },
      { title: "Contrastar", text: "Comparamos con sensores vecinos, redundantes, inspecciones y restricciones físicas." },
      { title: "Propagar incertidumbre", text: "Paneles y modelos reciben valor, procedencia y confianza; la imputación queda explícita." },
    ],
    stopSignals: [
      "No se conoce la unidad o la fecha de calibración de una fuente principal.",
      "El pipeline sobrescribe lecturas originales al corregirlas.",
      "Un dato imputado se presenta como observado.",
      "La decisión automática continúa cuando desaparece la redundancia necesaria.",
    ],
    relatedCapability: "data-intelligence",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Protocolo de calidad del dato para instrumentación. Las reglas físicas y la redundancia deben definirse para el activo concreto.",
    sources: [
      { label: "Google: calidad e interpretación de datos", url: "https://developers.google.com/machine-learning/guides/data-traps/quality" },
    ],
  },
  {
    slug: "exist-modalidades-aportan-valor",
    title: "¿Cómo saber si una modalidad adicional mejora un modelo multimodal?",
    description:
      "Una lectura experimental de EXIST 2026 sobre ablaciones, coste de modalidades y mejoras que no se repiten en todas las subtareas.",
    answer:
      "Una modalidad aporta valor cuando mejora de forma consistente frente al mismo baseline, en las particiones y métricas que representan la tarea, y cuando esa ganancia compensa coste, latencia y fragilidad. La combinación completa no debe asumirse superior por defecto.",
    context: [
      "GEMF combinó texto OCR, representación visual, enriquecimiento semántico y señales fisiológicas. Las ablaciones permitieron observar contribuciones distintas según subtarea y régimen de evaluación.",
      "La decisión útil no es qué modalidad parece más sofisticada, sino cuál cambia el error relevante y si ese cambio se mantiene fuera de la muestra usada para diseñarla.",
    ],
    checks: [
      "Baseline idéntico para cada comparación.",
      "Variación entre semillas, folds o periodos.",
      "Ganancia por subtarea, clase y régimen de evaluación.",
      "Coste de obtención, inferencia y mantenimiento de la modalidad.",
      "Casos donde la nueva señal contradice al resto.",
    ],
    method: [
      { title: "Congelar el protocolo", text: "Datos, particiones, métrica y seeds quedan fijados antes de comparar modalidades." },
      { title: "Retirar una señal", text: "Retiramos una señal cada vez y conservamos el resto de la configuración. Esta comparación, llamada ablación, permite medir qué aporta esa señal." },
      { title: "Analizar errores", text: "Revisamos qué ejemplos cambian, no solo la media agregada." },
      { title: "Valorar operación", text: "La mejora se compara con latencia, dependencia externa y capacidad de reproducción." },
    ],
    stopSignals: [
      "La ganancia desaparece al repetir semillas o cambiar de partición.",
      "Una modalidad mejora la media, pero daña la subtarea prioritaria.",
      "El coste o la dependencia impiden reproducir el resultado.",
      "La comparación cambia a la vez arquitectura, datos y modalidad.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Artículo derivado de decisiones experimentales documentadas en GEMF. Distingue el resultado publicado de recomendaciones generales.",
    sources: existSources,
  },
  {
    slug: "exist-desacuerdo-anotadores",
    title: "¿Por qué conservar el desacuerdo entre anotadores?",
    description:
      "Qué cambia al entrenar y evaluar con distribuciones de anotación en tareas ambiguas como la caracterización de sexismo.",
    answer:
      "Cuando una tarea admite interpretaciones razonables, reducir todas las anotaciones a una etiqueta mayoritaria borra información. Conservar la distribución permite modelar incertidumbre humana, evaluar probabilidades y detectar ejemplos donde una decisión binaria necesita más contexto.",
    context: [
      "EXIST 2026 proporciona evaluaciones soft y hard. GEMF entrenó con soft labels para conservar la distribución de respuestas de los anotadores en lugar de tratar la mayoría como una verdad sin matices.",
      "El desacuerdo también puede revelar instrucciones ambiguas, grupos con criterios distintos o ejemplos defectuosos. No siempre debe atribuirse a incertidumbre del fenómeno.",
    ],
    checks: [
      "Número y procedencia de anotadores por ejemplo.",
      "Instrucciones, opciones y condiciones de anotación.",
      "Separación entre ambigüedad, error y falta de contexto.",
      "Métrica compatible con distribuciones y objetivo de uso.",
      "Consecuencia de convertir una probabilidad en decisión hard.",
    ],
    method: [
      { title: "Conservar recuentos", text: "Guardamos votos y metadatos permitidos antes de calcular una etiqueta agregada." },
      { title: "Modelar distribución", text: "La función objetivo compara probabilidades previstas y distribución observada." },
      { title: "Evaluar dos regímenes", text: "Soft y hard se analizan por separado para no ocultar el efecto del umbral." },
      { title: "Revisar desacuerdos", text: "Una muestra se clasifica por ambigüedad, instrucción, contexto y posible error." },
    ],
    stopSignals: [
      "Las anotaciones se agregan sin conservar los votos originales.",
      "La distribución refleja un fallo de instrucciones no corregido.",
      "Se interpreta desacuerdo como sesgo sin analizar su causa.",
      "La salida probabilística se presenta como consenso humano.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Artículo derivado del uso de soft labels en GEMF y de los regímenes de evaluación oficiales de EXIST 2026.",
    sources: existSources,
  },
  {
    slug: "exist-umbrales-soft-hard",
    title: "¿Cómo puede un buen resultado soft fallar al convertirlo en etiquetas hard?",
    description:
      "El caso de Task 2.3 en EXIST 2026 muestra por qué calibración, umbrales y ranking deben analizarse por separado.",
    answer:
      "Un modelo puede ordenar bien y aproximar distribuciones, pero fallar al aplicar un umbral fijo a cada clase. La conversión hard necesita validación independiente por etiqueta, restricciones de cardinalidad y una prueba que no haya participado en el ajuste.",
    context: [
      "En Task 2.3, GEMF obtuvo la posición 10 de 118 en soft y 132 de 187 en hard. Esa diferencia está publicada y apunta a sobreajuste de umbrales, no a un rendimiento uniforme.",
      "Ocultar el resultado débil impediría aprender la decisión experimental más útil: la capa que discretiza probabilidades puede arruinar una representación razonable.",
    ],
    checks: [
      "Calibración y prevalencia por etiqueta.",
      "Métrica usada para escoger cada umbral.",
      "Conjunto reservado que no intervino en el ajuste.",
      "Número de etiquetas esperado y combinaciones imposibles.",
      "Sensibilidad del ranking ante pequeñas variaciones del umbral.",
    ],
    method: [
      { title: "Separar capas", text: "Evaluamos representación, probabilidad y binarización como decisiones distintas." },
      { title: "Trazar curvas", text: "Medimos precisión, exhaustividad y calibración por etiqueta en un rango de umbrales." },
      { title: "Validar externamente", text: "Los umbrales se aceptan en una partición o evaluación que no los optimizó." },
      { title: "Publicar la divergencia", text: "Informamos resultados soft y hard junto a la regla de conversión." },
    ],
    stopSignals: [
      "El mismo conjunto elige y evalúa los umbrales.",
      "Se usa 0,5 para todas las etiquetas sin comprobar prevalencia ni coste.",
      "La métrica agregada oculta etiquetas sin detecciones.",
      "Solo se comunica el régimen favorable y se omite el resultado hard.",
    ],
    relatedCapability: "modelos-predictivos",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Análisis del contraste publicado entre Task 2.3 soft y hard. Las posiciones se atribuyen al overview oficial de EXIST 2026.",
    sources: existSources,
  },
  {
    slug: "exist-llm-mediador-semantico",
    title: "¿Cuándo usar un LLM como mediador semántico offline?",
    description:
      "Qué aporta una representación estructurada generada antes del entrenamiento y qué dependencia introduce en un sistema multimodal.",
    answer:
      "Un LLM puede convertir una entrada compleja en atributos semánticos útiles cuando ese enriquecimiento se genera de forma versionada y se evalúa como una modalidad más. No debe tratarse como verdad de referencia ni invocarse sin control dentro del bucle de decisión.",
    context: [
      "GEMF usó Gemini offline para producir una representación estructurada del contenido visual y pragmático de los memes. El clasificador supervisado consumió después ese artefacto junto a otras modalidades.",
      "El diseño facilita congelar entradas y repetir el entrenamiento, pero mantiene una dependencia: cambiar el modelo, el prompt o la política del proveedor cambia el dataset derivado.",
    ],
    checks: [
      "Versión del modelo, prompt, parámetros y fecha de generación.",
      "Tasa de fallos, contenido bloqueado y salidas inválidas.",
      "Información añadida, omitida o inventada por el mediador.",
      "Ganancia frente a OCR, visión o texto sin enriquecer.",
      "Licencia, privacidad, coste y posibilidad de regenerar el artefacto.",
    ],
    method: [
      { title: "Definir el esquema", text: "La salida tiene campos, valores permitidos y validaciones independientes del texto libre." },
      { title: "Congelar la generación", text: "Prompt, modelo, respuestas y errores se versionan antes de entrenar el clasificador." },
      { title: "Comparar sin enriquecimiento", text: "Comparamos con sistemas de referencia que no reciben el enriquecimiento semántico. El resto de la configuración debe mantenerse para no atribuir a ese cambio el efecto de otro." },
      { title: "Auditar ejemplos", text: "Revisamos una muestra de aciertos, fallos, alucinaciones y contenido no procesado." },
    ],
    stopSignals: [
      "Las salidas auxiliares se usan como etiquetas verdaderas.",
      "El artefacto no puede regenerarse con una configuración identificable.",
      "La mejora desaparece al retirar información que filtra la etiqueta.",
      "El coste, la política o la latencia impiden mantener la modalidad.",
    ],
    relatedCapability: "investigacion-desarrollo",
    publishedAt,
    updatedAt: publishedAt,
    evidenceNote:
      "Artículo derivado de la arquitectura publicada de GEMF. El mediador semántico se describe como una señal auxiliar, no como anotador autorizado.",
    sources: existSources,
  },
];
