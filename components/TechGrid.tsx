"use client"
import Image from "next/image"
import { technologiesByLang, TechItem } from "@/lib/tech"
import { texts, Lang } from "@/lib/texts"
import { Card } from "@/components/ui/card"

type TechGridProps = {
  lang: Lang
  onSelect: (tech: TechItem) => void
  id?: string
}

export default function TechGrid({ lang, onSelect, id }: TechGridProps) {
  const t = texts[lang]
  const techs = technologiesByLang[lang]

  return (
    <section
      id={id}
      aria-labelledby="tech-title"
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-18"
    >
      <h2 id="tech-title" className="text-2xl font-semibold">
        {t.technologies}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {t.techDesc}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {techs.map((tech) => (
          <Card
            key={tech.key}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(tech)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(tech)
            }}
            aria-label={`Open ${tech.name} info`}
            className="tech-card group transition hover:bg-neutral-50 hover:shadow-sm dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
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
    </section>
  )
}