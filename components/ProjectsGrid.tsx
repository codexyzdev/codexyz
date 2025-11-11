"use client"
import Image from "next/image"
import { texts, Lang } from "@/lib/texts"
import { projects, ProjectItem } from "@/lib/projects"

type ProjectsGridProps = {
  lang: Lang
  onOpen: (project: ProjectItem) => void
}

export default function ProjectsGrid({ lang, onOpen }: ProjectsGridProps) {
  const t = texts[lang]
  return (
    <section id="proyectos" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
      <h2 className="text-2xl font-semibold">{t.projects}</h2>
      <p className="mt-2 text-muted-foreground">{t.projectsDesc}</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((p) => {
          const card = (
            <div className="group block overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
              <div className="relative w-full h-64 sm:h-72 md:h-80 bg-muted">
                <Image src={p.src} alt={`${p.name}`} fill className="object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground group-hover:underline">{lang === "en" ? "View" : "Ver"}</span>
              </div>
            </div>
          )

          if (p.href) {
            return (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl"
            >
              {card}
            </a>
            )
          }

          return (
            <a
              key={p.name}
              href="#"
              aria-label={p.name}
              onClick={(e) => {
                e.preventDefault()
                onOpen(p)
              }}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl"
            >
              {card}
            </a>
          )
        })}
      </div>
    </section>
  )
}