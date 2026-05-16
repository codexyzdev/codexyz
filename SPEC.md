# Spec: Rediseño de Codexyz.dev — Portafolio orientado a ventas

## Objective
Transformar el sitio web actual (que muestra habilidades técnicas) en un portafolio orientado a vender servicios de desarrollo web. El sitio debe comunicar claramente: qué hace Alejandro, por qué contratarlo, y cómo contactarlo. El tono es profesional-cercano (como su mensaje de WhatsApp Business).

**Target audience:** Empresas y emprendedores que necesitan aplicaciones web modernas.

**Success criteria:**
- Visitante entiende en <5 segundos qué hace Alejandro y por qué contratarlo
- Proyectos se presentan como evidencia de resultados, no como demo técnica
- Formulario de contacto + WhatsApp como CTAs principales
- Toggle ES/EN funcional
- Logo animado optimizado

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- animejs (para animaciones del logo)
- lucide-react (iconos)
- react-icons (WhatsApp)

## Commands
```
Dev: pnpm dev
Build: pnpm build
Start: pnpm start
Lint: pnpm lint
```

## Project Structure
```
app/
  page.tsx           → Página principal (simplificada)
  layout.tsx         → Layout con metadata SEO
  globals.css        → Estilos globales
components/
  Logo.tsx           → Logo animado (optimizado)
  AppHero.tsx        → Hero section (rediseñado)
  ProjectsGrid.tsx   → Grid de proyectos (mejorado)
  ProjectModal.tsx   → Modal de detalles de proyecto
  ContactForm.tsx    → Formulario de contacto
  ScrollReveal.tsx   → Componente de animación scroll
  ui/                → Componentes base (shadcn)
lib/
  texts.ts           → Textos bilingües (actualizados)
  projects.ts        → Datos de proyectos (actualizados)
  constants.ts       → Constantes de contacto
  utils.ts           → Utilidades
public/
  *.png              → Screenshots de proyectos
  *.svg              → Iconos de tecnologías (se pueden eliminar)
  logo.svg           → Logo animado
```

## Code Style
```tsx
// Ejemplo: componente con props tipadas
type HeroProps = {
  lang: Lang
  onCTAClick: () => void
}

export default function Hero({ lang, onCTAClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center">
      <h1>{texts[lang].heroTitle}</h1>
      <Button onClick={onCTAClick}>{texts[lang].contactMe}</Button>
    </section>
  )
}
```

**Convenciones:**
- Componentes en `components/`, datos en `lib/`
- Textos bilingües en `lib/texts.ts` con type `Lang = "en" | "es"`
- Animaciones con animejs (respetar `prefers-reduced-motion`)
- Accesibilidad: ARIA labels, focus management, semantic HTML

## Testing Strategy
- **Framework:** No hay tests configurados actualmente
- **Verificación:** Build exitoso (`pnpm build`) + revisión manual
- **Cobertura:** N/A por ahora

## Boundaries
- **Always:** Respetar `prefers-reduced-motion`, mantener accesibilidad (ARIA, focus), usar type `Lang` para textos bilingües
- **Ask first:** Cambiar estructura de `lib/`, agregar dependencias, modificar SEO metadata
- **Never:** Eliminar logo animado, romper toggle ES/EN, eliminar formulario de contacto, agregar secrets al repo

## Success Criteria
1. Hero section comunica claramente el servicio (desarrollo web moderno)
2. Proyectos se muestran como cards atractivas con descripción orientada a resultados
3. CTAs visibles: "Iniciar proyecto" (formulario) + WhatsApp flotante
4. Toggle ES/EN funciona correctamente
5. Logo animado se carga y anima sin errores
6. Build exitoso sin warnings
7. Responsive en móvil y desktop
8. SEO metadata actualizado

## Open Questions
- ¿Quiere agregar sección "Sobre mí" o "Servicios" en el futuro? (por ahora no, solo hero + proyectos + contacto)
- ¿Los screenshots de proyectos necesitan actualizarse? (se mantienen los actuales)
