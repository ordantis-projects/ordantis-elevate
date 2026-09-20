# Personalización de cookies

El propietario solicita añadir «Personalizar» al aviso revisado con la AEPD. Complementa `COOKIE_BANNER_AEPD_2026-09-18.md`; no sustituye los botones directos de aceptación y rechazo.

## Comportamiento

- Primera capa: Rechazar cookies y Aceptar cookies mantienen el mismo tamaño y estilo. Personalizar ocupa una fila propia.
- Panel: tecnologías necesarias siempre activas; la única categoría opcional es Analítica, que agrupa Google Analytics y Microsoft Clarity por finalidad. No se añaden publicidad ni proveedores nuevos.
- Primera visita: analítica desactivada. Reapertura: refleja el consentimiento vigente, no un valor premarcado para visitantes nuevos.
- Abrir el panel o cambiar la casilla no almacena ni comunica consentimiento. Solo Guardar preferencias, Aceptar cookies o Rechazar cookies aplican la decisión.
- Volver y Escape regresan a la primera capa sin guardar; el foco vuelve a Personalizar. El aviso no desaparece por navegación o por cerrar la selección.
- Se reutiliza el almacenamiento y el evento de consentimiento existentes. Retirar permiso por Guardar preferencias detiene la analítica y recarga cuando los SDK estaban activos, igual que el rechazo directo.
- La selección recibe foco y el panel permite desplazamiento interno en pantallas bajas. Se conserva la estética blanca, marino y rectangular. La descripción inicial se abrevia en la selección para evitar duplicaciones en móvil.
- Política actualizada con instrucciones de Personalizar y Guardar preferencias; fecha editorial de `/cookies` avanzada al 19 de septiembre. Inventario histórico, alcance del consentimiento y versión del almacenamiento sin cambios.

## Implementación y alcance

Aplicada la skill Next.js (`nextjs/SKILL.md`, referencia de límites RSC y documentación instalada de `use client`): la interacción queda en el componente cliente existente, sin importar el corpus editorial ni añadir una biblioteca de consentimiento.

Los tests de analítica usan un origen de producción simulado servido por localhost y proveedores interceptados. No envían datos a Google o Microsoft. Cambios locales: no publicación, modificación de Access, cuentas, DNS, secretos, destinatarios o proveedores. No constituye una certificación jurídica ni una auditoría de contratos y ajustes externos.

## Verificación

`npm run quality` superado después del ajuste visual final: lint, tipos, 85 pruebas unitarias, controles editoriales en 86 archivos, 12 artefactos SEO/GEO y nueve invariantes, exportación y build de 71 rutas.

Primer pase: 120 pruebas de navegador correctas en cinco anchos (320, 390, 768, 1024 y 1440 px), incluyendo aviso, personalización, analítica, intro e interfaz pública. La inspección de la captura de 320 px motivó abreviar la descripción en la selección. Tras reconstruir y reiniciar el servidor, segundo pase de las 55 pruebas de aviso y analítica, todas correctas. Capturas finales de móvil y escritorio revisadas visualmente; controles principales de al menos 44 px y sin desbordamiento horizontal.

Se comprueba selección inicial desactivada, ausencia de consentimiento al cambiar la casilla, foco al abrir y volver con Escape, guardado de rechazo y aceptación, persistencia tras recarga, reapertura con la elección vigente y retirada efectiva con SDK simulados. Capturas: `.quality/cookies-personalizar-mobile-320.png` y `.quality/cookies-personalizar-desktop.png`. El servidor local queda sirviendo la versión actual en el puerto 3000; no se publica en Cloudflare.

Publicación posterior autorizada por el propietario: subida únicamente al alias privado staging, versión `367e0b62-aae8-4559-8160-796e478ef0bf`, con Access conservado. Registro en `PRIVATE_PREVIEW_2026-09-19.md`; no se publica en el dominio principal.
