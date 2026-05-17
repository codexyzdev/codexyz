import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function safeDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}
