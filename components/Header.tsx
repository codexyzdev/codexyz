"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import { texts, Lang } from "@/lib/texts"
import Logo from "@/components/logo"

type HeaderProps = {
  lang: Lang
  theme: "light" | "dark"
  onToggleTheme: () => void
  onToggleLang: () => void
  onScrollToProjects: () => void
  onScrollToContact: () => void
}

export default function Header({
  lang,
  theme,
  onToggleTheme,
  onToggleLang,
  onScrollToProjects,
  onScrollToContact,
}: HeaderProps) {
  const t = texts[lang]
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (action: () => void) => {
    setIsMobileMenuOpen(false)
    action()
  }

  const trapMenuFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return

    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
      trapMenuFocus(e)
    }

    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [isMobileMenuOpen, trapMenuFocus])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 focus-ring rounded-full"
            aria-label="Scroll to top"
          >
            <Logo
              width={120}
              height={40}
              className="h-6 w-auto"
              aria-label="Codexyz.dev logo"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={onScrollToProjects}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              {t.projects}
            </button>
            <button
              type="button"
              onClick={onScrollToContact}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              {t.contact}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hidden sm:flex"
              onClick={onToggleLang}
              aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
            >
              <span className="text-xs font-medium">{lang === "en" ? "ES" : "EN"}</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div ref={menuRef} className="sm:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-2 gap-1">
            <button
              type="button"
              onClick={() => handleNavClick(onScrollToProjects)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted text-left"
            >
              {t.projects}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(onScrollToContact)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted text-left"
            >
              {t.contact}
            </button>
            <div className="h-px bg-border my-1" />
            <button
              type="button"
              onClick={() => handleNavClick(onToggleLang)}
              className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted text-left"
            >
              {lang === "en" ? "Español" : "English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
