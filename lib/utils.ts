import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Detecta preferencias del usuario para reducir movimiento
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Ayuda a ajustar duración de animaciones respetando reduce-motion
export function safeDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration
}
