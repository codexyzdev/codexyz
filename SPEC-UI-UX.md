# Spec: Rediseño UI/UX de Codexyz.dev

## Objective
Rediseñar completamente la interfaz del portafolio con estética **minimalista premium** estilo developer (Vercel/Supabase). Mantener la marca actual (Azul + Teal) pero con una ejecución más limpia, moderna y profesional. One-page scroll con secciones bien definidas.

**Inspiración:** Vercel, Linear, Supabase — oscuro con acentos, tipografía limpia, mucho espacio.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- animejs (animaciones)
- lucide-react (iconos)

## Commands
```
Dev: pnpm dev
Build: pnpm build
Lint: pnpm lint
```

## Design System

### 1. Paleta de Colores
```
MANTENER marca actual pero refrescar:

Light Mode:
- Background: #fafafa (casi blanco, no puro)
- Foreground: #0a0a0a (casi negro)
- Card: #ffffff
- Border: #e5e5e5 (suave)
- Muted: #a1a1aa (zinc-400)
- Primary: #007acc (azul actual)
- Accent: #00b3b3 (teal actual)

Dark Mode:
- Background: #0a0a0a (negro profundo)
- Foreground: #fafafa
- Card: #171717 (zinc-900)
- Border: #262626 (zinc-800)
- Muted: #737373 (zinc-500)
- Primary: #38bdf8 (azul claro, más visible en oscuro)
- Accent: #2dd4bf (teal claro)
```

### 2. Tipografía
```
Headings: Geist Sans (peso 600-700)
Body: Geist Sans (peso 400)
Mono: Geist Mono (código, stats)

Tamaños:
- Hero title: text-5xl md:text-7xl font-bold tracking-tight
- Section title: text-3xl md:text-4xl font-semibold
- Body: text-base leading-relaxed
- Small: text-sm
- Tiny: text-xs
```

### 3. Espaciado y Layout
```
- Max-width container: max-w-6xl
- Secciones: py-24 md:py-32
- Gap entre secciones: 0 (stack vertical)
- Padding horizontal: px-6 sm:px-8
- Card padding: p-6 md:p-8
- Border radius: rounded-2xl (cards), rounded-full (botones)
```

### 4. Efectos Visuales
```
- Glass: bg-white/5 backdrop-blur-xl border border-white/10 (dark)
- Glass light: bg-white/80 backdrop-blur-xl border border-gray-200 (light)
- Shadow: shadow-sm (sutil), shadow-lg (hover)
- Glow: ring-2 ring-primary/20 (focus states)
- Gradient text: bg-gradient-to-r from-primary to-accent bg-clip-text
```

### 5. Animaciones
```
- Reveal on scroll: opacity + translateY(20px → 0)
- Duration: 600ms ease-out
- Stagger: 100ms between elements
- Hover: 200ms ease
- Page transitions: none (SPA)
- Reduced motion: respetar prefers-reduced-motion
```

## Project Structure
```
app/
  page.tsx           → One-page principal
  layout.tsx         → Layout + metadata
  globals.css        → Design tokens + utilidades
components/
  Header.tsx         → Navbar flotante (nuevo)
  Hero.tsx           → Hero section (rediseñado)
  About.tsx          → Sobre mí (nuevo, minimal)
  Projects.tsx       → Grid de proyectos (rediseñado)
  ProjectCard.tsx    → Card individual (nuevo)
  Contact.tsx        → Formulario + CTA (rediseñado)
  Footer.tsx         → Footer minimal (nuevo)
  Logo.tsx           → Logo animado (optimizado)
  ScrollReveal.tsx   → Animación scroll (mantenido)
  ui/                → Componentes base
lib/
  texts.ts           → Textos bilingües
  projects.ts        → Datos de proyectos
  constants.ts       → Constantes
  utils.ts           → Utilidades
```

## Page Sections (One-page scroll)

### 1. Header (Fixed/Floating)
```
- Logo a la izquierda
- Navegación: Proyectos | Contacto
- Toggle ES/EN + Theme a la derecha
- Style: floating (top-4, mx-4), glass effect
- Hide on scroll down, show on scroll up
```

### 2. Hero
```
- Full viewport height
- Nombre grande (text-7xl)
- Subtítulo: "Desarrollador web full-stack desde Venezuela"
- Badge: "Disponible para proyectos" (pulsante)
- 2 CTAs: "Iniciar proyecto" (primario) + "Ver proyectos" (outline)
- Avatar initials con gradiente
- Sin card de "Enfoque" (eliminada)
- Fondo: gradient sutil o mesh
```

### 3. About (Minimal)
```
- Título: "Sobre mí"
- 2-3 oraciones máximo
- Skills en pills/badges: Next.js, React, TypeScript, Supabase
- Sin foto personal (opcional: avatar)
- Layout: centrado, max-w-2xl
```

### 4. Projects
```
- Título: "Proyectos"
- Featured project: card grande con imagen + descripción
- Resto: grid 2-3 columnas
- Cards: imagen + nombre + descripción corta + tech stack
- Hover: elevación sutil + overlay
- Click: abre modal o link externo
```

### 5. Contact
```
- Título: "Hablemos"
- Subtítulo: "¿Listo para lanzar tu proyecto?"
- Formulario simple: nombre, email, mensaje
- Botón: "Enviar mensaje" (abre Gmail)
- Links: Email + WhatsApp
- Layout: centrado, max-w-xl
```

### 6. Footer
```
- Minimal: © 2025 Alejandro Baez
- Links: GitHub, LinkedIn (preparados)
- Built with: Next.js + Tailwind
```

## Code Style
```tsx
// Ejemplo: Hero section
export default function Hero({ lang }: { lang: Lang }) {
  const t = texts[lang]
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.aboutDesc}
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button>{t.contactMe}</Button>
          <Button variant="outline">{t.seeProjects}</Button>
        </div>
      </div>
    </section>
  )
}
```

**Convenciones:**
- Componentes en `components/`, datos en `lib/`
- Tailwind utility-first, sin CSS custom excepto tokens
- Colores via CSS variables (oklch)
- Responsive: mobile-first, breakpoints sm/md/lg
- Accesibilidad: ARIA labels, focus rings, semantic HTML

## Testing Strategy
- **Framework:** No hay tests configurados
- **Verificación:** Build exitoso + revisión manual
- **Cobertura:** N/A

## Boundaries
- **Always:** Respetar prefers-reduced-motion, mantener toggle ES/EN, usar design tokens
- **Ask first:** Cambiar paleta de colores, agregar secciones, modificar estructura
- **Never:** Eliminar logo animado, romper toggle, agregar secrets

## Success Criteria
1. Hero se ve premium y limpio (estilo Vercel/Linear)
2. Header flotante con glass effect funciona en mobile
3. Proyectos se muestran en grid atractivo
4. Contacto es fácil de encontrar y usar
5. Toggle ES/EN + Theme funcionan
6. Build exitoso sin warnings
7. Responsive en 375px, 768px, 1024px, 1440px
8. Accesibilidad: focus visible, ARIA labels, reduced motion

## Open Questions
- ¿Quieres agregar sección de "Stack" o "Tecnologías" de forma minimal?
- ¿Los screenshots de proyectos necesitan actualizarse?
- ¿Quieres animaciones más llamativas o minimalistas?
