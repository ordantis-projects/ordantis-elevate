# Actualización de la previsualización privada

El propietario autoriza «súbelo al privado» tras añadir Personalizar. Se actualiza únicamente el alias staging de `ordantis-web-preview` en Ordantis Solutions, mediante la sesión existente de `fermago2005@gmail.com`.

- Enlace estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión: `367e0b62-aae8-4559-8160-796e478ef0bf`.
- Creación devuelta por Cloudflare (UTC): `2026-09-18T22:10:34.384Z`.
- Enlace de versión: https://367e0b62-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión anterior del alias documentada: `f5529f37-6f32-4d4c-ad83-2248951246e3`.

Incluye la personalización de cookies, el aviso revisado con la AEPD y la corrección del primer pintado de la intro. Detalles en `COOKIE_CUSTOMIZATION_2026-09-19.md`, `COOKIE_BANNER_AEPD_2026-09-18.md` y `BRAND_INTRO_FIRST_PAINT_2026-09-18.md`. No se cambia el código de aplicación en este pase de publicación.

## Compilación y controles

Se reutiliza la calidad del cambio local completado: `npm run quality` correcto, 85 pruebas unitarias y build de 71 rutas; 120 pruebas de navegador en cinco anchos, seguidas de 55 pruebas de aviso y analítica sobre el ajuste visual final, todas correctas. Se recompila vinext con `ORDANTIS_DEPLOYMENT=preview` explícito para preservar las cabeceras privadas.

`npm run test:cloudflare` supera las 13 pruebas de intro y rastreo en el runtime Workers local. Las 62 páginas tienen HTML sustancial, entidades y canonical coherentes; se verifican las reglas de noindex y robots privado. Además, cinco comprobaciones adicionales de personalización en Workers (320, 390, 768, 1024 y 1440 px) confirman analítica inicialmente desactivada, ausencia de consentimiento al cambiar la casilla, guardado explícito, reapertura y retirada. No se generan solicitudes a proveedores de analítica en este runtime local.

Subida de prueba correcta; activos cliente sin mapas de fuente, PDF internos, archivos de entorno ni directorios de informes. Se aplican las skills Cloudflare y Wrangler: comprobar cuenta y configuración, probar el runtime local y utilizar una versión con alias en lugar de activar un despliegue de producción. Se contrasta el mecanismo con la documentación oficial de [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/).

## Publicación y aislamiento

```sh
npx wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars --message 'Private staging: cookie customization with opt-in analytics, AEPD-reviewed notice and first-paint brand intro; production unchanged'
```

23 activos nuevos y 45 reutilizados; 4.184,73 KiB, 1.354,88 KiB gzip, arranque de 18 ms. `versions view` confirma modo preview, secretos `TURNSTILE_SECRET` y `DIAGNOSTIC_RECIPIENT` y bindings `DIAGNOSTIC_EMAIL` y `ASSETS`, sin imprimir valores secretos. Se conserva el envío desde `web@ordantis.com` al destinatario permitido `contacto@ordantis.com`.

Nueve recursos por hostname (portada, capacidades, diagnóstico, cookies, GovTech, robots, sitemap, llms y CSS), 18 respuestas en total, devuelven HTTP 302 al login de `black-scene-abc1.cloudflareaccess.com` sin autenticación. Access continúa protegiendo tanto staging como el enlace de versión. No se completa una sesión remota autenticada ni se envía un diagnóstico real.

`deployments list` antes y después conserva `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se ejecutan deploy, versions deploy, triggers deploy, push, IndexNow ni envío de sitemap. La web pública, DNS, Access, destinatarios y configuración de proveedores no se modifican. Se detiene el runtime de prueba en 8787; el servidor Next local en 3000 continúa disponible.
