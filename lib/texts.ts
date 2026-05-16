export type Lang = "en" | "es"

export const texts = {
  en: {
    portfolio: "Portfolio",
    heroTitle: "Alejandro Baez",
    heroDesc: "Full‑stack web developer from Venezuela",
    heroSubtitle: "Modern web apps. Clean UX.",
    contactMe: "Start a project",
    seeProjects: "See my work",
    aboutMe: "About me",
    aboutDesc:
      "I help businesses and entrepreneurs make the digital leap with modern, efficient, and easy-to-maintain web applications. I turn your vision into digital reality: functional platforms, secure and optimized for the best customer experience. I handle the structure and code so you can focus on growing your business.",
    projects: "Projects",
    projectsDesc: "Selected work: apps, sites, and experiments.",
    contact: "Contact",
    contactDesc:
      "This form opens your email client with a ready‑to‑send message. Prefer WhatsApp? Use the button.",
    contactSub: "Let's build something that feels great to use.",
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
    heroDesc: "Desarrollador web full‑stack desde Venezuela",
    heroSubtitle: "Apps modernas. UX limpia.",
    contactMe: "Iniciar proyecto",
    seeProjects: "Ver mi trabajo",
    aboutMe: "Sobre mí",
    aboutDesc:
      "Ayudo a empresas y emprendedores a dar el salto digital con aplicaciones web modernas, eficientes y fáciles de mantener. Convierto tu visión en una realidad digital: plataformas funcionales, seguras y optimizadas para la mejor experiencia de tus clientes. Me encargo de la estructura y el código para que te concentres en hacer crecer tu negocio.",
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
