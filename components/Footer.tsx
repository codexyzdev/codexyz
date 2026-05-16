"use client"
import { Lang } from "@/lib/texts"

type FooterProps = {
  lang: Lang
}

export default function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Alejandro Baez
          </p>
          <p className="text-sm text-muted-foreground">
            codexyz.dev
          </p>
        </div>
      </div>
    </footer>
  )
}
