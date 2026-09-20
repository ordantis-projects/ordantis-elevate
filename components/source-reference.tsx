type Source = { url: string; label: string };

export function SourceReference({ source }: { source: Source }) {
  const url = new URL(source.url);
  const isOrdantisRepository = url.hostname === "github.com"
    && /^\/cofrian\/exist2026-ordantis(?:\/|$)/i.test(url.pathname);

  // Decisión del propietario: conservar la atribución, sin acceso directo al
  // repositorio desde la interfaz. La fuente sigue en el inventario editorial.
  if (isOrdantisRepository) return <span>{source.label}</span>;
  return <a href={source.url}>{source.label}</a>;
}
