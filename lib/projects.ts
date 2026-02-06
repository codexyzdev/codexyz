export type ProjectItem = {
  name: string
  src: string
  href?: string
  description?: {
    en: string
    es: string
  }
  role?: {
    en: string
    es: string
  }
  highlights?: {
    en: string[]
    es: string[]
  }
  technologies?: string[]
  featured?: boolean
}

export const projects: ProjectItem[] = [
  {
    name: "DevPulse",
    src: "/devpulse-seven.vercel.app.png",
    href: "https://devpulse-seven.vercel.app/",
    description: {
      en: "Smart Pomodoro timer designed specifically for developers with AI-powered focus assistance",
      es: "Temporizador Pomodoro inteligente diseñado específicamente para desarrolladores con asistencia de IA"
    },
    role: {
      en: "Product + UI development",
      es: "Producto + desarrollo UI",
    },
    highlights: {
      en: [
        "Pomodoro flow tailored for deep work",
        "Focus assistance concept built for developers",
        "Responsive, keyboard-friendly interface",
      ],
      es: [
        "Flujo Pomodoro pensado para trabajo profundo",
        "Concepto de asistencia de enfoque para devs",
        "Interfaz responsive y usable con teclado",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
    featured: true,
  },
  {
    name: "Los Tiburones",
    src: "/los-tiburones.png",
    description: {
      en: "Business website with modern design and responsive layout",
      es: "Sitio web empresarial con diseño moderno y diseño responsive"
    },
    role: {
      en: "Frontend development",
      es: "Desarrollo frontend",
    },
    highlights: {
      en: [
        "Responsive layout for mobile and desktop",
        "Clean information hierarchy and branding",
      ],
      es: [
        "Layout responsive para móvil y desktop",
        "Jerarquía visual clara y branding consistente",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Financiamientos",
    src: "/financiamientos.png",
    description: {
      en: "Financial services platform with intuitive user interface",
      es: "Plataforma de servicios financieros con interfaz de usuario intuitiva"
    },
    role: {
      en: "Frontend development",
      es: "Desarrollo frontend",
    },
    highlights: {
      en: [
        "UX focused on clarity and trust",
        "Responsive UI and consistent components",
      ],
      es: [
        "UX enfocada en claridad y confianza",
        "UI responsive y componentes consistentes",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    name: "Chess Clock",
    src: "/chess-clock.png",
    href: "https://chess-clock-by-codexyzdev.vercel.app/",
    description: {
      en: "Professional chess timer with multiple time control modes",
      es: "Temporizador de ajedrez profesional con múltiples modos de control de tiempo"
    },
    role: {
      en: "Frontend + interaction design",
      es: "Frontend + diseño de interacción",
    },
    highlights: {
      en: [
        "Timer interface optimized for quick interactions",
        "Responsive layout for mobile play",
      ],
      es: [
        "Interfaz optimizada para interacciones rápidas",
        "Layout responsive para jugar desde el móvil",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
]
