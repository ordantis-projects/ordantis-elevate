// Preserve the original demos' utility classes without restyling the site.
module.exports = {
  content: ["./components/demos/original-demos.tsx"],
  important: ".service-demo",
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "hsl(var(--primary) / <alpha-value>)", foreground: "#061a2f", glow: "#5dd8e8" },
        destructive: "#ffb5b5",
      },
      fontFamily: { display: ["var(--font-display)", "sans-serif"] },
    },
  },
};
