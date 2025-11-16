"use client"
import { texts, Lang } from "@/lib/texts"
import { useCallback } from "react"

type ContactFormProps = {
  lang: Lang
  id?: string
}

export default function ContactForm({ lang, id }: ContactFormProps) {
  const t = texts[lang]

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get("name")?.toString() ?? "").trim()
    const email = (fd.get("email")?.toString() ?? "").trim()
    const message = (fd.get("message")?.toString() ?? "").trim()

    const subject = `${lang === "en" ? "Nueva consulta" : "Nueva consulta"} — ${name}`
    const bodyText = (
      lang === "en"
        ? `👋 Hi Alejandro,%0A%0AYou have a new inquiry from the portfolio.%0A%0A— Contact details —%0A• Name: ${name}%0A• Email: ${email}%0A%0A— Message —%0A${message}%0A%0A—%0ASent from Codexyz.dev`
        : `👋 Hola Alejandro,%0A%0ATienes una nueva consulta desde el portafolio.%0A%0A— Datos del contacto —%0A• Nombre: ${name}%0A• Email: ${email}%0A%0A— Mensaje —%0A${message}%0A%0A—%0AEnviado desde Codexyz.dev`
    )
    const mailtoHref = `mailto:alejandrobaez938@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`
    window.location.href = mailtoHref
  }, [lang])

  return (
    <section id={id} aria-labelledby="contact-title" className="mt-10">
      <div className="rounded-2xl bg-card/80 backdrop-blur-sm ring-1 ring-border shadow-sm p-6 md:p-8">
        <h2 id="contact-title" className="text-xl md:text-2xl font-semibold mb-1">
          {t.contact}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          {t.contactSub}
        </p>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm">{t.name}</span>
            <input
              id="name"
              name="name"
              type="text"
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
              placeholder={lang === "en" ? "Your name" : "Tu nombre"}
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">{t.email}</span>
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2"
              placeholder={lang === "en" ? "youremail@gmail.com" : "tucorreo@gmail.com"}
              required
            />
          </label>
          <label className="md:col-span-2 flex flex-col gap-1">
            <span className="text-sm">{t.message}</span>
            <textarea
              id="message"
              name="message"
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 min-h-[140px]"
              placeholder={lang === "en" ? "Tell me about your idea or project" : "Cuéntame sobre tu idea o proyecto"}
              required
            />
          </label>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
            >
              {t.sendGmail}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}