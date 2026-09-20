# Refinamiento local de portada y servicios — 18/09/2026

## Alcance

Implementación local para revisión. No se ha desplegado en Cloudflare, publicado en producción ni realizado un push a GitHub. Se conserva el trabajo previo del repositorio.

El objetivo es explicar proyectos de machine learning, ciencia de datos y sistemas de IA para empresas y administraciones, con I+D cuando exista incertidumbre técnica. No se presentan propuestas como proyectos adjudicados ni se añaden resultados comerciales no demostrados.

## Cambios

- Portada: tres problemas concretos (demanda, fiabilidad de señales, asignación de recursos), con esquemas SVG propios, preguntas, datos necesarios, criterios de evaluación y enlaces a guías existentes.
- Los esquemas están identificados como ilustrativos y sin datos de clientes. No representan mediciones ni despliegues reales.
- Móvil: gráfico antes del texto y detalles técnicos en desplegables HTML nativos, accesibles con teclado y sin JavaScript adicional.
- Áreas de trabajo en una cuadrícula editorial; mejor jerarquía del bloque de evidencia y de las guías.
- Servicios: recorrido Fuentes → Modelos → Evaluación → Integración; catálogo por fases con introducción lateral en escritorio y composición apilada en móvil.
- Se conservan los doce servicios, sus anclas, las nueve demos existentes, el hero con flechas pequeñas, la intro, los colores, tipografías, formas y carrusel de empresas. Los servicios complementarios siguen sin encabezar la oferta.
- Los textos nuevos comparten fuente con las exportaciones Markdown. Solo portada y servicios cambian su fecha editorial a 18/09/2026. No se añaden enlaces visibles a sitemap, llms.txt ni GitHub Research.

## Verificación

1. `npm run quality` después del último ajuste móvil: correcto; lint, tipos, 81 pruebas unitarias, controles de contenido y SEO, exportación de 62 páginas y compilación de 71 rutas.
2. Suite de navegador antes del último ajuste de presentación móvil: 48 pruebas correctas y 12 omisiones previstas, en anchos de 320, 390, 768, 1024 y 1440 px. Cobertura de navegación, catálogo, demos, diagnóstico, enlaces, contenido HTML inicial y diseño preservado.
3. Comprobación manual de la compilación final: portada a 320 y 390 px sin desbordamiento horizontal; apertura y cierre por teclado de los tres nuevos desplegables; revisión visual de gráficos y texto. Servicios a 1440 px sin desbordamiento, doce elementos de servicio y un H1. Sin errores ni advertencias en la consola observada.
4. Vale: 62 páginas, sin incidencias. SignsOfAI: control correcto; mantiene dos excepciones editoriales preexistentes por hash. Estos controles no acreditan por sí solos la calidad ni la autoría del contenido.
5. Lighthouse pendiente: la revisión automática de permisos alcanzó su límite de uso y no autorizó ejecutar la instalación de la herramienta. No se ha ejecutado la auditoría ni se han generado nuevas puntuaciones de velocidad. LanguageTool no se ha vuelto a ejecutar en esta iteración.

El servidor local de revisión queda en `http://127.0.0.1:3000/`, con servicios en `/capacidades`. La versión privada de Cloudflare no ha cambiado en esta iteración.

Continuación del mismo día: Lighthouse instalado y auditoría ejecutada; véase [la revisión de rendimiento](PERFORMANCE_REVIEW_2026-09-18.md). El punto 5 refleja el estado al cerrar el pase de diseño, no el estado actual de la herramienta.
