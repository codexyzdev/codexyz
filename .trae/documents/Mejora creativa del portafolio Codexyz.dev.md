## Diagnóstico rápido (cómo está hoy)
- Fondo: gradiente lineal (azul→teal→gris) aplicado sólo al Hero ([globals.css](file:///c:/Users/Codexyz.dev/Desktop/Development/codexyz/app/globals.css#L80-L85), [AppHero.tsx](file:///c:/Users/Codexyz.dev/Desktop/Development/codexyz/components/AppHero.tsx#L42-L103)). El resto de secciones viven sobre un fondo “plano”, así que el look se siente partido (hero muy “brand”, secciones neutrales).
- Sistema visual: ya tienes tokens tipo shadcn (background/foreground/card/etc.) en OKLCH, pero tu “brand” no está integrado como semántica (primary/accent) sino como utilidades sueltas.
- Animación: hay entradas con animejs (logo y tech cards) y modales bien resueltos; falta una coreografía consistente (reveal al scrollear + estados hover/focus con el mismo “timing”).
- Copy: textos correctos pero genéricos; además hay inconsistencias (por ejemplo se usa aboutDesc como descripción del hero).
- Detalles técnicos a corregir al rediseñar:
  - Clases Tailwind dinámicas en template literal (pueden no compilar en Tailwind v4) ([AppHero.tsx](file:///c:/Users/Codexyz.dev/Desktop/Development/codexyz/components/AppHero.tsx#L82-L99)).
  - Uso de `md:py-18` (probablemente no existe en el scale) ([ProjectsGrid.tsx](file:///c:/Users/Codexyz.dev/Desktop/Development/codexyz/components/ProjectsGrid.tsx#L16-L21), [TechGrid.tsx](file:///c:/Users/Codexyz.dev/Desktop/Development/codexyz/components/TechGrid.tsx#L18-L24)).

## Dirección creativa (bonita + memorable)
- Concepto: “Circuit Atlas” (conecta tu logo/circuitos con el fondo). Un **mesh gradient** suave (brand) + **trama** (grid/ruido) + **líneas tipo circuito** muy sutiles que “respiran” (animación mínima, accesible).
- Firma visual (signature): un “halo” de luz teal/azul detrás de elementos clave (hero/featured project) y una micro-animación de líneas/circuitos al pasar el mouse, sin sentirse gamer.
- Motion: 150–220ms para micro-interacciones; 600–900ms para reveals con stagger; respetar `prefers-reduced-motion`.

## Cómo usaré Stitch + design-md
1. Crearé un proyecto en Stitch y generaré 2–3 pantallas (Desktop):
   - Home (Hero + Featured Projects + About/Process + Tech + Contact)
   - Variante de Projects (cards + modal/case study)
   - Variante de Contact (más elegante, con estados)
2. Extraeré el HTML/CSS de Stitch y lo sintetizaré en un **DESIGN.md** (con roles semánticos, hex/oklch, tipografía, elevación, radios, spacing) usando el enfoque de `design-md`.
3. Tomaré ese DESIGN.md como “contrato” para implementar el look en Tailwind v4 (tokens en `globals.css` + componentes).

## Implementación en tu repo (Next.js 16 + React 19 + Tailwind v4)
1. **Base visual**
   - Crear un fondo global cohesivo (mesh + ruido + patrón) que funcione en light/dark.
   - Integrar color brand dentro de tokens semánticos (primary/accent/ring) para coherencia en toda la UI.

2. **Hero (impacto arriba del fold)**
   - Rehacer jerarquía: headline con propuesta clara + subheadline con especialidad + CTAs (Contacto / Ver proyectos).
   - Añadir un elemento “signature” (badge/rail de chips con tech + halo suave).
   - Mantener toggles de idioma/tema, pero con UI más premium.

3. **Proyectos (más “case study”, menos galería)**
   - Cards con mejor narrativa: rol, stack, 1–2 resultados (si no hay datos, usar “qué resolví”).
   - Featured project destacado (DevPulse) con layout distinto.
   - Modal mejorado: descripción, tags, links, navegación (prev/next) y foco/trap correcto.

4. **Tech (más visual y escaneable)**
   - Grid con agrupación (Frontend/Backend/Tooling) o chips + modal con copy pulido.
   - Animación de reveal al scroll (no sólo al montar la página).

5. **Contacto (más confianza + menos fricción)**
   - Mejorar copy (CTA y microcopy) en ES/EN.
   - Estados de error/validación más consistentes con el sistema.

6. **Copywriting + copy-editing**
   - Reescribir textos clave (hero, projects, about/process, contact) con tono claro y profesional.
   - Pasar por “Seven Sweeps” (claridad, tono, so-what, prueba, especificidad, emoción, cero riesgo) sin inventar métricas.

7. **Best practices (Next + Vercel React)**
   - Reducir “client surface” donde tenga sentido (dejar sólo islas interactivas).
   - Evitar clases Tailwind dinámicas y spacing inválido.
   - Revisar imágenes LCP (priorities/sizes ya están bien encaminados).

## Verificación
- Levantaré el proyecto y revisaré:
  - LCP/CLS visualmente
  - Light/Dark
  - Reduce motion
  - Accesibilidad (focus states, modals, skip link)
  - `next build` y `eslint`

## Entregables
- UI nueva (hero + secciones rediseñadas) + animaciones consistentes.
- Copy ES/EN actualizado.
- DESIGN.md para mantener el estilo y generar nuevas pantallas con Stitch.

Si apruebas este plan, paso a: generar las pantallas en Stitch, sintetizar DESIGN.md y aplicar los cambios en el repo.