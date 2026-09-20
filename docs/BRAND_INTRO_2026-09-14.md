# Intro de marca — 14 de septiembre de 2026

## Petición

Pantalla inicial breve con Ordantis y una flecha hacia la derecha que revele la palabra. Se añade como introducción independiente: no sustituye las flechas pequeñas animadas ni la composición recuperada de la portada.

## Implementación

- Fondo blanco, logotipo SVG original y flecha cian original, sin redibujar la identidad ni cargar vídeos o librerías de animación.
- Secuencia de 2,2 segundos: avance de la flecha, revelado de izquierda a derecha, pausa breve con el nombre completo y desvanecimiento a la portada.
- Botón «Saltar intro» de al menos 44 px y cierre con Escape. Diálogo nativo con foco modal y devolución del foco al cerrar. Se restaura la posición inicial para que el cierre no desplace la portada.
- Se presenta al cargar la portada desde arriba, no al entrar por una página interior, una ancla o el historial atrás/adelante. No vuelve a mostrarse durante la navegación interna; una nueva carga de la portada puede reproducirla de nuevo.
- Se omite con movimiento reducido. Si esa preferencia cambia durante la animación, se cierra. También se cierra al dejar de estar visible la pestaña o al abandonarla.
- La memoria de reproducción vive únicamente en el módulo JavaScript de esa carga: no añade cookies, sessionStorage, localStorage ni identificadores.
- La portada continúa renderizada en servidor. El diálogo nace cerrado y solo se abre después de la hidratación; sin JavaScript o sin soporte de diálogo se accede directamente al contenido. Un temporizador de seguridad lo cierra si no llega el evento final de animación.
  Esta descripción corresponde a la implementación inicial. El 18 de septiembre se sustituye el arranque posterior a hidratación por la cobertura del primer pintado descrita en [la corrección de arranque](BRAND_INTRO_FIRST_PAINT_2026-09-18.md).
- Se mantienen un H1, contenido, metadata, schema, enlaces, flechas del hero y preferencias de analítica. No se actualizan fechas editoriales por este cambio de presentación.

La intro añade una espera visual breve y opcional; no se presenta como una mejora de SEO ni de Core Web Vitals. Cualquier impacto de rendimiento debe medirse sobre el despliegue que finalmente se autorice.

Referencias técnicas: [diálogo nativo](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) y [preferencia de movimiento reducido](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion). También se han aplicado las guías locales de Next.js y React para aislar la interacción sin convertir el contenido de la página en renderizado cliente.

## Verificación

Las pruebas específicas están en `tests/e2e/brand-intro.spec.ts`: movimiento real, salida automática, teclado, Escape, cambio de preferencias, navegación interna, entrada directa, ausencia de JavaScript y fotogramas de escritorio/móvil. Se verifican también la precarga por intención, el diseño recuperado, los servicios, el diagnóstico y el consentimiento con proveedores simulados; no se envían correos ni visitas reales.

El 15 de septiembre se investigó la prueba que suponía una reproducción incondicional al recargar después de Escape. En 320 px Chromium recuperaba 20 px de desplazamiento antes de la hidratación, con el foco en `body`; el componente omitía la intro por su protección de la posición de lectura. Se separan las comprobaciones de Escape y cambio de movimiento reducido en entradas nuevas, y se añade una prueba expresa de conservación de una posición restaurada. No se elimina esa protección para forzar la animación.

Trabajo local, sin publicación ni cambios en Cloudflare o cuentas externas.

Cierre del 15 de septiembre: **40 pruebas de intro correctas** en 320, 390, 768, 1024 y 1440 px. Se han inspeccionado las capturas de los fotogramas de revelado y del logotipo completo en móvil y escritorio. Calidad completa, revisión de tipos y controles de navegación, consentimiento y SEO correctos según el pase detallado en `PUBLIC_INTERFACE_2026-09-15.md`.
