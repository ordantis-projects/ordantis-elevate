# Reorientación editorial: I+D, machine learning y GovTech

## Decisión del propietario

Priorizar administraciones públicas, retos GovTech y empresas con proyectos de I+D en IA y datos. La empresa no se define como consultora generalista de digitalización, automatización, RAG o agentes. Se mantiene el diseño blanco, marino y cian, las flechas, la intro, las geometrías y la cinta de empresas.

## Cambios

- Portada: I+D en IA, modelos y datos; acceso a GovTech e investigación para empresas; guías destacadas de ML, datos públicos y evaluación.
- GovTech sustituye FAQ en el menú principal. FAQ sigue accesible desde la portada y el pie. Las páginas locales siguen fuera del menú.
- Capacidades: investigación, ML y datos primero; documentos y agentes permanecen como especialidades secundarias en sus URL originales. No se borran artículos.
- Servicios: se mantienen los 12 IDs y las nueve demos. Viabilidad experimental sustituye madurez digital; transferencia sustituye talleres generalistas. Las demos se muestran después del alcance y los entregables y se identifican como didácticas.
- GovTech: predicción y planificación, integración territorial, preparación del reto, condiciones de evaluación y transferencia. No se atribuyen adjudicaciones ni resultados de propuestas.
- Diagnóstico: cinco entradas de I+D/modelado/datos/GovTech/integración. Continúan tres preguntas y email al final. Se retiran facturación, tamaño y madurez digital; se añaden tipo de organización y estado del proyecto. Todo lo seleccionado se conserva en el resumen; no se modifica el proveedor de envío.
- Empresa, FAQ y páginas locales alineadas con el posicionamiento.
- Markdown, llms.txt y descripción estructurada alineados; los endpoints técnicos siguen sin enlaces visibles en la interfaz.

## SEO y evidencia

No se cambian slugs ni se crean páginas por multiplicar términos. La exportación original de Keyword Planner y sus valores no se modifican: ya contiene grupos de investigación, predicción y GovTech. Cambia la prioridad editorial, no la demanda medida. Las próximas consultas a contrastar son desarrollo experimental en IA, desarrollo/evaluación de modelos ML, ingeniería de datos para administraciones e integración de modelos.

EXIST acredita su experimento concreto, no experiencia en cualquier administración ni resultados predictivos operativos. Forecasting Lab sigue identificado como pendiente; no se presenta una fórmula sintética como modelo entrenado. Una siguiente entrega de evidencia debe incluir datos autorizados, código reproducible, referencia, partición temporal y análisis de errores.

## Publicación

Este pase es local. No se publica en ordantis.com ni se actualiza Cloudflare, Access, DNS, Search Console o campañas. No se envían formularios reales en las pruebas.

## Continuación del 17 de septiembre

- El índice de guías deja de abrir con agentes. Prioriza evaluación experimental, ML, datos territoriales e integración; HTML, metadatos y Markdown consumen la misma introducción.
- Valencia enlaza ahora a validación temporal, confianza de sensores y evaluación multimodal. Las guías de agentes y RAG siguen existiendo.
- Los servicios incorporan aplicaciones públicas concretas: demanda por zona, mantenimiento con información disponible antes de decidir e integración de inventarios, geometrías y sensores. Son ejemplos de alcance, no casos realizados.
- La imagen de enlace compartido mantiene el diseño existente y actualiza su línea de especialidades a GovTech, machine learning e ingeniería de datos.
- No se cambian el formulario de envío, sus destinatarios, las flechas, el movimiento de logos ni las geometrías. Los 12 servicios y las nueve demos permanecen.

### Verificación y entorno

- `npm run quality`: 75 pruebas unitarias, controles editoriales, correspondencia SEO y compilación Next.js superados.
- `npm run build:vinext`: compilación local compatible con Cloudflare superada. El aviso de paquetes grandes permanece; no se oculta ajustando el umbral.
- `npm run test:delivery -- --workers=2 --output=.quality/diagnostic-e2e-results`: 35 pruebas superadas, con envío interceptado. No acredita la recepción de un correo real.
- `npm run test:cloudflare -- --output=.quality/cloudflare-e2e-results`: dos pruebas superadas; 55 URL comprobadas sin JavaScript y política de rastreo de la previsualización privada conservada.
- Revisión visual de portada, servicios, GovTech y guías a 390 y 1440 px: un H1, sin desbordamientos ni errores JavaScript. Las capturas quedan en `.quality/rd-final-*.png`.
- Se identificó una interferencia de pruebas: `defineConfig(base, override)` acumulaba ambos servidores en vez de reemplazar el primero. Las configuraciones específicas ahora extienden `base` mediante un objeto, manteniendo un único servidor. El proxy local de analítica reintenta únicamente conexiones reiniciadas (`ECONNRESET`); no se eliminan verificaciones de consentimiento ni se envía tráfico de analítica real.
- Pase final secuencial: `npm run quality` y `npm run test:e2e -- --workers=4 --max-failures=3` terminan con código 0. La batería de navegador registra 492 pruebas superadas y 18 omisiones previstas para comprobaciones que no se repiten en todos los tamaños; no quedan fallos. Incluye enlaces internos, HTML inicial, retirada de consentimiento, navegación, flechas, intro, cinta de empresas, geometrías y demos.
- El servidor auxiliar de Cloudflare se detuvo tras las pruebas. La previsualización del propietario continúa en `http://localhost:3005/`; no se ha realizado ningún despliegue.
