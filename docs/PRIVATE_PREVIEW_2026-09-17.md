# Publicación del contenido de I+D en la previsualización privada

El 17 de septiembre de 2026 el propietario solicita: «publícalo en la privada». Se actualiza únicamente el alias staging existente de Cloudflare, en la cuenta Ordantis Solutions y con la sesión de `fermago2005@gmail.com`.

## Versión publicada

- Worker: `ordantis-web-preview`.
- Dirección estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión nueva: `cb1a50eb-67f1-4d86-b007-1940768cc601`.
- Creación: `2026-09-17T13:08:34.513Z`.
- Dirección de versión: https://cb1a50eb-ordantis-web-preview.ordantis-solutions.workers.dev/
- Última versión de staging anterior: `10bfbfa0-a5f9-4a7e-b2b1-e6602935cd6c`, conservada en Cloudflare.
- Comando: `npx wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars --message 'Private staging: applied AI R&D, ML and GovTech content; five proposal-derived guides with confidentiality safeguards'`.

Incluye el posicionamiento de I+D, machine learning, sistemas de datos y GovTech, los cambios editoriales de portada y servicios y las cinco guías derivadas de propuestas, documentadas en `PROPOSAL_CONTENT_REVIEW_2026-09-17.md`. Los originales PDF, el directorio de extracción, secretos, archivos de revisión y source maps no se incorporan a los activos públicos. Se mantiene la identidad visual, las flechas SVG, la intro y los ajustes móviles y de diagnóstico ya aprobados.

## Verificación

- Los controles de código y editoriales del contenido están registrados en la revisión de propuestas: `npm run quality`, 78 pruebas unitarias y 43 pruebas de navegador superadas.
- Compilación fresca `npm run build:vinext`: correcta. Se mantiene el aviso existente de algunos paquetes de más de 500 kB; no se ha cambiado el umbral para ocultarlo.
- Configuración compilada comprobada antes de la subida: Worker privado, `ORDANTIS_DEPLOYMENT=preview`, sin rutas personalizadas, binding de correo y secretos requeridos correctos.
- `wrangler versions upload --dry-run`: correcto; 4.140,83 KiB de subida y 1.342,05 KiB gzip.
- `npm run test:cloudflare -- --workers=1 --output=.quality/cloudflare-private-2026-09-17`: dos pruebas superadas sobre el runtime local de Workers. Se comprueban las 60 páginas sin JavaScript, los metadatos, las entidades estructuradas y el bloqueo de rastreo del entorno privado.
- Subida remota correcta: 22 activos nuevos, 53 reutilizados; arranque del Worker de 15 ms según Cloudflare.
- `wrangler versions view` confirma la versión nueva y la conservación de `DIAGNOSTIC_RECIPIENT`, `TURNSTILE_SECRET`, `DIAGNOSTIC_EMAIL`, `ASSETS`, el sitekey y los hostnames de Turnstile. No se muestran ni sustituyen valores secretos.
- Solicitudes remotas sin autenticación a ambas direcciones: portada, `/govtech`, `/diagnostico`, una guía nueva, `/robots.txt`, `/llms.txt` y el JavaScript compilado de la intro devuelven HTTP 302 al login de `black-scene-abc1.cloudflareaccess.com`.

## Aislamiento

No se ejecutan `versions deploy`, `triggers deploy`, cambios de DNS, cambios de políticas de Access, push ni envíos a buscadores. El despliegue activo del Worker conserva la versión `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %, comprobada antes y después de la subida. La actualización de staging no cambia la web del dominio principal.

La protección existente de Access sigue vigente. Este pase verifica la subida y el acceso anónimo bloqueado; no completa una sesión remota autenticada ni envía un diagnóstico real. Para revisar el contenido, abrir el enlace estable e iniciar sesión con uno de los correos que ya están autorizados.
