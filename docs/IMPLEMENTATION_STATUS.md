# Estado real de implantación del Plan Maestro

Revisión actualizada el 13 de septiembre de 2026 contra el Plan Maestro, los bloques relevantes de la conversación y el repositorio. Este documento distingue trabajo implementado, trabajo parcial y acciones que necesitan despliegue, datos o activos externos. No utiliza una puntuación única porque varias fases dependen de evidencia futura.

## Resumen

- **Interfaz revisada el 15 de septiembre:** retirados los accesos a llms, sitemap y GitHub Research del pie, la portada, las referencias enlazadas y el 404. Research y la evidencia permanecen; los archivos técnicos siguen funcionando fuera de la navegación visible. Véase `PUBLIC_INTERFACE_2026-09-15.md`.
- **Intro de marca solicitada el 14 de septiembre:** pantalla inicial de 2,2 segundos con la flecha cian revelando el logotipo, salida automática y botón para saltar. La portada anterior permanece intacta; sin JavaScript o con movimiento reducido se accede directamente. Sin nuevas cookies ni dependencias. Solo local; véase `BRAND_INTRO_2026-09-14.md`.
- **Refinamiento visual revisado por el propietario el 14 de septiembre:** se retira la figura grande de la portada y se recuperan su composición ancha y las flechas pequeñas animadas anteriores. Se conservan los accesos a las cuatro fases, las mejoras de servicios y guías, los 12 servicios, nueve demos, cinta animada y geometrías 3D. Solo local. Las verificaciones históricas y las de esta corrección se distinguen en `DESIGN_REFINEMENT_2026-09-13.md`.
- **Implementado en el repositorio:** nueva arquitectura Next.js, HTML server-rendered, móvil, páginas corporativas, de capacidad y de servicio local, schema, metadata, sitemap, robots, Markdown, `llms.txt`, consentimiento, medición, contenidos prioritarios y controles editoriales.
- **Configurado en cuentas:** GA4, Search Console y Clarity bajo Redes Ordantis; Bing conectado y procesando.
- **Pendiente de producción:** desplegar, configurar las variables de medición, verificar datos reales, reenviar el sitemap y ejecutar auditorías sobre el dominio publicado.
- **Nuevo trabajo local:** SignsOfAI, Vale y LanguageTool ejecutados sobre 50 páginas; comparación semántica de las 30 guías y revisión de los pares más próximos. Corregidos falsos positivos de configuración y varios textos. Diagnóstico copiable/descargable, aviso legal con fuente registral y menos JavaScript compartido. Véase `EDITORIAL_REVIEW_2026-08-28.md`.
- **Continuación local:** retirada de consentimiento implementada con parada, limpieza propia y recarga. Web3Forms se ha retirado; solo Diagnóstico usa un endpoint propio preparado para Cloudflare Email Service y el destino verificado de Redes Ordantis. Contacto abre el correo de la persona. Turnstile ya está creado, conectado y validado en local. Faltan los secretos de producción y verificar una recepción real antes de publicar. Los enlaces principales precargan al mostrar intención de navegar, no al aparecer en pantalla. Keyword Planner ya tiene una primera exportación cuantitativa. Véanse `SEARCH_INTELLIGENCE.md`, `CONSENT_VERIFICATION.md` y `FORM_DELIVERY.md`.
- **SEO local honesto:** páginas distintas para Albacete y Valencia, incluidas en sitemap y `llms.txt`, pero retiradas de la navegación principal por decisión del propietario. Albacete conserva el único domicilio registral; Valencia no se presenta como sede. El Perfil de Empresa no se ha modificado. Véase `LOCAL_SEO_SPAIN.md`.
- **Cloudflare auditado:** el dominio está detrás de Cloudflare con GitHub Pages como origen publicado. AI Crawl Control registró 345 solicitudes en 24 horas y 322 respuestas 404; los rastreadores no están bloqueados en Cloudflare. La causa es que producción conserva la web antigua sin sitemap, `llms.txt` ni las nuevas rutas. Se instaló la configuración oficial de agente de Cloudflare y se autorizó el MCP principal con lectura en `Ordantis Solutions`. Véase `CLOUDFLARE_SEO_GEO_2026-08-30.md`.
- **Preview de Cloudflare preparado, aún privado:** la aplicación se ha validado al 100 % con vinext y se ha construido para Workers. El empaquetado en seco de Wrangler, dos pruebas E2E sobre el runtime local de Workers y la revisión visual de escritorio/móvil pasan. Las fuentes se sirven localmente y el diseño, la cinta animada y los sellos se conservan. No se ha desplegado ninguna URL `workers.dev` ni cambiado el dominio.
- **Diseño original y funciones recuperadas:** blanco/azul/cian, flechas, cabecera, metodología y pie oscuro; cinta de empresas animada, figuras 3D y nueve demos de servicios. Doce fichas completas, FAQ propia, seis programas de apoyo y campos originales del diagnóstico. Se conserva el contenido nuevo. Véase `RECUPERACION_DISENO_2026-08-28.md`.
- **Pendiente:** ampliar los cuatro Labs actuales con conjuntos autorizados y pruebas fuera de muestra; crear los Labs municipal/GIS y de predicción; activos públicos en GitHub/Hugging Face, distribución, dashboard propio y contenidos secundarios validados por demanda.
- **Decisión editorial vigente:** no se publican páginas de equipo, perfiles personales ni Person schema. EXIST se presenta como research de Ordantis con sus fuentes originales.

**Publicación en pausa por decisión del propietario.** Se continúa en local. No desplegar, hacer push que pueda publicar, enviar sitemaps ni activar IndexNow hasta una nueva indicación. Las cuentas de medición siguen siendo las de Redes Ordantis; los tests locales no envían visitas a ellas.

## Revisión editorial, confianza y medición — 28 de agosto

- Se conservan diseño, movimiento de empresas, figuras 3D, 12 servicios y nueve demos. No se ha añadido equipo ni Person schema.
- **52 URL indexables** tras añadir las páginas locales de Albacete y Valencia. El domicilio registral y su referencia BORME siguen vinculados únicamente a Albacete; no se presenta como domicilio de atención al público y Valencia figura solo como área de servicio.
- **370 pruebas E2E correctas y 10 omisiones previstas** en la última ejecución completa, incluidas 35 de consentimiento y 10 de precarga/navegación. La batería `quality` también ha pasado: 32 pruebas unitarias, lint, tipos, contenido, SEO y build de 58 páginas. En una compilación aislada, otras 20 pruebas verifican el envío con proveedor simulado; no son correos reales.
- El primer pase del nuevo test de teclado encontró dos enlaces con el mismo texto. Se acotó el selector al hero y se repitió la batería completa sin fallos; no se cambió la interfaz para satisfacer el test. Las 40 pruebas dirigidas de la revisión anterior quedan como histórico, sin sumarlas al total actual.
- **Revisión editorial ejecutada:** Vale y LanguageTool sin incidencias pendientes; SignsOfAI deja dos avisos de estructura revisados y ligados al hash del contenido. Ninguno demuestra autoría humana o calidad por sí solo.
- **Similitud semántica ejecutada:** 435 pares entre 30 guías; revisión de los 12 pares más próximos. No se han encontrado motivos suficientes para fusionarlos: responden decisiones distintas. La canibalización real sigue necesitando consultas y SERP.
- **Rendimiento:** se ha separado la identidad/menú del corpus editorial. El fragmento compartido observado pasa de 110.213 a 38.046 bytes sin cambiar diseño ni interacciones. Es la reducción de ese archivo sin comprimir, no del peso total ni una mejora de ranking demostrada. El informe de rendimiento distingue pruebas locales de datos reales.
- **Conversión:** copiar/descargar el diagnóstico funciona localmente. La integración de envío directo y Turnstile está implementada; 25 pruebas E2E pasan en cinco anchos y una prueba local real de Turnstile terminó con HTTP 202 en el binding simulado de Wrangler. No hay recepción real confirmada ni secretos en el Worker de producción, por lo que permanece sin publicar. `contact_start` mide intención; `generate_lead` no se emite por abrir el correo ni por una respuesta simulada.
- **Privacidad técnica:** retirada implementada y probada en simulación de SDK activos, descargas pendientes, varias pestañas y almacenamiento bloqueado. La revisión del dominio/configuración definitivos sigue siendo necesaria antes de lanzar. Detalles en `MEASUREMENT.md`.
- **Auditorías ejecutadas:** Unlighthouse sobre 50 URL y Lighthouse móvil repetido. En la última comparación se descarga un 5,1 % menos en inicio y un 5,5 % menos en diagnóstico, pero las medianas de puntuación pasan de 90 a 89 en ambas: no se declara una mejora estable de velocidad. El LCP final es 3,31/2,77 s; no se da por superado CWV. Accesibilidad, buenas prácticas y SEO dan 100 en las doce muestras comparadas. Véase `PERFORMANCE_REVIEW_2026-08-28.md`.

## Histórico: recuperación completa de componentes — 28 de agosto

- Referencia de código: `2b9eaa6`. Recuperadas animaciones, nueve demos y bloques que faltaban en la revisión del 27; no se ha revertido Next.js ni el trabajo SEO/GEO.
- `npm run quality` correcto: **21 tests**, lint y tipos, control editorial en **61 archivos**, 435 pares de guías y build de **57 páginas**.
- **49 URL indexables**: `/faq` recuperada con contenido y schema; ya no redirige a Insights.
- Cinta de empresas: cinco anchos correctos, movimiento real, pausa, reanudación y movimiento reducido.
- Pase completo sobre producción local: **320 pruebas correctas y 10 omisiones previstas**, en 2,4 minutos. Incluye las 49 rutas en cinco anchos, demos, teclado, anclas antiguas, formularios, movimiento reducido, schema y enlaces internos. Las omisiones son dos menús móviles que no existen en escritorio y ocho repeticiones del crawler/comprobación WebGL que no dependen del ancho. No hay fallos.
- Revisión en Chrome: portada, cinta y BI; Empresa a 390 px, FAQ a 768 px y figuras 3D a 1600 px. `git diff --check` correcto. No equivale a métricas de producción ni a una prueba en dispositivos físicos.
- Comparación, contenido conservado y límites de cada demo: `RECUPERACION_DISENO_2026-08-28.md`.

## Histórico: recuperación parcial del 27 de agosto

Este bloque describe el estado de aquella revisión. Las sustituciones estáticas y las demos pendientes indicadas aquí han quedado superadas por el trabajo del 28.

- Referencia: `2b9eaa6` y comparación visual en Chrome con la web publicada. No se ha hecho reset del repositorio ni perdido las mejoras técnicas.
- Se mantienen las 47 URL anteriores y se recupera `/diagnostico`: **48 URL indexables**, build de **56 páginas**.
- `npm run quality` final correcto: **19 tests**, lint, tipos, control editorial en 49 archivos, 435 pares de guías, auditoría SEO/GEO y build de 56 páginas.
- La suite completa final, incluidos integridad del sello y privacidad del diagnóstico, pasó **289 pruebas con 6 omisiones previstas** en 1,9 minutos. Se verifican 48 rutas en cinco anchos, controles y teclado, las doce fichas desplegables, el diagnóstico, el Lab y el grafo de enlaces internos. No hay perfiles personales en el HTML generado.
- Revisión visual en Chrome: portada original/publicada frente a la local; Home a 320 y 1024 px; Empresa a 390 px; Servicios a 768 px; metodología a 1440 px. Sin errores de consola en las vistas comprobadas. No equivale a una prueba de dispositivos físicos ni a métricas de producción.
- Nueva fuente de contenido para Home, servicios y diagnóstico compartida con Markdown. El catálogo conserva sus 12 anclas antiguas.
- Empresa y páginas nuevas adoptan el sistema original. Geometrías SVG y fila estática de empresas sustituyen WebGL/marquee, sin ocultar contenido detrás de animaciones.
- Los **nueve módulos de demo de servicios del original siguen pendientes de migración**; no deben confundirse con el nuevo Data Quality Lab. Sus simulaciones requieren etiquetado explícito y revisión de los cálculos/claims.
- Normas del sello leídas completas y revisadas visualmente. PNG idéntico al entregado, enlace a INCIBE y sin transformación de archivo. **Pendiente confirmar el tamaño responsive autorizado antes de publicar.**

## Verificación anterior a la recuperación visual

- `npm run quality` correcto: lint, TypeScript, 15 tests, control editorial sobre 40 archivos, comparación de 435 pares de guías, auditoría SEO/GEO y build de 55 páginas.
- 47 URL indexables comprobadas en 320, 390, 768, 1024 y 1440 px: HTTP 200, un H1, contenido y ausencia de desbordamiento horizontal.
- Pase E2E final: **264 pruebas correctas, 6 omisiones previstas** (dos menús móviles ocultos en escritorio y cuatro repeticiones innecesarias del crawler por viewport). Incluye controles, recálculo, descarga JSON, ausencia de analítica local y enlaces internos/fragmentos de todas las rutas. El primer pase detectó que `/labs` no tenía enlaces entrantes; se corrigió en navegación y pie y el pase final confirma la solución.
- La antigua ficha personal devuelve 404 y no aparece en el sitemap ni en Markdown.
- Revisión visual en Chrome: controles del Lab a 320 px, guía RAG a 390 px, alcance de Data Intelligence a 768 px y portada/navegación a 1024 px. La captura a 1440 px tuvo un timeout del navegador; ese ancho sí pasa la batería automática. No se presenta el muestreo como auditoría visual de todas las páginas ni de dispositivos físicos.

## Inventario de contenido

- 5 páginas de capacidad con datos necesarios, entregables propuestos, condiciones de aceptación y exclusiones: Agent Engineering, modelos predictivos, Data Intelligence, Document Intelligence e I+D aplicada.
- Catálogo de 12 servicios en `/capacidades`, organizado como el original en cuatro fases, sin multiplicar URLs comerciales. Incluye descripción, componentes, entregables, ejemplos orientativos y nueve demos originales con sus limitaciones explícitas.
- Ocho preguntas comerciales en `/faq`, separadas de las treinta guías técnicas.
- Diagnóstico de tres pasos con preguntas nuevas y campos originales de perfil, madurez, infraestructura múltiple y contacto. Resumen local revisable, sin envío automático, persistencia o puntuación de madurez inventada. La apertura del borrador no se presenta como lead confirmado.
- 1 página GovTech.
- 30 preguntas técnicas con respuesta directa, comprobaciones, método, criterios de parada, nota de evidencia y un ejemplo didáctico distinto, explícitamente inventado.
- 4 artículos derivados de decisiones experimentales de EXIST 2026.
- 1 ficha completa de research de EXIST 2026 con resultados, limitaciones y fuentes.
- Páginas de Empresa, Research, Labs, Contacto, Privacidad y Cookies.
- Data Quality Lab: demo de dos escenarios sintéticos, contrato editable, incidencias por fila y descarga JSON. No importa datos reales ni se presenta como un benchmark de clientes.
- RAG Benchmark: seis guías públicas, nueve preguntas preparadas, recuperación léxica con TF-IDF, abstención por puntuación y margen, y descarga JSON. Declara que los parámetros se ajustaron sobre el mismo conjunto y no lo presenta como un resultado fuera de muestra ni como evaluación de respuestas generadas.
- Agent Evaluation Lab: diez operaciones sintéticas y cinco controles de política sobre alcance, instrucciones no confiables, datos sensibles, acciones destructivas y aprobación. No llama a modelos ni herramientas y no se presenta como certificación de seguridad.
- Document Intelligence Lab: contrato sintético de cuatro páginas, diez candidatos de extracción, evidencia literal, contradicciones, umbral de confianza y revisión según riesgo. No ejecuta OCR ni modelos, no procesa archivos reales y no se presenta como benchmark de clientes.
- Home con evidencia, metodología, capacidades, contenidos destacados y referencias de INCIBE Emprende y DesafIA 2026.

Los 30 contenidos no equivalen a todas las ideas mencionadas en la conversación. Se han priorizado las preguntas solicitadas expresamente, el primer clúster derivado de propuestas y los temas que sostienen las capacidades. El resto debe publicarse por clúster y con demanda o evidencia suficiente; convertir cada idea en una URL de una vez contradiría la regla anti-AI-slop y aumentaría la canibalización.

## Matriz del Plan Maestro

| Área | Estado | Evidencia o pendiente |
| --- | --- | --- |
| Posicionamiento y reglas de marca | Implementado | Voz de I+D aplicada, reglas sobre propuestas y claims en `AGENTS.md`, contenido y guía editorial. |
| Baseline | Parcial | Search Console, Bing, SERP e Is Agentic documentados. Faltan Core Web Vitals reales y un crawl completo tras desplegar. |
| Arquitectura de información | Implementado en la fase inicial | Capacidades, GovTech, Research, Labs, Insights y páginas de confianza. Sectores y casos se omiten hasta tener experiencia y autorización publicables. |
| Home y confianza | Implementado | Empresa, Contacto, Privacidad, Cookies, research y evidencia. Equipo/perfiles se omiten por decisión expresa. |
| SEO técnico | Implementado en código | SSR/SSG, canonical, metadata, OG, schema, 404, redirects, sitemap, robots e IndexNow. Falta validación post-deploy. |
| Móvil y accesibilidad | Implementado y probado localmente | Layout responsive, navegación, imágenes optimizadas y controles. Tests en cinco anchos y muestra visual en Chrome; queda comprobar producción y dispositivos reales. |
| Agent readiness | Implementado en código | HTML-first, negociación Markdown con q-values, `Vary`, `llms.txt` v2, `rel=describedby`, `llms-full.txt`, Content Signals y crawlers diferenciados. Falta reejecutar la auditoría en producción. |
| GEO | Implementado como base | Topic, Prompt y Entity Graph, contenido citable, fuentes, fechas y limitaciones. Las citas reales solo pueden medirse después de indexar. |
| Search Intelligence | Primera pasada cuantitativa completada | Datos propios de Search Console, Bing, muestra de competidores/SERP, Google Trends y exportación oficial de 50 consultas en Keyword Planner. Solo 19 tienen promedio y no hay serie mensual; falta repetir con filtro español y cruzar con consultas de la arquitectura publicada. |
| SEO local | Implementado en código; señales externas pendientes | Páginas diferenciadas para Albacete y Valencia, fuentes locales, sitemap, `llms.txt` y `areaServed` sin oficina ficticia. No aparecen en la navegación principal. Falta confirmar y completar el Perfil de Empresa, obtener menciones/reseñas reales y medir después de publicar. |
| Anti-AI-slop | Herramientas y revisión ejecutadas | SignsOfAI, Vale y LanguageTool locales sobre 50 páginas; comparación léxica y semántica de 435 pares, con revisión contextual. Falta ampliar evidencia propia y contrastar intención con demanda real; pasar detectores no prueba calidad. |
| Contenidos por capacidades | Parcial | 30 preguntas publicables y clústeres prioritarios. No se han convertido todas las ideas del plan en artículos independientes. |
| EXIST 2026 | Implementado como evidencia inicial | Ficha completa y cuatro decisiones experimentales. Los perfiles personales se han retirado. |
| Labs | Cuatro pruebas locales | Data Quality Lab comprueba contratos sintéticos; RAG Benchmark expone recuperación y abstención sobre un corpus controlado; Agent Evaluation Lab compara políticas de permisos y aprobación; Document Intelligence Lab verifica citas, contradicciones, confianza y riesgo. Pendientes fuentes autorizadas, evaluación separada, municipal/GIS y forecasting. Ninguno se ha publicado. |
| Autoridad distribuida | Pendiente | Faltan organización/activos nuevos en GitHub, Hugging Face, YouTube, Artifacts y distribución editorial. |
| Agent Engineering público | Parcial | Capacidad y contenidos sobre descarte, MCP/API, permisos, prompt injection y HITL. Faltan MCP público, skills públicas, A2A y Lab de evals. |
| Herramientas | Parcial | Stack web, CI, schema-dts y controles editoriales ejecutados localmente; auditoría Lighthouse/Unlighthouse documentada por separado. Faltan Screaming Frog/Semrush y herramientas de agentes que solo tienen sentido al construir Labs. |
| Arquitectura de código | Implementado como base | Fuente común para HTML, Markdown, sitemap y `llms-full`; `AGENTS.md` presente. Las skills internas propuestas aún no se han creado. |
| CI/CD y Quality Gate | Verificado localmente; CI remoto pendiente | Lint, tipos, tests, contenido, SEO, build, Playwright, enlaces internos y filtros editorial/léxico/semántico ejecutados. Falta ejecutar el CI remoto y ampliar comprobación de fuentes externas; los informes locales no prueban éxito del workflow remoto. |
| Medición | Configurada, sin datos nuevos | GA4, Search Console y Clarity vinculados bajo Redes Ordantis; conversiones y AI Organic configurados. Requiere despliegue y consentimiento real. |
| Dashboard | Pendiente | Debe construirse cuando exista volumen suficiente de datos; las plataformas son ahora la fuente de verdad. |
| Definition of Done | Parcial | La suite funcional local pasa y existe una primera medición de demanda. Quedan privacidad/recepción real, validación legal y, tras autorización, producción, indexación, CWV y datos reales. |

## Contenidos prioritarios ya cubiertos

### Agentes y seguridad

- Cuándo no utilizar un agente.
- MCP frente a API.
- Permisos y aprobación de herramientas.
- Prompt injection en agentes con herramientas.
- Human-in-the-loop con autoridad real.

### Document Intelligence

- OCR frente a inteligencia documental.
- Expediente computable.
- RAG más allá de una carpeta de PDF.
- RAG con abstención y evidencia.
- Informes técnicos sin inventar información.
- Anonimización trazable.
- Documento convertido en hipótesis geométrica.
- Datos públicos con vigencia, versiones y controles de mantenimiento.

### Predicción, datos y Responsible AI

- Data leakage y validación temporal.
- Drift y calibración.
- Industrialización en tiempo real.
- Privacidad por diseño y Edge AI.
- Audio procesado sin grabación persistente.
- Sensores defectuosos y confianza del dato.
- Datos incompletos, territorio, agua e infraestructura pública.

### EXIST 2026

- Valor real de una modalidad adicional.
- Desacuerdo entre anotadores y soft labels.
- Divergencia entre evaluación soft y hard.
- LLM como mediador semántico offline.

## Qué sigue pendiente, sin mezclarlo con publicar

### Se puede seguir antes de publicar

1. Search Intelligence cuantitativa: la primera pasada de Keyword Planner está completada y normalizada. Falta repetir con filtro español si se habilita, ampliar el contraste de intención SERP y cruzar con consultas reales después de indexar. Semrush/SE Ranking solo se valorarán ante una pregunta que justifique la suscripción.
2. Labs restantes y ampliación de los cuatro actuales: explorador municipal/GIS y forecasting. El RAG Benchmark necesita un conjunto de calibración separado y preguntas fuera de muestra; la evaluación de agentes necesita autorización aplicada en backend, credenciales, trazas e intentos de evasión contra una implementación real; Document Intelligence necesita OCR/modelos y documentos autorizados en un conjunto separado. No basta una pantalla de ejemplo. Las nueve demos originales ya están migradas y revisadas, pero no equivalen a esos benchmarks.
3. Skills internas propuestas: `ordantis-web-quality`, `ordantis-content-editor`, `ordantis-schema`, `ordantis-agentic-readiness` y `ordantis-research-publisher`. Las reglas actuales están en `AGENTS.md`, scripts y documentación, pero esos paquetes no se han creado.
4. Revisión editorial continua: SignsOfAI, Vale, LanguageTool y similitud semántica ya ejecutados. Queda ampliar evidencia propia, comprobación de enlaces a fuentes externas y contraste de intención con consultas reales.
5. Contenidos secundarios: A2A frente a MCP, selección de una arquitectura de agentes, evals, trazas, coste operativo, restricciones GIS y otros temas de la conversación. Primero decidir si requieren una página propia o ampliar una guía existente.
6. Confianza y conversión: domicilio/asiento mercantil ya contrastados con BORME; razón social y NIF facilitados por el propietario e incorporados solo a la información legal. La política recoge tratamientos, bases, proveedores, transferencias, plazos publicados e inventario de almacenamiento, GA4, Clarity, Turnstile y cookies técnicas condicionales de Cloudflare. Contacto abre un borrador y Diagnóstico muestra información por capas antes de su envío; la casilla acredita lectura y no simula consentimiento publicitario. El envío del diagnóstico y Turnstile están implementados localmente; faltan secretos de producción, validación jurídica final, ajustes efectivos de retención, prueba de recepción y escaneo post-despliegue.

### Trabajo externo que no se ha realizado en esta revisión

- Organización y nuevos repositorios/activos de Ordantis en GitHub, organización/Spaces/datasets en Hugging Face, Artifacts y distribución en LinkedIn o YouTube. Preparar materiales localmente es posible; publicarlos espera autorización.
- MCP público de solo lectura, repositorio público de Agent Skills, demo A2A y suite pública de evals. Los artículos no equivalen a tener esos servicios desplegados.

### Solo cuando se autorice el lanzamiento

1. Configurar entorno de producción y desplegar.
2. Comprobar HTML, schema, Markdown, 404, Lighthouse, móvil y crawlers sobre el dominio real.
3. Enviar sitemap a Search Console y Bing y, si procede, IndexNow.
4. Validar consentimiento, visitas, conversiones y atribución AI Organic con datos reales. El clic de correo es una señal de intención de contacto, no un lead comercial confirmado.
5. Medir indexación, Core Web Vitals y citas; construir el dashboard cuando haya volumen suficiente.

### Omitido a propósito

- Equipo y perfiles de Sergio/Fernando: por indicación del propietario, no es un olvido.
- Casos de clientes, organismos, adjudicaciones, cifras de impacto y resultados extraídos de propuestas: no se publican sin ejecución demostrable y autorización.
- Páginas de sectores o artículos casi duplicados sin evidencia propia: no se crean solo para cubrir keywords.

Detalles: `EDITORIAL_REVIEW_2026-08-28.md`, `PERFORMANCE_REVIEW_2026-08-28.md`, `MEASUREMENT.md`, `SEARCH_INTELLIGENCE.md` y `DATA_QUALITY_LAB.md`. La revisión del 27 se conserva como histórico.

## Verificación de cierre del 29 de agosto

- `npm run quality` correcto: exportación de 52 páginas y 26.535 palabras, lint, TypeScript, 48 pruebas unitarias, control editorial en 66 archivos, comparación de 435 pares, 12 artefactos SEO/GEO, 9 invariantes y build de 60 rutas.
- La prueba E2E específica de preparación para buscadores pasa en una compilación aislada: 52 páginas con JavaScript desactivado, metadata, canonical, entidades corporativas, áreas de servicio, sitemap, Markdown no indexable y respuestas a agentes.
- Google Trends y Keyword Planner permanecen separados mediante datos y tests. La exportación del Planner mapea 50 de 50 semillas, conserva 31 ausencias como `null` y no interpreta competencia publicitaria como dificultad SEO.
- Se generó el informe interno validado `Demanda de búsqueda para Ordantis`, con gráfico, tabla, decisiones y límites. No se publicó ni se añadió al diseño de la web.

## Verificación de cierre del 30 de agosto

- `npm run quality` correcto: exportación de 52 páginas y 26.508 palabras, lint, TypeScript, 51 pruebas unitarias, control editorial en 66 archivos, comparación de 435 pares, 12 artefactos SEO/GEO, 9 invariantes y build de 60 rutas.
- Las dos pruebas E2E de preparación para buscadores pasan en una compilación aislada. Verifican HTML indexable sin JavaScript, canonical, entidades, sitemap, políticas de crawler, `llms.txt` v2, Markdown no indexable y cabeceras de descubrimiento.
- La comprobación visual se ejecutó en escritorio y en un viewport móvil de 390 × 844 píxeles. No hay desbordamiento horizontal, el menú móvil abre y cierra, no hay overlay de error y el carrusel de empresas conserva la animación `partners-marquee` en ejecución.
- La auditoría automática WCAG 2 A/AA no detectó infracciones. Axe dejó una comprobación manual de contraste como incompleta porque el hero usa un pseudo-elemento decorativo y no pudo inferir su fondo.
- Albacete y Valencia continúan como URLs públicas, diferenciadas e indexables, presentes en sitemap y en las versiones Markdown. Se retiraron de la navegación principal, el pie y el catálogo de capacidades; no se han ocultado con `noindex` ni contenido diferente para bots.
- `robots.txt` separa descubrimiento/búsqueda de entrenamiento mediante Content Signals. `llms.txt` adopta la estructura propuesta en llmstxt.org, enlaza a versiones Markdown y declara límites de evidencia; se trata como ayuda de descubrimiento, no como factor de ranking garantizado.
- La cuenta de Cloudflare de Ordantis quedó conectada en modo de solo lectura con `fermago2005@gmail.com`, y se registraron los cinco MCP oficiales indicados por Cloudflare. No se modificaron DNS, WAF, reglas de bots, caché ni despliegues.
- La auditoría de Cloudflare muestra el bloqueo real previo al lanzamiento: `ordantis.com` sigue detrás de Cloudflare pero con GitHub Pages como origen. En producción, `/sitemap.xml`, `/llms.txt` y las dos páginas locales devuelven 404. AI Crawl Control contabilizó 345 solicitudes de crawlers en 24 horas, 322 de ellas fallidas por 404; los bots de búsqueda verificados no estaban bloqueados por Cloudflare.
- La medición avanzada de Core Web Vitals con Chrome DevTools debe repetirse sobre una previsualización o la URL publicada. El conector DevTools no estaba configurado en esta sesión, por lo que no se atribuyen métricas que no se hayan medido.
- Se preparó después una salida local de Cloudflare Workers mediante vinext, siguiendo la guía oficial vigente para Next.js 16. `vinext check` devuelve 100 % de compatibilidad; la compilación, el `wrangler deploy --dry-run` y dos pruebas E2E sobre el runtime local pasan. El paquete comprimido del Worker mide 1.298,11 KiB y solo declara el binding de activos. No se publicó una URL de preview, porque también sería accesible desde Internet.
- La política de crawlers mantiene `ai-train=no` sin cerrar la búsqueda o la citación: se permiten los bots de recuperación de OpenAI y Anthropic y se restringen sus bots de entrenamiento. `Google-Extended` continúa bloqueado porque no afecta a Search o AI Overviews, pero su activación permitiría a la vez grounding en aplicaciones Gemini y entrenamiento futuro; esa excepción necesita una decisión expresa.

## Verificación local del 2 de septiembre

- Se corrigieron las dimensiones intrínsecas de los logotipos de cabecera, pie, programas y empresas con sus proporciones reales. Next ya no avisa de cambios de anchura sin altura y se conserva el tamaño visual del diseño original.
- El nuevo RAG Benchmark está enlazado desde Labs e incluido en el inventario indexable, sitemap, canonical, Markdown y JSON-LD (`WebPage`, `BreadcrumbList` y `Dataset`). La página declara corpus, preguntas, método, parámetros, resultado y limitaciones.
- Con los parámetros publicados, la prueba preparada recupera las seis fuentes respondibles, se abstiene en tres preguntas sin respuesta o ambiguas y produce cero respuestas falsas. Los parámetros se ajustaron mirando el mismo conjunto; una prueba automática impide presentar el resultado como holdout.
- `npm run quality` pasa: 53 representaciones editoriales, 29.257 palabras, 62 pruebas unitarias, control editorial de 72 archivos, 435 pares revisados, 12 artefactos SEO/GEO, 9 invariantes y build de 62 rutas.
- Las 25 pruebas E2E de Labs pasan en 320, 390, 768, 1024 y 1440 píxeles. Comprueban recálculo, abstención, descarga JSON, ausencia de analítica local y desbordamiento global. La revisión renderizada confirma un H1, canonical, alternativa Markdown, cuatro bloques JSON-LD y cero errores de consola.
- La traza avanzada de rendimiento continúa pendiente: la skill de `web-perf` exige Chrome DevTools MCP y ese conector no está disponible en esta sesión. No se sustituyó por una cifra inventada ni se confundieron las pruebas funcionales con Core Web Vitals.
- Agent Evaluation Lab se añadió después con diez escenarios inventados y cinco controles de política. La configuración inicial coincide con las diez expectativas; al desactivar todos los controles solo coinciden dos y se permiten ocho operaciones que debían denegarse o aprobarse. Esa diferencia explica el método, no acredita seguridad.
- Tras esta ampliación, `npm run quality` exporta 54 páginas y 30.649 palabras, ejecuta 66 pruebas unitarias, revisa 75 archivos editoriales y construye 63 rutas. Las 35 pruebas E2E de Labs pasan en los cinco anchos y la revisión renderizada mantiene canonical, Markdown, cuatro bloques JSON-LD, un H1 y cero errores de consola.

## Verificación local del 13 de septiembre

- Document Intelligence Lab se añadió con un contrato inventado de cuatro páginas y diez candidatos preparados. La política inicial acepta tres, envía seis a revisión, rechaza uno y coincide con las diez expectativas declaradas; al retirar todos los controles acepta los diez, solo acierta tres y produce siete aceptaciones inseguras.
- La página está enlazada desde Labs y forma parte del inventario indexable, sitemap, canonical, Markdown y JSON-LD (`WebPage`, `BreadcrumbList` y `Dataset`). La fuente, el método, el orden de decisión y cinco limitaciones permanecen visibles sin JavaScript.
- `npm run quality` pasa: 55 representaciones editoriales, 31.883 palabras, 71 pruebas unitarias, control editorial de 78 archivos, 435 pares revisados, 12 artefactos SEO/GEO, 9 invariantes y build de 64 rutas.
- Las 45 pruebas E2E de Labs pasan en 320, 390, 768, 1024 y 1440 píxeles. Cubren recálculo, evidencia, contradicciones, riesgo, descarga JSON, ausencia de analítica local y desbordamiento global.
- La revisión renderizada conserva el sistema visual original y confirma un H1, canonical, alternativa Markdown, cuatro bloques JSON-LD, 7.697 caracteres visibles, cero desbordamiento, cero overlays y ningún error o aviso de consola. El Lab sigue siendo local; no se ha desplegado ni enviado a buscadores.
