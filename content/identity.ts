// Keep identity/navigation independent of the long editorial corpus. Client
// navigation must not ship every research guide to every visitor.
export const siteConfig = {
  name: "Ordantis",
  legalName: "Ordantis Solutions S.L.",
  url: "https://www.ordantis.com",
  email: "contacto@ordantis.com",
  locale: "es_ES",
  language: "es",
  description: "Machine learning, ciencia de datos y sistemas de IA para empresas y administraciones en España. Modelos predictivos, I+D aplicada e ingeniería de datos.",
  updatedAt: "2026-08-30",
  reviewedAt: "2026-09-16",
} as const;

export const primaryNavigation = [
  { href: "/", label: "Inicio" },
  { href: "/capacidades", label: "Servicios" },
  { href: "/empresa", label: "Nosotros" },
  { href: "/govtech", label: "GovTech" },
  { href: "/research", label: "Research" },
  { href: "/labs", label: "Labs" },
] as const;

export const serviceAreas = [
  {
    name: "Albacete",
    region: "Castilla-La Mancha",
    path: "/inteligencia-artificial-albacete",
    relationship: "Domicilio registral y prestación de servicios",
  },
  {
    name: "Valencia",
    region: "Comunitat Valenciana",
    path: "/inteligencia-artificial-valencia",
    relationship: "Área de servicio y relación con el ecosistema UPV",
  },
] as const;

// Corporate registration only, not a public-facing office or a team profile.
export const companyRegistration = {
  nif: "B23922552",
  streetAddress: "Calle Blasco Ibáñez, 26, ático",
  postalCode: "02004",
  addressLocality: "Albacete",
  addressRegion: "Albacete",
  addressCountry: "ES",
  registry: "Registro Mercantil de Albacete, sección 8, hoja AB 31803, inscripción 1 (28 de octubre de 2025)",
  source: "https://www.boe.es/diario_borme/txt.php?id=BORME-A-2025-211-02",
  checkedAt: "2026-08-28",
} as const;
