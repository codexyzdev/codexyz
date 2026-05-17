# Spec: Portfolio Improvements — a11y, Cleanup & UX

## Objective

Improve the codexyz.dev portfolio across three axes: accessibility compliance, code hygiene, and structural correctness. The site already works and looks good — this spec is about closing gaps, not adding features.

**User:** Alejandro Baez (the developer maintaining this portfolio).
**Success:** The site passes a manual a11y audit, has zero dead code, and the HTML is structurally valid.

---

## ASSUMPTIONS I'M MAKING

1. We keep `mailto:` as the contact mechanism (no server-side form submission).
2. We do NOT restructure `page.tsx` to use Server Components — that's a larger refactor outside this scope.
3. We remove dead code rather than "using it later."
4. We do NOT add a testing framework (no tests exist today).
5. The existing animation library (animejs) stays as-is.
6. `react-icons` is confirmed unused (zero imports) — will be removed.
7. Focus trap uses manual implementation (useRef + keydown listener) — no external dependency needed.
8. Blur placeholder is dead code — remove `BLUR_DATA_URL` constant and `image-utils.ts` entirely.

→ All decisions confirmed. Proceeding.

---

## Tech Stack

- Next.js 16.0.10 (App Router)
- React 19.2.0
- TypeScript 5.x (strict)
- Tailwind CSS 4 + shadcn/ui (new-york)
- animejs 4.2.2
- lucide-react 0.553.0
- Focus trap: manual (useRef + keydown, no dependency)

---

## Commands

```
Dev:     pnpm dev
Build:   pnpm build
Lint:    pnpm lint
```

---

## Project Structure

```
app/
  layout.tsx          → Root layout (metadata, fonts, skip-link)
  page.tsx            → Single-page app (all sections)
  globals.css         → Tailwind + CSS variables
components/
  Header.tsx          → Navbar + mobile menu
  Hero.tsx            → Hero section
  About.tsx           → About section
  Projects.tsx        → Projects grid
  ProjectModal.tsx    → Project detail modal
  Contact.tsx         → Contact form + links
  Footer.tsx          → Footer
  ScrollReveal.tsx    → Scroll animation wrapper
  logo.tsx            → Animated SVG logo
  TerminalIcon.tsx    → Terminal cursor icon
  ui/                 → shadcn primitives
lib/
  constants.ts        → Config constants
  texts.ts            → Bilingual text dictionary
  projects.ts         → Project data
  utils.ts            → Utility functions
  analytics.ts        → Analytics stub
```

---

## Code Style

```tsx
// Existing conventions to follow:
// - "use client" only when needed
// - cn() for class merging
// - Tailwind utilities over custom CSS
// - Bilingual: all user-facing text via texts[lang].key or inline ternary
// - ARIA attributes on all interactive elements
// - safeDuration() wraps all animejs durations
// - Props typed with inline type or type alias at top of file

// Good:
<button
  aria-label={lang === "en" ? "Close" : "Cerrar"}
  className="inline-flex items-center justify-center h-10 w-10 rounded-full"
>
  <X className="h-5 w-5" />
</button>
```

---

## Changes by Category

### A. Accessibility (a11y)

| # | Issue | Fix | Files |
|---|-------|-----|-------|
| A1 | No focus trap in ProjectModal | Add focus trap: Tab cycles within modal, Shift+Tab cycles back | `components/ProjectModal.tsx` |
| A2 | No `aria-expanded` on mobile menu button | Add `aria-expanded={mobileMenuOpen}` to hamburger `<button>` | `components/Header.tsx` |
| A3 | `TerminalIcon` ignores reduced motion | Check `prefersReducedMotion()` — if true, skip interval, show cursor static | `components/TerminalIcon.tsx` |
| A4 | `animate-bounce` on scroll chevron | Replace with `motion-safe:animate-bounce` Tailwind class | `components/Hero.tsx` |
| A5 | No `aria-describedby` on form inputs | Link each input to its error via `aria-describedby="error-{field}"`, add matching `id` to error `<p>` | `components/Contact.tsx` |
| A6 | Backdrop button has no `aria-label` | Add `aria-label={lang === "en" ? "Close" : "Cerrar"}` to backdrop button | `components/ProjectModal.tsx` |
| A7 | No focus trap in mobile menu | Add focus trap when mobile menu is open | `components/Header.tsx` |

### B. Structural / HTML

| # | Issue | Fix | Files |
|---|-------|-----|-------|
| B1 | Nested `<main>` tags | Remove `<main>` from `page.tsx`, keep only the one in `layout.tsx` | `app/page.tsx` |
| B2 | No `loading.tsx` | Add `app/loading.tsx` with a simple skeleton/spinner | `app/loading.tsx` (new) |
| B3 | No `error.tsx` | Add `app/error.tsx` with retry button | `app/error.tsx` (new) |

### C. Cleanup — Dead Code

| # | Item | Action | Files |
|---|------|--------|-------|
| C1 | `react-icons` never imported | Remove from `package.json` | `package.json` |
| C2 | `skeleton.tsx` components never used | Delete file | `components/ui/skeleton.tsx` |
| C3 | `image-utils.ts` functions never called | Delete file | `lib/image-utils.ts` |
| C4 | Dead constants (`ANIMATION`, `BREAKPOINTS`, `COLORS`, `A11Y`, `IMAGE`, `SOCIAL.LINKEDIN`, `SOCIAL.TWITTER`) | Remove unused exports from constants | `lib/constants.ts` |
| C5 | Dead utils (`debounce`, `isMobileDevice`, `formatUrl`, `isTouchDevice`, `truncateText`) | Remove from utils | `lib/utils.ts` |
| C7 | Unused images in `public/` | Delete: `age-calculator-app-by-codexyz.vercel.app.png`, `devpulse-seven.vercel.app.png`, `financiamientos.png`, `chess-clock.png`, `finanzas-pro-mobile.png`, `los-tiburones-mobile.png`, `logo.svg`, `logoss.svg` | `public/` |
| C8 | `me.md` informal notes | Delete file | `me.md` |

### D. Component Fixes

| # | Issue | Fix | Files |
|---|-------|-----|-------|
| D1 | `Card.tsx` uses hardcoded `neutral-200/800` | Replace with CSS variable tokens (`border`, `card`, `text-card-foreground`) | `components/ui/card.tsx` |
| D2 | `content-visibility: auto` utility defined but never applied | Apply `.cv-auto` to long content sections (projects grid, modal content) | `components/Projects.tsx`, `components/ProjectModal.tsx` |

---

## Success Criteria

- [ ] `pnpm build` passes with zero errors
- [ ] `pnpm lint` passes with zero warnings
- [ ] Modal focus trap works: Tab never escapes the dialog
- [ ] Mobile menu focus trap works: Tab never escapes the menu
- [ ] Screen reader announces menu open/close state (`aria-expanded`)
- [ ] Screen reader announces form errors linked to inputs (`aria-describedby`)
- [ ] `prefers-reduced-motion` disables TerminalIcon blinking and chevron bounce
- [ ] No nested `<main>` tags in rendered HTML
- [ ] `loading.tsx` and `error.tsx` exist in `app/`
- [ ] `react-icons` removed from `package.json`
- [ ] `skeleton.tsx`, `image-utils.ts`, `me.md` deleted
- [ ] No unused exports remain in `constants.ts` or `utils.ts`
- [ ] `Card.tsx` uses theme tokens, not hardcoded colors
- [ ] Unused images removed from `public/`

---

## Boundaries

- **Always:** Run `pnpm build` and `pnpm lint` after changes. Keep existing visual behavior. Preserve bilingual support.
- **Ask first:** Adding new dependencies. Changing the contact mechanism. Restructuring page.tsx as Server Component.
- **Never:** Remove `prefers-reduced-motion` guards. Break existing ARIA attributes. Commit secrets or API keys.

---

## Open Questions

~~All resolved.~~

1. `react-icons` → confirmed unused, removing.
2. Focus trap → using `focus-trap-react`.
3. Blur placeholder → removing dead code (constant + image-utils.ts).
