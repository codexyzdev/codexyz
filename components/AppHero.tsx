"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Mail, Grid3x3 } from "lucide-react"
import { texts, Lang } from "@/lib/texts"

type AppHeroProps = {
  lang: Lang
  theme: "light" | "dark"
  onToggleTheme: () => void
  onToggleLang: () => void
  onScrollToContact: () => void
  onScrollToTech: () => void
}

export default function AppHero({
  lang,
  theme,
  onToggleTheme,
  onToggleLang,
  onScrollToContact,
  onScrollToTech,
}: AppHeroProps) {
  const t = texts[lang]
  return (
    <section className="relative bg-codexyz-gradient text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm ring-1 ring-white/20 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Codexyz.dev logo"
                width={180}
                height={58}
                className="h-8 w-auto"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                onClick={onToggleTheme}
                type="button"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onToggleLang} type="button">
                {t.langToggle}
              </Button>
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-base/relaxed opacity-95 sm:text-lg">{t.aboutDesc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="w-full sm:w-auto h-11 rounded-full bg-white text-black hover:bg-white/90 shadow-sm"
              onClick={onScrollToContact}
              type="button"
            >
              <Mail className="mr-2 h-4 w-4" />
              {t.contactMe}
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto h-11 rounded-full border transition-colors shadow-sm bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-white/60 dark:hover:bg-white/90"
              onClick={onScrollToTech}
              type="button"
            >
              <Grid3x3 className="mr-2 h-4 w-4" />
              {t.seeTech}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}