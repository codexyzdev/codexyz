"use client"
import { useState, useEffect } from "react"

/**
 * Hook to detect media query matches
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        // Check if window is available (client-side)
        if (typeof window === "undefined") return

        const mediaQuery = window.matchMedia(query)

        // Set initial value
        setMatches(mediaQuery.matches)

        // Create event listener
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handler)
            return () => mediaQuery.removeEventListener("change", handler)
        }
        // Fallback for older browsers
        else {
            // @ts-ignore - addListener is deprecated but needed for older browsers
            mediaQuery.addListener(handler)
            // @ts-ignore
            return () => mediaQuery.removeListener(handler)
        }
    }, [query])

    return matches
}

/**
 * Hook to detect if user prefers dark color scheme
 */
export function usePrefersDarkMode(): boolean {
    return useMediaQuery("(prefers-color-scheme: dark)")
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)")
}

/**
 * Hook to detect mobile viewport
 */
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 768px)")
}

/**
 * Hook to detect tablet viewport
 */
export function useIsTablet(): boolean {
    return useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
}

/**
 * Hook to detect desktop viewport
 */
export function useIsDesktop(): boolean {
    return useMediaQuery("(min-width: 1025px)")
}
