// SVG keeps the same thin arrow on browsers that render ↗ as an emoji.
export function DiagonalArrow() {
  return <svg className="diagonal-arrow" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}
