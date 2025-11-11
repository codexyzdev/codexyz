export type TechItem = {
  key: string
  name: string
  imgLight: string
  imgDark: string
  description: string
}

export const technologiesByLang = {
  en: [
    {
      key: "nextjs",
      name: "Next.js",
      imgLight: "/nextjs_icon_dark.svg",
      imgDark: "/nextjs_icon_dark.svg",
      description:
        "React framework for production: routing, server-side rendering, and edge-ready performance.",
    },
    {
      key: "react",
      name: "React",
      imgLight: "/React_light.svg",
      imgDark: "/React_dark.svg",
      description:
        "UI library focused on components and state, enabling interactive and scalable interfaces.",
    },
    {
      key: "supabase",
      name: "Supabase",
      imgLight: "/supabase.svg",
      imgDark: "/supabase.svg",
      description:
        "Open-source Firebase alternative: Postgres DB, Auth, Storage, and real-time APIs.",
    },
    {
      key: "tailwind",
      name: "Tailwind CSS",
      imgLight: "/tailwindcss.svg",
      imgDark: "/tailwindcss.svg",
      description:
        "Utility-first CSS for rapid styling with design tokens and responsive classes.",
    },
    {
      key: "zod",
      name: "Zod",
      imgLight: "/zod.svg",
      imgDark: "/zod.svg",
      description:
        "TypeScript-first schema validation: parse, refine and ensure data safety across the app.",
    },
    {
      key: "typescript",
      name: "TypeScript",
      imgLight: "/typescript.svg",
      imgDark: "/typescript.svg",
      description:
        "Typed superset of JavaScript that improves developer experience and reliability.",
    },
    {
      key: "nodejs",
      name: "Node.js",
      imgLight: "/nodejs.svg",
      imgDark: "/nodejs.svg",
      description:
        "JavaScript runtime built on V8. Perfect for APIs, backend services and real-time apps.",
    },
    {
      key: "html5",
      name: "HTML5",
      imgLight: "/html5.svg",
      imgDark: "/html5.svg",
      description:
        "Modern markup standard for semantic and accessible web interfaces.",
    },
    {
      key: "javascript",
      name: "JavaScript",
      imgLight: "/javascript.svg",
      imgDark: "/javascript.svg",
      description:
        "The language of the web. Event-driven, flexible, and ubiquitous across the stack.",
    },
  ] as TechItem[],
  es: [
    {
      key: "nextjs",
      name: "Next.js",
      imgLight: "/nextjs_icon_dark.svg",
      imgDark: "/nextjs_icon_dark.svg",
      description:
        "Framework de React para producción: enrutamiento, render del servidor y rendimiento en el edge.",
    },
    {
      key: "react",
      name: "React",
      imgLight: "/React_light.svg",
      imgDark: "/React_dark.svg",
      description:
        "Librería de UI basada en componentes y estado, ideal para interfaces interactivas y escalables.",
    },
    {
      key: "supabase",
      name: "Supabase",
      imgLight: "/supabase.svg",
      imgDark: "/supabase.svg",
      description:
        "Alternativa open-source a Firebase: Postgres, Auth, Storage y APIs en tiempo real.",
    },
    {
      key: "tailwind",
      name: "Tailwind CSS",
      imgLight: "/tailwindcss.svg",
      imgDark: "/tailwindcss.svg",
      description:
        "CSS utility-first para maquetado rápido con tokens de diseño y clases responsive.",
    },
    {
      key: "zod",
      name: "Zod",
      imgLight: "/zod.svg",
      imgDark: "/zod.svg",
      description:
        "Validación de esquemas orientada a TypeScript: parseo, refinamiento y seguridad de datos.",
    },
    {
      key: "typescript",
      name: "TypeScript",
      imgLight: "/typescript.svg",
      imgDark: "/typescript.svg",
      description:
        "Superset tipado de JavaScript que mejora la experiencia del desarrollador y la fiabilidad.",
    },
    {
      key: "nodejs",
      name: "Node.js",
      imgLight: "/nodejs.svg",
      imgDark: "/nodejs.svg",
      description:
        "Entorno de ejecución de JavaScript sobre V8. Ideal para APIs, servicios backend y apps en tiempo real.",
    },
    {
      key: "html5",
      name: "HTML5",
      imgLight: "/html5.svg",
      imgDark: "/html5.svg",
      description:
        "Estándar moderno de marcado para interfaces web semánticas y accesibles.",
    },
    {
      key: "javascript",
      name: "JavaScript",
      imgLight: "/javascript.svg",
      imgDark: "/javascript.svg",
      description:
        "El lenguaje de la web. Orientado a eventos, flexible y ubicuo en todo el stack.",
    },
  ] as TechItem[],
} as const