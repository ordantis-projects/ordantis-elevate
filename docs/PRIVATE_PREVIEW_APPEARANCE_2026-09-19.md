# Publicación privada de la apariencia automática

El propietario autoriza «subela» tras completar el modo claro/oscuro automático. Se actualiza únicamente la previsualización protegida existente, mediante la sesión Cloudflare de `fermago2005@gmail.com` en Ordantis Solutions.

- Enlace estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Nueva versión: `186b3659-7b45-4530-875b-43197224339e`.
- Creación devuelta por Cloudflare (UTC): `2026-09-18T23:35:16.680Z`.
- Enlace de versión: https://186b3659-ordantis-web-preview.ordantis-solutions.workers.dev/
- Anterior versión documentada del alias: `367e0b62-aae8-4559-8160-796e478ef0bf`.

Incluye la apariencia que sigue la configuración del dispositivo sin selector, cookies ni almacenamiento de tema. Mantiene diseño claro, flechas originales, personalización de cookies e intro desde el primer pintado. Implementación y calidad Next.js en `SYSTEM_APPEARANCE_2026-09-19.md`.

## Compilación y comprobaciones

Calidad local previa superada: `npm run quality`, 85 pruebas unitarias, build de 71 rutas y 55 pruebas finales de apariencia/diseño/experiencia móvil. Recompilación vinext con `ORDANTIS_DEPLOYMENT=preview` explícito y subida de prueba correctas. Los activos cliente no incluyen mapas de fuente, PDF internos, archivos de entorno ni carpetas de documentación, tests o informes.

El primer pase de pruebas generales sufrió la caída del servidor local Wrangler durante ejecución concurrente: cinco pruebas correctas y ocho fallidas por respuestas 500, pérdida de hidratación y conexión rechazada. No se publica con ese resultado. El pase aislado con dos workers supera las 13 pruebas de intro y rastreo, incluidas las 62 páginas con HTML sustancial, entidades y reglas privadas de indexación. Las 20 pruebas de apariencia en Workers superan los cinco anchos de 320, 390, 768, 1024 y 1440 px. Captura móvil final del runtime revisada visualmente.

Las skills Cloudflare y Wrangler orientan la publicación a una versión con alias, no a un despliegue activo. Mecanismo contrastado con la [documentación oficial de Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/).

```sh
npx wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars --message 'Private staging: automatic system light-dark appearance, original brand preserved, no theme selector; production unchanged'
```

25 activos nuevos, 43 reutilizados; 4.184,83 KiB, 1.354,92 KiB gzip y arranque de 15 ms. `versions view` confirma preview, secretos existentes por nombre y bindings de activos y email conservados. No se leen ni imprimen valores secretos.

## Aislamiento

18 comprobaciones anónimas: nueve recursos en staging y nueve en el hostname de versión, incluidos HTML, robots, sitemap, llms y CSS. Todos devuelven 302 al login de `black-scene-abc1.cloudflareaccess.com`. No se completa una sesión remota autenticada ni se envía un diagnóstico real.

`deployments list` antes y después conserva `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se ejecutan deploy, versions deploy, triggers deploy, push, IndexNow ni envío de sitemap. La web pública, DNS, políticas Access, destinatarios y proveedores no se modifican. Los runtimes locales de prueba se cierran; el servidor Next local en 3000 permanece disponible.
