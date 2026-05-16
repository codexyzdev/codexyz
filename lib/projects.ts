export type ProjectItem = {
  name: string
  src: string
  href?: string
  year?: number
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
    name: "Age Calculator",
    src: "/age-calculator-app-by-codexyz.vercel.app.png",
    href: "https://age-calculator-app-by-codexyz.vercel.app",
    year: 2025,
    description: {
      en: "Web application that calculates exact age in years, months, and days. Built with modern stack and deployed on Vercel.",
      es: "Aplicación web que calcula la edad exacta en años, meses y días. Construida con stack moderno y desplegada en Vercel."
    },
    role: {
      en: "Full-stack development",
      es: "Desarrollo full-stack"
    },
    highlights: {
      en: [
        "Accurate age calculation with instant results",
        "Clean, intuitive user interface",
        "Fast performance and responsive design",
      ],
      es: [
        "Cálculo preciso de edad con resultados instantáneos",
        "Interfaz limpia e intuitiva",
        "Rendimiento rápido y diseño responsive",
      ]
    },
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    featured: true
  },
  {
    name: "DevPulse",
    src: "/devpulse-seven.vercel.app.png",
    href: "https://devpulse-seven.vercel.app/",
    year: 2025,
    description: {
      en: "Smart productivity timer designed for deep work sessions. Helps developers stay focused and track their work habits.",
      es: "Temporizador de productividad inteligente diseñado para sesiones de trabajo profundo. Ayuda a los desarrolladores a mantenerse enfocados."
    },
    role: {
      en: "Product + UI development",
      es: "Producto + desarrollo UI",
    },
    highlights: {
      en: [
        "Tailored flow for focused work sessions",
        "Keyboard-friendly interface for quick interactions",
        "Responsive design that works everywhere",
      ],
      es: [
        "Flujo personalizado para sesiones de trabajo enfocado",
        "Interfaz amigable con teclado para interacciones rápidas",
        "Diseño responsive que funciona en cualquier dispositivo",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
    featured: true,
  },
  {
    name: "Los Tiburones",
    src: "/los-tiburones.png",
    year: 2024,
    description: {
      en: "Business website with modern design that strengthened the brand's digital presence. Clean layout and professional visual identity.",
      es: "Sitio web empresarial con diseño moderno que fortaleció la presencia digital de la marca. Layout limpio e identidad visual profesional."
    },
    role: {
      en: "Frontend development",
      es: "Desarrollo frontend",
    },
    highlights: {
      en: [
        "Responsive layout for mobile and desktop",
        "Professional branding and visual hierarchy",
      ],
      es: [
        "Layout responsive para móvil y escritorio",
        "Branding profesional y jerarquía visual",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Financiamientos",
    src: "/financiamientos.png",
    year: 2024,
    description: {
      en: "Financial services platform with intuitive interface. Built to inspire trust and simplify complex financial information.",
      es: "Plataforma de servicios financieros con interfaz intuitiva. Diseñada para inspirar confianza y simplificar información financiera compleja."
    },
    role: {
      en: "Frontend development",
      es: "Desarrollo frontend",
    },
    highlights: {
      en: [
        "UX focused on clarity and user trust",
        "Consistent components across the platform",
      ],
      es: [
        "UX enfocada en claridad y confianza del usuario",
        "Componentes consistentes en toda la plataforma",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    name: "Chess Clock",
    src: "/chess-clock.png",
    href: "https://chess-clock-by-codexyzdev.vercel.app/",
    year: 2024,
    description: {
      en: "Professional chess timer with multiple time control modes. Optimized for quick interactions during gameplay.",
      es: "Temporizador de ajedrez profesional con múltiples modos de control de tiempo. Optimizado para interacciones rápidas durante el juego."
    },
    role: {
      en: "Frontend + interaction design",
      es: "Frontend + diseño de interacción",
    },
    highlights: {
      en: [
        "Interface optimized for fast, intuitive interactions",
        "Mobile-first responsive layout",
      ],
      es: [
        "Interfaz optimizada para interacciones rápidas e intuitivas",
        "Layout responsive mobile-first",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Ahorro Compartido 2026",
    src: "/ahorro-compartido-2026.vercel.app.png",
    href: "https://ahorro-compartido-2026.vercel.app/",
    year: 2025,
    description: {
      en: "Couples savings challenge app with dashboard, deposits tracking, and envelope board for 2026 goals. Makes saving fun and visual.",
      es: "App de reto de ahorro para parejas con tablero, seguimiento de aportes y sobres para objetivos de 2026. Hace el ahorro divertido y visual."
    },
    role: {
      en: "Product + UI development",
      es: "Producto + desarrollo UI",
    },
    highlights: {
      en: [
        "Savings dashboard with progress tracking",
        "Visual envelope board for goal management",
        "Mobile-first UI with clear hierarchy",
      ],
      es: [
        "Tablero de ahorro con seguimiento de progreso",
        "Tablero visual de sobres para gestión de objetivos",
        "UI mobile-first con jerarquía clara",
      ],
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "Lucide", "Vercel"],
  },
]
