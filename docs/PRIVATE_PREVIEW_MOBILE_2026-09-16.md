# Actualización privada: móvil y diagnóstico

El propietario confirma «sí, haz el cambio» para actualizar la misma previsualización privada. Se utiliza la cuenta Ordantis Solutions con la sesión de fermago2005@gmail.com.

- Worker: `ordantis-web-preview`.
- Alias: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Nueva versión: `c421c15b-dab3-4294-a2b7-378e1a5e6a89`.
- Versión anterior conservada: `20e514f1-ad3c-454b-9fe3-8754ff345d49`.
- Subida mediante `wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars`.
- Paquete validado con dry-run: 1328,61 KiB gzip; 22 archivos estáticos actualizados.

Incluye la experiencia móvil, CTA «Iniciar diagnóstico», formulario simplificado con todas las respuestas en el resumen, textos del destinatario corregidos y enlaces contextuales a Albacete y Valencia. La verificación local está registrada en `MOBILE_CONTACT_2026-09-16.md`: calidad completa, 492 pruebas de navegador y 35 pruebas de envío simuladas.

Tras la subida, portada, diagnóstico, Empresa, robots y el JavaScript nuevo del formulario devuelven HTTP 302 a Cloudflare Access sin autenticación. El despliegue activo sigue usando `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %. No se han modificado Access, DNS, tráfico de producción, secretos ni destinatarios; no se han enviado correos reales.

La comprobación remota confirma la subida y la protección. No se ha completado una sesión remota autenticada de navegador en este pase.
