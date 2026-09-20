# Intro antes de la web — 18 de septiembre de 2026

El propietario detecta que la portada aparece antes de la animación. El arranque original utilizaba `useEffect` y `requestAnimationFrame`: se abría el diálogo después del primer pintado de HTML. Cambiarlo solo a `useLayoutEffect` no cubriría el tiempo de descarga del JavaScript.

## Corrección

- Un script local pequeño y síncrono en el head activa la bienvenida durante el análisis del HTML, solo al entrar en la portada sin ancla, sin movimiento reducido y fuera de una navegación de historial. No añade almacenamiento ni solicitudes externas.
- La intro y su animación CSS siguen renderizadas en servidor. La cobertura blanca impide mostrar una cabecera llegada por streaming antes del marcado de la intro. Se mantienen los SVG originales, la secuencia de 2,2 segundos y el desvanecimiento final.
- La hidratación adopta la animación ya iniciada y su tiempo restante, sin volver a reproducirla. Si llega después de haberse liberado la web, no abre una intro tardía.
- Saltar y Escape funcionan también antes de hidratar. El arranque tiene una salida de seguridad independiente de React a los cinco segundos; la animación se vuelve invisible al terminar incluso si fallan los módulos. Los escuchadores temporales se retiran al finalizar.
- Se mantiene el diálogo modal y su foco cuando el código interactivo está disponible, con devolución del foco y posición inicial. El cambio a movimiento reducido cierra la intro, y no se repite en navegación interna.
- Sin JavaScript se accede directamente al HTML y los enlaces. No se cambian contenido, H1, metadatos, consentimiento, fechas editoriales ni identidad visual. Este ajuste no se presenta como una mejora de SEO o de LCP: la intro conserva una espera visual opcional.

Se sigue la guía instalada de Next.js `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`, que prescribe un script síncrono para corregir el primer pintado. Se usa esa técnica específica en lugar de poner el arranque en la cola interactiva de scripts. `suppressHydrationWarning` queda limitado al html cuyo atributo temporal gestiona el script. La revisión React conserva referencias, temporizadores cancelables y separación servidor/cliente, sin nueva biblioteca de animación.

## Verificación

- `npm run quality` correcto: lint, tipos, 84 pruebas unitarias, 86 archivos de contenido, 12 artefactos SEO/GEO y nueve invariantes; build de 71 rutas.
- Nuevo pase de lint y tipos tras ampliar los tests y la configuración de Cloudflare: correcto.
- Pase conjunto de intro, interfaz pública y rastreo: 62 pruebas correctas y ocho omisiones previstas de rastreo en proyectos no desktop, en cinco anchos (320, 390, 768, 1024 y 1440 px).
- Diez comprobaciones adicionales correctas en esos cinco anchos: los eventos del primer pintado no muestran la web por delante incluso con los módulos bloqueados; una hidratación retrasada más allá de la salida de seguridad no reabre la intro.
- Compilación vinext explícita en modo preview correcta. `npm run test:cloudflare` incluye ahora intro y rastreo: 13 pruebas correctas en el runtime local de Workers, manteniendo noindex y `Disallow: /` de la privada.
- Inspección visual de los fotogramas móviles antes de hidratar y del logotipo completo en escritorio: fondo blanco, flecha y marca originales, sin cabecera ni portada por delante.
- Se ajustan los selectores de retorno a inicio para distinguir el logo de cabecera del nuevo enlace de marca en el pie.

Cambio local preparado y probado. No se actualiza el alias remoto privado, la web pública, DNS, Access, secretos ni correo en este pase; requiere una nueva petición de subida.
