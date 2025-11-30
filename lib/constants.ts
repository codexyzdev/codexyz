/**
 * Centralized constants for the Codexyz portfolio
 */

// Contact Information
export const CONTACT = {
    EMAIL: "alejandrobaez938@gmail.com",
    WHATSAPP: "+584125146317",
    WHATSAPP_MESSAGE: {
        en: "Hello Alejandro, I saw your portfolio and would like to talk",
        es: "Hola Alejandro, vi tu portafolio y me gustaría hablar",
    },
} as const

// Site Configuration
export const SITE = {
    NAME: "Codexyz.dev",
    TITLE: "Codexyz.dev — Alejandro Baez",
    URL: "https://codexyz.dev",
    AUTHOR: "Alejandro Baez",
} as const

// Animation Configuration
export const ANIMATION = {
    DURATION: {
        FAST: 200,
        NORMAL: 300,
        SLOW: 500,
        VERY_SLOW: 700,
    },
    EASING: {
        EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
        EASE_OUT: "cubic-bezier(0, 0, 0.2, 1)",
        EASE_IN: "cubic-bezier(0.4, 0, 1, 1)",
        BOUNCE: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
    STAGGER_DELAY: 80,
} as const

// Responsive Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
} as const

// Brand Colors (from me.md)
export const COLORS = {
    AZUL: "#007acc",
    TEAL: "#00b3b3",
    GRIS: "#4a4a4a",
} as const

// Image Optimization
export const IMAGE = {
    QUALITY: 85,
    BLUR_DATA_URL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    SIZES: {
        PROJECT_CARD: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
        TECH_ICON: "80px",
    },
} as const

// Accessibility
export const A11Y = {
    MIN_TOUCH_TARGET: 44, // pixels
    SKIP_LINK_ID: "main-content",
} as const

// Social Links (prepared for future use)
export const SOCIAL = {
    GITHUB: "",
    LINKEDIN: "",
    TWITTER: "",
} as const
