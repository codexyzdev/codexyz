"use client"
import Image from "next/image"
import { texts, Lang } from "@/lib/texts"
import { useState, useEffect } from "react"

type HeroProps = {
  lang: Lang
  onToggleLang: () => void
  onScrollToTech: () => void
}

export default function Hero({ lang, onToggleLang, onScrollToTech }: HeroProps) {
  const t = texts[lang]
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
        <div className="flex justify-center md:justify-start">
          <Image
            src={lang === "en" ? "/mylogo.svg" : "/mylogo.svg"}
            width={120}
            height={120}
            alt="Logo"
            priority
          />
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold">{t.heroTitle}</h1>
            <button
              aria-label="Toggle language"
              className="px-3 py-1 text-sm rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={onToggleLang}
            >
              {t.langToggle}
            </button>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">{t.aboutDesc}</p>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
              onClick={onScrollToTech}
            >
              {t.seeTech}
            </button>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.cardDesc}
            </span>
          </div>
        </div>
      </div>

      {/* Optional subtle overlay for gradient contrast */}
      {isMounted && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="h-40 bg-gradient-to-b from-transparent to-neutral-100 dark:to-neutral-900" />
        </div>
      )}
    </section>
  )
}