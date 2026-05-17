"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { safeDuration } from "@/lib/utils";
import { ProjectItem } from "@/lib/projects";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
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
        className="relative w-full max-w-4xl max-h-[calc(100svh-2rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-4">
          <div className="min-w-0">
            <h3
              id="project-dialog-title"
              className="text-lg font-semibold text-foreground"
            >
              {project.name}
            </h3>
            {project.role?.[lang] && (
              <p className="mt-1 text-sm text-muted-foreground">
                {project.role[lang]}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {lang === "en" ? "Live" : "Ver"}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <Button
              ref={closeBtnRef}
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onClose}
              aria-label={lang === "en" ? "Close" : "Cerrar"}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative bg-muted">
              <div className="relative h-64 sm:h-80 lg:h-[480px]">
                <Image
                  src={project.src}
                  alt={project.description?.[lang] || project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="p-6">
              {project.description?.[lang] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description[lang]}
                </p>
              )}

              {!!project.technologies?.length && (
                <div className="mt-6">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    {lang === "en" ? "Tech" : "Tecnologías"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="badge text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!!project.highlights?.[lang]?.length && (
                <div className="mt-6">
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    {lang === "en" ? "Highlights" : "Puntos clave"}
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights[lang].map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
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
