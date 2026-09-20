function mediaQuality(accept: string, mediaType: string) {
  const values = accept.split(",").map((part) => {
    const [type, ...parameters] = part.trim().split(";");
    const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const parsed = qualityParameter ? Number(qualityParameter.split("=")[1]) : 1;
    return { type: type.toLowerCase(), quality: Number.isFinite(parsed) ? parsed : 0 };
  });
  return Math.max(0, ...values.filter((item) => item.type === mediaType).map((item) => item.quality));
}

export function prefersMarkdown(accept: string | null) {
  if (!accept) return false;
  const markdown = mediaQuality(accept.toLowerCase(), "text/markdown");
  const html = Math.max(
    mediaQuality(accept.toLowerCase(), "text/html"),
    mediaQuality(accept.toLowerCase(), "application/xhtml+xml"),
  );
  return markdown > 0 && markdown > html;
}
