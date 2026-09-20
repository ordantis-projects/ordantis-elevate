# Recuperación del original y combinación con SEO/GEO — 28 de agosto

## Criterio

La revisión anterior había recuperado la paleta y parte de la composición, pero dejó estática la cinta de empresas y sustituyó las figuras 3D. También faltaban demos y contenido del original. Esta revisión corrige esas pérdidas tomando como referencia el commit `2b9eaa6`.

Se conserva la arquitectura Next.js y el contenido nuevo. No se ha hecho reset, push, despliegue ni envío de sitemap. Tampoco se han publicado perfiles de equipo.

## Correspondencia comprobada

| Elemento original | Estado local |
| --- | --- |
| Hero, flechas, tipografía, blanco/marino/cian y botones rectangulares | Conservados. El texto explica I+D aplicada y se mantienen ajustes de contraste. |
| Tres bloques de ventajas | Recuperada la composición. Los textos explican productividad, operación e investigación sin porcentajes de ahorro inventados. |
| Banda de cifras | Recuperada la composición de tres columnas con resultados concretos de EXIST; se mantiene también el cuarto resultado y el enlace a la evidencia. |
| Metodología oscura | Cuatro fases, detalles, puntos de trabajo, cierre y enlaces a cada servicio. Se añaden entregables y preguntas de control. |
| Figuras giratorias | Recuperado el componente 3D: geometrías, materiales, luces y velocidades originales. Se muestran desde 1536 px, como en el original. Se cargan al entrar en pantalla y se detienen fuera de ella o con movimiento reducido. |
| Empresas en movimiento | Cinta continua de 40 segundos con Artecoin, Indiva, Odeon y Cofriman. Dos grupos idénticos cierran el ciclo; duplicados fuera del árbol accesible. Pausa por botón o al pasar el puntero; alternativa estática con movimiento reducido. |
| Servicios | Los doce servicios y sus anclas permanecen. Vuelven descripción, componentes, ejemplos de aplicación, demos y botón de cierre. Se conservan aceptación, límites y enlaces a las cinco capacidades nuevas. |
| Documentos | Recuperadas ambas vertientes: extracción y composición de informes, propuestas y borradores mediante fuentes, plantillas y reglas de revisión. |
| Empresa | Misión, visión, valores y cuadrícula de seis programas/reconocimientos, junto al contenido nuevo de evidencia y capacidades. INCIBE Emprende y DesafIA permanecen. |
| FAQ | `/faq` vuelve a ser una página, no una redirección a artículos. Ocho dudas comerciales, acordeones numerados, canonical, FAQPage, Markdown y sitemap. Las treinta guías técnicas siguen en `/insights`. |
| Diagnóstico | Recuperados perfil, plantilla, facturación, madurez, selección múltiple de infraestructura y contacto, como campos opcionales junto a las preguntas nuevas. Las selecciones sobreviven al retroceder. |
| Entrada al hacer scroll | Recuperado el desplazamiento de 40 px en 1 segundo. El HTML permanece visible si no se carga JavaScript; se respeta movimiento reducido. |
| Cabecera y pie | Se conservan el estilo original y los accesos nuevos. FAQ vuelve a la navegación; guías técnicas siguen enlazadas desde Home, FAQ y pie. |

## Las nueve demos recuperadas

Se ha portado el archivo original de demos, conservando sus interfaces y controles. Tailwind 3 compila solo esas clases dentro de `.service-demo`, sin aplicar su reset al sitio. Las demos se cargan cuando se abre la ficha, no al visitar la portada.

| Demo | Conservado y corregido |
| --- | --- |
| Demanda | Gráfica y tres controles. La fórmula se identifica como escenario sintético, no como modelo entrenado. |
| Asignación | Dos repartos originales y barras. Se explicita que son prefijados; el cociente retorno/inversión se expresa como ratio, no como ROI neto ni resultado de un solver. |
| BI | Áreas, periodos, KPIs, curva, composición y tabla. Cifras sintéticas; el periodo modifica la curva, no los indicadores fijos. Leyendas y tarjetas se adaptan al ancho disponible. |
| Agente | Plan, pasos y traza de onboarding. Requiere una aprobación didáctica. No crea cuentas, envía correos, concede permisos ni firma contratos. Los temporizadores se cancelan al cerrar. |
| Documentos | Fuentes, condiciones y vista previa. Se eliminan tiempos y páginas supuestamente generadas; no se afirma haber creado un contrato completo. |
| RAG | Consulta y pasos sobre una política ficticia. Puede retirarse la fuente para observar abstención. Los hoteles y precios son ficticios; no hay búsqueda web. |
| Gobernanza | Selección de roles, matriz y flujo. «Enmascarado» no se presenta como anonimización. No se afirma latencia medida ni configuración de permisos reales. |
| Infraestructura | Diagrama de fuentes, orquestación y salida. Se elimina «cero errores». |
| Visión | Escenas, selección de figuras, barrido y recuento. Se retiran porcentajes aleatorios de confianza: se comparan etiquetas conocidas, no se ejecuta un detector. |

Las demos son ilustraciones de interfaz. No sustituyen al nuevo Data Quality Lab ni a los benchmarks y Labs pendientes del Plan Maestro.

## Contenido, privacidad y SEO

- Se preservan las cinco capacidades, treinta guías, sus ejemplos y las cuatro decisiones experimentales de EXIST.
- Descripciones, componentes, ejemplos, metodología, reconocimientos, FAQ y campos del diagnóstico se comparten con Markdown. No se reserva información distinta para bots.
- `content/page-updates.ts` avanza las fechas de las páginas realmente modificadas. Las guías y research conservan sus fechas propias.
- El diagnóstico sigue siendo local. No se reactiva Web3Forms ni se afirma que se haya recibido una solicitud. Abrir un borrador y enviarlo son acciones distintas.
- Las respuestas no se incluyen en analítica, almacenamiento, atributos de enlace ni URL de navegación. El panel sigue enmascarado para Clarity; la validación real de ese enmascarado queda para el lanzamiento.
- Las propuestas privadas no se convierten en clientes, adjudicaciones ni resultados. Los ejemplos de servicios se rotulan como orientativos.

Las guías de Next.js y React han influido en la carga diferida de WebGL y demos, los límites cliente/servidor y la limpieza de efectos. La revisión de navegador comprueba la aplicación real además del build.

## Verificación de esta revisión

- `npm run quality`: correcto; 21 tests unitarios, lint y tipos, control editorial en 61 archivos, comparación de 435 pares, auditoría SEO/GEO y build de 57 páginas.
- 49 rutas indexables, incluida la FAQ recuperada.
- Pruebas específicas de movimiento: correctas en 320, 390, 768, 1024 y 1440 px.
- Demos, enlaces a fichas, campos originales y WebGL comprobados. En móvil se corrigió una leyenda demasiado comprimida y el reparto de espacio de los indicadores del panel.
- Chrome: portada, controles de la cinta, BI en escritorio y 320 px, Empresa a 390 px, FAQ con respuesta abierta a 768 px y metodología con WebGL a 1600 px. Sin desbordamiento horizontal en las vistas comprobadas; los tests de las 49 rutas no registran errores de consola.
- Pase completo sobre producción local: **320 pruebas correctas y 10 omisiones previstas**, en 2,4 minutos. Las omisiones corresponden a dos menús móviles ocultos en escritorio, cuatro repeticiones del crawler y cuatro repeticiones de la comprobación WebGL de 1600 px. No hay fallos.
- `git diff --check`: correcto. Las pruebas locales no sustituyen la revisión en dispositivos físicos, la indexación ni las métricas de producción.

## Pendientes que no se deben ocultar

La recuperación no equivale a haber acabado todo el Plan Maestro. Siguen pendientes la investigación cuantitativa de keywords, los Labs con datasets y evaluaciones reales, parte del gate editorial externo, la revisión legal y el trabajo de publicación/distribución.

Se mantiene la condición ya documentada del sello INCIBE: el archivo está intacto y enlaza al programa, pero antes de publicar debe confirmarse la interpretación de su restricción de tamaño en un diseño responsive.

Los programas y relaciones empresariales proceden del original y de los activos aportados. No se les atribuyen certificaciones, resultados técnicos ni nuevas relaciones comerciales. La revisión de fuentes externas y vigencia de todas las acreditaciones forma parte del control previo al lanzamiento.

Referencias técnicas: [React Three Fiber](https://github.com/pmndrs/react-three-fiber) y [configuración acotada de Tailwind 3](https://v3.tailwindcss.com/docs/configuration).
