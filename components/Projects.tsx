"use client"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { texts, Lang } from "@/lib/texts"
import { projects, ProjectItem } from "@/lib/projects"
import ScrollReveal from "@/components/ScrollReveal"

type ProjectsProps = {
  lang: Lang
  onOpen: (project: ProjectItem) => void
  id?: string
}

export default function Projects({ lang, onOpen, id }: ProjectsProps) {
  const t = texts[lang]

  if (projects.length === 0) {
    return (
      <section id={id} className="section-padding">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm font-medium text-primary mb-4">
              {t.projects}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.projectsDesc}
            </h2>
            <p className="mt-6 text-muted-foreground">
              {lang === "en" ? "Projects coming soon." : "Próximamente proyectos."}
            </p>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = projects.filter((p) => p.name !== featured?.name)

  return (
    <section id={id} className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary mb-4">
            {t.projects}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {t.projectsDesc}
          </h2>
        </ScrollReveal>

        {/* Featured Project - Vertical Card */}
        {featured && (
          <ScrollReveal delayMs={100}>
            <button
              type="button"
              onClick={() => onOpen(featured)}
              className="mt-12 w-full text-left group"
            >
              <div className="rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
                  {/* Mobile image */}
                  {featured.srcMobile && (
                    <Image
                      src={featured.srcMobile}
                      alt={featured.description?.[lang] || featured.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105 sm:hidden"
                      sizes="100vw"
                      priority
                    />
                  )}
                  {/* Desktop image */}
                  <Image
                    src={featured.src}
                    alt={featured.description?.[lang] || featured.name}
                    fill
                    className={`object-contain transition-transform duration-500 group-hover:scale-105 ${featured.srcMobile ? 'hidden sm:block' : ''}`}
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span className="badge">{lang === "en" ? "Featured" : "Destacado"}</span>
                    {featured.year && <span>{featured.year}</span>}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {featured.name}
                  </h3>
                  
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                    {featured.description?.[lang]}
                  </p>
                  
                  {featured.technologies && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featured.technologies.map((tech) => (
                        <span key={tech} className="badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {lang === "en" ? "View project" : "Ver proyecto"}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </button>
          </ScrollReveal>
        )}

        {/* Project Grid */}
        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, index) => (
              <ScrollReveal key={p.name} delayMs={150 + index * 50}>
                <button
                  type="button"
                  onClick={() => onOpen(p)}
                  className="w-full text-left group"
                >
                  <div className="rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={p.src}
                        alt={p.description?.[lang] || p.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                        {p.href && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                      </div>
                      {p.description?.[lang] && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {p.description[lang]}
                        </p>
                      )}
                      {p.technologies && (
                        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                          {p.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="badge text-[11px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
