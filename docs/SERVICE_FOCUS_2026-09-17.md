# Servicios: desarrollo de modelos frente a componentes de integración

## Motivo de la revisión

El propietario sigue viendo una oferta de consultoría en «Modelos y componentes del sistema». La estructura daba la misma prominencia a siete especialidades y abría con BI. Cambiar el título general no había corregido esa jerarquía.

La oferta principal pasa a desarrollar y evaluar modelos, formular decisiones de planificación y preparar datos reproducibles para investigación e inferencia. GovTech, administraciones públicas y proyectos empresariales de I+D son los destinatarios; no se añaden clientes, adjudicaciones ni resultados.

## Correspondencia y conservación

Se mantienen las doce anclas y las nueve interfaces interactivas originales. Se separan ocho servicios principales y cuatro componentes de integración. La colocación se declara en `content/services.ts`, de donde derivan tanto HTML como Markdown.

| Grupo | Anclas conservadas | Tratamiento |
| --- | --- | --- |
| Investigación | `auditoria` | Viabilidad y diseño experimental |
| Datos | `infraestructura`, `ingenieria`, `gobernanza` | Fuentes, calidad, contratos y controles para sistemas de datos |
| Desarrollo de modelos | `prediccion`, `optimizacion`, `vision` | ML predictivo, apoyo a la decisión, visión y evaluación multimodal |
| Transferencia | `talleres` | Reproducción, integración y condiciones de operación |
| Integración complementaria | `bi`, `agentes`, `documentos`, `rag` | Grupo plegado después de las cuatro fases; numeración C.1–C.4 |

Los componentes complementarios dejan de aparecer entre los servicios de la metodología de portada. El cierre de Capacidades profundiza en investigación, modelos y datos; las páginas de documentos y agentes conservan sus rutas y enlaces desde sus componentes. El índice llms separa capacidades principales y especialidades complementarias sin accesos técnicos visibles nuevos.

Un enlace antiguo a un componente complementario abre también el grupo padre para que el destino resulte visible. El grupo se puede abrir con teclado y los servicios conservan sus controles de cierre y retorno de foco.

## Contenido técnico y demos

- Predicción: representaciones tabulares, temporales y de grafos cuando corresponda; información equivalente, ablaciones, episodios difíciles, incertidumbre y contrato de inferencia.
- Optimización: criterios definidos por el organismo o empresa, factibilidad, tiempo de cálculo y sensibilidad al error de la previsión.
- Visión: particiones por cámara, ubicación o periodo; aportación de otras modalidades y comportamiento ante una fuente ausente.
- Datos: reconstrucción de conjuntos experimentales, disponibilidad temporal, versiones y fallos de fuentes, en lugar de preguntas centradas en informes y métricas departamentales.
- Las demos principales dejan de utilizar marketing y rentabilidad comercial como ejemplos. Predicción mantiene los tres controles y la serie de 24 puntos, con fórmula y límites explícitos. Optimización conserva el comparador de dos repartos, ahora de 120 horas entre cuatro zonas inventadas. Las inspecciones son supuestos prefijados, no predicciones ni resultados de un optimizador.

No se ocultan resultados negativos ni se presentan propuestas como trabajos ejecutados. Una arquitectura más compleja no acredita I+D ni mejor rendimiento por sí sola.

## Alcance de publicación

Este ajuste se preparó inicialmente en local, sin despliegues, push, cambios de Access o DNS, envíos a buscadores ni formularios reales. La petición posterior del propietario autoriza únicamente la privada: incluido en la versión `ba02b762-1b8e-442d-801b-c8f93ffee772`, junto al equilibrio editorial de empresas y administraciones. Resultado en `PRIVATE_PREVIEW_BALANCED_2026-09-17.md`; el dominio principal sigue sin cambios.

## Verificación final

- `npm run quality`: código 0; lint, tipos, 79 pruebas unitarias, control editorial en 82 archivos, revisión de 595 pares, 12 artefactos SEO/GEO y 9 invariantes, compilación de 69 rutas.
- Servicios y diseño: 25 pruebas de navegador superadas con un solo worker, a 320, 390, 768, 1024 y 1440 px. Incluyen las nueve demos, el grupo secundario plegado, apertura por teclado y el enlace antiguo `/services#documentos` con retorno de foco.
- Rastreo local: dos pruebas superadas; las 60 páginas entregan HTML y entidades estructuradas sin JavaScript, con títulos y descripciones únicos, canonical y política de rastreo coherentes.
- Inspección visual adicional del bloque y el detalle predictivo a 390 y 1440 px: un H1, tres servicios principales de modelos, grupo complementario cerrado, cero desbordamiento y cero errores JavaScript. Capturas `.quality/service-focus-*.png`; script local `.quality/service-focus-visual.mjs`.
- LanguageTool 6.6: 60 páginas, cero observaciones, 608 términos técnicos reconocidos. Se reformuló una nota de la demo señalada como ambigüedad por el corrector; no se desactivaron reglas gramaticales. El servidor auxiliar se detuvo al terminar.
- Vale: 60 páginas, cero observaciones y control positivo correcto.
- SignsOfAI: 60 páginas analizadas; se mantienen las dos alertas previamente revisadas por hash exacto de `/insights` y `/faq`. El catálogo obtiene 7,4 y la portada 6,5. No se cambian umbrales ni se interpreta una puntuación como certificado de calidad o autoría.

Los informes y capturas de QA son locales y no forman parte de la web publicada. El servidor de desarrollo del propietario continúa en el puerto 3005.
