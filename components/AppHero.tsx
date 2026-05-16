"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Mail,
  ArrowDownRight,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { texts, Lang } from "@/lib/texts";
import { safeDuration } from "@/lib/utils";

type AppHeroProps = {
  lang: Lang
  theme: "light" | "dark"
  onToggleTheme: () => void
  onToggleLang: () => void
  onScrollToProjects: () => void
  onScrollToContact: () => void
}

export default function AppHero({
  lang,
  theme,
  onToggleTheme,
  onToggleLang,
  onScrollToProjects,
  onScrollToContact,
}: AppHeroProps) {
  const t = texts[lang];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    animate(el, {
      opacity: [0, 1],
      duration: safeDuration(420),
      easing: "easeOutQuad",
    });

    animate(el.querySelectorAll(".hero-reveal"), {
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.95, 1],
      duration: safeDuration(820),
      easing: "easeOutQuad",
      delay: stagger(90),
    });

    animate(el.querySelectorAll(".hero-reveal-slow"), {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: safeDuration(1000),
      easing: "easeOutQuad",
      delay: stagger(150),
    });
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 -z-10 bg-codexyz-gradient" />
      
      <div
        aria-hidden
        className="hidden sm:block absolute -z-10 left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        aria-hidden
        className="hidden sm:block absolute -z-10 -left-24 top-16 h-[420px] w-[420px] rounded-full bg-black/15 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
        <div
          ref={heroRef}
          className="opacity-0 rounded-3xl glass-light shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
        >
          <div className="flex flex-col gap-6 px-4 py-5 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 hero-reveal">
                <Logo
                  width={190}
                  height={62}
                  className="h-8 sm:h-10 w-auto text-white"
                  aria-label="Codexyz.dev logo"
                />
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  {lang === "en"
                    ? "Open to projects"
                    : "Disponible para proyectos"}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto hero-reveal">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 min-h-11 min-w-11 hover-scale"
                  aria-label={
                    theme === "dark"
                      ? "Cambiar a modo claro"
                      : "Cambiar a modo oscuro"
                  }
                  onClick={onToggleTheme}
                  type="button"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 min-h-11 hover-scale"
                  onClick={onToggleLang}
                  type="button"
                  aria-label={`Change language to ${lang === "en" ? "Spanish" : "English"}`}
                >
                  {t.langToggle}
                </Button>
              </div>
            </div>

            <div>
              <p className="hero-reveal text-xs sm:text-sm text-white/85 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-teal-300" />
                {t.heroDesc}
              </p>
              <h1 className="hero-reveal mt-3 text-3xl font-semibold tracking-tight-enhanced sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-white">{t.heroTitle}</span>{" "}
                <span className="block mt-2 bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  {t.heroSubtitle}
                </span>
              </h1>

              <div className="hero-reveal mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-16 h-16 sm:w-16 sm:h-16 shrink-0 rounded-full p-0.5 bg-gradient-to-br from-[var(--color-azul)] via-[var(--color-teal)] to-[var(--color-azul)]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-azul)] opacity-50 blur-sm" />
                  <div className="relative w-full h-full rounded-full bg-black/60 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-2xl sm:text-2xl font-bold text-white">AB</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base/relaxed text-white/90 line-height-relaxed max-w-xl">
                  {t.aboutDesc}
                </p>
              </div>

              <div className="hero-reveal mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button
                  className="w-full sm:w-auto h-11 rounded-full bg-white text-black hover:bg-white/92 shadow-sm transition-all duration-300 min-h-11 hover-lift btn-glow"
                  onClick={onScrollToContact}
                  type="button"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t.contactMe}
                  <ArrowDownRight className="ml-2 h-4 w-4 opacity-70" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-11 rounded-full border transition-all duration-300 shadow-sm bg-black/25 text-white border-white/25 hover:bg-black/35 dark:bg-white/12 dark:hover:bg-white/18 min-h-11 hover-lift"
                  onClick={onScrollToProjects}
                  type="button"
                >
                  <FolderKanban className="mr-2 h-4 w-4" />
                  {t.seeProjects}
                </Button>
              </div>
            </div>

            <div className="hero-reveal-slow flex items-center justify-between border-t border-white/12 pt-4">
              <button
                type="button"
                onClick={onScrollToProjects}
                className="inline-flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors min-h-11 hover-lift"
              >
                {lang === "en" ? "Scroll to work" : "Ver trabajo"}
                <ArrowDownRight className="h-4 w-4 opacity-70" />
              </button>
              <span className="text-xs text-white/70">{t.heroSubtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
