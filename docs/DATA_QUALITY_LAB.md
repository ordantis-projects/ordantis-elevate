# Data Quality Lab — demo local v1

Ruta: `/labs/calidad-datos`. Implementado en el repositorio; no desplegado.

## Qué permite

- Elegir entre dos conjuntos de observaciones sintéticas.
- Ajustar máximo numérico y antigüedad respecto a un corte fijo.
- Ver cada fila original y cada regla incumplida.
- Descargar JSON con datos, contrato, versión del método y resultados.
- Leer método, datos iniciales y resultados también en HTML inicial y Markdown.

Con el contrato inicial, el primer escenario tiene ocho filas, siete afectadas y ocho incidencias. Dos filas comparten un identificador y ambas se marcan. Una fila puede fallar por unidad y por fecha. No se confunde el número de incidencias con el de filas afectadas.

## Límites

La demo no importa CSV ni datos reales, no se conecta a sensores y no usa IA. No evalúa calibración, representatividad o coherencia física. Pasar reglas no certifica una fuente. Los ejemplos son inventados y no se han extraído de propuestas privadas.

Se ha mantenido el alcance pequeño para que el código y los resultados se puedan comprobar. La versión ampliada del plan —fuentes públicas reales, contratos propios, informe exportable y distribución en GitHub/Hugging Face— sigue pendiente.

## Fuentes de código

- `content/labs.ts`: contenido, escenarios y contrato inicial.
- `lib/data-quality.ts`: reglas deterministas y validación estricta de fechas UTC.
- `components/data-quality-lab.tsx`: controles y descarga local.
- `app/labs/calidad-datos/page.tsx`: metadata, schema y contenido del método.
- `lib/markdown.ts`: representación sin interfaz de la misma muestra y método.
- `tests/data-quality.test.ts` y `tests/e2e/lab.spec.ts`: casos límite y flujo de uso.

Los tests comprueban fechas imposibles, extremos inclusivos, cero frente a ausencia, unidades incompatibles, no mutación del original, inputs inválidos, descarga JSON y ausencia de llamadas de analítica en localhost.
