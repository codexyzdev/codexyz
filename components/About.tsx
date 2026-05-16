"use client"
import { texts, Lang } from "@/lib/texts"
import ScrollReveal from "@/components/ScrollReveal"

type AboutProps = {
  lang: Lang
  id?: string
}

export default function About({ lang, id }: AboutProps) {
  const t = texts[lang]

  return (
    <section id={id} className="section-padding">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary mb-4">
            {t.aboutMe}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight">
            {t.aboutDesc}
          </h2>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t.aboutDetail}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
