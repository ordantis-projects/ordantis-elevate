# Publicación privada del 18 de septiembre de 2026

El propietario pide «publica a cloudflare privado». Se actualiza únicamente el alias staging existente de `ordantis-web-preview`, en Ordantis Solutions, con la sesión de `fermago2005@gmail.com`. No se modifica la web pública, DNS, Access, permisos ni secretos.

- Enlace estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión: `02a100ad-6699-447e-9a0f-65bac38c92d4`.
- Creación: `2026-09-18T10:14:16.169Z`.
- URL de versión: https://02a100ad-ordantis-web-preview.ordantis-solutions.workers.dev/
- Alias anterior documentado: versión `ba02b762-1b8e-442d-801b-c8f93ffee772`, conservada.

Incluye el estado local revisado del diseño y contenido, además de las mejoras descritas en [la revisión de rendimiento](PERFORMANCE_REVIEW_2026-09-18.md): fuentes originales locales con precarga y enlace de política de cookies con precarga solo por intención. Las mediciones Lighthouse de ese informe corresponden a Next local, no a esta versión remota en Workers.

## Compilación y controles

Se reutilizan los controles del pase local terminado antes de esta petición: `npm run quality` correcto (81 pruebas unitarias, lint, tipos, controles editoriales/SEO y build), 55 pruebas de navegador en cinco anchos y revisión visual de portada móvil y escritorio. No se cambia código de aplicación durante la publicación.

La primera prueba del runtime privado detecta cabeceras `X-Robots-Tag` ausentes en HTML. La causa es la compilación de `next.config.ts` sin `ORDANTIS_DEPLOYMENT=preview`; los bindings del runtime no regeneran las reglas de cabeceras fijadas al compilar. No se sube ese artefacto. Se recompila explícitamente para preview:

```powershell
$env:ORDANTIS_DEPLOYMENT = 'preview'
npm run build:vinext
```

El build termina correctamente y `npm run test:cloudflare` pasa sus dos pruebas: las 62 páginas ofrecen HTML sustancial, canonical y entidades coherentes sin JavaScript, con noindex en el runtime privado; robots devuelve `Disallow: /`, y Markdown/sitemap/llms siguen coherentes. La subida de prueba también termina correctamente: 4.177,79 KiB, 1.352,85 KiB gzip. La inspección de `dist/client` no encuentra mapas de fuente, PDF internos, archivos de entorno ni informes de QA.

## Subida e aislamiento

```sh
npx wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars --message 'Private staging: September 18 design and content refinements, local font preloading, intent-only cookie policy prefetch, verified preview indexing safeguards'
```

Cloudflare confirma la subida: 23 activos nuevos y 45 reutilizados; arranque de 16 ms. `versions view` confirma la versión y el modo preview, con `TURNSTILE_SECRET`, `DIAGNOSTIC_RECIPIENT`, `DIAGNOSTIC_EMAIL` y `ASSETS` conservados. No se imprimen valores secretos. Se mantienen remitente `web@ordantis.com` y destinatario permitido `contacto@ordantis.com`.

Se verifican sin autenticación ocho recursos en el alias estable y en la URL de versión: portada, capacidades, diagnóstico, GovTech, robots, sitemap, llms y la hoja CSS generada. Las 16 respuestas son HTTP 302 al login de `black-scene-abc1.cloudflareaccess.com`. La protección efectiva sigue siendo Access, no noindex.

`deployments list` antes y después conserva la versión activa `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se ejecuta `versions deploy`, `triggers deploy`, push, IndexNow ni envío de sitemap.

La verificación remota confirma versión y bloqueo anónimo. No se completa una sesión remota autenticada ni se envía un diagnóstico real. Para ver la web, utilizar el enlace estable e identificarse con un correo ya autorizado.

## Segunda actualización: grafo editorial y llms

El propietario autoriza «súbelo a la privada» tras revisar el nuevo grafo y `llms.txt`. Se actualiza únicamente el mismo alias staging, sin cambios de diseño, DNS, Access, secretos ni web pública.

- Versión de esta segunda actualización: `891469da-e037-43aa-aaa3-f229be86041e`.
- Creación: `2026-09-18T18:29:18.992Z`.
- URL de versión: https://891469da-ordantis-web-preview.ordantis-solutions.workers.dev/
- Incluye el mapa compartido `content/search-graph.ts` y el índice generado `lib/llms.ts`: ML, datos, planificación, I+D, operación de sistemas y GovTech; agentes y documentos permanecen como especialidades complementarias. Corrige la descripción del envío del diagnóstico.
- El grafo completo y su histórico permanecen documentados en `docs/SEARCH_INTELLIGENCE.md`; ese documento interno no se sube como activo público ni se añade un endpoint de grafo.

Se reutiliza `npm run quality` del cambio terminado: 84 pruebas unitarias, lint, tipos, controles editoriales/SEO y build correctos; dos pruebas de interfaz y 36 destinos Markdown del índice con HTTP 200 local. Se recompila con `ORDANTIS_DEPLOYMENT=preview`, pasan las dos pruebas de `npm run test:cloudflare` sobre las 62 páginas y las reglas de rastreo, y la subida de prueba termina correctamente. Los activos cliente no incluyen mapas de fuente, PDF, archivos de entorno ni directorios de QA.

Subida mediante `wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars`, sin `versions deploy` ni `triggers deploy`: 21 activos nuevos y 47 reutilizados, 4.179,47 KiB (1.353,56 KiB gzip), arranque de 19 ms. `versions view` confirma preview y conservación de los bindings de diagnóstico y Turnstile.

Se verifican ocho recursos tanto en staging como en la URL de versión: las 16 respuestas anónimas redirigen con HTTP 302 al login de Access. El despliegue activo permanece en `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se realiza comprobación remota autenticada ni envío de correo real.

## Tercera actualización: pie y presentación editorial

El propietario autoriza «súbelo a la privada». Se publica el nuevo pie adaptable a móvil y la retirada de fechas de revisión visibles y notas repetidas de las guías. Se mantienen las fechas técnicas reales, fuentes y ejemplos identificados como inventados, el grafo editorial y los índices llms existentes.

- Versión actual del alias staging: `f5529f37-6f32-4d4c-ad83-2248951246e3`.
- Creación: `2026-09-18T21:40:37.310Z`.
- URL de versión: https://f5529f37-ordantis-web-preview.ordantis-solutions.workers.dev/
- Detalles de los cambios y QA previo en [pie de página](FOOTER_REFINEMENT_2026-09-18.md) y [presentación editorial](EDITORIAL_PRESENTATION_2026-09-18.md).

Se reutiliza el pase local de `npm run quality` correcto (84 pruebas unitarias, lint, tipos, controles editoriales/SEO y build), las 50 pruebas de guías y las diez pruebas de interfaz del pie en cinco anchos. Se recompila explícitamente con `ORDANTIS_DEPLOYMENT=preview`; las dos pruebas de `npm run test:cloudflare` pasan sobre las 62 páginas y las reglas de rastreo. La subida de prueba pasa y `dist/client` no contiene mapas de fuente, PDF, archivos de entorno ni directorios de QA.

Se usa `wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars`: 22 activos nuevos y 46 reutilizados, 4.179,71 KiB (1.353,52 KiB gzip), arranque de 18 ms. `versions view` confirma la versión, preview y conservación de secretos y bindings del diagnóstico y Turnstile; no se imprimen secretos.

Se comprueban nueve recursos en cada hostname (portada, capacidades, diagnóstico, GovTech, guías, robots, sitemap, llms y CSS): las 18 respuestas anónimas son HTTP 302 al login de Access. El despliegue activo se conserva en `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se cambia la web pública, DNS, Access ni destinatarios; no se ejecuta `versions deploy`, `triggers deploy`, push, IndexNow ni envío de sitemap. No se realiza comprobación remota autenticada ni envío de correo real.
