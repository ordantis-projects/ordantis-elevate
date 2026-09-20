export type CapabilityEngagement = {
  inputs: string[];
  deliverables: string[];
  acceptance: string;
  notIncluded: string;
};

// Alcance orientativo para acordar una prueba, no compromisos contractuales universales.
export const capabilityEngagements: Record<string, CapabilityEngagement> = {
  "agentes-ia": {
    inputs: [
      "Un proceso con ejemplos de solicitudes resueltas, excepciones y acciones prohibidas.",
      "Documentación de las herramientas y un entorno de prueba sin permisos de producción.",
      "Una persona que pueda decidir qué operaciones exigen revisión y qué errores impiden continuar.",
    ],
    deliverables: [
      "Mapa de decisiones y matriz de permisos por herramienta, usuario y recurso.",
      "Prototipo del flujo acotado, con aprobaciones vinculadas a los parámetros de la acción.",
      "Suite de evaluación con fallos de herramientas, inyección indirecta, reintentos y trazas de los casos fallidos.",
      "Comparación con el proceso determinista y recomendación de continuar, limitar o retirar autonomía.",
    ],
    acceptance: "Acordamos qué tareas debe completar, qué acciones nunca puede ejecutar y cuánto trabajo de revisión resulta aceptable. Un fallo de autorización impide aceptar la prueba, aunque la tasa de tareas resueltas sea alta.",
    notIncluded: "La prueba no concede acceso general al correo, al CRM o a ficheros. Conectar producción y autorizar acciones externas requiere un alcance separado.",
  },
  "modelos-predictivos": {
    inputs: [
      "Histórico con variable objetivo, entidades y fechas de observación y disponibilidad.",
      "Regla actual de decisión, horizonte de predicción y coste de actuar tarde o equivocarse.",
      "Restricciones de frecuencia, carga, latencia y tratamiento de entradas que llegan tarde.",
    ],
    deliverables: [
      "Dataset versionado y particiones temporales que reproducen la información disponible al decidir.",
      "Baseline y backtest por horizonte, periodo y régimen de carga, con número de episodios y límites de la muestra.",
      "Artefacto reproducible del modelo, contrato de entrada/salida y pruebas de latencia del servicio.",
      "Criterios para detectar deterioro, usar una alternativa sencilla y retirar una versión.",
    ],
    acceptance: "La comparación utiliza un periodo reservado. Acordamos por separado error, calibración cuando proceda y plazo de respuesta: una buena métrica offline no compensa llegar después de la decisión.",
    notIncluded: "No fijamos una mejora porcentual antes de revisar el histórico. La puesta en producción depende de superar la referencia y las pruebas de operación acordadas.",
  },
  "data-intelligence": {
    inputs: [
      "Una muestra autorizada de cada fuente, con diccionario de campos y frecuencia de actualización.",
      "Un informe o decisión donde hoy discrepen cifras, identidades o periodos.",
      "Responsables capaces de acordar definiciones y resolver claves sin correspondencia.",
    ],
    deliverables: [
      "Análisis estadístico con unidad de estudio, cobertura, sesgos y límites de las conclusiones.",
      "Inventario de fuentes y contrato de datos: tipos, unidades, claves, vigencia y acceso.",
      "Modelo de entidades y métricas con reglas de transformación versionadas.",
      "Pruebas de nulos, duplicados, cambios de esquema y retrasos, con registros afectados.",
      "Una salida acordada —consulta, API o informe— que permita volver desde la cifra hasta su procedencia.",
    ],
    acceptance: "Elegimos cifras del informe y reconstruimos sus registros y transformaciones. Inyectamos fallos conocidos para comprobar que la actualización se detiene o avisa según la regla acordada.",
    notIncluded: "El prototipo no decide por sí mismo qué definición de negocio es correcta ni rellena campos ausentes para que un panel parezca completo.",
  },
  "document-intelligence": {
    inputs: [
      "Una muestra autorizada que incluya escaneos, anexos, rectificaciones y documentos incompletos.",
      "El esquema de campos o la plantilla de informe, junto con ejemplos revisados.",
      "Reglas sobre documentos vigentes, acceso y campos que una persona debe validar.",
    ],
    deliverables: [
      "Esquema de salida con estados de ausencia, contradicción y revisión pendiente.",
      "Extracción enlazada al documento, página y fragmento que sostiene cada campo.",
      "Pruebas por tipo documental y campo crítico, con errores y tiempo de revisión.",
      "Prototipo de revisión y, si entra en el alcance, borrador con cálculos reproducibles y citas comprobables.",
    ],
    acceptance: "La prueba reservada incluye documentos difíciles. Medimos los campos que cambian una decisión y el esfuerzo de verificarlos, sin esconderlos en una tasa global de caracteres reconocidos.",
    notIncluded: "El sistema no resuelve expedientes ni firma conclusiones. La revisión técnica o jurídica y la autorización de publicar documentos mantienen sus responsables.",
  },
  "investigacion-desarrollo": {
    inputs: [
      "Una hipótesis cuya viabilidad esté abierta y la decisión que depende de resolverla.",
      "Datos autorizados, referencias existentes y restricciones de cómputo o instrumentación.",
      "Condiciones que justificarían continuar y resultados que obligarían a detener el experimento.",
    ],
    deliverables: [
      "Protocolo con hipótesis, baseline, particiones, métricas y presupuesto experimental.",
      "Código, configuraciones y registro de experimentos para reproducir la comparación.",
      "Análisis de errores y ablaciones que separen la aportación de cada componente; alternativas descartadas y motivos.",
      "Informe de viabilidad con límites de los resultados y requisitos de una posible integración.",
    ],
    acceptance: "El cierre responde a la hipótesis con evidencia reproducible. Puede concluir que la técnica no aporta valor con los datos disponibles; no se modifica el criterio después para presentar la prueba como un éxito.",
    notIncluded: "Investigar no asegura que aparezca un producto desplegable. La integración y el mantenimiento se acuerdan después de evaluar la viabilidad.",
  },
};
