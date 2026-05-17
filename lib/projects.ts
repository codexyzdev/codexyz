export type ProjectItem = {
  name: string
  src: string
  srcMobile?: string
  href?: string
  year?: number
  description?: {
    en: string
    es: string
  }
  role?: {
    en: string
    es: string
  }
  highlights?: {
    en: string[]
    es: string[]
  }
  technologies?: string[]
  featured?: boolean
}

export const projects: ProjectItem[] = [
  {
    name: "Finanzas Pro",
    src: "/finanzas-pro-desktop.png",
    srcMobile: "/finanzas-pro-mobile.png",
    href: "https://finanzas-pro-by-codexyzdev.vercel.app/",
    year: 2025,
    description: {
      en: "Complete personal finance management app with aesthetic minimalist banking, designed for users in Latin America (USD, VES, COP). Deployed on Vercel.",
      es: "Aplicación web completa de gestión financiera personal, diseñada con estética bancaria minimalista y orientada a usuarios en Latinoamérica (USD, VES, COP). Desplegada en Vercel."
    },
    role: {
      en: "Full-stack development",
      es: "Desarrollo full-stack"
    },
    highlights: {
      en: [
        "Dashboard with currency balances, overdue debt alerts, and active accounts summary",
        "Accounts (Zinli, Binance, PayPal, bank, cash) with atomic balance management via Firestore Transactions",
        "Transactions with cursor pagination, advanced filters, PDF and CSV export",
        "Debts with states (pending, partial, paid, overdue), partial payments, WhatsApp integration",
        "Monthly budgets by category with progress bars and overflow alerts",
        "Custom decimal arithmetic library operating in cents to avoid IEEE 754 floating point errors",
        "Complete PWA with service worker, iOS install instructions, and version injection",
      ],
      es: [
        "Dashboard con balances por moneda, alertas de deudas vencidas y resumen de cuentas activas",
        "Cuentas (Zinli, Binance, PayPal, banco, efectivo) con gestión de saldo atómica vía Firestore Transactions",
        "Movimientos con paginación por cursor, filtros avanzados, exportación a PDF y CSV",
        "Deudas con estados, abonos parciales, historial de pagos e integración con WhatsApp",
        "Presupuestos mensuales por categoría con barras de progreso y alertas de excedencia",
        "Librería custom de aritmética decimal que opera en centavos para evitar errores de punto flotante",
        "PWA completa con service worker, instrucciones de instalación iOS y versión inyectada en build",
      ]
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Vercel"],
    featured: true
  },
  {
    name: "Los Tiburones",
    src: "/los-tiburones-desktop.png",
    srcMobile: "/los-tiburones-mobile.png",
    href: "https://los-tiburones-store.vercel.app/",
    year: 2024,
    description: {
      en: "Full-stack financial management system for credit stores with multi-tenant architecture. Each store operates with completely isolated data.",
      es: "Sistema full-stack de gestión financiera para tiendas de crédito con arquitectura multi-tenant. Cada tienda opera con datos completamente aislados."
    },
    role: {
      en: "Full-stack development",
      es: "Desarrollo full-stack"
    },
    highlights: {
      en: [
        "Authentication with roles (admin/seller) and granular module permissions",
        "Financing system with automatic fee calculation and sequential payment application",
        "Collections with payment validation (cash, POS, mobile, Zelle) and risk classification",
        "Cash sales with step-by-step process, dynamic cart and PDF invoice generation",
        "Client management with ID validation, Google Maps geolocation and ID upload",
        "Inventory with stock control, entry/exit movements and PDF reports",
        "PDF generation (contracts, payment plans, invoices) using React-PDF",
        "WhatsApp integration for payment reminders and contracts",
        "Real-time dashboard with metrics and collection statistics",
        "Cloud Functions for processing overdue payments with scheduled tasks (cron)",
      ],
      es: [
        "Autenticación con roles (admin/vendedor) y permisos granulares por módulo",
        "Sistema de financiamiento con cálculo automático de cuotas y aplicación secuencial de pagos",
        "Cobranza con validación de pagos (efectivo, punto de venta, pago móvil, Zelle) y clasificación de riesgo",
        "Ventas al contado con proceso paso a paso, carrito dinámico y generación de facturas PDF",
        "Gestión de clientes con validación de cédula, geolocalización con Google Maps",
        "Inventario con control de stock, movimientos de entrada/salida y reportes PDF",
        "Generación de PDFs (contratos, planes de pago, facturas) usando React-PDF",
        "Integración con WhatsApp para recordatorios de cuotas y comprobantes de pago",
        "Dashboard con métricas en tiempo real y estadísticas de cobranza",
        "Cloud Functions para procesamiento de cuotas atrasadas con tareas programadas",
      ]
    },
    technologies: ["Next.js", "TypeScript", "Firebase", "Redux Toolkit", "Tailwind CSS", "Radix UI", "Vercel"],
  },
  {
    name: "Chess Clock",
    src: "/chess-clock-mobile.png",
    href: "https://chess-clock-by-codexyzdev.vercel.app/",
    year: 2024,
    description: {
      en: "Two-player chess clock PWA with touch interface, offline mode, and complete end-to-end design. Players sit face-to-face with inverted panels.",
      es: "Reloj de ajedrez PWA para dos jugadores con interfaz táctil, modo offline y diseño completo de extremo a extremo. Jugadores sentados frente a frente con paneles invertidos."
    },
    role: {
      en: "Full-stack development",
      es: "Desarrollo full-stack"
    },
    highlights: {
      en: [
        "High-precision timer with requestAnimationFrame and epoch calculation (Date.now())",
        "Turn change with synthesized audio feedback (triangular wave, no audio dependencies)",
        "Game state machine: initial → running → paused → finished with clean transitions",
        "Win conditions: time out (flag), resignation, draw, or restart",
        "Custom names and preset time controls (1, 3, 5, 10, 15, 30 min)",
        "Persistent game history with timestamps, names, time control and result",
        "Complete i18n in English and Spanish with pluralization and template interpolation",
        "PWA offline-first with custom service worker, MD5 hash cache busting and real-time update flow",
        "Dual persistence (localStorage synchronous + IndexedDB asynchronous) for offline data resilience",
        "Synthesized audio with Web Audio API (oscillator + gain envelope), eliminating sound files from bundle",
      ],
      es: [
        "Temporizador de alta precisión con requestAnimationFrame y cálculo por época (Date.now())",
        "Cambio de turno con feedback sonoro sintetizado en tiempo real (onda triangular, sin dependencias de audio)",
        "Máquina de estados del juego: inicial → corriendo → pausado → finalizado, con transiciones limpias",
        "Condiciones de victoria: tiempo agotado (flag), rendición, tablas o reinicio",
        "Nombres personalizados y controles de tiempo preestablecidos (1, 3, 5, 10, 15, 30 min)",
        "Historial de partidas persistente con timestamps, nombres, control de tiempo y resultado",
        "Internacionalización (i18n) completa en inglés y español, con pluralización e interpolación de plantillas",
        "PWA offline-first con service worker custom generado en build time y flujo de actualización en tiempo real",
        "Persistencia dual (localStorage síncrono + IndexedDB asíncrono) para resiliencia ante datos offline",
        "Audio sintetizado con Web Audio API (oscillator + gain envelope), eliminando archivos de sonido del bundle",
      ]
    },
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "PWA", "Web Audio API", "IndexedDB", "Vercel"],
  },
  {
    name: "Ahorro Compartido 2026",
    src: "/ahorro-compartido-2026-desktop.png",
    srcMobile: "/ahorro-compartido-2026-mobile.png",
    href: "https://ahorro-compartido-2026.vercel.app/",
    year: 2025,
    description: {
      en: "Couples savings challenge app with dashboard, envelope board, and progress tracking. Reach your 2026 goals together.",
      es: "App de reto de ahorro para parejas con tablero de sobres y seguimiento de progreso. Alcanza tus metas de 2026 juntos."
    },
    role: {
      en: "Product + UI development",
      es: "Producto + desarrollo UI"
    },
    highlights: {
      en: [
        "Savings dashboard with total progress and remaining days counter",
        "100 envelope board with individual amounts from $1 to $100",
        "Real-time progress tracking with visual indicators",
        "Partner connection feature for shared savings",
        "Clean, intuitive UI with mobile-first design",
      ],
      es: [
        "Dashboard de ahorro con progreso total y contador de días restantes",
        "Tablero de 100 sobres con montos individuales de $1 a $100",
        "Seguimiento de progreso en tiempo real con indicadores visuales",
        "Función de conexión con pareja para ahorro compartido",
        "UI limpia e intuitiva con diseño mobile-first",
      ]
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
]
