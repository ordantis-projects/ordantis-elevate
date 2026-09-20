# Formularios: envío directo y comprobación

## Decisión técnica

Web3Forms se ha retirado. Solo Diagnóstico envía un `POST` JSON a `/api/diagnostic`, dentro de `ordantis.com`. El Route Handler valida y limita los campos, comprueba en servidor un token de Cloudflare Turnstile, no crea una base de datos y usa un binding `send_email` de Cloudflare para entregar el resumen al destino verificado de Redes Ordantis. Contacto abre la aplicación de correo de la persona y no tiene un segundo formulario.

El correo real de destino no forma parte del HTML ni del JavaScript del navegador. Se configura en producción como secreto de Worker `DIAGNOSTIC_RECIPIENT`. El binding limita el envío al remitente `web@ordantis.com` y al destino verificado `contacto@ordantis.com`. La regla de Email Routing de esa dirección entrega finalmente los mensajes en el buzón corporativo configurado por Ordantis.

Fuentes consultadas:

- [Enviar a direcciones verificadas con Email Routing](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/).
- [Workers API de Email Service](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).
- [Límites de Email Service](https://developers.cloudflare.com/email-service/platform/limits/).
- [Precios de Email Service](https://developers.cloudflare.com/email-service/platform/pricing/).

## Datos y controles

- Diagnóstico transmite únicamente el email y el resumen que la persona acaba de revisar.
- La lista de campos se reconstruye en servidor; cualquier propiedad adicional se descarta.
- El cuerpo máximo es 16 KiB. Se exige JSON, origen del propio dominio, email válido, longitudes máximas, confirmación de lectura y honeypot vacío.
- Un honeypot relleno recibe una respuesta neutra sin generar correo.
- Turnstile exige `success === true`, la acción `diagnostic` y un hostname permitido. El token tiene un máximo de 2.048 caracteres, se valida con un límite de diez segundos y cualquier error cierra el envío.
- Los mensajes se componen como texto plano. El email del visitante solo se usa como `Reply-To`, nunca como remitente.
- Los logs contienen identificador aleatorio, tipo y resultado. No contienen nombre, email ni contenido.
- No hay reintentos automáticos. HTTP 202 significa aceptación por el servicio, no entrega ni lectura.
- Clarity enmascara el diagnóstico y no se emite un evento de conversión con sus respuestas.

## Estado antes de publicar

El widget `Ordantis Diagnostic` se creó el 31 de agosto de 2026 para `localhost`, `127.0.0.1`, `ordantis.com` y `www.ordantis.com`. La clave pública, la clave privada, el modo y los cuatro dominios se contrastaron con la API; una comprobación de Siteverify confirmó la clave privada sin exponerla. El recorrido real local obtuvo un token de Turnstile y `/api/diagnostic` respondió 202. El binding local de Wrangler depositó el mensaje en su buzón simulado: esta prueba no acredita recepción en Gmail.

Para activarla con seguridad todavía hay que:

1. Guardar `TURNSTILE_SECRET` y la dirección verificada de Redes Ordantis como secretos del Worker de producción; `TURNSTILE_HOSTNAMES` debe contener solo `ordantis.com,www.ordantis.com`.
2. Revisar en Cloudflare el estado efectivo de Email Routing y sus registros DNS antes del despliegue.
3. En una preview autorizada, comprobar un envío con datos sintéticos, la recepción efectiva en Gmail y el rechazo al reutilizar el mismo token. La herramienta disponible no permitió conservar el token real para repetirlo en la prueba local.
4. Publicar únicamente cuando el propietario lo autorice.

Hasta completar los puntos anteriores no se debe desplegar el endpoint como formulario público operativo.

## Pruebas sin correo real

`tests/diagnostic-delivery.test.ts` verifica validación, lista permitida de campos, composición en texto plano, tratamiento de estados, acción y hostname de Turnstile y ausencia de reintentos.

`npm run test:delivery` intercepta `/api/diagnostic` en el navegador y sustituye el script de Turnstile por un doble controlado. Comprueba los cinco anchos del proyecto, validación nativa, bloqueo durante el envío, payload permitido, aceptación, 500, 429 y fallo de red. No transmite un correo real.
