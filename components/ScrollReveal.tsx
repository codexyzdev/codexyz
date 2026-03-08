"use client"

import * as React from "react"
import { cn, prefersReducedMotion } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right" | "scale"
  duration?: number
}

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  once = true,
  direction = "up",
  duration = 700,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translate3d(0, 24px, 0)"
      case "down":
        return "translate3d(0, -24px, 0)"
      case "left":
        return "translate3d(24px, 0, 0)"
      case "right":
        return "translate3d(-24px, 0, 0)"
      case "scale":
        return "scale(0.92)"
      default:
        return "translate3d(0, 24px, 0)"
    }
  }

  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      data-reveal
      data-visible={visible ? "true" : "false"}
      className={cn("reveal", className)}
      style={{
        "--reveal-delay": `${delayMs}ms`,
        "--reveal-duration": `${duration}ms`,
        "--reveal-transform": getInitialTransform(),
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
