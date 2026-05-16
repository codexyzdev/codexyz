# Tasks: Rediseño de Codexyz.dev

## Fase 1: Limpieza

- [ ] Task 1: Eliminar TechGrid y TechModal
  - Acceptance: No hay imports de TechGrid/TechModal en page.tsx, no existen los archivos
  - Verify: `pnpm build` exitoso
  - Files: `components/TechGrid.tsx`, `components/TechModal.tsx`, `app/page.tsx`

- [ ] Task 2: Limpiar textos de tecnologías
  - Acceptance: `lib/texts.ts` no tiene textos de tecnologías, mantiene hero/projects/contact
  - Verify: No hay errores de tipo
  - Files: `lib/texts.ts`

## Fase 2: Hero

- [ ] Task 3: Rediseñar AppHero.tsx
  - Acceptance: Hero muestra mensaje de servicios, CTA a contacto y proyectos, sin card de enfoque
  - Verify: Hero se ve bien en móvil y desktop
  - Files: `components/AppHero.tsx`

- [ ] Task 4: Optimizar logo animado
  - Acceptance: Logo se anima correctamente, menos repeticiones de loop
  - Verify: Animación funciona, no hay memory leaks
  - Files: `components/logo.tsx`

## Fase 3: Proyectos

- [ ] Task 5: Actualizar descripciones de proyectos
  - Acceptance: Descripciones orientadas a resultados/beneficios
  - Verify: Modal muestra descripción actualizada
  - Files: `lib/projects.ts`

- [ ] Task 6: Verificar ProjectsGrid
  - Acceptance: Grid se muestra correctamente con todos los proyectos
  - Verify: Featured project y grid funcionan
  - Files: `components/ProjectsGrid.tsx` (solo verificar, no modificar)

## Fase 4: Contacto

- [ ] Task 7: Mejorar copy de contacto
  - Acceptance: Textos de contacto actualizados en texts.ts
  - Verify: Formulario muestra textos nuevos
  - Files: `lib/texts.ts`, `components/ContactForm.tsx`

## Fase 5: SEO

- [ ] Task 8: Actualizar metadata
  - Acceptance: Title, description y keywords actualizados
  - Verify: `pnpm build` exitoso, metadata correcta
  - Files: `app/layout.tsx`

## Fase 6: Limpieza

- [ ] Task 9: Eliminar SVGs de tecnologías
  - Acceptance: No hay SVGs de tecnologías en public/
  - Verify: No hay imports rotos
  - Files: `public/*.svg` (excepto logo.svg)

- [ ] Task 10: Verificación final
  - Acceptance: Build exitoso, no hay warnings, responsive funciona
  - Verify: `pnpm build`, revisión manual en navegador
  - Files: Todos
