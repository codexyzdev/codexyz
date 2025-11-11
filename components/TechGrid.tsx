"use client"
import Image from "next/image"
import { technologiesByLang, TechItem } from "@/lib/tech"
import { texts, Lang } from "@/lib/texts"

type TechGridProps = {
  lang: Lang
  onSelect: (tech: TechItem) => void
}

export default function TechGrid({ lang, onSelect }: TechGridProps) {
  const t = texts[lang]
  const techs = technologiesByLang[lang]

  return (
    <section aria-labelledby="tech-title" className="mt-10">
      <h2 id="tech-title" className="text-xl md:text-2xl font-semibold mb-2">
        {t.technologies}
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {t.techDesc}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {techs.map((tech) => (
          <button
            key={tech.key}
            className="tech-card group rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            onClick={() => onSelect(tech)}
            aria-label={`Open ${tech.name} info`}
          >
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
          </button>
        ))}
      </div>
    </section>
  )
}