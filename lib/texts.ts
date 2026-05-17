export type Lang = "en" | "es"

export const texts = {
  en: {
    portfolio: "Portfolio",
    heroTitle: "Alejandro Baez",
    heroDesc: "Full‑stack web developer",
    heroSubtitle: "",
    contactMe: "Start a project",
    seeProjects: "See my work",
    aboutMe: "About me",
    aboutDesc:
      "I build custom web applications that help businesses and entrepreneurs scale.",
    aboutDetail:
      "I turn your vision into digital products: robust, secure platforms designed to deliver the best user experience. I handle the technology and development so you can focus on growing your business.",
    projects: "Projects",
    projectsDesc: "Web apps, custom platforms, and technical experiments.",
    contact: "Contact",
    contactDesc:
      "Send me a message and I'll get back to you as soon as possible.",
    contactSub: "Let's build something great together.",
    name: "Name",
    email: "Email",
    message: "Message",
    sendGmail: "Send an email",
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
    heroDesc: "Desarrollador web full‑stack",
    heroSubtitle: "",
    contactMe: "Iniciar proyecto",
    seeProjects: "Ver mi trabajo",
    aboutMe: "Sobre mí",
    aboutDesc:
      "Desarrollo aplicaciones web a medida que ayudan a empresas y emprendedores a escalar su negocio.",
    aboutDetail:
      "Transformo tus ideas en productos digitales: plataformas robustas, seguras y diseñadas para ofrecer la mejor experiencia a tus usuarios. Yo me encargo de la tecnología y el desarrollo para que te enfoques en hacer crecer tu negocio.",
    projects: "Proyectos",
    projectsDesc: "Aplicaciones web, plataformas a medida y desarrollo experimental.",
    contact: "Contacto",
    contactDesc:
      "Envíame un mensaje y te respondo lo antes posible.",
    contactSub: "Construyamos algo genial juntos.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sendGmail: "Enviar correo directo",
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
