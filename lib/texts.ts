export type Lang = "en" | "es"

export const texts = {
  en: {
    portfolio: "Portfolio",
    heroTitle: "Alejandro Baez",
    heroDesc:
      "Full‑stack web developer from Venezuela",
    contactMe: "Start a project",
    seeTech: "See stack",
    technologies: "Technologies",
    techDesc: "Tools I use to ship production apps.",
    cardDesc: "Design → build → ship. Clean, scalable, maintainable.",
    aboutMe: "About me",
    aboutDesc:
      "I build fast, accessible web apps with Next.js + React, backed by Supabase. I care about clean UX, performance, and maintainable code.",
    projects: "Projects",
    projectsDesc: "Selected work: apps, sites, and experiments.",
    contact: "Contact",
    contactDesc:
      "This form opens your email client with a ready‑to‑send message. Prefer WhatsApp? Use the button.",
    contactSub: "Let’s build something that feels great to use.",
    name: "Name",
    email: "Email",
    message: "Message",
    sendGmail: "Open email draft",
    langToggle: "ES / EN",
    // Form validation
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    messageTooShort: "Message must be at least 10 characters",
    characterCount: "characters",
    // Accessibility
    skipToContent: "Skip to main content",
    closeModal: "Close modal",
    openInNewTab: "Opens in new tab",
    previousProject: "Previous project",
    nextProject: "Next project",
    // Loading states
    loading: "Loading...",
  },
  es: {
    portfolio: "Portafolio",
    heroTitle: "Alejandro Baez",
    heroDesc:
      "Desarrollador web full‑stack desde Venezuela",
    contactMe: "Iniciar proyecto",
    seeTech: "Ver stack",
    technologies: "Tecnologías",
    techDesc: "Herramientas que uso para shippear apps reales.",
    cardDesc: "Diseño → desarrollo → deploy. Sin drama.",
    aboutMe: "Sobre mí",
    aboutDesc:
      "Construyo apps rápidas y accesibles con Next.js + React y backend con Supabase. Me enfoco en UX clara, performance y código mantenible.",
    projects: "Proyectos",
    projectsDesc: "Selección de trabajos: apps, sitios y experimentos.",
    contact: "Contacto",
    contactDesc:
      "El formulario abre tu cliente de correo con el mensaje listo. Si prefieres WhatsApp, usa el botón.",
    contactSub: "Hablemos y lo aterrizamos en algo real.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sendGmail: "Abrir borrador",
    langToggle: "ES / EN",
    // Form validation
    required: "Este campo es obligatorio",
    invalidEmail: "Por favor ingresa un email válido",
    messageTooShort: "El mensaje debe tener al menos 10 caracteres",
    characterCount: "caracteres",
    // Accessibility
    skipToContent: "Saltar al contenido principal",
    closeModal: "Cerrar modal",
    openInNewTab: "Abre en nueva pestaña",
    previousProject: "Proyecto anterior",
    nextProject: "Siguiente proyecto",
    // Loading states
    loading: "Cargando...",
  },
} as const

export type Texts = typeof texts
