"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Terminal } from "lucide-react";
import { texts, Lang } from "@/lib/texts";
import { safeDuration } from "@/lib/utils";

type HeroProps = {
  lang: Lang;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
};

export default function Hero({
  lang,
  onScrollToProjects,
  onScrollToContact,
}: HeroProps) {
  const t = texts[lang];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    animate(el.querySelectorAll(".hero-reveal"), {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: safeDuration(600),
      easing: "easeOutQuad",
      delay: stagger(100),
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      {/* Subtle gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10"
      />

      <div ref={heroRef} className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="hero-reveal inline-flex items-center gap-2 badge mb-8">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {lang === "en" ? "Open to projects" : "Disponible para proyectos"}
        </div>

        {/* Name */}
        <div className="hero-reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <Terminal className="h-5 w-5 text-primary hidden sm:block" />
            <span className="text-sm font-mono text-muted-foreground">
              {lang === "en" ? "// developer" : "// desarrollador"}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-foreground">{t.heroTitle.split(" ")[0]}</span>{" "}
            <span className="text-gradient">{t.heroTitle.split(" ").slice(1).join(" ")}</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-reveal mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>

        {/* Description */}
        <p className="hero-reveal mt-4 text-base text-muted-foreground/80 max-w-xl mx-auto">
          {t.heroSubtitle}
        </p>

        {/* CTAs */}
        <div className="hero-reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full px-8 h-12 font-medium"
            onClick={onScrollToContact}
          >
            {t.contactMe}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 font-medium"
            onClick={onScrollToProjects}
          >
            {t.seeProjects}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={onScrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={lang === "en" ? "Scroll to projects" : "Ir a proyectos"}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
