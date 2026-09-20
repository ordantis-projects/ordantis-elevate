# Retirada del consentimiento — 28 de agosto de 2026

Implementada y verificada localmente. No se ha publicado ni se han enviado eventos a las cuentas de Google/Microsoft. La prueba del dominio real y de sus ajustes de proveedor sigue siendo una comprobación de lanzamiento.

## Qué cambia

- Los scripts solo se solicitan en `ordantis.com` o `www.ordantis.com`, con ID válido y consentimiento vigente. Rechazo, dato corrupto o elección de hace más de 180 días no autorizan la carga.
- Al retirar el permiso, se activa `ga-disable`, se comunica la denegación a ambos proveedores y se solicita parar Clarity. Después se recarga el documento: desmontar un componente no termina el código que ya se ejecutó ni un script pendiente. El panel avisa para guardar un diagnóstico antes de retirar.
- Se borran las cookies de analítica reconocidas en los dominios propios y la marca de sesión de atribución AI Organic. No se borran cookies ajenas, la elección del usuario ni datos de otros servicios.
- La retirada se propaga por el evento `storage` a otras pestañas del mismo origen. Al recuperar visibilidad se vuelve a comprobar la elección. Si el almacenamiento está bloqueado, una elección en memoria permite rechazar o retirar sin que falle el botón.
- Los eventos propios comprueban el consentimiento al emitir. Los parámetros de URL, fragmentos y rutas del referrer no se añaden a ellos. GA solicita desactivar señales y personalización publicitaria; las cookies propias se configuran a 30 días sin renovación por visita.

## Evidencia

`tests/e2e/analytics-consent.spec.ts`: siete escenarios en cinco anchuras, **35 pruebas correctas**:

1. Antes de aceptar y después de rechazar, no se solicitan scripts ni eventos.
2. Con SDK cargados, aceptar → retirar → navegar detiene eventos, elimina solo sus cookies y permite aceptar de nuevo.
3. La retirada mientras ambos scripts siguen descargándose impide que arranquen después.
4. La segunda pestaña también deja de medir.
5. Almacenamiento bloqueado: la retirada sigue funcionando y una recarga vuelve a preguntar.
6. No se reutiliza una autorización caducada.
7. Una autorización que caduca mientras la página permanece abierta también detiene los SDK, sin esperar a que el usuario cambie de pestaña. El reloj de la prueba avanza artificialmente; no se espera 180 días.

La prueba simula el origen de producción pero sirve todo el contenido desde localhost. Los proveedores están simulados, incluidos latidos autónomos de medición: las peticiones externas se interceptan o bloquean. No prueba los ajustes privados de las cuentas ni todas las versiones futuras de sus SDK. Las pruebas unitarias cubren formato, fecha, caducidad y lista limitada de cookies.

## Límites que no se deben ocultar

Una web no puede borrar cookies pertenecientes a dominios de Google/Microsoft ni retirar datos ya recibidos. Tampoco se presenta la denegación de almacenamiento como garantía de que un SDK no envíe medición sin cookies. Antes del lanzamiento se deben comprobar red, cookies, retención, duplicados y enmascarado con la configuración definitiva.

Fuentes: [Google: controles de privacidad y ga-disable](https://developers.google.com/tag-platform/security/guides/privacy), [Clarity: Consent API v2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2), [API de Clarity en su código oficial](https://github.com/microsoft/clarity/blob/master/packages/clarity-js/src/clarity.ts), [AEPD: opciones de aceptación y rechazo](https://www.aepd.es/preguntas-frecuentes/17-internet-y-redes-sociales/FAQ-1707-importancia-de-las-cookies-en-la-proteccion-de-datos).
