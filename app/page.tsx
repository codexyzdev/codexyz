"use client"
import { useEffect, useState } from "react"
import { animate, stagger } from "animejs"
import { safeDuration } from "@/lib/utils"
import AppHero from "@/components/AppHero"
import TechGrid from "@/components/TechGrid"
import TechModal from "@/components/TechModal"
import ProjectsGrid from "@/components/ProjectsGrid"
import ProjectModal from "@/components/ProjectModal"
import ContactForm from "@/components/ContactForm"
import type { TechItem } from "@/lib/tech"
import type { ProjectItem } from "@/lib/projects"
// Eliminamos react-icons para la sección de tecnologías; usaremos íconos locales desde /public

// CONTACT_EMAIL movido al componente ContactForm

// technologiesByLang ahora se gestiona desde lib/tech y TechGrid

export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  // Los textos por idioma se gestionan ahora en lib/texts y dentro de los componentes

  useEffect(() => {
    // Animación de entrada para las tarjetas de tecnología
    animate(
      ".tech-card",
      {
        translateY: [20, 0],
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: safeDuration(700),
        delay: stagger(80),
      }
    )
  }, [])

  // Inicializa tema y sincroniza con el DOM y localStorage
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = stored ? stored : prefersDark ? "dark" : "light"
    setTheme(initial)
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", initial === "dark")
    }
  }, [])

  // Detecta idioma del dispositivo/navegador en el primer render.
  // Si el usuario ya eligió manualmente, respetamos localStorage.
  useEffect(() => {
    const storedLang = (typeof window !== "undefined" && localStorage.getItem("lang")) as
      | "en"
      | "es"
      | null
    const browserLang =
      (typeof navigator !== "undefined" && (navigator.language || navigator.languages?.[0])) || "en"
    const initialLang: "en" | "es" = storedLang
      ? storedLang
      : browserLang.toLowerCase().startsWith("es")
      ? "es"
      : "en"
    setLang(initialLang)
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLang
    }
  }, [])

  const toggleLang = () => {
    setLang((prev) => {
      const next: "en" | "es" = prev === "en" ? "es" : "en"
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", next)
      }
      if (typeof document !== "undefined") {
        document.documentElement.lang = next
      }
      return next
    })
  }

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next === "dark")
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next)
      }
      return next
    })
  }

  // Cierra la modal con Escape para mejorar la accesibilidad
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTech(null)
        setSelectedProject(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Envío del formulario ahora es manejado dentro de ContactForm

  return (
    <main className="min-h-svh">
      <AppHero
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onScrollToContact={() => {
          const section = document.getElementById("contacto")
          section?.scrollIntoView({ behavior: "smooth" })
        }}
        onScrollToTech={() => {
          const section = document.getElementById("tecnologias")
          section?.scrollIntoView({ behavior: "smooth" })
        }}
      />

      <ProjectsGrid lang={lang} onOpen={(p) => setSelectedProject(p)} />
      <ProjectModal project={selectedProject} lang={lang} onClose={() => setSelectedProject(null)} />
      <TechGrid lang={lang} onSelect={(tech) => setSelectedTech(tech)} id="tecnologias" />
      <TechModal tech={selectedTech} onClose={() => setSelectedTech(null)} />


      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <ContactForm lang={lang} id="contacto" />
      </section>
    </main>
  )
}
