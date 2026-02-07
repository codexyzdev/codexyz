"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Mail,
  Grid3x3,
  ArrowDownRight,
  FolderKanban,
} from "lucide-react";
import { texts, Lang } from "@/lib/texts";
import { safeDuration } from "@/lib/utils";
import { A11Y } from "@/lib/constants";

type AppHeroProps = {
  lang: Lang;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onScrollToTech: () => void;
};

export default function AppHero({
  lang,
  theme,
  onToggleTheme,
  onToggleLang,
  onScrollToProjects,
  onScrollToContact,
  onScrollToTech,
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
      duration: safeDuration(820),
      easing: "easeOutQuad",
      delay: stagger(90),
    });
  }, []);

  return (
    <section className="relative overflow-hidden  min-h-screen">
      <div className="absolute inset-0 -z-10 bg-codexyz-gradient" />
      <div
        aria-hidden
        className="hidden sm:block absolute -z-10 left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="hidden sm:block absolute -z-10 -left-24 top-16 h-[420px] w-[420px] rounded-full bg-black/15 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
        <div
          ref={heroRef}
          className="opacity-0 rounded-3xl bg-white/6 dark:bg-black/20 backdrop-blur-sm sm:backdrop-blur-md ring-1 ring-white/18 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
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
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  {lang === "en"
                    ? "Open to projects"
                    : "Disponible para proyectos"}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto hero-reveal">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 min-h-[44px] min-w-[44px]"
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
                  className="text-white hover:bg-white/10 min-h-[44px]"
                  onClick={onToggleLang}
                  type="button"
                  aria-label={`Change language to ${lang === "en" ? "Spanish" : "English"}`}
                >
                  {t.langToggle}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 items-start">
              <div>
                <p className="hero-reveal text-xs sm:text-sm text-white/85">
                  {t.heroDesc}
                </p>
                <h1 className="hero-reveal mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="text-white">{t.heroTitle}</span>{" "}
                  <span className="block mt-2 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    {lang === "en"
                      ? "Modern web apps. Clean UX."
                      : "Apps modernas. UX limpia."}
                  </span>
                </h1>

                <p className="hero-reveal mt-4 max-w-2xl text-sm sm:text-base/relaxed text-white/90">
                  {t.aboutDesc}
                </p>

                <div className="hero-reveal mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button
                    className="w-full sm:w-auto h-11 rounded-full bg-white text-black hover:bg-white/92 shadow-sm transition-colors min-h-[44px]"
                    onClick={onScrollToContact}
                    type="button"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t.contactMe}
                    <ArrowDownRight className="ml-2 h-4 w-4 opacity-70" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 rounded-full border transition-colors shadow-sm bg-black/25 text-white border-white/25 hover:bg-black/35 dark:bg-white/12 dark:hover:bg-white/18 min-h-[44px]"
                    onClick={onScrollToProjects}
                    type="button"
                  >
                    <FolderKanban className="mr-2 h-4 w-4" />
                    {lang === "en" ? "Projects" : "Proyectos"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 rounded-full border transition-colors shadow-sm bg-black/25 text-white border-white/25 hover:bg-black/35 dark:bg-white/12 dark:hover:bg-white/18 min-h-[44px]"
                    onClick={onScrollToTech}
                    type="button"
                    style={{ minHeight: A11Y.MIN_TOUCH_TARGET }}
                  >
                    <Grid3x3 className="mr-2 h-4 w-4" />
                    {t.seeTech}
                  </Button>
                </div>
              </div>

              <div className="hero-reveal hidden lg:block">
                <div className="w-[320px] rounded-2xl bg-white/8 ring-1 ring-white/18 p-4">
                  <div className="text-xs text-white/75">
                    {lang === "en" ? "Focus" : "Enfoque"}
                  </div>
                  <div className="mt-2 grid gap-2 text-sm text-white">
                    <div className="flex items-center justify-between rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/12">
                      <span>{lang === "en" ? "Frontend" : "Frontend"}</span>
                      <span className="text-white/80">React · Next.js</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/12">
                      <span>{lang === "en" ? "Backend" : "Backend"}</span>
                      <span className="text-white/80">Supabase · APIs</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/8 px-3 py-2 ring-1 ring-white/12">
                      <span>{lang === "en" ? "UX" : "UX"}</span>
                      <span className="text-white/80">
                        {lang === "en"
                          ? "Fast, clear, accessible"
                          : "Rápida, clara, accesible"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-reveal flex items-center justify-between border-t border-white/12 pt-4">
              <button
                type="button"
                onClick={onScrollToProjects}
                className="inline-flex items-center gap-2 text-xs text-white/85 hover:text-white transition-colors min-h-[44px]"
              >
                {lang === "en" ? "Scroll to work" : "Ver trabajo"}
                <ArrowDownRight className="h-4 w-4 opacity-70" />
              </button>
              <span className="text-xs text-white/70">{t.cardDesc}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
