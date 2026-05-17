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

// Agrega tus proyectos aquí con la información actualizada
export const projects: ProjectItem[] = [
  // Ejemplo:
  // {
  //   name: "Nombre del Proyecto",
  //   src: "/screenshot.png",
  //   href: "https://链接",
  //   year: 2025,
  //   description: {
  //     en: "Description in English",
  //     es: "Descripción en español"
  //   },
  //   role: {
  //     en: "Your role",
  //     es: "Tu rol"
  //   },
  //   highlights: {
  //     en: ["Highlight 1", "Highlight 2"],
  //     es: ["Punto clave 1", "Punto clave 2"]
  //   },
  //   technologies: ["Next.js", "React", "TypeScript"],
  //   featured: true
  // },
]
