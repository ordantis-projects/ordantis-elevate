# Empresas, administraciones y especialidad técnica

## Decisión del propietario

La web debe interesar a empresas que quieren invertir en machine learning, ciencia de datos, I+D y sistemas de IA complejos. Administraciones y retos GovTech siguen siendo un público relevante; no son el único. El desarrollo y la integración no requieren inventar una incertidumbre científica para justificar el proyecto.

## Cambios locales

- Portada: problemas de demanda, fiabilidad y planificación antes de capacidades y evidencia. Aplicaciones orientativas, no resultados atribuidos a clientes.
- ML y ciencia de datos encabezan los ámbitos de proyecto. I+D conserva una página propia y se propone cuando hay incertidumbre técnica.
- Nuevo bloque de entrada: desarrollar un modelo, investigar una solución o llevar un sistema existente a operación.
- Condiciones de entrega reunidas: evaluación, datos y entorno, artefactos y derechos de uso, operación y mantenimiento. Son materias que se acuerdan, no compromisos contractuales universales.
- Ciencia de datos incluye representatividad, análisis estadístico, sesgos y factores de confusión; no se ha limitado a renombrar BI. Una correlación no prueba una causa.
- Dos guías nuevas para empresas: mantenimiento predictivo con pocas averías y cambios operativos frente a cambios de medición. Separación temporal y por activo, seguimiento incompleto, presupuesto de alertas, exposición y límites de la atribución causal. Referencias primarias de scikit-survival, scikit-learn y NIST. Ejemplos inventados; no benchmarks ni resultados de clientes. Ambas aparecen en portada, Insights, las capacidades relacionadas, sitemap y llms.
- Servicios, Empresa, GovTech, FAQ, diagnóstico y páginas locales alineados. Se conservan las URL, doce servicios, nueve demos y cuatro componentes secundarios plegados.
- Logos del ecosistema más abajo, sin suprimirlos. Flechas, intro, cinta animada, geometrías y estética original conservadas.
- EXIST tiene su alcance explícito: NLP e información multimodal. No se convierte en evidencia de predicción desplegada ni en resultado de otro problema.
- Metadata, Organization, Markdown, llms y fechas coherentes con las fuentes compartidas. Endpoints técnicos sin enlaces visibles en la interfaz.

## SEO y búsquedas con IA

La [guía oficial de Google sobre funciones de IA](https://developers.google.com/search/docs/appearance/ai-features) mantiene los fundamentos de SEO: contenido indexable, enlaces internos, experiencia útil y datos estructurados coherentes con el texto. No se promete citación ni posición en una respuesta generativa, ni se presenta llms como requisito de Google.

Prioridad editorial y comercial:

| Intención | URL principal | Qué debe poder comprobar el visitante |
| --- | --- | --- |
| Desarrollar o validar modelos ML | /capacidades/modelos-predictivos | Horizonte, referencia, evaluación temporal y operación |
| Ciencia e ingeniería de datos | /capacidades/data-intelligence | Representatividad, análisis, calidad y reproducción |
| Invertir en I+D de IA | /capacidades/investigacion-desarrollo | Hipótesis, comparación, presupuesto y cierre |
| Desarrollo de sistemas complejos | /capacidades | Modelos, optimización, visión e integración |
| Retos de administraciones | /govtech | Problema público, fuentes, aceptación y transferencia |
| Proveedor en Albacete o Valencia | Páginas locales existentes | Especialidad, relación local verificable y contacto |

Las 50 consultas de Keyword Planner medidas en agosto son evidencia histórica, no se han sobrescrito ni se han inventado métricas para ciencia de datos, sistemas complejos o nuevas consultas comerciales. Ampliar la medición para el foco actual sigue siendo una tarea de investigación. No generar páginas de ubicación o artículos masivos para cubrir cada variación.

## Límites de la mejora

No se han inventado casos, adjudicaciones, certificaciones ni métricas. Un benchmark propio de predicción publicable y la evidencia de implantaciones autorizadas siguen siendo pendientes: las demos sintéticas no los sustituyen. No se publica la identidad del trabajo confidencial ni perfiles del equipo.

El contenido se preparó inicialmente en local. La petición posterior «continúa subiendo a la privada» autoriza actualizar únicamente el alias staging existente, manteniendo Access. No autoriza modificar el dominio principal, hacer push ni enviar URL a buscadores. Publicado en la versión privada `ba02b762-1b8e-442d-801b-c8f93ffee772`; resultado y aislamiento en `PRIVATE_PREVIEW_BALANCED_2026-09-17.md`.

## Verificación

- `npm run quality`: lint, tipos, 81 pruebas unitarias, 83 archivos de contenido, 666 pares de guías y 12 artefactos SEO/GEO con 9 invariantes comprobados. Compilación final registrada en el documento de publicación privada.
- 85 pruebas de navegador de diseño recuperado, intro, móvil y equilibrio de públicos superadas a 320, 390, 768, 1024 y 1440 px.
- Dos pruebas de rastreo local en Next: las 62 páginas ofrecen HTML sustancial, entidades y metadatos coherentes sin JavaScript.
- Inspección adicional de nueve rutas en los cinco anchos: un H1, cero desbordamientos y cero errores JavaScript. Revisadas capturas de portada, alcance, entrega y las dos guías; la imagen Open Graph responde 200 y conserva la identidad.
- Vale: 62 páginas, cero observaciones y control positivo correcto.
- SignsOfAI: 62 páginas, sin artefactos ni patrones propios de afirmaciones sin respaldo. Se conservan revisiones por hash exacto de `/insights` y `/faq`; ambas guías nuevas puntúan 0. Un detector no acredita autoría ni calidad.
- LanguageTool 6.6 local: 62 páginas, cero observaciones pendientes. Diccionario ampliado con Brier y survival (nombre de scikit-survival), y dos alertas falsas revisadas en su contexto exacto: si condicional y grafía oficial de scikit-learn. No se desactiva ninguna regla global. Servidor auxiliar detenido al terminar.
- La prueba de preview se endurece: exige noindex en cada página HTML y en respuestas a rastreadores. Detectó que el matcher del runtime de Cloudflare omitía la raíz; se añade una regla explícita para `/`, conservando el patrón del resto de rutas. Las dos pruebas del runtime privado pasan con la compilación corregida.

La primera ejecución simultánea de build, Chromium y Java agotó memoria; para repetir la compilación local se admite `ORDANTIS_BUILD_CPUS=2`. Solo limita procesos de build, no modifica la experiencia ni la configuración pública por defecto.

La auditoría con la skill `web-perf` se detiene en su requisito inicial: no están disponibles las herramientas MCP de Chrome DevTools. No se han medido nuevos Core Web Vitals ni se reutilizan valores antiguos como si correspondieran a este pase. Esta dependencia no impide verificar funcionalidad, HTML inicial y adaptación a los cinco anchos de pantalla.
