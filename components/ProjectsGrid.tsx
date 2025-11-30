"use client"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { texts, Lang } from "@/lib/texts"
import { projects, ProjectItem } from "@/lib/projects"
import { getBlurDataURL, getImageSizes } from "@/lib/image-utils"

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
        {projects.map((p, index) => {
          // Prioritize first 4 images (above the fold)
          const isPriority = index < 4

          const card = (
            <div className="group block overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
              <div className="relative w-full h-64 sm:h-72 md:h-80 bg-muted">
                <Image
                  src={p.src}
                  alt={p.description?.[lang] || p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={getImageSizes("project")}
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                  priority={isPriority}
                  quality={85}
                />
              </div>
              <div className="p-3 flex items-center justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-muted-foreground group-hover:underline flex items-center gap-1">
                  {lang === "en" ? "View" : "Ver"}
                  {p.href && <ExternalLink className="h-3 w-3" aria-hidden="true" />}
                </span>
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
                aria-label={`${p.name} - ${t.openInNewTab}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl"
              >
                {card}
              </a>
            )
          }

          return (
            <button
              key={p.name}
              onClick={() => onOpen(p)}
              aria-label={`${lang === "en" ? "View details for" : "Ver detalles de"} ${p.name}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-xl text-left w-full"
              type="button"
            >
              {card}
            </button>
          )
        })}
      </div>
    </section>
  )
}