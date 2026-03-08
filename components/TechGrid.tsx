"use client"
import Image from "next/image"
import { technologiesByLang, TechItem } from "@/lib/tech"
import { texts, Lang } from "@/lib/texts"
import { Card } from "@/components/ui/card"
import ScrollReveal from "@/components/ScrollReveal"
import { ChevronRight } from "lucide-react"

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
      className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20"
    >
      <ScrollReveal>
        <h2 id="tech-title" className="text-2xl font-semibold tracking-tight-enhanced">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {group.title}
                </h3>
                <div className="h-px flex-1 bg-border/60 ml-4" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    className="group glass-hover cursor-pointer bg-card/70 border-border/40 hover:border-primary/30 hover:bg-card/90 transition-all duration-300 rounded-xl"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 shrink-0 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                          <Image
                            src={tech.imgLight}
                            alt={tech.name}
                            className="dark:hidden w-6 h-6"
                            width={24}
                            height={24}
                          />
                          <Image
                            src={tech.imgDark}
                            alt={tech.name}
                            className="hidden dark:block w-6 h-6"
                            width={24}
                            height={24}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm md:text-base font-medium group-hover:text-primary transition-colors block truncate">
                            {tech.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {lang === "en" ? "Learn more" : "Saber más"}
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
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
