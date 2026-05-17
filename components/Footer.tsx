"use client"
import { SOCIAL } from "@/lib/constants"
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Alejandro Baez
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <span className="text-sm text-muted-foreground">
              codexyz.dev
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
