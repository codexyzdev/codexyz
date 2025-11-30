export type Lang = "en" | "es"

export const texts = {
  en: {
    portfolio: "Portfolio",
    heroTitle: "Alejandro Baez",
    heroDesc:
      "Venezuelan web developer. I build modern apps with Next.js, React and Supabase.",
    contactMe: "Contact me",
    seeTech: "Tech stack",
    technologies: "Technologies",
    techDesc: "Stack I use daily and love.",
    cardDesc: "Fast, scalable and maintainable projects.",
    aboutMe: "About me",
    aboutDesc:
      "I am passionate about building modern and functional applications. I work with Next.js, React and Supabase. Always learning and improving to deliver efficient solutions.",
    projects: "Projects",
    projectsDesc: "A few apps I have worked on.",
    contact: "Contact",
    contactDesc:
      "Fill the form and your device's mail client will open with the message ready to send.",
    contactSub: "Let's work together",
    name: "Name",
    email: "Email",
    message: "Message",
    sendGmail: "Send email",
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
      "Desarrollador web venezolano. Construyo aplicaciones modernas con Next.js, React y Supabase.",
    contactMe: "Contáctame",
    seeTech: "Stack tecnológico",
    technologies: "Tecnologías",
    techDesc: "Stack que uso a diario y me encanta.",
    cardDesc: "Proyectos rápidos, escalables y mantenibles.",
    aboutMe: "Sobre mí",
    aboutDesc:
      "Soy apasionado por crear aplicaciones modernas y funcionales. Trabajo con Next.js, React y Supabase. Siempre aprendiendo y mejorando para ofrecer soluciones eficientes.",
    projects: "Proyectos",
    projectsDesc: "Algunas apps en las que he trabajado.",
    contact: "Contacto",
    contactDesc:
      "Completa el formulario y se abrirá tu cliente de correo con el mensaje listo para enviar.",
    contactSub: "Trabajemos juntos",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sendGmail: "Enviar email",
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