"use client"
import { useSyncExternalStore } from "react"

/**
 * Hook to detect media query matches
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = (onStoreChange: () => void) => {
        if (typeof window === "undefined") return () => {}

        const mediaQuery = window.matchMedia(query)
        const handler = () => onStoreChange()

        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }

    const getSnapshot = () => {
        if (typeof window === "undefined") return false
        return window.matchMedia(query).matches
    }

    return useSyncExternalStore(subscribe, getSnapshot, () => false)
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
