import { ImageResponse } from "next/og";
import { homeIntro } from "@/content/home";

export const alt = `Ordantis — ${homeIntro.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#0e3963", background: "#ffffff", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
        <svg width="40" height="40" viewBox="0 0 40 40"><path d="M0 15 20 3 40 15V30L20 18 0 30Z" fill="#15a3c7" /></svg>
        Ordantis
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ maxWidth: 1000, display: "flex", fontSize: 72, lineHeight: 1.02, letterSpacing: -3, fontWeight: 700 }}>{homeIntro.title}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#576474" }}>{homeIntro.eyebrow}</div>
      </div>
    </div>,
    size,
  );
}
