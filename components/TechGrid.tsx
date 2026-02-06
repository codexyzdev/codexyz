"use client"
import Image from "next/image"
import { technologiesByLang, TechItem } from "@/lib/tech"
import { texts, Lang } from "@/lib/texts"
import { Card } from "@/components/ui/card"
import ScrollReveal from "@/components/ScrollReveal"

type TechGridProps = {
  lang: Lang
  onSelect: (tech: TechItem) => void
  id?: string
}

export default function TechGrid({ lang, onSelect, id }: TechGridProps) {
  const t = texts[lang]
  const techs = technologiesByLang[lang]

  const groups: Array<{ title: string; keys: string[] }> = [
    {
      title: lang === "en" ? "Frontend" : "Frontend",
      keys: ["nextjs", "react", "tailwind"],
    },
    {
      title: lang === "en" ? "Backend" : "Backend",
      keys: ["supabase", "nodejs"],
    },
    {
      title: lang === "en" ? "Languages & Tools" : "Lenguajes y herramientas",
      keys: ["typescript", "javascript", "html5", "zod"],
    },
  ]

  return (
    <section
      id={id}
      aria-labelledby="tech-title"
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20"
    >
      <ScrollReveal>
        <h2 id="tech-title" className="text-2xl font-semibold">
          {t.technologies}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t.techDesc}
        </p>
      </ScrollReveal>

      <div className="mt-8 grid gap-8">
        {groups.map((group, groupIndex) => {
          const items = techs.filter((t) => group.keys.includes(t.key))
          if (!items.length) return null

          return (
            <ScrollReveal key={group.title} delayMs={groupIndex * 90}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground/90">
                  {group.title}
                </h3>
                <div className="h-px flex-1 bg-border/60 ml-4" aria-hidden="true" />
              </div>

              <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((tech) => (
                  <Card
                    key={tech.key}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect(tech)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onSelect(tech)
                    }}
                    aria-label={`Open ${tech.name} info`}
                    className="group transition-all duration-300 hover:bg-card/90 hover:shadow-md hover:-translate-y-0.5 dark:hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 bg-card/70 backdrop-blur-sm"
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 shrink-0">
                          <Image
                            src={tech.imgLight}
                            alt={tech.name}
                            className="dark:hidden"
                            fill
                            sizes="32px"
                          />
                          <Image
                            src={tech.imgDark}
                            alt={tech.name}
                            className="hidden dark:block"
                            fill
                            sizes="32px"
                          />
                        </div>
                        <span className="text-sm md:text-base font-medium group-hover:underline">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
