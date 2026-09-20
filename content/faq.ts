import { homeFaqs } from "./home.ts";

export const faqIntro = {
  title: "Preguntas sobre machine learning, datos y sistemas de IA",
  description: "Viabilidad, evaluación, datos, integración y transferencia en proyectos de inteligencia artificial para administraciones públicas y empresas.",
};

export const companyFaqs = [
  ...homeFaqs,
  { question: "¿Cómo se protegen nuestros datos confidenciales?", answer: "Antes de conectar fuentes acordamos finalidad, permisos, conservación y entorno de ejecución. Revisamos qué información recibe cada proveedor y qué queda en registros o exportaciones. Si los datos deben permanecer en un entorno autorizado, esa restricción forma parte de la arquitectura y de las pruebas. No es posible prometer seguridad absoluta por elegir nube privada o ejecución local.", href: "/insights/responsible-ai-privacidad-edge-ai" },
  { question: "¿Cómo se acotan el presupuesto y las etapas del proyecto?", answer: "El alcance distingue desarrollo del modelo, investigación cuando sea necesaria, integración y mantenimiento. Se acuerdan entregables por etapas, datos, plazos y límites de cómputo. Una línea de I+D añade ensayos y criterios para decidir si continuar. La mejora se mide durante la evaluación con las condiciones del proyecto; no se fija un porcentaje de antemano ni se presupone que un prototipo esté listo para producción.", href: "/capacidades" },
] as const;
