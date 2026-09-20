import type { Insight } from "./site.ts";

// Las propuestas inspiran las preguntas, no acreditan implantaciones ni resultados.
// Los ejemplos se inventan por separado; no incluyen identidades o parámetros contractuales.
const evidenceNote = "Pregunta de investigación elaborada a partir de propuestas técnicas internas y bibliografía pública. Expone un protocolo de evaluación, no resultados obtenidos ni una implantación para un cliente.";
const date = "2026-09-17";

export const rdInsights: Insight[] = [
  {
    slug: "elegir-modelo-tabular-temporal-grafo",
    title: "¿Cuándo necesita un problema un modelo temporal o un grafo?",
    description: "Cómo comparar modelos tabulares, secuenciales y de grafos en I+D: información disponible, controles, ablaciones y coste de operación.",
    answer: "Un modelo temporal merece una prueba cuando el orden de los acontecimientos puede explicar errores que los resúmenes históricos no capturan. Un modelo de grafos, cuando las relaciones entre entidades contienen información relevante que se pierde al tratarlas por separado. Ninguna de esas condiciones demuestra que una red neuronal vaya a mejorar el resultado. Hay que compararla con una referencia que reciba información equivalente, reservar periodos de evaluación y medir también el coste de servir la predicción.",
    context: [
      "Elegir entre árboles, una red recurrente o un modelo de grafos es una decisión posterior a definir qué se quiere predecir. Si una tabla solo contiene la última lectura de un sensor, añadir una secuencia incorpora información nueva y cambia la arquitectura a la vez. Una mejora así no permite atribuir el mérito a la red.",
      "La comparación útil separa esas dos preguntas. Primero se añaden al modelo tabular retardos y resúmenes de la historia disponible. Después se compara esa referencia con un modelo que reciba la secuencia. Para estudiar relaciones, se prueba antes con indicadores explícitos de vecinos, conectividad o capacidad compartida.",
      "El estudio de Grinsztajn, Oyallon y Varoquaux encontró referencias fuertes basadas en árboles en sus conjuntos tabulares. Ese resultado justifica incluirlas en la comparación; no establece un ganador universal ni descarta el aprendizaje profundo para datos de otra naturaleza.",
    ],
    checks: [
      "Qué parte del error persiste después de corregir problemas de datos y de construir una referencia competitiva.",
      "Si las secuencias y relaciones estarán disponibles a tiempo en el sistema real.",
      "Qué entidades comparten información y cuáles deben quedar juntas al separar entrenamiento y prueba.",
      "Cuánto tiempo de ajuste y cómputo recibe cada alternativa, incluidos los intentos descartados.",
      "Qué mejora mínima justificaría mantener nuevas dependencias, reconstruir relaciones o usar una GPU.",
    ],
    method: [
      { title: "¿Falta historia o falta capacidad del modelo?", text: "Prepara tres controles: estado actual, estado con retardos y resúmenes, y secuencia completa. Conserva fuentes, fecha de corte y periodos de prueba. Si la ganancia aparece al añadir resúmenes y la secuencia no aporta más, la evidencia favorece la ingeniería de variables, no una arquitectura temporal más costosa. Revisa episodios concretos: una subida sostenida y una recuperación pueden terminar en el mismo valor y necesitar previsiones distintas." },
      { title: "¿Las relaciones ayudan a predecir?", text: "Define qué significa una arista: conexión física, dependencia de suministro o proximidad útil para el proceso. La cercanía geográfica por sí sola puede ser una mala aproximación. Compara variables de vecindad con aprendizaje sobre el grafo y retira relaciones para medir su contribución. Un grafo usado para organizar y consultar datos no exige una red neuronal de grafos; son decisiones distintas." },
      { title: "¿Compartir aprendizaje perjudica alguna salida?", text: "Si el sistema predice varios horizontes o activos, compara modelos separados con una representación compartida. Examina cada salida, no únicamente su promedio. Una mejora a largo plazo puede ocultar un deterioro en la previsión inmediata. Cuando aparezca ese conflicto, prueba compartir menos componentes antes de multiplicar especialistas. La decisión necesita episodios suficientes para cada salida." },
      { title: "¿Puede repetirse la ventaja?", text: "Guarda versiones de datos, código, configuraciones y predicciones. Compara candidatos sobre los mismos episodios reservados y repite el ajuste cuando su aleatoriedad sea relevante. Las ablaciones retiran un componente manteniendo los demás controles. El informe debe permitir distinguir una mejora estable de una ejecución favorable o de un presupuesto de búsqueda mayor." },
      { title: "¿Qué cuesta usar el modelo?", text: "Mide desde que llega el dato hasta que se entrega la respuesta, incluyendo reconstrucción de historia y relaciones. Prueba pérdida de una fuente, nuevas entidades y aumento de concurrencia. El entregable de esta fase es una decisión de arquitectura con alternativas descartadas, evidencia y límites; no una lista de técnicas que necesariamente acabarán en producción." },
    ],
    stopSignals: [
      "La ventaja desaparece cuando ambos modelos reciben las mismas fuentes y ventanas de historia.",
      "Las relaciones se construyen con datos que todavía no existen al predecir.",
      "Solo mejora el promedio y una salida crítica empeora de forma persistente.",
      "El componente nuevo no supera su control en periodos reservados o incumple el tiempo de respuesta.",
    ],
    relatedCapability: "investigacion-desarrollo", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "Grinsztajn et al. — comparación de árboles y redes en datos tabulares", url: "https://arxiv.org/abs/2207.08815", note: "Referencia empírica sobre sus conjuntos de evaluación; no prueba qué arquitectura conviene en un proyecto concreto." },
      { label: "scikit-learn — validación por grupos y series temporales", url: "https://scikit-learn.org/stable/modules/cross_validation.html", note: "Documentación de las separaciones de evaluación y sus supuestos." },
    ],
  },
  {
    slug: "modelos-predictivos-picos-demanda",
    title: "¿Cómo evaluar un modelo predictivo cuando el servicio se satura?",
    description: "Validación de modelos en picos de demanda: episodios independientes, errores extremos, horizontes de decisión y degradación de fuentes.",
    answer: "La evaluación debe reservar episodios de saturación y medirlos por separado, con una definición de carga acordada antes de comparar modelos. Importan el error absoluto, la anticipación y las consecuencias de infraestimar, además de la diferencia frente al funcionamiento habitual. Miles de registros de un mismo incidente no equivalen a miles de pruebas independientes. También hay que distinguir saturación del servicio que se predice y saturación informática: resolver una no demuestra que se haya resuelto la otra.",
    context: [
      "Un modelo de demanda puede acertar durante periodos tranquilos y fallar precisamente cuando el responsable necesita reforzar recursos. Si esos periodos dominan el histórico, el error medio puede mejorar aunque la predicción en los picos siga siendo inútil.",
      "La carga depende de demanda y capacidad disponible. La misma afluencia puede resultar manejable con todos los puestos abiertos y crítica con parte de ellos fuera de servicio. Los cambios de horario, personal o infraestructura deben describirse con la información que se conocía al emitir la previsión.",
      "Tampoco conviene borrar todos los extremos como si fueran errores. Un registro duplicado exige una corrección; un episodio real poco frecuente exige evaluación. Excluir ambos de la misma manera produciría un histórico cómodo que no representa la operación.",
    ],
    checks: [
      "Definición de saturación, capacidad disponible y fuentes con las que se reconoce cada episodio.",
      "Número de episodios y jornadas distintos, además del número de registros.",
      "Horizonte mínimo que necesita la persona responsable para actuar.",
      "Coste de una falsa alarma y coste de no anticipar un pico.",
      "Demoras, ausencias o cambios de cobertura de las fuentes durante los momentos difíciles.",
    ],
    method: [
      { title: "Fijar la prueba antes de ver al ganador", text: "Identifica las jornadas y condiciones de carga con el equipo operativo. Reserva periodos completos; evita repartir momentos del mismo episodio entre entrenamiento y prueba. Si la etiqueta del episodio se obtiene al final de la jornada, puede servir para analizar resultados, pero no para alimentar una predicción anterior. Documenta la separación y cualquier periodo excluido." },
      { title: "Medir el pico con la unidad correcta", text: "Informa del error por horizonte, del retraso en detectar el aumento y de cuánto se infraestima la demanda máxima. Cuenta falsas alarmas por unidad de tiempo operativa y picos omitidos sobre episodios observados. Compara las predicciones emparejadas sobre las mismas jornadas. Para estimar incertidumbre, respeta la dependencia entre registros, por ejemplo mediante remuestreo de bloques cuya longitud tenga justificación." },
      { title: "Diagnosticar por qué empeora", text: "Comprueba primero si faltan ejemplos, si una fuente llega tarde o si la relación entre demanda y capacidad ha cambiado. Añadir variables de contexto, ajustar el muestreo o corregir la fuente son respuestas diferentes. La especialización por regímenes requiere patrones repetidos fuera de muestra; crear un modelo por cada pico no resuelve la escasez de episodios." },
      { title: "Ensayar la degradación del sistema", text: "Reproduce una entrada retrasada, la caída de un contador y un aumento de peticiones. Registra qué predicciones dejan de emitirse o pierden calidad. Mide por separado la latencia de respuesta y el error del pronóstico. Una cola informática saturada puede convertir una previsión correcta en una respuesta demasiado tardía para actuar." },
      { title: "Aceptar una mejora sin esconder regresiones", text: "Exige rendimiento suficiente en episodios críticos y en el resto del servicio. Acercar ambas métricas empeorando los periodos tranquilos no es una mejora. Entrega el desglose por jornada, tamaño de muestra y casos fuera de cobertura. Si solo existe un episodio extremo, puede estudiarse como prueba de estrés; no acredita estabilidad ante episodios futuros." },
    ],
    stopSignals: [
      "Se redefine qué cuenta como saturación después de observar los resultados.",
      "La aparente mejora depende de muchas filas del mismo incidente y no se repite en otro periodo.",
      "El aviso llega después del momento en que todavía era posible intervenir.",
      "Se eliminan eventos válidos difíciles o se presentan fuentes imputadas como observaciones reales.",
    ],
    relatedCapability: "modelos-predictivos", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "scikit-learn — límites de la validación aleatoria y separación temporal", url: "https://scikit-learn.org/stable/modules/cross_validation.html", note: "Las observaciones relacionadas requieren un diseño de evaluación que conserve su dependencia." },
      { label: "Sagawa et al. — robustez ante cambios entre grupos", url: "https://arxiv.org/abs/1911.08731", note: "Investiga la generalización del peor grupo y la importancia de regularizar; no demuestra que especializar sea siempre mejor." },
    ],
  },
  {
    slug: "incertidumbre-prediccion-series-temporales",
    title: "¿Cómo saber si el intervalo de una predicción es fiable?",
    description: "Incertidumbre en modelos predictivos: cobertura, anchura, calibración temporal y límites de la predicción conformal cuando cambia el entorno.",
    answer: "Un intervalo se evalúa comprobando cuántos resultados futuros contiene y cuánto se abre para conseguirlo. Hay que separar entrenamiento, calibración y prueba, y revisar cobertura por horizonte y condiciones de operación. Una banda enorme puede cubrir casi todo y servir de poco. Una cobertura media adecuada puede ocultar fallos en el grupo más importante. El porcentaje anunciado no es una certeza individual ni una garantía que se mantenga bajo cualquier cambio de distribución.",
    context: [
      "Predecir una cifra y describir cuánto puede fallar son tareas distintas. Dos situaciones con la misma estimación central pueden necesitar decisiones diferentes si una se apoya en observaciones recientes y la otra en fuentes incompletas o en un régimen apenas representado en el histórico.",
      "Conviene distinguir el intervalo para un resultado futuro del intervalo de confianza de una métrica de evaluación. El primero expresa dispersión de la variable que se quiere anticipar. El segundo expresa incertidumbre al estimar, por ejemplo, el error medio con una muestra finita. No son intercambiables.",
      "La regresión por cuantiles permite construir bandas cuyo ancho varía con las entradas. La calibración conformal puede ajustar esos intervalos bajo determinados supuestos. El trabajo de Romano, Patterson y Candès presenta ese enfoque; aplicarlo a una serie temporal obliga a revisar los supuestos, no basta con trasladar la receta de un conjunto de filas intercambiables.",
    ],
    checks: [
      "Qué resultado futuro debe contener el intervalo y con qué horizonte.",
      "Cómo se distinguen datos de entrenamiento, calibración y prueba final.",
      "Qué cobertura y anchura resultarían útiles para la decisión concreta.",
      "Qué dependencia temporal, cambios de régimen y retrasos en las etiquetas existen.",
      "Qué actuación corresponde a una banda demasiado amplia o a una fuente crítica ausente.",
    ],
    method: [
      { title: "Construir una referencia de incertidumbre", text: "Compara una banda sencilla basada en errores históricos con una alternativa condicionada por las entradas. Evalúa ambas sobre los mismos periodos futuros. Si la banda compleja no distingue condiciones difíciles ni reduce anchura manteniendo una cobertura adecuada, no hay evidencia para conservarla. No conviertas la puntuación interna de un modelo en un porcentaje de fiabilidad sin calibración." },
      { title: "Separar ajuste y comprobación", text: "Ajusta el predictor con el conjunto de entrenamiento y utiliza datos distintos para calibrar. Reserva un periodo posterior para comprobar el resultado sin retocar los umbrales con sus errores. Mantén la fecha de disponibilidad de cada etiqueta: una corrección que llega semanas después no puede haber servido para recalibrar una predicción anterior." },
      { title: "Leer cobertura y anchura juntas", text: "Publica la proporción de resultados incluidos, el número de observaciones y la distribución de la anchura. Desglosa por horizonte, régimen y calidad de las fuentes cuando haya muestra suficiente. Una cobertura global aceptable no implica cobertura condicional en cada grupo. En grupos pequeños, declara que la evidencia es insuficiente en vez de presentar diferencias mínimas como conclusiones firmes." },
      { title: "Comprobar qué ocurre cuando cambia el entorno", text: "La conformalización clásica se apoya en condiciones como la intercambiabilidad; la autocorrelación y los cambios de distribución pueden invalidar su aplicación directa. Los métodos adaptativos estudian otras garantías, como frecuencias de cobertura a largo plazo. Eso no equivale a acertar cada caso, cada tramo corto o cada población. Evalúa explícitamente las ventanas donde el sistema debe operar." },
      { title: "Vincular la banda a una actuación", text: "Define con el responsable si una incertidumbre alta exige revisión, una reserva adicional o suspender el uso de la recomendación. Guarda la versión del calibrador junto al modelo y supervisa la cobertura cuando llegue el resultado observado. El valor de la banda se demuestra en esa decisión, no en que el gráfico parezca más informativo." },
    ],
    stopSignals: [
      "El porcentaje mostrado al usuario no corresponde a ninguna comprobación de calibración.",
      "Se consigue cobertura ampliando la banda hasta hacerla inútil para decidir.",
      "La media oculta infracobertura persistente en un régimen relevante.",
      "Se promete cobertura fuera de distribución sin comprobar las condiciones del método.",
    ],
    relatedCapability: "modelos-predictivos", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "Romano, Patterson y Candès — Conformalized Quantile Regression", url: "https://arxiv.org/abs/1905.03222", note: "Método de intervalos adaptados a la variabilidad de los datos y condiciones de cobertura." },
      { label: "Gibbs y Candès — Adaptive Conformal Inference Under Distribution Shift", url: "https://proceedings.neurips.cc/paper/2021/hash/0d441de75945e5acbc865406fc9a2559-Abstract.html", note: "Estudia cobertura a largo plazo en un entorno cambiante; no ofrece certeza por predicción individual." },
    ],
  },
  {
    slug: "evaluar-piloto-ia-administracion-publica",
    title: "¿Qué debe demostrar un piloto de IA en una administración pública?",
    description: "Cómo separar calidad técnica, utilidad operativa e impacto público: cobertura, errores omitidos, revisión humana y criterios para ampliar un piloto GovTech.",
    answer: "Un piloto debe responder una pregunta delimitada con datos y criterios de aceptación acordados. Hay que distinguir si el componente funciona, si el equipo puede utilizarlo y si la intervención mejora el servicio público. Son evidencias diferentes. Detectar más incidencias puede deberse a una cobertura mayor; detectar menos puede deberse a un sensor que falla. El informe necesita denominadores, casos no observados y límites de atribución antes de recomendar ampliar el despliegue.",
    context: [
      "Una demostración prueba que un recorrido puede ejecutarse. Un piloto permite observarlo en condiciones acotadas de uso. Para afirmar que se ha mejorado un servicio hace falta además un diseño de evaluación capaz de distinguir el efecto de la intervención de otros cambios. La duración del proyecto, por sí sola, no resuelve esa diferencia.",
      "Una oficina con registros completos y otra con horas sin cobertura no son comparables por el número bruto de incidencias. Deben mostrarse tiempo observado, tiempo utilizable, entradas descartadas y revisión pendiente. La ausencia de alertas no demuestra ausencia de problemas.",
      "En un piloto GovTech, formular el problema y aceptar la solución también requiere participación del equipo del organismo. Qué error se tolera, qué caso exige intervención y qué colectivos deben evaluarse no son decisiones que deba tomar el desarrollador a partir de una métrica agregada.",
    ],
    checks: [
      "Pregunta del piloto, población de uso y situaciones que quedan fuera.",
      "Referencia actual y muestra reservada, con cobertura de casos difíciles.",
      "Responsable de aceptar, rechazar o detener el uso de una salida.",
      "Método independiente para encontrar casos que el sistema no detecta.",
      "Datos, permisos, accesibilidad y condiciones operativas necesarios para la prueba.",
      "Qué evidencia permitiría ampliar el piloto y qué afirmaciones no podrá sostener su muestra.",
    ],
    method: [
      { title: "Separar las preguntas de evaluación", text: "La evaluación técnica mide error, cobertura o latencia. La operativa comprueba tiempo de revisión, carga de trabajo y tareas completadas. La de impacto estudia el cambio en el servicio. Redacta cada pregunta y su medida antes de empezar. Evita sustituir una por otra: una precisión alta no demuestra ahorro de tiempo y una encuesta de satisfacción no demuestra mejor calidad de las decisiones." },
      { title: "Medir lo que el sistema no ve", text: "Revisar únicamente las alertas generadas permite estimar cuántas son correctas, pero deja fuera las omisiones. Diseña observaciones paralelas, muestras auditadas u otra referencia independiente adecuada al problema. Registra cuándo no ha sido posible observar. Si la referencia también es incompleta, explica qué error puede medirse y cuál sigue sin conocerse." },
      { title: "Congelar la versión durante cada comparación", text: "Documenta modelo, umbral, fuentes y reglas utilizados en cada periodo. Si cambia un sensor o se corrige el modelo entre mediciones, separa ese cambio de una posible mejora del servicio. En una revisión humana, comprueba también desacuerdos y casos pendientes; una cola que crece puede hacer inviable un detector técnicamente bueno." },
      { title: "No atribuir impacto con un simple antes y después", text: "Un cambio posterior puede coincidir con vacaciones, otra dotación de personal o una población distinta. La guía metodológica Magenta Book distingue observar un resultado de atribuirlo a la intervención. Según el problema y la viabilidad, la evaluación puede requerir comparación controlada, despliegue escalonado u otro diseño justificado. Esa guía es una referencia metodológica, no una norma de contratación española. Si el piloto solo permite una señal preliminar, así debe describirse." },
      { title: "Entregar una decisión de continuidad", text: "El cierre reúne resultados por condición de uso, cobertura no conseguida, errores que siguen abiertos y coste de operación. Incluye una prueba en la que el equipo receptor ejecute tareas sin ayuda del desarrollador. Ampliar exige revisar qué cambia en nuevas sedes, fuentes y usuarios. Repetir una prueba, restringir el uso o cerrar la línea son opciones que deben quedar justificadas, igual que la integración." },
    ],
    stopSignals: [
      "Los indicadores mejoran porque se descartan periodos sin cobertura o casos difíciles sin declararlo.",
      "No existe una forma de observar omisiones y se afirma exhaustividad del sistema.",
      "Se atribuye un cambio del servicio a la IA sin un diseño que permita sostenerlo.",
      "El personal no puede revisar las alertas a tiempo, corregir errores o detener el uso.",
    ],
    relatedCapability: "investigacion-desarrollo", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "HM Treasury — Quality in policy impact evaluation", url: "https://www.gov.uk/government/publications/the-magenta-book/quality-in-policy-impact-evaluation-qpie-html", note: "Diferencia observación y atribución; límites de comparaciones antes-después sin un contrafactual sólido." },
      { label: "HM Treasury — Test and Learn", url: "https://www.gov.uk/government/publications/the-magenta-book/test-and-learn-html", note: "Evaluación progresiva para decidir si ampliar, adaptar o reconsiderar una intervención." },
    ],
  },
  {
    slug: "prediccion-optimizacion-asignacion-recursos",
    title: "¿Por qué predecir demanda no basta para asignar recursos?",
    description: "De modelos predictivos a decisiones de planificación: restricciones, optimización, incertidumbre y evaluación del coste de actuar.",
    answer: "La predicción estima qué podría necesitarse; la asignación decide qué hacer con recursos limitados. Entre ambas hacen falta restricciones, costes y prioridades explícitas. Una previsión de demanda no indica por sí sola qué centro reforzar, qué material trasladar o qué servicio mantener. La recomendación debe ser viable, llegar a tiempo y compararse con la política actual bajo varios escenarios de demanda. Una explicación de las variables del predictor tampoco demuestra el efecto que tendrá intervenir sobre ellas.",
    context: [
      "Un sistema puede reducir su error medio y proponer un plan peor. Esto ocurre si los errores que evita tienen poca consecuencia mientras aumenta la infraestimación en puntos sin alternativa. La evaluación del predictor y la evaluación del plan necesitan medidas distintas.",
      "La optimización combina decisiones posibles, una función objetivo y restricciones. Unas restricciones son obligatorias, como no asignar un equipo inexistente. Otras preferencias admiten compensaciones, como reducir desplazamientos o repartir carga. La organización debe aprobar esas prioridades: no deben quedar escondidas en pesos elegidos durante el desarrollo.",
      "Las explicaciones de un modelo describen cómo utiliza sus entradas. La documentación de SHAP advierte de que esto no convierte asociaciones en efectos causales. Que la presencia de refuerzos se asocie a más incidencias puede reflejar que se enviaron a lugares difíciles; no demuestra que retirarlos reduzca las incidencias.",
    ],
    checks: [
      "Decisiones disponibles y plazo en el que todavía se pueden ejecutar.",
      "Capacidad, ubicación, disponibilidad y compatibilidad de los recursos.",
      "Restricciones obligatorias, preferencias y persona responsable de aprobarlas.",
      "Coste de traslado, espera, déficit de servicio y cambios de última hora.",
      "Política actual contra la que comparar, incluidos sus ajustes manuales.",
    ],
    method: [
      { title: "Separar pronóstico, plan y ejecución", text: "Guarda tres objetos distintos: previsión con su horizonte, propuesta de asignación con restricciones y decisión finalmente ejecutada. Así puede saberse si un fallo procede del modelo, de una capacidad mal registrada o de una recomendación que no llegó a aplicarse. Conserva también los motivos de rechazo; contar únicamente planes aceptados sesgaría la evaluación." },
      { title: "Construir una política de referencia", text: "Reproduce el procedimiento actual con los datos disponibles en cada fecha, no con el histórico ya corregido. Compara esa política con reglas sencillas y con la alternativa optimizada. La programación matemática o por restricciones es una herramienta posible; el tamaño y estructura del problema determinan qué método merece probarse. No hace falta introducir aprendizaje por refuerzo para justificar que existe planificación." },
      { title: "Comprobar factibilidad antes de valorar el ahorro", text: "Prueba límites de capacidad, incompatibilidades, tiempos de traslado y prioridades. Incluye casos sin solución factible. El sistema debe comunicar el conflicto, no relajar una condición obligatoria en silencio. Una solución encontrada bajo un límite de tiempo puede ser utilizable sin tener demostrada optimalidad; el informe debe indicar el estado y las condiciones del cálculo." },
      { title: "Ensayar demanda incierta", text: "Evalúa el plan bajo escenarios plausibles, incluyendo errores concentrados en un mismo territorio o periodo. Compara déficit de servicio, recursos ociosos y coste de cambiar el plan. Si una pequeña revisión del pronóstico reorganiza toda la operación, estudia penalizaciones de cambio o una reserva operativa. No presentes el resultado de una simulación como ahorro observado." },
      { title: "Medir el uso antes de ampliar", text: "Una primera prueba puede emitir recomendaciones sin ejecutarlas y revisar su viabilidad con el equipo. Ese modo sombra aporta información sobre el plan, pero no demuestra qué habría ocurrido al aplicarlo. Para medir impacto hace falta un despliegue autorizado y un diseño de evaluación adecuado. Registra la política utilizada: cuando las decisiones cambian la demanda observada, el futuro entrenamiento ya no recibe datos del mismo proceso." },
    ],
    stopSignals: [
      "El objetivo premia ahorro ignorando un mínimo de servicio que la organización considera obligatorio.",
      "Los planes propuestos dependen de recursos no disponibles o llegan fuera de plazo.",
      "La recomendación atribuye efectos causales a una importancia de variables.",
      "Se comunican beneficios simulados como resultados realmente obtenidos.",
    ],
    relatedCapability: "modelos-predictivos", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "Google OR-Tools — modelos y métodos de optimización", url: "https://developers.google.com/optimization/introduction", note: "Herramientas para representar asignaciones, objetivos y restricciones; no acreditan el impacto de una política concreta." },
      { label: "SHAP — precauciones al interpretar modelos predictivos como explicaciones causales", url: "https://shap.readthedocs.io/en/latest/example_notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.html", note: "Explica por qué describir una predicción y estimar el efecto de una intervención son problemas diferentes." },
    ],
  },
];
