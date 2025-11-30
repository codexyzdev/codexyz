"use client"
import { useState, useEffect } from "react"

export interface ScrollPosition {
    x: number
    y: number
}

/**
 * Hook to track scroll position
 * @param throttleMs - Throttle delay in milliseconds (default: 100)
 * @returns Current scroll position {x, y}
 */
export function useScrollPosition(throttleMs: number = 100): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        if (typeof window === "undefined") return

        let timeoutId: NodeJS.Timeout | null = null

        const handleScroll = () => {
            if (timeoutId) return

            timeoutId = setTimeout(() => {
                setScrollPosition({
                    x: window.scrollX,
                    y: window.scrollY,
                })
                timeoutId = null
            }, throttleMs)
        }

        // Set initial position
        setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
        })

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [throttleMs])

    return scrollPosition
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
    const [direction, setDirection] = useState<"up" | "down" | "none">("none")
    const [lastY, setLastY] = useState(0)

    useEffect(() => {
        if (typeof window === "undefined") return

        let timeoutId: NodeJS.Timeout | null = null

        const handleScroll = () => {
            if (timeoutId) return

            timeoutId = setTimeout(() => {
                const currentY = window.scrollY

                if (currentY > lastY) {
                    setDirection("down")
                } else if (currentY < lastY) {
                    setDirection("up")
                } else {
                    setDirection("none")
                }

                setLastY(currentY)
                timeoutId = null
            }, 100)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [lastY])

    return direction
}
