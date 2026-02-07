# Design System: Codexyz.dev — “Circuit Atlas”

**Stitch Project ID:** 16563756729124652444

## 1. Tema Visual y Atmósfera
Una estética “Circuit Atlas”: premium, ligera y tecnológica. Fondos con mesh gradient suave, textura sutil de grilla y superficies tipo vidrio (glass) con blur moderado. La interfaz se siente precisa y moderna, con contraste alto y bordes discretos.

## 2. Paleta de Color y Roles
### Marca
- **Azure (Primario)** (#007acc): CTAs, enlaces, bullets de highlights, focus rings.
- **Teal (Acento)** (#00b3b3): halos, estados activos, foco (ring) y detalles de énfasis.
- **Graphite (Neutro de apoyo)** (#4a4a4a): degradados, sombras y profundidad.

### Sistema (tokens actuales del proyecto)
- **Background** (oklch(1 0 0) / dark: oklch(0.145 0 0)): base de la página.
- **Foreground** (oklch(0.145 0 0) / dark: oklch(0.985 0 0)): texto principal.
- **Card** (oklch(1 0 0) / dark: oklch(0.205 0 0)): contenedores y paneles.
- **Border/Input** (oklch(0.922 0 0) / dark: oklch(1 0 0 / 10–15%)): separación “whisper-soft”.

### Fondos (composición)
- **Mesh**: 2–3 gradientes radiales con Azure/Teal muy diluidos.
- **Grid**: líneas 1px con baja opacidad, enmascaradas hacia el centro/top.
- **Vignette**: viñeta suave para reforzar jerarquía en el hero.

## 3. Reglas Tipográficas
- **Titulares**: peso medio/semibold, tracking ligeramente apretado, alto contraste.
- **Cuerpo**: tamaño cómodo (14–16px), line-height relajado, color atenuado para textos secundarios.
- **Datos/etiquetas**: tamaño pequeño (12px), fondo “muted” con borde suave.

## 4. Estilado de Componentes
- **Botones**
  - Primario: píldora (rounded-full), fondo claro sobre el hero (o `primary` en secciones), foco visible (ring).
  - Secundario: outline con fondo translúcido, borde tenue, hover con leve elevación.
  - Estados: hover/active/focus consistentes; targets táctiles mínimos 44px.

- **Cards / Contenedores**
  - Radio 20–24px (rounded-2xl/rounded-3xl).
  - Fondo: `bg-card/70` + `backdrop-blur-*`.
  - Borde: `ring-1`/`border` muy suave (`border/60–70`).
  - Hover: elevación sutil + translate-y leve.

- **Inputs / Formularios**
  - Fondo `bg-background`, borde `border-input`, foco con `ring`.
  - Errores: borde rojo + ring rojo con opacidad.
  - Mensajes: texto pequeño, claro y accionable.

- **Modales**
  - Backdrop oscurecido (60–70%).
  - Panel: vidrio con blur y borde suave.
  - Accesibilidad: foco inicial + trap de foco + cerrar con Escape.

## 5. Principios de Layout
- **Ancho máximo**: 6xl para secciones principales.
- **Ritmo vertical**: secciones 56–80px (según breakpoint).
- **Grid**: featured en split layout; resto en 2–3 columnas.
- **Jerarquía**: 1 headline fuerte, 1 subheadline, CTAs claros, y luego contenido escaneable (tags + bullets).

## 6. Motion
- **Reveals**: transición suave (opacity + translateY), stagger ligero entre bloques.
- **Micro-interacciones**: 150–220ms (hover/focus), sin rebotes.
- **Accesibilidad**: respetar `prefers-reduced-motion` (sin animación).

