# Plan: Rediseño de Codexyz.dev

## Fase 1: Limpieza y Simplificación
1. **Eliminar componentes no necesarios**
   - Eliminar `TechGrid.tsx` (sección de tecnologías)
   - Eliminar `TechModal.tsx` (modal de tecnologías)
   - Eliminar imports y referencias en `page.tsx`

2. **Simplificar textos en `lib/texts.ts`**
   - Eliminar textos de tecnologías
   - Actualizar textos del hero para enfocar en servicios
   - Mantener textos de proyectos y contacto

## Fase 2: Rediseño del Hero
3. **Rediseñar `AppHero.tsx`**
   - Mensaje principal: "Ayudo a empresas y emprendedores a dar el salto digital"
   - Subtítulo: "Aplicaciones web modernas, eficientes y fáciles de mantener"
   - CTA principal: "Iniciar proyecto" → scroll a contacto
   - CTA secundario: "Ver proyectos" → scroll a proyectos
   - Eliminar card de "Enfoque" (Frontend/Backend/UX) — no alinea con el tono de ventas
   - Mantener logo animado optimizado

4. **Optimizar logo animado en `components/logo.tsx`**
   - Reducir tamaño del SVG si es posible
   - Optimizar animaciones (menos repeticiones)
   - Mantener efecto visual atractivo

## Fase 3: Mejora de Proyectos
5. **Actualizar `lib/projects.ts`**
   - Reescribir descripciones orientadas a resultados/beneficios
   - Ejemplo: "Sitio web para Los Tiburones con diseño moderno y responsive" → "Sitio web empresarial que aumentó la presencia digital de Los Tiburones"
   - Mantener todos los proyectos (6)

6. **Mejorar `ProjectsGrid.tsx`**
   - Featured project: mantener layout split (imagen + detalles)
   - Grid: cards más compactas pero atractivas
   - Hover effects ya existentes son buenos, mantener

## Fase 4: Contacto y CTAs
7. **Mejorar `ContactForm.tsx`**
   - Mantener formulario funcional (abre Gmail)
   - Mejorar copy: "Hablemos de tu proyecto" / "Let's talk about your project"
   - Mantener botón WhatsApp flotante en layout

8. **Actualizar `lib/texts.ts`**
   - Textos del hero orientados a servicios
   - Textos de proyectos orientados a resultados
   - Mantener textos de formulario

## Fase 5: SEO y Metadata
9. **Actualizar `app/layout.tsx`**
   - Title: "Codexyz.dev — Desarrollo Web Moderno | Alejandro Baez"
   - Description: "Desarrollador web especializado en Next.js, React y Supabase. Creo aplicaciones rápidas, accesibles y mantenibles."
   - Keywords actualizados

## Fase 6: Limpieza Final
10. **Eliminar archivos innecesarios en `public/`**
    - Eliminar SVGs de tecnologías (nextjs_icon_dark.svg, React_light.svg, etc.)
    - Mantener: screenshots de proyectos, logo.svg, favicon.ico

11. **Eliminar imports no usados**
    - Limpiar `page.tsx` de imports de TechGrid/TechModal
    - Verificar que no haya imports rotos

## Orden de ejecución
1. Fase 1 → 2 → 3 → 4 → 5 → 6
2. Verificar build después de cada fase
3. Revisar responsive después de Fase 3

## Verification Checkpoints
- Después de Fase 1: `pnpm build` exitoso
- Después de Fase 3: Hero se ve bien en móvil/desktop
- Después de Fase 4: Formulario funciona (abre Gmail)
- Después de Fase 6: Build limpio sin warnings
