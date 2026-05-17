# Plan: Portfolio Improvements — a11y, Cleanup & UX

## Implementation Order

### Phase 1: Cleanup (no behavior changes, pure deletion)
Safe to do first — reduces codebase surface before making functional changes.

1. **Install `focus-trap-react`** — needed for Phase 3 a11y work
2. **Delete dead files** — `lib/image-utils.ts`, `components/ui/skeleton.tsx`, `me.md`
3. **Remove dead exports from `lib/constants.ts`** — `ANIMATION`, `BREAKPOINTS`, `COLORS`, `A11Y`, `IMAGE`, `SOCIAL.LINKEDIN`, `SOCIAL.TWITTER`
4. **Remove dead functions from `lib/utils.ts`** — `debounce`, `isMobileDevice`, `formatUrl`, `isTouchDevice`, `truncateText`
5. **Remove `react-icons` from `package.json`** — unused dependency
6. **Delete unused images from `public/`** — 8 files

**Checkpoint:** `pnpm build` + `pnpm lint` pass. No visual changes.

### Phase 2: Structural HTML fixes
Fix invalid HTML and add missing Next.js boundaries.

7. **Remove nested `<main>` in `app/page.tsx`** — keep only `layout.tsx`'s `<main>`
8. **Add `app/loading.tsx`** — skeleton spinner for route transitions
9. **Add `app/error.tsx`** — error boundary with retry button

**Checkpoint:** `pnpm build` passes. HTML validator shows no nested `<main>`.

### Phase 3: Accessibility fixes
The core a11y improvements.

10. **Add `aria-expanded` to mobile menu hamburger** — `components/Header.tsx`
11. **Add focus trap to ProjectModal** — `components/ProjectModal.tsx`
12. **Add focus trap to mobile menu** — `components/Header.tsx`
13. **Add `aria-label` to backdrop button** — `components/ProjectModal.tsx`
14. **Fix `TerminalIcon` reduced motion** — `components/TerminalIcon.tsx`
15. **Fix chevron `animate-bounce`** — `components/Hero.tsx` (`motion-safe:animate-bounce`)
16. **Add `aria-describedby` to form inputs** — `components/Contact.tsx`

**Checkpoint:** Tab through modal and mobile menu — focus stays contained. Screen reader announces errors.

### Phase 4: Component fixes
Polish and consistency.

17. **Fix Card.tsx hardcoded colors** — use CSS variable tokens
18. **Apply `.cv-auto` utility** — to projects grid and modal content

**Checkpoint:** `pnpm build` + `pnpm lint` pass. Visual appearance unchanged.

---

## Risks

- **`focus-trap-react` compatibility with React 19** — check after install. Fallback: implement manually with `useRef` + keydown listener.
- **Card.tsx color change** — visual regression possible. Compare before/after screenshots.
- **Removing `<main>` from page.tsx** — ensure layout.tsx's `<main>` wraps all content correctly.
