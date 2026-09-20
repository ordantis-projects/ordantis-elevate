# Auditoría del contenido original — 30 de agosto de 2026

## Contenido conservado o recuperado

La comparación se ha realizado contra los componentes originales de `HEAD:src/pages` y la versión actual. Permanecen visibles y comprobados:

- Hero, identidad visual, movimiento de flechas y carrusel continuo de empresas.
- Las cuatro fases: Estrategia, Preparación, Implementación y Capacitación, con sus puntos de detalle.
- Los 12 servicios originales, ahora con descripción, componentes, entregables, casos de uso y límites explícitos.
- Las nueve demos originales y las ocho preguntas frecuentes de negocio.
- Misión, visión, valores y ámbitos de trabajo de la página Empresa.
- Artecoin, Indiva, Odeon y Cofriman en el bloque de empresas.
- StartUPV, Start.inf, Sherpa, Talento Joven, Cátedra HP e INCIBE, además de la referencia a DesafIA.
- El diagnóstico guiado y sus campos de contexto, infraestructura y contacto.
- Correo de contacto, políticas y gestión de cookies.

Las pruebas `tests/design-content.test.ts` y `tests/e2e/restored-design.spec.ts` mantienen estas invariantes para evitar que una ampliación SEO vuelva a sustituir el contenido y diseño de partida.

## Omisiones deliberadas que no deben restaurarse tal como estaban

- `85 %`, `7/10`, mejoras de productividad del `5–6 %` y reducciones del `30 %` o `20 %`: el original no enlazaba la fuente ni acotaba sector, muestra o fecha. Se sustituyeron por explicaciones verificables del trabajo; no deben reaparecer sin una fuente primaria y contexto.
- El listado genérico AWS, Google Cloud, Azure, OpenAI, Anthropic, Gemini, Oracle y Salesforce: nombrar proveedores no acredita experiencia ni una integración disponible. Los entornos se mencionan donde afectan al alcance. Solo conviene publicar marcas concretas que Ordantis pueda respaldar con capacidad real.
- Textos genéricos sobre categorías de cookies que la web no utiliza: se sustituyeron por el inventario efectivo de almacenamiento, GA4, Clarity y cookies técnicas condicionales.
- Envío Web3Forms: se retira por la decisión de privacidad y se reemplaza únicamente en Diagnóstico por el endpoint propio.
- Perfiles personales o sección de equipo: se mantienen fuera por instrucción expresa del propietario.

## Conclusión

No se ha detectado un bloque comercial original útil que esté accidentalmente ausente. La lista de tecnologías es el único candidato editorial pendiente, pero debe construirse a partir de integraciones y experiencia que Ordantis pueda verificar, no recuperarse como una enumeración de logos.
