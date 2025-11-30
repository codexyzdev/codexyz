export type ProjectItem = {
  name: string
  src: string
  href?: string
  description?: {
    en: string
    es: string
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
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    name: "Financiamientos",
    src: "/financiamientos.png",
    description: {
      en: "Financial services platform with intuitive user interface",
      es: "Plataforma de servicios financieros con interfaz de usuario intuitiva"
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
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
]