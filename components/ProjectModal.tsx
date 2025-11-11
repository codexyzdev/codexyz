"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { animate } from "animejs"
import { safeDuration } from "@/lib/utils"
import { ProjectItem } from "@/lib/projects"

type ProjectModalProps = {
  project: ProjectItem | null
  lang: "en" | "es"
  onClose: () => void
}

export default function ProjectModal({ project, lang, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!project) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    if (dialogRef.current) {
      animate(dialogRef.current, {
        opacity: [0, 1],
        scale: [0.98, 1],
        easing: "easeOutQuad",
        duration: safeDuration(220),
      })
    }
    closeBtnRef.current?.focus()

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleEsc)
    document.addEventListener("keydown", handleTab)

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.removeEventListener("keydown", handleTab)
      document.body.style.overflow = prevOverflow
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative w-full max-w-5xl h-[75vh] sm:h-[80vh] bg-black rounded-xl overflow-hidden ring-1 ring-white/20"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <Image src={project.src} alt={`${project.name} - imagen completa`} fill sizes="100vw" className="object-contain" priority />
        <h3 id="project-dialog-title" className="sr-only">{project.name}</h3>
        <button
          onClick={onClose}
          type="button"
          ref={closeBtnRef}
          className="absolute top-3 right-3 rounded-md bg-white/80 text-black px-3 py-1 text-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {lang === "en" ? "Close" : "Cerrar"}
        </button>
      </div>
    </div>
  )
}