# Revisión de privacidad, cookies y contacto — 30 de agosto de 2026

## Alcance comprobado

El inventario se ha obtenido del código, las cabeceras públicas de `ordantis.com`, el DNS del correo y la documentación vigente de los proveedores. No se ha deducido una cookie por el mero hecho de que exista una cuenta o una verificación DNS.

- Ordantis usa `localStorage` para la preferencia de analítica y `sessionStorage` para no duplicar una atribución AI Organic.
- GA4 y Clarity solo se solicitan en el dominio público después de aceptar analítica.
- GA4 se limita en el código a `_ga` y `_ga_<ID>`, 30 días y sin renovación por visita; señales y almacenamiento publicitarios están denegados.
- La política recoge las dos cookies propias y las cinco cookies de terceros que Microsoft documenta para Clarity.
- Cloudflare no devolvió `Set-Cookie` en una petición ordinaria. `__cf_bm` y `cf_clearance` se documentan como técnicas condicionales porque pueden aparecer al activar detección de bots o presentar un desafío.
- Brevo figura en DNS, pero no existe un script, formulario o cookie de Brevo en la aplicación.
- Web3Forms ha sido retirado. Solo el envío del diagnóstico utiliza el endpoint del propio dominio, Cloudflare Email Service y el buzón verificado de Redes Ordantis. Contacto no tiene formulario directo.
- Turnstile se carga solo al llegar al envío del diagnóstico. Se trata como seguridad estrictamente necesaria, se limita a los dominios autorizados y se documenta su tratamiento de señales técnicas; no depende del permiso de analítica.

## Criterios jurídicos aplicados

La [AEPD recomienda información por capas](https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/6-el-deber-de-informacion/FAQ-0217-que-informacion-debe-facilitarse-cuando-los-datos-se-obtengan-directamente-del-afectado): una primera capa en el punto de recogida y una segunda capa con base, destinatarios, transferencias, conservación y derechos. El [artículo 13 RGPD](https://eur-lex.europa.eu/legal-content/es/ALL/?uri=CELEX:32016R0679) exige esos elementos cuando los datos proceden de la persona.

La casilla del diagnóstico se formula como confirmación de lectura, no como consentimiento para responder. La base indicada es el artículo 6.1.b RGPD para medidas precontractuales solicitadas; el 6.1.f se reserva a otras consultas profesionales y describe el interés. No se usa una base múltiple indistinta.

La [guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf) exige que aceptar y rechazar se presenten a la vez y con visibilidad equivalente. Ambos botones usan ahora el mismo estilo. Como solo hay una finalidad no necesaria —analítica—, no se inventan categorías adicionales.

## Fuentes de proveedores

- [Cookies de GA4](https://support.google.com/analytics/answer/11397207?hl=es): `_ga` y `_ga_<container-id>`; el código de Ordantis reduce su duración predeterminada.
- [Cookies de Microsoft Clarity](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies) y [conservación](https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention).
- [Cookies técnicas de Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/) y [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).
- [Cloudflare Email Service](https://developers.cloudflare.com/email-service/) y [DPA de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/).
- [DPA de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).

## Bloqueos que siguen vigentes

1. El propietario ha facilitado la razón social `Ordantis Solutions S.L.` y el NIF `B23922552`; se muestran únicamente en información legal y de privacidad, no en contenido comercial.
2. El buzón final verificado pertenece a Redes Ordantis y utiliza Google. Falta cerrar el plazo interno de conservación en ese buzón.
3. Confirmar en las cuentas la retención efectiva de GA4 y el enmascarado/retención de Clarity.
4. Ejecutar un escaneo en navegador limpio sobre la preview pública y producción, antes y después de aceptar y después de retirar.
5. Turnstile está creado y validado localmente. Antes de publicar falta guardar sus secretos en el Worker de producción, comprobar el rechazo de repetición en una preview y repetir el inventario efectivo de almacenamiento.

La revisión técnica reduce errores y afirma solo lo comprobado. No sustituye asesoramiento jurídico adaptado a los tratamientos reales de la empresa.
