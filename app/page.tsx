"use client"
import { useEffect, useState, useSyncExternalStore } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import ProjectModal from "@/components/ProjectModal"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import type { ProjectItem } from "@/lib/projects"
import type { Lang } from "@/lib/texts"
import { analytics } from "@/lib/analytics"

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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

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
    analytics.languageToggle(next)
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
    analytics.themeToggle(next)
    window.dispatchEvent(new Event(PREF_EVENT))
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen pt-14">
      <Header
        lang={lang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleLang={toggleLang}
        onScrollToProjects={scrollToProjects}
        onScrollToContact={scrollToContact}
      />

      <main>
        <Hero
          lang={lang}
          onScrollToProjects={scrollToProjects}
          onScrollToContact={scrollToContact}
        />

        <About lang={lang} id="sobre-mi" />

        <Projects
          lang={lang}
          onOpen={(p) => {
            analytics.projectClick(p.name)
            setSelectedProject(p)
          }}
          id="proyectos"
        />

        <Contact lang={lang} id="contacto" />
      </main>

      <Footer lang={lang} />

      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onNavigate={(p) => setSelectedProject(p)}
      />
    </div>
  )
}
