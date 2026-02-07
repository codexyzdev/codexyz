"use client"
import Image from "next/image"
import { ExternalLink, Sparkles } from "lucide-react"
import { texts, Lang } from "@/lib/texts"
import { projects, ProjectItem } from "@/lib/projects"
import { getBlurDataURL, getImageSizes } from "@/lib/image-utils"

type ProjectsGridProps = {
  lang: Lang
  onOpen: (project: ProjectItem) => void
}

export default function ProjectsGrid({ lang, onOpen }: ProjectsGridProps) {
  const t = texts[lang]
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = projects.filter((p) => p.name !== featured?.name)

  return (
    <section id="proyectos" className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <h2 className="text-2xl font-semibold">{t.projects}</h2>
      <p className="mt-2 text-muted-foreground">{t.projectsDesc}</p>

      {featured && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => onOpen(featured)}
            aria-label={`${lang === "en" ? "Open featured project" : "Abrir proyecto destacado"}: ${featured.name}`}
            className="group w-full text-left rounded-2xl overflow-hidden border border-input/60 bg-card/70 shadow-sm transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[260px] md:min-h-[360px] bg-muted">
                <Image
                  src={featured.src}
                  alt={featured.description?.[lang] || featured.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                  priority
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" />
                  {lang === "en" ? "Featured" : "Destacado"}
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{featured.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {featured.description?.[lang]}
                    </p>
                  </div>
                  {featured.href && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      {t.openInNewTab}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </span>
                  )}
                </div>

                {featured.role?.[lang] && (
                  <div className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/90">{lang === "en" ? "Role:" : "Rol:"}</span>{" "}
                    {featured.role[lang]}
                  </div>
                )}

                {!!featured.technologies?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {!!featured.highlights?.[lang]?.length && (
                  <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                    {featured.highlights[lang].slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {lang === "en" ? "Open case study" : "Abrir case study"}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((p, index) => {
          const isPriority = index < 3

          return (
            <button
              key={p.name}
              onClick={() => onOpen(p)}
              aria-label={`${lang === "en" ? "View details for" : "Ver detalles de"} ${p.name}`}
              className="group text-left w-full overflow-hidden rounded-2xl border border-input/60 bg-card/70 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              type="button"
            >
              <div className="relative w-full h-56 sm:h-64 bg-muted">
                <Image
                  src={p.src}
                  alt={p.description?.[lang] || p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes={getImageSizes("project")}
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                  priority={isPriority}
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-70" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    {p.description?.[lang] && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        {p.description[lang]}
                      </div>
                    )}
                  </div>
                  {p.href && (
                    <ExternalLink className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  )}
                </div>

                {!!p.technologies?.length && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
