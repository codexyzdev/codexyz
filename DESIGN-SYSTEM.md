# Design System: Codexyz.dev — Rediseño UI/UX

## Referencia Visual

### Estilo: Minimalista Premium Developer
Inspiración: Vercel, Linear, Supabase, Raycast

---

## Colores

### Light Mode
```css
--bg: #fafafa
--fg: #0a0a0a
--card: #ffffff
--border: #e5e5e5
--muted: #a1a1aa
--primary: #007acc
--accent: #00b3b3
```

### Dark Mode
```css
--bg: #0a0a0a
--fg: #fafafa
--card: #171717
--border: #262626
--muted: #737373
--primary: #38bdf8
--accent: #2dd4bf
```

---

## Tipografía

### Font Stack
```css
--font-sans: 'Geist', system-ui, sans-serif
--font-mono: 'Geist Mono', monospace
```

### Escala
| Elemento | Tamaño | Peso | Tracking |
|----------|--------|------|----------|
| Hero title | 3.5rem / 4.5rem | 700 | -0.02em |
| Section title | 2rem / 2.5rem | 600 | -0.01em |
| Body | 1rem | 400 | normal |
| Small | 0.875rem | 400 | normal |
| Tiny | 0.75rem | 500 | 0.02em |

---

## Componentes

### Header (Floating)
```
┌─────────────────────────────────────────────┐
│  [Logo]    Proyectos  Contacto    [ES] [☀️] │
└─────────────────────────────────────────────┘
- Position: fixed, top-4, mx-4
- Background: bg-white/80 dark:bg-zinc-900/80
- Backdrop: backdrop-blur-xl
- Border: border border-gray-200 dark:border-zinc-800
- Radius: rounded-full
- Shadow: shadow-sm
```

### Hero
```
┌─────────────────────────────────────────────┐
│                                             │
│              Alejandro Baez                 │  ← text-7xl font-bold
│                                             │
│     Desarrollador web full-stack            │  ← text-lg text-muted
│            desde Venezuela                  │
│                                             │
│        [● Disponible para proyectos]        │  ← badge pulsante
│                                             │
│     [Iniciar proyecto]  [Ver proyectos]     │  ← buttons
│                                             │
└─────────────────────────────────────────────┘
- Height: min-h-screen
- Layout: flex items-center justify-center
- Background: gradient sutil o mesh
```

### Project Card
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │         [Screenshot]            │ │  ← h-48, object-cover
│ └─────────────────────────────────┘ │
│                                     │
│  Project Name                       │  ← font-semibold
│  Descripción corta del proyecto     │  ← text-sm text-muted
│                                     │
│  [Next.js] [React] [TypeScript]    │  ← pills
│                                     │
└─────────────────────────────────────┘
- Background: bg-card
- Border: border border-border
- Radius: rounded-2xl
- Hover: shadow-lg, -translate-y-1
- Transition: 200ms ease
```

### Contact Form
```
┌─────────────────────────────────────┐
│                                     │
│           Hablemos                  │  ← text-3xl font-semibold
│                                     │
│   ¿Listo para lanzar tu proyecto?   │  ← text-muted
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Nombre                      │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ Email                       │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ Mensaje                     │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│        [Enviar mensaje]             │  ← primary button
│                                     │
│   📧 email  |  💬 WhatsApp          │  ← links
│                                     │
└─────────────────────────────────────┘
- Layout: max-w-xl mx-auto
- Input style: bg-transparent border-border rounded-xl
```

---

## Efectos

### Glass (Dark)
```css
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(20px)
border: 1px solid rgba(255, 255, 255, 0.1)
```

### Glass (Light)
```css
background: rgba(255, 255, 255, 0.8)
backdrop-filter: blur(20px)
border: 1px solid rgba(0, 0, 0, 0.1)
```

### Gradient Text
```css
background: linear-gradient(to right, var(--primary), var(--accent))
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

### Glow
```css
box-shadow: 0 0 0 2px var(--primary), 0 0 20px rgba(var(--primary), 0.2)
```

---

## Espaciado

### Secciones
```
py-24 md:py-32
px-6 sm:px-8
max-w-6xl mx-auto
```

### Cards
```
p-6 md:p-8
gap-6
rounded-2xl
```

### Botones
```
h-11 px-6
rounded-full
font-medium
```

---

## Animaciones

### Scroll Reveal
```css
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
duration: 600ms
easing: ease-out
delay: stagger(100ms)
```

### Hover States
```css
transition: all 200ms ease
transform: translateY(-2px) (cards)
box-shadow: 0 10px 40px rgba(0,0,0,0.1) (cards)
```

### Focus States
```css
outline: none
box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--primary)
```

---

## Responsive

### Breakpoints
```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

### Mobile First
```
- Header: hamburger menu en mobile
- Hero: text-4xl en mobile, text-7xl en desktop
- Projects: 1 columna en mobile, 2-3 en desktop
- Contact: stack vertical en mobile
```

---

## Anti-Patrones a Evitar

| ❌ No hacer | ✅ Hacer |
|-------------|----------|
| Usar emojis como iconos | Usar Lucide icons |
| Colores sin contraste suficiente | Mínimo 4.5:1 ratio |
| Sin focus rings | Focus visible en todos los interactivos |
| Animaciones sin reduced-motion | Respetar prefers-reduced-motion |
| Headers fijos sin padding | Account for fixed header height |
| Glass en light mode con bg-white/10 | Usar bg-white/80 mínimo |
| Texto muted en light con gray-400 | Usar zinc-500 mínimo |
