"use client"
import { texts, Lang } from "@/lib/texts"
import { useCallback, useState } from "react"
import { isValidEmail } from "@/lib/utils"

type ContactFormProps = {
  lang: Lang
  id?: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm({ lang, id }: ContactFormProps) {
  const t = texts[lang]
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [messageLength, setMessageLength] = useState(0)
  const maxMessageLength = 500

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.trim().length === 0 ? t.required : undefined
      case "email":
        if (value.trim().length === 0) return t.required
        return !isValidEmail(value) ? t.invalidEmail : undefined
      case "message":
        if (value.trim().length === 0) return t.required
        return value.trim().length < 10 ? t.messageTooShort : undefined
      default:
        return undefined
    }
  }, [t])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => new Set(prev).add(name))

    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "message") {
      setMessageLength(value.length)
    }

    // Only validate if field has been touched
    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get("name")?.toString() ?? "").trim()
    const email = (fd.get("email")?.toString() ?? "").trim()
    const message = (fd.get("message")?.toString() ?? "").trim()

    // Validate all fields
    const newErrors: FormErrors = {}
    newErrors.name = validateField("name", name)
    newErrors.email = validateField("email", email)
    newErrors.message = validateField("message", message)

    // If there are errors, show them and don't submit
    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors)
      setTouched(new Set(["name", "email", "message"]))
      return
    }

    const subject = `${lang === "en" ? "New inquiry" : "Nueva consulta"} — ${name}`
    const bodyText = (
      lang === "en"
        ? `👋 Hi Alejandro\n\nYou have a new inquiry from the portfolio.\n\n— Contact details —\n• Name: ${name}\n• Email: ${email}\n\n— Message —\n${message}\n\n—\nSent from Codexyz.dev`
        : `👋 Hola Alejandro\n\nTienes una nueva consulta desde el portafolio.\n\n— Datos del contacto —\n• Nombre: ${name}\n• Email: ${email}\n\n— Mensaje —\n${message}\n\n—\nEnviado desde Codexyz.dev`
    )
    const params = new URLSearchParams()
    params.set("subject", subject)
    params.set("body", bodyText)
    const mailtoHref = `mailto:alejandrobaez938@gmail.com?${params.toString()}`
    window.location.href = mailtoHref
  }, [lang, validateField])

  return (
    <section id={id} aria-labelledby="contact-title" className="mt-10">
      <div className="rounded-2xl bg-card/80 backdrop-blur-sm ring-1 ring-border shadow-sm p-6 md:p-8">
        <h2 id="contact-title" className="text-xl md:text-2xl font-semibold mb-1">
          {t.contact}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          {t.contactSub}
        </p>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={onSubmit} noValidate>
          <label className="flex flex-col gap-1">
            <span className="text-sm">
              {t.name} <span className="text-red-500" aria-hidden="true">*</span>
            </span>
            <input
              id="name"
              name="name"
              type="text"
              className={`rounded-md border ${errors.name && touched.has("name")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300 dark:border-neutral-700"
                } bg-white dark:bg-neutral-900 px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0`}
              placeholder={lang === "en" ? "Your name" : "Tu nombre"}
              required
              aria-required="true"
              aria-invalid={errors.name && touched.has("name") ? "true" : "false"}
              aria-describedby={errors.name && touched.has("name") ? "name-error" : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && touched.has("name") && (
              <span id="name-error" className="text-sm text-red-500" role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">
              {t.email} <span className="text-red-500" aria-hidden="true">*</span>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              className={`rounded-md border ${errors.email && touched.has("email")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300 dark:border-neutral-700"
                } bg-white dark:bg-neutral-900 px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0`}
              placeholder={lang === "en" ? "youremail@gmail.com" : "tucorreo@gmail.com"}
              required
              aria-required="true"
              aria-invalid={errors.email && touched.has("email") ? "true" : "false"}
              aria-describedby={errors.email && touched.has("email") ? "email-error" : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && touched.has("email") && (
              <span id="email-error" className="text-sm text-red-500" role="alert">
                {errors.email}
              </span>
            )}
          </label>

          <label className="md:col-span-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {t.message} <span className="text-red-500" aria-hidden="true">*</span>
              </span>
              <span className={`text-xs ${messageLength > maxMessageLength
                  ? "text-red-500"
                  : "text-neutral-500 dark:text-neutral-400"
                }`}>
                {messageLength}/{maxMessageLength} {t.characterCount}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              className={`rounded-md border ${errors.message && touched.has("message")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-300 dark:border-neutral-700"
                } bg-white dark:bg-neutral-900 px-3 py-2 min-h-[140px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0`}
              placeholder={lang === "en" ? "Tell me about your idea or project" : "Cuéntame sobre tu idea o proyecto"}
              required
              aria-required="true"
              aria-invalid={errors.message && touched.has("message") ? "true" : "false"}
              aria-describedby={errors.message && touched.has("message") ? "message-error" : undefined}
              maxLength={maxMessageLength}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.message && touched.has("message") && (
              <span id="message-error" className="text-sm text-red-500" role="alert">
                {errors.message}
              </span>
            )}
          </label>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-white min-h-[44px]"
            >
              {t.sendGmail}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}