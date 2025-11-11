"use client"
import { useEffect, useState } from "react"
import { animate, stagger } from "animejs"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Code2,
  Braces,
  ShieldCheck,
  Database,
  Zap,
  Layers,
  Sun,
  Moon,
  Mail,
  Grid3x3,
} from "lucide-react"
// Eliminamos react-icons para la sección de tecnologías; usaremos íconos locales desde /public

const CONTACT_EMAIL = "tu-correo@gmail.com" // TODO: reemplaza por tu correo real para recibir mensajes

// Íconos locales desde /public y descripciones por idioma
type TechItem = {
  key: string
  name: string
  imgLight: string
  imgDark: string
  description: string
}

const technologiesByLang = {
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

export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [selectedProject, setSelectedProject] = useState<{
    name: string
    src: string
  } | null>(null)

  const texts = {
    en: {
      portfolio: "Portfolio",
      heroTitle: "Alejandro Baez",
      heroDesc:
        "Venezuelan web developer. I build modern apps with Next.js, React and Supabase.",
      contactMe: "Contact me",
      seeTech: "Tech stack",
      technologies: "Technologies",
      techDesc: "Stack I use daily and love. Smooth effects powered by Anime.js.",
      cardDesc: "Fast, scalable and maintainable projects.",
      aboutMe: "About me",
      aboutDesc:
        "I am passionate about building modern and functional applications. I work with Next.js, React and Supabase. Always learning and improving to deliver efficient solutions.",
      projects: "Projects",
      projectsDesc: "A few apps I have worked on.",
      contact: "Contact",
      contactDesc:
        "Fill the form and your device's mail client (Gmail on mobile) will open with the message ready to send.",
      name: "Name",
      email: "Email",
      message: "Message",
      sendGmail: "Send email",
      note:
        "Note: replace the email in the code with yours to receive the messages.",
      langToggle: "ES / EN",
    },
    es: {
      portfolio: "Portafolio",
      heroTitle: "Alejandro Baez",
      heroDesc:
        "Desarrollador web venezolano. Construyo aplicaciones modernas con Next.js, React y Supabase.",
      contactMe: "Contáctame",
      seeTech: "Stack tecnológico",
      technologies: "Tecnologías",
      techDesc:
        "Stack que uso a diario y me encanta. Con efectos suaves usando Anime.js.",
      cardDesc: "Proyectos rápidos, escalables y mantenibles.",
      aboutMe: "Sobre mí",
      aboutDesc:
        "Soy apasionado por crear aplicaciones modernas y funcionales. Trabajo con Next.js, React y Supabase. Siempre aprendiendo y mejorando para ofrecer soluciones eficientes.",
      projects: "Proyectos",
      projectsDesc: "Algunas apps en las que he trabajado.",
      contact: "Contacto",
      contactDesc:
        "Completa el formulario y se abrirá tu cliente de correo (Gmail en móvil) con el mensaje listo para enviar.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      sendGmail: "Enviar email",
      note:
        "Nota: reemplaza el correo en el código por el tuyo para recibir los mensajes.",
      langToggle: "ES / EN",
    },
  } as const

  useEffect(() => {
    // Animación de entrada para las tarjetas de tecnología
    animate(
      ".tech-card",
      {
        translateY: [20, 0],
        opacity: [0, 1],
        easing: "easeOutQuad",
        duration: 700,
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

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name")?.toString() ?? ""
    const email = formData.get("email")?.toString() ?? ""
    const message = formData.get("message")?.toString() ?? ""

    const subject = `Contacto desde el portafolio — ${name}`
    const body = `Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}`

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`

    // Abre el cliente de correo predeterminado (en móvil suele abrir Gmail)
    window.location.href = mailtoUrl
  }

  return (
    <main className="min-h-svh">
      {/* Hero */}
      <section className="relative bg-codexyz-gradient text-white">
        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm ring-1 ring-white/20 px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Codexyz.dev logo"
                  width={180}
                  height={58}
                  className="h-8 w-auto"
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => setLang((prev) => (prev === "en" ? "es" : "en"))}
                >
                  {texts[lang].langToggle}
                </Button>
              </div>
            </div>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{texts[lang].heroTitle}</h1>
            <p className="mt-4 max-w-2xl text-base/relaxed opacity-95 sm:text-lg">
              {texts[lang].aboutDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="w-full sm:w-auto h-11 rounded-full bg-white text-black hover:bg-white/90 shadow-sm"
                onClick={() => {
                  const section = document.getElementById("contacto")
                  section?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                {texts[lang].contactMe}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 rounded-full border transition-colors shadow-sm bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-white/60 dark:hover:bg-white/90"
                onClick={() => {
                  const section = document.getElementById("tecnologias")
                  section?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Grid3x3 className="mr-2 h-4 w-4" />
                {texts[lang].seeTech}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section id="tecnologias" className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <h2 className="text-2xl font-semibold">{texts[lang].technologies}</h2>
        <p className="mt-2 text-muted-foreground">{texts[lang].techDesc}</p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {technologiesByLang[lang].map((tech, idx) => {
            const imgSrc = theme === "dark" ? tech.imgDark : tech.imgLight
            return (
              <button
                key={tech.key}
                className="tech-card group rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition hover:shadow-md hover:bg-accent/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary"
                data-idx={idx}
                onClick={() => setSelectedTech(tech)}
                aria-label={`Ver detalles de ${tech.name}`}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <Image
                    src={imgSrc}
                    alt={`${tech.name} icon`}
                    width={48}
                    height={48}
                    className="h-12 w-12"
                  />
                  <h3 className="text-sm font-medium text-center">{tech.name}</h3>
                </div>
              </button>
            )
          })}
        </div>

        {/* Modal de tecnología */}
        {selectedTech && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedTech(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Descripción de ${selectedTech.name}`}
              className="max-w-md w-full rounded-2xl bg-card text-card-foreground shadow-lg ring-1 ring-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={theme === "dark" ? selectedTech.imgDark : selectedTech.imgLight}
                  alt={`${selectedTech.name} icon`}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <h3 className="text-lg font-semibold">{selectedTech.name}</h3>
              </div>
              <div className="mt-3 h-px w-full bg-border" />
              <p className="mt-3 text-sm text-muted-foreground">{selectedTech.description}</p>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedTech(null)}>{lang === "en" ? "Close" : "Cerrar"}</Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <h2 className="text-2xl font-semibold">{texts[lang].projects}</h2>
        <p className="mt-2 text-muted-foreground">{texts[lang].projectsDesc}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Los Tiburones */}
          <a
            href="#"
            aria-label="Los Tiburones"
            className="group block overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm transition hover:shadow-md"
            onClick={(e) => {
              e.preventDefault()
              setSelectedProject({ name: "Los Tiburones", src: "/los-tiburones.png" })
            }}
          >
            <div className="relative w-full h-64 sm:h-72 md:h-80 bg-muted">
              <Image src="/los-tiburones.png" alt="Los Tiburones - Login" fill className="object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between text-sm">
              <span className="font-medium">Los Tiburones</span>
              <span className="text-muted-foreground group-hover:underline">{lang === "en" ? "View" : "Ver"}</span>
            </div>
          </a>

          {/* Financiamientos */}
          <a
            href="#"
            aria-label="Financiamientos"
            className="group block overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm transition hover:shadow-md"
            onClick={(e) => {
              e.preventDefault()
              setSelectedProject({ name: "Financiamientos", src: "/financiamientos.png" })
            }}
          >
            <div className="relative w-full h-64 sm:h-72 md:h-80 bg-muted">
              <Image src="/financiamientos.png" alt="Financiamientos - Login" fill className="object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between text-sm">
              <span className="font-medium">Financiamientos</span>
              <span className="text-muted-foreground group-hover:underline">{lang === "en" ? "View" : "Ver"}</span>
            </div>
          </a>

          {/* Chess Clock */}
          <a
            href="https://chess-clock-by-codexyzdev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chess Clock"
            className="group block overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm transition hover:shadow-md"
          >
            <div className="relative w-full h-64 sm:h-72 md:h-80 bg-muted">
              <Image src="/chess-clock.png" alt="Chess Clock - App" fill className="object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between text-sm">
              <span className="font-medium">Chess Clock</span>
              <span className="text-muted-foreground group-hover:underline">{lang === "en" ? "View" : "Ver"}</span>
            </div>
          </a>
        </div>

        {/* Modal de proyecto: muestra la imagen completa */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Vista completa de ${selectedProject.name}`}
              className="relative w-full max-w-5xl h-[75vh] sm:h-[80vh] bg-black rounded-xl overflow-hidden ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProject.src}
                alt={`${selectedProject.name} - imagen completa`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 rounded-md bg-white/80 text-black px-3 py-1 text-sm hover:bg-white"
              >
                {lang === "en" ? "Close" : "Cerrar"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Sobre mí — eliminado a petición del usuario */}

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="text-2xl font-semibold">{texts[lang].contact}</h2>
        <p className="mt-2 text-muted-foreground">{texts[lang].contactDesc}</p>
        <form
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget as HTMLFormElement
            const fd = new FormData(form)
            onSubmit(fd)
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">{texts[lang].name}</Label>
            <Input id="name" name="name" placeholder={lang === "en" ? "Your name" : "Tu nombre"} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{texts[lang].email}</Label>
            <Input id="email" name="email" type="email" placeholder={lang === "en" ? "youremail@gmail.com" : "tucorreo@gmail.com"} required />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="message">{texts[lang].message}</Label>
            <Textarea id="message" name="message" placeholder={lang === "en" ? "Tell me about your idea or project" : "Cuéntame sobre tu idea o proyecto"} rows={5} required />
          </div>
          <div>
            <Button type="submit" className="bg-codexyz-gradient text-white hover:opacity-90">
              {texts[lang].sendGmail}
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
