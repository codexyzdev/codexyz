"use client"
import { useEffect, useState, useSyncExternalStore } from "react"
import AppHero from "@/components/AppHero"
import TechGrid from "@/components/TechGrid"
import TechModal from "@/components/TechModal"
import ProjectsGrid from "@/components/ProjectsGrid"
import ProjectModal from "@/components/ProjectModal"
import ContactForm from "@/components/ContactForm"
import type { TechItem } from "@/lib/tech"
import type { ProjectItem } from "@/lib/projects"
import type { Lang } from "@/lib/texts"
// Eliminamos react-icons para la sección de tecnologías; usaremos íconos locales desde /public

// CONTACT_EMAIL movido al componente ContactForm

// technologiesByLang ahora se gestiona desde lib/tech y TechGrid

const PREF_EVENT = "codexyz:pref"

function subscribePrefs(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {}

  const handler = () => onStoreChange()
  window.addEventListener(PREF_EVENT, handler)
  window.addEventListener("storage", handler)
  return () => {
    window.removeEventListener(PREF_EVENT, handler)
    window.removeEventListener("storage", handler)
  }
}

function getLangSnapshot(): "en" | "es" {
  if (typeof window === "undefined") return "es"
  try {
    const stored = localStorage.getItem("lang")
    if (stored === "en" || stored === "es") return stored
  } catch {}

  const browserLang = (navigator.language || navigator.languages?.[0] || "es").toLowerCase()
  return browserLang.startsWith("es") ? "es" : "en"
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  try {
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
  } catch {}

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export default function Home() {
  const lang = useSyncExternalStore<Lang>(subscribePrefs, getLangSnapshot, () => "es")
  const theme = useSyncExternalStore<"light" | "dark">(
    subscribePrefs,
    getThemeSnapshot,
    () => "light"
  )
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  // Los textos por idioma se gestionan ahora en lib/texts y dentro de los componentes

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [theme])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const toggleLang = () => {
    const next: "en" | "es" = lang === "en" ? "es" : "en"
    try {
      localStorage.setItem("lang", next)
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = next
    }
    window.dispatchEvent(new Event(PREF_EVENT))
  }

  const toggleTheme = () => {
    const next: "light" | "dark" = theme === "dark" ? "light" : "dark"
    try {
      localStorage.setItem("theme", next)
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark")
    }
    window.dispatchEvent(new Event(PREF_EVENT))
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
    <div className="min-h-svh">
      <AppHero
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onScrollToProjects={() => {
          const section = document.getElementById("proyectos")
          section?.scrollIntoView({ behavior: "smooth" })
        }}
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
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onNavigate={(p) => setSelectedProject(p)}
      />
      <TechGrid lang={lang} onSelect={(tech) => setSelectedTech(tech)} id="tecnologias" />
      <TechModal tech={selectedTech} lang={lang} onClose={() => setSelectedTech(null)} />


      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <ContactForm lang={lang} id="contacto" />
      </section>
    </div>
  )
}
