import * as React from "react"
import { cn } from "@/lib/utils"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4", className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn(
        "text-base font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p
      className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div className={cn("p-4", className)} {...props} />
  )
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div className={cn("p-4 pt-0", className)} {...props} />
  )
}
