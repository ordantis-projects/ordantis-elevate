"use client";

export function DisclosureClose({ label }: { label: string }) {
  return <button className="disclosure-close" type="button" onClick={(event) => {
    const details = event.currentTarget.closest("details");
    if (details) { details.open = false; details.querySelector("summary")?.focus(); }
  }}>{label} <span aria-hidden="true">×</span></button>;
}
