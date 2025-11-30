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

/**
 * Validates an email address using a comprehensive regex pattern
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Formats a URL to ensure it has a protocol
 * @param url - URL to format
 * @returns Formatted URL with protocol
 */
export function formatUrl(url: string): string {
  if (!url) return ""

  const trimmed = url.trim()
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed
  }

  return `https://${trimmed}`
}

/**
 * Detects if the current device is mobile based on user agent
 * Note: For responsive behavior, use CSS media queries or useMediaQuery hook instead
 * @returns true if mobile device, false otherwise
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined" || !navigator) return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Detects if the device supports touch
 * @returns true if touch is supported, false otherwise
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - msMaxTouchPoints is for IE
    navigator.msMaxTouchPoints > 0
  )
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
