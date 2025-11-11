"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { animate } from "animejs"
import { safeDuration } from "@/lib/utils"
import type { TechItem } from "@/lib/tech"

type TechModalProps = {
  tech: TechItem | null
  onClose: () => void
}

export default function TechModal({ tech, onClose }: TechModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  useEffect(() => {
    if (!tech) return
    // Evita scroll del fondo y anima la entrada
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    if (dialogRef.current) {
      animate(dialogRef.current, {
        opacity: [0, 1],
        translateY: [24, 0],
        easing: "easeOutQuad",
        duration: safeDuration(220),
      })
    }
    // Establece foco inicial en el botón de cerrar
    closeBtnRef.current?.focus()

    // Trap de foco dentro del diálogo
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
    document.addEventListener("keydown", handleTab)

    return () => {
      document.removeEventListener("keydown", handleTab)
      document.body.style.overflow = prevOverflow
    }
  }, [tech])

  if (!tech) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tech-dialog-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div ref={dialogRef} className="relative w-full sm:max-w-md mx-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8">
            <Image src={tech.imgLight} alt={tech.name} fill className="dark:hidden" />
            <Image src={tech.imgDark} alt={tech.name} fill className="hidden dark:block" />
          </div>
          <h3 id="tech-dialog-title" className="text-lg font-semibold">{tech.name}</h3>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">{tech.description}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            ref={closeBtnRef}
            className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}