# Actualización de la previsualización privada — 16 de septiembre de 2026

El propietario autoriza subir la versión local a la web privada de Cloudflare. Esta autorización no incluye publicar en `ordantis.com`, modificar DNS, activar tráfico de producción, hacer push ni enviar sitemaps.

## Resultado

- Cuenta: Ordantis Solutions; sesión de Wrangler comprobada como `fermago2005@gmail.com`.
- Worker existente: `ordantis-web-preview`.
- Dirección estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Nueva versión: `20e514f1-ad3c-454b-9fe3-8754ff345d49` (número 7).
- Versión previa de staging: `19308f76-ccfc-459e-a292-2bcfcc58d61c` (conservada en Cloudflare).
- Publicada únicamente mediante `wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars`, sin `versions deploy` ni cambios de triggers.

Incluye la intro de marca, el diseño original recuperado y refinado, y la retirada de enlaces visibles a los archivos técnicos y al repositorio Research. La sección Research, los endpoints técnicos y el resto de contenido se conservan.

## Privacidad y aislamiento

Se mantiene la aplicación de Cloudflare Access existente, sin editar políticas. Permite únicamente los correos ya autorizados: `fermago2005@gmail.com`, `redesordantis@gmail.com` y `scofrian@gmail.com`.

Después de la subida, tanto el alias staging como la URL de la versión nueva redirigen a Cloudflare Access (HTTP 302) al solicitar sin autenticación la portada, `/diagnostico`, `/robots.txt` y el archivo JavaScript de la intro. No se usa `noindex` como sustituto de autenticación.

El despliegue activo del Worker sigue siendo `24ee3c79-13d6-45e8-8f3e-69566df3068a`, con la versión `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. La lista de dominios personalizados permanece vacía. No se ha cambiado la web pública.

Los bindings de Turnstile, destinatario y envío de correo siguen presentes en la nueva versión. No se han expuesto ni sustituido secretos, ni enviado mensajes de prueba.

## Verificación

- Calidad completa del mismo código de aplicación: documentada en `PUBLIC_INTERFACE_2026-09-15.md`.
- Compilación fresca `npm run build:vinext`: correcta.
- `wrangler versions upload --dry-run`: correcto, 1.327,38 KiB gzip.
- Runtime local de Workers: portada con contenido, sin errores de JavaScript; inspección visual realizada.
- 70 pruebas E2E correctas en 320, 390, 768, 1024 y 1440 px: intro, teclado, movimiento reducido, conservación del diseño, navegación, diagnóstico sin envío y pie sin enlaces técnicos.
- Comprobaciones HTTP locales: portada y diagnóstico 200, ruta inexistente 404, llms y sitemap 200; sitemap con 55 URL. El robots de preview devuelve `Disallow: /` y cabecera `noindex`.
- La comprobación remota posterior verifica la versión subida, los bindings, el aislamiento respecto al despliegue activo y la protección de Access. No se ha completado una sesión autenticada remota ni un envío real del formulario en este pase.

Para revisar, abrir la dirección estable e iniciar sesión con uno de los correos autorizados. No es necesario activar un despliegue de producción.
