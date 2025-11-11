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
    techDesc: "Stack I use daily and love. Smooth effects powered by Anime.js.",
    cardDesc: "Fast, scalable and maintainable projects.",
    aboutMe: "About me",
    aboutDesc:
      "I am passionate about building modern and functional applications. I work with Next.js, React and Supabase. Always learning and improving to deliver efficient solutions.",
    contact: "Contact",
    contactDesc:
      "Fill the form and your device's mail client will open with the message ready to send.",
    name: "Name",
    email: "Email",
    message: "Message",
    sendGmail: "Send email",
    langToggle: "ES / EN",
  },
  es: {
    portfolio: "Portafolio",
    heroTitle: "Alejandro Baez",
    heroDesc:
      "Desarrollador web venezolano. Construyo aplicaciones modernas con Next.js, React y Supabase.",
    contactMe: "Contáctame",
    seeTech: "Stack tecnológico",
    technologies: "Tecnologías",
    techDesc: "Stack que uso a diario y me encanta. Con efectos suaves usando Anime.js.",
    cardDesc: "Proyectos rápidos, escalables y mantenibles.",
    aboutMe: "Sobre mí",
    aboutDesc:
      "Soy apasionado por crear aplicaciones modernas y funcionales. Trabajo con Next.js, React y Supabase. Siempre aprendiendo y mejorando para ofrecer soluciones eficientes.",
    contact: "Contacto",
    contactDesc:
      "Completa el formulario y se abrirá tu cliente de correo con el mensaje listo para enviar.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sendGmail: "Enviar email",
    langToggle: "ES / EN",
  },
} as const

export type Texts = typeof texts