import type { Insight } from "./site.ts";

const date = "2026-09-17";
const evidenceNote = "Guía metodológica de Ordantis contrastada con fuentes primarias. Propone decisiones de análisis y evaluación; no publica un modelo entrenado, datos de una empresa ni resultados de clientes. El ejemplo es inventado.";

export const enterpriseInsights: Insight[] = [
  {
    slug: "mantenimiento-predictivo-pocas-averias",
    title: "¿Cómo validar mantenimiento predictivo cuando hay pocas averías?",
    description: "Evaluación de modelos de mantenimiento predictivo: eventos escasos, seguimiento incompleto, separación por activo y anticipación útil de las alertas.",
    answer: "Muchas lecturas de sensores no equivalen a muchas averías independientes. Antes de entrenar hay que definir el fallo, el horizonte y qué activos tuvieron seguimiento suficiente. Una máquina retirada o intervenida no demuestra que habría seguido funcionando. La prueba debe reservar periodos y, si se espera usar el modelo en equipos nuevos, activos no vistos. Medimos eventos detectados, falsas alertas y tiempo de anticipación frente a la regla actual. Si faltan fallos observados, el resultado puede servir para estudiar anomalías, pero no para afirmar que predice averías o evita paradas.",
    context: [
      "El histórico suele mezclar medidas frecuentes con pocas intervenciones. Ventanas próximas a una misma avería comparten información: repartirlas al azar entre entrenamiento y prueba puede evaluar el reconocimiento de ese episodio, no la anticipación de uno nuevo.",
      "El análisis de supervivencia permite estudiar tiempo hasta un evento con seguimiento incompleto. Sus métricas necesitan tratar la censura; no basta con aplicar un error de regresión a las fechas observadas. La documentación de scikit-survival distingue concordancia, discriminación por horizonte y puntuaciones que consideran las probabilidades estimadas.",
      "Ese marco no corrige por sí solo una intervención selectiva. Si se sustituyen precisamente los equipos con peor señal, el seguimiento que termina puede depender del riesgo. La condición debe quedar documentada; asumir que el retiro es independiente del fallo puede alterar la interpretación.",
    ],
    checks: [
      "Cuántos eventos independientes hay por activo, tipo de fallo y periodo, además del número de lecturas.",
      "Qué significa una avería y cómo se distingue de mantenimiento programado, parada externa o error de sensor.",
      "Hasta cuándo se observó cada activo y por qué terminó su seguimiento.",
      "Qué datos estaban disponibles antes de la alerta, sin notas de reparación incorporadas después.",
      "Con cuánta anticipación puede actuar mantenimiento y cuántas alertas puede revisar.",
    ],
    method: [
      { title: "¿Qué resultado tiene que anticipar la alerta?", text: "Elige un evento y un horizonte compatibles con la intervención. Conserva fecha de lectura, fecha de disponibilidad y fecha del fallo. Una orden abierta después de la parada no puede entrar como señal previa. El inventario identifica activos sin seguimiento completo; no los etiqueta automáticamente como equipos que no fallan." },
      { title: "¿La prueba contiene averías nuevas?", text: "Reserva periodos futuros y evita que ventanas del mismo episodio atraviesen el corte. Si el destino incluye equipos nuevos, prepara también una evaluación por activo. Son dos preguntas distintas: anticipar el futuro de equipos conocidos y generalizar a otros. scikit-learn documenta particiones temporales y por grupos; combinarlas exige adaptar el protocolo al histórico, no aplicar una receta indiscriminada." },
      { title: "¿Qué mejora frente a la regla de mantenimiento actual?", text: "Compara con el umbral, inspección o criterio usado hoy, bajo el mismo presupuesto de alertas. Cuenta fallos detectados y omitidos, alertas sin evento y anticipación. Varias alertas sobre una avería no deben contabilizarse como varios aciertos independientes. Expón los recuentos y la incertidumbre; una proporción favorable sobre pocos eventos puede ser inestable." },
      { title: "¿Ordena riesgo o estima una probabilidad fiable?", text: "Si se usa supervivencia, evalúa el horizonte con soporte en el seguimiento. El índice de concordancia estudia ordenación, no demuestra por sí solo calibración. Las puntuaciones de Brier con tratamiento de censura complementan la revisión de probabilidades. Registra los supuestos y no extrapoles a plazos sin observación suficiente." },
      { title: "¿Qué puede concluirse antes de desplegar?", text: "Entrega definición del evento, particiones, predicciones reservadas y registro de errores. Cuando solo se ha probado detección de anomalías, nómbrala así. Antes de operar, acuerda la revisión de alertas, las actuaciones permitidas y cómo medir resultados posteriores. Que una intervención coincida con ausencia de fallo no demuestra cuántas paradas evitó el modelo." },
    ],
    stopSignals: [
      "No se puede distinguir una avería de una actuación preventiva o de una pérdida de medición.",
      "La evaluación reparte ventanas de la misma incidencia entre entrenamiento y prueba.",
      "El horizonte elegido supera el seguimiento disponible o deja muy pocos eventos para contrastar el resultado.",
      "Las variables incluyen información registrada después del fallo.",
      "El volumen de falsas alertas supera la capacidad de revisión o la anticipación no permite intervenir.",
    ],
    relatedCapability: "modelos-predictivos", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "scikit-survival — Evaluating Survival Models", url: "https://scikit-survival.readthedocs.io/en/stable/user_guide/evaluating-survival-models.html", note: "Censura, concordancia, evaluación por horizonte y puntuaciones de Brier; no acredita resultados industriales de Ordantis." },
      { label: "scikit-learn — Cross-validation", url: "https://scikit-learn.org/stable/modules/cross_validation.html", note: "Separación de observaciones temporales y grupos dependientes; el diseño debe ajustarse al destino del modelo." },
    ],
  },
  {
    slug: "ciencia-datos-cambios-operacion",
    title: "¿Cómo distinguir un cambio operativo de un cambio en los datos?",
    description: "Ciencia de datos para empresas: comparar periodos y segmentos sin confundir fallos, cobertura de sensores y cambios en la forma de registrar la operación.",
    answer: "Antes de explicar por qué sube un indicador, comprueba si sigue midiendo lo mismo. Revisa unidades, equipos observados, reglas de registro y tiempo de exposición. Compara periodos dentro de segmentos equivalentes y conserva los casos ausentes: instalar más sensores puede aumentar las incidencias detectadas sin aumentar los fallos. El análisis puede identificar un patrón o una hipótesis; no demuestra una causa por encontrar una correlación. La entrega debe separar observaciones, decisiones de limpieza y conclusiones que todavía necesitan una prueba, en lugar de trasladar una cifra agregada directamente a un modelo.",
    context: [
      "Una empresa puede querer explicar retrasos, consumo o incidencias antes de invertir en un modelo nuevo. Si ha cambiado el catálogo, la instrumentación o el criterio de cierre, el histórico contiene procesos de medición distintos. Empezar por el algoritmo deja ese cambio sin resolver.",
      "El NIST plantea el análisis exploratorio como una forma de examinar estructura, anomalías y supuestos antes de fijar el modelo. Su guía de diagramas de dispersión también diferencia asociación de causalidad. Aquí proponemos aplicar esas distinciones a la comparación de periodos de operación.",
      "La unidad importa. Lecturas, pedidos, máquinas y jornadas responden preguntas diferentes. Un equipo con más mediciones puede dominar una media por fila sin representar más horas de trabajo; un periodo con más producción puede registrar más averías y una tasa menor por hora de uso.",
    ],
    checks: [
      "Qué entidad y exposición representa cada fila: pedido, activo, hora de uso o lectura.",
      "Si cambian unidades, instrumentación, población observada o reglas de apertura y cierre.",
      "Qué segmentos aparecen en ambos periodos y cuáles entran o salen del registro.",
      "Si las ausencias coinciden con turnos, carga elevada, fallos o equipos concretos.",
      "Qué decisión cambiaría con la conclusión y qué evidencia adicional necesita.",
    ],
    method: [
      { title: "¿El indicador conserva su significado?", text: "Reconstruye numerador y denominador desde los registros. Guarda la definición y su vigencia. Si una incidencia cambió de clasificación, calcula una comparación compatible o señala que las series no lo son. La transformación deja visibles los datos excluidos y su motivo; no reescribe el histórico hasta que parezca uniforme." },
      { title: "¿Cambió el proceso o la población observada?", text: "Compara equipos, centros o tipos de pedido presentes en ambos periodos. Examina también los nuevos y los retirados, sin mezclarlos con el grupo común. Una media global puede cambiar por composición. Publica recuentos y exposición junto al indicador para distinguir más actividad de peor rendimiento." },
      { title: "¿Qué oculta el agregado?", text: "Revisa distribuciones, extremos y ausencias por segmento y periodo. Un promedio estable puede ocultar más retrasos en una línea y menos en otra. Presenta el patrón con su soporte, no únicamente un contraste estadístico. La relevancia para la operación depende de la magnitud y de la decisión, no de una etiqueta de significación aislada." },
      { title: "¿La relación permite hablar de una causa?", text: "Separa una asociación observada de la hipótesis que la explicaría. Más temperatura y más paradas pueden coincidir con una carga de trabajo mayor. Incluir variables en una regresión no elimina automáticamente sesgos ni demuestra qué pasaría al intervenir. Si la decisión requiere atribución causal, hace falta un diseño y supuestos específicos, acordados como un alcance adicional." },
      { title: "¿Qué recibe el equipo al terminar?", text: "Un conjunto de datos versionado, reglas de cálculo, análisis reproducible y límites de las conclusiones. El informe indica qué se conoce, qué debe medirse mejor y si hay base para desarrollar un modelo. Si la prioridad es corregir el registro o completar la muestra, esa recomendación es una entrega válida; no obliga a contratar una arquitectura nueva." },
    ],
    stopSignals: [
      "Los periodos usan definiciones incompatibles que no pueden reconstruirse.",
      "El denominador o el tiempo de exposición no están disponibles.",
      "Se descartan valores ausentes sin revisar por qué faltan.",
      "La conclusión atribuye una causa a una correlación sin un diseño que la sostenga.",
      "No se puede volver desde el indicador a los registros y transformaciones utilizados.",
    ],
    relatedCapability: "data-intelligence", publishedAt: date, updatedAt: date, evidenceNote,
    sources: [
      { label: "NIST — What is Exploratory Data Analysis?", url: "https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm", note: "Exploración de estructura, anomalías y supuestos antes de elegir un modelo." },
      { label: "NIST — Scatter Plot", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda33q.htm", note: "Una asociación observada no demuestra una relación causal." },
    ],
  },
];
