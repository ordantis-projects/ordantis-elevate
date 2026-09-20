# Recuperación del diseño original de Ordantis

> Estado histórico del 27 de agosto. La cinta estática, las geometrías SVG y las demos pendientes descritas aquí se han sustituido por la recuperación completa documentada en `RECUPERACION_DISENO_2026-08-28.md`.

Referencia: commit `2b9eaa6`, contrastado también con la web publicada antes de los cambios locales. La autorización del propietario es recuperar el diseño y completar contenido/SEO/GEO, sin publicar todavía.

## Qué se recupera

| Parte original | Versión local |
| --- | --- |
| Blanco, azul marino y cian; Inter y Space Grotesk | Recuperados como sistema global. Retirados beige, coral y lima. El cian de texto se oscurece donde hace falta legibilidad. |
| Portada «Rompe la barrera de entrada» | Recuperados composición, tamaños, gradiente, cuadrícula y las mismas flechas SVG de Git. El subtítulo explica I+D aplicada sin prometer ahorro ni resultados. |
| Cabecera transparente y botones rectangulares | Recuperados. Menú móvil, foco y navegación por teclado conservados. Research y Labs se integran sin cambiar la marca. |
| Metodología oscura, cuatro fases y desplegables | Recuperadas Estrategia, Preparación, Implementación y Capacitación. Cada fase añade entrega y pregunta de control. |
| Doce servicios por fases | Recuperados en `/capacidades`, con los identificadores originales y correspondencia a las cinco capacidades detalladas. |
| Empresa con secciones amplias y valores | Recuperada la composición en columnas y la cuadrícula de valores. No hay perfiles personales de equipo. |
| Logos del ecosistema y de empresas | Recuperados desde los activos que ya estaban publicados. No se deducen nuevos casos, resultados o certificaciones. |
| FAQ numeradas | Ocho respuestas sobre inversión, datos, integración, agentes, privacidad, RAG, formación y research; enlaces a detalles existentes. |
| Diagnóstico | Recuperado como cuestionario de tres pasos. Conserva respuestas al retroceder y prepara un resumen. No envía formularios a un proveedor no configurado. |
| Pie oscuro | Recuperado, manteniendo contacto, privacidad, preferencias de cookies y acceso a contenidos. |

No es una reversión del repositorio: se conserva Next.js y el trabajo editorial/técnico. Tampoco es una copia literal de todas las animaciones. Las cuatro geometrías se dibujan en SVG en vez de cargar WebGL; la fila de empresas es estática y las flechas respetan movimiento reducido. Los desplegables nativos mantienen su contenido en el HTML inicial.

## Contenido y SEO que se conservan o amplían

- Cinco capacidades detalladas, treinta guías y sus ejemplos didácticos, cuatro análisis derivados de EXIST y su ficha de investigación.
- Doce servicios con entregables y límites; vuelven a aparecer explícitamente infraestructura, BI, optimización, visión y formación.
- Índice de preguntas agrupado por capacidad con enlaces de sección. No se crean artículos casi iguales para aparentar cobertura.
- HTML inicial, metadata, canonical, schema, sitemap, negociación Markdown, llms.txt y llms-full.
- Home y Empresa incorporan al Markdown la metodología, FAQ, valores y referencias que antes solo aparecían en pantalla.
- `/services` sigue redirigiendo a `/capacidades`; sus anclas se conservan. `/assessment` pasa a `/diagnostico`.
- El diagnóstico no coloca sus respuestas en URL de la web, atributos de enlaces, almacenamiento o eventos de medición. El resumen y los controles llevan enmascarado de Clarity. Solo se genera el URI de correo al pulsar el botón; enviar el correo sigue siendo decisión del visitante.

Las guías de Next.js y React se han aplicado para separar las interacciones del contenido renderizado en servidor, mantener la hidratación estable y evitar librerías visuales pesadas en páginas de lectura.

## Qué no se ha vuelto a introducir

- Porcentajes de productividad, ahorro o adopción sin una fuente comprobada.
- «Transformación garantizada», promesas de retorno o seguridad absoluta.
- Posicionamiento como departamento externo, rechazado en el nuevo brief.
- Biografías personales, nombres de propuestas como clientes o resultados no ejecutados.

## Qué sigue pendiente del original

Los nueve módulos de demostración de `HEAD:src/components/demos/index.tsx` aún no están migrados. No estaban ausentes del original: se habían perdido en la migración previa. Data Quality Lab es una herramienta nueva, no sustituye por sí solo esas nueve piezas.

Antes de reintroducirlas deben distinguirse ilustración, cálculo real y modelo evaluado. Por ejemplo, la demo antigua de optimización alternaba dos asignaciones prefijadas mientras decía que las calculaba un solver; la de predicción utilizaba una fórmula sintética bajo el rótulo «Predicción IA». Se conservan recuperables en Git, pero no deben volver a presentarse como pruebas de rendimiento real. La siguiente ampliación local debe recuperar esas interacciones con su metodología explícita.

## Sello INCIBE: integridad y condición pendiente

Se han leído y revisado visualmente las dos páginas de `../logo incibe/Normas uso_sello_INCIBE_Emprende_ACELERACIÓN.pdf`. Exigen enlace a INCIBE, integridad y no presentarlo como certificación; también indican que no se altere su tamaño o contenido.

El PNG utilizado es idéntico al facilitado (SHA-256 `7A0F98F7A361B7E91903281F7E33831EF86AE70B6C4BA8C279DD9AB4B30447D0`). Se desactiva la transformación de imagen de Next.js para servir ese archivo intacto, sin recortes, recoloreado ni conversión. Se mantiene el enlace a INCIBE y el aviso sobre participación.

**Pendiente antes de publicar:** confirmar con INCIBE cómo aplicar la restricción de tamaño a la escala responsive, especialmente a la aparición pequeña en la banda de logos. El documento no fija dimensiones web ni autoriza de forma explícita esa reducción. No se afirma que la visualización local haya resuelto esa condición.

## Verificación

- Control local completo: lint, tipos, tests, revisión editorial, solapamiento léxico, auditoría SEO/GEO y compilación.
- Batería multipantalla en 320, 390, 768, 1024 y 1440 px, con rutas, enlaces, fragmentos, controles, diagnóstico y Lab.
- El primer pase detectó cuatro píxeles de desbordamiento en la portada a 320 px. Se corrigió el tamaño intrínseco del desplegable y su flecha; no se ocultó el desbordamiento de la página.
- Chrome: comparación de portada con el original publicado; revisión de móvil, Empresa, Servicios y metodología oscura en escritorio.

El resultado exacto de la última ejecución se registra en `IMPLEMENTATION_STATUS.md`. La publicación, los sitemaps y la medición con tráfico real siguen en pausa.
