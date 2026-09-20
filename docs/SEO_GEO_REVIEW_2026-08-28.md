# Revisión del vídeo, recomendaciones y continuación local

Revisión: 28 de agosto de 2026. Sin publicación, campañas ni cambios de diseño.

## Vídeo revisado

[Pedro SEO: Claude para SEO: Skills, MCP y datos reales paso a paso](https://www.youtube.com/watch?v=pirgvLhtdtA), publicado el 9 de julio de 2026; duración 19:23. Se ha leído completa la transcripción automática en español; puede contener errores de reconocimiento. No se ha auditado el código de sus skills ni comprobado los resultados de sus clientes.

- 04:14–05:20: conectar decisiones editoriales con Search Console. Aplicación: leer la propiedad de Ordantis bajo Redes y distinguir datos de la web publicada de pruebas locales.
- 07:54–14:58: contrastar arquitectura e intención con datos de keywords y voz de marca. Aplicación: preparar consultas para páginas existentes; no trasladar el modelo de categorías de un ecommerce a esta consultora.
- 16:23–18:33: revisar GEO y schema. Sus puntuaciones son valoraciones de la herramienta, no métricas oficiales de Google ni pruebas de citación. Una recomendación de generar JSON-LD necesita verificar cada dato.

No se han instalado sus paquetes, contratado Semrush ni enviado información a formularios comerciales del vídeo. La skill `marketing:seo-audit` mencionada en el texto pegado no está disponible en esta sesión. Se han utilizado las herramientas y comprobaciones reales del repositorio.

## Qué aceptamos y qué corregimos del texto de Claude

| Recomendación | Contraste y decisión |
| --- | --- |
| Guía de Google del 15 de mayo de 2026 | La fecha está confirmada en el [anuncio oficial](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing). El SEO sigue siendo la base para las funciones generativas de Google. |
| `llms.txt`, Markdown y bloques de 100–200 palabras | La [guía de Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) no exige esos formatos ni una longitud ideal. Se conservan las representaciones existentes para otros consumidores, sin atribuirles mejoras de ranking. Las respuestas se estructuran para resolver una pregunta, no para cumplir una cuota de palabras. |
| Desbloquear todos los bots | Se separan búsqueda y desarrollo de modelos. [OpenAI](https://platform.openai.com/docs/bots) diferencia OAI-SearchBot de GPTBot; [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) distingue Claude-SearchBot/Claude-User de ClaudeBot. |
| Permitir Google-Extended para AI Overviews | No es necesario para Google Search. Su restricción sí afecta a usos de entrenamiento y grounding de Gemini Apps/Vertex: es un límite deliberado, no una autorización universal para todas las experiencias de Gemini. [Documentación oficial](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended). |
| Brave como única vía a Claude | Se permite Bravebot, pero no se presenta como vía exclusiva. La documentación de Anthropic identifica sus propios agentes de búsqueda y recuperación; permitir un robot no garantiza una cita. |
| ProfessionalService en cada servicio | Se conserva `Service` con Ordantis como proveedor. El tipo general [ProfessionalService está deprecado](https://schema.org/ProfessionalService); no describe mejor estas páginas. |
| Person y biografías obligatorias | Se respeta la exclusión de equipo. [Google admite autores Organization](https://developers.google.com/search/docs/appearance/structured-data/article). Se añade identificación explícita de Ordantis —tipo, nombre, URL e ID común— y se elimina la alternativa Person de la función compartida. |
| FAQ schema como ventaja de resultados enriquecidos | Se conserva el marcado fiel a las preguntas visibles, sin prometer ese resultado. Google [retiró el resultado enriquecido FAQ desde el 7 de mayo de 2026](https://developers.google.com/search/updates#may-2026). |
| SEO local y páginas por ciudad | El domicilio registral no demuestra una oficina de atención. Falta confirmar la elegibilidad de [Google Business Profile](https://support.google.com/business/answer/13763036?hl=en-GB). No se inventan horarios, teléfono, reseñas ni páginas locales casi idénticas. |
| Evidencia propia | Correcto como dirección editorial. EXIST conserva fuentes y limitaciones; las propuestas y demos sintéticas no se convierten en casos de éxito. No se añaden cifras antes/después inexistentes. |
| Velocidad como garantía de clasificación | Hay que mejorarla, sin deducir una posición de una puntuación Lighthouse. [CWV](https://developers.google.com/search/docs/appearance/core-web-vitals) se evalúa también con usuarios reales; Search Console aún no ofrece datos suficientes para esta propiedad. |

## Cambios implementados

1. Política de rastreo común en `lib/crawler-policy.ts`: búsqueda explícita de Google, Bing, OpenAI, Anthropic, Perplexity y Brave; restricciones de desarrollo de modelos separadas. No se ha tocado el WAF ni el dominio publicado.
2. Los grupos específicos ahora conservan las exclusiones de `/api/` y `/api`. Antes solo el grupo comodín restringía las rutas técnicas; [los grupos específicos no heredan sus reglas](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec).
3. Markdown es rastreable y mantiene `X-Robots-Tag: noindex` y canonical HTTP. Así un consumidor puede leerlo y el buscador puede ver la directiva de no indexar esa representación. `robots.txt` no es control de acceso ni protege datos confidenciales.
4. Autoría corporativa explícita en Article e imagen existente de Open Graph. No se ha inventado `sameAs`: falta un perfil corporativo verificado. Tampoco se han refrescado fechas del contenido que no ha cambiado.
5. Pruebas adicionales de HTML sin JavaScript, canonical, títulos/descripciones únicos, entidades, sitemap y respuestas a agentes. Es una comprobación local: usar un nombre de robot en una petición no demuestra que el WAF acepte sus IP reales.
6. Inventario verificable de referencias externas: `npm run quality:sources`. Resultado guardado en `.quality/source-links/2026-08-28T17-30-53-418Z/`: 29 URL, 28 HTTP 2xx, cero HTTP 404/410 y un 403 de Web3Forms. El 403 se conserva como inconcluso. HTTP 200 no prueba el contenido de una afirmación ni descarta un soft 404.

## Search Console: comprobación real bajo Redes

- Propiedad: `https://www.ordantis.com/`.
- Ajustes → IA generativa: hereda de `ordantis.com`; control efectivo **Incluir**. No se ha pulsado Guardar ni cambiado la preferencia.
- Informe generativo: **4 impresiones**, todas en la portada, intervalo **27 de mayo–26 de agosto de 2026**. No equivale a cuatro visitas, cuatro leads ni cuatro consultas distintas.
- La descripción general muestra una página indexada y ausencia de datos de Core Web Vitals. Esto corresponde a la web publicada, no a las 50 URL de la versión local.
- La [documentación del informe](https://support.google.com/webmasters/answer/16984139) advierte que su disponibilidad es gradual. El [control de inclusión](https://support.google.com/webmasters/answer/16908024) es distinto del control de entrenamiento.

## Keyword Planner: exportación completada el 29 de agosto

Se confirmó la cuenta Google **Redes Ordantis** y se accedió al Planner. Se cargaron las 50 consultas preparadas y se descargó el historial oficial. No se crearon ni activaron campañas, no se fijó presupuesto y no se inició gasto.

Alcance ejecutado: España, Google, 1 de agosto de 2025–31 de julio de 2026 y **Todos los idiomas**. Las consultas están redactadas en español, pero el plan no quedó filtrado por idioma. Esta limitación se conserva en los datos y debe corregirse en una repetición si la interfaz habilita el selector.

El resultado normalizado está en `quality/keyword-planner-results-2026-08-29.json`; el original se conserva sin modificar y con SHA-256. La exportación devuelve las 50 consultas, promedio para 19 y ausencia para 31. Cinco términos generales aparecen con 500 y catorce con 50. Los valores son estimaciones redondeadas; las variantes no se suman como tamaño de mercado y una celda vacía sigue siendo `null`, no cero.

Decisiones derivadas:

1. Reforzar `/capacidades` con el lenguaje de `inteligencia artificial para empresas`, consultoría y proveedor, sin convertir la página en una lista de keywords.
2. Reforzar `/capacidades/data-intelligence` con ingeniería y gobierno del dato.
3. Mantener agentes, predicción y documentos en sus páginas actuales. Las señales especializadas no justifican otra landing.
4. Tratar GovTech, RAG y MCP/API como contenidos de autoridad o decisión. Ausencia de promedio no demuestra ausencia de demanda.
5. No usar CPC o competencia publicitaria como dificultad orgánica. No hay serie mensual, así que la estacionalidad continúa sin validar.

## Google Trends: señal exploratoria, no sustituto de Planner

El 29 de agosto se hicieron dos comparaciones públicas en España para el periodo 1 de agosto de 2025–31 de julio de 2026. Se guardaron los términos, medias mostradas, URLs y reglas de interpretación en `quality/google-trends-sample-2026-08-29.json`.

- En el grupo amplio, las medias relativas fueron: `agentes de IA` 38, `calidad de datos` 34, `inteligencia artificial empresas` 18, `RAG empresas` 0 y `modelos predictivos` 0.
- La señal no equivale a demanda comercial. En `agentes de IA` aparecen Claude y n8n entre las relacionadas, y en `calidad de datos` domina una consulta sobre mejorar imágenes. Ambas mezclan intenciones ajenas al servicio.
- Al usar calificadores comerciales, las medias relativas fueron 5 para `inteligencia artificial para empresas`, 2 para `agentes IA para empresas` y 0 para las otras tres expresiones. Son señales demasiado dispersas para justificar nuevas landings.
- Un cero de Trends no significa cero búsquedas. Es un valor redondeado o insuficiente dentro de esa comparación normalizada. Tampoco se pueden sumar los dos grupos ni tratarlos como volúmenes mensuales.

Decisión actualizada: mantener las URLs actuales. La intención general de proveedor y el clúster de datos tienen la señal más clara; agentes sigue siendo una capacidad estratégica con términos más pequeños. No se crean páginas comerciales nuevas ni contenido de relleno.

## Pendientes que esta revisión no da por resueltos

- Repetición de Keyword Planner con filtro español, si la cuenta habilita el selector, y contraste con consultas reales de Search Console después de indexar. La primera exportación cuantitativa ya está completada.
- Activación de envío y prueba de recepción real: clave, buzón y tratamiento del proveedor pendientes.
- Confirmación de NIF, validación jurídica, conservación/transferencias y uso responsive autorizado del sello INCIBE.
- Fechas reales de primera publicación, perfil corporativo `sameAs` y nueva evidencia propia.
- Más optimización de LCP y comprobaciones de SDK/WAF/CWV reales después del lanzamiento autorizado.
- Labs y activos públicos restantes del Plan Maestro; no se han convertido propuestas en resultados ni creado servicios MCP públicos.

La retirada del consentimiento ya está implementada y probada localmente; falta su comprobación con proveedores reales al lanzar. El diseño, sus movimientos, los doce servicios y las nueve demos se conservan. No se ha publicado nada.
