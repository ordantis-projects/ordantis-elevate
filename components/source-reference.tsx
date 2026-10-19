type Source = { url: string; label: string };

export function SourceReference({ source }: { source: Source }) {
  return <a href={source.url}>{source.label}</a>;
}
