"use client"
import Image from "next/image"
import { useEffect } from "react"
import type { TechItem } from "@/lib/tech"

type TechModalProps = {
  tech: TechItem | null
  onClose: () => void
}

export default function TechModal({ tech, onClose }: TechModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!tech) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${tech.name} details`}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full sm:max-w-md mx-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8">
            <Image src={tech.imgLight} alt={tech.name} fill className="dark:hidden" />
            <Image src={tech.imgDark} alt={tech.name} fill className="hidden dark:block" />
          </div>
          <h3 className="text-lg font-semibold">{tech.name}</h3>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">{tech.description}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}