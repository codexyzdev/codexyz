"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { safeDuration } from "@/lib/utils";
import { ProjectItem } from "@/lib/projects";
import { ExternalLink, X, Calendar, Briefcase } from "lucide-react";

type ProjectModalProps = {
  project: ProjectItem | null;
  lang: "en" | "es";
  onClose: () => void;
};

export default function ProjectModal({
  project,
  lang,
  onClose,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

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
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={lang === "en" ? "Close" : "Cerrar"}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative w-full max-w-5xl max-h-[calc(100svh-2rem)] overflow-hidden rounded-3xl border border-border bg-background shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-6 py-5 border-b border-border">
          <div className="min-w-0 flex-1">
            <h3
              id="project-dialog-title"
              className="text-xl font-semibold text-foreground"
            >
              {project.name}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              {project.role?.[lang] && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {project.role[lang]}
                </span>
              )}
              {project.year && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.year}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {lang === "en" ? "View Live" : "Ver en vivo"}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={onClose}
              aria-label={lang === "en" ? "Close" : "Cerrar"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Image */}
            <div className="relative bg-muted/50">
              <div className="relative h-64 sm:h-80 lg:h-[500px]">
                {project.srcMobile && (
                  <Image
                    src={project.srcMobile}
                    alt={project.description?.[lang] || project.name}
                    fill
                    className="object-contain p-4 sm:hidden"
                    sizes="100vw"
                    priority
                  />
                )}
                <Image
                  src={project.src}
                  alt={project.description?.[lang] || project.name}
                  fill
                  className={`object-contain p-4 ${project.srcMobile ? 'hidden sm:block' : ''}`}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Description */}
              {project.description?.[lang] && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.description[lang]}
                </p>
              )}

              {/* Technologies */}
              {!!project.technologies?.length && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    {lang === "en" ? "Technologies" : "Tecnologías"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {!!project.highlights?.[lang]?.length && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    {lang === "en" ? "Key Features" : "Funcionalidades clave"}
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights[lang].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
