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
    href: "https://finanzas-pro.vercel.app",
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
]
