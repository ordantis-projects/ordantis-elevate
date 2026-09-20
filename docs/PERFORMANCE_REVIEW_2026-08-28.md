# Rendimiento y verificación local — 28 de agosto de 2026

No se ha publicado la web. Estos resultados corresponden a una compilación de producción ejecutada en `http://127.0.0.1:3000`, no al dominio público ni a usuarios reales.

## Última comparación: menos precargas, sin mejora estable de velocidad

Se ha añadido precarga por intención a los enlaces principales de cabecera y hero: ratón, foco de teclado o inicio de toque. El logotipo no vuelve a precargar la propia portada. Se conserva la navegación de Next, su HTML rastreable y la apariencia original. Diez pruebas comprueban que no se descarguen esas rutas antes de la interacción y que ratón/teclado sigan funcionando.

Tres muestras por URL antes y después, mismo Lighthouse 12.6.1 y configuración móvil descrita abajo; sin builds ni tests simultáneos. La continuación también incorpora los cambios de formulario/consentimiento, por lo que no es un experimento que aísle un único factor.

| Página | Puntuaciones antes → después | Mediana antes → después | LCP mediano | TBT mediano | Bytes transferidos medianos |
| --- | --- | --- | --- | --- | --- |
| Inicio | 91, 90, 89 → 88, 89, 91 | 90 → 89 | 3,37 → 3,31 s | 129 → 191 ms | 741.266 → 703.467 (−5,1 %) |
| Diagnóstico | 89, 93, 90 → 89, 89, 94 | 90 → 89 | 2,72 → 2,77 s | 227 → 266 ms | 288.388 → 272.408 (−5,5 %) |

**Conclusión:** se han eliminado descargas anticipadas innecesarias, pero esta medición no acredita una mejora estable de rapidez. La mediana de puntuación baja un punto y el bloqueo aumenta; no se ocultan esos resultados ni se elige solo la muestra de 94. El LCP continúa sobre 2,5 s. No se ha dado por cerrado rendimiento ni Core Web Vitals.

Accesibilidad, buenas prácticas y SEO: **100/100 en las doce muestras**. CLS mediano final: 0,00052 en inicio y 0 en diagnóstico. Estos controles no miden rankings, indexación ni citas generativas.

Evidencia reproducible:

- Antes: `.quality/lighthouse-local/2026-08-28T16-39-22.450Z/`.
- Después: `.quality/lighthouse-local/2026-08-28T16-59-35.386Z/`.
- Cada carpeta contiene resumen, JSON/HTML, trazas y logs de red. `--trace=true` conserva estos últimos.
- En la primera muestra de portada, las rutas de precarga pasan de inicio/diagnóstico/capacidades/cookies a solo cookies. No se han retirado páginas ni contenido.
- La traza inicial sitúa trabajo de layout e hidratación antes del primer pintado del texto. El siguiente frente es esa ruta de renderizado, no ocultar contenido, cambiar la tipografía o eliminar los movimientos originales para mejorar una nota.

Las siguientes secciones conservan las mediciones anteriores y el crawl completo, con sus versiones y condiciones. No deben mezclarse sus puntuaciones con esta comparación.

## Primera medición móvil repetida

Lighthouse 12.6.1, Chrome headless 151, emulación móvil de 412 × 823, CPU ×4 y red simulada con RTT de 150 ms y 1.638,4 kbit/s. Perfil temporal aislado por muestra; no se usa el perfil personal de Chrome. Tres ejecuciones por página, sin otros tests ni builds en paralelo.

| Página | Rendimiento: muestras | Mediana | LCP mediano | TBT mediano | CLS mediano | Accesibilidad / buenas prácticas / SEO |
| --- | --- | --- | --- | --- | --- | --- |
| Inicio | 91, 91, 91 | 91 | 3,34 s | 100 ms | 0,0014 | 100 / 100 / 100 en las tres |
| Diagnóstico | 89, 90, 87 | 89 | 3,05 s | 230 ms | 0 | 100 / 100 / 100 en las tres |

Informes JSON/HTML y resumen: `.quality/lighthouse-local/2026-08-28T16-09-21.072Z/`. Las seis ejecuciones son válidas, sin errores de ejecución. La mediana del peso transferido fue 740.620 bytes en inicio y 287.733 en diagnóstico. El peso corresponde a los recursos solicitados por esa auditoría, no a todo el repositorio.

**No equivale a superar Core Web Vitals.** El LCP de estas dos páginas queda por encima del [objetivo de 2,5 s](https://web.dev/articles/lcp) y el diagnóstico tiene variabilidad de bloqueo. INP y el percentil 75 de usuarios reales no se pueden deducir de TBT ni de una prueba local. Hay que repetir tras publicar, incluyendo el efecto de analítica consentida y distribución de usuarios.

## Cambio de peso comprobado

La cabecera importaba el archivo que también contenía todo el corpus de guías. Se ha separado la identidad y navegación en `content/identity.ts` y actualizado el import del componente cliente. No se han eliminado guías, fuentes, animaciones, demos ni bloques de diseño.

El fragmento compartido observado pasa de **110.213 a 38.046 bytes sin comprimir**: 72.167 bytes menos, un 65,5 % de ese archivo. No es una reducción del 65,5 % de toda la web.

Una muestra anterior por página, conservada en `.quality/lighthouse-baseline/`, daba 83/100 en ambas, LCP de 3,72/3,28 s y TBT de 300/362 ms. Las mediciones actuales son mejores, pero la referencia anterior solo tiene una ejecución y condiciones de carga del equipo distintas. No se atribuye toda la diferencia al cambio de import ni se presenta como un experimento causal controlado.

## Auditoría de las 50 URL

`npm run unlighthouse` terminó en 463 segundos, con 50 rutas y ningún error de ejecución. Unlighthouse 0.18.0 usó Lighthouse 13.4.1; se desactivaron descubrimiento por sitemap/robots y rastreo de enlaces para no salir del servidor local.

- SEO técnico: 100 en las 50 rutas.
- Buenas prácticas: 100 en las 50 rutas.
- Accesibilidad: 100 en 45 rutas; 96 en las cinco capacidades por el mismo contraste de un número sobre fondo azul claro.
- Se cumplieron los umbrales configurados: accesibilidad/buenas prácticas ≥95 y SEO 100. Esto no sustituye leer los hallazgos ni garantiza posicionamiento.

El contraste era 4,48:1, por debajo de 4,5:1. Se oscureció exclusivamente `.card-blue .number`, de `#087b98` a `#06657d`; se mantienen la paleta general, dimensiones, tipografía y movimiento. Tras recompilar, una nueva auditoría Lighthouse de cada una de las cinco capacidades da **100 en accesibilidad, buenas prácticas y SEO**; rendimiento 96 en las cinco (una muestra por página, no un benchmark repetido).

El crawl completo se conserva en `.unlighthouse/ci-result.json` y `.unlighthouse/reports/`. Se hizo **sin ralentización simulada**, por lo que sus puntuaciones de rendimiento no se mezclan con la tabla móvil anterior. La corrección se verificó de forma dirigida; no se afirma que el crawl inicial ya tuviera 100 de accesibilidad en todas las rutas.

La pasada dirigida también comprobó GovTech, EXIST y una guía: rendimiento 96, 96 y 95, respectivamente, y 100 en las otras tres categorías. Son ocho muestras en total contando las cinco capacidades, sin errores; informes en `.quality/lighthouse-local/2026-08-28T16-11-43.435Z/`. No se presentan como tres repeticiones de cada plantilla.

## Lo que aún señalan las mediciones

1. El elemento LCP de la portada es el párrafo introductorio. La auditoría atribuye la mayor parte del tiempo a retraso de pintado; conviene investigar la ruta de renderizado y las tareas principales con una traza antes de tocar tipografías o interacciones.
2. La portada tiene oportunidades de tamaño/formato de imagen. El sello INCIBE se conserva sin transformación porque las condiciones de uso y el tamaño responsive siguen pendientes de confirmación. No se reduce o altera para mejorar una nota a costa de sus condiciones.
3. Quedan JavaScript sin utilizar y tareas de hidratación. El siguiente cambio debe justificarse con la traza y mantener la cinta de empresas, figuras 3D y nueve demos.
4. El servidor de pruebas no incluye latencia de alojamiento real, CDN ni analítica activa. Una nota de SEO no mide relevancia, enlaces, indexación, citas en respuestas generativas o demanda.

## Reproducción y fallo de herramienta

`npm run lighthouse` mantiene el flujo Lighthouse CI preparado para CI. En este Windows, el intento de esa ruta falló al cerrar el perfil temporal de Chrome (`EPERM`) y mostró un aviso de arranque del servidor. **Ese intento no se cuenta como medición válida.** No se ha probado el workflow remoto.

La alternativa `npm run lighthouse:local` audita un servidor local ya activo, crea sus propios perfiles aislados y guarda el resultado antes de cerrar cada navegador. No modifica ni borra el perfil personal. Instalación opcional del runtime, fuera de las dependencias de la web:

```sh
npm install --prefix .quality/lighthouse --no-save lighthouse@12.6.1
npm run quality
npm start -- --hostname 127.0.0.1
```

En otra terminal, sin builds ni pruebas paralelas:

```sh
npm run lighthouse:local -- --routes=/,/diagnostico --runs=3
npm run unlighthouse
```

El script admite `LIGHTHOUSE_MODULE_DIR` para reutilizar una instalación existente y `LIGHTHOUSE_BASE_URL` únicamente en loopback. Los informes/modelos/binarios permanecen ignorados por Git. La ejecución de esta revisión reutilizó el Lighthouse 12.6.1 instalado por LHCI.

## Límites de lanzamiento

Verificación final de la continuación: `npm run quality` correcto (32 pruebas unitarias, lint, tipos, controles de contenido/SEO y build de 58 páginas). La batería completa pasa con **370 pruebas correctas y 10 omisiones previstas** en cinco anchuras; otra compilación aislada verifica 20 escenarios de envío simulado. Las 35 pruebas de consentimiento incluyen parada de SDK simulados, carga pendiente, otras pestañas, almacenamiento bloqueado y caducidad. No se presentan como una prueba de las cuentas de producción.

Revisión visual en Chrome: diagnóstico móvil y portada a 1440 px; tamaño temporal restablecido al terminar. Captura de la portada en `.quality/preview-home-desktop.png`. La cinta de empresas y las figuras siguen en el código original recuperado; no se han sustituido por elementos estáticos. `git diff --check` correcto.

Antes de publicar siguen pendientes proveedor aprobado/recepción real del formulario y validación legal. La primera exportación cuantitativa de Keyword Planner ya está completada; sus límites están en `SEARCH_INTELLIGENCE.md`. La retirada ya está implementada y probada localmente; falta comprobarla junto con enmascarado y eventos sobre la configuración definitiva. Después: pruebas en el dominio real, Search Console/Bing, datos de usuarios y citas generativas. No se han enviado sitemaps, IndexNow ni correos desde estas pruebas.
