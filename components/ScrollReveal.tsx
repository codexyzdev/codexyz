"use client"

import * as React from "react"
import { cn, prefersReducedMotion } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delayMs?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)

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
      { root: null, threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
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
      style={
        {
          ["--reveal-delay" as any]: `${delayMs}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

