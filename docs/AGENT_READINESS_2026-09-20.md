# Preparación para agentes — 20 de septiembre de 2026

## Objetivo

Facilitar que buscadores y asistentes descubran, lean y citen el contenido público de Ordantis sin presentar como existentes APIs, sistemas de autenticación o agentes que la web no ofrece.

## Cambios aplicados

- `robots.txt` declara `search=yes`, `ai-input=yes`, `ai-train=yes` y `use=full` tanto para los rastreadores nombrados como para el grupo general.
- Las rutas `/api/` continúan excluidas: son endpoints operativos del formulario, no contenido público.
- Las respuestas HTML y Markdown públicas incluyen la misma cabecera `Content-Signal`.
- Las respuestas HTML anuncian mediante `Link` la URL canónica, su alternativa Markdown, `llms.txt` y el sitemap.
- `llms.txt`, `llms-full.txt` y las representaciones Markdown publican tipo MIME y relaciones coherentes.

## Controles no implementados deliberadamente

- **API Catalog:** no existe una API pública de Ordantis. El endpoint de diagnóstico no debe presentarse como herramienta pública para agentes.
- **Auth.md, OAuth Discovery y OAuth Protected Resource:** no hay registro, inicio de sesión ni recursos protegidos para usuarios externos.
- **Skills Index y MCP Server Card:** la web no ejecuta un agente propio ni mantiene un servidor MCP. Una tarjeta sin servidor funcional sería engañosa.
- **Web Bot Auth y DNS-AID:** Ordantis no publica bots salientes propios.
- **WebMCP:** permanece fuera de producción mientras sea una función experimental y no exista una acción concreta que deba delegarse. El diagnóstico contiene datos personales y exige revisión humana; no se expone como herramienta automática.
- **Comercio:** la web no vende inventario ni procesa pagos.

Estos controles se revisarán si Ordantis publica un producto con API, un área autenticada o un agente operativo. La puntuación del diagnóstico de Cloudflare no sustituye esta condición funcional.
