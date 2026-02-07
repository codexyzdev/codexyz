"use client"
import { useSyncExternalStore } from "react"

export interface ScrollPosition {
    x: number
    y: number
}

const SERVER_SCROLL_POSITION: ScrollPosition = { x: 0, y: 0 }
let cachedScrollPosition: ScrollPosition = SERVER_SCROLL_POSITION
let cachedScrollDirection: "up" | "down" | "none" = "none"
let lastScrollDirectionY = 0

function readScrollPosition(): ScrollPosition {
    if (typeof window === "undefined") return SERVER_SCROLL_POSITION
    const x = window.scrollX
    const y = window.scrollY
    if (cachedScrollPosition.x === x && cachedScrollPosition.y === y) return cachedScrollPosition
    cachedScrollPosition = { x, y }
    return cachedScrollPosition
}

/**
 * Hook to track scroll position
 * @param throttleMs - Throttle delay in milliseconds (default: 100)
 * @returns Current scroll position {x, y}
 */
export function useScrollPosition(throttleMs: number = 100): ScrollPosition {
    const subscribe = (onStoreChange: () => void) => {
        if (typeof window === "undefined") return () => {}

        let timeoutId: number | null = null
        const handleScroll = () => {
            if (timeoutId !== null) return
            timeoutId = window.setTimeout(() => {
                timeoutId = null
                onStoreChange()
            }, throttleMs)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            if (timeoutId !== null) window.clearTimeout(timeoutId)
            window.removeEventListener("scroll", handleScroll)
        }
    }

    return useSyncExternalStore(subscribe, readScrollPosition, () => SERVER_SCROLL_POSITION)
}

/**
 * Hook to detect if user has scrolled past a certain threshold
 * @param threshold - Scroll Y threshold in pixels (default: 100)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrolledPast(threshold: number = 100): boolean {
    const { y } = useScrollPosition()
    return y > threshold
}

/**
 * Hook to detect scroll direction
 * @returns "up" | "down" | "none"
 */
export function useScrollDirection(): "up" | "down" | "none" {
    const subscribe = (onStoreChange: () => void) => {
        if (typeof window === "undefined") return () => {}

        let timeoutId: number | null = null
        const handleScroll = () => {
            if (timeoutId !== null) return
            timeoutId = window.setTimeout(() => {
                timeoutId = null
                const currentY = window.scrollY
                cachedScrollDirection =
                    currentY > lastScrollDirectionY
                        ? "down"
                        : currentY < lastScrollDirectionY
                            ? "up"
                            : "none"
                lastScrollDirectionY = currentY
                onStoreChange()
            }, 100)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            if (timeoutId !== null) window.clearTimeout(timeoutId)
            window.removeEventListener("scroll", handleScroll)
        }
    }

    const getSnapshot = () => {
        if (typeof window === "undefined") return "none"
        return cachedScrollDirection
    }

    return useSyncExternalStore(subscribe, getSnapshot, () => "none")
}
