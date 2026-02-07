"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { animate } from "animejs";
import { cn, safeDuration } from "@/lib/utils";
import { ProjectItem, projects } from "@/lib/projects";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

type ProjectModalProps = {
  project: ProjectItem | null;
  lang: "en" | "es";
  onClose: () => void;
  onNavigate: (project: ProjectItem) => void;
};

export default function ProjectModal({
  project,
  lang,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const nav = useMemo(() => {
    if (!project) return null;
    const index = projects.findIndex((p) => p.name === project.name);
    if (index === -1) return null;
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    return { index, prev, next };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialogRef.current) {
      animate(dialogRef.current, {
        opacity: [0, 1],
        scale: [0.98, 1],
        easing: "easeOutQuad",
        duration: safeDuration(220),
      });
    }
    closeBtnRef.current?.focus();

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleArrows(e: KeyboardEvent) {
      if (!nav) return;
      if (e.key === "ArrowLeft") onNavigate(nav.prev);
      if (e.key === "ArrowRight") onNavigate(nav.next);
    }
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("keydown", handleArrows);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleArrows);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose, nav, onNavigate]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={lang === "en" ? "Close" : "Cerrar"}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative w-full max-w-5xl max-h-[calc(100svh-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-background/75 backdrop-blur-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <div className="sticky top-0 z-10 flex shrink-0 items-start justify-between gap-4 border-b border-border/60 bg-background/75 backdrop-blur-xl px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h3
              id="project-dialog-title"
              className="text-lg sm:text-xl font-semibold tracking-tight"
            >
              {project.name}
            </h3>
            {project.role?.[lang] && (
              <div className="mt-1 text-sm text-muted-foreground">
                {lang === "en" ? "Role:" : "Rol:"} {project.role[lang]}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 rounded-full",
                )}
              >
                {lang === "en" ? "Live" : "Ver"}
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <Button
              ref={closeBtnRef}
              type="button"
              variant="ghost"
              className="h-10 w-10 rounded-full"
              onClick={onClose}
              aria-label={lang === "en" ? "Close" : "Cerrar"}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0">
            <div className="relative bg-muted/40">
              <div className="relative h-60 sm:h-[340px] lg:h-[520px]">
                <Image
                  src={project.src}
                  alt={project.description?.[lang] || project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="px-4 py-5 sm:px-6">
              {project.description?.[lang] && (
                <p className="text-sm sm:text-base text-foreground/90">
                  {project.description[lang]}
                </p>
              )}

              {!!project.technologies?.length && (
                <div className="mt-5">
                  <div className="text-xs font-medium text-muted-foreground">
                    {lang === "en" ? "Tech" : "Tecnologías"}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!!project.highlights?.[lang]?.length && (
                <div className="mt-5">
                  <div className="text-xs font-medium text-muted-foreground">
                    {lang === "en" ? "Highlights" : "Puntos clave"}
                  </div>
                  <ul className="mt-2 space-y-2">
                    {project.highlights[lang].map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {nav && (
                <div className="mt-6 flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-full"
                    onClick={() => onNavigate(nav.prev)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {lang === "en" ? "Prev" : "Anterior"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-full"
                    onClick={() => onNavigate(nav.next)}
                  >
                    {lang === "en" ? "Next" : "Siguiente"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
