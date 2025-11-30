"use client"
import { useEffect, useRef } from "react"
import { animate } from "animejs"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Mail, Grid3x3 } from "lucide-react"
import { texts, Lang } from "@/lib/texts"
import { safeDuration } from "@/lib/utils"
import { A11Y } from "@/lib/constants"

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
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      animate(heroRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: safeDuration(800),
        easing: "easeOutQuad",
      })
    }
  }, [])

  return (
    <section className="relative bg-codexyz-gradient text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div
          ref={heroRef}
          className="rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm ring-1 ring-white/20 px-4 py-5 sm:px-8 sm:py-8 opacity-0"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Logo
                width={180}
                height={58}
                className="h-8 sm:h-10 w-auto text-black dark:text-white"
                aria-label="Codexyz.dev logo"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 min-h-[44px] min-w-[44px]"
                aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                onClick={onToggleTheme}
                type="button"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 min-h-[44px]"
                onClick={onToggleLang}
                type="button"
                aria-label={`Change language to ${lang === "en" ? "Spanish" : "English"}`}
              >
                {t.langToggle}
              </Button>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base/relaxed opacity-95 lg:text-lg">{t.aboutDesc}</p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className={`w-full sm:w-auto h-11 rounded-full bg-white text-black hover:bg-white/90 shadow-sm transition-colors min-h-[${A11Y.MIN_TOUCH_TARGET}px]`}
              onClick={onScrollToContact}
              type="button"
            >
              <Mail className="mr-2 h-4 w-4" />
              {t.contactMe}
            </Button>
            <Button
              variant="outline"
              className={`w-full sm:w-auto h-11 rounded-full border transition-colors shadow-sm bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-white/60 dark:hover:bg-white/90 min-h-[${A11Y.MIN_TOUCH_TARGET}px]`}
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