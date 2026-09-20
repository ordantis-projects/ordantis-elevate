# Auditoría de rendimiento local — 18/09/2026

Lighthouse ya está instalado y ejecutado. El bloqueo anterior de revisión de permisos se ha resuelto en esta continuación. No se ha publicado esta versión en Cloudflare ni en el dominio principal.

## Método y límites

Compilación de producción de Next.js en `http://127.0.0.1:3000/`, Lighthouse 12.6.1, perfiles de Chrome temporales y aislados. Medición móvil con configuración predeterminada y ralentización simulada; escritorio con la configuración oficial `desktop-config` de esa misma versión. No se utiliza el perfil personal de Chrome ni se envían formularios.

Tres muestras por página antes y después para portada, servicios y diagnóstico. Los navegadores de auditoría se ejecutan secuencialmente, sin builds ni suites de tests simultáneos. Son pruebas de laboratorio en este ordenador; no equivalen al rendimiento del Worker desplegado, al INP de usuarios reales ni a superar Core Web Vitals. La [documentación de Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) explica la variabilidad por condiciones del dispositivo y del entorno.

## Cambios implementados

- Las mismas fuentes instaladas Inter y Space Grotesk se cargan con `next/font/local`, precarga desde el HTML inicial y fuente de respaldo ajustada. Se conservan los archivos variables latinos y sus pesos; no se descargan fuentes de Google.
- La traza confirma que las dos fuentes pasan de solicitarse después de la hoja de estilos, aproximadamente a 274/276 ms en la primera muestra inicial, a precargas alrededor de 32 ms en la tercera muestra final. Es una observación de esas muestras, no una mejora garantizada de LCP.
- El enlace de la política en el aviso de cookies utiliza la precarga por interacción compartida. La muestra inicial descargaba tres recursos RSC de `/cookies`; la muestra final inspeccionada no realiza esas descargas antes de interactuar.
- El comando local admite `--profile=desktop` además de móvil. Conserva los resultados JSON/HTML completos y sus puntuaciones originales.
- No se cambian textos, colores, formas, flechas, animaciones, intro, servicios ni demos. No se actualizan fechas editoriales por este cambio técnico.

## Comparación móvil

Puntuaciones sobre 100; LCP en segundos, TBT en milisegundos. Las columnas finales usan medianas de las tres muestras.

| Página | Rendimiento inicial | Rendimiento final: muestras | Mediana final | LCP inicial → final | TBT inicial → final | CLS inicial → final | Bytes iniciales → finales |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Portada | 81 | 81, 81, 93 | 81 | 3,086 → 3,116 | 362 → 360 | 0,01802 → 0,00053 | 313.494 → 303.196 |
| Servicios | 92 | 95, 95, 94 | 95 | 2,971 → 2,874 | 155 → 99 | 0,02711 → 0 | 309.604 → 302.234 |
| Diagnóstico | 95 | 93, 94, 93 | 93 | 2,714 → 2,922 | 125 → 153 | 0,00826 → 0 | 282.245 → 271.848 |

La mediana de rendimiento de servicios mejora tres puntos. La portada no mejora su mediana y diagnóstico baja dos puntos: no se atribuye una mejora uniforme de velocidad a estos cambios ni se elige la muestra de portada de 93 para representarla. Se reduce el peso transferido y el desplazamiento de contenido en las tres páginas. Esta comparación combina dos cambios técnicos y no aísla causalmente cada uno.

Accesibilidad y buenas prácticas: 100/100 en las 18 muestras móviles comparadas. No hay errores de ejecución de Lighthouse. El código de salida es 1 por el umbral SEO descrito abajo, no por un fallo de navegación o de obtención de informes.

## Escritorio

Una muestra por URL, útil como comprobación inicial; no es un benchmark repetido ni una comparación antes/después.

| Página | Rendimiento | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Portada | 97 | 0,703 s | 40 ms | 0,00104 |
| Servicios | 100 | 0,671 s | 8 ms | 0 |
| Diagnóstico | 100 | 0,605 s | 3 ms | 0 |

Accesibilidad y buenas prácticas: 100/100 en las tres muestras.

## Comprobación de otras plantillas

Una muestra móvil por página tras los cambios, sin comparación inicial:

| Página | Rendimiento | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Modelos predictivos | 90 | 2,784 s | 286 ms | 0 |
| GovTech | 92 | 2,677 s | 249 ms | 0 |
| EXIST 2026 | 95 | 2,635 s | 145 ms | 0 |
| Validar IA antes de industrializar | 95 | 2,616 s | 170 ms | 0 |

Accesibilidad y buenas prácticas: 100/100 en estas cuatro muestras. En total se conservan 25 informes válidos: nueve iniciales y dieciséis finales.

## Aviso SEO de robots.txt

Las muestras dan 92/100 en SEO. El único control SEO que falla es `robots-txt`: Lighthouse 12.6.1 considera desconocidas las tres líneas `Content-Signal` de la política existente. Los informes no se modifican y el umbral de 100 del script/CI no se rebaja para ocultarlo.

Las reglas `Allow`/`Disallow` de Googlebot y rastreadores de búsqueda siguen permitiendo el contenido público y excluyendo las API. [Google documenta](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) que usa los campos compatibles e ignora los demás. Este aviso de la herramienta no demuestra que Googlebot tenga bloqueada la web. No se elimina la política de uso por IA para mejorar una nota. Los controles propios de SEO comprueban por separado estas reglas, canonical, inventario y contenido rastreable.

## Evidencia reproducible

- Inicial móvil: `.quality/lighthouse-local/2026-09-18T09-35-27.551Z/`.
- Final móvil: `.quality/lighthouse-local/2026-09-18T09-39-58.046Z/`.
- Escritorio: `.quality/lighthouse-local/2026-09-18T09-42-07.487Z/`.
- Otras plantillas móviles: `.quality/lighthouse-local/2026-09-18T09-43-03.686Z/`.
- Cada carpeta incluye `summary.json` y los informes JSON/HTML. Las dos pasadas móviles incluyen trazas y registros de red.

```sh
npm install --prefix .quality/lighthouse --no-save --no-package-lock --ignore-scripts --no-audit --no-fund lighthouse@12.6.1
npm run quality
npm start -- --hostname 127.0.0.1
```

En otra terminal, sin builds/tests simultáneos:

```sh
npm run lighthouse:local -- --routes=/,/capacidades,/diagnostico --runs=3 --trace=true
npm run lighthouse:local -- --routes=/,/capacidades,/diagnostico --runs=1 --profile=desktop
```

## Pendientes de rendimiento

La portada necesita más trabajo de renderizado inicial en móvil. La traza inicial registra tareas largas al construir/pintar la página y ejecutar la hidratación; no basta con resolver la cadena de fuentes. Su LCP mediano final sigue en 3,116 s y TBT en 360 ms. Servicios y diagnóstico también superan 2,5 s de LCP en la simulación móvil aunque tengan puntuaciones globales verdes.

Conservar la intro y las animaciones forma parte de la decisión de diseño. La siguiente optimización debe investigarse con trazas y comprobar lectura, scroll, accesibilidad y estabilidad; esta auditoría no justifica retirar esas interacciones. Tras publicar la versión aprobada, medir también el alojamiento real, caché, conexiones de usuarios y analítica consentida.

## Verificación del código

`npm run quality`: correcto, 81 pruebas unitarias, lint, tipos, controles editoriales/SEO y generación de 71 rutas. `npm run build:vinext`: correcto, incluidas las nuevas fuentes locales en el build para Cloudflare. Estos comandos no publican la web.

Verificación de navegador: 55 pruebas correctas de diseño original, balance de audiencias, precarga por intención y experiencia móvil, en anchos de 320, 390, 768, 1024 y 1440 px. Se comprobaron navegación, teclado, los 12 servicios, selección y conservación del cuestionario y ausencia de envío antes de confirmar.

Revisión visual de las capturas de portada móvil (390 px) y escritorio: se mantienen las fuentes originales, las flechas animadas y la estética blanca, azul marino y cian. `git diff --check`: correcto. Cambios locales, sin publicación en Cloudflare.
