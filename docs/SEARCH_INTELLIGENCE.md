# Search Intelligence de Ordantis

Fecha de captura inicial: 26 de agosto de 2026; actualización de Keyword Planner: 29 de agosto de 2026. Las SERP se observaron en España y en español. El alcance real de cada fuente se declara por separado. Este documento separa datos propios, observación de SERP y decisiones editoriales. No convierte posiciones puntuales en demanda ni inventa volúmenes.

Revisión editorial del 18 de septiembre de 2026: el grafo vigente es el descrito a continuación. Sustituye las prioridades de agentes/documentos del mapa de agosto. Los datos de Planner, SERP y Search Console conservan sus fechas originales; esta revisión no añade una nueva medición ni autoriza publicar.

## Continuación del 29 de agosto: Keyword Planner medido

Se confirmó la sesión de **Redes Ordantis** y se abrió Keyword Planner. Se consultaron las 50 semillas preparadas y se descargó el historial oficial. No se creó ni activó una campaña, no se definió presupuesto y no se inició gasto publicitario.

La exportación cubre España, red Google y agosto de 2025–julio de 2026. El filtro real quedó en **Todos los idiomas**, aunque las 50 consultas introducidas están escritas en español. Se conserva esa diferencia entre alcance solicitado y alcance ejecutado; no se presenta la muestra como filtrada por español.

Google devolvió promedio para **19 de 50 consultas (38 %)** y dejó 31 sin estimación. Cinco expresiones generales aparecen con promedio exportado de 500: `inteligencia artificial para empresas`, `consultoría inteligencia artificial`, `empresa de inteligencia artificial`, `gobierno del dato` e `ingeniería de datos`. Otras catorce aparecen con 50. Son estimaciones redondeadas del Planner, no conteos exactos ni un tamaño de mercado sumable. Ninguna de las 50 filas incluye desglose mensual, por lo que esta exportación no permite analizar estacionalidad.

El archivo original, su hash y el resultado normalizado están en `quality/keyword-planner-exports/2026-08-29/` y `quality/keyword-planner-results-2026-08-29.json`. Las ausencias permanecen como `null`; competencia y pujas se conservan como señales publicitarias, no como dificultad SEO. La revisión de fiabilidad está en `quality/keyword-planner-data-quality-2026-08-29.md`.

El 29 de agosto se añadió una comprobación exploratoria en Google Trends, guardada en `quality/google-trends-sample-2026-08-29.json`. En la comparación amplia, `agentes de IA` obtiene la señal relativa media más alta (38), seguido de `calidad de datos` (34), pero ambos términos mezclan intenciones ajenas a la contratación: Claude/n8n en el primero y tratamiento de imágenes en el segundo. Con calificadores comerciales, la señal se reduce a 5 para `inteligencia artificial para empresas`, 2 para `agentes IA para empresas` y 0 relativo en las otras tres expresiones. Son índices normalizados dentro de cada grupo, no volúmenes mensuales; los ceros no demuestran ausencia de búsquedas. La decisión sigue siendo ampliar páginas existentes solo cuando Planner, SERP y consultas propias indiquen una intención distinta.

En Search Console de Redes, la propiedad `https://www.ordantis.com/` tiene el control generativo efectivo **Incluir**, heredado del dominio. Se han vuelto a observar **4 impresiones generativas en la portada**, ahora para el intervalo 27 de mayo–26 de agosto de 2026. Son impresiones de la versión publicada, no resultados del trabajo local. No se han cambiado controles ni enviado sitemaps.

Contraste completo del vídeo y de Claude, fuentes y siguientes pasos: [SEO_GEO_REVIEW_2026-08-28.md](SEO_GEO_REVIEW_2026-08-28.md). Los reintentos anteriores se conservan debajo como histórico.

## Línea base de propiedad

Search Console, últimos tres meses (24 de mayo a 23 de agosto de 2026):

- 36 clics, 161 impresiones, CTR del 22,4 % y posición media 17,4.
- `ordantis` concentra 12 clics y 31 impresiones.
- El resto de consultas visibles son principalmente variantes ortográficas o confusiones de marca; todavía no existe descubrimiento no branded suficiente.
- El informe generativo de Search Console registra 4 impresiones y solo muestra la página de inicio.
- El sitemap enviado en 2025 descubrió una sola URL. Debe reenviarse después de publicar la nueva arquitectura.

Bing Webmaster Tools está conectado y procesando datos. No tenía sitemap registrado en la captura. Keyword Research no ofreció tendencia ni impresiones suficientes para las consultas especializadas analizadas, pero sí mostró sus diez URL mejor clasificadas.

## SEO local: Albacete y Valencia

La revisión del 29 de agosto encuentra resultados locales específicos para ambas ciudades. En Albacete aparecen páginas de Grupo ZAS y SynergIA; en Valencia aparecen Singularity Labs, 3L Systems y Lienzzo, entre otras. Es una muestra de resultados accesibles ese día, no un ranking estable ni una valoración de la calidad de esas empresas.

Se han creado dos páginas distintas y navegables, no una plantilla replicada por topónimo:

- `/inteligencia-artificial-albacete` relaciona servicios con el domicilio registral, la fuente BORME y la participación publicada en Sherpa/FEDA. Aclara que el domicilio no es una oficina abierta al público.
- `/inteligencia-artificial-valencia` describe Valencia como área de servicio y acredita la relación con StartUPV, ETSINF y Talento Joven. Aclara que Ordantis no publica una sede en Valencia.

Organization mantiene una sola dirección en Albacete y añade Albacete y Valencia a `areaServed`. Cada página local utiliza `Service`, `WebPage` y `BreadcrumbList`. No se han inventado `LocalBusiness`, teléfono, horarios, reseñas, oficinas ni clientes. La configuración externa del Perfil de Empresa queda pendiente de confirmar según el modelo real de atención. Plan y fuentes: [LOCAL_SEO_SPAIN.md](LOCAL_SEO_SPAIN.md).

## Muestra SERP

La consulta principal de Google se repitió con `pws=0`. Es una captura localizada en España, no un ranking universal.

| Intención | Señal observada | Dominios visibles | Decisión para Ordantis |
| --- | --- | --- | --- |
| inteligencia artificial a medida para empresas en España | Google muestra anuncios, una vista creada con IA y resultados orgánicos orientados a proveedor | Crata AI, Future AI, Hawkins, Imascono, Decide Soluciones; en la vista de IA también Hiberus | La página de capacidades debe definir encaje, método, controles y evidencia. Evitar promesas generales de productividad. |
| agentes de IA para empresas | Bing devuelve sobre todo guías, rankings y comparativas fechadas en 2026 | DataCamp, Adviters, Hispania Solutions, GPTBots, ADD, Unite.ai, Trengo | Atacar preguntas de decisión: cuándo no usar un agente, permisos, MCP y prompt injection. |
| RAG para empresas | El SERP está cubierto por explicadores de “qué es” y “guía completa” | Dataprius, Coexsis, Erwinsalas, ADD, Magokoro, OpenWebinars | Diferenciar con abstención, evidencia por afirmación, contradicción y permisos documentales. |
| modelos predictivos para empresas | Predominan definiciones, tipos y beneficios | Predik Data-Driven, Inesdi, Gesvalt, InsightSoftware, EAE, Redflexia | Priorizar leakage, backtesting temporal, calibración, drift y criterios de retirada. |
| IA en administraciones públicas en España | Las fuentes institucionales ganan peso frente a proveedores | INAP, España Digital, datos.gob.es; también EsadeEcPol y contenido jurídico | GovTech debe enlazar fuentes públicas, procedimiento, privacidad y revisión; no competir con un artículo comercial genérico. |
| inteligencia artificial a medida | Bing devuelve proveedores especializados y software a medida | NorthScale, Creai, Dynecron, 90 AI Engineering, ExperiencIA, Kiersys, Mentat, Enia | Mantener “I+D aplicada” como entidad diferenciadora y apoyar cada capacidad con preguntas técnicas específicas. |

En Google, la vista creada con IA para la consulta principal citó a competidores y no a Ordantis. El primer objetivo GEO no es producir más texto: es desplegar páginas citables, conseguir indexación de todas las URL y consolidar la relación entre marca, capacidades, research y evidencia.

## Grafo vigente — 18 de septiembre de 2026

El público incluye empresas que invierten en machine learning, ciencia e ingeniería de datos y sistemas de IA exigentes, y administraciones con retos GovTech. El encargo puede ser desarrollo de un modelo, I+D cuando hay incertidumbre técnica, o integración y operación de un sistema existente. No se exige investigación nueva a todo proyecto ni se encabeza la oferta con digitalización, agentes o automatización documental.

Fuente ejecutable: `content/search-graph.ts`. `lib/llms.ts` utiliza ese mismo mapa y resuelve títulos contra las guías publicadas: no duplica respuestas ni crea páginas para cada variante de keyword. El grafo es una organización editorial de temas y relaciones, no un registro de demanda, un caso de éxito ni una incorporación al Knowledge Graph de Google.

### Topic graph actual

| Área | Página de alcance | Problemas y preguntas de apoyo |
| --- | --- | --- |
| ML y predicción | `/capacidades/modelos-predictivos` | Picos de demanda, pocas averías, intervalos fiables, leakage, drift y calibración |
| Ciencia e ingeniería de datos | `/capacidades/data-intelligence` | Cambios de operación frente a medición, sensores defectuosos y vigencia de fuentes públicas |
| Optimización y planificación | `/capacidades#optimizacion` | Asignación de recursos con capacidad, cobertura y desplazamientos; predicción no equivale a decisión |
| I+D y arquitecturas | `/capacidades/investigacion-desarrollo` | Modelos tabulares, temporales o grafos; referencias y ablaciones; contribución de modalidades |
| Integración y operación | `/capacidades#implementacion` | Tiempo real, interfaces, latencia, degradación de fuentes, monitorización y transferencia |
| GovTech | `/govtech` | Piloto público, datos territoriales e infraestructura; evaluación técnica, utilidad y límites |

### Prompt graph actual

Son preguntas editoriales, no consultas con volumen recién medido. Los títulos y las respuestas detalladas permanecen en las guías enlazadas.

| Pregunta de decisión | URL existente | Qué debe poder revisar el lector |
| --- | --- | --- |
| ¿Cómo evaluar previsiones en los picos de demanda? | `/insights/modelos-predictivos-picos-demanda` | Episodios reservados, horizonte y coste de infraestimar |
| ¿Cómo validar mantenimiento predictivo con pocas averías? | `/insights/mantenimiento-predictivo-pocas-averias` | Eventos independientes, seguimiento, alertas y anticipación |
| ¿Es fiable el intervalo de una predicción? | `/insights/incertidumbre-prediccion-series-temporales` | Cobertura, anchura, calibración y límites por grupo |
| ¿Cambió la operación o la forma de medir? | `/insights/ciencia-datos-cambios-operacion` | Definiciones, exposición, composición y límites causales |
| ¿Necesitamos un modelo temporal o un grafo? | `/insights/elegir-modelo-tabular-temporal-grafo` | Información equivalente, referencias, ablaciones y coste |
| ¿Por qué predecir no basta para repartir recursos? | `/insights/prediccion-optimizacion-asignacion-recursos` | Restricciones, escenarios y coste de las actuaciones |
| ¿Cómo operar un modelo que debe responder en tiempo real? | `/insights/industrializar-modelo-predictivo-tiempo-real` | Contrato de inferencia, latencia, fallos y monitorización |
| ¿Qué debe demostrar un piloto público de IA? | `/insights/evaluar-piloto-ia-administracion-publica` | Calidad técnica, utilidad operativa, cobertura e impacto |

### Entity graph actual

- Ordantis → desarrolla → modelos ML, análisis y sistemas de datos y de IA.
- Empresas y administraciones → plantean → decisiones con datos, restricciones y criterios de aceptación.
- Modelo predictivo → se evalúa con → referencia, corte temporal, errores relevantes e incertidumbre.
- Ciencia e ingeniería de datos → conserva → procedencia, unidades, disponibilidad y transformaciones reproducibles.
- Predicción → alimenta, pero no sustituye → planificación bajo restricciones y revisión de actuaciones.
- I+D → resuelve → incertidumbre técnica mediante experimentos; resultados negativos también permiten decidir.
- Sistema de IA → necesita → interfaces, pruebas de degradación, responsables de operación y transferencia.
- GovTech → aplica esas capacidades a → retos públicos y evaluación con el organismo; no es el único mercado.
- EXIST 2026 / GEMF → aporta evidencia propia limitada a → su evaluación de NLP y multimodalidad; no prueba implantaciones predictivas ni resultados de clientes.
- Ordantis → presta servicios en → España, Albacete y Valencia; una dirección registral en Albacete, sin sede publicada en Valencia.
- Agentes, RAG, BI y procesamiento documental → son → especialidades complementarias, no capacidades principales equivalentes.

### Aplicación y límites

El índice `llms.txt` sigue los seis grupos, con enlaces a alcance y preguntas publicadas. Las páginas ya conectan guías y capacidades mediante `relatedCapability`; el JSON-LD conecta Organization, WebSite, WebPage, Service, Article y fuentes con identificadores estables. Este pase no añade un endpoint de grafo ni nuevas relaciones de schema por el mero hecho de documentarlas.

El benchmark predictivo propio, la ampliación de Planner para el enfoque actual y la medición posterior a una publicación pública siguen pendientes. No se atribuyen posiciones, citas generativas o leads a esta reorganización. Los mapas y decisiones de agosto se conservan debajo como histórico, no como prioridad vigente.

### Verificación del pase — 18 de septiembre de 2026

- `npm run quality`: lint, tipos, 84 pruebas unitarias, revisión de 86 archivos de contenido, 12 artefactos SEO con 9 invariantes y compilación de 71 rutas superados.
- Tres pruebas del grafo verifican destinos existentes, cobertura de las guías de ML/I+D y empresa, orden editorial y enlaces Markdown resolubles.
- Comprobación HTTP local: `llms.txt` devuelve 200 y sus 36 destinos Markdown internos únicos devuelven 200. El índice tiene 934 palabras.
- Dos pruebas de interfaz pública superadas: los archivos de rastreo y el repositorio de research siguen fuera de la navegación visible, manteniendo su descubrimiento técnico.
- Cambios locales: no se ha actualizado la versión privada de Cloudflare en este pase. No se han cambiado diseño, schema, endpoints ni políticas de rastreo.

Publicación posterior autorizada con «súbelo a la privada»: el índice actualizado está incluido en staging, versión `891469da-e037-43aa-aaa3-f229be86041e`. Se mantienen Access y el despliegue activo anterior. Registro y controles en `docs/PRIVATE_PREVIEW_2026-09-18.md`, apartado «Segunda actualización»; la web pública no se actualiza.

## Topic graph — histórico de agosto

| Nodo principal | Página de capacidad | Nodos de apoyo | Evidencia o estándar |
| --- | --- | --- | --- |
| Agent Engineering | `/capacidades/agentes-ia` | agente frente a workflow, MCP frente a API, permisos y aprobación, prompt injection | Especificación MCP, OWASP GenAI, suite de evaluación |
| Document Intelligence | `/capacidades/document-intelligence` | RAG con abstención, evidencia por afirmación, anonimización, documentos administrativos | paper original de RAG, referencias documentales y control de acceso |
| Modelos predictivos | `/capacidades/modelos-predictivos` | data leakage, validación temporal, drift, calibración, tiempo real | guías de ML de Google, documentación de calibración, experimentos reproducibles |
| Data Intelligence | `/capacidades/data-intelligence` | sensores defectuosos, confianza del dato, calidad, territorio y trazabilidad | contratos de datos, reglas físicas, procedencia y fecha de vigencia |
| I+D aplicada | `/capacidades/investigacion-desarrollo` | privacidad por diseño, Edge AI, ablación multimodal, desacuerdo, soft/hard, mediador semántico | NIST AI RMF, EDPB y research GEMF/EXIST 2026 |
| GovTech | `/govtech` | expedientes, valoración trazable, datos territoriales, ocupación de vía pública | fuentes oficiales, procedimiento administrativo y revisión humana |

## Prompt graph — histórico de agosto

Cada prompt representa una pregunta que una persona o un sistema generativo puede formular. La URL debe responderla en el primer bloque, sostenerla con método y declarar cuándo detenerse.

| Prompt | URL objetivo | Contrato de respuesta |
| --- | --- | --- |
| ¿Cuándo no conviene utilizar un agente de IA? | `/insights/cuando-no-usar-agente-ia` | prueba de descarte entre agente, workflow y regla |
| ¿Cuándo utilizar MCP y cuándo una API directa? | `/insights/mcp-frente-api` | interoperabilidad, autorización, latencia y superficie expuesta |
| ¿Qué acciones de un agente requieren aprobación? | `/insights/permisos-aprobacion-herramientas-agentes` | clasificación por impacto, alcance, reversibilidad y vista previa |
| ¿Cómo se prueba una prompt injection indirecta? | `/insights/prompt-injection-agentes-herramientas` | fuentes no fiables, políticas fuera del modelo y pruebas adversariales |
| ¿Cómo hacer que un RAG se abstenga? | `/insights/rag-abstencion-evidencia` | evidencia suficiente, contradicción, ausencia y escalado |
| ¿Cómo evitar que un modelo vea el futuro? | `/insights/data-leakage-validacion-temporal` | instante de conocimiento, ventanas y prueba cerrada |
| ¿Cuándo reentrenar por drift? | `/insights/drift-calibracion-modelos` | señal de datos más calidad, calibración y coste de decisión |
| ¿Edge AI garantiza privacidad? | `/insights/responsible-ai-privacidad-edge-ai` | flujo de datos, minimización, parches y límites |
| ¿Cómo saber si un sensor está fallando? | `/insights/sensores-defectuosos-confianza-dato` | calibración, redundancia, reglas físicas e incertidumbre |
| ¿Una modalidad adicional mejora de verdad? | `/insights/exist-modalidades-aportan-valor` | ablación reproducible y coste operacional |
| ¿Por qué conservar el desacuerdo entre anotadores? | `/insights/exist-desacuerdo-anotadores` | soft labels, ambigüedad y límites de la mayoría |
| ¿Por qué un resultado soft puede fallar en hard? | `/insights/exist-umbrales-soft-hard` | calibración, umbrales y validación externa |
| ¿Cuándo usar un LLM como mediador semántico? | `/insights/exist-llm-mediador-semantico` | artefacto versionado, ablación y dependencia externa |

## Entity graph — histórico de agosto

- Ordantis Solutions S.L. → publica → capacidades, preguntas y research.
- Ordantis → investiga → Agent Engineering, modelos predictivos, Data Intelligence, Document Intelligence, GovTech e I+D aplicada.
- GEMF → participa en → EXIST 2026 / CLEF 2026.
- GEMF → tiene afiliaciones publicadas → Ordantis y Universitat Politècnica de València.
- La autoría personal de GEMF permanece en las fuentes académicas enlazadas; la web no publica fichas de equipo o perfiles personales en esta fase.
- GEMF → aporta evidencia sobre → multimodalidad, soft labels, calibración, umbrales y mediación semántica.
- Agent Engineering → utiliza o compara → MCP, API, herramientas, permisos, aprobación y evaluación adversarial.
- Document Intelligence → necesita → corpus, procedencia, permisos, citas, abstención y revisión.
- Modelos predictivos → necesitan → baseline, corte temporal, calibración, monitorización y criterio de retirada.
- Data Intelligence → necesita → entidad canónica, procedencia, calidad, sensor, unidad, tiempo y confianza.
- Ordantis → tiene domicilio registral → Albacete; el dato no se presenta como oficina abierta al público.
- Ordantis → presta servicios en → Albacete y Valencia.
- Ordantis → mantiene relación verificable con → FEDA/Sherpa en Albacete y StartUPV/ETSINF/Talento Joven en Valencia.
- INCIBE Emprende y DesafIA 2026 → son referencias de participación o selección; no certifican los servicios.

## Prioridad de ejecución — histórico de agosto

**Actualización del 27 de agosto: publicación pausada por decisión del propietario.** Los siguientes pasos de lanzamiento no autorizan a desplegar ni enviar sitemaps. Se conserva el diseño original; la arquitectura de información y el catálogo de servicios se amplían dentro de esa identidad.

1. Publicar la nueva arquitectura y comprobar que cada URL devuelve HTML sustancial, canonical, schema, Markdown y 200.
2. Reenviar el sitemap en Google y enviarlo por primera vez en Bing después del despliegue.
3. Inspeccionar inicio, las cinco capacidades, research y las trece nuevas preguntas.
4. Medir consultas no branded por clúster y citas generativas por prompt; no agregar todas las apariciones en una sola cifra.
5. Actualizar contenidos solo cuando cambie una fuente, aparezca una consulta real o una prueba contradiga el protocolo.

## Limitaciones de la captura

- Keyword Planner solo devolvió promedio para 19 de 50 consultas y no exportó series mensuales. El filtro ejecutado fue Todos los idiomas; conviene repetir con español si Google habilita esa selección, pero no se corrigen ni estiman cifras por nuestra cuenta.
- Bing indicó datos insuficientes en las consultas especializadas. Sus rankings se usan como observación competitiva, no como volumen.
- Los SERP cambian por fecha, idioma y ubicación. Esta muestra debe repetirse mensualmente con las mismas consultas y parámetros.

## Criterio SEO/GEO después de recuperar el diseño

Se han recuperado los doce servicios en una sola página, con sus anclas, y agrupado las treinta guías por capacidad. No se crean doce páginas comerciales nuevas solo para multiplicar keywords. La portada vuelve a usar la identidad de Ordantis; conserva una descripción explícita de la actividad, acceso a research y respuestas concretas.

La [guía oficial de Google para sus funciones generativas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), revisada el 27 de agosto de 2026, refuerza el trabajo en contenido útil y estructura rastreable. No presenta Markdown, llms.txt ni un schema especial como ventajas de ranking. Se mantienen para los consumidores que los utilicen, sin confundirlos con posicionamiento demostrado. La primera pasada cuantitativa de Keyword Planner ya está cerrada; falta contrastarla con consultas e indexación reales después del lanzamiento.

## Ampliación competitiva — 28 de agosto de 2026

Muestra obtenida mediante búsqueda web y lectura de páginas de los propios proveedores. No es una nueva captura de posiciones de Google España ni un estudio de volúmenes. Se buscaron combinaciones de RAG empresarial, permisos, evidencia documental, agentes/MCP, consultoría predictiva y procedimientos públicos. Las conclusiones siguientes son decisiones editoriales de Ordantis, no resultados de un experimento de posicionamiento.

| Página y tipo de oferta | Contenido observado | Consecuencia para Ordantis |
| --- | --- | --- |
| [AIDOCS](https://www.aidocs.es/), plataforma documental | Fuentes, permisos, versiones e instalación privada forman parte de su presentación comercial. | Mencionar citas y privacidad no es una diferenciación suficiente. La guía RAG debe mostrar cómo se evalúan ausencia, contradicción y abstención. |
| [Treceochenta: RAG para empresas](https://treceochenta.es/rag-empresas/), servicio | Describe preparación documental, acceso, pruebas con preguntas reales y supervisión cuando falta información. | Matiza la muestra inicial: también hay proveedores que explican controles concretos. Priorizar un protocolo propio y ejemplos comprobables, no otra definición de RAG. |
| [DigitalPublic](https://www.digitalpublic.com/), producto para contratación pública | Documenta acceso por API/MCP y acciones de escritura supervisadas. Es una referencia de producto, no un competidor idéntico de consultoría. | Separar la guía MCP/API de la de autorización; demostrar el límite entre lectura y acción en una futura prueba de agentes. No presentar la guía como un MCP ya desplegado. |
| [Deloitte: Demand Forecasting](https://www.deloitte.com/es/es/services/consulting/services/demand-forecasting.html), consultoría | Organiza su propuesta alrededor de decisiones de demanda, costes y energía. | La página predictiva debe conectar el protocolo temporal con la decisión y su coste, no limitarse a nombrar algoritmos. |
| [Inforges: analítica avanzada](https://inforges.es/gestion-empresarial/data-analytics-ai/analitica-avanzada/), consultoría e integración | Presenta aplicaciones, preparación de datos, integración, formación y seguimiento. | Mantener claros entregables, integración y mantenimiento en capacidades. Las guías de leakage y drift resuelven preguntas distintas de la página comercial. |

No se han comprobado las cifras, certificaciones ni promesas de estos proveedores; no se trasladan a la web de Ordantis. Que una característica no aparezca en una página leída tampoco demuestra que el proveedor no la ofrezca.

### Prioridad local sin multiplicar páginas

1. **Document Intelligence:** ampliar la guía existente de abstención con una evaluación reproducible propia cuando haya corpus autorizado. Las citas por sí solas no demuestran corrección. El ejemplo actual es didáctico, no un resultado de cliente.
2. **Agent Engineering:** conservar tres decisiones separadas: si hace falta un agente, cómo se conecta y quién autoriza una acción. Una prueba de permisos requiere herramientas simuladas, trazas y resultados, no solo una pantalla.
3. **Modelos predictivos:** vincular corte temporal, dato disponible en cada instante y coste del error a una decisión concreta. No publicar una promesa de precisión sin evaluación.
4. **GovTech:** se ha ampliado la página existente con lo que necesitamos del procedimiento: responsable de revisión, reglas, vigencia documental, permisos y versiones. Se enlazan las guías relacionadas sin inventar casos ejecutados.

### Demanda cuantificada: primera pasada completada

La exportación oficial del 29 de agosto devuelve 50 filas y encaja una a una con las semillas. Las cinco consultas de 500 refuerzan dos páginas existentes: `/capacidades` para la intención general de proveedor de IA y `/capacidades/data-intelligence` para ingeniería y gobierno del dato. Agentes, predicción y documentos conservan señales de 50 en términos específicos. GovTech y RAG con calificadores no obtienen promedio en esta exportación; eso no demuestra demanda cero y se mantienen como autoridad y respuesta a problemas reales, no como nuevas landings de volumen.

La decisión es **ampliar las páginas existentes sin crear URLs nuevas**: reforzar la propuesta general, describir explícitamente ingeniería y gobierno del dato, y conservar agentes como oferta comercial de menor volumen pero mayor especialización. El cruce definitivo con Search Console seguirá pendiente hasta que la arquitectura local esté publicada e indexada. La investigación semántica editorial de 435 pares ayuda a detectar repetición, pero no sustituye las consultas reales.

### Reintento de acceso — 28 de agosto

Este intento falló y se conserva como histórico de la revisión. El acceso se recuperó el 29 de agosto y la exportación cuantitativa quedó completada en la sección anterior. No se modificaron campañas ni presupuestos.
